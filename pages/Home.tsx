import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { 
  ArrowRight, 
  Smartphone, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Wifi, 
  Activity, 
  Globe, 
  Server, 
  CheckCircle2, 
  Radio, 
  Network, 
  Layers, 
  Lock, 
  Gauge 
} from 'lucide-react';
import { PageRoute } from '../types';
import { Reveal } from '../components/Reveal';
import { ConnectiveWeb } from '../components/ConnectiveWeb';

export const Home: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'dia' | 'metro' | 'cloud'>('dia');

  const tickerItems = [
    "FTTX GIGABIT BROADBAND",
    "AERIAL & OPTICAL FIBER STRINGING",
    "ENTERPRISE MANAGED ICT",
    "CLOUD VIRTUALIZATION",
    "STRUCTURED LAN DEPLOYMENT",
    "HIGH-SPEED FAILOVER GATEWAYS",
    "CLOUD PBX SOLUTIONS",
    "CYBERSECURITY INTEGRATION"
  ];

  const tierDetails = {
    dia: {
      name: "Dedicated Internet Access (DIA)",
      speed: "Up to 10 Gbps Symmetrical",
      contention: "1:1 Guaranteed Uncontended",
      sla: "99.999% Carrier Uptime",
      latency: "<3.5ms Metro Ring Latency",
      features: [
        "Symmetric upload & download ceilings",
        "Direct multi-homed Tier-1 BGP transit",
        "Proactive 24/7 NOC monitoring with SLA penalty guarantee",
        "Static IPv4/IPv6 block allocations included"
      ]
    },
    metro: {
      name: "Metro-Ethernet LAN Interconnect",
      speed: "1 Gbps – 40 Gbps Optical Trunk",
      contention: "100% Private Dark & Lit Fiber",
      sla: "99.995% Private Ring SLA",
      latency: "<2.1ms Point-to-Point Inter-site",
      features: [
        "Layer-2 transparent optical trunking between branches",
        "Zero exposure to public Internet transit",
        "Sub-50ms self-healing fiber ring failover",
        "Hardware-level jumbo frame support (9000 MTU)"
      ]
    },
    cloud: {
      name: "Enterprise Cloud & PBX Virtualization",
      speed: "Direct Cloud Connect 10 Gbps",
      contention: "Dedicated Virtual Private Tunnels",
      sla: "99.99% Cloud Gateway Availability",
      latency: "<8.5ms Direct Cloud Peering",
      features: [
        "Direct cross-connect to AWS, Azure, & GCP regions",
        "High-definition SIP trunking & Hosted Cloud PBX",
        "Zero-trust perimeter firewall & IPS/IDS defense",
        "Automated continuous cloud failover replication"
      ]
    }
  };

  return (
    <div className="flex flex-col bg-[#0f172a] text-slate-100 min-h-screen selection:bg-brand-500 selection:text-white relative overflow-hidden">
      {/* Background Cyber Grid Accent */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }} 
      />

      {/* Cinematic Hero Section */}
      <section className="relative bg-[#0f172a] text-white overflow-hidden min-h-screen flex items-center justify-start py-20 md:py-28">
        {/* Background Video from osiffatelecoms.com */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none opacity-80"
          src="https://osiffatelecoms.com/wp-content/uploads/2025/08/short-video.mp4"
        />
        
        {/* Interactive Optical Particle Canvas */}
        <div className="absolute inset-0 z-0 opacity-60">
           <ConnectiveWeb theme="dark" />
        </div>
        
        {/* Lighter, Softer Gradient Overlays for High-Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/65 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/40 z-10 pointer-events-none"></div>
        
        {/* Ambient Luminous Violet and Cyan Energy Blooms */}
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[750px] h-[750px] bg-brand-500/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[130px] pointer-events-none z-0"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left pt-12">
          <Reveal>
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-xl text-brand-300 text-[11px] font-bold tracking-[0.25em] uppercase mb-8 shadow-2xl hover:bg-white/[0.12] hover:border-brand-400/50 transition-all cursor-default group">
              <span className="relative flex h-2 w-2 mr-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>CARRIER-GRADE OPTICAL & CLOUD TRANSIT</span>
              <span className="hidden sm:inline text-white/30 mx-2">|</span>
              <span className="hidden sm:inline text-slate-200 font-mono text-[10px]">ABUJA METRO RING: ONLINE</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="text-sm md:text-base font-bold tracking-[0.4em] text-brand-400 mb-4 uppercase text-left flex items-center gap-3">
              <span className="h-px w-8 bg-brand-500"></span>
              Osiffa Telecoms
            </div>
          </Reveal>

          {/* Headline strictly following the two-words-per-line user mandate */}
          <Reveal delay={200}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white uppercase text-left">
              Let’s Build <br />
              Your Network <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-200 to-brand-400 text-glow">
                for the <br /> Future
              </span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-base md:text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl font-normal text-left">
              Providing metropolitan FTTX deployments, synchronous corporate broadband, private cloud virtualization, and managed enterprise ICT frameworks tailored for high-availability performance.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-start mb-16">
              <Link to={PageRoute.SERVICES}>
                <Button size="lg" className="w-full sm:w-auto px-10 py-5 text-sm font-semibold rounded-full bg-gradient-to-r from-brand-600 via-purple-600 to-brand-500 hover:from-brand-500 hover:to-purple-400 text-white transition-all shadow-xl shadow-brand-500/30 ring-1 ring-white/20 active:scale-98">
                  Review Infrastructure
                </Button>
              </Link>
              <Link to={PageRoute.CONTACT}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-10 py-5 text-sm font-semibold rounded-full border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white/15 hover:border-brand-400/60 shadow-lg shadow-black/40 active:scale-98">
                  Enterprise Consult
                </Button>
              </Link>
            </div>
          </Reveal>

          {/* Quick Telemetry Strip in Hero */}
          <Reveal delay={700}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl pt-6 border-t border-white/15">
              {[
                { label: "Core Availability", val: "99.999%", sub: "Guaranteed SLA" },
                { label: "Metro Ring Latency", val: "<4.2 ms", sub: "Abuja Core CBD" },
                { label: "FTTX Backbone", val: "10+ Gbps", sub: "Symmetric Uplink" },
                { label: "NOC Surveillance", val: "24/7/365", sub: "Active Threat Defense" },
              ].map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70 backdrop-blur-md hover:bg-slate-800/80 transition-colors">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-300 mb-1">{m.label}</div>
                  <div className="text-lg md:text-xl font-mono font-bold text-white tracking-tight">{m.val}</div>
                  <div className="text-[10px] text-brand-300 font-mono">{m.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-20 text-slate-400 flex flex-col items-center gap-1">
           <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">SCROLL</span>
           <ArrowRight className="rotate-90 text-brand-400" size={16} />
        </div>
      </section>

      {/* Infinite Partner Marquee */}
      <section className="bg-[#1e293b] border-y border-slate-700/80 py-5 relative overflow-hidden z-20 shadow-md">
         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1e293b] to-transparent z-10 pointer-events-none"></div>
         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1e293b] to-transparent z-10 pointer-events-none"></div>
         
         <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
           {/* First Set */}
           <div className="flex items-center gap-16 px-8">
              {tickerItems.map((item, i) => (
                <div key={`a-${i}`} className="flex items-center gap-16">
                   <span className="text-xs md:text-sm text-slate-200 font-semibold tracking-[0.25em] uppercase hover:text-brand-300 transition-colors duration-300 cursor-default whitespace-nowrap">
                      {item}
                   </span>
                   <span className="text-brand-400 font-mono text-xs drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">///</span>
                </div>
              ))}
           </div>
           {/* Duplicate Set for smooth infinite scroll */}
           <div className="flex items-center gap-16 px-8">
              {tickerItems.map((item, i) => (
                <div key={`b-${i}`} className="flex items-center gap-16">
                   <span className="text-xs md:text-sm text-slate-200 font-semibold tracking-[0.25em] uppercase hover:text-brand-300 transition-colors duration-300 cursor-default whitespace-nowrap">
                      {item}
                   </span>
                   <span className="text-brand-400 font-mono text-xs drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">///</span>
                </div>
              ))}
           </div>
           {/* Triplicate Set for ultra-wide screens */}
           <div className="flex items-center gap-16 px-8">
              {tickerItems.map((item, i) => (
                <div key={`c-${i}`} className="flex items-center gap-16">
                   <span className="text-xs md:text-sm text-slate-200 font-semibold tracking-[0.25em] uppercase hover:text-brand-300 transition-colors duration-300 cursor-default whitespace-nowrap">
                      {item}
                   </span>
                   <span className="text-brand-400 font-mono text-xs drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">///</span>
                </div>
              ))}
           </div>
         </div>
      </section>

      {/* Impact By Numbers - High Tech Dark Glass Metrics */}
      <section className="py-24 bg-[#0f172a] relative border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "99.99%", label: "SLA-Backed Uptime", detail: "Carrier-Grade Fiber Assurance" },
              { number: "<4.2ms", label: "Abuja Ring Latency", detail: "Direct CBD Exchange Peering" },
              { number: "10 Gbps", label: "Backbone Core Capacity", detail: "Dense Wavelength Division" },
              { number: "24/7/365", label: "Active Threat Defense", detail: "Real-Time SOC & NOC Monitoring" },
            ].map((stat, idx) => (
               <Reveal key={idx} delay={idx * 100}>
                  <div className="group p-8 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-brand-400/60 hover:bg-slate-800 transition-all duration-300 shadow-xl backdrop-blur-md h-full flex flex-col justify-center">
                    <div className="text-4xl md:text-5xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brand-300 tracking-tight mb-2 group-hover:scale-105 transition-transform duration-300 text-glow">{stat.number}</div>
                    <div className="text-xs text-brand-300 uppercase tracking-[0.2em] font-bold mb-1">{stat.label}</div>
                    <div className="text-[11px] text-slate-300 font-normal">{stat.detail}</div>
                  </div>
               </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Enterprise Telemetry & Bandwidth Console (WOW Factor) */}
      <section className="py-28 bg-[#111827] relative overflow-hidden border-b border-slate-800">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-brand-500/15 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-[0.3em] text-brand-400 uppercase block mb-3">Live Enterprise Telemetry</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none mb-6">
                Metropolitan Optical <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-purple-300 to-cyan-300 text-glow">Exchange Engine</span>
              </h2>
              <p className="text-base text-slate-300 font-normal">
                Inspect real-time routing specs, latency benchmarks, and carrier configuration models engineered for high-concurrency enterprise workloads.
              </p>
            </div>
          </Reveal>

          {/* Interactive Tier Switcher */}
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-8 p-1.5 rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-xl">
              <button
                onClick={() => setActiveTier('dia')}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                  activeTier === 'dia'
                    ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-lg shadow-brand-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Zap size={16} />
                <span>Dedicated Internet (DIA)</span>
              </button>
              <button
                onClick={() => setActiveTier('metro')}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                  activeTier === 'metro'
                    ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-lg shadow-brand-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Network size={16} />
                <span>Metro-Ethernet LAN</span>
              </button>
              <button
                onClick={() => setActiveTier('cloud')}
                className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                  activeTier === 'cloud'
                    ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-lg shadow-brand-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Server size={16} />
                <span>Cloud & PBX Transit</span>
              </button>
            </div>

            {/* Telemetry Console Card */}
            <div className="rounded-3xl bg-[#152340]/90 border border-white/20 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Specs Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-brand-500/25 text-brand-300 border border-brand-400/40">
                      Active Architecture
                    </span>
                    <span className="text-slate-300 font-mono text-xs flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      100% Optical Health
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {tierDetails[activeTier].name}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 py-2">
                    <div className="p-4 rounded-xl bg-white/[0.06] border border-white/15">
                      <div className="text-[10px] uppercase font-bold text-slate-300 font-mono mb-1">Guaranteed Throughput</div>
                      <div className="text-base sm:text-lg font-bold text-white font-mono">{tierDetails[activeTier].speed}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.06] border border-white/15">
                      <div className="text-[10px] uppercase font-bold text-slate-300 font-mono mb-1">Latency SLA</div>
                      <div className="text-base sm:text-lg font-bold text-brand-300 font-mono">{tierDetails[activeTier].latency}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.06] border border-white/15">
                      <div className="text-[10px] uppercase font-bold text-slate-300 font-mono mb-1">Contention Ratio</div>
                      <div className="text-base sm:text-lg font-bold text-white font-mono">{tierDetails[activeTier].contention}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.06] border border-white/15">
                      <div className="text-[10px] uppercase font-bold text-slate-300 font-mono mb-1">Contractual SLA</div>
                      <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono">{tierDetails[activeTier].sla}</div>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {tierDetails[activeTier].features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 size={16} className="text-brand-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link to={PageRoute.CONTACT}>
                      <Button size="lg" className="px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-brand-500/25 flex items-center gap-2">
                        <span>Provision This Architecture</span>
                        <ArrowRight size={14} />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Interactive Node Topology Graph */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0e172e] border border-white/15 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/15">
                    <div className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                      <Radio size={14} className="text-brand-400 animate-pulse" />
                      Abuja Metro Node Pings
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">0.00% Packet Loss</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    {[
                      { node: "Central Business District (CBD)", ping: "2.4 ms", status: "Optimal", color: "text-emerald-400" },
                      { node: "Maitama Core Ring", ping: "3.1 ms", status: "Active 1:1", color: "text-emerald-400" },
                      { node: "Wuse II Exchange", ping: "2.8 ms", status: "Low Jitter", color: "text-emerald-400" },
                      { node: "Jabi & Airport Corridor", ping: "4.3 ms", status: "Dense WDM", color: "text-brand-300" },
                      { node: "Global Transit Cross-Connect", ping: "11.2 ms", status: "Multi-BGP", color: "text-cyan-300" }
                    ].map((n, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.05] border border-white/10 hover:border-brand-400/40 transition-colors">
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-400"></span>
                          <span className="text-slate-200 truncate">{n.node}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={n.color}>{n.ping}</span>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/15 uppercase">{n.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-brand-500/15 border border-brand-400/30 text-[11px] text-slate-200 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-brand-400 shrink-0" />
                    <span>Real-time link failover ensures automatic switchover in &lt;50ms upon physical strand disruption.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight Features Grid - Sleek Refined Slate */}
      <section className="py-32 bg-[#0f172a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="mb-20">
              <span className="text-xs font-bold tracking-[0.3em] text-brand-400 uppercase block mb-3">Core Infrastructure Standards</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none mb-6">
                Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-purple-300 to-cyan-300 text-glow">Reliability</span>
              </h2>
              <p className="text-base text-slate-200 max-w-2xl font-normal">
                High-capacity core backbones and bespoke network solutions designed to support critical public and corporate operations across Abuja.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Smartphone,
                tag: "Carrier Hardware",
                title: "Carrier-Grade Equipment",
                desc: "Direct local deployment of enterprise-class customer premises equipment (CPE) fitted with proactive link monitoring modules."
              },
              {
                icon: Globe,
                tag: "Dedicated Pathways",
                title: "Dedicated Fiber Loops",
                desc: "Private physical optical pathways routing traffic directly through core metropolitan exchange points for absolute data isolation."
              },
              {
                icon: Cpu,
                tag: "SDN Traffic Flow",
                title: "Proactive Flow Optimization",
                desc: "Advanced traffic-shaping and software-defined routing loops continuously stabilize load balances, preventing packet jitter."
              },
              {
                icon: ShieldCheck,
                tag: "Active Defense",
                title: "Layer-3 Active Security",
                desc: "Comprehensive encryption integration, strict firewall architectures, and active perimeter defense shielding critical databases."
              },
              {
                icon: Zap,
                tag: "Synchronous 1:1",
                title: "Symmetrical Bandwidth",
                desc: "High-capacity synchronous transport baselines offering equal upload and download ceilings for seamless site-to-site backups."
              },
              {
                icon: Server,
                tag: "Localized Rings",
                title: "Regional Exchange Nodes",
                desc: "Extensive localized core switching arrays positioned close to corporate rings to minimize public internet routing hops."
              }
            ].map((feature, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                {/* Spotlight Card */}
                <div className="group relative h-full bg-slate-800/80 hover:bg-slate-800 rounded-2xl p-8 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 border border-slate-700/80 hover:border-brand-400/60 shadow-xl shadow-black/20">
                  
                  {/* Subtle Top Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-12 w-12 bg-brand-500/15 border border-brand-500/30 rounded-xl flex items-center justify-center text-brand-300 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-md group-hover:shadow-brand-500/40">
                        <feature.icon size={22} />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-md bg-slate-700/60 text-slate-200 border border-slate-600/60 group-hover:text-brand-200 group-hover:border-brand-400/40 transition-colors">
                        {feature.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-brand-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-200 leading-relaxed text-xs sm:text-sm font-normal">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Elegant, Mature CTA in Dark Theme */}
      <section className="py-32 bg-gradient-to-b from-[#131d33] via-[#1e293b] to-[#0f172a] relative overflow-hidden flex items-center justify-center text-center px-4 border-t border-slate-700/60">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-brand-500/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold tracking-[0.3em] text-brand-400 uppercase block mb-4">Enterprise Architectures</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight uppercase text-glow">CONTACT US</h2>
            <p className="text-slate-200 text-base md:text-lg mb-10 font-normal max-w-xl mx-auto leading-relaxed">
              Upgrade your commercial workspaces, high-capacity residential points, or cloud connectivity tunnels with our expert configuration team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
               <Link to={PageRoute.CONTACT} className="w-full sm:w-auto">
                 <Button size="lg" className="w-full sm:w-auto h-auto rounded-full px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-brand-600 via-purple-600 to-brand-500 text-white hover:from-brand-500 hover:to-purple-400 active:scale-98 shadow-xl shadow-brand-500/30 ring-1 ring-white/20 border-none font-semibold text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300">
                    <span>Schedule Technical Consultation</span>
                    <ArrowRight size={16} className="shrink-0" />
                 </Button>
               </Link>
            </div>
            
            {/* Direct NOC Contact info */}
            <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                24/7 Priority NOC Support
              </span>
              <span>•</span>
              <a href="mailto:info@osiffatelecoms.com" className="hover:text-brand-300 transition-colors">
                info@osiffatelecoms.com
              </a>
              <span>•</span>
              <span>Abuja, Nigeria</span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
