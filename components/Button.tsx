import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C026D3] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 overflow-hidden";
  
  const variants = {
    primary: "bg-[#18181B] text-white hover:bg-[#C026D3] shadow-sm hover:shadow-[0_8px_20px_-4px_rgba(192,38,211,0.35)] hover:-translate-y-0.5 border border-transparent",
    secondary: "bg-[#C026D3] text-white hover:bg-[#A21CAF] shadow-sm hover:shadow-[0_8px_20px_-4px_rgba(192,38,211,0.35)] hover:-translate-y-0.5 border border-transparent",
    outline: "border border-[#E8E2D5] bg-white text-[#18181B] hover:border-[#C026D3] hover:text-[#C026D3] hover:bg-[#FAF7F2]",
    ghost: "bg-transparent text-[#18181B] hover:text-[#C026D3] hover:bg-white"
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg tracking-wide",
  };

  const shineEffect = (variant === 'primary' || variant === 'secondary') 
    ? "after:content-[''] after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:transition-all after:duration-500 hover:after:left-[100%]" 
    : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${shineEffect} ${className}`} 
      {...props}
    >
      <span className="relative z-10 flex items-center">{children}</span>
    </button>
  );
};