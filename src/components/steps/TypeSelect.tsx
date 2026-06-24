import { motion } from "framer-motion";
import { Music, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Platform, DownloadType, TypeSelectProps } from "@/lib/types";

export function TypeSelect({ platform, onSelect, onBack }: TypeSelectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6 w-full"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Download Type</h2>
        <p className="text-gray-400 text-sm">
          {platform === "instagram" ? "Select audio or video for Instagram." : "What do you want to download?"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelect("video")}
          className="flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500 transition-all duration-300 group"
        >
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Video className="w-8 h-8 text-blue-500" />
          </div>
          <span className="text-lg font-medium text-white">Video</span>
          <span className="text-xs text-gray-400 mt-2 text-center">Original quality video file</span>
        </button>

        <button
          onClick={() => onSelect("audio")}
          className="flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-green-500/10 hover:border-green-500 transition-all duration-300 group"
        >
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Music className="w-8 h-8 text-green-500" />
          </div>
          <span className="text-lg font-medium text-white">Audio</span>
          <span className="text-xs text-gray-400 mt-2 text-center">High quality audio file</span>
        </button>
      </div>

      <button
        onClick={onBack}
        className="mt-4 text-sm text-gray-400 hover:text-white transition-colors"
      >
        &larr; Go Back
      </button>
    </motion.div>
  );
}
