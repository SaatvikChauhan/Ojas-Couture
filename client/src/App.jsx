import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import LittleWonders from './pages/LittleWonders';
import About from './pages/About';
import Contact from './pages/Contact';
// import FAQ from './pages/FAQ';
// import Blog from './pages/Blog';
// import BlogPost from './pages/BlogPost';
// import Testimonials from './pages/Testimonials';
// import JoinFamily from './pages/JoinFamily';
// import TermsConditions from './pages/TermsConditions';
// import PrivacyPolicy from './pages/PrivacyPolicy';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/little-wonders" element={<LittleWonders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/join-family" element={<JoinFamily />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} /> */}
      </Routes>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}