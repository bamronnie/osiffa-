import React, { useEffect, useRef } from 'react';

interface ConnectiveWebProps {
  theme?: 'light' | 'dark';
  className?: string;
  particleCountMultiplier?: number;
}

export const ConnectiveWeb: React.FC<ConnectiveWebProps> = ({ 
  theme = 'light',
  className = '',
  particleCountMultiplier = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Configuration: original interactive physics from the start with enhanced visibility
    const isDark = theme === 'dark';
    const particleDensity = 0.0001; // Original density from start
    const mouseRadius = 150;        // Radius of mouse interaction & repulsion
    const connectionDistance = 140; // Max distance to draw line
    
    // Brand Colors: Osiffa Magenta (#C026D3) & Brand Fuchsia
    const lineBaseColor = isDark ? '217, 70, 239' : '192, 38, 211';
    const mouseBaseColor = isDark ? '232, 121, 249' : '192, 38, 211';

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;
      density: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Smooth natural velocity from the start
        this.directionX = (Math.random() - 0.5) * 1.3;
        this.directionY = (Math.random() - 0.5) * 1.3;
        this.size = Math.random() * 2 + 1.2;

        const colors = isDark ? [
          'rgba(232, 121, 249, 0.90)', // Brand magenta
          'rgba(192, 132, 252, 0.85)', // Purple
          'rgba(56, 189, 248, 0.80)',  // Cyan optic
          'rgba(255, 255, 255, 0.90)'  // White
        ] : [
          'rgba(192, 38, 211, 0.85)',  // Osiffa Magenta
          'rgba(217, 70, 239, 0.90)',  // Vibrant Magenta Glow
          'rgba(24, 24, 27, 0.60)',    // Deep Charcoal / Logo Dark
          'rgba(147, 51, 234, 0.75)'   // Violet Tone
        ];

        this.color = colors[Math.floor(Math.random() * colors.length)];
        // Density determines how strongly the mouse pushes the particle (parallax/repulsion)
        this.density = (Math.random() * 20) + 5;
      }

      update() {
        // 1. Basic Movement
        this.x += this.directionX;
        this.y += this.directionY;

        // 2. Mouse Repulsion Physics (Original dynamic feel from the start)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseRadius - distance) / mouseRadius;
          const moveX = forceDirectionX * force * this.density;
          const moveY = forceDirectionY * force * this.density;

          this.x -= moveX;
          this.y -= moveY;
        }

        // 3. Screen Wrap (Infinite Field)
        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;

        if (this.y > height) this.y = 0;
        else if (this.y < 0) this.y = height;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const mouse = { x: -2000, y: -2000 };

    const setupCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      particles.length = 0;
      const count = Math.max(
        18,
        Math.min(90, Math.floor(width * height * particleDensity * particleCountMultiplier))
      );
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    setupCanvas();
    init();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw connections between particles (crisp and visibly distinct)
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - (distance / connectionDistance);
            // More visible than original faint 0.18, perfectly balanced at 0.32
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${(opacity * 0.32).toFixed(3)})`; 
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Draw connections to mouse (Visual Feedback)
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          ctx.beginPath();
          const opacity = 1 - (distance / mouseRadius);
          // Crisp, responsive mouse tether line
          ctx.strokeStyle = `rgba(${mouseBaseColor}, ${(opacity * 0.60).toFixed(3)})`; 
          ctx.lineWidth = 1.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setupCanvas();
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        mouse.x = clientX - rect.left;
        mouse.y = clientY - rect.top;
      } else {
        mouse.x = -2000;
        mouse.y = -2000;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, particleCountMultiplier]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full block z-0 select-none pointer-events-none opacity-85 transition-opacity duration-700 ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};