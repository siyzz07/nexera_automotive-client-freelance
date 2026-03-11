import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const StorySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transform for the background image
  const yImage = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  
  return (
    <section ref={containerRef} className="py-32 relative bg-surface-light overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-brand text-sm font-bold uppercase tracking-widest mb-4">Our Heritage</h3>
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold mb-8 leading-tight">
                Redefining the <br /> 
                <span className="text-brand-gradient">Status Quo.</span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-gray-400 text-lg leading-relaxed"
            >
              <p>
                Founded on the belief that electric performance shouldn't mean a compromise in luxury or design, NEXERA was born to challenge the establishment.
              </p>
              <p>
                We source aerospace-grade materials to construct lighter, stronger frames, while our proprietary solid-state battery technology pushes the boundaries of range and rapid charging. 
              </p>
              <p className="text-white font-medium border-l-2 border-brand pl-4 mt-8">
                "Our vehicles aren't just a mode of transportation; they are a statement of intent for the future."
              </p>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 px-8 py-3 rounded-full border border-glass-border glass hover:bg-white/10 hover:border-brand/50 transition-all font-semibold"
            >
              Read Our Full Story
            </motion.button>
          </div>
          
          {/* Image Container with Parallax */}
          <div className="order-1 lg:order-2 relative h-[500px] lg:h-[700px] w-full rounded-3xl overflow-hidden glass border border-glass-border">
            <div className="absolute inset-0 bg-brand/5 z-10 mix-blend-overlay" />
            <motion.img 
              style={{ y: yImage }}
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2000&auto=format&fit=crop" 
              alt="Engineering schematic and design"
              className="absolute inset-0 w-full h-[140%] object-cover object-center"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
            
            {/* Subtle UI Element overlay */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-8 left-8 z-30 glass p-4 rounded-xl border border-white/10 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full border-2 border-brand flex items-center justify-center p-1">
                <div className="w-full h-full bg-brand rounded-full animate-pulse opacity-20" />
                <span className="absolute text-brand font-bold text-xs">AI</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm">System Active</p>
                <p className="text-brand text-xs">Calibrating parameters...</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StorySection;
