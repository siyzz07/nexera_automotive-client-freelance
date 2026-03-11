import { motion } from 'framer-motion';
import { Shield, Zap, Cpu, Leaf } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-8 h-8 text-brand" />,
    title: "Instant Acceleration",
    description: "Experience hyper-responsive motors that deliver neck-snapping torque the moment you press the pedal."
  },
  {
    icon: <Cpu className="w-8 h-8 text-brand" />,
    title: "Autonomous Tech",
    description: "Next-generation sensors and AI integration provide unprecedented safety and semi-autonomous driving capabilities."
  },
  {
    icon: <Leaf className="w-8 h-8 text-brand" />,
    title: "Eco-Performance",
    description: "Zero emissions. 100% thrill. Sustainable engineering that doesn't compromise on raw power."
  },
  {
    icon: <Shield className="w-8 h-8 text-brand" />,
    title: "Armored Shell",
    description: "Aerospace-grade materials forming a protective cocoon, ensuring maximum safety without excess weight."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Forged in the <span className="text-brand-gradient">Future</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg pt-4">
            Uncompromising technology designed for the modern elite. Every detail meticulously crafted for unparalleled performance.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="glass-card group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {feature.icon}
              </div>
              <div className="w-14 h-14 rounded-full glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border-brand/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
