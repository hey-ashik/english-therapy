import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import RouteLoader from './components/layout/RouteLoader.jsx';
import SeoHead from './components/layout/SeoHead.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';
import { trackPageView } from './lib/analytics.js';

const Home = lazy(() => import('./pages/Home.jsx'));
const Courses = lazy(() => import('./pages/Courses.jsx'));
const OurStory = lazy(() => import('./pages/OurStory.jsx'));
const FAQ = lazy(() => import('./pages/FAQ.jsx'));
const Books = lazy(() => import('./pages/Books.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Experience = lazy(() => import('./pages/Experience.jsx'));
const Quiz = lazy(() => import('./pages/Quiz.jsx'));

export default function App() {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  useEffect(() => {
    setTransitioning(true);
    const timer = window.setTimeout(() => setTransitioning(false), 450);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  return (
    <div className="app-shell">
      {transitioning && (
        <div className="page-transition-loader" role="progressbar" aria-label="Loading page" />
      )}
      <SeoHead pathname={location.pathname} />
      <ScrollToTop />
      <Header />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<OurStory />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/books" element={<Books />} />
          <Route path="/resources" element={<Navigate to="/books" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/workshop" element={<PlaceholderPage title="Experience English differently." />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}
