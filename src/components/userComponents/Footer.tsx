import { Twitter, Instagram, Linkedin, Github, Globe, Facebook, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const socialIcons = [
    { icon: <Facebook className="w-5 h-5" />, link: "https://www.facebook.com/share/17iq8gUhoW/?mibextid=wwXIfr" },
    { icon: <Instagram className="w-5 h-5" />, link: "https://www.instagram.com/nexera_market?igsh=MXhtdDk1b3ZhNnZhaA==" },
    { icon: <MessageCircle className="w-5 h-5" />, link: "https://wa.me/7338827533" },
    { icon: <Mail className="w-5 h-5" />, link: "mailto:nexeramarketoffical@gmail.com" }
  ];

  const footerLinks = [
    {
      title: "Navigation",
      links: ["Inventory", "B2B Solutions", "Engineering", "Press", "Career"]
    },
    {
      title: "Legal Protocol",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Compliance", "Security"]
    },
    {
      title: "Support",
      links: ["Help Center", "API Documentation", "System Status", "Verification Desk"]
    }
  ];

  return (
    <footer className="relative bg-[#020202] pt-32 pb-12 overflow-hidden border-t border-white/5">
      <div className="noise" />
      <div className="scanlines" />
      
      {/* Massive Background Logo Mark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none z-0 overflow-hidden">
        <h2 className="text-[25vw] font-black text-white/[0.02] leading-none tracking-tighter text-center">
          NEXERA
        </h2>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24 items-start">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 max-w-sm mx-auto md:mx-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(0,186,62,0.3)]">
                N
              </div>
              <span className="text-2xl font-sans font-bold text-white tracking-tighter">NEXERA</span>
            </div>
            <p className="text-gray-500 font-light leading-relaxed mb-10 text-sm md:text-base">
              The world's first computational automotive commerce platform. Engineering trust through algorithmic transparency and elite verification protocols.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {socialIcons.map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-brand hover:border-brand/40 hover:bg-brand/10 transition-all duration-300 group"
                >
                  <span className="group-hover:scale-110 transition-transform">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:col-span-7 gap-12 text-center md:text-left">
            {footerLinks.map((section, i) => (
              <div key={i} className="col-span-1 md:col-span-1 lg:col-span-2">
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-medium tracking-wide">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] text-center md:text-left">
              © 2026 NEXERA CORP. <span className="hidden md:inline mx-2">•</span> <br className="md:hidden" /> ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                <Globe className="w-3 h-3 text-brand" />
                <span>Global Protocol</span>
              </div>
              <div className="text-[10px] font-bold text-white/10 uppercase tracking-[0.2em]">
                GMT+00:00
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-brand/5 border border-brand/20 rounded-lg group hover:border-brand/50 transition-colors">
              <span className="text-[9px] font-black text-brand uppercase tracking-widest">ISO 27001</span>
            </div>
            <div className="px-3 py-1.5 bg-white/[0.02] border border-white/10 rounded-lg group hover:border-white/30 transition-colors">
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">SOC2 TYPE II</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
