import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Platform, DownloadType, Format, FormatSelectProps } from "@/lib/types";
import { FileAudio, FileVideo } from "lucide-react";

const audioFormats: { id: Format; name: string; desc: string }[] = [
  { id: "mp3", name: "MP3", desc: "Most popular, compressed" },
  { id: "wav", name: "WAV", desc: "Lossless, high quality" },
  { id: "m4a", name: "M4A", desc: "Ideal for Apple devices" },
];

const videoFormats: { id: Format; name: string; desc: string }[] = [
  { id: "mp4", name: "MP4", desc: "Standard quality, wide compatibility" },
  { id: "webm", name: "WebM", desc: "Optimized for the web" },
];

export function FormatSelect({ platform, type, onSelect, onBack }: FormatSelectProps) {
  const isSpotify = platform === "spotify";
  const formats = type === "audio" ? audioFormats : videoFormats;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6 w-full"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">File Format</h2>
        {isSpotify && (
          <div className="bg-[#1DB954]/20 border border-[#1DB954]/30 text-[#1DB954] text-sm px-4 py-2 rounded-lg mb-4 inline-block">
            We can only download audio from Spotify.
          </div>
        )}
        <p className="text-gray-400 text-sm">Select the format of the file you want to download.</p>
      </div>

      <div className="flex flex-col gap-3">
        {formats.map((f) => (
          <button
            key={f.id}
            onClick={() => onSelect(f.id)}
            className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                type === "audio" ? "bg-green-500/20 text-green-500" : "bg-blue-500/20 text-blue-500"
              )}>
                {type === "audio" ? <FileAudio className="w-5 h-5" /> : <FileVideo className="w-5 h-5" />}
              </div>
              <div className="text-left">
                <div className="text-white font-medium uppercase">{f.name}</div>
                <div className="text-xs text-gray-400">{f.desc}</div>
              </div>
            </div>
            <div className="text-gray-500">&rarr;</div>
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="mt-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        &larr; Go Back
      </button>
    </motion.div>
  );
}
