import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { PageRoute } from '../types';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === PageRoute.HOME;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: PageRoute.HOME },
    { name: 'Services', path: PageRoute.SERVICES },
    { name: 'About', path: PageRoute.ABOUT },
    { name: 'Contact', path: PageRoute.CONTACT },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Header styling: adaptive for dark Home page and light secondary pages
  const headerBgClass = isHome
    ? (isScrolled 
        ? 'bg-[#0f172a]/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20' 
        : 'bg-[#0f172a]/70 backdrop-blur-md border-b border-white/10')
    : (isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs' 
        : 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs');

  const textColorClass = isHome ? 'text-slate-200' : 'text-slate-700';
  const hoverColorClass = isHome ? 'hover:text-brand-300' : 'hover:text-brand-600';
  const activeTextClass = isHome ? 'text-brand-400 font-bold drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]' : 'text-brand-600 font-bold';
  const logoVariant = isHome ? 'light' : 'dark';

  // Button styles
  const buttonClass = 'bg-gradient-to-r from-brand-600 via-purple-600 to-brand-500 text-white hover:from-brand-500 hover:to-purple-500 active:scale-98 shadow-md shadow-brand-500/25';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out h-20 ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo container ensures no clipping */}
          <Link to="/" className="flex items-center z-50 py-2 overflow-visible min-w-max">
            <Logo className="h-12 md:h-16 w-auto" variant={logoVariant} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-300 ${hoverColorClass} ${
                  isActive(link.path) ? activeTextClass : textColorClass
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link to="/contact">
              <button className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${buttonClass}`}>
                Get Updates
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 focus:outline-none transition-colors ${isHome ? 'text-white hover:text-brand-300' : 'text-slate-700 hover:text-brand-600'}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        className={`fixed inset-x-0 top-20 border-b shadow-xl md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isHome 
            ? 'bg-[#0f172a] border-white/10 text-white' 
            : 'bg-white border-gray-100 text-gray-800'
        } ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                isActive(link.path)
                  ? isHome
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                    : 'bg-brand-50 text-brand-700'
                  : isHome
                    ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};