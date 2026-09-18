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
    const particleDensity = 0.0001; // Adjusted density
    const mouseRadius = 150; // Radius of mouse interaction
    const connectionDistance = 140; // Max distance to draw line
    
    const isDark = theme === 'dark';
    const lineBaseColor = isDark ? '192, 132, 252' : '168, 85, 247';
    const mouseBaseColor = isDark ? '232, 121, 249' : '192, 38, 211';
    
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
        // Random base velocity
        this.directionX = (Math.random() - 0.5) * 1.5;
        this.directionY = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 2 + 1;
        
        if (isDark) {
          const colors = [
            'rgba(232, 121, 249, 0.75)', // Brand magenta
            'rgba(192, 132, 252, 0.7)',  // Purple
            'rgba(56, 189, 248, 0.65)',  // Cyan optic
            'rgba(255, 255, 255, 0.75)'  // White
          ];
          this.color = colors[Math.floor(Math.random() * colors.length)];
        } else {
          this.color = 'rgba(168, 85, 247, 0.45)';
        }
        
        // Density determines how strongly the mouse pushes the particle (parallax effect)
        this.density = (Math.random() * 20) + 5; 
      }

      update() {
        // 1. Basic Movement
        this.x += this.directionX;
        this.y += this.directionY;

        // 2. Mouse Repulsion Physics
        // Calculate distance between particle and mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
            // Force vector
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            
            // Force magnitude (stronger when closer)
            const force = (mouseRadius - distance) / mouseRadius;
            
            // Movement vector (Repulsion: move away from mouse)
            // Multiply by density to give depth/weight feel
            const moveX = forceDirectionX * force * this.density;
            const moveY = forceDirectionY * force * this.density;

            // Apply movement (subtracting moves away from mouse coords)
            this.x -= moveX;
            this.y -= moveY;
        }

        // 3. Screen Wrap (Infinite Field)
        // Instead of bouncing, wrap around edges for a smoother feel
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

        // Draw connections between particles
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                // Fade out based on distance
                const opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = `rgba(${lineBaseColor}, ${opacity * 0.25})`; 
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
            // Use brand color for mouse connections
            ctx.strokeStyle = `rgba(${mouseBaseColor}, ${opacity * 0.6})`; 
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
    
    // Reset mouse pos when leaving window to stop stuck interaction
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
      className="absolute inset-0 w-full h-full block z-0"
      style={{ touchAction: 'none' }}
    />
  );
};