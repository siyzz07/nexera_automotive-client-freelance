import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname === '/' || window.location.pathname === '') {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(id, { offset: -100, duration: 1.5 });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-sans font-black tracking-[0.2em] text-brand">
          NEXERA
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-brand transition-colors text-sm font-medium tracking-wide">
            Home
          </Link>
          <Link 
            to="/#verification-protocol" 
            onClick={() => handleScrollTo('#verification-protocol')}
            className="text-gray-300 hover:text-brand transition-colors text-sm font-medium tracking-wide"
          >
            Verify Steps
          </Link>
          <Link to="/car-seen" className="text-gray-300 hover:text-brand transition-colors text-sm font-medium tracking-wide">
            Market Place
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-brand transition-colors text-sm font-medium tracking-wide">
            About Us
          </Link>
          <button className="px-5 py-2 rounded-full border border-brand/50 text-brand hover:bg-brand hover:text-black transition-all duration-300 text-sm font-semibold shadow-[0_0_15px_rgba(0,223,93,0.15)] hover:shadow-[0_0_25px_rgba(0,223,93,0.4)]">
            Contact
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#020202c7] absolute top-full left-0 w-full flex flex-col items-center py-6 space-y-4 border-t border-glass-border">
          <Link onClick={()=>setIsMobileMenuOpen(false)} to="/" className="text-white hover:text-brand text-lg">Home</Link>
          <Link 
            onClick={() => handleScrollTo('#verification-protocol')} 
            to="/#verification-protocol" 
            className="text-white hover:text-brand text-lg font-medium"
          >
            Verify Steps
          </Link>
          <Link onClick={()=>setIsMobileMenuOpen(false)} to="/car-seen" className="text-white hover:text-brand text-lg">Market Place</Link>
          <Link onClick={()=>setIsMobileMenuOpen(false)} to="/about" className="text-white hover:text-brand text-lg">About</Link>
          <button onClick={()=>setIsMobileMenuOpen(false)} className="px-6 py-2 text-white rounded-full bg-brand  font-semibold mt-4">
            Contact
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
