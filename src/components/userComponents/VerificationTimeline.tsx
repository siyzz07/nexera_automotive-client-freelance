import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { UploadCloud, ShieldAlert, Search, FileCheck, UserCheck, CheckCircle, Globe, Sparkles } from 'lucide-react';
import timelineBg from '../../assets/suggesion5.jpeg';

const verificationSteps = [
  {
    id: "01",
    title: "Vehicle Submission",
    description: "Detailed digital application and high-resolution photo documentation submitted via our encrypted portal.",
    icon: <UploadCloud className="w-6 h-6" />,
    color: "from-[#004d26] to-[#00a34c]"
  },
  {
    id: "02",
    title: "Initial Screening",
    description: "Automated database cross-referencing for major red flags, theft records, and salvage titles.",
    icon: <ShieldAlert className="w-6 h-6" />,
    color: "from-[#004d26] to-[#00a34c]"
  },
  {
    id: "03",
    title: "Physical Inspection",
    description: "Multi-point on-site forensic audit covering structural integrity, mechanical health, and aesthetics.",
    icon: <Search className="w-6 h-6" />,
    color: "from-[#004d26] to-[#00a34c]"
  },
  {
    id: "04",
    title: "Document Verification",
    description: "Strict authenticity check of registration, service records, and original purchase documents.",
    icon: <FileCheck className="w-6 h-6" />,
    color: "from-[#004d26] to-[#00a34c]"
  },
  {
    id: "05",
    title: "Ownership Check",
    description: "Comprehensive background screening on the current owner and legal title status.",
    icon: <UserCheck className="w-6 h-6" />,
    color: "from-[#004d26] to-[#00a34c]"
  },
  {
    id: "06",
    title: "Quality Approval",
    description: "Final board-review of all inspection data and documents to certify the vehicle as 'Nexera-Grade'.",
    icon: <CheckCircle className="w-6 h-6" />,
    color: "from-[#004d26] to-[#00a34c]"
  },
  {
    id: "07",
    title: "Verified Listing",
    description: "Official publication to our global marketplace with the prestigious Nexera Verification Seal.",
    icon: <Globe className="w-6 h-6" />,
    color: "from-[#004d26] to-[#00a34c]"
  }
];

const VerificationTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(useTransform(scrollYProgress, [0.2, 0.8], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 bg-black overflow-hidden border-t border-white/5">
      {/* Cinematic Background with Parallax */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.img 
          style={{ y: bgY }}
          src={timelineBg} 
          alt="" 
          className="w-full h-[120%] object-cover opacity-80 filter grayscale brightness-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10" />
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_40%,_black_100%)] z-20" /> */}
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[160px] opacity-30 z-0 pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand/30 bg-brand/10 mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span className="text-[10px] font-black text-brand uppercase tracking-[0.3em]">Execution Protocol</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-sans font-bold text-white tracking-tighter uppercase mb-6"
          >
            Our Verification <span className="text-brand-gradient">Pipeline</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/40 text-sm md:text-lg max-w-2xl mx-auto font-medium"
          >
            From submission to publication, every vehicle navigates our strict quality gateways.
          </motion.p>
        </div>

        {/* Timeline Path Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Connecting Path */}
          <div className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-[1px] md:-translate-x-1/2 bg-white/10">
            <motion.div 
              style={{ scaleY: pathLength, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-brand to-transparent shadow-[0_0_15px_rgba(0,186,65,0.5)]"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {verificationSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Visual Anchor Point */}
                <div className="absolute left-[29px] md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                    <div className="w-14 h-14 rounded-2xl bg-[#050505] border border-white/10 flex items-center justify-center group-hover:border-brand/50 transition-colors shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="text-brand relative z-10">{step.icon}</div>
                    </div>
                    {/* Ring Pulse */}
                    <div className="absolute -inset-1 rounded-2xl bg-brand/20 blur-[10px] animate-pulse-slow" />
                </div>

                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-24 lg:pr-32 text-left md:text-right' : 'md:pl-24 lg:pl-32 text-left'} ml-16 md:ml-0`}>
                  <div className="inline-block mb-3">
                    <span className="text-brand text-[10px] font-black tracking-[0.5em] uppercase px-3 py-1 bg-brand/10 border border-brand/20 rounded-md">Step {step.id}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-brand transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium max-w-[400px] ml-auto">
                    {step.description}
                  </p>
                </div>

                {/* Vertical Decorative Element (Hidden on mobile) */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationTimeline;
