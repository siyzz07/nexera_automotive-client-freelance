import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Activity, TrendingUp, Users, ShieldCheck } from 'lucide-react';

import TextReveal from './TextReveal';

const B2BPartnership = () => {
  const benefits = [
    "Verified Vehicle Listings",
    "Verified Buyer Leads",
    "Digital Marketplace Visibility",
    "Transparent Commission Structure"
  ];

  const stats = [
    { label: "Conversion Rate", value: "+18%", icon: <TrendingUp className="w-5 h-5" />, color: "text-brand" },
    { label: "Verified Leads", value: "2.4k", icon: <Users className="w-5 h-5" />, color: "text-brand" },
    { label: "System Uptime", value: "99.9%", icon: <Activity className="w-5 h-5" />, color: "text-brand" },
    { label: "Live Security", value: "Protocol 7", icon: <ShieldCheck className="w-5 h-5" />, color: "text-brand" },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-[#050505]">
      <div className="noise" />
      <div className="scanlines" />
      
      {/* Background Image with Slow Pan Animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.25 }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 z-0 origin-center"
      >
        <img 
          src="https://images.unsplash.com/photo-1562141960-9121855a8220?q=80&w=2070&auto=format&fit=crop" 
          alt="Dealership Showroom" 
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-[#050505]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Pulsing Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse shadow-[0_0_8px_#00ff66]" />
              <span className="text-brand text-[10px] font-black tracking-widest uppercase">
                B2B Enterprise
              </span>
            </div>
            
            {/* High-Impact Heading */}
            <h2 className="text-5xl sm:text-7xl font-heading font-black text-white mb-8 leading-[1.05] tracking-tight">
              Nexera Dealer <br className="hidden sm:block" /> 
              <TextReveal text="Network." className="text-brand-gradient" />
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl font-light mb-12 leading-relaxed max-w-xl">
              Partner with the industry's premier computational platform. We provide dealerships with <span className="text-white italic">unparalleled visibility</span> and verified lead generation tools.
            </p>

            {/* Interactive List */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-brand/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CheckCircle2 className="w-5 h-5 text-brand relative z-10" />
                  </div>
                  <span className="text-white/60 font-medium text-sm tracking-wide group-hover:text-white transition-all duration-300">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>

            <button className="group relative overflow-hidden px-10 py-5 w-full sm:w-auto bg-brand text-black font-black rounded-2xl hover:bg-brand-hover hover:shadow-[0_0_40px_rgba(0,255,102,0.4)] transition-all duration-300 text-sm flex items-center justify-center gap-3">
              <span className="relative z-10 tracking-[0.2em] uppercase">Register Inquiry</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12 z-0" />
            </button>
          </motion.div>

          {/* Right Side: Performance Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="glass p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/[0.03] to-transparent h-1/2 animate-scan pointer-events-none" />
              
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em]">Network Intelligence</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                  <span className="text-[10px] font-black text-brand uppercase tracking-widest">Live Uptime</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                {stats.map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand/30 transition-all duration-300 group">
                    <div className="text-brand mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Technical Graphic */}
             
            </div>

            {/* Floating Accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/10 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand/10 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default B2BPartnership;
