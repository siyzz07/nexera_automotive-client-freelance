import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../pages/adminPages/AdminLogin';
import AdminLayout from '../layouts/AdminLayout';
import AdminOverview from '../components/adminComponents/AdminOverview';
import AdminCarList from '../components/adminComponents/AdminCarList';
import AddCar from '../components/adminComponents/AddCar';
import AdminCategories from '../components/adminComponents/AdminCategories';
import { Settings } from 'lucide-react';

const PlaceholderModule = () => (
  <div className="h-full min-h-[500px] border-2 border-dashed border-white/10 rounded-3xl flex items-center justify-center text-center p-10">
    <div>
      <Settings className="w-16 h-16 text-white/10 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">Module In Development</h3>
      <p className="text-white/40 max-w-sm mx-auto">This section of the admin portal is currently under construction.</p>
    </div>
  </div>
);

const AdminRoutes = () => {
  return (
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        
        {/* Admin Layout wrapper */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="inventory" element={<AdminCarList />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<PlaceholderModule />} />
          <Route path="settings" element={<PlaceholderModule />} />
        </Route>
      </Routes>
  );
};

export default AdminRoutes;
