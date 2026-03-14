import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Tag, ChevronRight, CarFront, Trash2, Search, Edit2, Check, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../services/apiServices/categoryApiService';
import toast from 'react-hot-toast';

export interface CategoryType {
  _id: string;
  name: string;
  parentCategory: string | null;
  isActive: boolean;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const refreshCategories = async () => {
    try {
      const response = await getCategories();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    refreshCategories();
  }, []);

  const brands = useMemo(() => categories.filter(c => c.parentCategory === null), [categories]);

  const [activeBrandId, setActiveBrandId] = useState<string | null>(null);
  const [searchBrand, setSearchBrand] = useState('');
  
  // State for adding new items
  const [newBrandName, setNewBrandName] = useState('');
  const [newModelName, setNewModelName] = useState('');

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    if (!activeBrandId && brands.length > 0) {
      setActiveBrandId(brands[0]._id);
    }
  }, [brands, activeBrandId]);

  const activeBrand = useMemo(() => 
    brands.find(c => c._id === activeBrandId),
  [brands, activeBrandId]);

  const activeBrandModels = useMemo(() => 
    categories.filter(c => c.parentCategory === (activeBrandId as any)?._id || c.parentCategory === activeBrandId),
  [categories, activeBrandId]);

  const filteredBrands = useMemo(() => 
    brands.filter(c => c.name.toLowerCase().includes(searchBrand.toLowerCase())),
  [brands, searchBrand]);

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    
    try {
      const response = await addCategory({ name: newBrandName.trim(), parentCategory: null });
      if (response.data.success) {
        toast.success('Brand added successfully');
        setNewBrandName('');
        await refreshCategories();
        setActiveBrandId(response.data.data._id);
      }
    } catch (error) {
      toast.error('Failed to add brand');
    }
  };

  const handleAddModel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModelName.trim() || !activeBrandId) return;

    try {
      const response = await addCategory({ name: newModelName.trim(), parentCategory: activeBrandId });
      if (response.data.success) {
        toast.success('Model added successfully');
        setNewModelName('');
        await refreshCategories();
      }
    } catch (error) {
      toast.error('Failed to add model');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      const response = await deleteCategory(id);
      if (response.data.success) {
        toast.success('Deleted successfully');
        await refreshCategories();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleUpdateName = async () => {
    if (!editingId || !editName.trim()) return;
    try {
      const response = await updateCategory(editingId, { name: editName.trim() });
      if (response.data.success) {
        toast.success('Updated successfully');
        setEditingId(null);
        await refreshCategories();
      }
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await updateCategory(id, { isActive: !currentStatus });
      if (response.data.success) {
        toast.success('Status updated');
        await refreshCategories();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-10">
      <div className="mb-4 md:mb-8 border-b border-white/10 pb-4 md:pb-6">
        <h1 className="text-xl md:text-3xl font-bold font-heading text-white mb-1 md:mb-2 tracking-wide">Category Management</h1>
        <p className="text-xs md:text-base text-white/60">Manage vehicle Brands and Models.</p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
        
        {/* Left Column: Brand Management */}
        <div className="w-full lg:col-span-5 flex flex-col gap-4 md:gap-6">
          
          {/* Add Brand Form */}
          <form onSubmit={handleAddBrand} className="glass p-4 md:p-6 rounded-2xl md:rounded-3xl border border-brand/20 relative overflow-hidden group">
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
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm text-white focus:outline-none focus:border-brand/50"
              />
              <button 
                type="submit"
                disabled={!newBrandName.trim()}
                className="px-6 py-2.5 md:py-3 rounded-xl bg-brand/20 text-brand font-bold border border-brand/50 hover:bg-brand hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Create
              </button>
            </div>
          </form>

          {/* Brand List */}
          <div className="glass rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden flex flex-col h-[400px] lg:h-[600px]">
            <div className="p-3 md:p-4 border-b border-white/10 bg-black/20">
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

            <div className="flex-1 overflow-y-auto custom-scrollbar p-1.5 md:p-2">
              {filteredBrands.map((brand) => (
                <div
                  key={brand._id}
                  onClick={() => setActiveBrandId(brand._id)}
                  className={`w-full group rounded-xl md:rounded-2xl mb-1 flex flex-col transition-all duration-300 border ${
                    activeBrandId === brand._id 
                      ? 'bg-brand/10 border-brand/30 text-white shadow-[0_0_15px_rgba(0,255,102,0.1)]' 
                      : 'border-transparent text-white/70 hover:bg-white/5 hover:text-white cursor-pointer'
                  }`}
                >
                  <div className="p-3 md:p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                      <div className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors ${
                        activeBrandId === brand._id ? 'bg-brand/20 text-brand' : 'bg-black/40 text-white/40 group-hover:bg-white/10 group-hover:text-white'
                      }`}>
                        <Tag className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {editingId === brand._id ? (
                          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="text" 
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="bg-black/60 border border-brand/50 rounded-lg px-2 py-1 text-sm text-white focus:outline-none w-full max-w-[120px]"
                              autoFocus
                            />
                            <button onClick={handleUpdateName} className="p-1 text-brand hover:text-brand/80"><Check className="w-4 h-4" /></button>
                            <button onClick={() => setEditingId(null)} className="p-1 text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button>
                          </div>
                        ) : (
                          <>
                            <span className="font-bold truncate block w-full text-sm md:text-base">{brand.name}</span>
                            <p className="text-[9px] md:text-[10px] uppercase tracking-wider opacity-60 font-semibold">{categories.filter(c => c.parentCategory === brand._id).length} Models</p>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 md:gap-2 ml-2">
                      {editingId !== brand._id && (
                        <>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingId(brand._id);
                              setEditName(brand.name);
                            }}
                            className={`p-1.5 rounded-lg transition-all ${
                              activeBrandId === brand._id ? 'opacity-100 text-white hover:bg-white/10' : 'opacity-0 group-hover:opacity-100 text-white/40 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCategory(brand._id);
                            }}
                            className={`p-1.5 rounded-lg transition-all ${
                              activeBrandId === brand._id ? 'opacity-100 text-red-400 hover:bg-red-500/20' : 'opacity-0 group-hover:opacity-100 text-red-500/40 hover:text-red-400 hover:bg-red-500/20'
                            }`}
                          >
                            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </button>
                        </>
                      )}
                      <ChevronRight className={`w-4 h-4 transition-transform hidden sm:block ${activeBrandId === brand._id ? 'text-brand translate-x-1' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                    </div>
                  </div>
                </div>
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
        <div className="w-full lg:col-span-7">
          <AnimatePresence mode="wait">
            {activeBrand ? (
              <motion.div
                key={activeBrand._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden flex flex-col min-h-[500px] lg:h-[calc(100vh-280px)] lg:min-h-[600px]"
              >
                {/* Active Brand Header */}
                <div className="p-5 md:p-8 border-b border-white/10 bg-black/40 relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 md:-right-4 md:-top-4 text-white/5 pointer-events-none transform -rotate-12 hidden sm:block">
                    <CarFront className="w-32 h-32 md:w-64 md:h-64" />
                  </div>
                  
                  <div className="relative z-10 w-full">
                    <span className="inline-block px-3 py-1 bg-brand/10 text-brand border border-brand/20 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-2 md:mb-3 whitespace-nowrap">
                      Selected Brand
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold font-heading text-white break-words w-full sm:max-w-[80%] lg:max-w-none">{activeBrand.name}</h2>
                    <p className="text-xs md:text-base text-white/50 mt-1 md:mt-2 font-medium">Manage sub-types and models.</p>
                  </div>
                </div>

                {/* Add Model Form */}
                <div className="p-4 md:p-6 border-b border-white/5 bg-white/[0.02]">
                  <form onSubmit={handleAddModel} className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text" 
                      value={newModelName}
                      onChange={(e) => setNewModelName(e.target.value)}
                      placeholder={`Add model (e.g. Alto 800)`} 
                      className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 md:py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                    />
                    <button 
                      type="submit"
                      disabled={!newModelName.trim()}
                      className="px-6 py-2.5 md:py-3 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/30 hover:bg-cyan-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> <span className="sm:hidden lg:inline">Add Model</span><span className="hidden sm:inline lg:hidden">Add</span>
                    </button>
                  </form>
                </div>

                {/* Models List */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-black/20 custom-scrollbar">
                  <h3 className="text-[10px] md:text-sm font-bold text-white/40 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                    Registered Models <span className="bg-white/10 px-2 py-0.5 rounded-full text-white/80">{activeBrandModels.length}</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                    <AnimatePresence>
                      {activeBrandModels.map((model) => (
                        <motion.div
                          key={model._id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center justify-between group hover:border-white/20 hover:bg-white/[0.05] transition-all"
                        >
                          <div className="flex items-center gap-2 md:gap-3 truncate pr-2 flex-1">
                            <CarFront className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/30 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              {editingId === model._id ? (
                                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                  <input 
                                    type="text" 
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="bg-black/60 border border-brand/50 rounded-lg px-2 py-1 text-sm text-white focus:outline-none w-full"
                                    autoFocus
                                  />
                                  <button onClick={handleUpdateName} className="p-1 text-brand hover:text-brand/80"><Check className="w-4 h-4" /></button>
                                  <button onClick={() => setEditingId(null)} className="p-1 text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button>
                                </div>
                              ) : (
                                <span className="font-semibold text-white/90 truncate text-sm md:text-base">{model.name}</span>
                              )}
                            </div>
                            <button 
                              onClick={() => handleToggleStatus(model._id, model.isActive)}
                              className="ml-auto flex-shrink-0"
                              title={model.isActive ? "Deactivate" : "Activate"}
                            >
                              {model.isActive ? <ToggleRight className="w-5 h-5 text-brand" /> : <ToggleLeft className="w-5 h-5 text-white/20" />}
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-1 md:gap-2 ml-1">
                            {editingId !== model._id && (
                              <>
                                <button 
                                  onClick={() => {
                                    setEditingId(model._id);
                                    setEditName(model.name);
                                  }}
                                  className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all md:opacity-0 md:group-hover:opacity-100"
                                >
                                  <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteCategory(model._id)}
                                  className="p-2 rounded-lg bg-red-500/10 text-red-500/40 hover:text-red-400 hover:bg-red-500/20 transition-all md:opacity-0 md:group-hover:opacity-100"
                                >
                                  <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {activeBrandModels.length === 0 && (
                      <div className="col-span-full border-2 border-dashed border-white/10 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center text-center">
                        <Tag className="w-8 h-8 md:w-10 md:h-10 text-white/20 mb-3" />
                        <p className="text-white/60 font-medium text-sm md:text-base">No models found for {activeBrand.name}</p>
                        <p className="text-white/40 text-xs mt-1">Add the first model using the form above.</p>
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] md:min-h-[600px] border-2 border-dashed border-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-center p-6 md:p-10">
                <div>
                  <CarFront className="w-12 h-12 md:w-16 md:h-16 text-white/10 mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">No Brand Selected</h3>
                  <p className="text-white/40 text-sm md:text-base max-w-sm mx-auto">Select a brand from the list on the left to manage its models.</p>
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
