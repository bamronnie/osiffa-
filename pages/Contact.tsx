import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export const Contact: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Enterprise Transit (Dedicated Fiber/Cloud)');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      // Providing an informational warning when access key is missing so they understand how to test
      setTimeout(() => {
        setStatus('error');
        setErrorMessage('Web3Forms Access Key is missing. To receive actual contact emails, please get a free key from web3forms.com and set the VITE_WEB3FORMS_ACCESS_KEY variable in your project configuration.');
      }, 1200);
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
          email: email,
          subject: `NEW OSIFFA TELECOMS INQUIRY: ${inquiryType}`,
          from_name: "Osiffa Telecoms Portal",
          message: `Sender: ${firstName} ${lastName}\nEmail: ${email}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMessage(data.message || "Failed to transmit message securely. Please confirm your Web3Forms token is valid.");
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage("Network connection error: Unable to transmit package. Please check your connectivity or try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 relative flex flex-col">
      {/* Background Map in Light Theme */}
      <div className="absolute inset-0 z-0 bg-slate-100">
         <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
            alt="Map Background" 
            className="w-full h-full object-cover opacity-10 grayscale"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-slate-100/90 via-slate-50/80 to-zinc-50 h-2/3"></div>
      </div>

      <div className="relative z-10 flex-grow pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-[0.3em] text-brand-600 uppercase block mb-3">Abuja Headquarters</span>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight uppercase text-slate-900">Get in Touch</h1>
              <p className="mt-4 text-slate-600 max-w-xl mx-auto text-base">
                 Connect with our carrier network engineers and infrastructure planners.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto border border-zinc-200/50">
              
              {/* Contact Info Sidebar */}
              <div className="bg-zinc-950 p-10 lg:w-1/3 text-white relative overflow-hidden flex flex-col justify-between border-r border-zinc-900">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[100px]"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-8 tracking-tight uppercase">Office Directory</h3>
                  <div className="space-y-8">
                    <div className="flex items-start group">
                      <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 text-brand-400 flex items-center justify-center mr-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                         <Mail size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Email</p>
                        <p className="font-medium text-sm"><a href="mailto:info@osiffatelecoms.com" className="hover:text-brand-400 transition-colors">info@osiffatelecoms.com</a></p>
                        <p className="font-medium text-xs text-zinc-400 mt-0.5"><a href="mailto:sales@osiffatelecoms.com" className="hover:text-brand-400 transition-colors">sales@osiffatelecoms.com</a></p>
                      </div>
                    </div>
                    <div className="flex items-start group">
                      <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 text-brand-400 flex items-center justify-center mr-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                         <Phone size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Phone</p>
                        <p className="font-medium text-sm"><a href="tel:+2348089646456" className="hover:text-brand-400 transition-colors">+234 808 964 6456</a></p>
                        <p className="text-xs text-zinc-500 mt-0.5">Mon-Fri, 8am - 6pm GMT+1</p>
                      </div>
                    </div>
                    <div className="flex items-start group">
                      <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 text-brand-400 flex items-center justify-center mr-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                         <MapPin size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Headquarters</p>
                        <p className="font-medium text-sm text-zinc-200">Behind Rogel Brooks Hotel & Suites,</p>
                        <p className="font-medium text-xs text-zinc-400 mt-0.5">Plot 1143A, Adebivi Olatoke Street,</p>
                        <p className="font-medium text-xs text-zinc-400">Off Ajose Adeogun Street,</p>
                        <p className="font-medium text-xs text-zinc-400">Utako Jabi, Abuja</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="p-10 lg:w-2/3 bg-white">
                {status === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="h-16 w-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 animate-bounce">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-2">Transmission Successful</h3>
                    <p className="text-zinc-500 mb-8 max-w-sm text-sm">Your secure contact transmission was sent successfully to our system mailbox. We will reach out within 12 business hours.</p>
                    <Button variant="outline" className="rounded-full px-6" onClick={() => setStatus('idle')}>Send New Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {status === 'error' && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-semibold">
                          <svg className="w-5 h-5 flex-shrink-0 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span>Configuration Alert</span>
                        </div>
                        <p>{errorMessage}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">First Name</label>
                        <input 
                          type="text" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm text-zinc-900" 
                          placeholder="Jane" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Last Name</label>
                        <input 
                          type="text" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm text-zinc-900" 
                          placeholder="Doe" 
                          required 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm text-zinc-900" 
                        placeholder="jane@company.com" 
                        required 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Inquiry Type</label>
                      <div className="relative">
                        <select 
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm text-zinc-800 appearance-none cursor-pointer"
                        >
                          <option>Enterprise Transit (Dedicated Fiber/Cloud)</option>
                          <option>Symmetric High-Speed Business Broadband</option>
                          <option>Hardware Procurement & Solutions</option>
                          <option>IP virtualized Exchange Network Designs</option>
                          <option>General Support / Consultation Query</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-zinc-500">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Detailed Specifications</label>
                      <textarea 
                        rows={4} 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm text-zinc-900 resize-none" 
                        placeholder="Provide link capacity, site locations, or system requirements..." 
                        required
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-all font-semibold">
                        {status === 'submitting' ? 'Transmitting Tunnel Securely...' : 'Transmit Specification'}
                      </Button>
                    </div>
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