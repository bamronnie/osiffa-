import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Home as HomeIcon, 
  Wrench, 
  Building2, 
  BookOpen, 
  PhoneCall, 
  Phone,
  Mail, 
  ShieldCheck, 
  Radio 
} from 'lucide-react';
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

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: PageRoute.HOME, icon: HomeIcon },
    { name: 'Services', path: PageRoute.SERVICES, icon: Wrench },
    { name: 'About', path: PageRoute.ABOUT, icon: Building2 },
    { name: 'Blog', path: PageRoute.BLOG, icon: BookOpen },
    { name: 'Contact', path: PageRoute.CONTACT, icon: PhoneCall },
  ];

  const isActive = (path: string) => {
    if (path === PageRoute.HOME) {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const headerBgClass = isScrolled
    ? 'bg-[#FAF7F2]/95 backdrop-blur-2xl border-b border-[#E8E2D5] shadow-sm shadow-black/5 py-2.5'
    : 'bg-[#FAF7F2]/85 backdrop-blur-xl border-b border-[#E8E2D5]/70 py-3 sm:py-3.5';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${headerBgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center z-40 py-1 overflow-visible group">
              <Logo className="h-8 xs:h-9 sm:h-11 w-auto transition-transform duration-200 group-hover:scale-[1.02]" variant="dark" layout="horizontal" />
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

            {/* Phone & Contact CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <a 
                href="tel:08089646456" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D5] bg-white text-xs font-mono font-semibold text-[#18181B] hover:text-[#C026D3] hover:border-[#C026D3]/40 shadow-sm transition-all"
              >
                <Phone size={13} className="text-[#C026D3]" />
                <span>08089646456</span>
              </a>

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
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMenuOpen}
              className="md:hidden p-2.5 rounded-xl bg-white border border-[#E8E2D5] text-[#18181B] hover:text-[#C026D3] focus:outline-none focus:ring-2 focus:ring-[#C026D3] transition-all shadow-sm active:scale-95"
            >
              {isMenuOpen ? <X size={20} className="text-[#C026D3]" /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Off-Canvas Drawer */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`md:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#FAF7F2] z-50 shadow-2xl border-l border-[#E8E2D5] flex flex-col justify-between transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8E2D5] flex items-center justify-between bg-white/70 backdrop-blur-md">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
            <Logo className="h-8 w-auto" variant="dark" layout="horizontal" />
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation"
            className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] text-[#18181B]/70 hover:text-[#C026D3] hover:bg-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2 touch-scroll">
          <div className="mb-4 px-2 py-1.5 rounded-lg bg-white border border-[#E8E2D5] flex items-center justify-between text-xs text-[#18181B] shadow-sm">
            <span className="flex items-center gap-2 font-medium">
              <span className="h-2 w-2 rounded-full bg-[#C026D3] animate-pulse"></span>
              <span>Regional Core Network</span>
            </span>
            <span className="text-[#C026D3] font-bold font-mono text-[11px]">Africa</span>
          </div>

          <div className="space-y-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-[#18181B] text-white shadow-sm'
                      : 'text-[#18181B] hover:bg-white hover:text-[#C026D3]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={active ? 'text-[#C026D3]' : 'text-[#18181B]/60'} />
                    <span>{link.name}</span>
                  </div>
                  {active ? (
                    <span className="h-2 w-2 rounded-full bg-[#C026D3]"></span>
                  ) : (
                    <ArrowRight size={14} className="text-[#18181B]/30" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 border-t border-[#E8E2D5] bg-white/70 backdrop-blur-md space-y-3 pb-safe">
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block">
            <button className="w-full py-3.5 rounded-xl text-xs font-semibold bg-[#18181B] hover:bg-[#C026D3] text-white shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95">
              <span>Request a Quote / Site Assessment</span>
              <ArrowRight size={14} />
            </button>
          </Link>

          <div className="pt-2 flex items-center justify-between text-xs font-mono">
            <a href="tel:08089646456" className="text-[#18181B] hover:text-[#C026D3] transition-colors flex items-center gap-1.5 font-bold">
              <Phone size={13} className="text-[#C026D3]" />
              <span>08089646456</span>
            </a>
            <a href="mailto:info@osiffatelecom.com" className="text-[#18181B]/60 hover:text-[#C026D3] transition-colors truncate max-w-[150px]">
              info@osiffatelecom.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};