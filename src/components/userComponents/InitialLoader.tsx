import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import logo from '../../assets/logoog.png';
import loaderBg from '../../assets/loader_bg.png';

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
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          src={loaderBg}
          alt=""
          className="w-full h-full object-cover filter brightness-[0.4] saturate-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_rgba(0,0,0,0.8)_100%)] opacity-80" />
      </div>
      {/* Visual Center: Logo & Orbital Circle */}
      <div className="relative flex items-center justify-center scale-75 md:scale-100 mt-8 mb-4 w-[400px] h-[400px]">
        {/* Animated Circle (Orbital) */}
        <motion.svg 
          width="400" 
          height="400" 
          viewBox="0 0 200 200"
          className="absolute inset-0 m-auto pointer-events-none"
        >
          <motion.circle
            cx="100"
            cy="100"
            r="95"
            stroke="currentColor"
            strokeWidth="1"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="95"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray="596.9"
            className="text-brand"
            initial={{ strokeDashoffset: 596.9 }}
            animate={{ strokeDashoffset: 596.9 - (596.9 * progress) / 100 }}
            transition={{ ease: "linear" }}
            style={{ 
              filter: "drop-shadow(0 0 12px rgba(0, 186, 62, 0.4))",
              strokeLinecap: "round"
            }}
          />
        </motion.svg>

        {/* Official Logo Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 flex justify-center items-center"
        >
          {/* Intense ambient glow behind logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand/20 blur-[60px] rounded-full scale-150 pointer-events-none" />
          
          <motion.img 
            src={logo} 
            alt="Nexera Logo" 
            className="w-48 md:w-64 relative z-10 rounded-3xl ]"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* Content Below */}
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
         className="relative z-10 text-center px-4 max-w-xl scale-75 md:scale-100"
      >
        <div className="text-[10px] md:text-xs font-black text-brand italic tracking-[0.4em] uppercase mb-4 animate-pulse">
          Introducing
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-[0.1em] uppercase mb-6">
          Nexera <span className="text-brand">Market</span>
        </h1>
        <div className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-[0.3em] mb-8 max-w-xs mx-auto leading-relaxed">
          India's most trusted cars market place
        </div>
        
        <div className="text-[14px] md:text-[16px] font-black text-brand uppercase tracking-[0.5em] shadow-brand drop-shadow-lg">
          {Math.round(progress)}%
        </div>
      </motion.div>
      
      {/* Absolute Bottom Label */}
      <div className="absolute bottom-12 text-[8px] font-black text-white/5 uppercase tracking-[0.8em]">
        Elite Protocol Handshake
      </div>
    </motion.div>
  );
};

export default InitialLoader;
