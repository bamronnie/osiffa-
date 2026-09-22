import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: PageRoute.HOME },
    { name: 'Services', path: PageRoute.SERVICES },
    { name: 'About', path: PageRoute.ABOUT },
    { name: 'Blog', path: PageRoute.BLOG },
    { name: 'Contact', path: PageRoute.CONTACT },
  ];

  const isActive = (path: string) => {
    if (path === PageRoute.HOME) {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const headerBgClass = isScrolled
    ? 'bg-[#FAF7F2]/95 backdrop-blur-2xl border-b border-[#E8E2D5] shadow-sm shadow-black/5 py-2.5'
    : 'bg-[#FAF7F2]/80 backdrop-blur-xl border-b border-[#E8E2D5]/70 py-3.5';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center z-50 py-1 overflow-visible min-w-max group">
            <Logo className="h-9 sm:h-11 w-auto transition-transform duration-200 group-hover:scale-[1.02]" variant="dark" layout="horizontal" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-white/90 border border-[#E8E2D5] rounded-full px-2 py-1 shadow-sm">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-white bg-[#18181B] shadow-sm font-semibold'
                      : 'text-[#18181B]/80 hover:text-[#C026D3] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Status Pill & Contact CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E8E2D5] bg-white text-xs text-[#18181B] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#C026D3]"></span>
              <span className="text-[11px] font-semibold tracking-tight">Africa</span>
            </div>

            <Link to="/contact">
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#18181B] hover:bg-[#C026D3] text-white shadow-sm hover:shadow-[0_4px_16px_rgba(192,38,211,0.25)] transition-all duration-300">
                <span>Request a Quote</span>
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden p-2 rounded-lg bg-white border border-[#E8E2D5] text-[#18181B] hover:text-[#C026D3] focus:outline-none transition-colors shadow-sm"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`md:hidden fixed inset-x-0 top-[62px] bg-[#FAF7F2]/98 backdrop-blur-2xl border-b border-[#E8E2D5] shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-[420px] opacity-100 py-5' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="px-6 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-white text-[#C026D3] border border-[#E8E2D5] font-semibold shadow-sm'
                    : 'text-[#18181B] hover:bg-white'
                }`}
              >
                <span>{link.name}</span>
                {active && <span className="h-1.5 w-1.5 rounded-full bg-[#C026D3]"></span>}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-[#E8E2D5] flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-[#18181B] px-2">
              <span className="flex items-center gap-2 font-medium">
                <span className="h-2 w-2 rounded-full bg-[#C026D3]"></span>
                Osiffa Telecoms (Nig.) Ltd
              </span>
              <span className="text-[#C026D3] font-semibold">Africa</span>
            </div>

            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full py-2.5 rounded-lg text-xs font-semibold bg-[#18181B] hover:bg-[#C026D3] text-white shadow-sm transition-colors">
                Request a Quote
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};