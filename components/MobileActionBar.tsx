import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, MessageSquare, ArrowRight, PhoneCall } from 'lucide-react';
import { PageRoute } from '../types';

export const MobileActionBar: React.FC = () => {
  const location = useLocation();
  const isContactPage = location.pathname === PageRoute.CONTACT;

  return (
    <aside 
      aria-label="Quick Mobile Actions" 
      className="md:hidden fixed bottom-3 inset-x-3.5 z-40 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-md mx-auto bg-white/95 backdrop-blur-xl border border-[#E8E2D5] rounded-2xl p-1.5 shadow-[0_8px_30px_rgba(24,24,27,0.12)] flex items-center gap-1.5">
        
        {/* Call Us */}
        <a 
          href="tel:08089646456"
          className="flex-1 py-2.5 px-2 rounded-xl bg-[#FAF7F2] hover:bg-white border border-[#E8E2D5] text-[#18181B] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <PhoneCall size={13} className="text-[#C026D3] shrink-0" />
          <span className="truncate">Call</span>
        </a>

        {/* WhatsApp Chat */}
        <a 
          href="https://wa.me/2348089646456?text=Hello%20Osiffa%20Telecoms,%20I'd%20like%20to%20inquire%20about%20office%20networking%20and%20services."
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 rounded-xl bg-[#FDF4FF] hover:bg-[#FAE8FF] border border-[#C026D3]/30 text-[#86198F] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <MessageSquare size={13} className="text-[#C026D3] shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Request Quote Primary Action */}
        <Link 
          to={PageRoute.CONTACT} 
          className={`flex-[1.2] py-2.5 px-3 rounded-xl text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 ${
            isContactPage 
              ? 'bg-[#C026D3] shadow-[0_4px_16px_rgba(192,38,211,0.35)]' 
              : 'bg-[#18181B] hover:bg-[#C026D3]'
          }`}
        >
          <span>Request Quote</span>
          <ArrowRight size={13} className="text-[#C026D3]" />
        </Link>
      </div>
    </aside>
  );
};
