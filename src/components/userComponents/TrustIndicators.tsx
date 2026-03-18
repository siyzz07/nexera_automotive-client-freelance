import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Shield, FileCheck, TriangleAlert, Eye, Gauge, CreditCard, ShieldAlert, Zap } from 'lucide-react';

const trustItems = [
  {
    id: "AUDIT-01",
    icon: <Shield className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Certified Dealers",
    description: "Sourced exclusively from our authorized premium network."
  },
  {
    id: "AUDIT-02",
    icon: <FileCheck className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Ownership Authenticity",
    description: "Rigorous title verification to guarantee clear history."
  },
  {
    id: "AUDIT-03",
    icon: <TriangleAlert className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Accident History Check",
    description: "Zero tolerance for structural damage or major repairs."
  },
  {
    id: "AUDIT-04",
    icon: <Eye className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Insurance Transparency",
    description: "Complete visibility into past claims and coverage."
  },
  {
    id: "AUDIT-05",
    icon: <Gauge className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Odometer Verification",
    description: "Forensic analysis confirming authentic vehicle mileage."
  },
  {
    id: "AUDIT-06",
    icon: <CreditCard className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Loan Clearance",
    description: "Guaranteed free of all previous financial encumbrances."
  },
  {
    id: "AUDIT-07",
    icon: <ShieldAlert className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Theft Record Screening",
    description: "Comprehensive global database clearance."
  }
];

const TrustIndicators = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const textX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="py-24 md:py-48 relative overflow-hidden bg-surface border-t border-white/5">
      {/* Parallax Background Text */}
      <motion.div 
        style={{ x: textX, opacity }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] md:text-[20vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0 uppercase tracking-tighter"
      >
        Verified Protocol Nexera
      </motion.div>

      {/* Atmospheric Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] translate-y-1/2 opacity-50" />
        <div className="noise-overlay opacity-[0.03]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-32 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-brand/20 bg-brand/5 mb-6 md:mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] font-bold text-brand uppercase tracking-[0.3em]">System Security Active</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-8xl font-sans font-bold text-white leading-none tracking-tighter mb-4 md:mb-8 uppercase"
          >
            7-POINT <span className="text-brand-gradient">VERIFICATION</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm md:text-xl leading-relaxed max-w-2xl mx-auto font-light"
          >
            Our proprietary audit protocol ensures every vehicle meets the Nexera gold standard before it ever reaches your screen.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, index) => {
            // Add vertical parallax offset for staggered movement
            const yOffset = useTransform(scrollYProgress, [0, 1], [0, (index % 2 === 0 ? -40 : 40)]);
            
            return (
              <motion.div
                key={index}
                style={{ y: yOffset }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative glass-card !p-0 overflow-hidden flex flex-col"
              >
                {/* Scanline Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand/0 via-brand/[0.03] to-brand/0 -translate-y-full group-hover:translate-y-full transition-transform duration-[2000ms] ease-linear pointer-events-none" />
                
                <div className="p-4 md:p-8 pb-4 flex flex-col items-center text-center flex-grow">
                  {/* Icon Container with background glow effect */}
                  <div className="relative mb-4 md:mb-8 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-brand/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand/40 group-hover:bg-brand/5 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xs md:text-lg font-bold text-white mb-2 md:mb-3 group-hover:text-brand transition-colors tracking-tight uppercase">
                    {item.title}
                  </h3>
                  
                  <p className="text-[10px] md:text-sm text-white/30 leading-relaxed font-light group-hover:text-white/50 transition-colors line-clamp-2 md:line-clamp-none">
                    {item.description}
                  </p>
                </div>

                {/* Protocol Footnote */}
                <div className="px-4 py-3 md:px-8 md:py-5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                  <span className="text-[8px] md:text-[9px] font-mono text-white/20 tracking-widest uppercase truncate mr-2">
                     {item.id}
                  </span>
                  <div className="flex gap-1 flex-shrink-0">
                     <div className="w-1 h-1 rounded-full bg-brand/40" />
                     <div className="w-1 h-1 rounded-full bg-brand/40" />
                     <div className="w-1 h-1 rounded-full bg-brand/40" />
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* Status Monitor Card */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 20]) }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative glass-card !p-4 md:!p-8 flex flex-col justify-center bg-brand/[0.03] border-brand/20 overflow-hidden col-span-2 md:col-span-1"
          >
             <div className="absolute top-0 right-0 p-4">
                <Zap className="w-4 h-4 text-brand/50" />
             </div>
             <div>
                <span className="text-[10px] font-bold text-brand uppercase tracking-widest block mb-4">Live Verification</span>
                <div className="space-y-4">
                   <div className="flex justify-between items-end border-b border-white/5 pb-2">
                      <span className="text-[11px] text-white/20 uppercase tracking-widest">Engine Status</span>
                      <span className="text-xs text-brand font-bold">OPTIMAL</span>
                   </div>
                   <div className="flex justify-between items-end border-b border-white/5 pb-2">
                      <span className="text-[11px] text-white/20 uppercase tracking-widest">Latency</span>
                      <span className="text-xs text-brand font-bold">12ms</span>
                   </div>
                   <div className="flex justify-between items-end border-b border-white/5 pb-2">
                      <span className="text-[11px] text-white/20 uppercase tracking-widest">Sync</span>
                      <span className="text-xs text-brand font-bold">100%</span>
                   </div>
                </div>
                <div className="mt-8">
                   <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-1/2 h-full bg-brand" 
                      />
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
