import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI } from '../utils/api';
import WhatsAppButton from '../components/WhatsAppButton';

const FALLBACK = {
  _id: '1', name: 'Black Embroidered Kurti Set', price: 1699,
  description: 'Elegantly crafted black kurti with intricate gold embroidery.',
  fabric: 'Georgette', work: 'Embroidery', sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  badge: 'NEW', inStock: true,
  images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800'],
  reviews: [{ name: 'Priya', rating: 5, comment: 'Stunning quality!', date: new Date() }]
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [reviewMsg, setReviewMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
            <div className="detail-price">
              <span>₹{product.price?.toLocaleString('en-IN')}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
              )}
            </div>

            {product.reviews?.length > 0 && (
              <div className="detail-rating">
                <span className="stars">{'★'.repeat(Math.round(product.avgRating || 5))}</span>
                <span className="rating-count">({product.reviews.length} reviews)</span>
              </div>
            )}

            <p className="detail-desc">{product.description}</p>

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
                <p className="size-label">Select Size</p>
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
                📱 Order on WhatsApp
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
    </div>
  );
}
