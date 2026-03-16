import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, MapPin, Gauge, Fuel, Settings2, User, 
  ChevronLeft, ChevronRight, MessageCircle, Share2, 
  Heart, Calendar, Paintbrush, Car, Info
} from 'lucide-react';
import { getCarById } from '../../services/apiServices/carApiService';
import GlobalBackground from '../../components/userComponents/GlobalBackground';

interface ICar {
  _id: string;
  brand: { _id: string; name: string };
  carModel: { _id: string; name: string };
  price: number;
  kmDriven: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  ownerHistory: string;
  color: string;
  location: string;
  description?: string;
  images: string[];
  trustBadges: string[];
  status: string;
}

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<ICar | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      try {
        const response = await getCarById(id);
        if (response.data.success) {
          setCar(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface">
        <GlobalBackground />
        <div className="w-16 h-16 border-4 border-brand/30 border-t-brand rounded-full animate-spin mb-6" />
        <p className="text-white/60 font-medium tracking-widest uppercase text-sm">Loading Masterpiece...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-6 text-center">
        <GlobalBackground />
        <Car className="w-20 h-20 text-white/10 mb-6" />
        <h2 className="text-3xl font-heading font-bold text-white mb-4">Vehicle Not Found</h2>
        <p className="text-white/60 mb-8 max-w-md">The masterpiece you are looking for might have been reserved or is currently unavailable.</p>
        <Link to="/car-seen" className="px-8 py-3 bg-brand text-black font-bold rounded-full hover:scale-105 transition-transform">
          Back to Inventory
        </Link>
      </div>
    );
  }

  const whatsappNumber = "1234567890"; // Placeholder
  const whatsappMessage = `Hello Nexera, I am interested in the ${car.brand.name} ${car.carModel.name} (ID: ${car._id.slice(-6).toUpperCase()}) priced at $${car.price.toLocaleString()}. Can I get more details?`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="w-full relative min-h-screen pt-20 md:pt-32 pb-16 md:pb-24 overflow-x-hidden">
      <GlobalBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8 gap-4">
          <Link to="/car-seen" className="flex items-center gap-2 text-white/60 hover:text-brand transition-colors font-semibold group text-sm md:text-base">
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Inventory
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="p-2.5 md:p-3 rounded-full glass border-white/10 text-white/60 hover:text-white transition-colors">
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="p-2.5 md:p-3 rounded-full glass border-white/10 text-white/60 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Side: Media Gallery */}
          <div className="space-y-4 md:space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl group"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  src={car.images[activeImage]} 
                  alt={car.carModel.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {car.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === 0 ? car.images.length - 1 : prev - 1))}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === car.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </>
              )}
              
              <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 flex gap-2">
                <span className="px-3 py-1 md:px-4 md:py-1.5 bg-brand/90 backdrop-blur-md text-black text-[10px] md:text-xs font-black rounded-full uppercase tracking-widest">
                  {car.status}
                </span>
              </div>
            </motion.div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
              {car.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative flex-shrink-0 w-20 md:w-32 aspect-video rounded-lg md:rounded-xl overflow-hidden border-2 transition-all snap-start ${
                    activeImage === idx ? 'border-brand shadow-[0_0_15px_rgba(0,255,102,0.3)]' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`View ${idx + 1}`} />
                </button>
              ))}
            </div>

            {/* Trust Badges - Desktop only hint or refined mobile view */}
            <div className="flex flex-wrap gap-2 md:gap-4 pt-2 md:pt-4">
              {car.trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-brand/5 border border-brand/20 rounded-xl md:rounded-2xl">
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-brand" />
                  <span className="text-[10px] md:text-sm font-bold text-white/90 uppercase tracking-wider">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Information */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-6 md:mb-8">
              <p className="text-brand font-bold tracking-[0.3em] uppercase text-[10px] md:text-sm mb-2">{car.brand.name}</p>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-heading font-black text-white mb-4 leading-none">
                {car.carModel.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <p className="text-3xl md:text-5xl font-bold text-white">
                  ${car.price.toLocaleString()}
                </p>
                <div className="hidden sm:block h-8 w-px bg-white/10" />
                <p className="text-white/40 font-medium text-sm md:text-base">Available for immediate delivery</p>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
              {[
                { label: 'KM Driven', value: `${car.kmDriven.toLocaleString()} KM`, icon: Gauge },
                { label: 'Fuel Type', value: car.fuelType, icon: Fuel },
                { label: 'Transmission', value: car.transmission, icon: Settings2 },
                { label: 'Body Type', value: car.bodyType, icon: Car },
                { label: 'Ownership', value: car.ownerHistory, icon: User },
                { label: 'Location', value: car.location.split(',')[0], icon: MapPin },
                { label: 'Color', value: car.color, icon: Paintbrush },
                { label: 'Year', value: '2024', icon: Calendar }, 
              ].map((spec, i) => (
                <div key={i} className="glass p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5 space-y-1 md:space-y-2">
                  <div className="flex items-center gap-1.5 md:gap-2 text-brand/60">
                    <spec.icon className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-black opacity-60">{spec.label}</span>
                  </div>
                  <p className="text-white font-bold text-sm md:text-lg">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Description Section */}
            <div className="mb-10 md:mb-12">
              <div className="flex items-center gap-2 mb-3 md:mb-4 text-white">
                <Info className="w-4 h-4 md:w-5 md:h-5 text-brand" />
                <h3 className="font-heading font-black text-lg md:text-xl uppercase tracking-wider">The Story</h3>
              </div>
              <p className="text-white/60 leading-relaxed text-base md:text-lg font-light">
                {car.description || "Indulge in automotive excellence with this meticulously curated vehicle. Every detail has been engineered for maximum performance and unparalleled luxury. A true masterpiece of modern engineering, ready to redefine your journey."}
              </p>
            </div>

            {/* Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 z-50 lg:relative lg:bg-transparent lg:p-0 lg:border-none flex flex-col sm:flex-row gap-3 md:gap-4 lg:mt-auto">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-[2] flex items-center justify-center gap-2 md:gap-3 py-4 md:py-5 bg-brand text-black font-black uppercase tracking-widest text-sm md:text-base rounded-xl md:rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(0,255,102,0.2)] hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                Inquire Now
              </a>
              <button className="flex-1 py-4 md:py-5 glass border-white/10 text-white font-black uppercase tracking-widest text-sm md:text-base rounded-xl md:rounded-2xl hover:bg-white/5 transition-all duration-300">
                Test Drive
              </button>
            </div>
            {/* Added spacer for fixed mobile nav */}
            <div className="h-24 lg:hidden" />
            
            <p className="text-center lg:text-left text-white/30 text-[10px] md:text-xs mt-6 italic">
              * Pricing excludes taxes and registration fees. Contact us for custom financing options.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
