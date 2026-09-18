import React, { useState } from 'react';
// @ts-ignore
import logoImg from './osiffa-logo (1).png';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // light = for dark backgrounds, dark = for light backgrounds
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10", variant = 'dark' }) => {
  const [loadStatus, setLoadStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const handleImageError = () => {
    setLoadStatus('error');
  };

  const handleImageLoad = () => {
    setLoadStatus('success');
  };

  // The CSS filter ensures the logo is visible on both light and dark backgrounds
  // If light variant (on dark bg), we turn the logo white.
  const logoStyle: React.CSSProperties = {
    filter: variant === 'light' ? 'brightness(0) invert(1)' : 'none',
    maxWidth: 'none',
    display: loadStatus === 'success' ? 'block' : 'none'
  };

  /**
   * High-fidelity SVG Fallback
   * If the image file is physically missing from the server, 
   * this renders a professional geometric logo that matches the brand identity.
   */
  const BrandFallback = () => (
    <div className={`${className} flex items-center gap-3 min-w-max overflow-visible`}>
      <svg 
        viewBox="0 0 40 40" 
        className="h-full w-auto flex-shrink-0" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect 
          x="2" y="2" width="36" height="36" 
          stroke={variant === 'light' ? 'white' : '#c026d3'} 
          strokeWidth="3" 
          rx="4"
        />
        <path 
          d="M10 12 L30 12 L30 28 L20 18 L10 28 Z" 
          fill={variant === 'light' ? 'white' : '#c026d3'} 
          />
      </svg>
      <span 
        className={`font-black text-2xl tracking-tighter ${variant === 'light' ? 'text-white' : 'text-slate-900'}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        OSIFFA
      </span>
    </div>
  );

  return (
    <div className="relative flex items-center overflow-visible min-w-max">
      {loadStatus !== 'error' && (
        <img 
          src={logoImg} 
          alt="Osiffa Telecom" 
          className={`${className} w-auto object-contain transition-opacity duration-300`}
          style={logoStyle}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      
      {(loadStatus === 'error' || loadStatus === 'loading') && (
        <div className={loadStatus === 'loading' ? 'opacity-0 absolute' : 'opacity-100'}>
          <BrandFallback />
        </div>
      )}
    </div>
  );
};