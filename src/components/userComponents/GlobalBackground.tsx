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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      
      {/* Noise Texture for premium grit */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} 
      />

      {/* Huge Subtle Tech Green Orbs that Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-brand/5 rounded-[100%] blur-[150px]"
      />
      
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[50%] right-[-10%] w-[40vw] h-[40vw] bg-brand/5 rounded-[100%] blur-[120px]"
      />

      <motion.div 
        style={{ y: y3 }}
        className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-brand/3 rounded-[100%] blur-[150px]"
      />

      {/* Floating Geometric Wireframes */}
      <motion.div 
        style={{ y: y2, rotate: rotate1 }} 
        className="absolute top-[30%] left-[8%] w-64 h-64 rounded-full border border-brand/10 shadow-[0_0_50px_rgba(0,255,102,0.05)] opacity-30"
      />

      <motion.div 
        style={{ y: y1, rotate: rotate2 }} 
        className="absolute bottom-[40%] right-[12%] w-96 h-96 rounded-full border border-white/5 opacity-20"
      />

      {/* Vertical Tech Streaks */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[10%] left-[20%] w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-brand/20 to-transparent opacity-50"
      />
      
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[40%] right-[30%] w-[1px] h-[50vh] bg-gradient-to-b from-transparent via-brand/10 to-transparent opacity-50"
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #00FF66 1px, transparent 1px), linear-gradient(to bottom, #00FF66 1px, transparent 1px)', 
          backgroundSize: '120px 120px' 
        }} 
      />
    </div>
  );
};

export default GlobalBackground;
