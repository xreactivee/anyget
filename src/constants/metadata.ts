import type { Metadata } from "next";

export const mainPageMetadata: Metadata = {
    metadataBase: new URL("http://localhost:3000"),
    title: "AnyGet - The Ultimate Social Media Downloader",
    description: "AnyGet is a free, fast, and secure tool to download high-quality videos and audio from YouTube, Spotify, Instagram, Twitter, TikTok, and more.",
    keywords: ["video downloader", "audio downloader", "youtube to mp3", "instagram video download", "spotify downloader", "tiktok downloader", "free media downloader"],
    authors: [{ name: "AnyGet Team" }],
    creator: "AnyGet",
    publisher: "AnyGet",
    icons: {
        icon: "/xreactive.ico",
        shortcut: "/xreactive.ico",
        apple: "/xreactive.ico",
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "AnyGet",
    },
    twitter: {
        card: "summary_large_image",
        title: "AnyGet - Your Best Media Downloader",
        description: "Download videos and audio from your favorite social media platforms in seconds. Completely free and secure.",
        images: ["/xreactive.ico"],
        creator: "@anyget",
    },
    openGraph: {
        title: "AnyGet - Download Media Instantly",
        description: "Free and easy-to-use downloader for YouTube, Spotify, Instagram, TikTok, and more. Get your favorite media in high quality.",
        url: "https://anyget.xreactive.xyz",
        siteName: "AnyGet",
        images: [
            {
                url: "/xreactive.ico",
                width: 512,
                height: 512,
                alt: "AnyGet Logo",
            }
        ],
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};