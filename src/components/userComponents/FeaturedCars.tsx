import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Gauge, Fuel, Settings2, User, 
  MapPin, CarFront, FileCheck
} from 'lucide-react';
import { getAllCars } from '../../services/apiServices/carApiService';

interface ICar {
  _id: string;
  brand: { name: string };
  carModel: { name: string };
  price: number;
  kmDriven: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  ownerHistory: string;
  location: string;
  images: string[];
  trustBadges: string[];
}

const FeaturedCars = () => {
  const [realCars, setRealCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await getAllCars();
        if (response.data.success) {
          // Take only the first 4 for the featured section
          setRealCars(response.data.data.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching featured cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCars();
  }, []);

  return (
    <section className="py-20 bg-[#020202] relative border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-[1px] bg-brand" />
              <span className="text-[10px] font-black text-brand uppercase tracking-[0.5em]">The Collection</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-0 text-white tracking-tighter leading-none">
              CURATED <br />
              <span className="text-brand-gradient">MASTERPIECES</span>
            </h2>
          </div>
          <Link to="/car-seen" className="group flex items-center gap-4 text-white hover:text-brand transition-all duration-500">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/10 group-hover:border-brand/50 pb-1">Explore Full Fleet</span>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand/40 group-hover:bg-brand/5 transition-all">
              <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-[500px] bg-white/5 rounded-[2rem] animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5">
            <AnimatePresence>
              {realCars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="glass rounded-2xl sm:rounded-3xl overflow-hidden group hover:shadow-[0_0_40px_rgba(0,223,93,0.15)] transition-all duration-500 border border-glass-border hover:border-brand/40 flex flex-col"
                >
                  <div className="noise-overlay" />
                  
                  <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img 
                      src={car.images[0]} 
                      alt={`${car.brand.name} ${car.carModel.name}`} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Absolute Badges */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20">
                      <span className="px-1.5 py-0.5 sm:px-3 sm:py-1.5 bg-black/60 backdrop-blur-md text-white text-[8px] sm:text-xs font-bold rounded-full border border-white/10 uppercase tracking-wider flex items-center gap-1 sm:gap-1.5">
                        <CarFront className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-brand" /> {car.bodyType}
                      </span>
                    </div>

                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1 sm:gap-2 items-end z-20">
                      {car.trustBadges.slice(0, 2).map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-1 sm:gap-1.5 px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                          {badge.includes("Verified") ? <ShieldCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-brand" /> : <FileCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-brand" />}
                          <span className="text-[7px] sm:text-[10px] md:text-xs font-bold text-white tracking-widest uppercase hidden sm:inline-block">{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col justify-between relative z-20 bg-black/40 backdrop-blur-sm -mt-2 sm:-mt-4 rounded-t-2xl sm:rounded-t-3xl border-t border-white/10">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2 sm:mb-4 gap-1">
                        <div>
                          <p className="text-[9px] sm:text-xs text-brand font-semibold tracking-widest uppercase mb-0.5 sm:mb-1">{car.brand.name}</p>
                          <h3 className="text-sm sm:text-base md:text-lg font-bold font-heading text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                            {car.carModel.name}
                          </h3>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-[8px] sm:text-xs text-white/50 font-medium uppercase tracking-wider mb-0 sm:mb-1">Price</p>
                          <p className="text-sm sm:text-base md:text-lg text-white font-bold">${car.price.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      {/* Car Details Grid */}
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 mb-3 sm:mb-4 py-2 sm:py-4 border-y border-white/10">
                        <div className="flex flex-col gap-0.5 sm:gap-1.5">
                          <div className="flex items-center gap-1 sm:gap-1.5 text-brand/80">
                            <Gauge className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-bold truncate">KM</span>
                          </div>
                          <span className="text-[10px] sm:text-sm font-medium text-white/90 truncate">{car.kmDriven >= 1000 ? `${(car.kmDriven/1000).toFixed(1)}k` : car.kmDriven}</span>
                        </div>
                        <div className="flex flex-col gap-0.5 sm:gap-1.5">
                          <div className="flex items-center gap-1 sm:gap-1.5 text-brand/80">
                            <Fuel className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-bold truncate">Fuel</span>
                          </div>
                          <span className="text-[10px] sm:text-sm font-medium text-white/90 truncate">{car.fuelType}</span>
                        </div>
                        <div className="flex flex-col gap-0.5 sm:gap-1.5">
                          <div className="flex items-center gap-1 sm:gap-1.5 text-brand/80">
                            <Settings2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-bold truncate">Trans</span>
                          </div>
                          <span className="text-[10px] sm:text-sm font-medium text-white/90 truncate">{car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
                        </div>
                        <div className="flex flex-col gap-0.5 sm:gap-1.5">
                          <div className="flex items-center gap-1 sm:gap-1.5 text-brand/80">
                            <User className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                            <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-bold truncate">Owner</span>
                          </div>
                          <span className="text-[10px] sm:text-sm font-medium text-white/90 truncate">{car.ownerHistory}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-1 sm:gap-2 text-white/60">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-brand" />
                          <span className="text-[8px] sm:text-xs font-semibold uppercase tracking-wider truncate max-w-[80px] sm:max-w-full">{car.location.split(',')[0]}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-1 text-[10px] sm:text-xs text-white/40 font-semibold tracking-wider">
                          ID: {car._id.slice(-6).toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/car/${car._id}`} 
                      className="w-full py-2 sm:py-3.5 rounded-lg sm:rounded-xl border border-brand/30 bg-brand/10 text-brand text-[10px] sm:text-sm font-bold tracking-wider hover:bg-brand hover:text-black shadow-[0_0_20px_rgba(0,223,93,0.1)] hover:shadow-[0_0_30px_rgba(0,223,93,0.3)] transition-all duration-300 uppercase flex justify-center items-center gap-1 sm:gap-2"
                    >
                      Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;
