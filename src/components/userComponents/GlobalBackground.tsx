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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020202]">
      
      {/* Optimized Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-10" 
        style={{ 
          backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
          backgroundRepeat: 'repeat',
          willChange: 'transform'
        }} 
      />

      {/* Optimized Tech Green Orbs */}
      <motion.div 
        style={{ y: y1, willChange: 'transform' }}
        className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-brand/[0.02] rounded-[100%] blur-[80px] md:blur-[100px]"
      />
      
      <motion.div 
        style={{ y: y2, willChange: 'transform' }}
        className="absolute top-[40%] right-[-5%] w-[30vw] h-[30vw] bg-brand/[0.02] rounded-[100%] blur-[60px] md:blur-[80px]"
      />

      <motion.div 
        style={{ y: y3, willChange: 'transform' }}
        className="absolute bottom-[-5%] left-[15%] w-[45vw] h-[45vw] bg-brand/[0.02] rounded-[100%] blur-[80px] md:blur-[100px]"
      />

      {/* Floating Geometric Wireframes */}
      <motion.div 
        style={{ y: y2, rotate: rotate1, willChange: 'transform' }} 
        className="absolute top-[30%] left-[8%] w-48 h-48 rounded-full border border-brand/10 shadow-[0_0_80px_rgba(0,77,38,0.06)] opacity-10"
      />

      <motion.div 
        style={{ y: y1, rotate: rotate2, willChange: 'transform' }} 
        className="absolute bottom-[40%] right-[12%] w-72 h-72 rounded-full border border-white/5 opacity-20"
      />

      {/* Vertical Tech Streaks */}
      <motion.div 
        style={{ y: y2, willChange: 'transform' }}
        className="absolute top-[10%] left-[20%] w-[1px] h-[30vh] bg-gradient-to-b from-transparent via-brand/20 to-transparent opacity-40"
      />
      
      <motion.div 
        style={{ y: y1, willChange: 'transform' }}
        className="absolute top-[40%] right-[30%] w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-brand/10 to-transparent opacity-40"
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.01]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #004d26 1px, transparent 1px), linear-gradient(to bottom, #004d26 1px, transparent 1px)', 
          backgroundSize: '160px 160px',
          willChange: 'transform'
        }} 
      />
    </div>
  );
};

export default GlobalBackground;
