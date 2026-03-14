import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Car, 
  PlusCircle, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  Tags
} from 'lucide-react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import GlobalBackground from '../components/userComponents/GlobalBackground';
import { removeToken } from '../utils/sessionStorageUtils';
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    removeToken();
    toast.success('Successfully signed out');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: '', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'inventory', label: 'Manage Inventory', icon: Car },
    { id: 'add-car', label: 'Add New Vehicle', icon: PlusCircle },
    { id: 'categories', label: 'Categories & Brands', icon: Tags },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];


  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden flex flex-col">
      <GlobalBackground />
      
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-6 left-4 z-50">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 glass rounded-xl border border-white/10 text-white hover:text-brand transition-colors shadow-lg"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Main Layout Container */}
      <div className="flex-1 flex min-h-0 w-full max-w-[1600px] mx-auto p-4 lg:p-6 gap-4 relative z-10 overflow-hidden">
        
        {/* Sidebar Overlay (Mobile) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence>
          <motion.aside 
            initial={{ x: -300, opacity: 0 }}
            animate={{ 
              x: isSidebarOpen ? 0 : -300, 
              opacity: isSidebarOpen ? 1 : 0 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed lg:relative z-40 w-72 h-[calc(100%)] glass border border-white/10 rounded-3xl flex flex-col overflow-hidden backdrop-blur-2xl transition-all ${
              !isSidebarOpen ? 'pointer-events-none lg:pointer-events-auto lg:hidden' : ''
            }`}
          >
              <div className="p-6 border-b border-white/10 bg-black/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-cyan-400 p-0.5">
                    <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                      <LayoutDashboard className="w-5 h-5 text-brand" />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg font-heading tracking-wider">NEXERA</h2>
                    <p className="text-[10px] text-brand font-bold uppercase tracking-widest">Admin Portal</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  // Handle empty id for dashboard root
                  const targetPath = item.id ? `/admin/${item.id}` : '/admin';
                  // Check if this route is active
                  const isActive = location.pathname === targetPath || (item.id === '' && location.pathname === '/admin/dashboard'); 
                  
                  return (
                    <Link
                      key={item.id || 'dashboard'}
                      to={targetPath}
                      onClick={() => {
                        if (window.innerWidth < 1024) setIsSidebarOpen(false);
                      }}
                      className={`w-full flex flex-row items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                        isActive 
                          ? 'bg-brand/10 border-brand/30 text-white border shadow-[inset_0_0_20px_rgba(0,255,102,0.1)]' 
                          : 'bg-transparent border-transparent text-white/60 hover:bg-white/5 hover:text-white border'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-brand' : 'group-hover:text-brand/70'}`} />
                        <span className="font-semibold text-sm">{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-brand" />}
                    </Link>
                  )
                })}
              </div>

              <div className="p-4 border-t border-white/10 bg-black/20">
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-bold text-sm">Sign Out</span>
                </button>
              </div>
            </motion.aside>
        </AnimatePresence>

        {/* Main Content Area */}
        <main className={`flex-1 min-w-0 glass border border-white/10 rounded-3xl overflow-y-auto custom-scrollbar transition-all duration-500 bg-black/40 backdrop-blur-md w-full lg:w-auto h-full relative ${
          isSidebarOpen ? 'lg:ml-0' : 'ml-0'
        }`}>
          <div className="p-4 sm:p-6 md:p-10 pt-20 lg:pt-10 min-h-full">
            <Outlet />
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default AdminLayout;
