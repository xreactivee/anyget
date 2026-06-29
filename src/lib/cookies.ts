import fs from "fs";
import path from "path";
import os from "os";

const COOKIE_FILE_PATH = path.join(os.tmpdir(), "yt-cookies.txt");
const BUNDLED_COOKIE_PATH = path.join(process.cwd(), "secrets", "cookies.txt");

/**
 * Ensures the YouTube cookies file exists on disk.
 * 
 * Priority:
 * 1. YOUTUBE_COOKIES_BASE64 env var (base64-encoded Netscape cookie file)
 * 2. Bundled cookie file at secrets/cookies.txt (copied into Docker image)
 * 
 * Returns the path to the cookie file, or null if no cookies are configured.
 */
export function getCookiePath(): string | null {
  // Option 1: Base64-encoded cookies from environment variable
  const cookiesBase64 = process.env.YOUTUBE_COOKIES_BASE64;
  if (cookiesBase64) {
    if (!fs.existsSync(COOKIE_FILE_PATH)) {
      const cookieContent = Buffer.from(cookiesBase64, "base64").toString("utf-8");
      fs.writeFileSync(COOKIE_FILE_PATH, cookieContent, "utf-8");
    }
    return COOKIE_FILE_PATH;
  }

  // Option 2: Bundled cookie file in secrets directory
  if (fs.existsSync(BUNDLED_COOKIE_PATH)) {
    return BUNDLED_COOKIE_PATH;
  }

  return null;
}
