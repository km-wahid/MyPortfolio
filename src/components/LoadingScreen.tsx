import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [closing, setClosing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const closeTimer = setTimeout(() => setClosing(true), 200);
      const doneTimer = setTimeout(onComplete, 700);
      return () => {
        clearTimeout(closeTimer);
        clearTimeout(doneTimer);
      };
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-900 px-4 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={closing ? { opacity: 0, y: '-100%' } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Skater Loader */}
      <div className="loader">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="base">
          <span></span>
          <div className="face"></div>
        </div>
      </div>
      <div className="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="absolute bottom-[20%] flex flex-col items-center max-w-xs w-full text-center z-10">
        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Subtext */}
        <motion.span
          className="text-xs text-gray-500 mt-4 font-mono tracking-widest uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          Initializing Portfolio
        </motion.span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
