import { motion } from 'framer-motion';
import { Shield, FileCheck, TriangleAlert, Eye, Gauge, CreditCard, ShieldAlert } from 'lucide-react';

const trustItems = [
  {
    id: "AUDIT-01",
    icon: <Shield className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Certified Dealers",
    description: "Sourced exclusively from our authorized premium network."
  },
  {
    id: "AUDIT-02",
    icon: <FileCheck className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Ownership Authenticity",
    description: "Rigorous title verification to guarantee clear history."
  },
  {
    id: "AUDIT-03",
    icon: <TriangleAlert className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Accident History Check",
    description: "Zero tolerance for structural damage or major repairs."
  },
  {
    id: "AUDIT-04",
    icon: <Eye className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Insurance Transparency",
    description: "Complete visibility into past claims and coverage."
  },
  {
    id: "AUDIT-05",
    icon: <Gauge className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Odometer Verification",
    description: "Forensic analysis confirming authentic vehicle mileage."
  },
  {
    id: "AUDIT-06",
    icon: <CreditCard className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Loan Clearance",
    description: "Guaranteed free of all previous financial encumbrances."
  },
  {
    id: "AUDIT-07",
    icon: <ShieldAlert className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Theft Record Screening",
    description: "Comprehensive global database clearance."
  }
];

const TrustIndicators = () => {

  return (
    <section className="py-32 relative overflow-hidden bg-[#020202] border-t border-white/5">
      <div className="noise" />
      <div className="scanlines" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-brand" />
            <span className="text-[10px] font-black text-brand uppercase tracking-[0.5em]">Nexera Protocol</span>
            <div className="w-8 h-[1px] bg-brand" />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-heading font-black text-white leading-none tracking-tighter mb-6 uppercase">
            7-POINT <span className="text-brand-gradient">VERIFICATION</span>
          </h2>
          
          <p className="text-gray-500 text-lg leading-relaxed font-light max-w-2xl mx-auto">
            All vehicles must pass our rigorous quality standards to appear on the platform. We leave nothing to chance when it comes to your peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative shadow-2xl shadow-green-500/20  border-4 p-8 bg-[#050508] rounded-3xl border border-white/5 hover:border-brand/40 transition-all duration-500 overflow-hidden flex flex-col items-center text-center"
            >
              {/* Subtle Scanning Light Bar */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-brand/30 group-hover:bg-brand/5 transition-all duration-500">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand transition-colors tracking-tight uppercase">
                {item.title}
              </h3>
              
              <p className="text-sm text-gray-500 leading-relaxed font-light group-hover:text-gray-400 transition-colors">
                {item.description}
              </p>
              
              <div className="mt-8 pt-4 border-t border-white/5 w-full text-[9px] font-mono text-white/20 tracking-widest uppercase">
                PROTOCOL: {item.id}
              </div>
            </motion.div>
          ))}
          
          {/* Live Status Card for empty slot in 3x3 grid (optional, but fills space well) */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="group relative p-8 bg-brand/5 rounded-3xl border border-brand/20 backdrop-blur-xl flex flex-col justify-center items-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand/5 animate-pulse" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-6 h-6 text-brand" />
              </div>
              <span className="text-xs font-bold text-brand uppercase tracking-widest block mb-4">Nexera Audio Protocol</span>
              <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/40 mb-2">
                <span>Verification Engine</span>
                <span className="text-brand">Active</span>
              </div>
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 }}
                  className="h-full bg-brand" 
                />
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
