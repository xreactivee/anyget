import { NextResponse } from "next/server";
import path from "path";
import os from "os";
import { spawn } from "child_process";
import { Readable } from "stream";

const ffmpegName = os.platform() === "win32" ? "ffmpeg.exe" : "ffmpeg";
const ffmpegPath = path.join(process.cwd(), "node_modules", "ffmpeg-static", ffmpegName);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("url");
  let title = searchParams.get("title") || "download";
  const ext = searchParams.get("ext") || "mp4";
  const headersBase64 = searchParams.get("headers");
  const originalUrl = searchParams.get("originalUrl");
  
  if (!fileUrl) {
    return new NextResponse("Missing URL", { status: 400 });
  }

  title = title.replace(/[^\w\s-]/gi, "").trim() || "download";

  try {
    let fetchHeaders: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Referer": fileUrl.includes("tiktok.com") ? "https://www.tiktok.com/" : 
                 fileUrl.includes("instagram.com") ? "https://www.instagram.com/" : 
                 "https://www.google.com/",
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Connection": "keep-alive"
    };

    if (headersBase64) {
      try {
        const decoded = Buffer.from(headersBase64, "base64").toString("utf-8");
        fetchHeaders = { ...fetchHeaders, ...JSON.parse(decoded) };
      } catch (e) {
      }
    }

    let response = await fetch(fileUrl, { headers: fetchHeaders });
    
    if ((!response.ok || response.status === 403) && originalUrl) {
      const { create } = await import("youtube-dl-exec");
      const ytDlpName = os.platform() === "win32" ? "yt-dlp.exe" : "yt-dlp";
      const ytdl = create(path.join(process.cwd(), "node_modules", "youtube-dl-exec", "bin", ytDlpName));
      
      let ytdlFormat = "b";
      if (ext === "mp3" || ext === "wav" || ext === "m4a") {
        ytdlFormat = "ba/b";
      }

      const subprocess = ytdl.exec(originalUrl, {
        output: "-",
        format: ytdlFormat,
        noWarnings: true,
        noCheckCertificates: true,
      });

      const headers = new Headers();
      headers.set("Content-Disposition", `attachment; filename="${title}.${ext}"`);
      
      if (ext === "mp3" || ext === "wav" || ext === "m4a") {
        const ffmpegArgs = ["-i", "pipe:0", "-vn"];
        if (ext === "mp3") ffmpegArgs.push("-f", "mp3", "-b:a", "192k");
        else if (ext === "wav") ffmpegArgs.push("-f", "wav");
        else if (ext === "m4a") ffmpegArgs.push("-f", "mp4", "-movflags", "frag_keyframe+empty_moov");
        ffmpegArgs.push("pipe:1");

        const ffmpeg = spawn(ffmpegPath as string, ffmpegArgs);
        subprocess.stdout?.pipe(ffmpeg.stdin);
        
        headers.set("Content-Type", `audio/${ext === "mp3" ? "mpeg" : ext}`);
        return new NextResponse(Readable.toWeb(ffmpeg.stdout) as any, { status: 200, headers });
      } else {
        headers.set("Content-Type", "video/mp4");
        return new NextResponse(Readable.toWeb(subprocess.stdout as any) as any, { status: 200, headers });
      }
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const headers = new Headers();
    headers.set("Content-Disposition", `attachment; filename="${title}.${ext}"`);

    if (ext === "mp3" || ext === "wav" || ext === "m4a") {
      const ffmpegArgs = [
        "-i", "pipe:0",
        "-vn",
      ];

      if (ext === "mp3") {
        ffmpegArgs.push("-f", "mp3", "-b:a", "192k");
      } else if (ext === "wav") {
        ffmpegArgs.push("-f", "wav");
      } else if (ext === "m4a") {
        ffmpegArgs.push("-f", "mp4", "-movflags", "frag_keyframe+empty_moov");
      }
      
      ffmpegArgs.push("pipe:1");

      const ffmpeg = spawn(ffmpegPath as string, ffmpegArgs);

      const nodeStream = Readable.fromWeb(response.body as any);
      nodeStream.pipe(ffmpeg.stdin);

      const webStream = Readable.toWeb(ffmpeg.stdout);

      headers.set("Content-Type", `audio/${ext === "mp3" ? "mpeg" : ext}`);
      
      return new NextResponse(webStream as any, {
        status: 200,
        headers
      });
    } else {
      headers.set("Content-Type", `video/${ext === "mp4" ? "mp4" : "webm"}`);
      return new NextResponse(response.body, {
        status: 200,
        headers
      });
    }
  } catch (error: any) {
    return new NextResponse("Failed to download file", { status: 500 });
  }
}
