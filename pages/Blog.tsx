import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Button } from '../components/Button';
import lagosImage from '../nigeria-lagos-1.webp';

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of 5G in Urban Development',
    excerpt: 'How next-generation connectivity will transform smart cities, reduce traffic congestion, and revolutionize daily commutes through autonomous vehicle communication.',
    date: 'Oct 12, 2023',
    author: 'Sarah Jenkins',
    category: 'Industry',
    image: lagosImage
  },
  {
    id: '2',
    title: 'Setting up your IoT Home Security',
    excerpt: 'A step-by-step guide to securing your perimeter with Osiffa sensors. We cover placement strategies and network segmentation.',
    date: 'Oct 05, 2023',
    author: 'David Okon',
    category: 'Guides',
    image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Why Low Latency Matters for Enterprise',
    excerpt: 'Understanding the business impact of millisecond delays in financial trading and how Osiffa dedicated lines solve this.',
    date: 'Sep 28, 2023',
    author: 'Elena Rodriguez',
    category: 'Enterprise',
    image: 'https://images.unsplash.com/photo-1504384308090-c54be3855485?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '4',
    title: '6G: What Comes Next?',
    excerpt: 'While we deploy 5G, our labs are already looking ahead. Here is what we know about the terahertz frequencies of the future.',
    date: 'Sep 15, 2023',
    author: 'Dr. Arinze',
    category: 'R&D',
    image: 'https://images.unsplash.com/photo-1614064641938-3bcee52636c4?q=80&w=2070&auto=format&fit=crop'
  }
];

export const Blog: React.FC = () => {
  const { id } = useParams();
  const featuredPost = mockPosts[0];
  const otherPosts = mockPosts.slice(1);

  useEffect(() => {
    if (id) {
      const scrollToPost = () => {
        const element = document.getElementById(`post-${id}`);
        if (element) {
           const headerOffset = 100; 
           const elementPosition = element.getBoundingClientRect().top;
           const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
           window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      };
      const timer = setTimeout(scrollToPost, 100);
      return () => clearTimeout(timer);
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-zinc-50">
      
      {/* Sleek, Premium Blog Header */}
      <div className="bg-zinc-950 text-white py-24 relative overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-950 to-brand-950/20 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/5 rounded-full blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
           <div>
              <span className="text-xs font-bold tracking-[0.3em] text-brand-400 uppercase block mb-3">The Journal</span>
              <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none text-glow animate-fade-in">Osiffa Insights</h1>
           </div>
           <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
              {['All', 'Industry', 'Enterprise', 'Guides', 'R&D'].map(tag => (
                 <button key={tag} className="px-5 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/40 text-xs font-semibold tracking-wider text-zinc-350 hover:border-brand-500 hover:text-white transition-all whitespace-nowrap uppercase">
                    {tag}
                 </button>
              ))}
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Featured Hero Article */}
        <Reveal>
           <Link to={`/blog/${featuredPost.id}`} className="group block relative rounded-2xl overflow-hidden aspect-[21/9] mb-16 shadow-2xl border border-zinc-850/80">
              <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-colors z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-955 via-zinc-955/20 to-transparent z-10"></div>
              <img 
                 src={featuredPost.image} 
                 alt={featuredPost.title} 
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102 opacity-90"
                 referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-4xl">
                 <span className="inline-block px-3 py-1 border border-brand-500/30 text-brand-300 bg-brand-950/40 font-mono tracking-widest text-[9px] rounded-md mb-4 uppercase">
                    Featured Story
                 </span>
                 <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 leading-snug group-hover:text-brand-300 transition-colors">
                    {featuredPost.title}
                 </h2>
                 <p className="text-zinc-200 text-xs md:text-sm line-clamp-2 max-w-2xl mb-6 font-light">
                    {featuredPost.excerpt}
                 </p>
                 <div className="flex items-center text-zinc-400 gap-6 text-xs font-mono">
                    <span className="flex items-center gap-1.5"><User size={14} /> {featuredPost.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {featuredPost.date}</span>
                 </div>
              </div>
           </Link>
        </Reveal>

        {/* Recent Articles Grid */}
        <div className="mb-16">
           <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-8 border-l-2 border-brand-400 pl-4">Recent Stories</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {otherPosts.map((post, index) => (
               <Reveal key={post.id} delay={index * 100}>
                 <Link to={`/blog/${post.id}`} className="group flex flex-col h-full bg-white rounded-2xl border border-zinc-200/50 p-5 shadow-sm hover:shadow-md hover:border-zinc-300/60 transition-all duration-300">
                   <div className="rounded-xl overflow-hidden mb-6 aspect-[4/3] relative">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-4 right-4 bg-zinc-950/90 text-[9px] tracking-wider font-mono uppercase text-white px-2.5 py-1 rounded-md shadow-sm z-20">
                        {post.category}
                      </span>
                   </div>
                   <div className="flex-1 flex flex-col">
                     <div className="flex items-center text-gray-500 text-xs mb-3 gap-3">
                        <span>{post.date}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <span>{post.author}</span>
                     </div>
                     <h4 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-brand-700 transition-colors">
                       {post.title}
                     </h4>
                     <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
                       {post.excerpt}
                     </p>
                     <div className="mt-auto flex items-center text-brand-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                        Read Article <ArrowRight size={16} className="ml-2" />
                     </div>
                   </div>
                 </Link>
               </Reveal>
             ))}
           </div>
        </div>
        
        {/* Newsletter Micro-CTA */}
        <div className="bg-gray-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-600 rounded-full blur-3xl opacity-20"></div>
           <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h3>
              <p className="text-gray-400 mb-8">Get the latest insights on 5G, IoT, and network infrastructure delivered to your inbox.</p>
              <div className="flex gap-2 max-w-md mx-auto">
                 <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500" />
                 <Button>Subscribe</Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};