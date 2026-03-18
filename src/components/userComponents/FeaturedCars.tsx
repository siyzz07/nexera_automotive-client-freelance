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
          // Take more cars for the horizontal scroll
          setRealCars(response.data.data.slice(0, 10));
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
            <h2 className="text-4xl md:text-6xl font-sans font-bold mb-0 text-white tracking-tighter leading-none">
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
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="min-w-[300px] md:min-w-[350px] h-[500px] bg-white/5 rounded-[2rem] animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div data-lenis-prevent className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:-mx-12 lg:px-12">
            <AnimatePresence>
              {realCars.map((car, index) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="min-w-[300px] md:min-w-[380px] snap-center glass rounded-3xl overflow-hidden group hover:shadow-[0_0_40px_rgba(0,223,93,0.15)] transition-all duration-500 border border-glass-border hover:border-brand/40 flex flex-col h-full"
                >
                  <div className="noise-overlay" />
                  
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img 
                      src={car.images[0]} 
                      alt={`${car.brand.name} ${car.carModel.name}`} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Absolute Badges */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/10 uppercase tracking-wider flex items-center gap-1.5">
                        <CarFront className="w-3.5 h-3.5 text-brand" /> {car.bodyType}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex flex-col gap-2 items-end z-20">
                      {car.trustBadges.slice(0, 2).map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                          {badge.includes("Verified") ? <ShieldCheck className="w-3.5 h-3.5 text-brand" /> : <FileCheck className="w-3.5 h-3.5 text-brand" />}
                          <span className="text-[10px] md:text-xs font-bold text-white tracking-widest uppercase">{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-5 md:p-6 flex-1 flex flex-col justify-between relative z-20 bg-black/40 backdrop-blur-sm -mt-4 rounded-t-3xl border-t border-white/10">
                    <div>
                      <div className="flex justify-between items-start mb-4 gap-1">
                        <div>
                          <p className="text-xs text-brand font-semibold tracking-widest uppercase mb-1">{car.brand.name}</p>
                          <h3 className="text-lg md:text-xl font-bold font-sans text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                            {car.carModel.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1">Price</p>
                          <p className="text-lg md:text-xl text-white font-bold">${car.price.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      {/* Car Details Grid */}
                      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 py-4 border-y border-white/10">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5 text-brand/80">
                            <Gauge className="w-3.5 h-3.5" />
                            <span className="text-[10px] uppercase tracking-wider font-bold truncate">KM</span>
                          </div>
                          <span className="text-sm font-medium text-white/90 truncate">{car.kmDriven >= 1000 ? `${(car.kmDriven/1000).toFixed(1)}k` : car.kmDriven}</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5 text-brand/80">
                            <Fuel className="w-3.5 h-3.5" />
                            <span className="text-[10px] uppercase tracking-wider font-bold truncate">Fuel</span>
                          </div>
                          <span className="text-sm font-medium text-white/90 truncate">{car.fuelType}</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5 text-brand/80">
                            <Settings2 className="w-3.5 h-3.5" />
                            <span className="text-[10px] uppercase tracking-wider font-bold truncate">Trans</span>
                          </div>
                          <span className="text-sm font-medium text-white/90 truncate">{car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5 text-brand/80">
                            <User className="w-3.5 h-3.5" />
                            <span className="text-[10px] uppercase tracking-wider font-bold truncate">Owner</span>
                          </div>
                          <span className="text-sm font-medium text-white/90 truncate">{car.ownerHistory}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-white/60">
                          <MapPin className="w-4 h-4 text-brand" />
                          <span className="text-xs font-semibold uppercase tracking-wider truncate max-w-[150px]">{car.location.split(',')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-white/40 font-semibold tracking-wider">
                          ID: {car._id.slice(-6).toUpperCase()}
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/car/${car._id}`} 
                      className="w-full py-3.5 rounded-xl border border-brand/30 bg-brand/10 text-brand text-sm font-bold tracking-wider hover:bg-brand hover:text-black shadow-[0_0_20px_rgba(0,223,93,0.1)] hover:shadow-[0_0_30px_rgba(0,223,93,0.3)] transition-all duration-300 uppercase flex justify-center items-center gap-2"
                    >
                      Details
                    </Link>
                  </div>
                </motion.div>
              ))}

              {/* Final "Explore More" Card */}
              {!loading && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="min-w-[300px] md:min-w-[380px] snap-center glass rounded-3xl overflow-hidden group hover:shadow-[0_0_40px_rgba(0,223,93,0.2)] transition-all duration-700 border border-white/5 hover:border-brand/40 flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="noise-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-black z-0 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-8 mx-auto border border-brand/20 group-hover:scale-110 group-hover:bg-brand group-hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(0,223,93,0.1)]">
                      <CarFront className="w-10 h-10" />
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-tighter">
                      Experience <br />
                      The <span className="text-brand">Full Fleet</span>
                    </h3>
                    
                    <p className="text-white/40 text-sm font-medium mb-12 max-w-[200px] mx-auto leading-relaxed">
                      Discover our entire curated collection of verified automotive masterpieces.
                    </p>
                    
                    <Link 
                      to="/car-seen" 
                      className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-black font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_40px_rgba(0,223,93,0.4)] transition-all duration-500 active:scale-95"
                    >
                      Explore More <span>→</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;
