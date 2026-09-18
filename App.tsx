import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { PageRoute } from './types';

// ScrollToTop component to handle scroll behavior on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout component to handle conditional padding for the fixed header
const Layout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === PageRoute.HOME;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* 
        The Header is fixed. 
        On non-home pages, we add top padding so content isn't hidden.
        On home page, we want the content (Hero) to go behind the header.
      */}
      <main className={`flex-grow ${!isHome ? 'pt-20' : ''}`}>
        <Routes>
          <Route path={PageRoute.HOME} element={<Home />} />
          <Route path={PageRoute.SERVICES} element={<Services />} />
          <Route path={PageRoute.BLOG} element={<Blog />} />
          <Route path={PageRoute.CONTACT} element={<Contact />} />
          <Route path={PageRoute.ABOUT} element={<About />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
};

export default App;