export interface Device {
  id: string;
  name: string;
  category: 'Phone' | 'Router' | 'IoT';
  price: string;
  image: string;
  description: string;
  specs: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export enum PageRoute {
  HOME = '/',
  ABOUT = '/about',
  DEVICES = '/devices',
  SERVICES = '/services',
  BLOG = '/blog',
  CONTACT = '/contact',
}