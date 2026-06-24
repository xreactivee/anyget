import { motion } from "framer-motion";
import { Download, CheckCircle, RotateCcw } from "lucide-react";

import type { DownloadReadyProps } from "@/lib/types";

export function DownloadReady({ onReset, data }: DownloadReadyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center gap-6 w-full text-center py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2"
      >
        <CheckCircle className="w-10 h-10" />
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Ready to Download!</h2>
        <p className="text-gray-400 text-sm">Your file has been successfully prepared and is ready to download.</p>
      </div>

      <div className="w-full space-y-3 mt-4">
        <a
          href={data ? `/api/proxy?url=${encodeURIComponent(data.downloadUrl)}&originalUrl=${encodeURIComponent(data.originalUrl || '')}&title=${encodeURIComponent(data.title || 'download')}&ext=${encodeURIComponent(data.format || 'mp4')}${data.headers ? `&headers=${encodeURIComponent(btoa(JSON.stringify(data.headers)))}` : ''}` : '#'}
          download
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
        >
          <Download className="w-5 h-5" />
          Download Now
        </a>

        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-gray-400" />
          Download Another Link
        </button>
      </div>
    </motion.div>
  );
}
