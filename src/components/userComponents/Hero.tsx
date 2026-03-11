import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import carImage from '../../assets/coprateca2.jfif';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const title3Ref = useRef<HTMLSpanElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Premium GSAP Entrance Timeline (similar to Luxe MotiveHaus)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial state setup to prevent flash
    const elementsToAnimate = [title1Ref.current, title2Ref.current, title3Ref.current, pRef.current, buttonsRef.current].filter(Boolean);
    
    gsap.set(elementsToAnimate, { 
      y: 80, 
      opacity: 0 
    });
    
    gsap.set(bgRef.current, { scale: 1.1, filter: 'blur(10px)' });

    // 1. Background slow reveal
    tl.to(bgRef.current, {
      scale: 1,
      filter: 'blur(0px)',
      duration: 2,
      ease: 'power2.out',
    })
    // 2. Staggered text reveal (Slide up & fade)
    tl.to(title1Ref.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, "-=1.5")
      .to(title2Ref.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, "-=0.7")
      .to(title3Ref.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, "-=0.7")
      .to(pRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, "-=0.7")
      .to(buttonsRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, "-=0.7");

    // GSAP ScrollTrigger for Parallax Depth
    // Moves the background down at half the speed of scroll (classic parallax)
    gsap.to(bgRef.current, {
      y: '50%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Fades and slides the content up slightly on scroll
    gsap.to(contentRef.current, {
      y: '-20%',
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with GSAP Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full z-0 origin-center"
      >
        {/* Gradient overlay with a subtle dark tint for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/30 to-[#0a0a0a]/90 z-10" />
        <img
          // src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop"
          src={carImage}
          alt="Premium Automotive"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* GSAP Animated Content */}
      <div
        ref={contentRef}
        className="relative z-20 container mx-auto px-6 text-center lg:text-left flex flex-col items-center justify-center h-full pt-20"
      >

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight leading-tight mb-6 flex flex-col items-center lg:items-start z-10 relative">
          <div className="overflow-hidden w-full text-center lg:text-left">
            <span ref={title1Ref} className="block text-[#f2f2f2] font-semibold text-3xl md:text-5xl lg:text-6xl pb-2">
              India's Trusted
            </span>
          </div>
          <div className="overflow-hidden relative w-full text-center lg:text-left py-2">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-teal-500/10 blur-[40px] -z-10 rounded-full"></div>
            <span ref={title2Ref} className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 pb-2 drop-shadow-[0_0_25px_rgba(45,212,191,0.4)]">
              Automotive
            </span>
          </div>
          <div className="overflow-hidden w-full text-center lg:text-left">
            <span ref={title3Ref} className="block text-white/80 font-light text-3xl md:text-5xl lg:text-6xl pb-1">
              Commerce Platform
            </span>
          </div>
        </h1>

        <p
          ref={pRef}
          className="text-[#999999] text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 font-light"
        >
          Premium marketing agency that converts brand motive into measurable growth. Specializing in high-end automotive aesthetics.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-brand text-[#f2f2f2] font-semibold rounded-full hover:bg-brand-hover hover:shadow-[0_0_30px_rgba(0,128,109,0.5)] transition-all duration-500">
            Explore Verified Vehicles 
          </button>
          <button className="w-full sm:w-auto px-8 py-4 glass border border-white/10 text-[#f2f2f2] font-semibold rounded-full hover:bg-white/5 hover:border-brand/50 transition-all duration-500 flex items-center justify-center gap-2">
            For Dealerships
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
