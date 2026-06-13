import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI } from '../utils/api';

const FALLBACK = {
  _id: '1', name: 'Black Embroidered Kurti Set', price: 1699, originalPrice: 1999,
  description: 'Elegantly crafted black kurti with intricate gold embroidery.',
  fabric: 'Georgette', work: 'Embroidery', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: ['#1a1a1a', '#c9a84c', '#7f1d1d', '#2d4a2d'],
  badge: 'NEW', inStock: true, brand: 'Ojas Signature',
  images: [
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
    'https://images.unsplash.com/photo-1614285798449-02a33ee5e02b?w=800',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'
  ],
  reviews: [{ name: 'Priya', rating: 5, comment: 'Stunning quality!', date: new Date() }]
};

const SIZE_CHART = {
  XXS: { bust: '30 / 76.2', waist: '24 / 61', hip: '34 / 86.4' },
  XS:  { bust: '32 / 81.3', waist: '26 / 66', hip: '36 / 91.4' },
  S:   { bust: '34 / 86.4', waist: '28 / 71.1', hip: '38 / 96.5' },
  M:   { bust: '36 / 91.4', waist: '30 / 76.2', hip: '40 / 102' },
  L:   { bust: '38 / 96.5', waist: '32 / 81.3', hip: '42 / 106.7' },
  XL:  { bust: '40 / 101.6', waist: '34 / 86.4', hip: '44 / 111.8' },
};

const FALLBACK_RELATED = [
  { _id: '2', name: 'Beige Chikankari Kurta Set', price: 4500, badge: 'HANDMADE', images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'] },
  { _id: '3', name: 'Royal Blue Banarasi Silk Saree', price: 8500, badge: 'BEST SELLER', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'] },
  { _id: '5', name: 'Pink Bandhani Kurti Set', price: 2200, badge: 'HANDMADE', images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'] },
  { _id: '6', name: 'Orange Embroidered Kurti', price: 1850, badge: 'NEW ARRIVAL', images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'] },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [reviewMsg, setReviewMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('description');
  const [activeInfoAccordion, setActiveInfoAccordion] = useState(null);
  const [sizeChartTab, setSizeChartTab] = useState('india');

  useEffect(() => {
    productAPI.getById(id)
      .then(res => setProduct(res.data))
      .catch(() => setProduct(FALLBACK))
      .finally(() => setLoading(false));
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;
    setSubmitting(true);
    try {
      await productAPI.addReview(id, reviewForm);
      setReviewMsg('Thank you for your review!');
      setReviewForm({ name: '', rating: 5, comment: '' });
      const res = await productAPI.getById(id);
      setProduct(res.data);
    } catch {
      setReviewMsg('Could not submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMsg = product
    ? `Hi! I'm interested in "${product.name}" (₹${product.price}). Can you help me with this?`
    : '';

  if (loading) return <div className="spinner" style={{paddingTop: 120}}><div className="spinner-ring" /></div>;

  const discountPct = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Fallbacks so design elements always render even if backend data lacks these fields
  const brandLabel = product.brand || 'Ojas Couture · Little Wonders by Pratibha Rajput';
  const colorOptions = product.colors?.length > 0
    ? product.colors
    : ['#1a1a1a', '#c9a84c', '#7f1d1d', '#2d4a2d', '#6b4226', '#8b4789'];

  return (
    <div className="product-detail" style={{ paddingTop: 72 }}>
      <div className="container">
        <nav className="breadcrumb-nav">
          <Link to="/">Home</Link> › <Link to="/shop">Shop</Link> › <span>{product.name}</span>
        </nav>

        <div className="detail-layout">
          {/* Images */}
          <div className="detail-images">
            <div className="main-image">
              <img
                src={product.images?.[activeImg] || FALLBACK.images[0]}
                alt={product.name}
                onError={e => { e.target.src = FALLBACK.images[0]; }}
              />
              {product.badge && <span className="badge detail-badge">{product.badge}</span>}
              <button className="wishlist-btn" aria-label="Add to wishlist">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <path d="M12 21s-7.5-4.6-10-9.3C0.3 8.6 2 5 5.5 5 8 5 10 6.7 12 9c2-2.3 4-4 6.5-4C22 5 23.7 8.6 22 11.7 19.5 16.4 12 21 12 21z"/>
                </svg>
              </button>
            </div>
            {product.images?.length > 1 && (
              <div className="thumb-list">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`thumb ${activeImg === i ? 'active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt={`View ${i+1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            <h1 className="detail-name">{product.name}</h1>
            <p className="detail-brand">{brandLabel}</p>

            <div className="detail-price">
              <span className={discountPct ? 'price-sale' : ''}>₹{product.price?.toLocaleString('en-IN')}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="original-price">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
                  <span className="discount-tag">{discountPct}% OFF</span>
                </>
              )}
            </div>
            {discountPct && <p className="tax-note">Tax included.</p>}

            {product.reviews?.length > 0 && (
              <div className="detail-rating">
                <span className="stars">{'★'.repeat(Math.round(product.avgRating || 5))}</span>
                <span className="rating-count">({product.reviews.length} reviews)</span>
              </div>
            )}

            {/* More Colors */}
            <div className="color-section">
              <p className="size-label">More Colors</p>
              <div className="color-swatches">
                {colorOptions.map((c, i) => (
                  <button
                    key={i}
                    className={`color-swatch ${selectedColor === i ? 'active' : ''}`}
                    style={{ background: c }}
                    onClick={() => setSelectedColor(i)}
                    aria-label={`Color option ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {product.fabric && (
              <div className="detail-meta">
                <div className="meta-row"><span>Fabric</span><strong>{product.fabric}</strong></div>
                {product.work && <div className="meta-row"><span>Work</span><strong>{product.work}</strong></div>}
                <div className="meta-row">
                  <span>Availability</span>
                  <strong style={{ color: product.inStock ? 'var(--forest)' : 'red' }}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </strong>
                </div>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div className="size-selector">
                <div className="size-label-row">
                  <p className="size-label" style={{ marginBottom: 0 }}>Select Size</p>
                  <button className="size-chart-link" onClick={() => setShowSizeChart(true)}>Size chart</button>
                </div>
                <div className="size-options">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                  <button className="size-btn size-custom">Custom</button>
                </div>
              </div>
            )}

            <div className="detail-actions">
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary whatsapp-order"
              >
                Order on WhatsApp
              </a>
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(`I want to know more about "${product.name}"`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Enquire Now
              </a>
            </div>

            {/* Need urgent delivery / chat bar */}
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi! I need urgent delivery info for "${product.name}".`)}`}
              target="_blank"
              rel="noreferrer"
              className="urgent-chat-bar"
            >
              <span className="urgent-chat-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </span>
              <span className="urgent-chat-text">Need urgent delivery? Chat with us</span>
              <span className="online-dot">Online</span>
            </a>

            <div className="info-banner">
              <span className="info-banner-icon">★</span>
              <span>All products arrive in a complimentary <strong>Ojas Couture</strong> gift box — beautifully packaged and ready to gift.</span>
            </div>

            {/* Accordion: Description / Customization / Shipping */}
            <div className="detail-tabs">
              {['description', 'customization', 'shipping'].map(tab => (
                <button
                  key={tab}
                  className={`detail-tab ${activeAccordion === tab ? 'active' : ''}`}
                  onClick={() => setActiveAccordion(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="detail-tab-content">
              {activeAccordion === 'description' && (
                <div>
                  <p className="detail-desc">{product.description}</p>
                  {product.fabric && <p className="meta-line"><strong>Material/Fabric:</strong> {product.fabric}</p>}
                  <p className="meta-line"><strong>COD Available</strong> | Shipping Worldwide</p>
                  <p className="meta-line"><strong>Wash Care:</strong> Dry Clean Only</p>
                  <p className="meta-line"><strong>Delivery Timeline:</strong> 7–10 Days</p>
                  <p className="meta-line color-vary"><strong>Color may vary slightly.</strong></p>
                </div>
              )}
              {activeAccordion === 'customization' && (
                <div className="customization-grid">
                  <div className="custom-item">
                    <strong>Video Call</strong>
                    <p>Discover the piece you love closely with our on-call stylists.</p>
                  </div>
                  <div className="custom-item">
                    <strong>Need it sooner?</strong>
                    <p>Skip the queue — let us know when you have an event!</p>
                  </div>
                  <div className="custom-item">
                    <strong>Customise</strong>
                    <p>Change the color, neckline, or design as per your liking.</p>
                  </div>
                  <div className="custom-item">
                    <strong>Add or remove from set</strong>
                    <p>Need a matching dupatta? It's all possible!</p>
                  </div>
                  <a
                    href="https://wa.me/919876543210?text=Hi! I'd like to discuss customization options."
                    target="_blank"
                    rel="noreferrer"
                    className="custom-chat-link"
                  >
                    Chat with us, and we can help you with all of the above! Connect on <strong>+91 98765 43210</strong>
                  </a>
                </div>
              )}
              {activeAccordion === 'shipping' && (
                <div>
                  <p className="meta-line">Standard shipping: 5–7 business days within India.</p>
                  <p className="meta-line">International shipping available — duties may apply.</p>
                  <p className="meta-line">Easy exchanges within 7 days of delivery for size issues.</p>
                </div>
              )}
            </div>

            {/* FAQ-style dropdowns */}
            <div className="info-accordions">
              {[
                {
                  key: 'faqs',
                  title: 'FAQs',
                  icon: 'ⓘ',
                  content: (
                    <div>
                      <p className="meta-line"><strong>How long will my order take?</strong><br />Most orders are dispatched within 7–10 days. Custom stitched pieces may take longer.</p>
                      <p className="meta-line"><strong>Can I customise this piece?</strong><br />Yes! Color, fabric, and fit changes are available — chat with us on WhatsApp.</p>
                      <p className="meta-line"><strong>Do you ship internationally?</strong><br />Yes, we ship worldwide. Duties and taxes may apply at your destination.</p>
                    </div>
                  )
                },
                {
                  key: 'price-match',
                  title: 'Price Match Promise',
                  icon: '🏷',
                  content: (
                    <p className="meta-line">If you find this exact piece available elsewhere at a lower price, share the details with us on WhatsApp within 24 hours of purchase and we'll match it — subject to verification.</p>
                  )
                },
                {
                  key: 'returns',
                  title: 'Returns & Exchange Policy',
                  icon: '♻',
                  content: (
                    <div>
                      <p className="meta-line">We accept exchanges within 7 days of delivery for size issues or manufacturing defects.</p>
                      <p className="meta-line">Items must be unworn, unwashed, and in original packaging with tags intact.</p>
                      <p className="meta-line color-vary"><strong>Custom-stitched pieces are not eligible for return or exchange.</strong></p>
                    </div>
                  )
                },
              ].map(item => (
                <div className="info-accordion-item" key={item.key}>
                  <button
                    className="info-accordion-header"
                    onClick={() => setActiveInfoAccordion(activeInfoAccordion === item.key ? null : item.key)}
                  >
                    <span className="info-accordion-title">
                      <span className="info-accordion-icon">{item.icon}</span>
                      {item.title}
                    </span>
                    <span className="info-accordion-toggle">{activeInfoAccordion === item.key ? '−' : '+'}</span>
                  </button>
                  {activeInfoAccordion === item.key && (
                    <div className="info-accordion-body">{item.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="reviews-section">
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 8 }}>Customer Reviews</h2>
          <div className="divider-gold" style={{ margin: '0 0 32px' }} />

          {product.reviews?.length > 0 ? (
            <div className="reviews-list">
              {product.reviews.map((r, i) => (
                <div className="review-item" key={i}>
                  <div className="review-header">
                    <strong>{r.name}</strong>
                    <span className="stars" style={{ fontSize: 13 }}>{'★'.repeat(r.rating)}</span>
                    <span className="review-date">{new Date(r.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <p>{r.comment}</p>
                  {r.verified && <span className="verified-badge">✓ Verified Purchase</span>}
                </div>
              ))}
            </div>
          ) : <p style={{ color: 'var(--gray-warm)' }}>No reviews yet. Be the first to review!</p>}

          <div className="review-form-wrap">
            <h3>Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  value={reviewForm.name}
                  onChange={e => setReviewForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <div className="star-select">
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      type="button"
                      className={`star-btn ${reviewForm.rating >= n ? 'active' : ''}`}
                      onClick={() => setReviewForm(f => ({ ...f, rating: n }))}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Review</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                  placeholder="Share your experience..."
                  required
                />
              </div>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              {reviewMsg && <p className="review-msg">{reviewMsg}</p>}
            </form>
          </div>
        </section>
      </div>

      {/* Discover More Styles */}
      <section className="discover-more">
        <div className="container">
          <h2 className="section-title">Discover More Styles</h2>
          <div className="divider-gold" />
          <p className="section-subtitle">You might also love these</p>

          <div className="products-grid">
            {(product.relatedProducts?.length ? product.relatedProducts : FALLBACK_RELATED).map(p => (
              <Link to={`/product/${p._id}`} className="product-card" key={p._id} style={{ display: 'block' }}>
                <div className="product-card-img-wrap">
                  {p.badge && <div className="product-card-badge"><span className="badge">{p.badge}</span></div>}
                  <img className="product-img" src={p.images?.[0]} alt={p.name} loading="lazy" />
                </div>
                <div className="product-card-info">
                  <h3 className="product-card-name">{p.name}</h3>
                  <span className="product-card-price">₹{p.price?.toLocaleString('en-IN')}</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/shop" className="btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Sticky mobile bar */}
      <div className="sticky-buy-bar">
        <div className="sticky-info">
          <span className="sticky-name">{product.name}</span>
          <span className="sticky-price">
            ₹{product.price?.toLocaleString('en-IN')}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="sticky-original">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
            )}
          </span>
        </div>
        <div className="sticky-actions">
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(`I want to know more about "${product.name}"`)}`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary sticky-cta-secondary"
          >
            Enquire
          </a>
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noreferrer"
            className="btn-primary sticky-cta"
          >
            Order Now
          </a>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="modal-overlay" onClick={() => setShowSizeChart(false)}>
          <div className="size-chart-modal" onClick={e => e.stopPropagation()}>
            <div className="size-chart-header">
              <h3>Size Chart</h3>
              <button className="modal-close" onClick={() => setShowSizeChart(false)} aria-label="Close">✕</button>
            </div>

            <div className="size-chart-tabs">
              <button
                className={`sc-tab ${sizeChartTab === 'india' ? 'active' : ''}`}
                onClick={() => setSizeChartTab('india')}
              >
                India
              </button>
              <button
                className={`sc-tab ${sizeChartTab === 'intl' ? 'active' : ''}`}
                onClick={() => setSizeChartTab('intl')}
              >
                International
              </button>
            </div>

            <div className="size-chart-table-wrap">
              <table className="size-chart-table">
                <thead>
                  <tr>
                    <th>US Size</th>
                    {Object.keys(SIZE_CHART).map(s => <th key={s}>{s}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bust (in/cm)</td>
                    {Object.values(SIZE_CHART).map((v, i) => <td key={i}>{v.bust}</td>)}
                  </tr>
                  <tr>
                    <td>Waist (in/cm)</td>
                    {Object.values(SIZE_CHART).map((v, i) => <td key={i}>{v.waist}</td>)}
                  </tr>
                  <tr>
                    <td>Hip (in/cm)</td>
                    {Object.values(SIZE_CHART).map((v, i) => <td key={i}>{v.hip}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="size-chart-note">Outfits come with an approximate 2-inch ease built in for comfort, styling, and ideal fit.</p>
            <p className="size-chart-note">Your perfect fit matters — easy size exchanges within 7 days.</p>
            <p className="size-chart-note"><strong>Note:</strong> The sizes mentioned are body measurements.</p>
            <p className="size-chart-note">
              Connect with us on a live video call for guided measurement support. Contact us on{' '}
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="size-chart-link-inline">+91 98765 43210</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}