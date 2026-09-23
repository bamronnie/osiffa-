import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';
import { 
  Wifi, 
  Network, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Wrench, 
  ArrowRight, 
  CheckCircle2,
  PhoneCall,
  Check,
  Laptop,
  Server,
  Code2,
  Database,
  KeyRound,
  Zap
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { ConnectiveWeb } from '../components/ConnectiveWeb';

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'network' | 'hardware' | 'software'>('all');

  const allServices = [
    // --- Network Infrastructure ---
    {
      category: 'network',
      icon: Wifi,
      title: "Business Internet & Connectivity",
      tag: "Connectivity",
      desc: "Dependable, properly sized internet connections for corporate offices, clinics, law firms, and commercial facilities. We configure failover lines so your business never goes completely offline.",
      deliverables: [
        "Reliable business broadband or dedicated connection",
        "Dual-WAN router setup for automatic backup switching",
        "Bandwidth management (QoS) to prioritize video calls and cloud tools",
        "Static IP setup for local servers and remote access"
      ]
    },
    {
      category: 'network',
      icon: Network,
      title: "Structured Office Cabling",
      tag: "Infrastructure",
      desc: "Clean, professional data cabling (Cat6/Cat6A) connecting desktop workstations, printers, VoIP phones, and meeting rooms with durable, neat trunking and wall faceplates.",
      deliverables: [
        "Certified Cat6/Cat6A twisted pair cabling",
        "Neat wall-mounted trunking and conduit routing",
        "Professional RJ45 wall faceplate terminations",
        "Complete cable continuity testing and port labeling"
      ]
    },
    {
      category: 'network',
      icon: Cpu,
      title: "Commercial Wi-Fi & Mesh Setup",
      tag: "Wireless",
      desc: "Enterprise-grade wireless access points strategically placed to eliminate dead zones. Designed to handle high device density without choking or dropping connections.",
      deliverables: [
        "Full-office Wi-Fi coverage with zero dead spots",
        "Smooth roaming between access points without disconnecting",
        "Isolated guest network for visitors to protect company data",
        "Bandwidth throttling on guest networks to preserve office speed"
      ]
    },
    {
      category: 'network',
      icon: Layers,
      title: "Server Rack & Cabinet Organization",
      tag: "Neat & Clean",
      desc: "Transform chaotic, tangled network closets into clean, organized server racks. We install patch panels, cable organizers, and labeled cords so maintenance is effortless.",
      deliverables: [
        "Server rack and wall-mount cabinet installation",
        "Patch panel mounting and color-coded patch cords",
        "Neat horizontal and vertical cable management",
        "Clear labeling for every port, device, and connection"
      ]
    },
    {
      category: 'network',
      icon: ShieldCheck,
      title: "Router, Switch & Firewall Setup",
      tag: "Network Hardware",
      desc: "Procurement, mounting, and configuration of business-grade networking equipment. We set up managed switches, VLANs, and firewall rules to keep your local network secure.",
      deliverables: [
        "Managed switch configuration with VLAN segmentation",
        "PoE (Power over Ethernet) setup for access points & phones",
        "Hardware firewall rules and basic intrusion prevention",
        "Secure remote-access VPN for employees working from home"
      ]
    },
    {
      category: 'network',
      icon: Wrench,
      title: "Network Maintenance & Support",
      tag: "Hands-On Support",
      desc: "Responsive on-demand IT and networking support when you need assistance. From diagnosing internet drops and replacing faulty switches to regular preventative maintenance.",
      deliverables: [
        "Fast on-site troubleshooting and diagnostics",
        "Faulty cable tracing and immediate re-termination",
        "Routine equipment checks and firmware updates",
        "Direct communication with assigned technical specialists"
      ]
    },

    // --- Hardware Solutions ---
    {
      category: 'hardware',
      icon: Laptop,
      title: "IT Hardware Procurement & Setup",
      tag: "Hardware Supply",
      desc: "Supply, unboxing, OS installation, and deployment of business laptops, desktop computers, dual-monitor workstations, and network printers with full manufacturer warranty.",
      deliverables: [
        "Brand-name business laptops and desktop workstations",
        "Operating system installation, driver setup & baseline software",
        "Network-ready multi-function office printers and scanners",
        "Pure sine-wave UPS systems and voltage surge protectors"
      ]
    },
    {
      category: 'hardware',
      icon: Server,
      title: "Business Servers & Storage Systems",
      tag: "Storage & Backup",
      desc: "On-premise servers and centralized Network Attached Storage (NAS) configurations designed for secure local file sharing, automated backups, and database hosting.",
      deliverables: [
        "Tower and rack-mount business server deployment",
        "Centralized Network Attached Storage (NAS) setup",
        "RAID disk redundancy to protect against hard drive failure",
        "Automated local and offsite cloud backup routines"
      ]
    },
    {
      category: 'hardware',
      icon: KeyRound,
      title: "Biometrics & Access Control Systems",
      tag: "Physical Security",
      desc: "Hardware installation of fingerprint and facial recognition attendance terminals, magnetic door access locks, and keycard systems to secure commercial premises.",
      deliverables: [
        "Biometric fingerprint and facial recognition time clocks",
        "Magnetic door access locks with emergency break-glass",
        "RFID keycard and keypad door controllers",
        "Automated staff attendance reporting and software sync"
      ]
    },
    {
      category: 'hardware',
      icon: Zap,
      title: "Hardware Diagnostics & Upgrades",
      tag: "Diagnostics & Care",
      desc: "Professional on-site hardware troubleshooting, memory (RAM) expansions, ultra-fast NVMe SSD upgrades, and preventative cleaning to extend computer lifespan.",
      deliverables: [
        "Component-level diagnostics for slow or failing PCs",
        "High-speed SSD upgrades and RAM capacity expansion",
        "Power supply (PSU) and thermal paste replacements",
        "Complete hardware health audit and performance testing"
      ]
    },

    // --- Software Solutions ---
    {
      category: 'software',
      icon: Code2,
      title: "Custom Business Software & Portals",
      tag: "Custom Software",
      desc: "Tailor-made web applications, internal staff portals, and operational tools built specifically around your company's unique workflow and business processes.",
      deliverables: [
        "Bespoke web applications and responsive employee portals",
        "Role-based access control (Admin, Manager, Staff)",
        "Custom workflow management and document approvals",
        "Clean, modern user interfaces designed for rapid adoption"
      ]
    },
    {
      category: 'software',
      icon: Database,
      title: "Business ERP & Inventory Management",
      tag: "ERP & POS",
      desc: "Integrated business systems that bring sales, stock inventory, automated invoicing, customer records (CRM), and financial reports into one unified platform.",
      deliverables: [
        "Real-time stock and multi-location inventory tracking",
        "Point of Sale (POS) with receipt and invoice generation",
        "Customer database (CRM) and transaction history",
        "Comprehensive profit/loss and daily sales dashboards"
      ]
    },
    {
      category: 'software',
      icon: Cpu,
      title: "Process Automation & Integrations",
      tag: "Automation",
      desc: "Connecting your existing business tools with automated workflows, payment gateways, and real-time notification alerts via SMS, WhatsApp, or Email.",
      deliverables: [
        "Payment gateway integration (Paystack, Flutterwave, etc.)",
        "Automated customer notifications (receipts, order updates)",
        "API integrations between third-party apps and accounting tools",
        "Scheduled data exports and automated report generation"
      ]
    },
    {
      category: 'software',
      icon: ShieldCheck,
      title: "Software Maintenance & Database Support",
      tag: "Software Support",
      desc: "Ongoing software maintenance, security updates, database optimization, and bug fixing to ensure your business systems remain fast, secure, and reliable.",
      deliverables: [
        "Routine software updates and security patch deployment",
        "Database performance tuning and index optimization",
        "Scheduled offsite database backups and disaster recovery tests",
        "Dedicated developer support for feature additions and bug fixes"
      ]
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : allServices.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#18181B] relative overflow-hidden">
      {/* Background Cyber Grid Accent */}
      <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative bg-[#FAF7F2] text-[#18181B] py-28 relative overflow-hidden border-b border-[#E8E2D5]">
        {/* Connective Web Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ConnectiveWeb theme="light" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D5] text-[#C026D3] text-xs font-semibold mb-6 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#C026D3]"></span>
              <span>Complete Technology & Network Solutions</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[#18181B] leading-tight">
              Business Network <br className="hidden sm:inline" />
              <span className="text-[#C026D3]">
                Solutions & Cabling
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base sm:text-lg text-[#18181B]/70 max-w-3xl mx-auto leading-relaxed font-normal">
              From structured cabling, commercial Wi-Fi, and business internet to IT hardware procurement and custom software development across Africa.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs text-[#18181B]/70 font-medium">
              <span className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E8E2D5] shadow-sm">Structured Cabling & Wi-Fi</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E8E2D5] shadow-sm">IT Hardware & Workstations</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E8E2D5] shadow-sm">Custom Software & ERP</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-[0.25em] text-[#C026D3] uppercase block mb-3 font-mono">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#18181B] tracking-tight">
              What We Deliver
            </h2>
            <p className="text-[#18181B]/70 text-sm sm:text-base mt-3">
              Practical, high-quality network infrastructure, genuine IT hardware, and custom software systems for expanding enterprises.
            </p>
          </div>
        </Reveal>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {[
            { id: 'all', label: `All Solutions (${allServices.length})` },
            { id: 'network', label: 'Network Infrastructure (6)' },
            { id: 'hardware', label: 'Hardware Solutions (4)' },
            { id: 'software', label: 'Software Solutions (4)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all border ${
                activeCategory === tab.id
                  ? 'bg-[#18181B] text-white border-[#18181B] shadow-sm'
                  : 'bg-white text-[#18181B]/75 border-[#E8E2D5] hover:border-[#C026D3] hover:text-[#C026D3]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filteredServices.map((service, idx) => (
            <Reveal key={idx} delay={(idx % 3) * 100}>
              <div className="group h-full p-8 rounded-2xl bg-white border border-[#E8E2D5] hover:border-[#C026D3]/60 transition-all flex flex-col justify-between shadow-sm hover:shadow-xl relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] flex items-center justify-center text-[#C026D3] group-hover:bg-[#18181B] group-hover:text-white transition-colors shadow-sm">
                      <service.icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-[#FAF7F2] text-[#18181B]/70 border border-[#E8E2D5]">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#18181B] mb-2.5 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-[#18181B]/70 text-sm leading-relaxed mb-6 font-normal">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#E8E2D5] space-y-2.5 text-xs text-[#18181B]/80">
                  {service.deliverables.map((item, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-[#C026D3] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Why Clean Networking Matters */}
        <div className="rounded-3xl bg-white border border-[#E8E2D5] p-8 sm:p-12 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold tracking-wider text-[#C026D3] uppercase block font-mono">
                Workmanship Standard
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight">
                Why Clean Workmanship Saves You Time and Money
              </h3>
              <p className="text-[#18181B]/75 text-sm sm:text-base leading-relaxed">
                When network cables are run haphazardly without labeling or trunking, simple issues take hours to diagnose. At Osiffa Telecoms, we treat physical cable organization with the same seriousness as digital configuration.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#18181B]/80">
                  <Check size={16} className="text-[#C026D3]" />
                  <span>Color-coded patch cords and labeled patch panels for instant troubleshooting.</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#18181B]/80">
                  <Check size={16} className="text-[#C026D3]" />
                  <span>Durable trunking and conduits that protect cables from physical wear and dust.</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#18181B]/80">
                  <Check size={16} className="text-[#C026D3]" />
                  <span>Full handoff documentation so any IT professional can understand your setup.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] space-y-4">
              <div className="text-xs font-mono font-bold uppercase text-[#18181B] flex items-center gap-2">
                <PhoneCall size={16} className="text-[#C026D3]" />
                Request a Site Assessment
              </div>
              <p className="text-xs sm:text-sm text-[#18181B]/70 leading-relaxed">
                Planning a new office or fed up with intermittent Wi-Fi and tangled cables? Invite our technician for a straightforward site survey.
              </p>
              <Link to={PageRoute.CONTACT} className="block">
                <button className="w-full py-3 rounded-lg bg-[#18181B] hover:bg-[#C026D3] text-white text-xs font-semibold tracking-wide shadow-sm transition-all flex items-center justify-center gap-2">
                  <span>Schedule Site Survey</span>
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-[#E8E2D5] relative overflow-hidden text-center">
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <Reveal>
            <h2 className="text-3xl font-bold text-[#18181B] mb-3 tracking-tight">
              Let's Discuss Your Network Needs
            </h2>
            <p className="text-[#18181B]/70 text-sm sm:text-base mb-8 leading-relaxed">
              We provide tailored quotes based on your exact floor plan, team size, and connectivity requirements.
            </p>
            <Link to={PageRoute.CONTACT}>
              <button className="px-8 py-3.5 rounded-lg bg-[#18181B] hover:bg-[#C026D3] text-white font-semibold text-xs tracking-wide shadow-sm hover:shadow-[0_4px_16px_rgba(192,38,211,0.25)] transition-all duration-300">
                Contact Our Team
              </button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};