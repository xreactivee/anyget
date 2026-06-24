import { NextResponse } from "next/server";
import { create } from "youtube-dl-exec";
import path from "path";
import os from "os";
import ytSearch from "yt-search";
import * as cheerio from "cheerio";

const binaryName = os.platform() === "win32" ? "yt-dlp.exe" : "yt-dlp";
const ytdl = create(path.join(process.cwd(), "node_modules", "youtube-dl-exec", "bin", binaryName));

export async function POST(req: Request) {
  try {
    const { url, platform, type, format } = await req.json();

    if (!url || !platform || !type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    let targetUrl = url;

    if (platform === "spotify") {
      try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        let title = $('meta[property="og:title"]').attr("content");
        let description = $('meta[property="og:description"]').attr("content");

        if (!title) {
          return NextResponse.json({ success: false, error: "Could not fetch Spotify metadata" }, { status: 400 });
        }

        const artist = description ? description.split("·")[0].trim() : "";
        const searchQuery = `${title} ${artist} audio`;

        const searchResult = await ytSearch(searchQuery);
        if (!searchResult || searchResult.videos.length === 0) {
          return NextResponse.json({ success: false, error: "Could not find corresponding track on YouTube" }, { status: 404 });
        }

        targetUrl = searchResult.videos[0].url;
      } catch (err) {
        return NextResponse.json({ success: false, error: "Error processing Spotify URL" }, { status: 500 });
      }
    }

    const flags: any = {
      dumpJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      extractorArgs: "youtube:player-client=android,web",
    };

    if (type === "audio") {
      flags.format = "ba/b";
    } else {
      flags.format = "b";
    }

    const videoInfo: any = await ytdl(targetUrl, flags);
    
    const requestedDownloads = videoInfo.requested_downloads;
    const formats = videoInfo.formats;
    const httpHeaders = videoInfo.http_headers;

    let downloadUrl = videoInfo.url;

    if (!downloadUrl) {
      downloadUrl = requestedDownloads?.[0]?.url || formats?.[0]?.url;
    }

    if (!downloadUrl) {
      return NextResponse.json({ success: false, error: "Could not extract download URL" }, { status: 500 });
    }

    const finalFormat = format || (type === "audio" ? "mp3" : "mp4");

    return NextResponse.json({
      success: true,
      downloadUrl: downloadUrl,
      title: videoInfo.title,
      thumbnail: videoInfo.thumbnail,
      duration: videoInfo.duration,
      format: finalFormat,
      headers: httpHeaders,
      originalUrl: targetUrl
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process download" },
      { status: 500 }
    );
  }
}
