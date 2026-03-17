import { motion } from 'framer-motion';
import { Shield, FileCheck, TriangleAlert, Eye, Gauge, CreditCard, CarFront, Zap } from 'lucide-react';
import { useMagnetic } from '../../hooks/useMagnetic';
import TextReveal from './TextReveal';

const trustItems = [
  {
    id: "AUDIT-01",
    icon: <Shield className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Certified Dealers",
    description: "Multi-point authorization protocol for verified network entry."
  },
  {
    id: "AUDIT-02",
    icon: <FileCheck className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Title Verification",
    description: "Historical ledger analysis ensuring clear ownership status."
  },
  {
    id: "AUDIT-03",
    icon: <TriangleAlert className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Integrity Check",
    description: "Deep-layer structural analysis for incident-free assurance."
  },
  {
    id: "AUDIT-04",
    icon: <Eye className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Claim History",
    description: "Comprehensive transparency on historical insurance data."
  },
  {
    id: "AUDIT-05",
    icon: <Gauge className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Odometer Forensics",
    description: "Advanced validation of authentic vehicle usage metrics."
  },
  {
    id: "AUDIT-06",
    icon: <CreditCard className="w-6 h-6 text-brand stroke-[1.5]" />,
    title: "Financial Audit",
    description: "Verification of zero-encumbrance status across all lenders."
  }
];

const TrustIndicators = () => {
  const containerRef = useMagnetic<HTMLDivElement>();

  return (
    <section className="py-32 relative overflow-hidden bg-[#050505] border-t border-white/5">
      <div className="noise" />
      <div className="scanlines" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start mb-24">
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-[1px] bg-brand" />
              <span className="text-[10px] font-black text-brand uppercase tracking-[0.5em]">Nexera Protocol</span>
            </motion.div>
            
            <TextReveal 
              text="TECHNICAL" 
              className="text-5xl md:text-7xl font-heading font-black text-white leading-none tracking-tighter mb-2"
            />
            <TextReveal 
              text="AUDIT 7.0" 
              className="text-5xl md:text-7xl font-heading font-black text-brand-gradient leading-none tracking-tighter mb-8"
              delay={0.2}
            />
            
            <p className="text-gray-500 text-lg leading-relaxed font-light mb-12">
              Every vehicle undergoes a rigorous 7-point cryptographic and mechanical verification process to ensure uncompromising standards.
            </p>
            
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-brand" />
                </div>
                <span className="text-white font-bold tracking-wider">Live Status</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/40">
                  <span>Engine Validation</span>
                  <span className="text-brand">Active</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "94%" }}
                    className="h-full bg-brand" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div ref={containerRef} className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 h-max">
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 bg-[#0A0A0A] rounded-2xl border border-white/5 hover:border-brand/40 transition-all duration-500 overflow-hidden"
              >
                {/* Advanced Scanning Light Bar */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="text-[10px] font-mono text-white/20 tracking-widest">{item.id}</div>
                  <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-brand/20 transition-colors">
                    {item.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand transition-colors tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-500 leading-relaxed font-light group-hover:text-gray-400 transition-colors">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
