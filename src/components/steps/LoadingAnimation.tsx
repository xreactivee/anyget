import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DotmSquare18 } from "@/components/ui/dotm-square-18";
import "@/styles/dotmatrix-loader.css";


const loadingSteps = [
  "Checking connection...",
  "Fetching media info...",
  "Preparing file...",
  "Creating download link...",
  "Almost ready..."
];

export function LoadingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const totalDuration = 4000;
    const intervalTime = 50;
    const stepsCount = totalDuration / intervalTime;
    let currentStepCount = 0;

    const timer = setInterval(() => {
      currentStepCount++;
      const newProgress = (currentStepCount / stepsCount) * 100;


      if (newProgress < 20) setCurrentStep(0);
      else if (newProgress < 40) setCurrentStep(1);
      else if (newProgress < 60) setCurrentStep(2);
      else if (newProgress < 85) setCurrentStep(3);
      else setCurrentStep(4);

      if (currentStepCount >= stepsCount) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center justify-center gap-8 w-full py-8"
    >
      <div className="relative flex items-center justify-center h-24 text-white">
        <DotmSquare18
          size={84}
          dotSize={12}
          speed={0.85}
          pattern="full"
          color="#ffffff"
          animated
          opacityBase={0.12}
          opacityMid={0.42}
          opacityPeak={1}
        />
      </div>

      <div className="text-center h-6">
        <motion.p
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-gray-300 text-sm font-medium"
        >
          {loadingSteps[currentStep]}
        </motion.p>
      </div>
    </motion.div>
  );
}
