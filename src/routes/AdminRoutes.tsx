import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../pages/adminPages/AdminLogin';

const AdminRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        {/* Add more admin routes here */}
      </Routes>
  );
};

export default AdminRoutes;
