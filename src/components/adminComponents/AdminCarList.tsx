import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';

const AdminCarList = () => {
  // Mock data mimicking a backend payload
  const mockInventory = [
    { id: "INV-1029", brand: "Mercedes-Benz", model: "G63 AMG", year: 2022, price: 215000, status: "Active", views: 1240 },
    { id: "INV-1030", brand: "Porsche", model: "911 GT3", year: 2023, price: 285000, status: "Pending", views: 3105 },
    { id: "INV-1031", brand: "BMW", model: "M4 Competition", year: 2021, price: 82000, status: "Active", views: 890 },
    { id: "INV-1032", brand: "Audi", model: "RS6 Avant", year: 2024, price: 145000, status: "Sold", views: 420 },
    { id: "INV-1033", brand: "Land Rover", model: "Range Rover Sport", year: 2022, price: 95000, status: "Active", views: 650 },
    { id: "INV-1034", brand: "Lamborghini", model: "Urus", year: 2021, price: 295000, status: "Active", views: 5120 },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = mockInventory.filter(car => 
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white mb-2 tracking-wide">Inventory Management</h1>
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
                <th className="p-4 md:p-6">Views</th>
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
                    <span className="text-xs font-bold text-white/40 bg-white/5 px-2 py-1 rounded-md">{car.id.split('-')[1]}</span>
                  </td>
                  <td className="p-4 md:p-6">
                    <div>
                      <p className="text-xs text-brand font-bold uppercase tracking-widest mb-0.5">{car.brand}</p>
                      <p className="text-sm md:text-base font-bold text-white">{car.model} <span className="text-white/40 font-normal text-sm">({car.year})</span></p>
                    </div>
                  </td>
                  <td className="p-4 md:p-6 font-bold text-white">
                    ${car.price.toLocaleString()}
                  </td>
                  <td className="p-4 md:p-6">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border flex items-center w-fit gap-1.5 ${
                        car.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        car.status === 'Pending' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                          car.status === 'Active' ? 'bg-green-400 shadow-[0_0_5px_#4ade80]' : 
                          car.status === 'Pending' ? 'bg-orange-400 shadow-[0_0_5px_#fb923c]' : 
                          'bg-red-400 shadow-[0_0_5px_#f87171]'
                        }`} />
                        {car.status}
                    </span>
                  </td>
                  <td className="p-4 md:p-6 text-xs font-bold text-white/70">
                    {car.views.toLocaleString()}
                  </td>
                  <td className="p-4 md:p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors" title="View Listing">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-white transition-colors" title="Edit Data">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors" title="Delete Listing">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Fallback dotted menu button for mobile/when not hovering */}
                    <button className="p-2 text-white/30 hidden group-hover:hidden">
                       <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
              
              {filteredCars.length === 0 && (
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
