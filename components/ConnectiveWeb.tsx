import React, { useEffect, useRef } from 'react';

interface ConnectiveWebProps {
  theme?: 'light' | 'dark';
}

export const ConnectiveWeb: React.FC<ConnectiveWebProps> = ({ theme = 'light' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Configuration
    const particleDensity = 0.00008; // Delicate and elegant for milk/white background
    const mouseRadius = 140;
    const connectionDistance = 130;
    
    // Logo color channels: Deep Black (24, 24, 27) and Osiffa Magenta (192, 38, 211)
    const lineBaseColor = '192, 38, 211';
    const mouseBaseColor = '192, 38, 211';
    
    const particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

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
        this.directionX = (Math.random() - 0.5) * 1.2;
        this.directionY = (Math.random() - 0.5) * 1.2;
        this.size = Math.random() * 2 + 1;
        
        const colors = [
          'rgba(192, 38, 211, 0.55)', // Osiffa Magenta
          'rgba(24, 24, 27, 0.35)',   // Logo Deep Black
          'rgba(181, 38, 209, 0.65)', // Vibrant Magenta
          'rgba(63, 63, 70, 0.3)',    // Charcoal
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.density = (Math.random() * 18) + 4; 
      }

      update() {
        this.x += this.directionX;
        this.y += this.directionY;

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

    const init = () => {
      particles.length = 0;
      const count = Math.floor(width * height * particleDensity);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${opacity * 0.18})`; 
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          ctx.beginPath();
          const opacity = 1 - (distance / mouseRadius);
          ctx.strokeStyle = `rgba(${mouseBaseColor}, ${opacity * 0.45})`; 
          ctx.lineWidth = 1.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full block z-0 opacity-40"
      style={{ touchAction: 'none' }}
    />
  );
};