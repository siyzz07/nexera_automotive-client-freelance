import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Shield, FileCheck, TriangleAlert, Eye, Gauge, CreditCard, ShieldAlert, Sparkles, Award } from 'lucide-react';
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

        {/* Main Trust Architecture Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="glass-card !p-0 rounded-[40px] md:rounded-[60px] overflow-hidden relative border border-white/10 shadow-3xl bg-white/[0.02]">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-40 pointer-events-none" />

            <div className="px-8 py-12 md:px-20 md:py-24 text-center relative z-10">
              <motion.h3 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-2xl md:text-5xl font-sans font-bold text-white mb-16 tracking-tight"
              >
                Redefining <span className="text-brand">Trust</span> in Car Buying
              </motion.h3>

              <div className="grid grid-cols-3 gap-2 sm:gap-8 md:gap-12">
                {[
                  { text: "VERIFIED LISTINGS", desc: "100% physically inspected", icon: <ShieldCheck className="w-5 h-5 sm:w-8 sm:h-8 text-brand" /> },
                  { text: "TRUSTED DEALERS", desc: "Elite authorized partners", icon: <Award className="w-5 h-5 sm:w-8 sm:h-8 text-brand" /> },
                  { text: "TRANSPARENT DEALS", desc: "Zero hidden costs", icon: <FileCheck className="w-5 h-5 sm:w-8 sm:h-8 text-brand" /> }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex flex-col items-center group cursor-default"
                  >
                    <div className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 group-hover:bg-brand/20 transition-all duration-500 shadow-[0_0_20px_rgba(0,223,93,0.1)]">
                      {item.icon}
                    </div>
                    <h4 className="text-[7px] sm:text-lg md:text-xl font-black text-white tracking-[0.05em] sm:tracking-[0.1em] uppercase mb-1 sm:mb-2 group-hover:text-brand transition-colors text-center">
                      {item.text}
                    </h4>
                    <p className="text-[6px] sm:text-[10px] md:text-sm text-white/40 font-medium uppercase tracking-[0.05em] sm:tracking-widest text-center">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;