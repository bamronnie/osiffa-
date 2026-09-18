import React from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';
import { Radio, Wifi, Lock, Zap, Map, Cpu } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { ConnectiveWeb } from '../components/ConnectiveWeb';
import serverRoomImg from '../Gemini_Generated_Image_2zcpks2zcpks2zcptt.PNG';

export const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero in Light Theme */}
      <div className="bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-24 relative overflow-hidden border-b border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-400/10 rounded-full blur-[140px] pointer-events-none"></div>
        
        {/* Interactive Web Background */}
        <ConnectiveWeb theme="light" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pointer-events-none">
          <Reveal>
            <span className="text-xs font-bold tracking-[0.3em] text-brand-600 uppercase block mb-4">Osiffa Telecoms</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight uppercase text-slate-900">Enterprise Architectures</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
              Carrier-grade transport pipelines, dedicated fiber loops, and highly resilient virtualization models designed to support low-latency enterprise operations.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Core Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">What We Do</h2>
            </Reveal>
            <div className="space-y-8">
              <Reveal delay={100}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                      <Wifi size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Fiber to The X (FTTX)</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">High-speed, reliable fiber optic connections bringing high-bandwidth connectivity directly to your home, office, or building nodes.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                      <Zap size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Internet Solutions & Services</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Dedicated internet access, high-capacity broadband, and custom connectivity packages tailored for enterprise demands and consumer convenience.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                      <Lock size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Virtualization & Cloud Computing</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Scale your IT infrastructure with robust virtualization, secure cloud hosting, and robust cloud data storage options designed to grow with your business.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                      <Radio size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Managed Services</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Active 24/7 network oversight, preventative system maintenance, professional IT auditing, and expert technical support.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                      <Map size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">LAN Services Deployment</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Local Area Network planning, structured cabling, switcher/router installation, and local asset distribution.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={355}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                      <Wifi size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Aerial & Optical Fiber Installation</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Expert overhead aerial fiber stringing alongside professional underground or internal optical cabling routes.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={380}>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                      <Cpu size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Hardware Solutions</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Procurement, deployment, hardware installation, and custom provisioning of carrier-grade active/passive devices, network enclosures, secure database nodes, and telecom equipment.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="relative">
            <Reveal delay={400}>
              <div className="relative aspect-square bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl animate-float">
                 <img 
                   src={serverRoomImg} 
                   alt="Server Room" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 to-transparent"></div>
              </div>
            </Reveal>
            
            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-10 z-20 hidden lg:block">
              <Reveal delay={600}>
                <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 max-w-xs animate-float" style={{animationDelay: '1s'}}>
                  <div className="flex items-center space-x-3 mb-2">
                    <Zap size={24} className="text-yellow-500 fill-current" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Speed Goal</span>
                  </div>
                  <div className="text-5xl font-extrabold text-brand-600 mb-2 tracking-tighter">10 Gbps</div>
                  <div className="text-gray-600 text-sm font-medium">Target backbone capacity per node</div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>



      {/* CTA */}
      <div className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to upgrade your infrastructure?</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-10">Our Abuja specialist technical engineers are standing by to conduct site-surveys, engineer redundant transit circuits, and design tailored enterprise frameworks.</p>
            <Link to={PageRoute.CONTACT}>
              <Button size="lg" className="px-12 bg-brand-600 text-white hover:bg-brand-700 transition-colors">Contact Our Specialists</Button>
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
};