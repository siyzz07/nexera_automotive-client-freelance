import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X, Check, ShieldCheck, Shield, FileCheck, TriangleAlert, Eye, Gauge, CreditCard, ShieldAlert, Sparkles } from 'lucide-react';
import compBg from '../../assets/comparison_section_bg_showroom.png';

const trustItems = [
  {
    icon: <Shield className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Certified\nDealers",
    description: "Sourced exclusively from our authorized premium network."
  },
  {
    icon: <FileCheck className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Ownership\nAuthenticity",
    description: "Rigorous title verification to guarantee clear history."
  },
  {
    icon: <TriangleAlert className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Accident\nHistory Check",
    description: "Zero tolerance for structural damage or major repairs."
  },
  {
    icon: <Eye className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Insurance\nTransparency",
    description: "Complete visibility into past claims and coverage."
  },
  {
    icon: <Gauge className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Odometer\nVerification",
    description: "Forensic analysis confirming authentic vehicle mileage."
  },
  {
    icon: <CreditCard className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Loan\nClearance",
    description: "Guaranteed free of all previous financial encumbrances."
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Theft Record\nScreening",
    description: "Comprehensive global database clearance."
  }
];

const ComparisonSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 bg-black overflow-hidden border-t border-white/5">
      {/* Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute inset-0 bg-black z-0" />
         <motion.div style={{ y: bgY, opacity }} className="absolute inset-0 z-10">
            <img src={compBg} alt="" className="w-full h-full object-cover scale-110 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black z-20" />
         </motion.div>
         <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand/10 rounded-full blur-[160px] z-30 opacity-40" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand animate-pulse" />
            <span className="text-[10px] font-black text-brand uppercase tracking-[0.3em]">Protocol Verified</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-sans font-bold text-white tracking-tighter uppercase mb-6"
          >
            Why <span className="text-brand-gradient">Nexera</span>
          </motion.h2>
          
 
        </div>

        {/* 7-Point Grid with 3D Interaction */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 md:gap-5 mb-24 md:mb-32">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative flex flex-col items-center text-center bg-white/[0.1] backdrop-blur-2xl border border-white/15 rounded-lg p-6 md:p-8 transition-all duration-500 hover:border-brand/60 hover:bg-brand/[0.08] hover:shadow-[0_10px_40px_rgba(0,223,93,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-brand/0 via-brand/[0.05] to-brand/0 -translate-y-full group-hover:translate-y-full transition-transform duration-[1500ms] ease-linear pointer-events-none" />
              
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center mb-5 group-hover:border-brand/40  group-hover:text-black group-hover:scale-110 transition-all duration-500 shadow-xl">
                {item.icon}
              </div>
              
              <div className="space-y-1.5 min-h-[40px] flex flex-col justify-center">
                <h3 className="text-[10px] md:text-xs font-black text-white group-hover:text-brand transition-colors tracking-widest uppercase whitespace-pre-line leading-tight">
                  {item.title}
                </h3>
                <p className="hidden md:block text-[9px] text-white/30 font-bold tracking-tight uppercase">
                  {item.description}
                </p>
              </div>


            </motion.div>
          ))}
        </div>

        {/* Main Comparison Card */}
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute -inset-8 bg-brand/5 blur-[120px] rounded-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="group/card glass-card !p-0 rounded-[40px] md:rounded-[60px] overflow-hidden flex flex-col md:flex-row relative z-10 border-white/10 shadow-2xl hover:border-brand/20 transition-all duration-700"
          >
            {/* Split Screen Divider */}
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent z-20" />

            {/* Others Panel */}
            <div className="flex-1 p-8 sm:p-12 lg:p-20 space-y-10 md:space-y-16 relative bg-white/[0.01] grayscale-[0.5] opacity-60 hover:opacity-80 transition-opacity duration-500">
               <div className="flex items-center gap-6 relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] bg-red-500/5 flex items-center justify-center text-red-500/30 border border-red-500/10">
                     <X className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white/80 uppercase tracking-[0.2em]">The Market</h3>
                    <p className="text-[10px] md:text-xs font-bold text-red-500/40 uppercase tracking-[0.4em]">Risky & Unverified</p>
                  </div>
               </div>
               
               {/* Risk Indicator for Others */}


               <div className="space-y-8 relative z-10">
                  {[
                    { text: "Ghost Inventory", desc: "Phantom ads used to bait-and-switch buyers." },
                    { text: "Hidden Liabilities", desc: "Uncleared loans and disclosed mechanical failures." },
                    { text: "Opacity as Standard", desc: "No proof of ownership or service history provided." }
                   ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5 md:gap-7 group/item">
                      <div className="mt-1.5 w-6 h-6 rounded-lg border border-red-500/20 bg-red-500/10 flex items-center justify-center text-red-500/70 flex-shrink-0">
                         <X className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                      <div>
                        <span className="text-lg md:text-xl text-white/70 font-bold transition-colors group-hover/item:text-white/50">{item.text}</span>
                        <p className="text-xs md:text-sm text-white/50 mt-2 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Nexera Panel */}
            <div className="flex-1 p-8 sm:p-12 lg:p-20 space-y-10 md:space-y-16 relative overflow-hidden bg-brand/[0.03] shadow-[inset_0_0_100px_rgba(0,223,93,0.05)]">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60" />
               <div className="noise-overlay opacity-[0.02]" />
               
               <div className="flex items-center gap-6 relative z-10">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] bg-brand/10 flex items-center justify-center text-brand border border-brand/20 shadow-[0_0_30px_rgba(0,223,93,0.2)]">
                      <Check className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-[0.2em]">Nexera</h3>
                    <p className="text-[10px] md:text-xs font-bold text-brand uppercase tracking-[0.4em]">The Elite Protocol</p>
                  </div>
               </div>
               {/* Security Level Indicator for Nexera */}
   

               <div className="space-y-8 relative z-10">
                  {[
                    { text: "Physical Forensic Audits", desc: "Every vehicle personally inspected by our experts." },
                    { text: "Absolute Transparency", desc: "Full ownership, accidental, and loan clearing proof." },
                    { text: "Curated Excellence", desc: "Only the top 5% of marketplace inventory is listed." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-start gap-5 md:gap-7 group/item"
                    >
                      <div className="mt-1.5 w-6 h-6 rounded-lg bg-brand/20 flex items-center justify-center text-brand border border-brand/40 shadow-[0_0_15px_rgba(0,223,93,0.2)] flex-shrink-0">
                         <Check className="w-3.5 h-3.5" strokeWidth={4} />
                      </div>
                      <div>
                        <span className="text-lg md:text-xl text-white font-black tracking-tight group-hover/item:text-brand transition-colors">{item.text}</span>
                        <p className="text-xs md:text-sm text-white/40 mt-2 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
               </div>

               {/* Nexera's Promise Badge */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 }}
                 className="mt-12 pt-10 border-t border-white/10 relative z-10"
               >
                  <div className="inline-flex items-center gap-4 px-6 py-3 bg-brand text-black rounded-2xl shadow-[0_0_40px_rgba(0,223,93,0.3)] group hover:scale-105 transition-all duration-500 cursor-default">
                      <ShieldCheck className="w-5 h-5" />
                     <span className="text-xs font-black uppercase tracking-[0.2em]">Zero-Risk Ownership Guaranteed</span>
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
