import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import InitialLoader from './components/userComponents/InitialLoader';
import GlobalBackground from './components/userComponents/GlobalBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Disable Lenis for Admin routes
    if (location.pathname.startsWith('/admin')) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.0,
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Synchronize Lenis with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [isLoading, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <InitialLoader key="loader" onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          <div key="content" className="min-h-screen bg-[#010101] selection:bg-brand/30 selection:text-white">
            <GlobalBackground />
            <Routes>
              <Route path="/*" element={<UserRoutes />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;