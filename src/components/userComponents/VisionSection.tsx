import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, BarChart3, Fingerprint, ShieldAlert, Sparkles } from 'lucide-react';

const VisionSection = () => {
  const visionPillars = [
    {
      icon: <Fingerprint className="w-8 h-8 text-brand" />,
      title: "Vehicle Validation",
      description: "Validated through structured verification systems."
    },
    {
      icon: <Users className="w-8 h-8 text-brand" />,
      title: "Accountable Network",
      description: "Dealers operating within trusted networks."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-brand" />,
      title: "Real Data Confidence",
      description: "Decisions backed by real vehicle data."
    }
  ];

  return (
    <section className="relative py-32 lg:py-48 overflow-hidden bg-[#010101]">
      {/* 1. The Foundation Text */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span className="text-[10px] font-black text-brand uppercase tracking-[0.3em]">Core Philosophy</span>
          </div>
          <h2 className="text-[32px] md:text-6xl lg:text-7xl font-sans font-black text-white tracking-tighter uppercase leading-[0.9] mb-12">
            Trust isn’t a feature at Nexera — it’s the <span className="text-brand-gradient">foundation</span> of everything we build.
          </h2>
        </motion.div>
      </div>

      {/* 2. Redefining Trust Block */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8 text-muted">
            <div className="w-12 h-[1px] bg-brand/40" />
            <span className="text-sm font-black text-brand uppercase tracking-[0.4em]">About / Vision</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tighter uppercase mb-10">
            Redefining Trust <br/> in Car Buying
          </h3>
          <div className="space-y-6 text-white/70 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
             <p className="flex gap-4 items-start">
               <ShieldAlert className="w-6 h-6 text-red-500/60 mt-1 shrink-0" />
               The used car market is broken by uncertainty. Buyers don’t trust listings. Sellers struggle with low-quality leads.
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
          <p className="text-white/40 text-[16px] md:text-xl leading-relaxed mb-10 font-medium italic">
            "Nexera aims to eliminate the traditional gaps by creating a standardized system where trust is not assumed — it is built, measured, and guaranteed through technology."
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visionPillars.map((pillar, idx) => (
              <div key={idx} className="glass p-5 rounded-2xl border border-white/5 hover:border-brand/40 transition-colors">
                 <div className="mb-4">{pillar.icon}</div>
                 <h4 className="text-[12px] font-black text-white uppercase tracking-tighter mb-1">{pillar.title}</h4>
                 <p className="text-[10px] text-white/40 font-medium">{pillar.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand/5 rounded-full blur-[200px] pointer-events-none -z-10" />
    </section>
  );
};

export default VisionSection;
