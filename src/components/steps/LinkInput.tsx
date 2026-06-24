import { useState } from "react";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import type { LinkInputProps } from "@/lib/types";

export function LinkInput({ platform, onSubmit, onBack }: LinkInputProps) {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!link.trim()) {
      setError("Please enter a valid link.");
      return;
    }

    setError("");
    onSubmit(link.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6 w-full"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Enter Link</h2>
        <p className="text-gray-400 text-sm capitalize">Paste the {platform} link below.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Link2 className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
              if (error) setError("");
            }}
            placeholder="https://..."
            className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
            autoFocus
          />
        </div>
        {error && <p className="text-red-400 text-xs px-2">{error}</p>}

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
        >
          Continue
        </button>
      </form>

      <button
        onClick={onBack}
        className="mt-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        &larr; Go Back
      </button>
    </motion.div>
  );
}
