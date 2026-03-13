import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Zap } from 'lucide-react';

const features = [
  {
    kicker: "TRUST",
    title: "TRUSTED\nCOMMERCE",
    description: "Every listing verified. Every\ntransaction transparent.",
    icon: <ShieldCheck className="w-8 h-8 text-brand stroke-[1.5]" />,
    active: true
  },
  {
    kicker: "CONFIDENCE",
    title: "BUY WITH\nCONFIDENCE",
    description: "Verified dealers. Authentic\nvehicles. Real listings.",
    icon: <Target className="w-8 h-8 text-white/50 stroke-[1.5] group-hover:text-white transition-colors" />,
    active: false
  },
  {
    kicker: "NETWORK",
    title: "VERIFIED DEALER\nNETWORK",
    description: "Built on credibility, powered by\nNexera.",
    icon: <Users className="w-8 h-8 text-white/50 stroke-[1.5] group-hover:text-white transition-colors" />,
    active: false
  },
  {
    kicker: "PERFORMANCE",
    title: "UNCOMPROMISING\nPOWER",
    description: "Zero emissions. 100% thrill.\nPrecision electric engineering.",
    icon: <Zap className="w-8 h-8 text-white/50 stroke-[1.5] group-hover:text-white transition-colors" />,
    active: false
  }
];

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050505]">
      {/* Subtle ambient light */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-5xl">
        
        {/* Only visible on screen readers or larger screens for context */}
        <div className="sr-only lg:not-sr-only text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-white">
            The Nexera <span className="text-brand-gradient">Difference</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative">

          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className={`relative z-10 overflow-hidden group rounded-3xl p-8 sm:p-10 transition-all duration-500 flex flex-col items-center sm:items-start text-center sm:text-left gap-6 border ${
                feature.active 
                  ? 'bg-[#0A0A0A] border-brand/30 shadow-[0_4px_40px_rgba(0,255,102,0.08)]' 
                  : 'bg-[#0A0A0A] border-white/5 hover:border-white/15 hover:bg-[#0D0D0D]'
              }`}
            >
              
              <div className="relative shrink-0">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border transition-all duration-500 relative z-10 ${
                  feature.active 
                    ? 'bg-brand/10 border-brand/30 shadow-[0_0_20px_rgba(0,255,102,0.15)] group-hover:scale-105' 
                    : 'bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-105'
                }`}>
                  {feature.icon}
                </div>
              </div>

              <div className="flex-1 pt-2">
                <p className={`text-[10px] sm:text-xs tracking-[0.2em] font-bold uppercase mb-3 ${
                  feature.active ? 'text-brand' : 'text-gray-500 group-hover:text-gray-400'
                } transition-colors`}>
                  {feature.kicker}
                </p>
                <h3 className={`text-2xl sm:text-3xl font-heading font-black whitespace-pre-line leading-[1.2] mb-3 ${
                  feature.active ? 'text-white' : 'text-white/80 group-hover:text-white'
                } transition-colors tracking-wide`}>
                  {feature.title}
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium ${
                  feature.active ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'
                } transition-colors max-w-sm sm:max-w-none mx-auto sm:mx-0`}>
                  {feature.description}
                </p>
              </div>

              {/* Active state subtle inner glow */}
              {feature.active && (
                <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent pointer-events-none" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
