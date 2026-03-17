import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, MapPin, Gauge, Fuel, Settings2, User, 
  CheckCircle2, Award, FileCheck, ChevronDown, CarFront, Zap,
  Search, SlidersHorizontal, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalBackground from '../../components/userComponents/GlobalBackground';

// Mock comprehensive data
import { getAllCars } from '../../services/apiServices/carApiService';

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
  video?: { url: string; duration: number };
  trustBadges: string[];
}

// Custom Premium Select Component
const CustomSelect = ({ 
  label, 
  options, 
  value, 
  onChange,
  placeholder = "Any"
}: { 
  label: string, 
  options: string[], 
  value: string, 
  onChange: (v: string) => void,
  placeholder?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={ref}>
      <label className="text-[10px] sm:text-xs text-white/50 font-bold uppercase tracking-widest pl-1">
        {label}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-black/20 backdrop-blur-md border rounded-xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm cursor-pointer flex justify-between items-center transition-all duration-300 ${
          isOpen 
            ? 'border-brand/60 shadow-[0_0_15px_rgba(0,255,102,0.15)] bg-white/5 text-white' 
            : 'border-white/10 hover:border-white/30 hover:bg-white/5 text-white/80'
        }`}
      >
        <span className={`truncate mr-2 ${value === 'All' ? 'text-white/40' : 'text-white font-medium'}`}>
          {value === 'All' ? placeholder : value}
        </span>
        <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-brand' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+8px)] left-0 w-full z-50 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto scrollbar-hide py-1">
              {options.map(opt => (
                <div
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                    value === opt 
                      ? 'bg-brand/10 text-brand font-semibold' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {opt === 'All' ? placeholder : opt}
                  {value === opt && <CheckCircle2 className="w-4 h-4" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const segments = [
  { name: 'All Cars', icon: CarFront },
  { name: 'Budget Cars', icon: Award },
  { name: 'Low KM Cars', icon: Gauge },
  { name: 'Automatic Cars', icon: Settings2 },
  { name: 'SUVs', icon: MapPin },
  { name: 'Electric Cars', icon: Zap },
  { name: 'Luxury Cars', icon: Award }
];

const CarSeen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [realInventoryCars, setRealInventoryCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeSegment, setActiveSegment] = useState('All Cars');
  
  const [filters, setFilters] = useState<Record<string, string>>({
    brand: 'All', budget: 'All', bodyType: 'All', model: 'All', 
    kmDriven: 'All', fuelType: 'All', transmission: 'All', 
    ownerHistory: 'All', color: 'All', location: 'All'
  });

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await getAllCars(currentPage, 8);
        if (response.data.success) {
          setRealInventoryCars(response.data.data);
          setTotalPages(response.data.meta.totalPages);
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const uniqueBrands = useMemo(() => ['All', ...new Set(realInventoryCars.map(c => c.brand.name))], [realInventoryCars]);
  const uniqueModels = useMemo(() => ['All', ...new Set(realInventoryCars.map(c => c.carModel.name))], [realInventoryCars]);
  const uniqueFuelTypes = useMemo(() => ['All', ...new Set(realInventoryCars.map(c => c.fuelType))], [realInventoryCars]);
  const uniqueTransmissions = useMemo(() => ['All', ...new Set(realInventoryCars.map(c => c.transmission))], [realInventoryCars]);
  const uniqueBodyTypes = useMemo(() => ['All', ...new Set(realInventoryCars.map(c => c.bodyType))], [realInventoryCars]);
  const uniqueOwnerHistories = useMemo(() => ['All', ...new Set(realInventoryCars.map(c => c.ownerHistory))], [realInventoryCars]);
  const uniqueColors = useMemo(() => ['All', ...new Set(realInventoryCars.map(c => c.color))], [realInventoryCars]);
  const uniqueLocations = useMemo(() => ['All', ...new Set(realInventoryCars.map(c => c.location))], [realInventoryCars]);

  const budgetOptions = ['All', 'Under $50,000', 'Under $100,000', 'Under $150,000', '$150,000+'];
  const kmOptions = ['All', 'Under 10,000 km', 'Under 30,000 km', 'Under 50,000 km'];

  const handleClearFilter = (key: string) => {
    setFilters(prev => ({ ...prev, [key]: 'All' }));
  };

  const handleResetAll = () => {
    setSearchQuery('');
    setActiveSegment('All Cars');
    setFilters({
      brand: 'All', budget: 'All', bodyType: 'All', model: 'All', 
      kmDriven: 'All', fuelType: 'All', transmission: 'All', 
      ownerHistory: 'All', color: 'All', location: 'All'
    });
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== 'All').length + (searchQuery ? 1 : 0);

  const filteredCars = useMemo(() => {
    return realInventoryCars.filter(car => {
      // 0. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches = 
          car.brand.name.toLowerCase().includes(query) || 
          car.carModel.name.toLowerCase().includes(query) ||
          car.bodyType.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // 1. Quick Segment Layer
      let matchSegment = true;
      if (activeSegment === 'Budget Cars') matchSegment = car.price <= 50000;
      else if (activeSegment === 'Low KM Cars') matchSegment = car.kmDriven <= 20000;
      else if (activeSegment === 'Automatic Cars') matchSegment = car.transmission === 'Automatic';
      else if (activeSegment === 'SUVs') matchSegment = car.bodyType === 'SUV';
      else if (activeSegment === 'Electric Cars') matchSegment = car.fuelType === 'Electric';
      else if (activeSegment === 'Luxury Cars') matchSegment = car.price >= 100000;
      
      if (!matchSegment) return false;

      // 2. Custom Filters Layer
      if (filters.budget !== 'All') {
        if (filters.budget === 'Under $50,000' && car.price >= 50000) return false;
        if (filters.budget === 'Under $100,000' && car.price >= 100000) return false;
        if (filters.budget === 'Under $150,000' && car.price >= 150000) return false;
        if (filters.budget === '$150,000+' && car.price < 150000) return false;
      }
      if (filters.brand !== 'All' && car.brand.name !== filters.brand) return false;
      if (filters.model !== 'All' && car.carModel.name !== filters.model) return false;
      if (filters.bodyType !== 'All' && car.bodyType !== filters.bodyType) return false;
      
      // Advanced Filters
      if (filters.kmDriven !== 'All') {
        if (filters.kmDriven === 'Under 10,000 km' && car.kmDriven >= 10000) return false;
        if (filters.kmDriven === 'Under 30,000 km' && car.kmDriven >= 30000) return false;
        if (filters.kmDriven === 'Under 50,000 km' && car.kmDriven >= 50000) return false;
      }
      if (filters.fuelType !== 'All' && car.fuelType !== filters.fuelType) return false;
      if (filters.transmission !== 'All' && car.transmission !== filters.transmission) return false;
      if (filters.ownerHistory !== 'All' && car.ownerHistory !== filters.ownerHistory) return false;
      if (filters.color !== 'All' && car.color !== filters.color) return false;
      if (filters.location !== 'All' && car.location !== filters.location) return false;

      return true;
    });
  }, [filters, activeSegment, searchQuery, realInventoryCars]);

  return (
    <div className="w-full relative min-h-screen pt-32 pb-24">
      <GlobalBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Inventory</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-lg md:text-xl font-light">
            Browse our curated selection of premium vehicles. Use advanced filters to find your perfect automotive masterpiece.
          </p>
        </motion.div>

        {/* --- Top Filter Bar --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-4 sm:p-6 md:p-8 mb-8 border border-white/10 relative z-20 shadow-2xl"
        >
          {/* Main Search and Primary Filters Row */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search Bar */}
            <div className="flex-1 relative group mt-5">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-white/40 group-focus-within:text-brand transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search make, model, or type..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 sm:h-[52px] bg-black/20 backdrop-blur-md border border-white/10 rounded-xl pl-12 pr-4 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-brand/60 focus:ring-1 focus:ring-brand/60 focus:bg-white/5 transition-all"
              />
            </div>

            {/* Primary Dropdowns & Toggle */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex gap-4 items-end">
              <div className="w-full lg:w-44">
                <CustomSelect label="Brand" options={uniqueBrands} value={filters.brand} onChange={v => setFilters({...filters, brand: v})} placeholder="Any Brand" />
              </div>
              <div className="w-full lg:w-44">
                <CustomSelect label="Budget" options={budgetOptions} value={filters.budget} onChange={v => setFilters({...filters, budget: v})} placeholder="Any Budget" />
              </div>
              <div className="w-full lg:w-44 hidden md:block lg:hidden">
                 <CustomSelect label="Body Type" options={uniqueBodyTypes} value={filters.bodyType} onChange={v => setFilters({...filters, bodyType: v})} placeholder="Any Type" />
              </div>
              
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`col-span-2 md:col-span-3 lg:col-span-1 h-11 sm:h-[52px] px-6 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm w-full lg:w-auto ${
                  showAdvanced 
                    ? 'bg-brand/20 border-brand text-brand shadow-[0_0_20px_rgba(0,255,102,0.15)]' 
                    : 'bg-black/20 border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {showAdvanced ? 'Hide Advanced' : 'More Filters'}
              </button>
            </div>
          </div>

          {/* Advanced Filters Drawer */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 pb-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                  <div className="md:hidden"><CustomSelect label="Body Type" options={uniqueBodyTypes} value={filters.bodyType} onChange={v => setFilters({...filters, bodyType: v})} placeholder="Any Type" /></div>
                  <CustomSelect label="Model" options={uniqueModels} value={filters.model} onChange={v => setFilters({...filters, model: v})} />
                  <CustomSelect label="Max KM" options={kmOptions} value={filters.kmDriven} onChange={v => setFilters({...filters, kmDriven: v})} />
                  <CustomSelect label="Fuel Type" options={uniqueFuelTypes} value={filters.fuelType} onChange={v => setFilters({...filters, fuelType: v})} />
                  <CustomSelect label="Transmission" options={uniqueTransmissions} value={filters.transmission} onChange={v => setFilters({...filters, transmission: v})} />
                  <CustomSelect label="Owner History" options={uniqueOwnerHistories} value={filters.ownerHistory} onChange={v => setFilters({...filters, ownerHistory: v})} />
                  <CustomSelect label="Color" options={uniqueColors} value={filters.color} onChange={v => setFilters({...filters, color: v})} />
                  <CustomSelect label="Location" options={uniqueLocations} value={filters.location} onChange={v => setFilters({...filters, location: v})} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters Chips */}
          {activeFilterCount > 0 && (
            <div className="pt-4 mt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
              <span className="text-xs text-white/50 font-medium uppercase tracking-wider mr-2">Active Filters:</span>
              
              {searchQuery && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand/10 border border-brand/30 rounded-full">
                  <span className="text-xs text-brand font-medium">Search: {searchQuery}</span>
                  <button onClick={() => setSearchQuery('')} className="text-brand hover:text-white transition-colors"><X className="w-3.5 h-3.5" /></button>
                </div>
              )}

              {Object.entries(filters).map(([key, value]) => {
                if (value === 'All') return null;
                // Format key for display
                const displayKey = key.replace(/([A-Z])/g, ' $1').trim();
                return (
                  <div key={key} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                    <span className="text-[10px] text-white/50 uppercase">{displayKey}:</span>
                    <span className="text-xs text-white font-medium">{value}</span>
                    <button onClick={() => handleClearFilter(key)} className="text-white/40 hover:text-brand transition-colors"><X className="w-3.5 h-3.5" /></button>
                  </div>
                );
              })}

              <button 
                onClick={handleResetAll}
                className="text-xs text-brand hover:text-white font-medium ml-2 transition-colors underline underline-offset-4"
              >
                Clear All
              </button>
            </div>
          )}
        </motion.div>

        {/* --- Quick Segments --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide px-1"
        >
          {segments.map(({ name, icon: Icon }) => (
            <button 
              key={name}
              onClick={() => setActiveSegment(name)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 border text-sm font-semibold flex items-center gap-2 flex-shrink-0 ${
                activeSegment === name 
                  ? 'bg-brand/20 border-brand text-brand shadow-[0_0_20px_rgba(0,255,102,0.2)]' 
                  : 'glass border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              {name}
            </button>
          ))}
        </motion.div>

        {/* --- Car Grid --- */}
        {loading ? (
             <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-brand/30 border-t-brand rounded-full animate-spin mb-4" />
                <p className="text-white/60 font-medium tracking-widest uppercase text-xs">Accessing Inventory...</p>
             </div>
        ) : filteredCars.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center border border-white/10">
            <CarFront className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold text-white mb-2">No Vehicles Found</h3>
            <p className="text-white/60">Try adjusting your filters or search terms to find what you're looking for.</p>
            <button 
              onClick={handleResetAll}
              className="mt-6 px-6 py-2.5 bg-brand/10 border border-brand/30 text-brand rounded-full hover:bg-brand hover:text-black font-semibold transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            <AnimatePresence>
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car._id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="glass rounded-2xl sm:rounded-3xl overflow-hidden group hover:shadow-[0_0_40px_rgba(0,255,102,0.15)] transition-all duration-500 border border-glass-border hover:border-brand/40 flex flex-col"
                >
                  <div className="relative h-32 sm:h-56 md:h-64 overflow-hidden">
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
                  
                  <div className="p-3 sm:p-5 md:p-7 flex-1 flex flex-col justify-between relative z-20 bg-black/40 backdrop-blur-sm -mt-2 sm:-mt-4 rounded-t-2xl sm:rounded-t-3xl border-t border-white/10">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2 sm:mb-4 gap-1">
                        <div>
                          <p className="text-[9px] sm:text-xs text-brand font-semibold tracking-widest uppercase mb-0.5 sm:mb-1">{car.brand.name}</p>
                          <h3 className="text-sm sm:text-xl md:text-2xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                            {car.carModel.name}
                          </h3>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-[8px] sm:text-xs text-white/50 font-medium uppercase tracking-wider mb-0 sm:mb-1">Price</p>
                          <p className="text-sm sm:text-lg md:text-xl text-white font-bold">${car.price.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      {/* Car Details Grid */}
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 mb-3 sm:mb-6 py-2 sm:py-5 border-y border-white/10">
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

                      <div className="flex items-center justify-between mb-3 sm:mb-6">
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
                      className="w-full py-2 sm:py-3.5 rounded-lg sm:rounded-xl border border-brand/30 bg-brand/10 text-brand text-[10px] sm:text-sm font-bold tracking-wider hover:bg-brand hover:text-black shadow-[0_0_20px_rgba(0,255,102,0.1)] hover:shadow-[0_0_30px_rgba(0,255,102,0.3)] transition-all duration-300 uppercase flex justify-center items-center gap-1 sm:gap-2"
                    >
                       Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* --- Pagination UI --- */}
        {!loading && totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-3">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-xl glass border-white/10 flex items-center justify-center text-white hover:border-brand/40 hover:bg-brand/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              ←
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 rounded-xl border font-bold transition-all ${
                    currentPage === page
                      ? 'bg-brand border-brand text-black shadow-[0_0_20px_rgba(0,255,102,0.3)]'
                      : 'glass border-white/10 text-white/60 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-12 h-12 rounded-xl glass border-white/10 flex items-center justify-center text-white hover:border-brand/40 hover:bg-brand/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarSeen;

