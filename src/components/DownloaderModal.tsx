import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { PlatformSelect } from "./steps/PlatformSelect";
import { TypeSelect } from "./steps/TypeSelect";
import { FormatSelect } from "./steps/FormatSelect";
import { LinkInput } from "./steps/LinkInput";
import { LoadingAnimation } from "./steps/LoadingAnimation";
import { DownloadReady } from "./steps/DownloadReady";
import type { Platform, DownloadType, Format, DownloaderModalProps, DownloadData } from "@/lib/types";

export function DownloaderModal({ isOpen, onClose }: DownloaderModalProps) {
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [type, setType] = useState<DownloadType | null>(null);
  const [format, setFormat] = useState<Format | null>(null);
  const [link, setLink] = useState<string>("");
  const [downloadData, setDownloadData] = useState<DownloadData | null>(null);

  const handleReset = () => {
    setStep(1);
    setPlatform(null);
    setType(null);
    setFormat(null);
    setLink("");
    setDownloadData(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(handleReset, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />


      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-[#111111] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >

        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        <div className="p-6 sm:p-10 pt-12 sm:pt-16 min-h-100 flex items-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <PlatformSelect
                key="step1"
                onSelect={(p) => {
                  setPlatform(p);
                  if (p === "spotify") {
                    setType("audio");
                    setStep(3);
                  } else {
                    setStep(2);
                  }
                }}
              />
            )}

            {step === 2 && platform && (
              <TypeSelect
                key="step2"
                platform={platform}
                onSelect={(t) => {
                  setType(t);
                  setStep(3);
                }}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && platform && type && (
              <FormatSelect
                key="step3"
                platform={platform}
                type={type}
                onSelect={(f) => {
                  setFormat(f);
                  setStep(4);
                }}
                onBack={() => {
                  if (platform === "spotify") {
                    setStep(1);
                  } else {
                    setStep(2);
                  }
                }}
              />
            )}

            {step === 4 && platform && (
              <LinkInput
                key="step4"
                platform={platform}
                onSubmit={(l) => {
                  setLink(l);
                  setStep(5);
                  
                  Promise.all([
                    fetch("/api/download", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ url: l, platform, type, format })
                    }).then(res => res.json()),
                    new Promise(resolve => setTimeout(resolve, 4000))
                  ]).then(([data]) => {
                    if (data.success) {
                      setDownloadData(data);
                      setStep(6);
                    } else {
                      alert("Error: " + (data.error || "Failed to download"));
                      setStep(4);
                    }
                  }).catch(err => {
                    alert("Error: " + err.message);
                    setStep(4);
                  });
                }}
                onBack={() => setStep(3)}
              />
            )}

            {step === 5 && (
              <LoadingAnimation
                key="step5"
              />
            )}

            {step === 6 && (
              <DownloadReady
                key="step6"
                data={downloadData}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
