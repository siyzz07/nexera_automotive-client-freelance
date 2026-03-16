import { Routes, Route } from 'react-router-dom';
import Home from '../pages/userPages/Home';
import CarSeen from '../pages/userPages/CarSeen';
import About from '../pages/userPages/About';
import CarDetails from '../pages/userPages/CarDetails';
import Navbar from '../components/userComponents/Navbar';
import Footer from '../components/userComponents/Footer';

const UserRoutes = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car-seen" element={<CarSeen />} />
          <Route path="/about" element={<About />} />
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default UserRoutes;
