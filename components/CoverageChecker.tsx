import React, { useState } from 'react';
import { 
  MapPin, 
  ArrowRight, 
  Search, 
  Layers, 
  AlertCircle,
  Radio
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DistrictCoverage {
  id: string;
  name: string;
  state: 'Abuja (FCT)' | 'Lagos' | 'Rivers' | 'Kano';
  status: 'active' | 'expanding' | 'custom_build';
  trunkSpeed: string;
  latency: string;
  provisionTime: string;
  notes: string;
}

const DISTRICTS: DistrictCoverage[] = [
  {
    id: 'abj-cbd',
    name: 'Central Business District (CBD)',
    state: 'Abuja (FCT)',
    status: 'active',
    trunkSpeed: 'Up to 10 Gbps',
    latency: '< 1.8 ms',
    provisionTime: '24 - 48 hrs',
    notes: 'Direct dark fiber splice to Federal Ministries & Financial Core'
  },
  {
    id: 'abj-maitama',
    name: 'Maitama District',
    state: 'Abuja (FCT)',
    status: 'active',
    trunkSpeed: 'Up to 10 Gbps',
    latency: '< 2.1 ms',
    provisionTime: '48 hrs',
    notes: 'Carrier-redundant ring with embassy & diplomatic corridor'
  },
  {
    id: 'abj-wuse',
    name: 'Wuse II & Commercial Hub',
    state: 'Abuja (FCT)',
    status: 'active',
    trunkSpeed: 'Up to 5 Gbps',
    latency: '< 2.4 ms',
    provisionTime: '48 hrs',
    notes: 'Dense GPON fiber distribution & enterprise business loops'
  },
  {
    id: 'abj-garki',
    name: 'Garki Area 1 - 11',
    state: 'Abuja (FCT)',
    status: 'active',
    trunkSpeed: 'Up to 5 Gbps',
    latency: '< 2.6 ms',
    provisionTime: '48 - 72 hrs',
    notes: 'Dual-homed feeder lines covering corporate headquarters'
  },
  {
    id: 'abj-jabi',
    name: 'Jabi & Utako Lake Corridor',
    state: 'Abuja (FCT)',
    status: 'active',
    trunkSpeed: 'Up to 2.5 Gbps',
    latency: '< 3.1 ms',
    provisionTime: '3 - 5 days',
    notes: 'High-density aerial & underground optical stringing'
  },
  {
    id: 'abj-gwarinpa',
    name: 'Gwarinpa Estate',
    state: 'Abuja (FCT)',
    status: 'active',
    trunkSpeed: 'Up to 2.5 Gbps',
    latency: '< 3.4 ms',
    provisionTime: '3 - 5 days',
    notes: 'FTTX residential & SME fiber backbone available'
  },
  {
    id: 'lag-vi',
    name: 'Victoria Island (Financial Axis)',
    state: 'Lagos',
    status: 'active',
    trunkSpeed: 'Up to 40 Gbps',
    latency: '< 1.2 ms to IXPN',
    provisionTime: '24 - 48 hrs',
    notes: 'Direct subsea landing cross-connect & Tier-3 peering'
  },
  {
    id: 'lag-ikoyi',
    name: 'Ikoyi & Banana Island',
    state: 'Lagos',
    status: 'active',
    trunkSpeed: 'Up to 10 Gbps',
    latency: '< 1.5 ms',
    provisionTime: '48 hrs',
    notes: 'Protected dark fiber rings for executive headquarters'
  },
  {
    id: 'lag-ikeja',
    name: 'Ikeja GRA & Industrial Zone',
    state: 'Lagos',
    status: 'active',
    trunkSpeed: 'Up to 10 Gbps',
    latency: '< 2.0 ms',
    provisionTime: '48 - 72 hrs',
    notes: 'Industrial park optical transport & failover gateways'
  },
  {
    id: 'lag-lekki',
    name: 'Lekki Phase 1 & Expressway',
    state: 'Lagos',
    status: 'active',
    trunkSpeed: 'Up to 5 Gbps',
    latency: '< 2.2 ms',
    provisionTime: '48 - 72 hrs',
    notes: 'Tech corridor fiber trunk with multi-tenant buildings'
  },
  {
    id: 'ph-trans-amadi',
    name: 'Trans-Amadi Industrial Layout',
    state: 'Rivers',
    status: 'expanding',
    trunkSpeed: 'Up to 2.5 Gbps',
    latency: '< 4.5 ms',
    provisionTime: '5 - 7 days',
    notes: 'Oil & gas enterprise dedicated links under active deployment'
  }
];

export const CoverageChecker: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictCoverage>(DISTRICTS[0]);

  const filteredDistricts = DISTRICTS.filter(d => {
    const matchesState = selectedState === 'All' || d.state === selectedState;
    const matchesQuery = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         d.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesQuery;
  });

  return (
    <div className="w-full bg-white border border-[#E8E2D5] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 mb-8 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8E2D5] text-[#C026D3] text-xs font-semibold mb-3">
          <Radio size={14} className="text-[#C026D3]" />
          <span>Network Coverage</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight">
          Fiber Coverage & Route Availability
        </h3>
        <p className="text-[#18181B]/70 text-sm mt-1 max-w-2xl">
          Check dedicated fiber availability, route proximity, and estimated lead times across major commercial districts in Abuja and Lagos.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
        {/* Search input */}
        <div className="md:col-span-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#18181B]/40" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search district, estate, or landmark (e.g. Maitama, VI, Garki)..."
            className="w-full pl-11 pr-4 py-3 sm:py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] text-[#18181B] placeholder-[#18181B]/40 text-base sm:text-sm focus:outline-none focus:border-[#C026D3] transition-all font-sans"
          />
        </div>

        {/* State selector */}
        <div className="md:col-span-4 flex gap-1.5 p-1 bg-[#FAF7F2] border border-[#E8E2D5] rounded-xl">
          {['All', 'Abuja (FCT)', 'Lagos'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium transition-all active:scale-95 ${
                selectedState === st
                  ? 'bg-[#18181B] text-white shadow-sm font-semibold'
                  : 'text-[#18181B]/70 hover:text-[#C026D3] hover:bg-white'
              }`}
            >
              {st === 'Abuja (FCT)' ? 'Abuja' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Districts List + Selected District Detail Card */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* District selector list */}
        <div className="lg:col-span-6 space-y-2 max-h-[380px] overflow-y-auto pr-1 sm:pr-2 touch-scroll">
          {filteredDistricts.length === 0 ? (
            <div className="p-8 text-center text-[#18181B]/70 bg-[#FAF7F2] rounded-xl border border-[#E8E2D5]">
              <AlertCircle className="mx-auto mb-2 text-[#C026D3]" size={24} />
              <p className="text-sm font-medium text-[#18181B]">No exact district matched your query.</p>
              <p className="text-xs text-[#18181B]/60 mt-1">Our engineering team can deploy a dedicated optical spur to your exact coordinates.</p>
              <Link to="/contact">
                <button className="mt-4 px-4 py-2 text-xs font-semibold text-[#C026D3] bg-white border border-[#E8E2D5] rounded-lg hover:border-[#C026D3] transition-all">
                  Request Custom Fiber Feasibility Survey
                </button>
              </Link>
            </div>
          ) : (
            filteredDistricts.map((district) => {
              const isSelected = selectedDistrict.id === district.id;
              return (
                <div
                  key={district.id}
                  onClick={() => setSelectedDistrict(district)}
                  className={`p-3 sm:p-3.5 rounded-xl cursor-pointer border transition-all flex items-center justify-between active:scale-[0.99] ${
                    isSelected
                      ? 'bg-[#FAF7F2] border-[#C026D3] shadow-sm text-[#18181B]'
                      : 'bg-white border-[#E8E2D5] hover:bg-[#FAF7F2] hover:border-[#C026D3]/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      isSelected ? 'bg-[#18181B] text-white' : 'bg-[#FAF7F2] text-[#18181B]/70'
                    }`}>
                      <MapPin size={15} />
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs sm:text-sm font-semibold truncate text-[#18181B]">
                        {district.name}
                      </h4>
                      <span className="text-[10px] sm:text-[11px] text-[#18181B]/60 font-mono">
                        {district.state} • {district.trunkSpeed}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right ml-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium bg-[#FDF4FF] border border-[#C026D3]/30 text-[#C026D3]">
                      Fiber Active
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Live Feasibility Telemetry Card */}
        <div className="lg:col-span-6 bg-[#FAF7F2] border border-[#E8E2D5] rounded-xl p-5 sm:p-6 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4 mb-4 gap-2">
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-[#C026D3] uppercase tracking-wider block">
                  Coverage Details
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-[#18181B] mt-0.5 truncate">
                  {selectedDistrict.name}
                </h4>
              </div>

              <div className="px-2.5 sm:px-3 py-1 rounded-full bg-[#FDF4FF] border border-[#C026D3]/30 text-[#C026D3] text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 shrink-0">
                <span className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-[#C026D3] animate-pulse"></span>
                <span>Fiber Ready</span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
              <div className="p-2.5 sm:p-3 rounded-lg bg-white border border-[#E8E2D5] shadow-sm">
                <div className="text-[9px] sm:text-[10px] text-[#18181B]/60 font-mono uppercase truncate">Max Capacity</div>
                <div className="text-xs sm:text-base font-bold text-[#18181B] mt-0.5 truncate">{selectedDistrict.trunkSpeed}</div>
                <div className="text-[9px] sm:text-[10px] text-[#C026D3] font-mono font-medium">Symmetrical</div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-white border border-[#E8E2D5] shadow-sm">
                <div className="text-[9px] sm:text-[10px] text-[#18181B]/60 font-mono uppercase truncate">Metro Latency</div>
                <div className="text-xs sm:text-base font-bold text-[#C026D3] mt-0.5 font-mono truncate">{selectedDistrict.latency}</div>
                <div className="text-[9px] sm:text-[10px] text-[#18181B]/60 font-mono">Round-trip</div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-white border border-[#E8E2D5] shadow-sm">
                <div className="text-[9px] sm:text-[10px] text-[#18181B]/60 font-mono uppercase truncate">Deployment</div>
                <div className="text-xs sm:text-base font-bold text-[#18181B] mt-0.5 truncate">{selectedDistrict.provisionTime}</div>
                <div className="text-[9px] sm:text-[10px] text-[#C026D3] font-mono font-medium">Turnkey SLA</div>
              </div>
            </div>

            {/* Architecture Notes */}
            <div className="p-3.5 rounded-lg bg-white border border-[#E8E2D5] text-xs text-[#18181B]/80 leading-relaxed mb-4 shadow-sm">
              <span className="font-semibold text-[#18181B] block mb-1 flex items-center gap-1.5">
                <Layers size={14} className="text-[#C026D3]" />
                Physical Trunk Topology:
              </span>
              {selectedDistrict.notes}. Dedicated fiber splice with zero public Internet contention (1:1 CIR guaranteed).
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#18181B]/70 font-medium">
              Available for priority optical site survey.
            </span>

            <Link to="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#18181B] hover:bg-[#C026D3] text-white text-xs font-semibold tracking-wide shadow-sm hover:shadow-[0_4px_16px_rgba(192,38,211,0.25)] transition-all duration-300">
                <span>Request Site Survey</span>
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
