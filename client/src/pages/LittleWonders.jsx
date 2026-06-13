import React, { useEffect, useState } from 'react';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';

const FALLBACK = [
  { _id: '4', name: 'Purple Applique Work Cotton Dress Material', price: 1950, badge: 'HANDMADE', isLittleWonders: true, images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700'] },
  { _id: '8', name: 'Ivory Chikankari Straight Kurta', price: 3200, badge: 'HANDMADE', isLittleWonders: true, images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700'] },
  { _id: '11', name: 'Wine Velvet Lehenga Choli', price: 12000, isLittleWonders: true, images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'] },
];

export default function LittleWonders() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll()
      .then(res => {
        const p = res.data.products;
        setProducts(p?.length ? p : FALLBACK);
      })
      .catch(() => setProducts(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero Banner */}
      <div className="lw-hero">
        <div className="lw-hero-bg">
          <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400" alt="Little Wonders" />
          <div className="lw-hero-overlay" />
        </div>
        <div className="lw-hero-content container">
          <p className="lw-eyebrow">An Exclusive Collection</p>
          <h1 className="lw-title">Little Wonders</h1>
          <p className="lw-by">by <em>Pratibha Rajput</em></p>
          <p className="lw-desc">
            Discover beautifully customized stitched Indian Suits for every occasion.
            Each piece is a labour of love — crafted to your exact measurements and vision.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="lw-story container">
        <div className="lw-story-grid">
          <div className="lw-story-text">
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '0 0 12px' }}>The Collection</p>
            <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 20px' }}>Where Tradition Meets Craft</h2>
            <div className="divider-gold" style={{ margin: '0 0 24px' }} />
            <p>Little Wonders is Pratibha Rajput's signature collection — a curated selection of custom-stitched Indian suits, lehengas, and dress materials that embody the richness of India's textile heritage.</p>
            <p style={{ marginTop: 16 }}>Every piece in this collection is available for bespoke customisation. Share your measurements, choose your fabric and design, and watch Pratibha bring your vision to life.</p>
            <a
              href="https://wa.me/919876543210?text=Hi! I would like to know more about Little Wonders custom stitching."
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ display: 'inline-block', marginTop: 28 }}
            >
              📱 Enquire for Custom Order
            </a>
          </div>
          <div className="lw-story-img">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700" alt="Little Wonders by Pratibha Rajput" />
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={{ background: 'var(--ivory)', padding: '64px 0' }}>
        <div className="container">
          <h2 className="section-title">LITTLE WONDERS</h2>
          <p className="lw-by-inline">by <em>Pratibha Rajput</em></p>
          <div className="divider-gold" />
          <p className="section-subtitle">Curated pieces, crafted with heart</p>

          {loading ? (
            <div className="spinner"><div className="spinner-ring" /></div>
          ) : (
            <div className="products-grid">
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="lw-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-subtitle">Get Your Dream Outfit</p>
          <h2 className="section-title">Custom Stitching Service</h2>
          <div className="divider-gold" />
          <p className="lw-cta-text">
            Can't find exactly what you're looking for? Pratibha Rajput offers fully personalised custom stitching.
            Share your dream outfit via WhatsApp and she'll craft it to perfection.
          </p>
          <a
            href="https://wa.me/919876543210?text=Hi Pratibha! I would like to commission a custom stitched outfit."
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ display: 'inline-block' }}
          >
            Start Your Custom Order
          </a>
        </div>
      </section>
    </div>
  );
}
