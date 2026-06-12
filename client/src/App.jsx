import React, { useState } from 'react'; // 1. Added useState
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CartSidebar from './components/CartSidebar'; // 2. Imported CartSidebar
import FAQ from './components/FAQ';
import PrivacyTerms from './components/PrivacyTerms';
import AppointmentsPage from './components/AppointmentsPage';
import ShippingDelivery from './components/ShippingDelivery';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import LittleWonders from './pages/LittleWonders';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsOfService from './components/TermsOfService';
// import FAQ from './pages/FAQ';
// import Blog from './pages/Blog';
// import BlogPost from './pages/BlogPost';
// import Testimonials from './pages/Testimonials';
// import JoinFamily from './pages/JoinFamily';
// import TermsConditions from './pages/TermsConditions';
// import PrivacyPolicy from './pages/PrivacyPolicy';

export default function App() {
  // 3. State to manage whether the Cart Sidebar is sliding open or closed
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 4. Temporary cart item array state (Replace with Redux/Context when connecting to MongoDB later)
  const [cartItems, setCartItems] = useState([
    { _id: '1', name: 'Black Embroidered Kurta Set', price: 3900, quantity: 1, image: '' },
    { _id: '2', name: 'Beige Chikankari Kurta Set', price: 4500, quantity: 2, image: '' }
  ]);

  // 5. Calculate total quantity of items to show on the Navbar badge icon
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      {/* 6. Passed properties to Navbar to trigger layout state change */}

      <ScrollToTop/>
      <Navbar 
        onCartOpen={() => setIsCartOpen(true)} 
        cartCount={totalCartCount} 
      />
      
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
        {/*<Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/join-family" element={<JoinFamily />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} /> */}
      </Routes>

      {/* 7. Added CartSidebar component right outside the main viewport tracks */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
      />

      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}