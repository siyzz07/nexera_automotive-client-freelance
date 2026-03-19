import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { getAllCars, updateCarStatus, deleteCarListing } from '../../services/apiServices/carApiService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminCarList = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCars(1, 100, { isAdmin: true });
      if (response.data.success) {
        setInventory(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
      toast.error('Failed to load inventory');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    if (!window.confirm(`Are you sure you want to change vehicle status to ${newStatus}?`)) return;
    
    try {
      const response = await updateCarStatus(id, newStatus);
      if (response.data.success) {
        toast.success(`Vehicle status updated to ${newStatus}`);
        fetchInventory(); // Refresh mission data
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string, brand: string, model: string) => {
    if (!window.confirm(`CRITICAL ACTION: Are you sure you want to PERMANENTLY DELETE the ${brand} ${model}? This action cannot be undone.`)) return;

    try {
      const response = await deleteCarListing(id);
      if (response.data.success) {
        toast.success('Vehicle listing removed successfully');
        fetchInventory();
      }
    } catch (error) {
      toast.error('Failed to eliminate vehicle listing');
    }
  };

  const filteredCars = inventory.filter(car => {
    const brand = typeof car.brand === 'object' ? car.brand.name : '';
    const model = typeof car.carModel === 'object' ? car.carModel.name : '';
    const id = car.inventoryId || car._id || '';

    return brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
           model.toLowerCase().includes(searchTerm.toLowerCase()) ||
           id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-sans text-white mb-2 tracking-wide">Inventory Management</h1>
          <p className="text-white/60">Manage all listed vehicles, update statuses, and view metrics.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search ID, Make, Model..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand/50 min-w-[250px]"
            />
          </div>
          <button className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="glass rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/40 text-[10px] md:text-xs tracking-widest text-white/50 uppercase font-bold">
                <th className="p-4 md:p-6 w-20">ID Ref</th>
                <th className="p-4 md:p-6">Vehicle</th>
                <th className="p-4 md:p-6">Price</th>
                <th className="p-4 md:p-6">Status</th>
                <th className="p-4 md:p-6">Date Listed</th>
                <th className="p-4 md:p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCars.map((car, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={car.id} 
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="p-4 md:p-6">
                    <span className="text-xs font-bold text-white/40 bg-white/5 px-2 py-1 rounded-md">
                      {car.inventoryId || 'NEW'}
                    </span>
                  </td>
                   <td className="p-4 md:p-6">
                    <div>
                      <p className="text-xs text-brand font-bold uppercase tracking-widest mb-0.5">
                        {typeof car.brand === 'object' ? car.brand.name : 'Unknown'}
                      </p>
                      <p className="text-sm md:text-base font-bold text-white">
                        {typeof car.carModel === 'object' ? car.carModel.name : 'Unknown'} 
                        <span className="text-white/40 font-normal text-sm ml-2">
                          ({new Date(car.createdAt).getFullYear()})
                        </span>
                      </p>
                    </div>
                  </td>
                  <td className="p-4 md:p-6 font-bold text-white">
                    ₹ {car.price?.toLocaleString()}
                  </td>
                  <td className="p-4 md:p-6">
                    <select 
                      value={car.status}
                      onChange={(e) => handleStatusUpdate(car._id, e.target.value)}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg border bg-black/40 outline-none cursor-pointer transition-all ${
                        car.status === 'Available' ? 'text-green-400 border-green-500/20 hover:border-green-500' : 
                        car.status === 'Reserved' ? 'text-orange-400 border-orange-500/20 hover:border-orange-500' : 
                        'text-red-400 border-red-500/20 hover:border-red-500'
                      }`}
                    >
                      <option value="Available" className="bg-surface text-white">Available</option>
                      <option value="Reserved" className="bg-surface text-white">Reserved</option>
                      <option value="Sold" className="bg-surface text-white">Sold</option>
                    </select>
                  </td>
                  <td className="p-4 md:p-6 text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-widest">
                    {new Date(car.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 md:p-6 text-right">
                    <div className="flex justify-end gap-2 transition-all">
                      <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors" title="View Listing" onClick={() => window.open(`/car/${car._id}`, '_blank')}>
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-white transition-colors" 
                        title="Edit Data"
                        onClick={() => {
                          if (window.confirm(`Initiate modification protocol for ${car.brand.name} ${car.carModel.name}?`)) {
                            navigate(`/admin/edit-car/${car._id}`);
                          }
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors" 
                        title="Delete Listing"
                        onClick={() => handleDelete(car._id, car.brand.name, car.carModel.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              
              {isLoading ? (
                <tr>
                   <td colSpan={6} className="text-center p-12 text-white/40">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
                      Loading inventory...
                    </div>
                  </td>
                </tr>
              ) : filteredCars.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-12 text-white/40">
                    No vehicles found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCarList;
