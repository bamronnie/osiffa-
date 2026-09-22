import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Globe, 
  RefreshCw, 
  ShieldCheck
} from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  location: string;
  baseLatency: number;
  jitter: number;
  packetLoss: string;
  type: 'Exchange' | 'Subsea' | 'Cloud Peering' | 'Metro Ring';
  status: 'optimal' | 'stable';
}

const INITIAL_NODES: NetworkNode[] = [
  {
    id: 'ixpn-lag',
    name: 'Internet Exchange Point (IXPN)',
    location: 'Lagos, Africa',
    baseLatency: 1.8,
    jitter: 0.2,
    packetLoss: '0.00%',
    type: 'Exchange',
    status: 'optimal'
  },
  {
    id: 'abj-metro-ring',
    name: 'Abuja Primary Metro Core',
    location: 'Abuja CBD, Africa',
    baseLatency: 0.9,
    jitter: 0.1,
    packetLoss: '0.00%',
    type: 'Metro Ring',
    status: 'optimal'
  },
  {
    id: 'wacs-landing',
    name: 'WACS / MainOne Subsea Landing',
    location: 'Atlantic Seaboard, Lagos',
    baseLatency: 3.4,
    jitter: 0.4,
    packetLoss: '0.00%',
    type: 'Subsea',
    status: 'optimal'
  },
  {
    id: 'telehouse-lon',
    name: 'London Telehouse North (THN)',
    location: 'London, United Kingdom',
    baseLatency: 82.5,
    jitter: 1.1,
    packetLoss: '0.00%',
    type: 'Exchange',
    status: 'stable'
  },
  {
    id: 'aws-fra',
    name: 'AWS Direct Connect Cloud Gateway',
    location: 'Frankfurt, Germany',
    baseLatency: 76.8,
    jitter: 0.8,
    packetLoss: '0.00%',
    type: 'Cloud Peering',
    status: 'optimal'
  }
];

export const NocStatusWidget: React.FC = () => {
  const [nodes, setNodes] = useState<NetworkNode[]>(INITIAL_NODES);
  const [isPinging, setIsPinging] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Live (Auto-polling)');

  // Simulate micro-fluctuations in ping latency
  const triggerPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setNodes(prev => prev.map(node => {
        const delta = (Math.random() - 0.5) * 0.4;
        const newLatency = Math.max(0.4, +(node.baseLatency + delta).toFixed(2));
        const newJitter = Math.max(0.05, +(node.jitter + (Math.random() - 0.5) * 0.1).toFixed(2));
        return {
          ...node,
          baseLatency: newLatency,
          jitter: newJitter
        };
      }));
      setIsPinging(false);
      const now = new Date();
      setLastRefreshed(now.toLocaleTimeString());
    }, 600);
  };

  useEffect(() => {
    const interval = setInterval(triggerPing, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white border border-[#E8E2D5] rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden font-sans">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>

      {/* Header bar */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E8E2D5] pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-[#C026D3] animate-pulse"></span>
            <span className="text-xs font-bold text-[#C026D3]">
              Live Network Status
            </span>
            <span className="text-[#18181B]/40">•</span>
            <span className="text-xs text-[#18181B]/70">Regional Core & Exchange Routes</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight">
            Network Performance & Latency Benchmarks
          </h3>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-[#18181B]/60">
            Updated: <span className="text-[#18181B] font-medium">{lastRefreshed}</span>
          </span>

          <button
            onClick={triggerPing}
            disabled={isPinging}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-white border border-[#E8E2D5] text-xs font-medium text-[#18181B] transition-all disabled:opacity-50 shadow-sm"
          >
            <RefreshCw size={13} className={isPinging ? 'animate-spin text-[#C026D3]' : ''} />
            <span>Refresh Status</span>
          </button>
        </div>
      </div>

      {/* Nodes Table / Cards */}
      <div className="relative z-10 space-y-2.5">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] hover:border-[#C026D3]/40 hover:bg-white transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            {/* Node Info */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="h-10 w-10 rounded-lg bg-white border border-[#E8E2D5] flex items-center justify-center text-[#C026D3] flex-shrink-0 shadow-sm">
                <Server size={18} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#18181B] truncate">{node.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#18181B]/70 border border-[#E8E2D5]">
                    {node.type}
                  </span>
                </div>
                <div className="text-xs text-[#18181B]/60 flex items-center gap-1.5 mt-0.5">
                  <Globe size={12} className="text-[#18181B]/40" />
                  <span>{node.location}</span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-6 sm:gap-8 self-end md:self-auto">
              <div className="text-right">
                <div className="text-[11px] text-[#18181B]/60">Latency</div>
                <div className="text-sm font-bold text-[#C026D3] flex items-center justify-end gap-1 font-mono">
                  <span>{node.baseLatency} ms</span>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <div className="text-[11px] text-[#18181B]/60">Jitter</div>
                <div className="text-xs text-[#18181B] font-mono">±{node.jitter} ms</div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-[#18181B]/60">Packet Loss</div>
                <div className="text-xs text-[#18181B] font-mono">{node.packetLoss}</div>
              </div>

              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FDF4FF] border border-[#C026D3]/30 text-[#C026D3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C026D3]"></span>
                  Operational
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between text-xs text-[#18181B]/70 gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#C026D3]" />
          <span>99.999% Core Network Availability · Direct IXPN Peering in Lagos & Abuja</span>
        </div>
        <div className="text-[#18181B]/50 font-mono">
          Autonomous System (ASN 37284)
        </div>
      </div>
    </div>
  );
};
