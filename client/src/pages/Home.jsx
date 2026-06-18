import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, testimonialAPI, homepageAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';

// Fallback data for when API is unavailable
const FALLBACK_PRODUCTS = [
  { _id: '1', name: 'Black Embroidered Kurti Set', price: 1699, badge: 'NEW', images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'] },
  { _id: '2', name: 'Beige Chikankari Kurta Set', price: 4500, badge: 'HANDMADE', images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'] },
  { _id: '3', name: 'Royal Blue Banarasi Saree', price: 8500, badge: 'BEST SELLER', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'] },
  { _id: '4', name: 'Purple Applique Dress Material', price: 1950, badge: 'HANDMADE', images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'] },
];

const FALLBACK_TESTIMONIALS = [
  { _id: '1', name: 'Priya Sharma', location: 'Mumbai', message: 'Absolutely stunning quality! The embroidery is so detailed and beautiful.', rating: 5 },
  { _id: '2', name: 'Meena Patel', location: 'Delhi', message: 'Beautiful fabric, fits perfectly. Got so many compliments!', rating: 5 },
  { _id: '3', name: 'Anjali Verma', location: 'Bangalore', message: 'The chikankari work is exquisite. Worth every penny!', rating: 5 },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [specialProducts, setSpecialProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // State for Admin Homepage Data (Banners & Collections)
  const [homeData, setHomeData] = useState(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const [loading, setLoading] = useState(true);

  const newArrivalsSliderRef = useRef(null);
  const specialPriceSliderRef = useRef(null);

  useEffect(() => {
    Promise.all([
      productAPI.getAll({ limit: 10 }),
      productAPI.getAll({ limit: 10, category: 'special-price' }),
      testimonialAPI.getAll({ featured: 'true' }),
      // Fetch dynamic homepage settings for Banners & Collections
      homepageAPI ? homepageAPI.get().catch(() => ({ data: null })) : Promise.resolve({ data: null })
    ]).then(([pRes, sRes, tRes, hRes]) => {
      setProducts(pRes.data.products?.length ? pRes.data.products : FALLBACK_PRODUCTS);
      setSpecialProducts(sRes.data.products?.length ? sRes.data.products : FALLBACK_PRODUCTS);
      setTestimonials(tRes.data.products?.length ? tRes.data.products : FALLBACK_TESTIMONIALS);

      if (hRes && hRes.data) {
        setHomeData(hRes.data);
      }
    }).catch(() => {
      setProducts(FALLBACK_PRODUCTS);
      setSpecialProducts(FALLBACK_PRODUCTS);
      setTestimonials(FALLBACK_TESTIMONIALS);
    }).finally(() => setLoading(false));
  }, []);

  // Automatic slideshow for Hero Banners
  useEffect(() => {
    if (homeData?.heroBanners?.length > 1) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % homeData.heroBanners.length);
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(interval);
    }
  }, [homeData?.heroBanners]);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      ref.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Determine which hero image to show (fallback to original Unsplash image)
  const currentHeroImg = homeData?.heroBanners?.length > 0
    ? homeData.heroBanners[currentHeroIndex]
    : "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600";

  return (
    <div className="home">
      {/* 1. Hero Section (Dynamic Banners) */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src={currentHeroImg}
            alt="Ojas Couture Hero"
            className="hero-img"
            style={{ transition: 'opacity 1s ease-in-out' }}
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="hero-title">Ojas Couture</h1>
          <p className="hero-subtitle">Elegant Indian Women's Clothing Online</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn-primary">Discover More</Link>
            <Link to="/little-wonders" className="btn-outline-gold">Explore Styles</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* 2. Collections Banner (Dynamic Featured Collection) */}
      <section className="collections-banner section-pad">
        <div className="container">
          <h2 className="section-title">Our Collections</h2>
          <div className="divider-gold" />
          <p className="section-subtitle">Crafted for every occasion</p>

          <div className="collections-grid">
            <Link to="/little-wonders" className="collection-card large">
              <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800" alt="Little Wonders" />
              <div className="collection-overlay">
                <p className="collection-eyebrow">Little Wonders · by Rajput</p>
                <h3>
                  {/* Safely display featured collection name if populated by db, else fallback */}
                  {homeData?.featuredCollection?.name || 'Exclusive Collection'}
                </h3>
                <p>Discover beautifully Customized stitched Indian Suits for every occasion.</p>
                <span className="btn-outline-gold" style={{ display: 'inline-block', marginTop: 16 }}>View Collection</span>
              </div>
            </Link>
            <Link to="/shop?filter=dresseMaterial" className="collection-card">
              <img src="https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=1600&auto=format&fit=crop" alt="Dress Material" />
              <div className="collection-overlay">
                <h3>Unstitched Dress Material</h3>
                <p>Choose from a variety of unstitched sarees and fabrics.</p>
                <span className="btn-primary" style={{ display: 'inline-block', marginTop: 16 }}>Browse Styles</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. New Arrivals Section */}
      <section className="featured-products section-pad" style={{ background: 'var(--ivory)' }}>
        <div className="container" style={{ position: 'relative' }}>
          <h2 className="section-title">New Arrivals</h2>
          <div className="divider-gold" />
          <p className="section-subtitle">Fresh from our collection</p>

          {loading ? (
            <div className="spinner"><div className="spinner-ring" /></div>
          ) : (
            <div className="slider-wrapper">
              <button className="slider-btn left-btn" onClick={() => scroll(newArrivalsSliderRef, 'left')}>&#10094;</button>
              <div className="products-slider-row" ref={newArrivalsSliderRef}>
                {products.map(p => (
                  <div className="slider-item" key={`new-${p._id}`}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
              <button className="slider-btn right-btn" onClick={() => scroll(newArrivalsSliderRef, 'right')}>&#10095;</button>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/shop" className="btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* 4. Special Price Section */}
      <section className="special-price-products section-pad" style={{ background: '#fff' }}>
        <div className="container" style={{ position: 'relative' }}>
          <h2 className="section-title">Special Price</h2>
          <div className="divider-gold" />
          <p className="section-subtitle">Unmissable deals on premium styles</p>

          {loading ? (
            <div className="spinner"><div className="spinner-ring" /></div>
          ) : (
            <div className="slider-wrapper">
              <button className="slider-btn left-btn" onClick={() => scroll(specialPriceSliderRef, 'left')}>&#10094;</button>
              <div className="products-slider-row" ref={specialPriceSliderRef}>
                {specialProducts.map(p => (
                  <div className="slider-item" key={`spec-${p._id}`}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
              <button className="slider-btn right-btn" onClick={() => scroll(specialPriceSliderRef, 'right')}>&#10095;</button>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/special-price" className="btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* 5. Categories Showcase */}
      <section className="categories-showcase section-pad" style={{ background: '#ffffff', paddingTop: 0 }}>
        <div className="container">
          <div className="collections-grid elements-three">
            <div className="collection-card">
              <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600" alt="Kurtas" />
              <div className="collection-overlay">
                <h3>KURTAS</h3>
                <Link to="/shop?category=kurtas" className="btn-link">View All Products</Link>
              </div>
            </div>
            <div className="collection-card">
              <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600" alt="Suit Sets" />
              <div className="collection-overlay">
                <h3>SUIT SETS</h3>
                <Link to="/shop?category=suits" className="btn-link">View All Products</Link>
              </div>
            </div>
            <div className="collection-card">
              <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600" alt="Sarees" />
              <div className="collection-overlay">
                <h3>SAREES</h3>
                <Link to="/shop?category=sarees" className="btn-link">View All Products</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Offering Section */}
      <section className="our-offering" style={{ background: '#c4c3c2', padding: '60px 0', width: '100%' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 className="section-title" style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '2px', textTransform: 'uppercase', color: '#1a1a1a', marginBottom: '48px' }}>
            OUR OFFERING
          </h2>

          <div className="offering-grid" style={{ display: 'flex', gap: '80px', justifyContent: 'center' }}>
            {/* Card 1: Video Consultations */}
            <div className="offering-card" style={{ flex: '1', maxWidth: '480px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="offering-img-wrapper" style={{ width: '100%', height: '380px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600"
                  alt="Video Consultation"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 className="offering-card-title" style={{ fontSize: '16px', letterSpacing: '1px', marginTop: '24px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: '600', color: '#1a1a1a' }}>
                VIDEO CONSULTATIONS
              </h3>
              <div style={{ width: '40px', height: '1px', background: '#1a1a1a', marginBottom: '16px' }}></div>
              <p className="offering-card-desc" style={{ color: '#444', lineHeight: '1.6', fontSize: '14px', textAlign: 'left' }}>
                <span style={{ fontWeight: '600' }}>A Private Couture Experience, Anywhere.</span> If you cannot step into our store, let us bring our master craftsmanship to you. Connect with an in-house stylist via a personalized video call to explore our latest heritage designs and custom fits.
              </p>
            </div>

            {/* Card 2: Custom Fittings */}
            <div className="offering-card" style={{ flex: '1', maxWidth: '480px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="offering-img-wrapper" style={{ width: '100%', height: '380px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600"
                  alt="Custom Fittings"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 className="offering-card-title" style={{ fontSize: '16px', letterSpacing: '1px', marginTop: '24px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: '600', color: '#1a1a1a' }}>
                CUSTOM FITTINGS
              </h3>
              <div style={{ width: '40px', height: '1px', background: '#1a1a1a', marginBottom: '16px' }}></div>
              <p className="offering-card-desc" style={{ color: '#444', lineHeight: '1.6', fontSize: '14px', textAlign: 'left' }}>
                <span style={{ fontWeight: '600' }}>Made-to-Measure Excellence!</span> Experience perfection in every stitch. Our custom tailoring service transforms exquisite designs into garments uniquely crafted around your personal measurements and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. The Ojas Promise */}
      <section className="why-ojas section-pad">
        <div className="container">
          <h2 className="section-title">The Ojas Promise</h2>
          <div className="divider-gold" />
          <p className="section-subtitle">What makes us different</p>

          <div className="promise-grid">
            {[
              { icon: '✦', title: 'Handcrafted Excellence', desc: 'Every piece is crafted by skilled artisans using traditional techniques.' },
              { icon: '♻', title: 'Ethically Sourced', desc: 'We work directly with artisan communities ensuring fair wages.' },
              { icon: '✂', title: 'Custom Stitching', desc: 'Fully personalized stitching to your exact measurements.' },
              { icon: '⬡', title: 'Premium Quality', desc: 'Only the finest fabrics — pure cotton, silk, and georgette.' },
            ].map(item => (
              <div className="promise-item" key={item.title}>
                <div className="promise-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="home-testimonials section-pad" style={{ background: 'var(--charcoal)' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'var(--warm-white)' }}>Our Happy Family</h2>
          <div className="divider-gold" />
          <p className="section-subtitle" style={{ color: 'rgba(255,254,249,0.5)' }}>Words from our customers</p>

          <div className="testimonials-grid">
            {testimonials.slice(0, 3).map(t => (
              <div className="testimonial-card" key={t._id}>
                <div className="stars">{Array(t.rating).fill('★').join('')}</div>
                <p className="testimonial-text">"{t.message}"</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  {t.location && <span>{t.location}</span>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/testimonials" className="btn-outline-gold">Read All Reviews</Link>
          </div>
        </div>
      </section>

      {/* 9. Newsletter Banner */}
      <section className="home-newsletter section-pad" style={{ background: 'var(--forest)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'var(--warm-white)' }}>Join the Ojas Family</h2>
          <p style={{ color: 'rgba(255,254,249,0.7)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
            Get first access to new arrivals, exclusive offers, and styling inspiration.
          </p>
          <Link to="/join-family" className="btn-primary">Become a Member</Link>
        </div>
      </section>
    </div>
  );
}