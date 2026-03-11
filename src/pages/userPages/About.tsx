import { motion } from 'framer-motion';
import GlobalBackground from '../../components/userComponents/GlobalBackground';

const About = () => {
  return (
    <div className="w-full relative min-h-screen pt-32 pb-24 overflow-hidden">
      <GlobalBackground />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Excellence</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-8">
              NEXERA was founded with a singular vision: to redefine the premium automotive retail experience. 
              We blend state-of-the-art digital showrooms with an unwavering commitment to luxury, offering a curated platform for the world's most exceptional vehicles.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="glass p-6 rounded-2xl border border-glass-border hover:border-brand/30 transition-colors">
                <h3 className="text-4xl font-bold text-brand mb-2 font-heading">500+</h3>
                <p className="text-white/60 text-sm font-medium tracking-wider uppercase">Premium Vehicles Delivered</p>
              </div>
              <div className="glass p-6 rounded-2xl border border-glass-border hover:border-brand/30 transition-colors">
                <h3 className="text-4xl font-bold text-brand mb-2 font-heading">100%</h3>
                <p className="text-white/60 text-sm font-medium tracking-wider uppercase">Verified Authentic Inventory</p>
              </div>
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all duration-300">
              Join the Network
            </button>
          </motion.div>

          {/* Right Image/Visual Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full -z-10" />
            <div className="glass rounded-[2rem] p-2 border border-white/10 shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop" 
                alt="Premium Automotive Experience" 
                className="w-full h-auto rounded-[1.5rem] object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 glass border border-brand/40 px-6 py-4 rounded-xl flex items-center gap-4 animate-bounce">
                <div className="w-3 h-3 bg-brand rounded-full shadow-[0_0_10px_#00ff66]"></div>
                <p className="text-white font-bold font-heading whitespace-nowrap">Global Operations Active</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default About;
