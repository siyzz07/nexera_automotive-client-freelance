import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface InitialLoaderProps {
  onLoadingComplete: () => void;
}

const InitialLoader: React.FC<InitialLoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 800);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex items-center justify-center">
        {/* Animated Circle (Orbital) */}
        <motion.svg 
          width="200" 
          height="200" 
          viewBox="0 0 200 200"
          className="absolute"
        >
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray="502.6"
            className="text-brand"
            initial={{ strokeDashoffset: 502.6 }}
            animate={{ strokeDashoffset: 502.6 - (502.6 * progress) / 100 }}
            transition={{ ease: "linear" }}
            style={{ 
              filter: "drop-shadow(0 0 8px rgba(0, 186, 62, 0.5))",
              strokeLinecap: "round"
            }}
          />
          {/* Rotating Pulse Glow */}
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            stroke="currentColor"
            strokeWidth="1"
            fill="transparent"
            className="text-brand opacity-30"
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.svg>

        {/* Central Logo */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           className="relative z-10 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-[0.6em] uppercase italic mb-2 ml-[0.6em]">
            Nexera
          </h1>
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] translate-x-[0.2em]">
            {Math.round(progress)}%
          </div>
        </motion.div>
      </div>
      
      {/* Absolute Bottom Label */}
      <div className="absolute bottom-12 text-[8px] font-black text-white/10 uppercase tracking-[0.5em]">
        Elite Protocol Handshake
      </div>
    </motion.div>
  );
};

export default InitialLoader;
