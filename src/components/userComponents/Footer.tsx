import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-glass-border relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-brand/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="text-3xl font-heading font-bold tracking-wider text-brand-gradient block mb-6">
              NEXERA
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Engineering the future of mobility. Uncompromising performance, unmatched luxury, unapologetic innovation.
            </p>
            <div className="flex space-x-4">
              {/* Dummy social icons */}
              <div className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center hover:border-brand hover:text-brand cursor-pointer transition-colors text-gray-400">
                <span className="sr-only">X</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
              <div className="w-10 h-10 rounded-full border border-glass-border flex items-center justify-center hover:border-brand hover:text-brand cursor-pointer transition-colors text-gray-400">
                <span className="sr-only">Instagram</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Vehicles</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-brand text-sm transition-colors">Compare Models</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-brand text-sm transition-colors">NEXERA X1</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-brand text-sm transition-colors">NEXERA V-Spec</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-brand text-sm transition-colors">Fleet & Business</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Discover</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-brand text-sm transition-colors">Our Vision</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-brand text-sm transition-colors">Autonomy Tech</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-brand text-sm transition-colors">Sustainability</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-brand text-sm transition-colors">News & Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-brand text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-brand text-sm transition-colors">Locate Dealer</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-brand text-sm transition-colors">Owners Manual</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-brand text-sm transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} NEXERA Motors. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</Link>
            <Link to="/" className="text-gray-500 hover:text-white text-xs transition-colors">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
