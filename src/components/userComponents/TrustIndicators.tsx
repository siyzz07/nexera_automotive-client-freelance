import { motion } from 'framer-motion';
import { ShieldCheck, Award, Headphones, Map } from 'lucide-react';

const trustItems = [
  {
    icon: <Award className="w-10 h-10 text-brand" />,
    title: "10-Year Warranty",
    description: "Industry-leading powertrain and battery guarantee for ultimate peace of mind."
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-brand" />,
    title: "5-Star Safety",
    description: "Achieved the highest global safety ratings with our proprietary armored shell and AI collision avoidance."
  },
  {
    icon: <Headphones className="w-10 h-10 text-brand" />,
    title: "24/7 Concierge",
    description: "Priority global support and roadside assistance directly integrated into your vehicle's interface."
  },
  {
    icon: <Map className="w-10 h-10 text-brand" />,
    title: "Global Charging",
    description: "Access to over 100,000 rapid superchargers worldwide, seamlessly routed by your AI navigator."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

const TrustIndicators = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-black border-y border-glass-border">
      {/* Background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold mb-4"
          >
            Built on <span className="text-brand-gradient">Trust</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg pt-2"
          >
            We don't just engineer vehicles; we engineer confidence. Our commitment to you extends far beyond the point of sale.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {trustItems.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass p-8 rounded-3xl border border-glass-border hover:border-brand/30 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle hover glow behind icon */}
              <div className="absolute top-8 left-8 w-16 h-16 bg-brand/20 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustIndicators;
