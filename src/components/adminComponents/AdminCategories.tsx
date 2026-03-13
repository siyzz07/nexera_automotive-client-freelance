import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Tag, ChevronRight, CarFront, Trash2, Search } from 'lucide-react';

export interface CategoryType {
  id: string;
  name: string;
  parentCategory: string | null;
  isActive: boolean;
}

const AdminCategories = () => {
  // Mock flat hierarchical category data corresponding to the new backend schema
  const [categories, setCategories] = useState<CategoryType[]>([
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
  ]);

  const brands = useMemo(() => categories.filter(c => c.parentCategory === null), [categories]);

  const [activeBrandId, setActiveBrandId] = useState<string | null>(brands[0]?.id || null);
  const [searchBrand, setSearchBrand] = useState('');
  
  // State for adding new items
  const [newBrandName, setNewBrandName] = useState('');
  const [newModelName, setNewModelName] = useState('');

  const activeBrand = useMemo(() => 
    brands.find(c => c.id === activeBrandId),
  [brands, activeBrandId]);

  const activeBrandModels = useMemo(() => 
    categories.filter(c => c.parentCategory === activeBrandId),
  [categories, activeBrandId]);

  const filteredBrands = useMemo(() => 
    brands.filter(c => c.name.toLowerCase().includes(searchBrand.toLowerCase())),
  [brands, searchBrand]);

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    
    const newBrand: CategoryType = {
      id: Date.now().toString(),
      name: newBrandName.trim(),
      parentCategory: null,
      isActive: true,
    };
    
    setCategories([...categories, newBrand]);
    setNewBrandName('');
    setActiveBrandId(newBrand.id); // Auto-select the newly created brand
  };

  const handleAddModel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModelName.trim() || !activeBrandId) return;

    // Prevent duplicate models within the same brand
    const isDuplicate = categories.some(
      c => c.parentCategory === activeBrandId && c.name.toLowerCase() === newModelName.trim().toLowerCase()
    );

    if (!isDuplicate) {
      const newModel: CategoryType = {
        id: Date.now().toString(),
        name: newModelName.trim(),
        parentCategory: activeBrandId,
        isActive: true,
      };
      setCategories([...categories, newModel]);
    }
    
    setNewModelName('');
  };

  const handleDeleteModel = (modelId: string) => {
    setCategories(categories.filter(c => c.id !== modelId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      <div className="mb-6 md:mb-8 border-b border-white/10 pb-4 md:pb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-white mb-2 tracking-wide">Category Management</h1>
        <p className="text-sm md:text-base text-white/60">Manage primary vehicle Brands and their associated Models (sub-types).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Brand Management */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Add Brand Form */}
          <form onSubmit={handleAddBrand} className="glass p-4 md:p-6 rounded-3xl border border-brand/20 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-cyan-400" />
            <h2 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 md:w-5 md:h-5 text-brand" /> Add New Brand
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="e.g. Honda, Toyota..." 
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/50"
              />
              <button 
                type="submit"
                disabled={!newBrandName.trim()}
                className="px-6 py-3 rounded-xl bg-brand/20 text-brand font-bold border border-brand/50 hover:bg-brand hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </form>

          {/* Brand List */}
          <div className="glass rounded-3xl border border-white/10 overflow-hidden flex flex-col h-[400px] lg:h-[600px]">
            <div className="p-4 border-b border-white/10 bg-black/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search brands..." 
                  value={searchBrand}
                  onChange={(e) => setSearchBrand(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand/50"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              {filteredBrands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setActiveBrandId(brand.id)}
                  className={`w-full text-left p-4 rounded-2xl mb-1 flex items-center justify-between transition-all duration-300 group ${
                    activeBrandId === brand.id 
                      ? 'bg-brand/10 border border-brand/30 text-white shadow-[0_0_15px_rgba(0,255,102,0.1)]' 
                      : 'border border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                    <div className="flex items-center gap-3 w-full">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        activeBrandId === brand.id ? 'bg-brand/20 text-brand' : 'bg-black/40 text-white/40 group-hover:bg-white/10 group-hover:text-white'
                      }`}>
                        <Tag className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-bold truncate block w-full">{brand.name}</span>
                        <p className="text-[10px] uppercase tracking-wider opacity-60 font-semibold">{categories.filter(c => c.parentCategory === brand.id).length} Models</p>
                      </div>
                    </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeBrandId === brand.id ? 'text-brand translate-x-1' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </button>
              ))}
              
              {filteredBrands.length === 0 && (
                <div className="text-center p-8 text-white/40 text-sm">
                  No brands found matching "{searchBrand}"
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Model Management */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {activeBrand ? (
              <motion.div
                key={activeBrand.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-3xl border border-white/10 overflow-hidden flex flex-col min-h-[500px] lg:h-[calc(100vh-280px)] lg:min-h-[600px]"
              >
                {/* Active Brand Header */}
                <div className="p-6 md:p-8 border-b border-white/10 bg-black/40 relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 md:-right-4 md:-top-4 text-white/5 pointer-events-none transform -rotate-12 hidden sm:block">
                    <CarFront className="w-48 h-48 md:w-64 md:h-64" />
                  </div>
                  
                  <div className="relative z-10 w-full">
                    <span className="inline-block px-3 py-1 bg-brand/10 text-brand border border-brand/20 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 whitespace-nowrap">
                      Selected Brand
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white break-words w-full sm:max-w-[70%] lg:max-w-none">{activeBrand.name}</h2>
                    <p className="text-sm md:text-base text-white/50 mt-2 font-medium">Manage sub-types and models belonging to this brand.</p>
                  </div>
                </div>

                {/* Add Model Form */}
                <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                  <form onSubmit={handleAddModel} className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text" 
                      value={newModelName}
                      onChange={(e) => setNewModelName(e.target.value)}
                      placeholder={`Add new ${activeBrand.name} model (e.g. Alto 800)`} 
                      className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50"
                    />
                    <button 
                      type="submit"
                      disabled={!newModelName.trim()}
                      className="px-6 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add Model
                    </button>
                  </form>
                </div>

                {/* Models List */}
                <div className="flex-1 overflow-y-auto p-6 bg-black/20 custom-scrollbar">
                  <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                    Registered Models <span className="bg-white/10 px-2 py-0.5 rounded-full text-white/80">{activeBrandModels.length}</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <AnimatePresence>
                      {activeBrandModels.map((model) => (
                        <motion.div
                          key={model.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:border-white/20 hover:bg-white/[0.05] transition-all"
                        >
                          <div className="flex items-center gap-3 truncate pr-4">
                            <CarFront className="w-4 h-4 text-white/30 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                            <span className="font-semibold text-white/90 truncate">{model.name}</span>
                          </div>
                          
                          <button 
                            onClick={() => handleDeleteModel(model.id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-500/0 opacity-0 group-hover:opacity-100 group-hover:text-red-400 hover:bg-red-500/20 transition-all flex-shrink-0"
                            title="Delete Model"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {activeBrandModels.length === 0 && (
                      <div className="col-span-full border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                        <Tag className="w-10 h-10 text-white/20 mb-3" />
                        <p className="text-white/60 font-medium">No models found for {activeBrand.name}</p>
                        <p className="text-white/40 text-sm mt-1">Use the form above to add the first model.</p>
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="h-full min-h-[600px] border-2 border-dashed border-white/10 rounded-3xl flex items-center justify-center text-center p-10">
                <div>
                  <CarFront className="w-16 h-16 text-white/10 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Brand Selected</h3>
                  <p className="text-white/40 max-w-sm mx-auto">Select a brand from the list on the left to view and manage its sub-types and specific vehicle models.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default AdminCategories;
