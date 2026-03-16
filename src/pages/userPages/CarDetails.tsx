import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, MapPin, Gauge, Fuel, Settings2, User, 
  ChevronLeft, ChevronRight, MessageCircle, Share2, 
  Calendar, Paintbrush, Car
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

  const [showToast, setShowToast] = useState(false);

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

  const handleShare = async () => {
    const shareData = {
      title: `Check out this ${car?.brand.name} ${car?.carModel.name}`,
      text: `I found this amazing ${car?.brand.name} ${car?.carModel.name} on Nexera. Check it out!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

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

  const whatsappNumber = "918606399420"; 
  const whatsappMessage = `Hello Nexera, I am interested in the ${car.brand.name} ${car.carModel.name} (ID: ${car._id.slice(-6).toUpperCase()}) priced at $${car.price.toLocaleString()}.\n\nVehicle Link: ${window.location.href}\n\nImage Reference: ${car.images[0]}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="w-full relative min-h-screen pt-20 md:pt-32 pb-24 overflow-x-hidden">
      <GlobalBackground />

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-brand text-black font-bold rounded-full shadow-lg"
          >
            Link Copied to Clipboard!
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Ambient Glows - Toned down */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/3 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand/3 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Breadcrumb & Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link to="/car-seen" className="flex items-center gap-2 text-white/40 hover:text-brand transition-all font-medium group text-xs md:text-sm uppercase tracking-widest">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Inventory Listing
          </Link>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleShare}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full glass border-white/5 text-white/40 hover:text-white transition-all hover:bg-white/5"
            >
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            {/* <button className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full glass border-white/5 text-white/40 hover:text-red-500 transition-all hover:bg-white/5">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
            </button> */}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Side: Media Masterpiece (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 sticky top-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/3] md:aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden glass border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] group"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  src={car.images[activeImage]} 
                  alt={car.carModel.name}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

              {car.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === 0 ? car.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-xl text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-brand hover:text-black hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => (prev === car.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-xl text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-brand hover:text-black hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                </>
              )}
              
              <div className="absolute top-6 left-6 z-20">
                <div className="px-5 py-2 bg-brand/90 backdrop-blur-md text-black text-[10px] md:text-xs font-black rounded-full uppercase tracking-[0.2em] shadow-lg">
                  {car.status}
                </div>
              </div>
            </motion.div>

            {/* Premium Thumbnail Strip */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x px-2">
              {car.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative flex-shrink-0 w-24 md:w-40 aspect-video rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 snap-center p-1 ${
                    activeImage === idx 
                      ? 'bg-brand shadow-[0_10px_30px_rgba(0,128,109,0.3)]' 
                      : 'bg-white/5 opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover rounded-[calc(1.5rem-4px)] md:rounded-[calc(rem-4px)]" alt={`Luxury View ${idx + 1}`} />
                </button>
              ))}
            </div>

            {/* Trust Infrastructure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {car.trustBadges.map((badge, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  key={idx} 
                  className="flex items-center gap-4 p-5 glass rounded-3xl border-white/5 hover:border-brand/20 transition-colors group"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-brand/10 border border-brand/20 group-hover:bg-brand group-hover:text-black transition-all">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-brand uppercase tracking-widest">{badge}</span>
                    <p className="text-[10px] text-white/40 uppercase tracking-tighter">Verified Standard</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Curated Intelligence (5 Cols) */}
          <div className="lg:col-span-5 space-y-10 md:space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-brand" />
                <p className="text-brand font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
                  {car.brand.name}
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.1] mb-6">
                {car.carModel.name}
              </h1>
              <div className="flex flex-col sm:flex-row items-baseline gap-2 sm:gap-6 pt-4 border-t border-white/5">
                <p className="text-4xl md:text-6xl font-bold text-white tracking-tighter font-sans">
                  ${car.price.toLocaleString()}
                </p>
                <p className="text-white/30 font-medium text-xs md:text-sm uppercase tracking-widest">
                  Estimated MSRP • Excl. Tax
                </p>
              </div>
            </motion.div>

            {/* Engineering Specifications */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Engineering Specs</span>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { label: 'Odometer', value: `${car.kmDriven.toLocaleString()} KM`, icon: Gauge },
                  { label: 'Propulsion', value: car.fuelType, icon: Fuel },
                  { label: 'Drivetrain', value: car.transmission, icon: Settings2 },
                  { label: 'Silhoutte', value: car.bodyType, icon: Car },
                  { label: 'Chain of Title', value: car.ownerHistory, icon: User },
                  { label: 'Deployment', value: car.location.split(',')[0], icon: MapPin },
                  { label: 'Aesthetics', value: car.color, icon: Paintbrush },
                  { label: 'Model Year', value: '2024', icon: Calendar }, 
                ].map((spec, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.3 }}
                    key={i} 
                    className="glass bg-white/[0.03] p-5 rounded-[2rem] border border-white/5 hover:border-brand/30 transition-all group/card cursor-default"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/card:bg-brand/10 group-hover/card:border-brand/20 transition-all">
                        <spec.icon className="w-5 h-5 text-brand" />
                      </div>
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-black text-white/30 group-hover/card:text-white/60 transition-colors">
                        {spec.label}
                      </span>
                    </div>
                    <p className="text-white font-bold text-base md:text-lg tracking-tight leading-none">
                      {spec.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Design Intent (Description) */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6 p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-brand rounded-full" />
                <h3 className="font-heading font-black text-xl md:text-2xl uppercase tracking-widest text-white">Design Intent</h3>
              </div>
              <p className="text-white/50 leading-relaxed text-sm md:text-base font-light font-sans tracking-wide first-letter:text-4xl first-letter:text-brand first-letter:font-heading first-letter:mr-3 first-letter:float-left">
                {car.description || "Indulge in automotive excellence with this meticulously curated vehicle. Every detail has been engineered for maximum performance and unparalleled luxury. A true masterpiece of modern engineering, ready to redefine your journey with Nexera's signature touch."}
              </p>
            </motion.div>

            {/* Concierge Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/90 backdrop-blur-3xl border-t border-white/10 z-[60] lg:relative lg:bg-transparent lg:p-0 lg:border-none flex flex-col sm:flex-row gap-4">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-[2] flex items-center justify-center gap-3 py-6 md:py-7 bg-brand text-black font-black uppercase tracking-[0.3em] text-xs md:text-sm rounded-[1.5rem] md:rounded-[2rem] transition-all shadow-[0_20px_40px_rgba(0,128,109,0.3)] hover:shadow-brand/50 hover:bg-[#00e0bf]"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                Secure Information
              </motion.a>
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-6 md:py-7 glass border-white/10 text-white font-black uppercase tracking-[0.3em] text-xs md:text-sm rounded-[1.5rem] md:rounded-[2rem] transition-all"
              >
                Schedule Preview
              </motion.button>
            </div>
            
            {/* Added spacer for fixed mobile nav */}
            <div className="h-28 lg:hidden" />
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center lg:text-left text-white/20 text-[9px] md:text-xs italic font-medium"
            >
              * Subject to Nexera concierge verification. Bespoke financing curated upon request.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
