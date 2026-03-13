import { motion } from 'framer-motion';
import { Shield, FileCheck, TriangleAlert, Eye, Gauge, CreditCard, CarFront } from 'lucide-react';

const trustItems = [
  {
    icon: <Shield className="w-8 h-8 text-brand stroke-[1.5]" />,
    title: "Certified Dealers",
    description: "Sourced exclusively from our authorized premium network."
  },
  {
    icon: <FileCheck className="w-8 h-8 text-brand stroke-[1.5]" />,
    title: "Ownership\nAuthenticity",
    description: "Rigorous title verification to guarantee clear history."
  },
  {
    icon: <TriangleAlert className="w-8 h-8 text-brand stroke-[1.5]" />,
    title: "Accident History\nCheck",
    description: "Zero tolerance for structural damage or major repairs."
  },
  {
    icon: <Eye className="w-8 h-8 text-brand stroke-[1.5]" />,
    title: "Insurance\nTransparency",
    description: "Complete visibility into past claims and coverage."
  },
  {
    icon: <Gauge className="w-8 h-8 text-brand stroke-[1.5]" />,
    title: "Odometer\nVerification",
    description: "Forensic analysis confirming authentic vehicle mileage."
  },
  {
    icon: <CreditCard className="w-8 h-8 text-brand stroke-[1.5]" />,
    title: "Loan Clearance",
    description: "Guaranteed free of all previous financial encumbrances."
  },
  {
    icon: <CarFront className="w-8 h-8 text-brand stroke-[1.5]" />,
    title: "Theft Record\nScreening",
    description: "Comprehensive global database clearance."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 }
  }
};

const TrustIndicators = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/5">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-5xl">
        
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-brand" />
            <span className="text-brand text-xs font-bold tracking-widest uppercase">
              The Nexera Standard
            </span>
          </motion.div>
            
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white mb-6 tracking-tight"
          >
            7-Point <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-500">Verification</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light"
          >
            All vehicles must pass our rigorous quality standards to appear on the platform. We leave nothing to chance when it comes to your peace of mind.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8"
        >
          {trustItems.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`bg-[#0A0A0A] rounded-2xl sm:rounded-3xl border border-white/5 hover:border-brand/40 hover:bg-[#0D0D0D] transition-all duration-500 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-10 text-center group relative overflow-hidden ${
                index === trustItems.length - 1 ? 'col-span-2 w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.75rem)] justify-self-center lg:col-span-1 lg:col-start-2 lg:w-full' : ''
              }`}
            >
              {/* Internal glow effect */}
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500 relative z-10">
                <div className="absolute inset-0 bg-brand/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {item.icon}
              </div>
              
              <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3 whitespace-pre-line leading-tight sm:leading-snug relative z-10 group-hover:text-brand transition-colors">
                {item.title}
              </h3>
              
              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 leading-relaxed font-medium relative z-10 group-hover:text-gray-300 transition-colors duration-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustIndicators;
