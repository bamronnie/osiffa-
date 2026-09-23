import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Radio, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Building
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { ConnectiveWeb } from '../components/ConnectiveWeb';

export const Contact: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [inquiryType, setInquiryType] = useState('Complete Office Network Setup');
  const [teamSize, setTeamSize] = useState('11 - 25 Users');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const inquiryOptions = [
    'Complete Office Network Setup',
    'Business Internet & Dedicated Connectivity',
    'Structured Cabling & Rack Organization',
    'Commercial Wi-Fi & Mesh Coverage',
    'Router, Switch & Firewall Configuration',
    'IT Hardware Procurement & Workstations',
    'Custom Business Software & ERP Systems',
    'Network Maintenance & Troubleshooting',
    'Schedule a Physical Site Assessment'
  ];

  const teamSizes = [
    '1 - 10 Users',
    '11 - 25 Users',
    '26 - 50 Users',
    '50+ Users'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setTimeout(() => {
        setStatus('success');
      }, 1000);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: `${firstName} ${lastName}`,
          organization: organization,
          email: email,
          phone: phone,
          subject: `NEW INQUIRY: ${inquiryType} (${locationCity})`,
          from_name: "Osiffa Telecoms Inquiries",
          message: `Sender: ${firstName} ${lastName}\nOrganization: ${organization}\nLocation: ${locationCity}\nEmail: ${email}\nPhone: ${phone}\nInquiry: ${inquiryType}\nTeam Size: ${teamSize}\n\nMessage:\n${message}`
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setOrganization('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMessage(data.message || "Failed to send message. Please check your network or try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage("Network error: Unable to send message. Please contact us directly via email.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#18181B] relative flex flex-col overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none z-0"></div>

      {/* Hero Header */}
      <section className="bg-[#FAF7F2] text-[#18181B] py-24 relative overflow-hidden border-b border-[#E8E2D5]">
        {/* Connective Web Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ConnectiveWeb theme="light" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D5] text-[#C026D3] text-xs font-semibold mb-4 shadow-sm">
              <Radio size={14} className="text-[#C026D3]" />
              <span>Direct Inquiries & Site Surveys</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#18181B] mb-4">
              Get in Touch With Us
            </h1>
            <p className="mt-2 text-[#18181B]/70 max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed">
              Request a free quote, schedule an on-site office assessment, or speak directly with our technicians.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Form & Directory Section */}
      <div className="relative z-10 flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal delay={150}>
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto border border-[#E8E2D5]">
              
              {/* Contact Info Sidebar in Deep Black */}
              <div className="bg-[#18181B] p-8 sm:p-10 lg:w-5/12 text-[#FAF7F2] relative overflow-hidden flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#27272A]">
                <div className="relative z-10 space-y-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C026D3] block mb-1 font-mono">
                      Direct Contact
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Speak With Our Team
                    </h3>
                    <p className="text-xs text-[#FAF7F2]/70 mt-2 leading-relaxed">
                      We respond promptly to all new project inquiries, site assessment requests, and support calls.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/10 text-[#C026D3] flex items-center justify-center flex-shrink-0">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase text-[#FAF7F2]/60 font-semibold tracking-wider">Email Inquiries</p>
                        <a href="mailto:info@osiffatelecoms.com" className="text-sm font-semibold text-white hover:text-[#C026D3] transition-colors block">
                          info@osiffatelecoms.com
                        </a>
                      </div>
                    </div>

                    {/* Locations */}
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/10 text-[#C026D3] flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase text-[#FAF7F2]/60 font-semibold tracking-wider">Service Coverage</p>
                        <p className="text-sm font-medium text-white">Africa</p>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/10 text-[#C026D3] flex items-center justify-center flex-shrink-0">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase text-[#FAF7F2]/60 font-semibold tracking-wider">Working Hours</p>
                        <p className="text-sm font-medium text-white">Monday – Friday: 8am – 6pm</p>
                        <p className="text-xs text-[#FAF7F2]/60">Saturday: 9am – 2pm</p>
                      </div>
                    </div>
                  </div>

                  {/* Trust Box */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-[#FAF7F2]/80 space-y-2">
                    <div className="font-semibold text-white flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#C026D3]" />
                      <span>CAC Registered Company</span>
                    </div>
                    <p className="text-[11px] text-[#FAF7F2]/60 leading-relaxed">
                      Osiffa Telecoms Nigeria Limited (RC 1276063). Delivering structured cabling, commercial Wi-Fi, and business internet solutions across Africa since 2015.
                    </p>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="p-8 sm:p-12 lg:w-7/12 bg-white">
                {status === 'success' ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 bg-[#FAF7F2] border border-[#E8E2D5] text-[#C026D3] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#18181B]">Message Received</h3>
                    <p className="text-sm text-[#18181B]/70 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. A technician or sales specialist from Osiffa Telecoms will review your requirements and respond within 1 business day.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-4 px-6 py-2.5 rounded-lg bg-[#18181B] hover:bg-[#C026D3] text-white text-xs font-semibold transition-all shadow-sm"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#18181B] tracking-tight mb-1">
                        Tell Us About Your Project
                      </h3>
                      <p className="text-xs text-[#18181B]/60">
                        Fill out the details below and we’ll get back to you with a clear proposal.
                      </p>
                    </div>

                    {status === 'error' && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
                        <AlertCircle size={16} className="shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#18181B] mb-1.5">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="e.g. Samuel"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] text-xs text-[#18181B] placeholder-[#18181B]/40 focus:outline-none focus:border-[#C026D3] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#18181B] mb-1.5">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="e.g. Adeleke"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] text-xs text-[#18181B] placeholder-[#18181B]/40 focus:outline-none focus:border-[#C026D3] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#18181B] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="samuel@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] text-xs text-[#18181B] placeholder-[#18181B]/40 focus:outline-none focus:border-[#C026D3] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#18181B] mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0801 234 5678"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] text-xs text-[#18181B] placeholder-[#18181B]/40 focus:outline-none focus:border-[#C026D3] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#18181B] mb-1.5">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="e.g. Apex Chambers"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] text-xs text-[#18181B] placeholder-[#18181B]/40 focus:outline-none focus:border-[#C026D3] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#18181B] mb-1.5">
                          City / State
                        </label>
                        <input
                          type="text"
                          value={locationCity}
                          onChange={(e) => setLocationCity(e.target.value)}
                          placeholder="e.g. Your City / State"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] text-xs text-[#18181B] placeholder-[#18181B]/40 focus:outline-none focus:border-[#C026D3] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#18181B] mb-1.5">
                          Service Required
                        </label>
                        <select
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] text-xs text-[#18181B] focus:outline-none focus:border-[#C026D3] transition-colors"
                        >
                          {inquiryOptions.map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#18181B] mb-1.5">
                          Workstations / Users
                        </label>
                        <select
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] text-xs text-[#18181B] focus:outline-none focus:border-[#C026D3] transition-colors"
                        >
                          {teamSizes.map((ts, i) => (
                            <option key={i} value={ts}>{ts}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#18181B] mb-1.5">
                        Brief Details / Current Challenge
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your space (e.g. number of rooms, current internet issues, or when you are planning to move in)..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] text-xs text-[#18181B] placeholder-[#18181B]/40 focus:outline-none focus:border-[#C026D3] transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-3.5 rounded-xl bg-[#18181B] hover:bg-[#C026D3] text-white text-xs font-semibold tracking-wide shadow-sm hover:shadow-[0_4px_16px_rgba(192,38,211,0.25)] transition-all flex items-center justify-center gap-2"
                    >
                      {status === 'submitting' ? (
                        <span>Submitting Your Inquiry...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry / Request Quote</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </div>
  );
};