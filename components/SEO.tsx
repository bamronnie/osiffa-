import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageRoute } from '../types';

interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
}

const routeMetadata: Record<string, PageMetadata> = {
  [PageRoute.HOME]: {
    title: 'Osiffa Telecoms | Business Internet & IT Networking Solutions in Lagos',
    description: 'Osiffa Telecoms (Nig.) Ltd — Dependable high-speed business internet, structured cabling, commercial office Wi-Fi, and IT hardware procurement across Nigeria.',
    keywords: 'Osiffa Telecoms, Business Internet Lagos, Structured Cabling Nigeria, Commercial Wi-Fi, IT Hardware Procurement Lagos, Network Support Africa',
    canonical: 'https://www.osiffatelecom.com/'
  },
  [PageRoute.SERVICES]: {
    title: 'Enterprise IT & Telecom Services | Structured Cabling & Business Internet | Osiffa',
    description: 'Reliable business telecom services in Lagos: Dedicated fiber internet, Cat6 & optical structured cabling, multi-floor enterprise Wi-Fi, and hardware procurement.',
    keywords: 'Dedicated Internet Lagos, Office Cabling Nigeria, Enterprise Wi-Fi Lagos, IT Infrastructure Services, Server Room Setup',
    canonical: 'https://www.osiffatelecom.com/services'
  },
  [PageRoute.ABOUT]: {
    title: 'About Osiffa Telecoms (Nig.) Ltd | Enterprise Connectivity Leaders',
    description: 'Learn about Osiffa Telecoms — providing dependable business internet, structured cabling, and enterprise IT hardware solutions for growing companies in Africa.',
    keywords: 'About Osiffa Telecoms, Telecom Company Lagos, IT Infrastructure Provider Nigeria, Enterprise Telecoms Africa',
    canonical: 'https://www.osiffatelecom.com/about'
  },
  [PageRoute.CONTACT]: {
    title: 'Contact Osiffa Telecoms | Request a Network Audit & Quote in Lagos',
    description: 'Get in touch with Osiffa Telecoms network engineers in Lagos, Nigeria. Call +234 808 964 6456 or email info@osiffatelecom.com for enterprise internet and cabling inquiries.',
    keywords: 'Contact Osiffa Telecoms, Network Consultation Lagos, Telecom Engineers Nigeria, Office Internet Quote Lagos',
    canonical: 'https://www.osiffatelecom.com/contact'
  },
  [PageRoute.BLOG]: {
    title: 'Telecom & Enterprise Networking Insights | Osiffa Telecoms Blog',
    description: 'Insights, guides, and best practices on enterprise connectivity, fiber vs wireless, structured cabling standards, and office network security from Osiffa Telecoms.',
    keywords: 'Telecom Blog Nigeria, Structured Cabling Guides, Business Internet Tips Lagos, Enterprise Networking News',
    canonical: 'https://www.osiffatelecom.com/blog'
  }
};

export const SEO: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Match base route or blog post sub-routes
    let meta = routeMetadata[pathname];
    if (!meta) {
      if (pathname.startsWith('/blog/')) {
        meta = {
          title: 'Article | Osiffa Telecoms Insights',
          description: 'Read the latest technical guide and enterprise connectivity insights from the Osiffa Telecoms engineering team.',
          keywords: 'Telecom Guides, Enterprise IT, Osiffa Blog, Nigeria Tech',
          canonical: `https://www.osiffatelecom.com${pathname}`
        };
      } else {
        meta = {
          title: 'Osiffa Telecoms | Networking, Hardware & Software Solutions',
          description: 'Osiffa Telecoms (Nig.) Ltd — Dependable business internet, structured cabling, commercial Wi-Fi, IT hardware procurement, and custom business software across Africa.',
          keywords: 'Osiffa Telecoms, Business Internet, Structured Cabling, IT Hardware, Custom Software, Office Wi-Fi, Africa',
          canonical: `https://www.osiffatelecom.com${pathname}`
        };
      }
    }

    // Update document title
    document.title = meta.title;

    // Helper to set meta tags
    const setMetaTag = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('name=')) {
          const match = selector.match(/name="([^"]+)"/);
          if (match) el.setAttribute('name', match[1]);
        } else if (selector.includes('property=')) {
          const match = selector.match(/property="([^"]+)"/);
          if (match) el.setAttribute('property', match[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // Update Meta Description & Keywords
    setMetaTag('meta[name="description"]', 'content', meta.description);
    setMetaTag('meta[name="keywords"]', 'content', meta.keywords);

    // Update Open Graph tags
    setMetaTag('meta[property="og:title"]', 'content', meta.title);
    setMetaTag('meta[property="og:description"]', 'content', meta.description);
    setMetaTag('meta[property="og:url"]', 'content', meta.canonical);

    // Update Twitter tags
    setMetaTag('meta[name="twitter:title"]', 'content', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'content', meta.description);

    // Update Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', meta.canonical);
  }, [pathname]);

  return null;
};
