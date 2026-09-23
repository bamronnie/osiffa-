import React, { useEffect, useRef } from 'react';

interface ConnectiveWebProps {
  theme?: 'light' | 'dark';
  className?: string;
  particleCountMultiplier?: number;
}

interface DataPacket {
  p1: number;
  p2: number;
  progress: number;
  speed: number;
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

    // Responsive configuration
    const isDark = theme === 'dark';
    const connectionDistance = 155;
    const mouseRadius = 175;

    // Color definitions
    const magentaRgb = '192, 38, 211';    // Osiffa Magenta #C026D3
    const brightMagenta = '232, 121, 249'; // Glow Magenta #E879F9
    const darkNodeRgb = isDark ? '244, 244, 245' : '24, 24, 27';

    interface NodeParticle {
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
      density: number;
    }

    const particles: NodeParticle[] = [];
    const packets: DataPacket[] = [];
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
      packets.length = 0;

      // Base count adjusted for display size and user multiplier
      const area = width * height;
      const baseDensity = width < 768 ? 0.00007 : 0.000095;
      const count = Math.max(28, Math.min(130, Math.floor(area * baseDensity * particleCountMultiplier)));

      for (let i = 0; i < count; i++) {
        const isHub = i % 7 === 0; // ~14% hub nodes
        const baseSize = isHub ? Math.random() * 2 + 3.5 : Math.random() * 1.5 + 2;

        const nodeColors = [
          `rgba(${magentaRgb}, 0.85)`,
          `rgba(${brightMagenta}, 0.9)`,
          `rgba(${darkNodeRgb}, ${isDark ? '0.75' : '0.55'})`,
          `rgba(${magentaRgb}, 0.7)`
        ];

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isHub ? 0.6 : 0.9),
          vy: (Math.random() - 0.5) * (isHub ? 0.6 : 0.9),
          size: baseSize,
          baseSize,
          color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
          isHub,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.025 + Math.random() * 0.03,
          density: Math.random() * 14 + 6
        });
      }
    };

    setupCanvas();
    initParticles();

    // Track active links to dispatch traveling data packets
    const activeLinks: [number, number][] = [];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      activeLinks.length = 0;

      const pCount = particles.length;

      // 1. Update and draw connection lines
      for (let i = 0; i < pCount; i++) {
        const p1 = particles[i];

        // Move particle
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.pulsePhase += p1.pulseSpeed;

        // Boundary bounce / wrap
        if (p1.x < 0) { p1.x = 0; p1.vx *= -1; }
        else if (p1.x > width) { p1.x = width; p1.vx *= -1; }

        if (p1.y < 0) { p1.y = 0; p1.vy *= -1; }
        else if (p1.y > height) { p1.y = height; p1.vy *= -1; }

        // Mouse interaction
        if (mouse.isOver) {
          const mdx = mouse.x - p1.x;
          const mdy = mouse.y - p1.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseRadius) {
            const force = (mouseRadius - mdist) / mouseRadius;
            const fx = (mdx / mdist) * force * p1.density * 0.5;
            const fy = (mdy / mdist) * force * p1.density * 0.5;
            p1.x += fx;
            p1.y += fy;
          }
        }

        // Connect with other particles
        for (let j = i + 1; j < pCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance);
            const lineOpacity = alpha * (p1.isHub || p2.isHub ? 0.48 : 0.32);

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${magentaRgb}, ${lineOpacity.toFixed(3)})`;
            ctx.lineWidth = p1.isHub || p2.isHub ? 1.4 : 1.0;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Record link for potential data packet
            if (activeLinks.length < 90) {
              activeLinks.push([i, j]);
            }
          }
        }

        // Connect to mouse if nearby
        if (mouse.isOver) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseRadius) {
            const alpha = 1 - mdist / mouseRadius;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${brightMagenta}, ${(alpha * 0.65).toFixed(3)})`;
            ctx.lineWidth = 1.6;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 2. Manage and draw traveling data packets (live telecommunications pulses)
      if (activeLinks.length > 0 && packets.length < 16 && Math.random() < 0.12) {
        const link = activeLinks[Math.floor(Math.random() * activeLinks.length)];
        packets.push({
          p1: link[0],
          p2: link[1],
          progress: 0,
          speed: 0.012 + Math.random() * 0.018
        });
      }

      for (let k = packets.length - 1; k >= 0; k--) {
        const pkt = packets[k];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1 || !particles[pkt.p1] || !particles[pkt.p2]) {
          packets.splice(k, 1);
          continue;
        }

        const nodeA = particles[pkt.p1];
        const nodeB = particles[pkt.p2];
        const px = nodeA.x + (nodeB.x - nodeA.x) * pkt.progress;
        const py = nodeA.y + (nodeB.y - nodeA.y) * pkt.progress;

        // Draw glowing packet photon
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${brightMagenta}, 0.95)`;
        ctx.fill();

        // Subtle glow halo around packet
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${magentaRgb}, 0.35)`;
        ctx.fill();
      }

      // 3. Draw particle nodes
      for (let i = 0; i < pCount; i++) {
        const p = particles[i];

        if (p.isHub) {
          // Hub pulsing halo ring
          const pulse = Math.sin(p.pulsePhase);
          const haloRadius = p.baseSize + 3 + pulse * 2.5;
          const haloAlpha = 0.25 + pulse * 0.15;

          ctx.beginPath();
          ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${brightMagenta}, ${haloAlpha.toFixed(2)})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.baseSize + 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${magentaRgb}, 0.95)`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      }

      // 4. Draw cursor indicator if over hero
      if (mouse.isOver) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${magentaRgb}, 0.9)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${brightMagenta}, 0.5)`;
        ctx.lineWidth = 1;
        ctx.stroke();
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

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        if (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        ) {
          mouse.x = touch.clientX - rect.left;
          mouse.y = touch.clientY - rect.top;
          mouse.isOver = true;
        }
      }
    };

    const handleTouchEnd = () => {
      mouse.isOver = false;
    };

    const handleMouseLeave = () => {
      mouse.isOver = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, particleCountMultiplier]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full block select-none pointer-events-none ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};