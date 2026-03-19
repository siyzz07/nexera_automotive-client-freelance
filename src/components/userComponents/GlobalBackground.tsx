import { motion, useScroll, useTransform } from 'framer-motion';

const GlobalBackground = () => {
  const { scrollYProgress } = useScroll();

  // Scroll transformations mapped to the entire window's vertical scroll
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["-20%", "40%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#000000]">
      
      {/* Optimized Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" 
        style={{ 
          backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
          backgroundRepeat: 'repeat',
          willChange: 'transform'
        }} 
      />

      {/* Optimized Tech White Orbs instead of Green */}
      <motion.div 
        style={{ y: y1, willChange: 'transform' }}
        className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] bg-white/5 rounded-[100%] blur-[160px] md:blur-[180px]"
      />
      
      <motion.div 
        style={{ y: y2, willChange: 'transform' }}
        className="absolute top-[35%] right-[-10%] w-[40vw] h-[40vw] bg-white/5 rounded-[100%] blur-[120px] md:blur-[140px]"
      />

      <motion.div 
        style={{ y: y3, willChange: 'transform' }}
        className="absolute bottom-[-10%] left-[10%] w-[55vw] h-[55vw] bg-white/5 rounded-[100%] blur-[160px] md:blur-[180px]"
      />

      {/* Floating Geometric Wireframes */}
      <motion.div 
        style={{ y: y2, rotate: rotate1, willChange: 'transform' }} 
        className="absolute top-[30%] left-[8%] w-48 h-48 rounded-full border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)] opacity-30"
      />

      <motion.div 
        style={{ y: y1, rotate: rotate2, willChange: 'transform' }} 
        className="absolute bottom-[40%] right-[12%] w-72 h-72 rounded-full border border-white/10 opacity-40"
      />

      {/* Vertical Tech Streaks */}
      <motion.div 
        style={{ y: y2, willChange: 'transform' }}
        className="absolute top-[10%] left-[20%] w-[1px] h-[30vh] bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-40"
      />
      
      <motion.div 
        style={{ y: y1, willChange: 'transform' }}
        className="absolute top-[40%] right-[30%] w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-40"
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', 
          backgroundSize: '160px 160px',
          willChange: 'transform'
        }} 
      />
    </div>
  );
};

export default GlobalBackground;
