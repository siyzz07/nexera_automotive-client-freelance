import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, ArrowUpRight, ShieldCheck } from 'lucide-react';
import contactBg from '../../assets/b2b_luminous_bg.png';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isFormComplete = formData.firstName && formData.lastName && isEmailValid && formData.message.length > 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormComplete || loading) return;

    setLoading(true);
    
    // Simulate high-performance transmission
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Using Direct Backend Dispatch Protocol
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/contact`, formData);
      
      if (response.data.success) {
        // Mission Complete: Clear boxes and show success
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Transmission Failed:', error);
      alert('Mission failed: Unable to transmit message. Please try the secure line.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom bottom',
      }
    });

    // Animate background glow
    tl.fromTo(bgGlowRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
    );

    // Stagger in the info text
    const infoElements = infoRef.current?.children;
    if (infoElements) {
      tl.fromTo(infoElements,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        "-=1.2"
      );
    }

    // Slide in the form
    const formElements = formRef.current?.children;
    if (formElements) {
      tl.fromTo(formElements,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        "-=1.0"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.trigger === sectionRef.current && t.kill());
    };
  }, []);

  return (
    <section id="contact" className="relative py-24 md:py-40 bg-[#000000] overflow-hidden border-t border-white/5">
      {/* Cinematic Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 origin-center scale-110"
      >
        <img 
          src={contactBg} 
          alt="" 
          className="w-full h-full object-cover opacity-30 brightness-[0.7] saturate-[1.1] mix-blend-overlay"
        />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-[#000000]" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-brand/10 via-transparent to-[#000000]" /> */}
      </motion.div>

      {/* Massive Background ambient glow to refract through the glass */}
      <div ref={bgGlowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-brand/5 rounded-full blur-[180px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Information */}
          <div ref={infoRef} className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold text-[#f2f2f2] tracking-tight leading-tight mb-6 drop-shadow-lg">
              Initiate <br/>
              <span className="text-brand-gradient">Contact.</span>
            </h2>
            <p className="text-[#999999] text-lg max-w-md mb-12 font-light">
             Built on trust. Designed for results.
Connect with our specialists to unlock verified deals and reliable automotive partnerships
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center text-brand group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  <MapPin className="w-6 h-6 relative z-10" />
                </div>
                <div className="pt-1">
                  <h4 className="text-[#f2f2f2] font-semibold mb-1 tracking-wide">Global Headquarters</h4>
                  <p className="text-[#999999] font-light">One Precision Way<br/>Silicon Valley, CA 94025</p>
                </div>
              </div>
              
              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center text-brand group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  <Mail className="w-6 h-6 relative z-10" />
                </div>
                <div className="pt-1">
                  <h4 className="text-[#f2f2f2] font-semibold mb-1 tracking-wide">Direct Inquiries</h4>
                  <p className="text-[#999999] font-light hover:text-brand transition-colors cursor-pointer">concierge@luxe-vision.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center text-brand group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  <Phone className="w-6 h-6 relative z-10" />
                </div>
                <div className="pt-1">
                  <h4 className="text-[#f2f2f2] font-semibold mb-1 tracking-wide">Secure Line</h4>
                  <p className="text-[#999999] font-light">+1 (800) 555-LUXE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Extreme Glassmorphic Contact Form */}
          <div ref={formRef} className="relative flex flex-col justify-center">
            
            {/* The Glass Panel */}
            <div className="relative w-full rounded-3xl overflow-hidden bg-white/[0.03] backdrop-blur-[30px] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] p-10 lg:p-12 transition-all duration-500 hover:bg-white/[0.04] hover:shadow-[0_8px_40px_0_rgba(0,128,109,0.15),inset_0_1px_1px_rgba(255,255,255,0.3)]">
              
              {/* Internal Glass Highlights */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-white/20 to-transparent" />
              <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-brand/10 blur-[80px] pointer-events-none rounded-full" />
              <div className="absolute top-0 left-0 w-[150px] h-[150px] bg-white/5 blur-[50px] pointer-events-none rounded-full" />

              <div className="relative z-10">
                <h3 className="text-3xl font-bold font-sans text-[#f2f2f2] mb-8 drop-shadow-md">
                  {submitted ? 'Transmission Successful' : 'Secure Transmission'}
                </h3>
                
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,255,102,0.1)]">
                      <ShieldCheck className="w-10 h-10 text-brand" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter">Request Logged</h4>
                    <p className="text-white/50 mb-10 leading-relaxed max-w-xs mx-auto">
                      Your technical inquiry has been encrypted and dispatched to our specialists. We will initiate contact shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3 bg-white/5 border border-white/10 text-brand rounded-xl hover:bg-white/10 transition-all font-bold uppercase tracking-widest text-xs"
                    >
                      New Transmission
                    </button>
                  </motion.div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-xs font-semibold text-brand/80 uppercase tracking-widest mb-2 ml-1">First Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className={`w-full bg-black/20 backdrop-blur-md border ${formData.firstName ? 'border-brand/40' : 'border-white/10'} rounded-xl px-5 py-4 text-[#f2f2f2] placeholder-white/20 focus:outline-none focus:border-brand/60 focus:bg-black/40 transition-all shadow-inner`}
                          placeholder="John"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-xs font-semibold text-brand/80 uppercase tracking-widest mb-2 ml-1">Last Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className={`w-full bg-black/20 backdrop-blur-md border ${formData.lastName ? 'border-brand/40' : 'border-white/10'} rounded-xl px-5 py-4 text-[#f2f2f2] placeholder-white/20 focus:outline-none focus:border-brand/60 focus:bg-black/40 transition-all shadow-inner`}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="group relative">
                      <label className="block text-xs font-semibold text-brand/80 uppercase tracking-widest mb-2 ml-1">Corporate Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full bg-black/20 backdrop-blur-md border ${isEmailValid ? 'border-brand/40' : 'border-white/10'} rounded-xl px-5 py-4 text-[#f2f2f2] placeholder-white/20 focus:outline-none focus:border-brand/60 focus:bg-black/40 transition-all shadow-inner`}
                        placeholder="executive@company.com"
                      />
                      {isEmailValid && (
                        <div className="absolute right-4 bottom-4 text-brand animate-pulse">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-xs font-semibold text-brand/80 uppercase tracking-widest mb-2 ml-1">Message</label>
                      <textarea 
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className={`w-full bg-black/20 backdrop-blur-md border ${formData.message ? 'border-brand/40' : 'border-white/10'} rounded-xl px-5 py-4 text-[#f2f2f2] placeholder-white/20 focus:outline-none focus:border-brand/60 focus:bg-black/40 transition-all resize-none shadow-inner`}
                        placeholder="Specify your requirements..."
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={!isFormComplete || loading}
                      className={`w-full py-5 text-black font-bold tracking-wide rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group mt-6 border relative overflow-hidden ${
                        isFormComplete && !loading
                        ? 'bg-gradient-to-r from-brand to-brand-hover shadow-[0_0_40px_rgba(0,255,102,0.3)] border-brand-hover/50 hover:border-white/50' 
                        : 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-4 text-lg">
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Transmitting...
                          </>
                        ) : (
                          <>
                            Transmit Request
                            <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </span>
                      {isFormComplete && (
                        <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out skew-x-12" />
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
