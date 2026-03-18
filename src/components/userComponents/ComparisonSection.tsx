import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X, Check, ShieldCheck } from 'lucide-react';
import compBg from '../../assets/comparison_section_bg_showroom.png';

const ComparisonSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-black overflow-hidden border-t border-white/5">
      {/* Background Atmosphere & Assets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* 1. Base Dark Layer */}
         <div className="absolute inset-0 bg-black z-0" />

         {/* 2. Image Layer with Parallax */}
         <motion.div 
           style={{ y: bgY }}
           className="absolute inset-0 z-10 opacity-80"
         >
            <img 
              src={compBg} 
              alt="" 
              className="w-full h-full object-cover scale-110"
            />
         </motion.div>
         
         {/* 3. Cinematic Overlays */}
         <div className="absolute inset-0 bg-radial-vignette z-20" />
         {/* <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-30 translate-y-[500px]" /> */}
         <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-brand/10 rounded-full blur-[100px] md:blur-[160px] z-30" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-20 space-y-4 md:space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl  sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight"
          >
            Before Nexera <span className="text-gray-500">vs</span> <span className="text-brand">After Nexera</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
          >
            Nexera changes the game with verified, honest car buying.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto relative group">
          {/* Outer Glow behind the card */}
          <div className="absolute -inset-4 bg-brand/5 blur-[100px] rounded-[60px] opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000" />
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card !p-0 rounded-[30px] md:rounded-[40px] overflow-hidden flex flex-col md:flex-row relative z-10 border-white/5"
          >
            {/* Center Vertical Divider (on desktop) */}
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent z-20" />

            {/* Left Side: Others (The Past) */}
            <div className="flex-1 p-6 sm:p-10 lg:p-16 space-y-8 md:space-y-12 relative bg-white/[0.01] border-b border-white/5 md:border-b-0">
               <div className="noise-overlay opacity-[0.03]" />
               
               <div className="flex items-center gap-4 md:gap-5 relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-red-500/5 flex items-center justify-center text-red-500/50 border border-red-500/10">
                     <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white/90 uppercase tracking-[0.2em]">Others</h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-red-500/40 uppercase tracking-widest">Inefficient & Risky</p>
                  </div>
               </div>

               <div className="space-y-6 relative z-10">
                  {[
                    { text: "Fake listings & Ghost Ads", desc: "Sellers pushing phantom inventory" },
                    { text: "Undisclosed Mechanical Issues", desc: "No verification on vehicle health" },
                    { text: "Wasted Hours of Negotiation", desc: "Uncertainty at every step" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-start gap-4 md:gap-6 group"
                    >
                      <div className="mt-1 w-5 h-5 md:w-6 md:h-6 rounded-lg border border-red-500/20 bg-red-500/5 flex items-center justify-center text-red-500/40 flex-shrink-0">
                         <X className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={3} />
                      </div>
                      <div>
                        <span className="text-base md:text-lg text-white/40 font-medium transition-colors group-hover:text-white/60">{item.text}</span>
                        <p className="text-[11px] md:text-xs text-white/20 mt-1">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Right Side: Nexera (The Future) */}
            <div className="flex-1 p-6 sm:p-10 lg:p-16 space-y-8 md:space-y-12 relative overflow-hidden bg-brand/[0.02]">
               <div className="noise-overlay opacity-[0.02]" />
               
               {/* Internal Glow */}
               <div className="absolute top-0 right-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-brand/5 rounded-full blur-[60px] md:blur-[100px] -translate-y-1/2 translate-x-1/2" />

               <div className="flex items-center gap-4 md:gap-5 relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-brand/10 flex items-center justify-center text-brand border border-brand/20 shadow-[0_0_20px_rgba(0,223,93,0.2)]">
                      <Check className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-[0.2em]">Nexera</h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-brand uppercase tracking-widest">The Gold Standard</p>
                  </div>
               </div>

               <div className="space-y-6 relative z-10">
                  {[
                    { text: "100% Manually Verified Cars", desc: "Every car passes a 7-point audit" },
                    { text: "Total Digital Transparency", desc: "Real photos, real history, real deals" },
                    { text: "Direct Trusted Transactions", desc: "Seamless, secure ownership transfer" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (0.1 * i) }}
                      className="flex items-start gap-4 md:gap-6 group"
                    >
                      <div className="mt-1 w-5 h-5 md:w-6 md:h-6 rounded-lg bg-brand/20 flex items-center justify-center text-brand shadow-[0_0_15px_rgba(0,223,93,0.3)] border border-brand/40 group-hover:scale-110 transition-transform flex-shrink-0">
                         <Check className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={4} />
                      </div>
                      <div>
                        <span className="text-base md:text-lg text-white font-semibold tracking-wide group-hover:text-brand transition-colors">{item.text}</span>
                        <p className="text-[11px] md:text-xs text-white/40 mt-1">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
               </div>

               {/* Nexera's Promise Badge */}
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.6 }}
                 className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5 relative z-10"
               >
                  <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 bg-brand/5 border border-brand/20 rounded-xl md:rounded-2xl backdrop-blur-md group hover:border-brand transition-all duration-500">
                      <ShieldCheck className="w-4 h-4 md:w-[18px] md:h-[18px] text-brand animate-pulse" />
                     <span className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-[0.2em] group-hover:text-brand transition-colors">Zero-Risk Protocol</span>
                  </div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
