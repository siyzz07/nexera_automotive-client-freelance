import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const B2BPartnership = () => {
  const benefits = [
    "Verified Vehicle Listings",
    "Verified Buyer Leads",
    "Digital Marketplace Visibility",
    "Transparent Commission Structure"
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden border-t border-glass-border bg-[#050505]">
      {/* Background Image with Slow Pan Animation */}
      <motion.div 
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 z-0 origin-center"
      >
        <img 
          src="https://images.unsplash.com/photo-1562141960-9121855a8220?q=80&w=2070&auto=format&fit=crop" 
          alt="Dealership Showroom" 
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-[#050505]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </motion.div>

      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Pulsing Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse shadow-[0_0_8px_#00ff66]" />
              <span className="text-brand text-xs font-bold tracking-widest uppercase">
                B2B Partnership
              </span>
            </div>
            
            {/* High-Impact Heading */}
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white mb-8 leading-[1.05] tracking-tight">
              Nexera Dealer <br className="hidden sm:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Network</span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-2xl font-light mb-12 leading-relaxed max-w-2xl">
              Nexera partners with premier dealerships that prioritize absolute transparency and structured vehicle documentation.
            </p>

            {/* Interactive List */}
            <ul className="space-y-6 mb-14">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                  className="flex items-center gap-5 group cursor-default"
                >
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-brand/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CheckCircle2 className="w-7 h-7 text-brand relative z-10 drop-shadow-[0_0_8px_rgba(0,255,102,0.4)]" />
                  </div>
                  <span className="text-white/80 font-medium text-lg sm:text-xl tracking-wide group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Premium Interactive Button */}
            <button className="group relative overflow-hidden px-10 py-5 w-full sm:w-auto bg-brand text-black font-bold rounded-2xl hover:bg-brand-hover hover:shadow-[0_0_40px_rgba(0,255,102,0.4)] transition-all duration-300 text-lg flex items-center justify-center gap-3">
              <span className="relative z-10 tracking-wide uppercase text-sm md:text-base">Join Nexera</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              
              {/* Button light sweep effect */}
              <div className="absolute inset-0 -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-0" />
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Custom keyframes configuration */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(150%); }
        }
      `}</style>
    </section>
  );
};

export default B2BPartnership;
