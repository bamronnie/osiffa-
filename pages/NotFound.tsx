import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#18181B] flex items-center justify-center relative overflow-hidden py-24 px-4">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C026D3]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-xl w-full text-center relative z-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E2DA] text-[#18181B] text-xs font-semibold shadow-sm mb-6">
            <ShieldAlert size={14} className="text-[#C026D3]" />
            <span>404 · Resource Not Located</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-7xl sm:text-9xl font-black tracking-tight text-[#18181B] mb-4">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181B] mb-3">
            Page Not Found
          </h2>
          <p className="text-zinc-600 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            The page or carrier network resource you requested could not be located. It may have been relocated or the routing path might be invalid.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#18181B] hover:bg-black text-white text-xs font-semibold tracking-wide shadow-md hover:shadow-xl hover:shadow-[#C026D3]/15 transition-all">
                <Home size={15} />
                <span>Return to Network Hub</span>
              </button>
            </Link>

            <Link to="/services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F3EFEA] border border-[#E7E2DA] text-[#18181B] text-xs font-semibold tracking-wide shadow-sm transition-all group">
                <span>View Solutions</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 text-[#C026D3] transition-transform" />
              </button>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

