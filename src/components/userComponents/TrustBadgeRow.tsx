import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, ClipboardCheck, History } from 'lucide-react';

const badges = [
  {
    icon: <UserCheck className="w-5 h-5 text-brand" />,
    label: "Verified Sellers Only",
    description: "Strict background checks"
  },
  {
    icon: <ClipboardCheck className="w-5 h-5 text-brand" />,
    label: "200+ Point Inspection",
    description: "Technical excellence"
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-brand" />,
    label: "Secure Transactions",
    description: "End-to-end protection"
  },
  {
    icon: <History className="w-5 h-5 text-brand" />,
    label: "Title Guaranteed",
    description: "Legal history verification"
  }
];

const TrustBadgeRow = () => {
  return (
    <div className="w-full bg-black/50 border-y border-white/5 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand/5 via-transparent to-brand/5 opacity-30" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 lg:gap-12">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-center md:items-start lg:items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand/10 group-hover:border-brand/30 transition-all duration-500">
                {badge.icon}
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-white font-bold text-sm tracking-wide uppercase">{badge.label}</h4>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadgeRow;
