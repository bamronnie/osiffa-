import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#18181B] text-[#FAF7F2] border-t border-[#27272A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand & Accreditation Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <Logo className="h-10 w-auto" variant="light" layout="horizontal" />
            </Link>
            
            <p className="text-sm text-[#FAF7F2]/70 leading-relaxed max-w-sm">
              Reliable business internet, structured cabling, enterprise Wi-Fi solutions, and managed IT networking services for growing businesses and offices in Africa.
            </p>

            {/* CAC Certification Badge */}
            <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg bg-[#27272A] border border-[#3F3F46] text-xs font-mono text-[#FAF7F2]">
              <ShieldCheck className="text-[#C026D3] flex-shrink-0" size={18} />
              <div>
                <span className="text-white font-semibold block">Osiffa Telecoms (Nig.) Ltd</span>
                <span className="text-[11px] text-[#FAF7F2]/60">CAC Registered • Incorporated July 2015</span>
              </div>
            </div>

            {/* Support Indicator */}
            <div className="flex items-center gap-2 text-xs text-[#FAF7F2]/70">
              <span className="h-2 w-2 rounded-full bg-[#C026D3]"></span>
              <span>Hands-on Technical Support · Experienced Local Technicians</span>
            </div>
          </div>

          {/* Solutions & Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-5">
              Solutions
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/services" className="text-[#FAF7F2]/70 hover:text-[#C026D3] transition-colors flex items-center gap-1.5">
                  <span>Business Internet & Broadband</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#FAF7F2]/70 hover:text-[#C026D3] transition-colors">
                  Structured Office Cabling
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#FAF7F2]/70 hover:text-[#C026D3] transition-colors">
                  Commercial Wi-Fi & Mesh
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#FAF7F2]/70 hover:text-[#C026D3] transition-colors">
                  IT Hardware & Workstations
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#FAF7F2]/70 hover:text-[#C026D3] transition-colors">
                  Custom Software & ERP
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#FAF7F2]/70 hover:text-[#C026D3] transition-colors">
                  Network Maintenance & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Knowledge */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-5">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-[#FAF7F2]/70 hover:text-[#C026D3] transition-colors">
                  About Osiffa
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-[#FAF7F2]/70 hover:text-[#C026D3] transition-colors">
                  Technical Insights & Articles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#FAF7F2]/70 hover:text-[#C026D3] transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#FAF7F2]/70 hover:text-[#C026D3] transition-colors">
                  Corporate Governance
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#FAF7F2]/70 hover:text-[#C026D3] transition-colors">
                  Request Site Survey
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Updates */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-5">
              Network Updates
            </h3>
            <p className="text-xs text-[#FAF7F2]/70 mb-4 leading-relaxed">
              Stay informed on regional fiber expansions, technology briefs, and enterprise solutions.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#27272A] border border-[#C026D3]/40 text-[#C026D3] text-xs flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter business email"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#27272A] border border-[#3F3F46] text-xs text-white placeholder-[#FAF7F2]/40 focus:outline-none focus:border-[#C026D3] transition-all font-sans"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-md bg-[#C026D3] hover:bg-[#A21CAF] text-white transition-all shadow-sm"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 space-y-2.5 text-xs text-[#FAF7F2]/70">
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#C026D3]" />
                <a href="mailto:info@osiffatelecoms.com" className="hover:text-white transition-colors">
                  info@osiffatelecoms.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className="text-[#C026D3]" />
                <span>Africa</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/50">
          <p>&copy; {new Date().getFullYear()} Osiffa Telecoms (Nig.) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-[#FAF7F2]/60">
            <span>CAC Registered • RC 1276063</span>
            <span>•</span>
            <span>Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};