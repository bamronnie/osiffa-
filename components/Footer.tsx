import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
             <div className="mb-6">
                <Logo className="h-9 w-auto" variant="light" />
             </div>
            <p className="text-sm leading-relaxed mb-4">
              Let’s Build Your Network for the Future. Providing cutting-edge telecom services, fiber installation, cloud infrastructure, and robust cybersecurity key to modern enterprise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-brand-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-brand-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Regulatory Status</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Stay Connected</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
            <div className="space-y-2 text-sm">
               <div className="flex items-center gap-2">
                 <Mail size={16} /> <a href="mailto:info@osiffatelecoms.com" className="hover:text-brand-400 transition-colors">info@osiffatelecoms.com</a>
               </div>
               <div className="flex items-center gap-2">
                 <MapPin size={16} /> <span>Abuja, Nigeria</span>
               </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Osiffa Telecoms. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};