import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EnhancedParallax = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Multiple parallax layers for intense depth
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const middleY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  
  // Text parallax
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [0, 1, 0]);

  // Floating geometric elements parallax (moving at different speeds/directions)
  const floatUp1 = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);
  const floatUp2 = useTransform(scrollYProgress, [0, 1], ["50%", "-80%"]);
  const floatDown1 = useTransform(scrollYProgress, [0, 1], ["-20%", "40%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [-45, 90]);

  return (
    <section ref={containerRef} className="relative h-[120vh] overflow-hidden bg-[#050505] flex items-center justify-center">
      
      {/* Background Layer: Slowest moving */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[#050505]/60 z-10 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1627429184511-b0dbbcf418ff?q=80&w=2000&auto=format&fit=crop" 
          alt="Dark minimalist architecture"
          className="w-full h-full object-cover grayscale opacity-20"
        />
      </motion.div>

      {/* Abstract Floating Premium Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Large Tech Green Glow */}
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-brand/5 blur-[120px]" />
        
        {/* Glowing floating ring */}
        <motion.div 
          style={{ y: floatUp1, rotate: rotate1 }} 
          className="absolute top-[60%] left-[10%] w-64 h-64 rounded-full border border-brand/20 shadow-[0_0_30px_rgba(0,255,102,0.1)] opacity-50"
        />

        {/* Glassmorphic floating square */}
        <motion.div 
          style={{ y: floatDown1, rotate: rotate2 }} 
          className="absolute top-[30%] right-[15%] w-48 h-48 rounded-3xl glass border border-white/5 opacity-40 backdrop-blur-xl"
        />

        {/* Small data accent line */}
        <motion.div 
          style={{ y: floatUp2 }} 
          className="absolute bottom-[20%] left-[30%] w-px h-32 bg-gradient-to-b from-brand/50 to-transparent"
        />
      </div>

      {/* Premium Texture Overlay (Dot Matrix / Noise) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Middle Layer: The Car Object (Moves slightly faster than background) */}
      <motion.div
        className="absolute inset-0 w-full h-full z-10 flex items-center justify-center"
        style={{ y: middleY }}
      >
         <img 
          src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop" 
          alt="Premium Hyper Car"
          className="w-full md:w-[80%] lg:w-[60%] h-auto max-h-[80%] object-contain drop-shadow-[0_20px_50px_rgba(0,255,102,0.15)] filter contrast-125 saturate-110"
        />
      </motion.div>

      {/* Foreground Text Layer: Scales and fades */}
      <motion.div 
        className="relative z-20 text-center pointer-events-none"
        style={{ 
          scale: textScale,
          opacity: textOpacity
        }}
      >
        <h2 className="text-[10vw] font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 leading-none mix-blend-overlay">
          AERODYNAMIC
        </h2>
        <p className="text-brand font-bold tracking-[1em] uppercase text-sm md:text-xl mt-4 drop-shadow-[0_0_10px_rgba(0,255,102,0.5)]">
          Perfection
        </p>
      </motion.div>

      {/* Overlay Gradients to blend sections smoothly back into the deep dark body background */}
      <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-[#050505] to-transparent z-30" />
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-30" />

    </section>
  );
};

export default EnhancedParallax;
