import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const closeTimer = setTimeout(() => setClosing(true), 900);
    const doneTimer = setTimeout(onComplete, 1650);
    return () => {
      clearTimeout(closeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{
        background: 'radial-gradient(ellipse at 50% 35%, #131c2f 0%, #0B0F1A 60%, #070a13 100%)',
      }}
      initial={{ y: 0 }}
      animate={closing ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="loader-terminal-shell">
        <div className="loader-terminal-head">terminal://loading</div>
        <div className="loader-terminal-body">
          <div className="loader-command-line">
            <span className="loader-prompt">$</span> launching portfolio...
          </div>
          <div className="dino-loader">
            <div className="dino-runner" />
            <div className="dino-obstacle" />
            <div className="dino-ground" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
