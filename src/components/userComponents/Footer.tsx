import { Twitter, Instagram, Linkedin, Github, Globe } from 'lucide-react';

const Footer = () => {
  const socialIcons = [
    { icon: <Twitter className="w-5 h-5" />, link: "#" },
    { icon: <Instagram className="w-5 h-5" />, link: "#" },
    { icon: <Linkedin className="w-5 h-5" />, link: "#" },
    { icon: <Github className="w-5 h-5" />, link: "#" }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 max-w-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-black font-black text-xl">
                N
              </div>
              <span className="text-2xl font-sans font-bold text-white tracking-tighter">NEXERA</span>
            </div>
            <p className="text-gray-500 font-light leading-relaxed mb-10">
              The world's first computational automotive commerce platform. Engineering trust through algorithmic transparency.
            </p>
            <div className="flex gap-4">
              {socialIcons.map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-brand hover:border-brand/40 hover:bg-brand/10 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1" />

          {/* Links Grid */}
          {footerLinks.map((section, i) => (
            <div key={i} className="lg:col-span-2">
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

          {/* Newsletter / Status */}
          {/* <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-8">Secure Status</h4>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Network</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                  <span className="text-[10px] font-bold text-brand uppercase tracking-widest">Encrypted</span>
                </div>
              </div>
              <div className="text-xs text-white/60 font-mono tracking-tighter mb-4">v2.41.0-stable</div>
              <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
                System Log
              </button>
            </div>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
              © 2026 NEXERA CORP.
            </p>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                <Globe className="w-3 h-3" />
                <span>Global Protocol</span>
              </div>
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                GMT+00:00
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-brand/10 border border-brand/20 rounded-md">
              <span className="text-[9px] font-black text-brand uppercase tracking-widest">ISO 27001</span>
            </div>
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-md">
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">SOC2 TYPE II</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
