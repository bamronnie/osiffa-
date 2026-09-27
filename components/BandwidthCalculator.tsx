import React, { useState } from 'react';
import { 
  Users, 
  Cloud, 
  PhoneCall, 
  ShieldCheck, 
  ArrowRight, 
  Gauge, 
  CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const BandwidthCalculator: React.FC = () => {
  const [users, setUsers] = useState<number>(50);
  const [cloudWorkload, setCloudWorkload] = useState<'moderate' | 'heavy' | 'extreme'>('heavy');
  const [voipLines, setVoipLines] = useState<number>(20);
  const [missionCritical, setMissionCritical] = useState<boolean>(true);

  // Dynamic calculations based on enterprise telecom heuristics
  const calculateBandwidth = () => {
    let basePerUser = 2.5; // Mbps symmetrical per typical enterprise user
    if (cloudWorkload === 'heavy') basePerUser = 4.5;
    if (cloudWorkload === 'extreme') basePerUser = 8.0;

    const userBandwidth = users * basePerUser;
    const voipBandwidth = voipLines * 0.15; // SIP G.711 codec overhead with buffer
    const redundancyHeadroom = missionCritical ? 1.4 : 1.15;

    const totalRaw = (userBandwidth + voipBandwidth) * redundancyHeadroom;

    if (totalRaw <= 100) return 100;
    if (totalRaw <= 250) return 250;
    if (totalRaw <= 500) return 500;
    if (totalRaw <= 1000) return 1000;
    if (totalRaw <= 2000) return 2000;
    if (totalRaw <= 5000) return 5000;
    return 10000;
  };

  const recommendedSpeed = calculateBandwidth();
  const speedFormatted = recommendedSpeed >= 1000 
    ? `${recommendedSpeed / 1000} Gbps` 
    : `${recommendedSpeed} Mbps`;

  const slaLevel = missionCritical ? '99.999% Four-Nines SLA' : '99.95% Carrier SLA';
  const topology = recommendedSpeed >= 1000 || missionCritical
    ? 'Dual-Homed BGP Optical Ring with Sub-50ms Self-Healing Failover'
    : 'Direct Symmetrical Optical Drop with Proactive NOC Monitoring';

  return (
    <div className="w-full bg-white border border-[#E8E2D5] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 mb-8 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8E2D5] text-[#C026D3] text-xs font-semibold mb-3">
          <Gauge size={14} className="text-[#C026D3]" />
          <span>Capacity Planning Estimator</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight">
          Bandwidth & Network Sizing Tool
        </h3>
        <p className="text-[#18181B]/70 text-sm mt-1 max-w-2xl">
          Estimate the dedicated bandwidth and SLA parameters tailored for your team size, cloud workflows, and voice telephony requirements.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          
          {/* Mobile Live Speed Badge */}
          <div className="lg:hidden p-3.5 rounded-xl bg-[#FAF7F2] border border-[#C026D3]/40 flex items-center justify-between shadow-sm">
            <div className="text-xs font-semibold text-[#18181B]">
              <span>Real-Time Estimate:</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-[#C026D3]">{speedFormatted}</span>
              <span className="text-[10px] text-[#18181B]/60 font-mono">1:1 Dedicated</span>
            </div>
          </div>

          {/* Workstations / Users Slider */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#18181B] flex items-center gap-2">
                <Users size={16} className="text-[#C026D3]" />
                <span>Staff & Endpoints</span>
              </label>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#C026D3] px-2.5 py-0.5 rounded bg-white border border-[#E8E2D5] shadow-sm">
                {users} Users
              </span>
            </div>

            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={users}
              aria-label="Number of concurrent users"
              onChange={(e) => setUsers(Number(e.target.value))}
              className="w-full h-3 bg-[#E8E2D5] rounded-lg appearance-none cursor-pointer accent-[#C026D3] py-2"
            />
            <div className="flex justify-between text-[10px] text-[#18181B]/50 font-mono">
              <span>10 (Branch)</span>
              <span>150 (Mid-Enterprise)</span>
              <span>500+ (Campus)</span>
            </div>
          </div>

          {/* Cloud Workload Intensity */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#18181B] flex items-center gap-2">
              <Cloud size={16} className="text-[#C026D3]" />
              <span>Cloud & Data Intensity</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { key: 'moderate', title: 'Standard SaaS', desc: 'Email, Docs, ERP' },
                { key: 'heavy', title: 'Heavy Sync', desc: 'Video, DB, Backups' },
                { key: 'extreme', title: 'Mission Critical', desc: 'Real-time Feeds, High I/O' }
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setCloudWorkload(item.key as any)}
                  className={`p-3 rounded-xl text-left border transition-all active:scale-95 ${
                    cloudWorkload === item.key
                      ? 'bg-white border-[#C026D3] text-[#18181B] shadow-sm font-semibold'
                      : 'bg-white/60 border-[#E8E2D5] text-[#18181B]/70 hover:text-[#18181B] hover:bg-white'
                  }`}
                >
                  <div className="text-xs font-semibold">{item.title}</div>
                  <div className="text-[10px] text-[#18181B]/50 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* VoIP Lines & Telephony */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#18181B] flex items-center gap-2">
                <PhoneCall size={16} className="text-[#C026D3]" />
                <span>Simultaneous SIP Voice Channels</span>
              </label>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#C026D3] px-2.5 py-0.5 rounded bg-white border border-[#E8E2D5] shadow-sm">
                {voipLines} Channels
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="150"
              step="5"
              value={voipLines}
              aria-label="Simultaneous SIP Voice Channels"
              onChange={(e) => setVoipLines(Number(e.target.value))}
              className="w-full h-3 bg-[#E8E2D5] rounded-lg appearance-none cursor-pointer accent-[#C026D3] py-2"
            />
          </div>

          {/* Mission Critical Toggle */}
          <div 
            onClick={() => setMissionCritical(!missionCritical)}
            className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] hover:border-[#C026D3]/40 cursor-pointer flex items-center justify-between transition-colors active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className={missionCritical ? 'text-[#C026D3]' : 'text-[#18181B]/40'} />
              <div>
                <div className="text-xs font-bold text-[#18181B]">Carrier 99.999% Dual-Homed SLA</div>
                <div className="text-[11px] text-[#18181B]/60">Includes automatic multi-carrier BGP failover & SLA credits</div>
              </div>
            </div>

            <div
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ml-3 ${
                missionCritical ? 'bg-[#C026D3]' : 'bg-[#D4CEBF]'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  missionCritical ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Calculation Output Card */}
        <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#E8E2D5] rounded-xl p-6 sm:p-8 shadow-sm relative">
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#C026D3] font-bold block mb-1">
                Recommended Bandwidth
              </span>
              <div className="text-4xl sm:text-5xl font-black tracking-tight flex items-baseline gap-2">
                <span className="text-[#18181B]">{speedFormatted}</span>
                <span className="text-xs text-[#C026D3] font-mono font-semibold">1:1 Symmetrical</span>
              </div>
              <p className="text-xs text-[#18181B]/70 mt-1">
                Dedicated uncontended bandwidth with matching upload and download speeds.
              </p>
            </div>

            {/* Architecture Details */}
            <div className="space-y-3 pt-4 border-t border-[#E8E2D5]">
              <div className="flex items-start gap-3 text-xs text-[#18181B]/80">
                <CheckCircle2 size={16} className="text-[#C026D3] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#18181B] block">SLA Commitment:</strong>
                  {slaLevel}
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#18181B]/80">
                <CheckCircle2 size={16} className="text-[#C026D3] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#18181B] block">Network Topology:</strong>
                  {topology}
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-[#18181B]/80">
                <CheckCircle2 size={16} className="text-[#C026D3] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#18181B] block">Optical Redundancy:</strong>
                  Carrier-neutral dual path with automated failover
                </div>
              </div>
            </div>

            {/* Live Spec Tags */}
            <div className="pt-4 border-t border-[#E8E2D5] text-[11px] font-mono text-[#18181B]/60 space-y-1.5">
              <div className="flex justify-between">
                <span>IP Addressing:</span>
                <span className="text-[#18181B] font-medium">Dedicated Static IPv4 & IPv6</span>
              </div>
              <div className="flex justify-between">
                <span>BGP Routing:</span>
                <span className="text-[#18181B] font-medium">Autonomous System (ASN 37284)</span>
              </div>
              <div className="flex justify-between">
                <span>Local Ring Latency:</span>
                <span className="text-[#C026D3] font-semibold">&lt; 3.5ms Symmetrical</span>
              </div>
            </div>

            {/* Instant Action */}
            <Link to="/contact">
              <button className="w-full py-3 px-6 rounded-lg bg-[#18181B] hover:bg-[#C026D3] text-white font-semibold text-xs tracking-wider shadow-sm hover:shadow-[0_4px_16px_rgba(192,38,211,0.25)] transition-all duration-300 flex items-center justify-center gap-2 group">
                <span>Request Custom Proposal</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
