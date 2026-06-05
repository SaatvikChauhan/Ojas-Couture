import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, testimonialAPI } from '../utils/api';
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
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productAPI.getAll({ limit: 8 }),
      testimonialAPI.getAll({ featured: 'true' })
    ]).then(([pRes, tRes]) => {
      setProducts(pRes.data.products?.length ? pRes.data.products : FALLBACK_PRODUCTS);
      setTestimonials(tRes.data?.length ? tRes.data : FALLBACK_TESTIMONIALS);
    }).catch(() => {
      setProducts(FALLBACK_PRODUCTS);
      setTestimonials(FALLBACK_TESTIMONIALS);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600"
            alt="Ojas Couture Hero"
            className="hero-img"
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content container">
          <p className="hero-eyebrow">Est. 2019 · Handcrafted in India</p>
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

      {/* Collections Banner */}
      <section className="collections-banner section-pad">
        <div className="container">
          <h2 className="section-title">Our Collections</h2>
          <div className="divider-gold" />
          <p className="section-subtitle">Crafted for every occasion</p>

          <div className="collections-grid">
            <Link to="/little-wonders" className="collection-card large">
              <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800" alt="Little Wonders" />
              <div className="collection-overlay">
                <p className="collection-eyebrow">Little Wonders · by Pratibha Rajput</p>
                <h3>Exclusive Collection</h3>
                <p>Discover beautifully Customized stitched Indian Suits for every occasion.</p>
                <span className="btn-outline-gold" style={{display:'inline-block', marginTop: 16}}>View Collection</span>
              </div>
            </Link>
            <Link to="/shop?filter=dresseMaterial" className="collection-card">
              <img src="https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=1600&auto=format&fit=crop" alt="Dress Material" />
              <div className="collection-overlay">
                <h3>Unstitched Dress Material</h3>
                <p>Choose from a variety of unstitched sarees and fabrics.</p>
                <span className="btn-primary" style={{display:'inline-block', marginTop: 16}}>Browse Styles</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products section-pad" style={{ background: 'var(--ivory)' }}>
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <div className="divider-gold" />
          <p className="section-subtitle">Fresh from our collection</p>

          {loading ? (
            <div className="spinner"><div className="spinner-ring" /></div>
          ) : (
            <div className="products-grid">
              {products.slice(0, 8).map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/shop" className="btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Why Ojas */}
      <section className="why-ojas section-pad">
        <div className="container">
          <h2 className="section-title">The Ojas Promise</h2>
          <div className="divider-gold" />
          <p className="section-subtitle">What makes us different</p>

          <div className="promise-grid">
            {[
              { icon: '✦', title: 'Handcrafted Excellence', desc: 'Every piece is crafted by skilled artisans using traditional techniques passed down through generations.' },
              { icon: '♻', title: 'Ethically Sourced', desc: 'We work directly with artisan communities, ensuring fair wages and sustainable practices.' },
              { icon: '✂', title: 'Custom Stitching', desc: 'Our Little Wonders collection offers fully personalized stitching to your exact measurements.' },
              { icon: '⬡', title: 'Premium Quality', desc: 'Only the finest fabrics — pure cotton, silk, georgette, and velvet — make it to our collection.' },
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

      {/* Testimonials */}
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

      {/* Newsletter Banner */}
      <section className="home-newsletter section-pad" style={{ background: 'var(--forest)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'var(--warm-white)' }}>Join the Ojas Family</h2>
          <p style={{ color: 'rgba(255,254,249,0.7)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px', fontSize: 15 }}>
            Get first access to new arrivals, exclusive offers, and styling inspiration.
          </p>
          <Link to="/join-family" className="btn-primary">Become a Member</Link>
        </div>
      </section>
    </div>
  );
}
