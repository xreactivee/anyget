"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { DownloaderModal } from "@/components/DownloaderModal";
import { motion } from "framer-motion";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans">

      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Media Downloader Active
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-r from-white via-gray-200 to-gray-500">
            Download Your Favorite Media<br />Instantly
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            YouTube, Spotify, Instagram, and more. Save high-quality audio and video files to your device in seconds.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <Download className="w-6 h-6" />
            <span>Get Started</span>
          </button>
        </motion.div>
      </div>

      <DownloaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
