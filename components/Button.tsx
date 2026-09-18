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
  const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 overflow-hidden";
  
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-500 shadow-lg hover:shadow-brand-500/40 hover:-translate-y-0.5 border border-transparent",
    secondary: "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-gray-900/30 hover:-translate-y-0.5 border border-transparent",
    outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-brand-300 hover:text-brand-700",
    ghost: "bg-transparent text-gray-600 hover:text-brand-600 hover:bg-brand-50/50"
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg tracking-wide",
  };

  // Add the shine effect specifically for primary and secondary buttons
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