import React, { useState, useEffect, useMemo } from 'react';
import { BlogPost } from '../types';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  X, 
  Share2, 
  Check, 
  Clock, 
  BookOpen, 
  Search,
  Sparkles,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Send,
  PhoneCall
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { ConnectiveWeb } from '../components/ConnectiveWeb';
import lagosImage from '../nigeria-lagos-1.webp';

interface DetailedPost extends BlogPost {
  readTime: string;
  keyTakeaways: string[];
  contentParagraphs: string[];
  proTip?: string;
  tags: string[];
}

const POSTS_DATA: DetailedPost[] = [
  {
    id: '1',
    title: '5 Essential Steps to Build a Reliable Office Network',
    excerpt: 'A practical guide for business owners and office managers on setting up data cabling, Wi-Fi coverage, and power protection for uninterrupted daily productivity.',
    date: 'Oct 15, 2024',
    author: 'Osiffa Technical Team',
    category: 'Guides',
    image: '/images/post-1-network-setup.webp',
    readTime: '4 min read',
    tags: ['Office Setup', 'Cat6 Cabling', 'Wi-Fi Mesh', 'Power Protection'],
    keyTakeaways: [
      'Always wire stationary workstations with dedicated Cat6 cables rather than relying solely on Wi-Fi.',
      'Place wireless access points centrally on ceilings, avoiding metal partitions and thick concrete pillars.',
      'Install an uninterruptible power supply (UPS) on your main router and core switch to prevent equipment resets during power fluctuations.',
      'Maintain an organized, labeled patch panel to make future office expansions quick and painless.'
    ],
    proTip: 'Never bundle data cables tightly together with heavy high-voltage power cables; electrical interference degrades data throughput over time.',
    contentParagraphs: [
      'Setting up a new office network can feel daunting, but getting the fundamentals right saves hours of frustrating downtime later. When computers frequently drop off the network or video calls freeze, the root cause is often inadequate cabling or poorly positioned Wi-Fi access points.',
      'The first rule of reliable office networking is physical separation of stationary and mobile devices. While laptops and smartphones need strong Wi-Fi, desktop computers, network printers, and VoIP phones should always be connected via physical Ethernet cables. This frees up wireless airtime and guarantees stable speed for heavy data tasks.',
      'Secondly, power stability is critical in African commercial environments. Even momentary power cuts or generator changeover delays can reboot your router and interrupt active transactions. Connecting your core network equipment to an appropriately sized online UPS ensures seamless continuity.',
      'At Osiffa Telecoms, we guide businesses through every step of this setup—from planning cable routes and mounting wall sockets to configuring secure Wi-Fi and labeling every port clearly.'
    ]
  },
  {
    id: '2',
    title: 'Why Quality Structured Cabling Saves Your Business Time and Money',
    excerpt: 'Tangled, uncertified cables create hidden network headaches. Learn how professional Cat6 cabling and rack organization protect your business from costly downtime.',
    date: 'Sep 28, 2024',
    author: 'Osiffa Technical Team',
    category: 'Infrastructure',
    image: '/images/post-2-structured-cabling.jpg',
    readTime: '5 min read',
    tags: ['Structured Cabling', 'Rack Organization', 'Cat6A', 'Patch Panels'],
    keyTakeaways: [
      'Poorly terminated cables cause intermittent connection drops that are notoriously hard to diagnose.',
      'Professional trunking shields sensitive copper data lines from physical damage, moisture, and dust.',
      'A labeled, organized network cabinet cuts troubleshooting time from several hours down to minutes.'
    ],
    proTip: 'Always demand certified cable continuity test reports upon handover so you know each wall socket delivers maximum transmission speed.',
    contentParagraphs: [
      'In many offices, the network closet resembles a chaotic "spaghetti" of tangled cables. While it may seem like a cosmetic issue, disorganised cabling is one of the leading causes of avoidable business downtime.',
      'When cables are pulled tightly around sharp corners or left hanging without support, internal copper pairs can stretch and degrade. This leads to intermittent packet loss—where the internet seems to work one minute and cuts out the next, baffling staff and stalling productivity.',
      'Structured cabling solves this by establishing a permanent, organized distribution system. High-grade Cat6 cables are run through protective wall trunking into a central patch panel. Each cable is tested for continuity and labeled at both ends. When a workstation changes or an issue arises, any technician can identify the exact line in seconds without touching surrounding connections.',
      'Investing in neat, certified structured cabling today ensures your office infrastructure remains clean, manageable, and ready to scale as your team grows.'
    ]
  },
  {
    id: '3',
    title: 'Broadband vs. Dedicated Internet: Choosing What Your Office Needs',
    excerpt: 'Understanding the key differences between shared business broadband and dedicated internet so you can make an informed, cost-effective decision for your team.',
    date: 'Sep 10, 2024',
    author: 'Osiffa Technical Team',
    category: 'Connectivity',
    image: '/images/post-3-business-internet.jpg',
    readTime: '4 min read',
    tags: ['Business Broadband', 'Dedicated Lines', 'Dual-WAN Failover', 'QoS'],
    keyTakeaways: [
      'Shared business broadband is economical and well-suited for smaller teams with standard web and email usage.',
      'Dedicated lines provide guaranteed 1:1 speed with equal upload and download for offices hosting servers or running non-stop video meetings.',
      'Setting up a dual-WAN router with a secondary backup connection is often the smartest safeguard against ISP downtime.'
    ],
    proTip: 'A dual-WAN router with automated failover protects your business against ISP outages without requiring manual cable swapping.',
    contentParagraphs: [
      'One of the most common questions we receive from office managers is whether they need a dedicated internet connection or if standard business broadband is sufficient. The answer depends on your team size and how you use the internet.',
      'Shared business broadband shares bandwidth among multiple subscribers in your area. While modern speeds are generally high, you may notice brief slowdowns during peak hours. For small offices of 5 to 20 staff primarily browsing, sending emails, and handling standard documents, a properly managed broadband connection is often perfectly adequate and budget-friendly.',
      'On the other hand, dedicated internet provides an uncontended, private connection reserved exclusively for your company. If your business regularly uploads large media files, hosts in-house database servers, or conducts simultaneous high-definition client conferences, dedicated internet provides consistent performance without fluctuation.',
      'Regardless of which option you choose, we frequently recommend configuring a dual-WAN router with two separate internet providers. If one connection experiences an outage, your network automatically switches to the backup line with zero interruption to your work.'
    ]
  },
  {
    id: '4',
    title: 'Best Practices for Securing Your Commercial Office Wi-Fi',
    excerpt: 'Essential, easy-to-implement wireless security measures to protect your company files, staff computers, and guest visitors from common network risks.',
    date: 'Aug 22, 2024',
    author: 'Osiffa Technical Team',
    category: 'Security',
    image: '/images/post-4-wifi-security.jpg',
    readTime: '4 min read',
    tags: ['Wi-Fi Security', 'VLAN Isolation', 'Guest Network', 'Access Control'],
    keyTakeaways: [
      'Always isolate guest Wi-Fi on a separate VLAN so visitors cannot discover internal computers or network printers.',
      'Change default admin credentials on all access points and routers immediately upon deployment.',
      'Apply bandwidth limits to the guest network to prevent visitors from slowing down core business operations.'
    ],
    proTip: 'Never share the primary staff Wi-Fi password with guests or temporary visitors; use an isolated Guest SSID with its own access code.',
    contentParagraphs: [
      'Wi-Fi has become indispensable in the modern workplace, but an unsecured wireless network exposes your company to avoidable vulnerabilities. When visitors, clients, or delivery personnel connect to the same Wi-Fi network used by your accounting and HR computers, sensitive data is at risk.',
      'The single most important step in commercial Wi-Fi security is network isolation. By configuring a dedicated Guest Network on a separate virtual LAN (VLAN), guests can access the internet freely without being able to see your company’s internal file servers, printers, or staff workstations.',
      'Additionally, commercial access points allow you to set bandwidth limits on guest traffic. This prevents a visitor from streaming high-resolution video and inadvertently slowing down your team’s critical cloud applications.',
      'Osiffa Telecoms installs and configures enterprise-grade access points with robust security profiles pre-configured, giving your business peace of mind and your guests a seamless experience.'
    ]
  },
  {
    id: '5',
    title: 'IT Hardware Procurement: Choosing Workstations & Servers for Your Business',
    excerpt: 'Avoid costly hardware mistakes. How to choose genuine business laptops, desktop workstations, and server storage built to withstand commercial workloads.',
    date: 'Aug 05, 2024',
    author: 'Osiffa Technical Team',
    category: 'Hardware',
    image: '/images/post-5-hardware-procurement.jpg',
    readTime: '5 min read',
    tags: ['Workstation Setup', 'Servers & NAS', 'Hardware Supply', 'Power Backup'],
    keyTakeaways: [
      'Consumer laptops lack the thermal management and component durability required for 8+ hour commercial workdays.',
      'Equip workstations with minimum 16GB RAM and NVMe SSDs to eliminate workflow lag and sluggish application switching.',
      'Centralize team file storage on a Network Attached Storage (NAS) with RAID disk redundancy rather than scattering files across loose flash drives.'
    ],
    proTip: 'Always verify that business laptops come with commercial warranty coverage and genuine operating system licenses.',
    contentParagraphs: [
      'Procuring IT equipment for an expanding office is often treated as a simple shopping exercise, but purchasing the wrong hardware leads to constant staff complaints, slow software performance, and early component failure.',
      'Consumer-grade laptops and desktop computers are designed for light home use. When deployed in business environments where staff run dozens of browser tabs, accounting tools, and video calls simultaneously, consumer machines frequently overheat and slow down.',
      'Business-grade workstations feature reinforced hinges, spill-resistant keyboards, superior thermal dissipation, and enterprise management chips. Furthermore, pairing workstations with a centralized Network Attached Storage (NAS) server ensures company files are backed up automatically every evening with zero manual intervention.',
      'Osiffa Telecoms supplies certified, brand-name hardware configured out of the box with your software, antivirus, and network drives ready to work from day one.'
    ]
  },
  {
    id: '6',
    title: 'From Spreadsheets to ERP: How Custom Business Software Eliminates Chaos',
    excerpt: 'When manual spreadsheets start breaking down, custom business software and integrated ERP systems bring inventory, sales, and invoicing into one clear view.',
    date: 'Jul 18, 2024',
    author: 'Osiffa Technical Team',
    category: 'Software & ERP',
    image: '/images/post-6-custom-software.jpg',
    readTime: '6 min read',
    tags: ['Custom ERP', 'Inventory Management', 'POS Systems', 'Automation'],
    keyTakeaways: [
      'Spreadsheets create data silos where sales, warehouse, and accounting teams frequently look at conflicting numbers.',
      'A custom web-based ERP gives management real-time visibility into stock levels across multiple branches.',
      'Automated invoicing and payment reconciliation reduce human errors and speed up payment collection.'
    ],
    proTip: 'Start by automating your biggest bottleneck first (such as stock tracking or daily receipting) before rolling out full enterprise modules.',
    contentParagraphs: [
      'Almost every business starts on spreadsheets. Excel and Google Sheets are accessible and flexible, but as transaction volumes grow and staff headcount expands, spreadsheets quickly become a liability.',
      'Common symptoms of spreadsheet breakdown include missing inventory records, accidental overwrites by staff, disconnected sales receipts, and hours spent at the end of every month trying to reconcile figures manually.',
      'A custom business management system (ERP) connects your core departments into a single database. When a sale is made at the front desk or field office, inventory counts update automatically, a digital invoice is generated for the customer, and accounting records reflect the change in real time.',
      'Because off-the-shelf software often includes bloated features you do not need, Osiffa builds lean, practical custom software tailored precisely to how your business operates.'
    ]
  }
];

export const Blog: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<DetailedPost | null>(null);
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (id) {
      const match = POSTS_DATA.find(p => p.id === id);
      if (match) {
        setActiveArticle(match);
      }
    } else {
      setActiveArticle(null);
    }
  }, [id]);

  const categories = ['All', 'Guides', 'Infrastructure', 'Connectivity', 'Security', 'Hardware', 'Software & ERP'];

  const filteredPosts = useMemo(() => {
    return POSTS_DATA.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = POSTS_DATA[0];

  const handleOpenArticle = (post: DetailedPost) => {
    setActiveArticle(post);
    navigate(`/blog/${post.id}`);
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    navigate('/blog');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Lock background scroll when reading article on mobile or desktop
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleCloseArticle();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeArticle]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#18181B] relative overflow-hidden">
      {/* Background Cyber Grid Accent */}
      <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none z-0"></div>

      {/* Hero Header */}
      <section className="relative bg-[#FAF7F2] text-[#18181B] py-24 relative overflow-hidden border-b border-[#E8E2D5]">
        {/* Connective Web Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ConnectiveWeb theme="light" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D5] text-[#C026D3] text-xs font-semibold mb-6 shadow-sm">
              <BookOpen size={14} className="text-[#C026D3]" />
              <span>Practical Advice & Technology Guides</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#18181B] mb-6 leading-tight">
              Networking & IT <br className="hidden sm:inline" />
              <span className="text-[#C026D3]">Knowledge Base</span>
            </h1>
            <p className="text-[#18181B]/70 max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed mb-8">
              Straightforward, field-tested guidance on office cabling, commercial Wi-Fi, internet connectivity, computer hardware, and business software across Africa.
            </p>

            {/* Interactive Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#18181B]/40" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword, or technology..."
                className="w-full pl-11 pr-10 py-3 sm:py-3.5 rounded-xl bg-white border border-[#E8E2D5] text-base sm:text-sm text-[#18181B] placeholder-[#18181B]/40 shadow-sm focus:outline-none focus:border-[#C026D3] transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#18181B]/40 hover:text-[#18181B]"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Story Spotlight (When no search and on All category) */}
      {selectedCategory === 'All' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 mb-12">
          <Reveal>
            <div 
              onClick={() => handleOpenArticle(featuredPost)}
              className="group bg-white rounded-3xl border border-[#E8E2D5] hover:border-[#C026D3]/60 shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-6 h-64 lg:h-auto overflow-hidden relative">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = '/images/post-1-network-setup.webp';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#18181B] text-white shadow-sm flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#C026D3]" />
                    Featured Guide
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#18181B]/60 font-mono mb-4">
                    <span className="px-2.5 py-0.5 rounded bg-[#FAF7F2] text-[#C026D3] border border-[#E8E2D5] font-bold">
                      {featuredPost.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {featuredPost.readTime}
                    </span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#18181B] group-hover:text-[#C026D3] transition-colors leading-tight mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#18181B]/70 leading-relaxed mb-6 font-normal">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#FAF7F2] text-[#18181B]/70 border border-[#E8E2D5]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E8E2D5] flex items-center justify-between">
                  <span className="text-xs text-[#18181B]/60 font-medium">
                    By {featuredPost.author}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#18181B] group-hover:text-[#C026D3] transition-colors">
                    <span>Read Full Guide</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Category Pills & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D5]">
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 touch-scroll w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? POSTS_DATA.length 
                : POSTS_DATA.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border whitespace-nowrap flex-shrink-0 sm:flex-shrink active:scale-95 ${
                    selectedCategory === cat
                      ? 'bg-[#18181B] text-white border-[#18181B] shadow-sm'
                      : 'bg-white text-[#18181B]/70 hover:text-[#C026D3] border-[#E8E2D5] hover:border-[#C026D3]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    selectedCategory === cat
                      ? 'bg-white/20 text-white'
                      : 'bg-[#FAF7F2] text-[#18181B]/60'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-[#18181B]/60 font-mono">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E2D5] p-8 max-w-xl mx-auto shadow-sm">
            <BookOpen size={36} className="text-[#C026D3] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#18181B] mb-2">No Articles Found</h3>
            <p className="text-xs sm:text-sm text-[#18181B]/70 mb-6">
              We couldn't find any articles matching "{searchQuery}". Try searching for another topic or reset your filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-5 py-2.5 rounded-lg bg-[#18181B] hover:bg-[#C026D3] text-white text-xs font-semibold transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <Reveal key={post.id} delay={(idx % 3) * 100}>
                <div 
                  onClick={() => handleOpenArticle(post)}
                  className="bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-sm hover:border-[#C026D3]/60 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="h-52 overflow-hidden relative">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = '/images/post-1-network-setup.webp';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/95 text-[#C026D3] shadow-sm border border-[#E8E2D5]">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-[#18181B]/60 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#18181B] group-hover:text-[#C026D3] transition-colors leading-snug tracking-tight">
                        {post.title}
                      </h3>

                      <p className="text-[#18181B]/70 text-xs sm:text-sm leading-relaxed font-normal">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {post.tags.slice(0, 2).map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF7F2] text-[#18181B]/60 border border-[#E8E2D5]">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 sm:px-7 pb-6 pt-3 flex items-center justify-between border-t border-[#E8E2D5] mt-4">
                    <span className="text-[11px] text-[#18181B]/60 font-medium">
                      By {post.author}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#18181B] group-hover:text-[#C026D3] transition-colors">
                      <span>Read Article</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter & Insights Digest */}
      <section className="py-20 bg-white border-t border-[#E8E2D5] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF7F2] border border-[#E8E2D5] shadow-sm">
              <span className="text-xs font-bold tracking-wider text-[#C026D3] uppercase block mb-3 font-mono">
                Stay Updated
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight mb-3">
                Practical IT Advice, Delivered Periodically
              </h3>
              <p className="text-xs sm:text-sm text-[#18181B]/70 max-w-xl mx-auto mb-8 leading-relaxed">
                Receive practical guides on office networking, hardware selection, and business software solutions. Zero spam, honest technical advice.
              </p>

              {subscribed ? (
                <div className="p-4 rounded-xl bg-white border border-[#E8E2D5] text-xs font-semibold text-[#18181B] flex items-center justify-center gap-2 max-w-md mx-auto shadow-sm">
                  <CheckCircle2 size={16} className="text-[#C026D3]" />
                  <span>Thank you! You have subscribed to Osiffa Insights.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your corporate email..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white border border-[#E8E2D5] text-base sm:text-xs text-[#18181B] placeholder-[#18181B]/40 focus:outline-none focus:border-[#C026D3] shadow-sm"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#18181B] hover:bg-[#C026D3] text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <Send size={13} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-3xl w-full bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-[#E8E2D5] overflow-hidden max-h-[94vh] sm:max-h-[90vh] flex flex-col animate-in fade-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200">
            
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 sm:px-6 py-4 border-b border-[#E8E2D5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FAF7F2] text-[#C026D3] border border-[#E8E2D5]">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-[#18181B]/60 font-mono">
                  {activeArticle.readTime}
                </span>
              </div>
              <button 
                onClick={handleCloseArticle}
                aria-label="Close article"
                className="p-2 rounded-full hover:bg-[#FAF7F2] text-[#18181B]/70 hover:text-[#18181B] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-8 md:p-10 overflow-y-auto space-y-6 sm:space-y-8">
              {/* Cover Image in Modal */}
              <div className="h-48 sm:h-72 md:h-80 rounded-2xl overflow-hidden relative shadow-sm">
                <img 
                  src={activeArticle.image} 
                  alt={activeArticle.title} 
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = '/images/post-1-network-setup.webp';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 right-4 text-white">
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/40 backdrop-blur-sm border border-white/20">
                    {activeArticle.category}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#18181B] leading-tight mb-3 sm:mb-4 tracking-tight">
                  {activeArticle.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-[#18181B]/60 font-mono pb-5 sm:pb-6 border-b border-[#E8E2D5]">
                  <span className="flex items-center gap-1.5">
                    <User size={13} className="text-[#C026D3]" />
                    {activeArticle.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {activeArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {activeArticle.readTime}
                  </span>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5] space-y-3 sm:space-y-4">
                <div className="text-xs font-mono font-bold uppercase text-[#C026D3] tracking-wider flex items-center gap-2">
                  <ShieldCheck size={16} />
                  <span>Key Takeaways</span>
                </div>
                <div className="space-y-2.5">
                  {activeArticle.keyTakeaways.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#18181B]/85">
                      <Check size={16} className="text-[#C026D3] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Content */}
              <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-[#18181B]/85 leading-relaxed font-normal">
                {activeArticle.contentParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Field Pro-Tip */}
              {activeArticle.proTip && (
                <div className="p-4 sm:p-5 rounded-xl bg-white border-l-4 border-[#C026D3] border-y border-r border-[#E8E2D5] shadow-sm">
                  <div className="text-[11px] font-mono font-bold uppercase text-[#C026D3] tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles size={13} />
                    <span>Field Engineer Tip</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#18181B]/80 italic">
                    "{activeArticle.proTip}"
                  </p>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#E8E2D5]">
                <Tag size={14} className="text-[#C026D3]" />
                {activeArticle.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded bg-[#FAF7F2] text-[#18181B]/70 border border-[#E8E2D5]">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* CTA Box inside Article */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-left w-full sm:w-auto">
                  <h4 className="text-sm font-bold text-[#18181B]">Need help with this in your workplace?</h4>
                  <p className="text-xs text-[#18181B]/70">Our technicians conduct on-site inspections across Africa.</p>
                </div>
                <Link to="/contact" onClick={handleCloseArticle} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#18181B] hover:bg-[#C026D3] text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <PhoneCall size={13} />
                    <span>Talk to an Engineer</span>
                  </button>
                </Link>
              </div>

              {/* Share and Close Actions */}
              <div className="pt-6 border-t border-[#E8E2D5] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FAF7F2] hover:bg-[#E8E2D5] text-xs font-semibold text-[#18181B] border border-[#E8E2D5] transition-all"
                >
                  <Share2 size={14} />
                  <span>{copied ? 'Link Copied to Clipboard!' : 'Share Article'}</span>
                </button>

                <button
                  onClick={handleCloseArticle}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#18181B] hover:bg-[#C026D3] text-white text-xs font-semibold transition-colors shadow-sm text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};