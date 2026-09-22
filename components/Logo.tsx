import React, { useState } from 'react';
// @ts-ignore
import logoVerticalLight from './osiffa-logo-light.png';
// @ts-ignore
import logoVerticalDark from './osiffa-logo-dark.png';
// @ts-ignore
import logoHorizontalLight from './osiffa-logo-horizontal-light.png';
// @ts-ignore
import logoHorizontalDark from './osiffa-logo-horizontal-dark.png';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light'; // 'dark' = for light/milk backgrounds, 'light' = for dark backgrounds
  layout?: 'horizontal' | 'vertical'; // horizontal = navbar lockup, vertical = stacked
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "h-10", 
  variant = 'dark',
  layout = 'horizontal' 
}) => {
  const [loadStatus, setLoadStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const handleImageError = () => {
    setLoadStatus('error');
  };

  const handleImageLoad = () => {
    setLoadStatus('success');
  };

  const logoSrc = layout === 'horizontal'
    ? (variant === 'light' ? logoHorizontalDark : logoHorizontalLight)
    : (variant === 'light' ? logoVerticalDark : logoVerticalLight);

  return (
    <div className="relative flex items-center overflow-visible min-w-max select-none">
      <img 
        src={logoSrc} 
        alt="Osiffa Telecoms" 
        className={`${className} w-auto object-contain transition-opacity duration-200`}
        style={{ maxWidth: 'none', display: loadStatus === 'error' ? 'none' : 'block' }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {loadStatus === 'error' && (
        <div className={`${className} flex items-center gap-2.5`}>
          <div className="w-8 h-8 rounded-full bg-[#18181B] flex items-center justify-center text-[#C026D3] font-black text-sm">
            O
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-wider text-[#C026D3]">OSIFFA</span>
            <span className={`text-[10px] tracking-[0.25em] font-semibold uppercase ${variant === 'light' ? 'text-white' : 'text-[#18181B]'}`}>
              Telecoms
            </span>
          </div>
        </div>
      )}
    </div>
  );
};