import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Wifi, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Network,
  Wrench,
  Layers,
  PhoneCall,
  Clock,
  Check,
  Building,
  Server,
  Code2,
  Laptop
} from 'lucide-react';
import { PageRoute } from '../types';
import { Reveal } from '../components/Reveal';

export const Home: React.FC = () => {
  // Interactive Solution Selector state
  const [selectedService, setSelectedService] = useState<'office' | 'internet' | 'cabling' | 'wifi' | 'hardware' | 'software'>('office');
  
  // Background Video State & Ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const tickerItems = [
    "Business Internet & Dedicated Connectivity",
    "Structured Office Cabling (Cat6 / Cat6A)",
    "Commercial Wi-Fi & Mesh Distribution",
    "IT Hardware Procurement & Workstations",
    "Server Rack & Patch Panel Organization",
    "Custom Business Software & ERP Solutions",
    "Router, Managed Switch & Firewall Setup",
    "Network Troubleshooting & Maintenance",
    "On-Site Support Across Africa"
  ];

  const serviceProfiles = {
    office: {
      title: "Complete Office Network Setup",
      desc: "End-to-end IT & connectivity setup for new or relocating offices. We handle your internet connection, structured cabling, Wi-Fi coverage, and server rack from day one.",
      deliverables: [
        "Structured data cabling to every desk and workstation",
        "Neat wall plates and patch panel termination",
        "Commercial-grade Wi-Fi access points for full coverage",
        "Secure router and firewall configuration",
        "Clean server rack or network cabinet installation"
      ],
      idealFor: "Startups, law firms, corporate offices, and clinics setting up a new space."
    },
    internet: {
      title: "Reliable Business Internet",
      desc: "Fast, dependable internet connectivity engineered for day-to-day office productivity, cloud collaboration, VoIP calls, and video conferencing without annoying drops.",
      deliverables: [
        "Stable broadband or dedicated business connection",
        "Backup link / dual-WAN failover configuration",
        "Bandwidth management to prioritize critical business apps",
        "Static IP setup for remote access and local servers",
        "Direct local technician support when you need help"
      ],
      idealFor: "Offices needing dependable connectivity with prompt local assistance."
    },
    cabling: {
      title: "Structured Cabling & Rack Cleanup",
      desc: "Say goodbye to tangled 'spaghetti' cables. We install certified Cat6/Cat6A data lines and reorganize messy network cabinets so your IT is clean and easy to maintain.",
      deliverables: [
        "Certified Cat6/Cat6A cabling with neat trunking",
        "Professional patch panel labeling and color coding",
        "Server rack cable reorganization and management",
        "Cable continuity testing and certification",
        "Reduced downtime caused by faulty or unorganized lines"
      ],
      idealFor: "Businesses with unorganized network closets or expanding office layouts."
    },
    wifi: {
      title: "Enterprise Wi-Fi & Wireless Mesh",
      desc: "Seamless, high-speed Wi-Fi coverage across every room, floor, or open space. Eliminate dead zones and ensure smooth roaming for staff and visitors.",
      deliverables: [
        "Strategic access point placement for zero dead zones",
        "Separate, secure networks for staff and guests",
        "High-density capacity supporting dozens of simultaneous devices",
        "Smooth handover between access points as you walk around",
        "Centralized dashboard for easy network monitoring"
      ],
      idealFor: "Multi-room offices, co-working spaces, restaurants, and warehouses."
    },
    hardware: {
      title: "IT Hardware Procurement & Setup",
      desc: "Sourcing and deploying enterprise workstations, business servers, UPS power backups, and biometric security systems tailored to your company's scale.",
      deliverables: [
        "Enterprise laptops, desktops, and dual-monitor workstations",
        "On-premise servers and Network Attached Storage (NAS)",
        "UPS power backup systems to protect against power surges",
        "Biometric attendance and magnetic door access systems",
        "Genuine hardware warranty and on-site hardware support"
      ],
      idealFor: "Offices needing dependable computer systems, secure storage, and hardware supply."
    },
    software: {
      title: "Custom Software & Business ERP",
      desc: "Custom web applications, business management systems, and automated workflows designed to streamline operations, inventory, and sales.",
      deliverables: [
        "Custom business management and ERP software",
        "Inventory tracking and multi-location Point of Sale (POS)",
        "Automated invoicing, customer records, and financial reports",
        "Secure staff portals and role-based access control",
        "Ongoing software updates, database maintenance, and training"
      ],
      idealFor: "Growing enterprises looking to automate manual tasks and modernize operations."
    }
  };

  const workingSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      desc: "We discuss your office layout, current pain points, number of users, and business requirements to understand exactly what you need."
    },
    {
      step: "02",
      title: "On-Site Assessment",
      desc: "Our technicians inspect your premises to evaluate cable pathways, wall structures, and optimal hardware positions."
    },
    {
      step: "03",
      title: "Clean Installation",
      desc: "We run quality cabling, mount access points, organize the rack, and configure network equipment neatly with minimal disruption."
    },
    {
      step: "04",
      title: "Testing & Ongoing Support",
      desc: "We test every port and wireless zone, hand over full documentation, and remain available for fast on-demand maintenance and troubleshooting."
    }
  ];

  return (
    <div className="flex flex-col bg-[#FAF7F2] text-[#18181B] min-h-screen selection:bg-[#C026D3] selection:text-white relative overflow-hidden">
      {/* Background Subtle Grid Accent */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0 cyber-grid" />

      {/* Hero Section */}
      <section className="relative bg-[#FAF7F2] text-[#18181B] overflow-hidden min-h-[90vh] flex items-center justify-start py-20 md:py-28">
        {/* Background High-Definition Network Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          onPlaying={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none transition-opacity duration-1000 ease-out ${
            isVideoLoaded ? 'opacity-80' : 'opacity-0'
          }`}
        >
          <source src="/videos/107991-678971274_medium.mp4" type="video/mp4" />
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        
        {/* Subtle Ambient Brand Glows */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#C026D3]/10 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FAF7F2] rounded-full blur-[140px] pointer-events-none z-0" />
        {/* Refined Directional Overlays for Text Legibility while Maximizing Video Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/65 via-35% to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-[#FAF7F2]/20 z-10 pointer-events-none"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left pt-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E8E2D5] bg-white text-[#18181B] text-xs font-semibold mb-8 shadow-sm cursor-default">
              <span className="h-2 w-2 rounded-full bg-[#C026D3]"></span>
              <span>Osiffa Telecoms (Nig.) Ltd</span>
              <span className="text-[#18181B]/30">·</span>
              <span>Networking, Web & IT Solutions</span>
              <span className="text-[#18181B]/30">·</span>
              <span className="text-[#C026D3] font-semibold text-[11px]">Africa</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="text-xs sm:text-sm font-bold tracking-wider text-[#C026D3] mb-3 uppercase text-left flex items-center gap-2 font-mono">
              <span className="h-0.5 w-6 bg-[#C026D3]"></span>
              <span>Practical, Dependable Networking</span>
            </div>
          </Reveal>

          {/* Headline strictly following the two-words-per-line user mandate */}
          <Reveal delay={200}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.12] text-[#18181B] text-left">
              Let’s Build <br />
              Your Network <br />
              <span className="font-extrabold">
                for the <br />
                <span className="text-[#C026D3]">
                  Future
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-base md:text-lg text-[#18181B]/75 mb-10 leading-relaxed max-w-2xl font-normal text-left">
              Providing reliable business internet, structured office cabling, commercial Wi-Fi solutions, and custom business web applications for growing companies across Africa.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-start mb-14">
              <Link to={PageRoute.CONTACT}>
                <button className="group relative w-full sm:w-auto px-8 py-3.5 text-xs font-semibold rounded-lg bg-[#18181B] hover:bg-[#C026D3] text-white shadow-sm hover:shadow-[0_4px_20px_rgba(192,38,211,0.3)] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden">
                  <span>Request a Free Quote</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link to={PageRoute.SERVICES}>
                <button className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold rounded-lg border border-[#E8E2D5] hover:border-[#C026D3] text-[#18181B] hover:text-[#C026D3] bg-white shadow-sm transition-colors flex items-center justify-center">
                  <span>Explore Our Services</span>
                </button>
              </Link>
            </div>
          </Reveal>

          {/* Authentic Value Strip in Hero */}
          <Reveal delay={700}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl pt-6 border-t border-[#E8E2D5]">
              {[
                { label: "Response Time", val: "Prompt & Local", sub: "On-Site Support" },
                { label: "Cabling Standards", val: "Cat6 & Cat6A", sub: "Neat, Labeled Trunking" },
                { label: "Business Internet", val: "Stable & Sized", sub: "For Your Team's Scale" },
                { label: "Support Model", val: "Hands-On", sub: "Experienced Technicians" },
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-[#E8E2D5] shadow-sm">
                  <div className="text-xs text-[#18181B]/60 mb-1">{m.label}</div>
                  <div className="text-base sm:text-lg font-bold text-[#18181B] tracking-tight">{m.val}</div>
                  <div className="text-xs text-[#C026D3] font-semibold">{m.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[#18181B]/40 flex flex-col items-center gap-1">
          <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll</span>
          <ArrowRight className="rotate-90 text-[#18181B]/40" size={14} />
        </div>
      </section>

      {/* Services Marquee */}
      <section className="bg-white border-y border-[#E8E2D5] py-3.5 relative overflow-hidden z-20 shadow-sm">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          <div className="flex items-center gap-10 px-6">
            {tickerItems.map((item, i) => (
              <div key={`a-${i}`} className="flex items-center gap-10">
                <span className="text-xs text-[#18181B]/80 font-semibold hover:text-[#C026D3] transition-colors duration-200 cursor-default whitespace-nowrap">
                  {item}
                </span>
                <span className="text-[#C026D3] text-xs">·</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-10 px-6">
            {tickerItems.map((item, i) => (
              <div key={`b-${i}`} className="flex items-center gap-10">
                <span className="text-xs text-[#18181B]/80 font-semibold hover:text-[#C026D3] transition-colors duration-200 cursor-default whitespace-nowrap">
                  {item}
                </span>
                <span className="text-[#C026D3] text-xs">·</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Overview (What We Do) */}
      <section className="py-24 bg-[#FAF7F2] relative border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-wider text-[#C026D3] uppercase block mb-3 font-mono">
                Practical Services
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] tracking-tight leading-tight mb-4">
                What We Do for <span className="text-[#C026D3]">Your Business</span>
              </h2>
              <p className="text-sm sm:text-base text-[#18181B]/70 font-normal">
                From laying neat office cables to setting up fast Wi-Fi and managing your connection, we make business networking straightforward and reliable.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Wifi,
                title: "Business Internet Setup",
                tag: "Connectivity",
                desc: "Connecting your office with dependable, properly configured internet. We configure backup links and bandwidth shaping so your team stays online without slowdowns."
              },
              {
                icon: Network,
                title: "Structured Office Cabling",
                tag: "Infrastructure",
                desc: "Clean, professional Cat6/Cat6A cable runs for desktop workstations, printers, and phones. All lines are neatly trunked, terminated, and labeled for easy maintenance."
              },
              {
                icon: Cpu,
                title: "Commercial Wi-Fi & Mesh",
                tag: "Wireless",
                desc: "Full-coverage Wi-Fi designed for business spaces. Eliminate dead zones, support multiple laptops and phones smoothly, and keep guest traffic safely separated."
              },
              {
                icon: Layers,
                title: "Server Rack Organization",
                tag: "Neat & Clean",
                desc: "Transform messy, tangled network closets into clean, organized server racks. We install patch panels, cable organizers, and labeled cords so maintenance is effortless."
              },
              {
                icon: Code2,
                title: "Custom Web Apps & ERP",
                tag: "Web & Software",
                desc: "Bespoke web applications, staff management portals, and automated ERP workflows that replace chaotic spreadsheets with real-time stock, invoicing, and sales."
              },
              {
                icon: Wrench,
                title: "On-Site Support & Maintenance",
                tag: "Local Assistance",
                desc: "Responsive on-demand IT and networking support when you need assistance. When a port fails, an access point disconnects, or internet drops, our technicians are ready to assist."
              }
            ].map((card, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="h-full bg-white rounded-2xl p-8 border border-[#E8E2D5] hover:border-[#C026D3]/50 transition-all shadow-sm flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-12 w-12 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] flex items-center justify-center text-[#C026D3] group-hover:bg-[#18181B] group-hover:text-white transition-colors shadow-sm">
                        <card.icon size={22} />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-[#FAF7F2] text-[#18181B]/70 border border-[#E8E2D5]">
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#18181B] mb-2.5 tracking-tight">
                      {card.title}
                    </h3>

                    <p className="text-[#18181B]/70 text-sm leading-relaxed mb-6 font-normal">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E2D5]">
                    <Link 
                      to={PageRoute.SERVICES} 
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#18181B] group-hover:text-[#C026D3] transition-colors"
                    >
                      <span>Learn more</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Networking: Hardware & Software Solutions */}
      <section className="py-24 bg-white relative border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-wider text-[#C026D3] uppercase block mb-3 font-mono">
                Integrated IT Services
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] tracking-tight leading-tight mb-4">
                Hardware & Software <span className="text-[#C026D3]">Solutions</span>
              </h2>
              <p className="text-sm sm:text-base text-[#18181B]/70 font-normal">
                Beyond cables and connectivity, we provide genuine business computer equipment and custom software systems—giving your organization a single, accountable technology partner.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Hardware Card */}
            <Reveal delay={100}>
              <div className="p-8 sm:p-10 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5] hover:border-[#C026D3]/50 transition-all shadow-sm flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-white border border-[#E8E2D5] flex items-center justify-center text-[#C026D3] shadow-sm">
                      <Server size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-white text-[#18181B]/70 border border-[#E8E2D5]">
                      Hardware Supply
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#18181B] mb-3 tracking-tight">
                    IT Hardware Procurement & Setup
                  </h3>
                  <p className="text-[#18181B]/70 text-sm leading-relaxed mb-6">
                    We source, configure, and deploy genuine brand-name business hardware. From desktop workstations and business laptops to power protection and server racks.
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      "Business laptops, desktop PCs & dual-monitor setups",
                      "On-premise servers & Network Attached Storage (NAS)",
                      "Pure sine-wave UPS units & voltage surge protection",
                      "Biometric time & attendance and door access control",
                      "Hardware diagnostics, RAM/SSD upgrades & repairs"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#18181B]/80">
                        <CheckCircle2 size={16} className="text-[#C026D3] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-[#E8E2D5] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#18181B]/60">Genuine Warranty Included</span>
                  <Link to={PageRoute.SERVICES} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#18181B] hover:text-[#C026D3] transition-colors">
                    <span>View Hardware</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Software Card */}
            <Reveal delay={200}>
              <div className="p-8 sm:p-10 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5] hover:border-[#C026D3]/50 transition-all shadow-sm flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-white border border-[#E8E2D5] flex items-center justify-center text-[#C026D3] shadow-sm">
                      <Code2 size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-white text-[#18181B]/70 border border-[#E8E2D5]">
                      Software Engineering
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#18181B] mb-3 tracking-tight">
                    Custom Software & Business ERP
                  </h3>
                  <p className="text-[#18181B]/70 text-sm leading-relaxed mb-4">
                    Tailor-made software applications and automated management tools that eliminate repetitive manual spreadsheets, streamline inventory, and track sales.
                  </p>

                  {/* Tech Stack & Features Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {["Custom Web Portals", "Cloud ERP", "Inventory & POS", "Automated Invoicing", "REST APIs"].map((badge, bIdx) => (
                      <span key={bIdx} className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white border border-[#E8E2D5] text-[#C026D3]">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-3 mb-8">
                    {[
                      "Custom web applications & secure staff portals",
                      "Inventory management & multi-location Point of Sale (POS)",
                      "Automated invoicing, payment receipts & CRM records",
                      "Payment gateway & automated WhatsApp/SMS integration",
                      "Continuous software updates, database backups & support"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#18181B]/80">
                        <CheckCircle2 size={16} className="text-[#C026D3] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-[#E8E2D5] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#18181B]/60">Built for Modern Businesses</span>
                  <Link to={PageRoute.SERVICES} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#18181B] hover:text-[#C026D3] transition-colors">
                    <span>Explore Web & Software</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive Solution Explorer */}
      <section className="py-24 bg-[#FAF7F2] relative overflow-hidden border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold tracking-wider text-[#C026D3] uppercase block mb-3 font-mono">
                Explore Solutions
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] tracking-tight leading-tight mb-4">
                Find the Right Setup for <span className="text-[#C026D3]">Your Office</span>
              </h2>
              <p className="text-sm sm:text-base text-[#18181B]/70 font-normal">
                Select your primary need below to see what our team delivers and how we can help.
              </p>
            </div>
          </Reveal>

          <div className="max-w-5xl mx-auto">
            {/* Tab buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8 p-1.5 rounded-xl bg-white border border-[#E8E2D5] shadow-sm">
              {[
                { id: 'office', label: 'Office Setup', icon: Building },
                { id: 'internet', label: 'Internet', icon: Wifi },
                { id: 'cabling', label: 'Cabling', icon: Network },
                { id: 'wifi', label: 'Wi-Fi', icon: Cpu },
                { id: 'hardware', label: 'Hardware', icon: Server },
                { id: 'software', label: 'Software/ERP', icon: Code2 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedService(tab.id as any)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    selectedService === tab.id
                      ? 'bg-[#18181B] text-white shadow-sm'
                      : 'text-[#18181B]/70 hover:text-[#C026D3] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <tab.icon size={14} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Profile Card */}
            <div className="rounded-2xl bg-white border border-[#E8E2D5] p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white text-[#C026D3] border border-[#E8E2D5] inline-block mb-3">
                      Recommended Package
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight">
                      {serviceProfiles[selectedService].title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#18181B]/75 leading-relaxed font-normal">
                    {serviceProfiles[selectedService].desc}
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold uppercase text-[#18181B] tracking-wider font-mono">
                      What's Included:
                    </div>
                    {serviceProfiles[selectedService].deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#18181B]/80">
                        <CheckCircle2 size={16} className="text-[#C026D3] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                    <Link to={PageRoute.CONTACT} className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#18181B] hover:bg-[#C026D3] text-white font-semibold text-xs tracking-wide shadow-sm flex items-center justify-center gap-2 transition-all">
                        <span>Get a Quote for This Setup</span>
                        <ArrowRight size={14} />
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-[#E8E2D5] space-y-5 shadow-sm">
                  <div className="pb-3 border-b border-[#E8E2D5]">
                    <div className="text-xs font-mono font-bold text-[#18181B] uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#C026D3]" />
                      Who This Is For
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#18181B]/75 leading-relaxed">
                    {serviceProfiles[selectedService].idealFor}
                  </p>

                  <div className="space-y-3 pt-2 border-t border-[#E8E2D5]">
                    <div className="text-[11px] font-mono font-bold text-[#18181B] uppercase">
                      Why Choose Osiffa:
                    </div>
                    <div className="space-y-2 text-xs text-[#18181B]/70">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#C026D3]" />
                        <span>Neat, labeled, and certified workmanship</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#C026D3]" />
                        <span>Direct contact with experienced local technicians</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#C026D3]" />
                        <span>Fast on-site visits and deployments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#C026D3]" />
                        <span>Transparent pricing with no hidden surprises</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E8E2D5] text-xs text-[#18181B]/80 flex items-center gap-2.5">
                    <PhoneCall size={16} className="text-[#C026D3] shrink-0" />
                    <span>Need immediate advice? Reach us directly at <span className="font-semibold text-[#18181B]">info@osiffatelecom.com</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our 4-Step Working Process */}
      <section className="py-24 bg-[#FAF7F2] relative border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-wider text-[#C026D3] uppercase block mb-3 font-mono">
                Simple & Transparent
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] tracking-tight leading-tight mb-4">
                How We <span className="text-[#C026D3]">Work With You</span>
              </h2>
              <p className="text-sm sm:text-base text-[#18181B]/70 font-normal">
                No complicated jargon or bureaucratic delays. We follow a clear, practical process to get your office connected cleanly.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workingSteps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="p-7 rounded-2xl bg-white border border-[#E8E2D5] shadow-sm hover:border-[#C026D3]/50 transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="text-3xl font-mono font-extrabold text-[#C026D3] mb-3">
                      {step.step}
                    </div>
                    <h3 className="text-base font-bold text-[#18181B] mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#18181B]/70 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#E8E2D5] text-[10px] font-mono font-bold text-[#18181B]/60 uppercase">
                    Step {step.step} of 04
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Businesses Choose Osiffa */}
      <section className="py-24 bg-white relative overflow-hidden border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-bold tracking-wider text-[#C026D3] uppercase block mb-3 font-mono">
                The Osiffa Difference
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] tracking-tight leading-none mb-4">
                Agile, Dedicated, and <span className="text-[#C026D3]">Hands-On</span>
              </h2>
              <p className="text-sm sm:text-base text-[#18181B]/70 font-normal">
                Unlike giant telecom conglomerates where your office is just a ticket number, we provide direct, personalized attention to every project we undertake.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: PhoneCall,
                title: "Direct Access to Engineers",
                desc: "Speak directly with the technicians and network specialists working on your installation, avoiding long call center wait times."
              },
              {
                icon: Layers,
                title: "Clean Workmanship",
                desc: "We take pride in neat cable trunking, clean rack dressing, and labeled ports that keep your office looking tidy and professional."
              },
              {
                icon: Clock,
                title: "Fast Local Mobilization",
                desc: "Our experienced team mobilizes quickly for on-site inspections, setups, and urgent troubleshooting across Africa."
              }
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="p-7 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5] hover:bg-white hover:border-[#C026D3]/50 transition-all shadow-sm h-full">
                  <div className="h-11 w-11 rounded-xl bg-white border border-[#E8E2D5] flex items-center justify-center text-[#C026D3] mb-5 shadow-sm">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-[#18181B] mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#18181B]/70 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#FAF7F2] relative overflow-hidden text-center px-4">
        <div className="relative z-10 max-w-2xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold tracking-wider text-[#C026D3] uppercase block mb-3 font-mono">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#18181B] mb-4 tracking-tight">
              Ready to Upgrade Your Office Network?
            </h2>
            <p className="text-[#18181B]/70 text-sm md:text-base mb-8 font-normal leading-relaxed">
              Tell us about your space, your team size, or your current networking challenge. We’ll provide a straightforward recommendation and quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Link to={PageRoute.CONTACT} className="w-full">
                <button className="w-full rounded-lg px-8 py-3.5 bg-[#18181B] hover:bg-[#C026D3] text-white font-semibold text-xs tracking-wide shadow-sm hover:shadow-[0_4px_16px_rgba(192,38,211,0.25)] flex items-center justify-center gap-2 transition-all duration-300">
                  <span>Request a Site Assessment</span>
                  <ArrowRight size={14} className="shrink-0" />
                </button>
              </Link>
            </div>
            
            {/* Direct Contact info */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-[#18181B]/70 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C026D3]"></span>
                Osiffa Telecoms (Nig.) Ltd
              </span>
              <span>•</span>
              <a href="mailto:info@osiffatelecom.com" className="hover:text-[#C026D3] transition-colors">
                info@osiffatelecom.com
              </a>
              <span>•</span>
              <span>Africa</span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
