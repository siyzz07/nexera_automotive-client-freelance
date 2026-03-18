import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, ClipboardCheck, History, Award, CheckCircle2 } from 'lucide-react';

const trustItems = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    label: "Protocol Vetted",
    value: "100%",
    color: "text-brand"
  },
  {
    icon: <ClipboardCheck className="w-5 h-5" />,
    label: "Technical Audits",
    value: "200+ Points",
    color: "text-brand"
  },
  {
    icon: <UserCheck className="w-5 h-5" />,
    label: "Verified Network",
    value: "Authorized Dealers",
    color: "text-brand"
  },
  {
    icon: <History className="w-5 h-5" />,
    label: "Title Integrity",
    value: "Guaranteed",
    color: "text-brand"
  },
  {
    icon: <Award className="w-5 h-5" />,
    label: "Premium Standard",
    value: "Certified Exclusive",
    color: "text-brand"
  },
  {
    icon: <CheckCircle2 className="w-5 h-5" />,
    label: "Fraud Protection",
    value: "Zero-Risk",
    color: "text-brand"
  }
];

const TrustSlider = () => {
  // Duplicate for seamless loop
  const duplicatedItems = [...trustItems, ...trustItems];

  return (
    <div className="w-full bg-black/80 backdrop-blur-md border-y border-white/[0.03] py-6 relative overflow-hidden group">
      {/* Cinematic Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

      <div className="flex overflow-hidden">
        <motion.div
           animate={{
             x: [0, "-50%"]
           }}
           transition={{
             duration: 30,
             repeat: Infinity,
             ease: "linear"
           }}
           className="flex items-center gap-12 lg:gap-24 whitespace-nowrap pr-12 lg:pr-24"
        >
          {duplicatedItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 group/item">
               <div className="flex items-center gap-3 px-4 py-2 glass-card rounded-2xl border-white/[0.03] group-hover/item:border-brand/30 transition-all duration-500">
                  <div className={`p-2 rounded-lg bg-white/[0.02] border border-white/5 ${item.color} drop-shadow-[0_0_8px_rgba(0,223,93,0.3)]`}>
                     {item.icon}
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] leading-none mb-1 group-hover/item:text-white transition-colors">
                        {item.label}
                     </span>
                     <span className="text-sm font-bold text-white tracking-tight">
                        {item.value}
                     </span>
                  </div>
               </div>
               
               {/* Separator Dot */}
               <div className="w-1 h-1 rounded-full bg-brand/30 group-hover/item:bg-brand transition-colors ml-12 lg:ml-24" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-full bg-brand/5 blur-[100px] pointer-events-none opacity-50" />
    </div>
  );
};

export default TrustSlider;
