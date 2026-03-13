import { useState } from 'react';

import { Upload, CarFront, Gauge, Fuel, Settings2, DollarSign, ImagePlus, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface CategoryType {
  id: string;
  name: string;
  parentCategory: string | null;
  isActive: boolean;
}

const AddCar = () => {
  // Mock flat hierarchical category data mimicking what the backend provides
  const categories: CategoryType[] = [
    { id: '1', name: 'Maruti Suzuki', parentCategory: null, isActive: true },
    { id: 'm1', name: 'Alto', parentCategory: '1', isActive: true },
    { id: 'm2', name: 'Alto 800', parentCategory: '1', isActive: true },
    { id: 'm3', name: 'Swift', parentCategory: '1', isActive: true },
    
    { id: '2', name: 'Hyundai', parentCategory: null, isActive: true },
    { id: 'm4', name: 'i20', parentCategory: '2', isActive: true },
    { id: 'm5', name: 'Creta', parentCategory: '2', isActive: true },

    { id: '3', name: 'BMW', parentCategory: null, isActive: true },
    { id: 'm6', name: 'M4 Competition', parentCategory: '3', isActive: true },
    { id: 'm7', name: 'M3', parentCategory: '3', isActive: true },

    { id: '4', name: 'Mercedes-Benz', parentCategory: null, isActive: true },
    { id: 'm8', name: 'G63 AMG', parentCategory: '4', isActive: true },

    { id: '5', name: 'Porsche', parentCategory: null, isActive: true },
    { id: 'm9', name: '911 GT3', parentCategory: '5', isActive: true },
  ];

  const brands = categories.filter(c => c.parentCategory === null);

  const [formData, setFormData] = useState({
    brand: '', // Store Brand ID
    model: '', // Store Model ID
    price: '',
    kmDriven: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    ownerHistory: '1st Owner',
    color: '',
    location: '',
  });

  const availableModels = categories.filter(c => c.parentCategory === formData.brand);

  const [trustBadges, setTrustBadges] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const availableBadges = [
    "Verified Dealer",
    "Insurance Valid",
    "Documents Verified",
    "Nexera Verified",
    "Service History",
    "No Accidents"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // If brand changes, we MUST reset the model because the previous model won't belong to the new brand
    if (name === 'brand') {
      setFormData(prev => ({ ...prev, [name]: value, model: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleBadge = (badge: string) => {
    setTrustBadges(prev => 
      prev.includes(badge) 
        ? prev.filter(b => b !== badge)
        : [...prev, badge]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          brand: '',
          model: '',
          price: '',
          kmDriven: '',
          fuelType: 'Petrol',
          transmission: 'Automatic',
          bodyType: 'Sedan',
          ownerHistory: '1st Owner',
          color: '',
          location: '',
        });
        setTrustBadges([]);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-white mb-2">Add New Vehicle</h1>
        <p className="text-sm md:text-base text-white/60">Enter vehicle details to list it in the inventory</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Details Section */}
        <div className="glass p-4 sm:p-6 md:p-8 rounded-3xl border border-glass-border">
          <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-white/10 pb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-brand/20 flex items-center justify-center border border-brand/30">
              <CarFront className="w-4 h-4 md:w-5 md:h-5 text-brand" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-white">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Brand</label>
              <select 
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-colors appearance-none"
              >
                <option value="" disabled>Select a Brand</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Model</label>
              <select 
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                required
                disabled={!formData.brand}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" disabled>Select a Model</option>
                {availableModels.map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Price ($)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="w-4 h-4 text-white/40" />
                </div>
                <input 
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-colors"
                  placeholder="85000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Location</label>
              <input 
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-colors"
                placeholder="e.g. Los Angeles, CA"
              />
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="glass p-4 sm:p-6 md:p-8 rounded-3xl border border-glass-border">
          <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-white/10 pb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Settings2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-white">Technical Specifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-white/40" /> KM Driven
              </label>
              <input 
                type="number"
                name="kmDriven"
                value={formData.kmDriven}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                placeholder="25000"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                <Fuel className="w-4 h-4 text-white/40" /> Fuel Type
              </label>
              <select 
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors appearance-none"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Transmission</label>
              <select 
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors appearance-none"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Body Type</label>
              <select 
                name="bodyType"
                value={formData.bodyType}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors appearance-none"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Convertible">Convertible</option>
                <option value="Wagon">Wagon</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Owner History</label>
              <select 
                name="ownerHistory"
                value={formData.ownerHistory}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors appearance-none"
              >
                <option value="1st Owner">1st Owner</option>
                <option value="2nd Owner">2nd Owner</option>
                <option value="3rd Owner">3rd Owner</option>
                <option value="4+ Owners">4+ Owners</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Color</label>
              <input 
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                placeholder="e.g. Midnight Black"
              />
            </div>
          </div>
        </div>

        {/* Media & Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Image Upload */}
          <div className="glass p-4 sm:p-6 md:p-8 rounded-3xl border border-glass-border">
            <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-white/10 pb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                <ImagePlus className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-white">Vehicle Assets</h2>
            </div>
            
            <div className="border-2 border-dashed border-white/20 rounded-2xl bg-black/20 p-6 md:p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand/40 hover:bg-brand/5 transition-all group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                <Upload className="w-8 h-8 text-white/50 group-hover:text-brand transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Upload Primary Image</h3>
              <p className="text-sm text-white/50 max-w-[250px]">Drag and drop a high-quality image of the vehicle, or click to browse.</p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="glass p-4 sm:p-6 md:p-8 rounded-3xl border border-glass-border">
            <div className="flex items-center gap-3 mb-4 md:mb-6 border-b border-white/10 pb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-white">Trust & Verification</h2>
            </div>
            
            <p className="text-sm text-white/60 mb-4">Select the badges this vehicle qualifies for:</p>
            
            <div className="flex flex-wrap gap-3">
              {availableBadges.map((badge) => {
                const isSelected = trustBadges.includes(badge);
                return (
                  <button
                    key={badge}
                    type="button"
                    onClick={() => toggleBadge(badge)}
                    className={`px-4 py-2.5 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border ${
                      isSelected 
                        ? 'bg-brand/20 border-brand text-brand shadow-[0_0_15px_rgba(0,255,102,0.2)]' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    {badge}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
          <button 
            type="button"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl border font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              isSuccess 
                ? 'bg-green-500/20 border-green-500 text-green-400' 
                : 'bg-brand/20 border-brand text-brand hover:bg-brand hover:text-black shadow-[0_0_20px_rgba(0,255,102,0.1)] hover:shadow-[0_0_30px_rgba(0,255,102,0.3)]'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-brand border-t-transparent animate-spin"/> Processing...
              </span>
            ) : isSuccess ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Vehicle Added
              </span>
            ) : (
              'Save Listing'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
