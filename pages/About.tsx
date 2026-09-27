import React from 'react';
import { Reveal } from '../components/Reveal';
import { ConnectiveWeb } from '../components/ConnectiveWeb';
import { 
  Building2, 
  Users2, 
  ShieldCheck, 
  Wrench, 
  Heart, 
  Compass, 
  Sparkles, 
  Award,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';

export const About: React.FC = () => {
  const milestones = [
    { 
      year: "2015", 
      title: "CAC Incorporation", 
      desc: "Osiffa Telecoms Nigeria Limited (OSNL) formally registered with the Corporate Affairs Commission (CAC RC 1276063) to deliver professional telecommunications and I.T engineering services." 
    },
    { 
      year: "2018", 
      title: "Office Networking & Structured Cabling", 
      desc: "Expanded services into commercial structured cabling, server rack organization, and enterprise Wi-Fi installations for growing companies and institutions." 
    },
    { 
      year: "2021", 
      title: "Integrated Network Management", 
      desc: "Introduced on-demand maintenance and managed networking support, helping local businesses troubleshoot connectivity and maintain uptime." 
    },
    { 
      year: "Present", 
      title: "Integrated Network & IT Solutions", 
      desc: "Deploying dependable business networking, structured cabling, IT hardware procurement, and custom business software solutions across Africa." 
    }
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Workmanship & Standards",
      desc: "We take pride in neat cable trunking, clean label identification, and certified terminations. Clean physical infrastructure prevents 90% of future network headaches."
    },
    {
      icon: Users2,
      title: "Direct Accountability",
      desc: "No call-center runaround. When you work with Osiffa, you deal directly with the engineers and field technicians responsible for your setup."
    },
    {
      icon: Wrench,
      title: "Practical, Sized Solutions",
      desc: "We don't oversell overly complex equipment you don't need. We evaluate your actual team size and workflows to provide practical, cost-effective technology."
    },
    {
      icon: Compass,
      title: "Local Presence",
      desc: "With experienced field technicians, we are positioned to conduct fast on-site surveys and provide hands-on emergency assistance."
    },
    {
      icon: Heart,
      title: "Long-Term Relationship",
      desc: "We don't disappear after installation. We provide clear documentation, staff walkthroughs, and responsive ongoing maintenance whenever you need us."
    },
    {
      icon: Sparkles,
      title: "Transparent Pricing",
      desc: "Detailed, itemized quotations covering equipment, cabling materials, and labor with zero hidden surprises or arbitrary charges."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#18181B] relative overflow-hidden">
      {/* Background Cyber Grid Accent */}
      <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative bg-[#FAF7F2] text-[#18181B] py-16 sm:py-24 md:py-28 overflow-hidden border-b border-[#E8E2D5]">
        {/* Connective Web Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ConnectiveWeb theme="light" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-[#E8E2D5] text-[#C026D3] text-[11px] sm:text-xs font-semibold mb-5 sm:mb-6 shadow-sm">
              <Award size={14} className="text-[#C026D3] shrink-0" />
              <span>Incorporated July 2015 · CAC RC 1276063</span>
            </div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-[#18181B] leading-tight">
              About Osiffa <br className="hidden sm:inline" />
              <span className="text-[#C026D3]">
                Telecoms
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-sm sm:text-base md:text-lg text-[#18181B]/70 max-w-3xl mx-auto leading-relaxed font-normal">
              An indigenous African telecommunications and IT engineering company committed to delivering dependable business internet, structured cabling, and hands-on networking support.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Corporate Profile & Story */}
      <section id="corporate-profile" className="py-14 sm:py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mb-16 sm:mb-24">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <Reveal>
              <div className="space-y-2.5 sm:space-y-3">
                <span className="text-xs font-bold tracking-wider text-[#C026D3] uppercase block font-mono">
                  Who We Are
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#18181B]">
                  Osiffa Telecoms (Nig.) Ltd
                </h2>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-[#18181B]/75 text-sm sm:text-base leading-relaxed">
                Osiffa Telecoms Nigeria Limited (OSNL) was incorporated in July 2015 with the Corporate Affairs Commission (CAC) to provide professional telecommunications, networking, and IT infrastructure services across Africa.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-[#18181B]/75 text-sm sm:text-base leading-relaxed">
                Over the years, we have built our reputation on practical, clean engineering. Rather than relying on oversized promises, we focus on what businesses actually need every single day: reliable internet connections, neatly trunked cables, dead-zone-free Wi-Fi, genuine IT hardware supply, and custom software tools with honest technicians who pick up the phone when support is required.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E8E2D5] text-xs text-[#18181B] font-mono leading-relaxed shadow-sm">
                "Our mission is simple: keep your office connected cleanly and reliably, with responsive local support you can always count on."
              </div>
            </Reveal>
          </div>

          {/* Right Credentials Cards */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal delay={150}>
              <div className="p-6 rounded-xl bg-white border border-[#E8E2D5] hover:border-[#C026D3]/50 transition-all shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-11 w-11 rounded-lg bg-[#FAF7F2] border border-[#E8E2D5] text-[#C026D3] flex items-center justify-center flex-shrink-0">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#18181B] text-sm">CAC Registered Company</h4>
                    <p className="text-xs text-[#18181B]/60 font-mono">Incorporated July 2015 • RC 1276063</p>
                  </div>
                </div>
                <p className="text-[#18181B]/70 text-xs leading-relaxed">
                  Formally incorporated under the laws of the Federal Republic of Nigeria to provide telecommunications and computer networking services.
                </p>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="p-6 rounded-xl bg-white border border-[#E8E2D5] hover:border-[#C026D3]/50 transition-all shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-11 w-11 rounded-lg bg-[#FAF7F2] border border-[#E8E2D5] text-[#C026D3] flex items-center justify-center flex-shrink-0">
                    <Users2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#18181B] text-sm">Experienced Technicians</h4>
                    <p className="text-xs text-[#18181B]/60 font-mono">Hands-On Field Experience</p>
                  </div>
                </div>
                <p className="text-[#18181B]/70 text-xs leading-relaxed">
                  Our team possesses hands-on experience in structured cabling, Cat6/Cat6A termination, rack management, and commercial Wi-Fi configuration.
                </p>
              </div>
            </Reveal>

            <Reveal delay={350}>
              <div className="p-6 rounded-xl bg-white border border-[#E8E2D5] hover:border-[#C026D3]/50 transition-all shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-11 w-11 rounded-lg bg-[#FAF7F2] border border-[#E8E2D5] text-[#C026D3] flex items-center justify-center flex-shrink-0">
                    <Compass size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#18181B] text-sm">Pan-African Reach</h4>
                    <p className="text-xs text-[#18181B]/60 font-mono">On-Site Surveys & Deployments</p>
                  </div>
                </div>
                <p className="text-[#18181B]/70 text-xs leading-relaxed">
                  Conducting physical on-site assessments and network installations across commercial districts and business premises in Africa.
                </p>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Timeline of Expansion */}
        <div className="mb-16 sm:mb-24">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <span className="text-xs font-bold tracking-[0.25em] text-[#C026D3] uppercase block mb-2 font-mono">
                Our Journey
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18181B] tracking-tight">
                Steady Growth Built on Quality
              </h3>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {milestones.map((m, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E8E2D5] relative h-full flex flex-col justify-between hover:border-[#C026D3]/50 transition-all shadow-sm">
                  <div>
                    <span className="text-2xl font-bold font-mono text-[#C026D3] block mb-2">
                      {m.year}
                    </span>
                    <h4 className="text-base font-bold text-[#18181B] mb-2">
                      {m.title}
                    </h4>
                    <p className="text-[#18181B]/70 text-xs leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E8E2D5] flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#C026D3]">
                    <CheckCircle2 size={12} />
                    <span>MILESTONE</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="mb-16 sm:mb-24">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <span className="text-xs font-bold tracking-[0.25em] text-[#C026D3] uppercase block mb-2 font-mono">
                Core Principles
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18181B] tracking-tight">
                Why Clients Choose to Work With Us
              </h3>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pillars.map((pillar, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E8E2D5] hover:border-[#C026D3]/50 transition-all h-full shadow-sm">
                  <div className="h-10 w-10 rounded-lg bg-[#FAF7F2] border border-[#E8E2D5] text-[#C026D3] flex items-center justify-center mb-4">
                    <pillar.icon size={20} />
                  </div>
                  <h4 className="text-base font-bold text-[#18181B] mb-2 tracking-wide">
                    {pillar.title}
                  </h4>
                  <p className="text-[#18181B]/70 text-xs leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Local Support Banner */}
        <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-white border border-[#E8E2D5] shadow-sm flex flex-col md:flex-row items-stretch sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="text-lg sm:text-xl font-bold text-[#18181B]">Have a Question About Your Office Networking?</h4>
            <p className="text-xs sm:text-sm text-[#18181B]/70 max-w-xl leading-relaxed">
              Whether you are moving into a new office, adding new workstations, or need your server rack organized, we are here to help.
            </p>
          </div>
          <div className="shrink-0 w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <a 
              href="tel:08089646456" 
              className="px-5 py-3 rounded-lg bg-white border border-[#E8E2D5] text-[#18181B] hover:text-[#C026D3] text-xs font-mono font-semibold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
            >
              <PhoneCall size={14} className="text-[#C026D3]" />
              <span>08089646456</span>
            </a>
            <Link to={PageRoute.CONTACT} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#18181B] hover:bg-[#C026D3] text-white text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2">
                <span>Speak With Our Team</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-white border-t border-[#E8E2D5] relative overflow-hidden text-center">
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#18181B] mb-3 tracking-tight">
              Ready to Work Together?
            </h2>
            <p className="text-[#18181B]/70 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              Contact us today to schedule a site inspection or request a personalized quote.
            </p>
            <Link to={PageRoute.CONTACT} className="inline-block w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#18181B] hover:bg-[#C026D3] text-white font-semibold text-xs tracking-wide shadow-sm hover:shadow-[0_4px_16px_rgba(192,38,211,0.25)] transition-all duration-300">
                Contact Our Team
              </button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
