import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';



const AnimatedCounter = ({ target, suffix = "", prefix = "", floating = false, duration = 2 }: { target: number, suffix?: string, prefix?: string, floating?: boolean, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        // Using easeOutQuart 
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        
        setCount(target * easeProgress);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, target, duration]);

  const displayValue = floating ? count.toFixed(1) : Math.floor(count);

  return (
    <span ref={ref} className="font-heading font-black tabular-nums tracking-tighter">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

const specs = [
  { label: "Horsepower", value: 1020, suffix: " HP" },
  { label: "0-60 mph", value: 1.9, suffix: "s", floating: true },
  { label: "Top Speed", value: 250, suffix: " mph" },
  { label: "Downforce", value: 1400, suffix: " lbs" }
];

const TechSpecs = () => {
  return (
    <section className="relative py-32 bg-black border-y border-glass-border overflow-hidden">
      
      {/* High-tech background image */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img 
          src="https://images.unsplash.com/photo-1596701047192-d9616ae39fc0?q=80&w=2074&auto=format&fit=crop" 
          alt="Engine detail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full glass border-brand/40 mb-6"
          >
            <span className="text-brand text-xs font-bold tracking-widest uppercase">Raw Engineering</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight"
          >
            Physics, <br />
            <span className="text-brand-gradient">Mastered.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {specs.map((spec, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group"
            >
              {/* Animated scanline effect */}
              <div className="absolute inset-0 w-full h-[2px] bg-brand/50 -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite]" />
              
              <div className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <AnimatedCounter 
                  target={spec.value} 
                  suffix={spec.suffix} 
                  floating={spec.floating} 
                  duration={2.5}
                />
              </div>
              <p className="text-brand font-bold uppercase tracking-widest text-sm">{spec.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;
