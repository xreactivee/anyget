# 🎵 Song Downloader

<p align="center">
  <img src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>🎵</text></svg>" width="80" height="80" alt="Song Downloader Logo" />
</p>

<p align="center">
  <strong>A polished, web-based media downloader for audio and video from popular platforms.</strong>
</p>

<p align="center">
  Paste a link, choose your format, and download your favorite content through a simple guided experience.
</p>

---

## 🌟 Key Features

*   🎯 **Guided Download Flow:** A clean multi-step experience for choosing platform, media type, format, and source link.
*   🎵 **Audio & Video Support:** Download music or video content depending on the source and your preference.
*   🔄 **Multiple Formats:** Supports MP3, WAV, M4A, MP4, and WebM outputs.
*   🌐 **Broad Platform Support:** Works with popular services such as YouTube, Spotify, Instagram, TikTok, Facebook, and SoundCloud.
*   ⚡ **Proxy-Based Delivery:** Files are prepared and streamed through the app backend for a smoother download experience.
*   🔒 **Optional Cookie Support:** Can use cookies for platforms that require extra access handling.

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/)
*   **Media Processing:** [youtube-dl-exec](https://github.com/microlinkhq/youtube-dl-exec) and [ffmpeg-static](https://github.com/eugeneware/ffmpeg-static)
*   **Parsing Helpers:** [Cheerio](https://cheerio.js.org/) and [yt-search](https://github.com/talmobi/yt-search)

---

## 🧠 How It Works

The app guides the user through a small wizard and then sends the selected link to the backend for processing.

1. The user chooses the platform and whether they want audio or video.
2. The app asks for the desired format and the source URL.
3. The backend resolves metadata and prepares a downloadable file.
4. The frontend presents a ready-to-download action that streams the result through the proxy route.

> [!NOTE]
> **Platform Availability:**
> Some services may restrict or change download behavior over time, so results can vary depending on the source site and current access rules.

---

## 💻 Local Setup & Development

To run Song Downloader locally, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (20+ recommended) installed, along with npm, ffmpeg, and Python 3.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd song-downloader
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```text
   http://localhost:3000
   ```

---

## 🚀 Build & Run

### Production build

```bash
npm run build
```

### Start the production server

```bash
npm run start
```

---

## 🔐 Environment Variables

The app can optionally use cookies for services that require stricter access handling.

### Optional

*   **YOUTUBE_COOKIES_BASE64:** A base64-encoded Netscape-format cookie file. If provided, the app writes it to a temporary file and uses it for download requests.

Example:

```bash
export YOUTUBE_COOKIES_BASE64="<base64-encoded-cookie-content>"
```

If this variable is not set, the app will fall back to the bundled cookie file at the secrets directory when it exists.

---

## 🌐 Deployment

The project includes a Railway configuration for simple deployment.

*   Railway uses the existing Next.js start command.
*   The runtime environment should include ffmpeg and Python 3 so media processing can work correctly.

---

## 📄 License

This project is intended for personal and educational use. Please review the terms of the source platforms before using it for redistribution or commercial purposes.
