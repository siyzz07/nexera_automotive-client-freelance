import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const colors = [
  { id: 'abyss', name: 'Abyss Black', hex: '#050505', image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop' },
  { id: 'phantom', name: 'Phantom Silver', hex: '#E2E8F0', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop' },
  { id: 'neon', name: 'Neon Green', hex: '#00FF66', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop' },
];

const ColorShowcase = () => {
  const [activeColor, setActiveColor] = useState(colors[0]);

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background glow based on active color */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] -z-10 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: `${activeColor.hex}22` }} // 22 is hex for low opacity
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold mb-4"
          >
            Configure Your <span className="text-brand-gradient">Masterpiece</span>
          </motion.h2>
          <p className="text-gray-400 text-lg">Select a finish that matches your ambition.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Car Image Display */}
          <div className="w-full lg:w-2/3 h-[300px] sm:h-[400px] lg:h-[500px] relative glass rounded-3xl overflow-hidden border border-glass-border flex items-center justify-center p-8">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={activeColor.id}
                src={activeColor.image}
                alt={`Car in ${activeColor.name}`}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full object-cover rounded-xl"
              />
            </AnimatePresence>
            
            {/* Overlay to give a cohesive tint based on the theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Color Selector Controls */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <div className="glass p-8 rounded-3xl border border-glass-border">
              <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">Paint Finish</h3>
              
              <div className="flex gap-4 mb-8">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setActiveColor(color)}
                    className={`w-12 h-12 rounded-full relative transition-all duration-300 flex items-center justify-center ${
                      activeColor.id === color.id ? 'scale-125 z-10' : 'hover:scale-110 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex, border: color.id === 'abyss' ? '1px solid #333' : 'none' }}
                    aria-label={`Select ${color.name} color`}
                  >
                    {activeColor.id === color.id && (
                      <motion.div 
                        layoutId="colorRing"
                        className="absolute -inset-2 rounded-full border-2 border-brand"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[60px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeColor.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-2xl font-heading font-bold text-white mb-2"
                  >
                    {activeColor.name}
                  </motion.p>
                </AnimatePresence>
                <p className="text-gray-400 text-sm">Included in base price.</p>
              </div>
            </div>

            <button className="w-full py-4 bg-brand text-black font-bold rounded-full hover:bg-brand-hover hover:shadow-[0_0_30px_rgba(0,255,102,0.4)] transition-all duration-300 text-lg">
              Reserve Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ColorShowcase;
