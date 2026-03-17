import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const TextReveal = ({ text, className = "", delay = 0 }: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.set(chars, { y: '100%', opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    tl.to(chars, {
      y: '0%',
      opacity: 1,
      duration: 1,
      stagger: 0.03,
      ease: 'expo.out',
      delay: delay
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [delay, text]);

  return (
    <div ref={containerRef} className={`overflow-hidden flex flex-wrap ${className}`}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="char inline-block whitespace-pre"
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default TextReveal;
