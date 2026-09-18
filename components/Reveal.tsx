import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number; // Delay in ms
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = '100%', 
  delay = 0,
  className = "" 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can disconnect to avoid re-triggering (optional)
          observer.disconnect(); 
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Offset slightly so it triggers before bottom
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  // Calculate delay style
  const transitionDelay = `${delay}ms`;

  return (
    <div 
      ref={ref} 
      style={{ width, transitionDelay }} 
      className={`transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 translate-x-0 blur-none' 
          : 'opacity-0 translate-y-12 blur-sm'
      } ${className}`}
    >
      {children}
    </div>
  );
};