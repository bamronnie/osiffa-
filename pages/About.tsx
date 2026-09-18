import React from 'react';
import { Reveal } from '../components/Reveal';
import { 
  Building2, 
  Users2, 
  ShieldCheck, 
  Cpu, 
  Heart, 
  Compass, 
  LineChart, 
  Sparkles, 
  ShieldAlert, 
  GraduationCap, 
  Briefcase, 
  HeartPulse, 
  Scale 
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Premium Hero Section in Light Theme */}
      <section className="relative bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900 py-24 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-400/10 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-transparent">
          <Reveal>
            <span className="text-xs font-bold tracking-[0.3em] text-brand-600 uppercase block mb-4">Our Operations</span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 uppercase text-slate-900">
              About Osiffa Telecoms
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
              We’re all about keeping you connected—faster, smarter, and better. From crystal-clear calls to lightning-speed internet, we bring you the tools to work, play, and share without limits. Powered by innovation and driven by your needs, we make every connection count.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Corporate Profile (CAC & Integration story) */}
      <section id="corporate-profile" className="py-24 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <Reveal>
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-[0.2em] text-brand-500 uppercase block">Registered & Certified</span>
                  <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-tight text-zinc-900">
                    Osiffa Telecoms (Nig.) Ltd
                  </h2>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <p className="text-zinc-650 text-sm md:text-base leading-relaxed font-light">
                  Osiffa Telecoms Nigeria Limited (OSNL) is a company registered with the Corporate Affairs Commission (CAC) to provide professional services within the I.T and Telecommunications space. Incorporated in July 2015, we have committed ourselves to raising the standard of voice and high-capacity data networks across Nigeria.
                </p>
              </Reveal>

              <Reveal delay={250}>
                <p className="text-zinc-650 text-sm md:text-base leading-relaxed font-light">
                  Since our incorporation, our team of experts has tremendously increased, providing us with a large pool of certified talents deployed on short notice to satisfy our clients' complex, fast-changing requirements. We specialize in managing end-to-end turnkey projects ranging from strategic site acquisition and high-accuracy topographical site surveys to full system deployment, infrastructure rigging, and GPON fiber integrations.
                </p>
              </Reveal>

              <Reveal delay={350}>
                <p className="border-l-2 border-brand-500 pl-4 py-1 text-zinc-550 text-xs italic">
                  "Your world, always connected. At Osiffa Telecoms, we deliver seamless voice, data, and internet solutions that keep you in touch with what matters most—anytime, anywhere."
                </p>
              </Reveal>
            </div>

            {/* Right Stat Grid / Info Panel */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              <Reveal delay={200}>
                <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-wider">CAC Registered</h4>
                      <p className="text-[10px] text-zinc-500 font-mono">Incorporated July 2015</p>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-xs font-light">Official licensed provider of I.T, structural infrastructure planning, and elite carrier telecommunication designs.</p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                      <Users2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-wider">Elite Engineering Pool</h4>
                      <p className="text-[10px] text-zinc-500 font-mono">Turnkey Mobilization</p>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-xs font-light">Our engineers have partnered directly with equipment vendors, top networks, and leading infrastructure consultancies within Africa.</p>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                      <Compass size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-wider">Diverse Partnerships</h4>
                      <p className="text-[10px] text-zinc-500 font-mono">Clients Across Nigeria</p>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-xs font-light">Our client roster includes major telecoms, enterprise groups, federal & state government ministries, and medical institutions.</p>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-24 bg-zinc-50 border-b border-zinc-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-500 uppercase block mb-3">Core Pillars</span>
            <h2 className="text-3xl font-semibold uppercase tracking-tight text-zinc-900">Why Choose Us</h2>
            <p className="mt-3 text-zinc-500 text-sm max-w-sm mx-auto font-light">What anchors our persistent high demand and unmatched delivery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <Reveal delay={100}>
              <div className="bg-white border border-zinc-200/50 p-8 rounded-2xl h-full shadow-sm hover:shadow-md hover:border-zinc-300 transition-all">
                <div className="h-10 w-10 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck size={18} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-3 uppercase tracking-wide">Unmatched Reliability</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  A highly reliable network, innovative link solutions, exceptional customer services, and affordable symmetric connectivity you can build your business on.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-white border border-zinc-200/50 p-8 rounded-2xl h-full shadow-sm hover:shadow-md hover:border-zinc-300 transition-all">
                <div className="h-10 w-10 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center mb-6">
                  <Cpu size={18} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-3 uppercase tracking-wide">Cutting-Edge Technology</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  We deploy the latest hardware innovations and active network fiber designs to deliver faster, smarter, and packet-optimized communication routes.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-white border border-zinc-200/50 p-8 rounded-2xl h-full shadow-sm hover:shadow-md hover:border-zinc-300 transition-all">
                <div className="h-10 w-10 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center mb-6">
                  <Heart size={18} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-3 uppercase tracking-wide">Our Passion</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  Our teams comprise individuals with immense passion for their fields. We do not compromise, remaining hand-in-hand with clients until the exact envisaged results are achieved.
                </p>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="bg-white border border-zinc-200/50 p-8 rounded-2xl h-full shadow-sm hover:shadow-md hover:border-zinc-300 transition-all">
                <div className="h-10 w-10 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center mb-6">
                  <Sparkles size={18} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-3 uppercase tracking-wide">Speed of Deployment</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  Leveraging years of rugged, hands-on African market experience and highly strategic manufacturer partnerships to mobilize hardware and string links immediately.
                </p>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="bg-white border border-zinc-200/50 p-8 rounded-2xl h-full shadow-sm hover:shadow-md hover:border-zinc-300 transition-all">
                <div className="h-10 w-10 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center mb-6">
                  <LineChart size={18} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-3 uppercase tracking-wide">Our Strategy</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  Utilizing high-level, cost-effective project management and resilient supply chain models. We are solution-oriented, keeping downtime absolute zero.
                </p>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <div className="bg-white border border-zinc-200/50 p-8 rounded-2xl h-full shadow-sm hover:shadow-md hover:border-zinc-300 transition-all">
                <div className="h-10 w-10 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center mb-6">
                  <Compass size={18} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-3 uppercase tracking-wide">Our Promise</h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  With Osiffa Telecoms, impossible does not exist. We take the impossible, make it possible, and help you break new technical frontiers with unrivaled ICT solutions.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Philosophy Callout with zinc Background */}
      <section id="our-philosophy" className="py-24 bg-zinc-950 text-white relative overflow-hidden border-y border-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-955 to-brand-955/20 opacity-30"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <span className="text-xs font-bold tracking-[0.3em] text-brand-400 uppercase block mb-4">The Frontier Directive</span>
            <h3 className="text-2xl md:text-3.5xl font-regular font-sans tracking-tight mb-6 uppercase text-glow">
              “Take the impossible and make it possible.”
            </h3>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
              We help you break new frontiers and open new vistas in your business by bequeathing you with smart and unrivaled I.T/Telecommunications solutions, helping you emerge and stay at the absolute zenith of your chosen sector.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Industries We Serve */}
      <section id="industries-we-serve" className="py-24 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-500 uppercase block mb-3">Sectors Driven</span>
            <h2 className="text-3xl font-semibold uppercase tracking-tight text-zinc-900">The Industries We Serve</h2>
            <p className="mt-3 text-zinc-500 text-sm max-w-md mx-auto font-light leading-relaxed">
              From finance to healthcare, education to government, we power core sectors with tailored ICT solutions that drive efficiency, security, and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Scale, label: "Finance & Banking", desc: "Hardened encryption tunnels, dedicated transit, low-latency fibers, and secondary backbones for financial nodes." },
              { icon: HeartPulse, label: "Healthcare Systems", desc: "Continuous telemetry routing, secure local cloud, high-capacity symmetric links, and failover frameworks." },
              { icon: GraduationCap, label: "Higher Education", desc: "Wide area high-bandwidth campus intranets, robust campus routing matrices, and fiber-to-the-department deployments." },
              { icon: Briefcase, label: "Government Agencies", desc: "Fully managed state-wide VPN architectures, physical link planning surveys, and multi-node secure data connections." }
            ].map((sector, idx) => (
              <Reveal key={idx} delay={idx*100}>
                <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-xl hover:shadow-md transition-all">
                  <div className="h-10 w-10 bg-white border border-zinc-200/50 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                    <sector.icon size={16} />
                  </div>
                  <h4 className="font-bold text-zinc-800 text-sm mb-2 uppercase tracking-wide">{sector.label}</h4>
                  <p className="text-zinc-550 text-xs leading-relaxed font-light">{sector.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Policy Section */}
      <section id="safety-policy" className="py-24 bg-zinc-50 border-t border-zinc-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-transparent">
          <Reveal>
            <div className="inline-flex h-12 w-12 bg-amber-50 rounded-xl items-center justify-center text-amber-600 border border-amber-100 mb-6">
              <ShieldAlert size={20} />
            </div>
            <h2 className="text-2xl font-semibold uppercase tracking-tight text-zinc-900 mb-6">Our Safety Policy</h2>
            <p className="text-zinc-650 text-sm md:text-base leading-relaxed font-light mb-8 max-w-2xl mx-auto">
              Osiffa Telecoms takes safety very seriously, considering that most of our projects are carried out in very challenging environments. For this reason, we have an established team ensuring safety procedures and international safety standards are rigidly hand-led. Our HSE department must officially sanction every project phase, and is led by a well-trained expert with about 16 years of experience working in the health, safety, and environment (HSE) space.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
