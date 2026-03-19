import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Target, Users, BarChart3, Fingerprint, ShieldAlert, Sparkles } from 'lucide-react';
import GlobalBackground from '../../components/userComponents/GlobalBackground';
import aboutBg from '../../assets/aboutpageimg.jpeg';
import { useRef } from 'react';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const visionPillars = [
    {
      icon: <Fingerprint className="w-8 h-8 text-brand" />,
      title: "Vehicle Validation",
      description: "Every vehicle is validated through structured, multi-point verification systems before it ever reaches our platform."
    },
    {
      icon: <Users className="w-8 h-8 text-brand" />,
      title: "Trusted Network",
      description: "Every dealer operates within a verified, trusted and accountable network, ensuring excellence in every interaction."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-brand" />,
      title: "Data Confidence",
      description: "Every buyer can make decisions with complete confidence, backed by real-time vehicle data and transparent history."
    }
  ];

  return (
    <div ref={containerRef} className="w-full relative min-h-screen pt-32 pb-40 overflow-hidden bg-[#000000]">
      <GlobalBackground />
      
      {/* Parallax Background Asset */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.img 
          style={{ y: bgY }}
          src={aboutBg} 
          alt="" 
          className="w-full h-[120%] object-cover opacity-50 brightness-[0.8] saturate-[1.2] mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/20 via-black/60 to-[#000000] z-10" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-[80vw] h-[80vw] bg-brand/10 rounded-full blur-[180px] opacity-40 z-0 pointer-events-none" />
      
      {/* 1. Foreword Section */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 mb-32 lg:mb-48">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span className="text-[10px] font-black text-brand uppercase tracking-[0.3em]">The Nexera Creed</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-sans font-black text-white tracking-tighter uppercase leading-[0.9] mb-12">
            Trust isn’t a feature at Nexera — it’s the <span className="text-brand-gradient">foundation</span> of everything we build.
          </h1>
        </motion.div>
      </div>

      {/* 2. Vision Section - Broken Market vs Nexera Fix */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-40 lg:mb-56">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-brand/40" />
            <span className="text-sm font-black text-brand uppercase tracking-[0.4em]">About / Vision</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tighter uppercase mb-10">
            Redefining Trust in <br/> Car Buying
          </h2>
          <div className="space-y-6 text-white/70 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
             <p className="flex gap-4 items-start">
               <ShieldAlert className="w-6 h-6 text-red-500/60 mt-1 shrink-0" />
               The used car market is broken by uncertainty. Buyers don’t trust listings, and sellers struggle with low-quality leads.
             </p>
             <p className="p-8 glass-card border-brand/30 text-white font-bold">
               Nexera is built to fix that. We are creating a system where every car is verified, every seller is accountable, and every deal is transparent.
             </p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="flex flex-col justify-center"
        >
          <p className="text-white/40 text-lg md:text-xl leading-relaxed mb-10 font-medium italic">
            "Nexera aims to eliminate the traditional gaps in the automotive marketplace by creating a standardized system where trust is not assumed — it is built, measured, and guaranteed through technology."
          </p>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-brand/20 border border-brand/40 flex items-center justify-center text-brand">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <p className="text-white font-black uppercase tracking-widest text-sm">Seal of Authority</p>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mt-1">Certified Trust Protocols</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Long Term Vision Pillars */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
         <div className="mb-20">
           <h3 className="text-2xl font-black text-white uppercase tracking-[0.4em] mb-4">Long-Term Vision</h3>
           <p className="text-white/40 font-medium">Building the infrastructure for the future of automotive commerce.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visionPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card group hover:border-brand/60 transition-all duration-700"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand/10 transition-all duration-700">
                  {pillar.icon}
                </div>
                <h4 className="text-xl font-black text-white uppercase tracking-tight mb-4">{pillar.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed font-medium">{pillar.description}</p>
                
                <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-brand uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                   <Target className="w-3 h-3" />
                   Priority Protocol
                </div>
              </motion.div>
            ))}
         </div>
      </div>

      {/* Final Call to Action Visual Backdrop */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand/10 via-transparent to-transparent pointer-events-none -z-10" />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brand/5 rounded-full blur-[200px] pointer-events-none -z-10" 
      />
    </div>
  );
};

export default About;
