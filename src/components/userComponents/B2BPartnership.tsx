import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Activity, ShieldCheck, Globe } from 'lucide-react';
import TextReveal from './TextReveal';
import b2bBg from '../../assets/b2bimage.jpeg';

const B2BPartnership = () => {
  const benefits = [
    "Verified Vehicle Listings",
    "Verified Buyer Leads",
    "Digital Marketplace Visibility",
    "Transparent Commission Structure"
  ];

  return (
    <section id="sell-your-car" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-[#000000]">
      <div className="noise" />
      <div className="scanlines" />
      
      {/* Background Image with Slow Pan Animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 z-0 origin-center"
      >
        <img 
          src={b2bBg} 
          alt="Luminous Showroom" 
          className="w-full h-full object-cover opacity-45 transition-opacity duration-1000 saturate-[1.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand/40 via-brand/20 to-transparent mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
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
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse shadow-[0_0_8px_#00df5d]" />
              <span className="text-brand text-[10px] font-black tracking-widest uppercase">
                B2B Enterprise
              </span>
            </div>
            
            {/* High-Impact Heading */}
            <h2 className="text-5xl sm:text-7xl font-sans font-bold text-white mb-8 leading-[1.05] tracking-tight">
              <span className="text-brand">Nexera</span> Dealer <br className="hidden sm:block" /> 
              <TextReveal text="Network." className="text-brand-gradient" />
            </h2>
            
            <p className="text-gray-300 text-lg md:text-xl font-light mb-12 leading-relaxed max-w-xl">
              Partner with a trusted, industry-leading platform designed for modern dealerships. We deliver verified leads and enhanced visibility—helping you connect with genuine buyers and grow your business with confidence.
            </p>

            {/* Simple Trust Bar (Mobile Visible) */}
            <div className="flex lg:hidden items-center gap-6 mb-12 border-y border-white/5 py-6">
              {[
                { label: "Verified", icon: <ShieldCheck className="w-4 h-4 text-brand" /> },
                { label: "Global", icon: <Globe className="w-4 h-4 text-brand" /> },
                { label: "Secure", icon: <Activity className="w-4 h-4 text-brand" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>

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

            <button className="group relative overflow-hidden px-10 py-5 w-full sm:w-auto bg-brand text-black font-black rounded-2xl hover:bg-brand-hover hover:shadow-[0_0_40px_rgba(0,223,93,0.4)] transition-all duration-300 text-sm flex items-center justify-center gap-3">
              <span className="relative z-10 tracking-[0.2em] uppercase">Register Inquiry</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12 z-0" />
            </button>
          </motion.div>

          {/* Right Side: Simplified Desktop Seal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="relative group">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-10 bg-brand/10 rounded-full blur-[60px] animate-pulse-slow" />
              
              {/* The Seal Container */}
              <div className="relative w-80 h-80 rounded-[3rem] glass border border-white/10 flex flex-col items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent pointer-events-none" />
                
                {/* Protocol Icon */}
                <div className="w-24 h-24 rounded-3xl bg-brand/10 border border-brand/30 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,186,62,0.2)]">
                  <ShieldCheck className="w-12 h-12 text-brand" strokeWidth={1.5} />
                </div>

                <div className="text-center">
                  <div className="text-brand text-[8px] font-black tracking-[0.5em] uppercase mb-3">Official Nexera Partner</div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 italic">Standard Elite</h3>
                  <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mb-4" />
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-relaxed">
                    Certified Computational <br /> Trust Environment
                  </p>
                </div>

                {/* Corner ID */}
                <div className="absolute bottom-6 right-6 text-[8px] font-mono text-white/10 tracking-widest">NP-2026-X</div>
              </div>
            </div>
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
