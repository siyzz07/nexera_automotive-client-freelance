import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import carImage from '../../assets/Gemini_Generated_Image_afye8aafye8aafye.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const title3Ref = useRef<HTMLSpanElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const carScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const carOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Initial state: Hidden below "shutter"
    gsap.set(containerRef.current, { opacity: 0 });
    gsap.set([title1Ref.current, title2Ref.current, title3Ref.current], { y: "110%" });
    gsap.set([pRef.current, buttonsRef.current], { opacity: 0, y: 30 });
    gsap.set(bgRef.current, { scale: 1.2, filter: 'blur(20px)', opacity: 0 });
 
    tl.to(containerRef.current, { opacity: 1, duration: 0.5 })
      .to(bgRef.current, {
        scale: 1,
        filter: 'blur(0px)',
        opacity: 1,
        duration: 2.5,
        ease: 'expo.out',
      })
      .to(title1Ref.current, { y: 0, duration: 1.5, ease: 'expo.out' }, "-=1.8")
      .to(title2Ref.current, { y: 0, duration: 1.5, ease: 'expo.out' }, "-=1.3")
      .to(title3Ref.current, { y: 0, duration: 1.5, ease: 'expo.out' }, "-=1.3")
      .to(pRef.current, { opacity: 1, y: 0, duration: 1 }, "-=1")
      .to(buttonsRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.8");
 
    // Parallax on mouse move for the background - only on desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 1024) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(bgRef.current, {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: 'power2.out'
      });
    };
 
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
 
  return (
    <section ref={containerRef} className="relative min-h-screen flex items-start justify-center overflow-hidden bg-black font-sans" style={{ opacity: 0 }}>
      {/* 1. Cinematic Background Layer */}
      <motion.div
        ref={bgRef}
        style={{ scale: carScale, opacity: carOpacity }}
        className="absolute inset-0 w-full h-full z-0 origin-center"
      >
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" /> */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,_transparent_0%,_rgba(0,0,0,0.8)_100%)] z-10" />
        
        <img
          src={carImage}
          alt="Premium Automotive"
          className="w-full h-full object-cover object-left lg:object-right brightness-[0.7] contrast-[1.1] transition-all duration-1000 scale-[1.25] lg:scale-[1.1] -translate-x-0 lg:translate-x-[12%]"
        />

        {/* Technical Glows - Shifted Right */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] bg-brand/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* 2. Digital Particles & Grid Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.15]">
         <div className="noise-overlay" />
         <div className="absolute inset-0" 
           style={{ 
             backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,223,93,0.15) 1px, transparent 0)`,
             backgroundSize: '40px 40px' 
           }} 
         />
      </div>

      {/* 3. Cinematic Content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-center pt-32 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Side: Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
             {/* Shutter reveal titles */}
             <h1 className="text-[28px] sm:text-5xl lg:text-[64px] font-bold tracking-tight leading-tight mb-8 text-white uppercase flex flex-col">
                <div className="overflow-hidden h-[1.3em]">
                   <span ref={title1Ref} className=" block whitespace-nowrap">India's Most Trusted</span>
                </div>
                <div className="overflow-hidden h-[1.3em] relative">
                   <span ref={title2Ref} className="block text-brand-gradient glow-text whitespace-nowrap">Verified Cars</span>
                </div>
                <div className="overflow-hidden h-[1.3em]">
                   <span ref={title3Ref} className="block font-medium text-white/90 whitespace-nowrap">Marketplace.</span>
                </div>
             </h1>

             <p ref={pRef} className="text-white/70 text-lg md:text-xl max-w-lg mb-12 font-medium tracking-tight leading-relaxed">
                 "Buy with confidence. Sell with complete trust."
             </p>

             <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
                <button className="group relative w-full sm:w-auto px-10 py-5 bg-green-500 text-black/90  font-black uppercase tracking-widest rounded-3xl overflow-hidden transition-all duration-500 shadow-[0_0_40px_rgba(0,223,93,0.3)] hover:shadow-[0_0_60px_rgba(0,223,93,0.5)] active:scale-95">
                   <span className="relative z-10">Find Your Verified Car</span>
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                
                <button className="w-full sm:w-auto px-10 py-5 glass text-white font-bold uppercase tracking-widest rounded-3xl border border-white/10 hover:border-brand/40 hover:bg-white/[0.05] transition-all duration-500 active:scale-95">
                   Sell Your Car
                </button>
             </div>
          </div>

          {/* Right Side: Virtual Space for the Car (Image is handled by absolute layer below) */}
          <div className="relative hidden lg:block h-[600px]">
             {/* Floating Interactive Badge (Repositioned for better visual balance) */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 2, duration: 1 }}
               className="absolute top-1/2 right-12 -translate-y-1/2 z-30 pointer-events-auto"
             >
                <div className="glass p-8 rounded-[40px] border-brand/30 flex flex-col items-center gap-2 group shadow-[0_0_40px_rgba(0,223,93,0.1)] hover:shadow-[0_0_60px_rgba(0,223,93,0.2)] transition-all duration-700">
                   <div className="w-14 h-14 clip-path-hexagon bg-brand/20 flex items-center justify-center text-brand mb-1 group-hover:rotate-[360deg] transition-transform duration-1000">
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                         <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                   </div>
                   <div className="flex flex-col items-center">
                     <span className="text-4xl font-black text-white leading-none">100%</span>
                     <span className="text-[11px] font-black text-brand uppercase tracking-[0.3em] mt-1">Verified</span>
                     <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.1em]">Marketplace</span>
                   </div>
                </div>

                {/* Technical "Verified" Tick hanging in space */}
               
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
