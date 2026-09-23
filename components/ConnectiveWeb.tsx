import React, { useEffect, useRef } from 'react';

interface ConnectiveWebProps {
  theme?: 'light' | 'dark';
  className?: string;
  particleCountMultiplier?: number;
}

export const ConnectiveWeb: React.FC<ConnectiveWebProps> = ({ 
  theme = 'light',
  className = '',
  particleCountMultiplier = 0.8
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

    // Aesthetic configuration: whisper-soft, elegant, and unobtrusive
    const isDark = theme === 'dark';
    const connectionDistance = 125;
    const mouseRadius = 140;

    // Palette: soft muted magenta & warm mineral tones
    const magentaRgb = '192, 38, 211';
    const softGlowRgb = '217, 70, 239';
    const neutralRgb = isDark ? '212, 212, 216' : '113, 113, 122';

    interface SubtleParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseSize: number;
      color: string;
      isHub: boolean;
      pulsePhase: number;
      pulseSpeed: number;
    }

    const particles: SubtleParticle[] = [];
    const mouse = { x: -2000, y: -2000, isOver: false };

    // Setup high-DPI canvas
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

    const initParticles = () => {
      particles.length = 0;

      // Spaced, breathable density for a clean architectural look
      const area = width * height;
      const baseDensity = width < 768 ? 0.000035 : 0.000045;
      const count = Math.max(18, Math.min(65, Math.floor(area * baseDensity * particleCountMultiplier)));

      for (let i = 0; i < count; i++) {
        const isHub = i % 8 === 0;
        const baseSize = isHub ? Math.random() * 0.8 + 2.0 : Math.random() * 0.6 + 1.2;

        const nodeColors = [
          `rgba(${magentaRgb}, 0.38)`,
          `rgba(${softGlowRgb}, 0.42)`,
          `rgba(${neutralRgb}, ${isDark ? '0.35' : '0.22'})`,
          `rgba(${magentaRgb}, 0.28)`
        ];

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Slow, calm, serene drift
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          size: baseSize,
          baseSize,
          color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
          isHub,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02
        });
      }
    };

    setupCanvas();
    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const pCount = particles.length;

      // Draw delicate hairline connections
      for (let i = 0; i < pCount; i++) {
        const p1 = particles[i];

        // Smooth position updates
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.pulsePhase += p1.pulseSpeed;

        // Gentle boundary wrap
        if (p1.x < -10) p1.x = width + 10;
        else if (p1.x > width + 10) p1.x = -10;

        if (p1.y < -10) p1.y = height + 10;
        else if (p1.y > height + 10) p1.y = -10;

        // Connect with neighboring particles with hair-thin, whisper-light lines
        for (let j = i + 1; j < pCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = 1 - dist / connectionDistance;
            // Whisper opacity: 0.05 to 0.16 max
            const lineOpacity = alpha * (p1.isHub || p2.isHub ? 0.16 : 0.10);

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${magentaRgb}, ${lineOpacity.toFixed(3)})`;
            ctx.lineWidth = 0.65;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Soft, non-intrusive mouse tethering
        if (mouse.isOver) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseRadius) {
            const alpha = (1 - mdist / mouseRadius) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${magentaRgb}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw subtle micro-nodes
      for (let i = 0; i < pCount; i++) {
        const p = particles[i];

        if (p.isHub) {
          const pulse = Math.sin(p.pulsePhase);
          const haloRadius = p.baseSize + 2 + pulse * 1.2;
          const haloAlpha = 0.08 + pulse * 0.05;

          // Soft ambient halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${softGlowRgb}, ${haloAlpha.toFixed(2)})`;
          ctx.fill();

          // Hub core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.baseSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${magentaRgb}, 0.55)`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setupCanvas();
      initParticles();
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
        mouse.isOver = true;
      } else {
        mouse.isOver = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.isOver = false;
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
      className={`absolute inset-0 w-full h-full block select-none pointer-events-none opacity-45 transition-opacity duration-1000 ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};