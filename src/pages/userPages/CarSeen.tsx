import { motion } from 'framer-motion';
import GlobalBackground from '../../components/userComponents/GlobalBackground';

const inventoryCars = [
  {
    name: "NEXERA X1 Luxe",
    type: "Hyper GT",
    acceleration: "0-60 in 1.9s",
    range: "520 mi",
    price: "$145,000",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop"
  },
  {
    name: "NEXERA V-Spec",
    type: "Performance SUV",
    acceleration: "0-60 in 2.8s",
    range: "480 mi",
    price: "$110,000",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "NEXERA OMEGA",
    type: "Track Edition",
    acceleration: "0-60 in 1.7s",
    range: "390 mi",
    price: "$210,000",
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop"
  },
  {
    name: "NEXERA E-Class",
    type: "Executive Sedan",
    acceleration: "0-60 in 3.1s",
    range: "410 mi",
    price: "$89,000",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop" // the hero car image
  },
  {
    name: "NEXERA Oribis",
    type: "Compact City EV",
    acceleration: "0-60 in 4.5s",
    range: "280 mi",
    price: "$55,000",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "NEXERA Titan",
    type: "Luxury Truck",
    acceleration: "0-60 in 3.4s",
    range: "550 mi",
    price: "$125,000",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop"
  }
];

const CarSeen = () => {
  return (
    <div className="w-full relative min-h-screen pt-32 pb-24">
      <GlobalBackground />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Inventory</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-lg md:text-xl font-light">
            Browse our complete selection of premium automotive masterpieces. Each vehicle is rigorously verified for supreme quality and performance.
          </p>
        </motion.div>

        {/* Filters/Categories could go here */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {['All Models', 'Sedan', 'SUV', 'Hypercar', 'Truck'].map((category, idx) => (
            <button 
              key={idx}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 border ${
                idx === 0 
                  ? 'bg-brand/20 border-brand text-brand' 
                  : 'glass border-white/10 text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {inventoryCars.map((car, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
              className="glass rounded-3xl overflow-hidden group hover:shadow-[0_0_40px_rgba(0,255,102,0.15)] transition-all duration-500 border border-glass-border hover:border-brand/40 flex flex-col"
            >
              <div className="relative h-40 sm:h-52 md:h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
                  <span className="px-2 py-1 sm:px-3 sm:py-1 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold rounded-full border border-white/10 uppercase tracking-wider">
                    {car.type}
                  </span>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-xl lg:text-2xl font-bold font-heading mb-1 text-white group-hover:text-brand transition-colors line-clamp-1">
                    {car.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-6 font-medium">Starting at {car.price}</p>
                  
                  <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-8 py-3 sm:py-4 border-y border-glass-border">
                    <div>
                      <p className="text-[10px] sm:text-xs text-brand font-semibold uppercase tracking-wider mb-1">Acceleration</p>
                      <p className="text-xs sm:text-base text-white font-medium">{car.acceleration}</p>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-brand font-semibold uppercase tracking-wider mb-1">Est. Range</p>
                      <p className="text-xs sm:text-base text-white font-medium">{car.range}</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full py-2 sm:py-3 lg:py-4 rounded-xl border border-white/10 glass text-white text-xs sm:text-sm font-semibold hover:bg-brand hover:border-brand hover:text-black transition-all duration-300">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarSeen;
