import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CartSidebar from './components/CartSidebar';
import FAQ from './components/FAQ';
import PrivacyTerms from './components/PrivacyTerms';
import AppointmentsPage from './components/AppointmentsPage';
import ShippingDelivery from './components/ShippingDelivery';
import ReturnExchange from './components/ReturnExchange';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import LittleWonders from './pages/LittleWonders';
import About from './pages/About';
import Contact from './pages/Contact';
import About from './pages/Blogs';
import Contact from './pages/Reports';
import TermsOfService from './components/TermsOfService';

// Admin
import AdminApp from './pages/admin/AdminApp';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { _id: '1', name: 'Black Embroidered Kurta Set', price: 3900, quantity: 1, image: '' },
    { _id: '2', name: 'Beige Chikankari Kurta Set', price: 4500, quantity: 2, image: '' }
  ]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      <Routes>
        {/* ── Admin (no public nav/footer) ── */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* ── Public site ── */}
        <Route path="/*" element={
          <>
            <ScrollToTop />
            <Navbar onCartOpen={() => setIsCartOpen(true)} cartCount={totalCartCount} />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/little-wonders" element={<LittleWonders />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-terms-condition" element={<PrivacyTerms />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/shipping-and-delivery" element={<ShippingDelivery />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/return-exchange" element={<ReturnExchange />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>

            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} />
            <Footer />
            <WhatsAppButton />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}