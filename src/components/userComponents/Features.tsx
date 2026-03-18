import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ShieldCheck, Users, Zap } from "lucide-react";
import carBg from "../../assets/ccccccc.png";
import vettedBg from "../../assets/newaaaa.png";
import networkBg from "../../assets/verified_network_bg.png";
import secureBg from "../../assets/secure_settlement_bg.png";

const features = [
  {
    title: "Verified Listings Only",
    description: "Every car goes through strict verification process before getting listed on our platform.",
    icon: <ShieldCheck className="w-8 h-8 stroke-[1.5]" />,
    bg: vettedBg,
    active: true
  },
  {
    title: "TRUSTED\nDEALERS ONLY",
    description: "We onboard only reliable and verified sellers",
    icon: <Users className="w-8 h-8 stroke-[1.5]" />,
    bg: networkBg,
    active: false
  },
  {
    title: "Transperent\nDeals",
    description: "No hidden surprises. Every deal is transparent and straightforward.",
    icon: <Zap className="w-8 h-8 stroke-[1.5]" />,
    bg: secureBg,
    active: false
  },
];

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group h-full"
    >
      <div className={`relative h-full overflow-hidden rounded-[32px] p-8 lg:p-12 transition-all duration-700 border glass-card flex flex-col gap-8 ${
        feature.active 
          ? 'border-brand/40 shadow-[0_0_60px_rgba(0,223,93,0.1)]' 
          : 'border-white/5 hover:border-brand/30'
      }`}>
        
        {/* Card Background Image with Vignette */}
        <div className="absolute inset-0 z-0">
          <img 
            src={feature.bg} 
            alt="" 
            className="w-full h-full object-cover opacity-20 scale-110 group-hover:scale-100 transition-transform duration-1000"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" /> */}
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>

        {/* Cinematic Shimmer */}
        <div className="absolute inset-x-0 h-full w-[200%] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out pointer-events-none z-20" 
          style={{ transform: "skewX(-20deg)" }}
        />

        <div className="relative z-20">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-700 ${
            feature.active 
              ? 'bg-brand/10 border-brand/40 text-brand shadow-[0_0_30px_rgba(0,223,93,0.2)]' 
              : 'bg-white/[0.03] border-white/10 group-hover:border-brand/40 group-hover:bg-brand/10 group-hover:text-brand'
          }`}>
            <div className="group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(0,223,93,0.5)]">
              {feature.icon}
            </div>
          </div>
        </div>

        <div className="space-y-4 relative z-20">
          <h3 className="text-2xl lg:text-3xl font-bold whitespace-pre-line leading-[1.1] text-white tracking-tighter uppercase transition-colors group-hover:text-brand">
            {feature.title}
          </h3>
          <p className="text-base leading-relaxed text-white/40 font-medium group-hover:text-white/60 transition-colors duration-500">
            {feature.description}
          </p>
        </div>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-20" />
      </div>
    </motion.div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const meshY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const glowY = useTransform(smoothProgress, [0, 1], ["0%", "40%"]);

  return (
    <section ref={sectionRef} className="relative pt-10 pb-32 overflow-hidden bg-black min-h-[80vh] flex items-center">
      
      {/* 1. Clearer Background with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black z-10" />
        <img 
          src={carBg} 
          alt="Premium Automotive Environment" 
          className="w-full h-[140%] object-cover opacity-60 scale-105 filter brightness-75 contrast-110 grayscale-[30%]"
        />
        {/* Unified Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_40%,_black_100%)] z-20" />
      </motion.div>

      {/* 2. Floating Ambient Glow Layer */}
      <motion.div 
        style={{ y: glowY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-0 w-[1000px] h-[1000px] bg-brand/10 rounded-full blur-[200px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-0 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[180px]" />
      </motion.div>

      {/* 3. Tech Grid Overlay */}
      <motion.div 
        style={{ y: meshY }}
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
      >
        <div className="absolute inset-0" 
          style={{ 
            backgroundImage: `linear-gradient(#00ff00 1px, transparent 1px), linear-gradient(90deg, #00ff00 1px, transparent 1px)`,
            backgroundSize: '120px 120px'
          }} 
        />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
        
        {/* Dynamic Centered Heading */}
        <div className="text-center mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] font-bold text-brand uppercase tracking-[0.4em]">The Nexera Paradigm</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white leading-tight tracking-tight uppercase"
          >
            Why <span className="text-brand-gradient">Nexera?</span>
          </motion.h2>

          {/* <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-white/50 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            A verification-driven automotive marketplace designed for
            transparency, trust, and peak performance.
          </motion.p> */}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

