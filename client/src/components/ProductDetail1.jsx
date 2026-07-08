import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productAPI, orderAPI, wishlistAPI } from '../utils/api';

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
    XS: { bust: '32 / 81.3', waist: '26 / 66', hip: '36 / 91.4' },
    S: { bust: '34 / 86.4', waist: '28 / 71.1', hip: '38 / 96.5' },
    M: { bust: '36 / 91.4', waist: '30 / 76.2', hip: '40 / 102' },
    L: { bust: '38 / 96.5', waist: '32 / 81.3', hip: '42 / 106.7' },
    XL: { bust: '40 / 101.6', waist: '34 / 86.4', hip: '44 / 111.8' },
};

const FALLBACK_RELATED = [
    { _id: '2', name: 'Beige Chikankari Kurta Set', price: 4500, badge: 'HANDMADE', images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'] },
    { _id: '3', name: 'Royal Blue Banarasi Silk Saree', price: 8500, badge: 'BEST SELLER', images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'] },
    { _id: '5', name: 'Pink Bandhani Kurti Set', price: 2200, badge: 'HANDMADE', images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'] },
    { _id: '6', name: 'Orange Embroidered Kurti', price: 1850, badge: 'NEW ARRIVAL', images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'] },
];

export default function ProductDetail1({ initialProduct }) {
    const { id } = useParams(); // Extracts the dynamic ID from your URL path
    const [product, setProduct] = useState(initialProduct || FALLBACK);
    const [loading, setLoading] = useState(!initialProduct); 
    const [activeImg, setActiveImg] = useState(0);

    // Dynamic data fetch logic whenever a user clicks a new product ID
    useEffect(() => {
        if (!initialProduct && id) {
            setLoading(true);
            productAPI.getById(id)
                .then(res => {
                    if (res.data) {
                        setProduct(res.data);
                        setActiveImg(0); // Reset main image focus on navigation
                    }
                })
                .catch(err => {
                    console.error("Error fetching unique product:", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id, initialProduct]);

    
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState(0);
   const [reviewForm, setReviewForm] = useState({ 
    name: '', 
    rating: 5, 
    title: '',        // New Field
    comment: '', 
    reviewType: 'product' // New Field: Defaults to product evaluation
});
    const [reviewMsg, setReviewMsg] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showSizeChart, setShowSizeChart] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState('description');
    const [activeInfoAccordion, setActiveInfoAccordion] = useState(null);
    const [sizeChartTab, setSizeChartTab] = useState('india');
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [enquiryType, setEnquiryType] = useState('');
    const [enquiryMessage, setEnquiryMessage] = useState('');
    const [enquirySubmitting, setEnquirySubmitting] = useState(false);

    // Order Modal State
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [orderSubmitting, setOrderSubmitting] = useState(false);
    const [orderForm, setOrderForm] = useState({
        name: '', email: '', phone: '',
        street: '', city: '', state: '', zip: ''
    });

    // 1. Add this hook at the top with your other states:
const [isWishlisted, setIsWishlisted] = useState(false);

// 2. Fetch initial wishlist state on load:
useEffect(() => {
    if (product && product._id && localStorage.getItem('token')) {
        wishlistAPI.get()
            .then(data => {
                if (data && data.products) {
                    const saved = data.products.some(p => p._id === product._id || p === product._id);
                    setIsWishlisted(saved);
                }
            })
            .catch(err => console.error("Error matching wishlist item:", err));
    }
}, [product]);

// 3. Update your handleAddToWishlist function to run dynamically:
const handleAddToWishlist = async () => {
    if (!localStorage.getItem('token')) {
        alert('Please log in to save items to your wishlist.');
        return;
    }
    try {
        const res = await wishlistAPI.toggle(product._id);
        setIsWishlisted(res.isWishlisted);
        alert(res.message);
    } catch (err) {
        console.error("Wishlist action failed:", err);
    }
};

    // Check if the current page path belongs to Little Wonders
    const isLittleWonders = window.location.pathname.includes('little-wonders') || product.category === 'little-wonders';

    const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment || !reviewForm.title) return;
    setSubmitting(true);
    try {
        await productAPI.addReview(product._id, reviewForm);
        setReviewMsg('Thank you for your review!');
        // Reset all custom form inputs
        setReviewForm({ name: '', rating: 5, title: '', comment: '', reviewType: 'product' });
        const res = await productAPI.getById(product._id);
        setProduct(res.data);
    } catch {
        setReviewMsg('Could not submit. Please try again.');
    } finally {
        setSubmitting(false);
    }
};

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (product.sizes?.length > 0 && !selectedSize) {
            alert('Please select a size before placing your order.');
            return;
        }

        setOrderSubmitting(true);
        
        const orderData = {
            customer: { 
                name: orderForm.name, 
                email: orderForm.email, 
                phone: orderForm.phone 
            },
            shippingAddress: { 
                street: orderForm.street, 
                city: orderForm.city, 
                state: orderForm.state, 
                zip: orderForm.zip, 
                country: 'India' 
            },
            products: [{ 
                name: `${product.name} ${selectedSize ? `(Size: ${selectedSize})` : ''}`, 
                quantity: 1, 
                price: product.price 
            }],
            totalAmount: product.price
        };

        try {
            const res = await orderAPI.create(orderData);
            alert(`Success! Your order has been placed. Order ID: ${res.data.orderId}`);
            setShowOrderModal(false);
            setOrderForm({ name: '', email: '', phone: '', street: '', city: '', state: '', zip: '' });
        } catch (err) {
            alert('Failed to place order. Please try again.');
        } finally {
            setOrderSubmitting(false);
        }
    };

    const handleWhatsAppEnquiry = () => {
        const phoneNumber = "919650656166"; // Ojas Couture phone number
        const text = encodeURIComponent(
            `Hi Ojas Couture, I am interested in inquiring about the "${product.name}". Can you please guide me further?`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    };

    const handleEnquirySubmit = async (e) => {
        e.preventDefault();
        setEnquirySubmitting(true);
        
        const enquiryData = {
            productId: product._id,
            productName: product.name,
            customerName: orderForm.name || "Guest User", // Reuse current order form name or custom field
            customerEmail: orderForm.email || "guest@example.com",
            enquiryType,
            message: enquiryMessage
        };

        try {
            const response = await fetch('/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enquiryData)
            });
            const data = await response.json();
            if (data.success) {
                alert(`${enquiryType} submitted successfully!`);
                setShowEnquiryModal(false);
                setEnquiryMessage('');
            } else {
                alert('Failed to submit enquiry.');
            }
        } catch (err) {
            console.error("Error submitting enquiry:", err);
            alert('Something went wrong. Please try again.');
        } finally {
            setEnquirySubmitting(false);
        }
    };

    const openEnquiryModal = (type) => {
        setEnquiryType(type);
        setShowEnquiryModal(true);
    };

    const discountPct = product.originalPrice && product.originalPrice > product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;
    const brandLabel = isLittleWonders ? 'Little Wonders by Pratibha Rajput' : (product.brand || 'Ojas Couture');
    const colorOptions = product.colors?.length > 0 ? product.colors : ['#1a1a1a', '#c9a84c', '#7f1d1d', '#2d4a2d', '#6b4226', '#8b4789'];

    const handleAddToCart = async () => {
        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify({
                    productId: product._id,
                    size: selectedSize,
                    quantity: 1
                })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Product added to cart successfully!');
            } else {
                alert(data.error || 'Failed to add item to cart');
            }
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({ title: product.name, url: window.location.href });
        } else {
            alert('Link copied to clipboard!');
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        fontSize: '14px',
        border: '1px solid #d1cdb8',
        borderRadius: '4px',
        outline: 'none',
        boxSizing: 'border-box'
    };

   // ... all your states, hooks, and handler functions are up here ...

    // PUT THE CHECKS HERE (Right before the final return statement):
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', fontSize: '18px', color: '#5A3E2B', fontFamily: 'sans-serif' }}>
                Loading Product Details...
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', fontSize: '18px', color: 'red', fontFamily: 'sans-serif' }}>
                Product Not Found.
            </div>
        );
    }

    

    const productSchemaJSON = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": product.name,
  "image": product.images,
  "description": product.description,
  "offers": {
    "@type": "Offer",
    "url": window.location.href,
    "priceCurrency": "INR",
    "price": product.price,
    "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
  }
};

    return (
        <div className="product-detail" style={{ paddingTop: 72 }}>
            <script type="application/ld+json">
      {JSON.stringify(productSchemaJSON)}
    </script>
            <div className="container">
                <nav className="breadcrumb-nav">
                    <Link to="/">Home</Link> › <Link to={isLittleWonders ? "/little-wonders" : "/shop"}>{isLittleWonders ? "Little Wonders" : "Shop"}</Link> › <span>{product.name}</span>
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
                            <button 
        onClick={handleAddToWishlist} 
        style={{
            padding: '14px',
            backgroundColor: '#e8e5e0',
            border: '1px solid #d1cdb8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '51px',
            width: '51px'
        }}
        aria-label="Add to wishlist"
    >
        <svg 
            viewBox="0 0 24 24" 
            fill={isWishlisted ? "#D4AF37" : "none"} 
            stroke={isWishlisted ? "#D4AF37" : "#1a1a1a"} 
            strokeWidth="1.5" 
            width="20" 
            height="20"
        >
            <path d="M12 21s-7.5-4.6-10-9.3C0.3 8.6 2 5 5.5 5 8 5 10 6.7 12 9c2-2.3 4-4 6.5-4C22 5 23.7 8.6 22 11.7 19.5 16.4 12 21 12 21z" />
        </svg>
    </button>
                            <button className="wishlist-btn" onClick={handleAddToWishlist} aria-label="Add to wishlist">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                                    <path d="M12 21s-7.5-4.6-10-9.3C0.3 8.6 2 5 5.5 5 8 5 10 6.7 12 9c2-2.3 4-4 6.5-4C22 5 23.7 8.6 22 11.7 19.5 16.4 12 21 12 21z" />
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
                                        <img src={img} alt={`View ${i + 1}`} />
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

                        {/* Integrated Actions Section */}
                        <div className="product-actions-wrapper" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', fontFamily: 'sans-serif' }}>
                            
                            {/* PRIMARY ACTION ROW: Add to Cart + Wishlist + Share */}
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', width: '100%' }}>
                                <button 
                                    className="add-to-cart-btn" 
                                    onClick={handleAddToCart} 
                                    style={{ 
                                        flex: 1, 
                                        padding: '16px', 
                                        fontSize: '15px', 
                                        fontWeight: '500',
                                        letterSpacing: '0.5px',
                                        backgroundColor: '#5A3E2B', 
                                        color: '#ffffff',          
                                        border: 'none',
                                        cursor: 'pointer',
                                        height: '51px'
                                    }}
                                >
                                    Add to Cart
                                </button>

                                {/* Wishlist Button */}
                                <button 
                                    onClick={handleAddToWishlist} 
                                    style={{
                                        padding: '14px',
                                        backgroundColor: '#e8e5e0',
                                        border: '1px solid #d1cdb8',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '51px',
                                        width: '51px'
                                    }}
                                    aria-label="Add to wishlist"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" width="20" height="20">
                                        <path d="M12 21s-7.5-4.6-10-9.3C0.3 8.6 2 5 5.5 5 8 5 10 6.7 12 9c2-2.3 4-4 6.5-4C22 5 23.7 8.6 22 11.7 19.5 16.4 12 21 12 21z" />
                                    </svg>
                                </button>

                                {/* Share Button */}
                                <button 
                                    onClick={handleShare} 
                                    style={{
                                        padding: '14px',
                                        backgroundColor: '#e8e5e0',
                                        border: '1px solid #d1cdb8',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '51px',
                                        width: '51px'
                                    }}
                                    aria-label="Share"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" width="20" height="20">
                                        <circle cx="18" cy="5" r="3" />
                                        <circle cx="6" cy="12" r="3" />
                                        <circle cx="18" cy="19" r="3" />
                                        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
                                    </svg>
                                </button>
                            </div>

                            {/* SECONDARY ACTION: Buy it Now */}
                            <button 
                                className="btn-primary order-now-btn" 
                                onClick={() => setShowOrderModal(true)}
                                style={{ 
                                    cursor: 'pointer', 
                                    width: '100%', 
                                    padding: '16px', 
                                    fontSize: '15px', 
                                    fontWeight: '500',
                                    letterSpacing: '0.5px',
                                    backgroundColor: '#e8e5e0', 
                                    color: '#1a1a1a',          
                                    border: '1px solid #d1cdb8',
                                    height: '51px'
                                }}
                            >
                                Buy it now
                            </button>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <button type="button" onClick={() => openEnquiryModal('Request Price')} style={{ padding: '14px', border: '1px solid #5A3E2B', background: 'transparent', color: '#5A3E2B', cursor: 'pointer', fontWeight: '500' }}>
                                        Request Price
                                    </button>
                                    <button type="button" onClick={() => openEnquiryModal('Book Consultation')} style={{ padding: '14px', border: '1px solid #5A3E2B', background: 'transparent', color: '#5A3E2B', cursor: 'pointer', fontWeight: '500' }}>
                                        Book Consultation
                                    </button>
                                </div>
                                <button type="button" onClick={() => openEnquiryModal('Custom Order')} style={{ padding: '14px', backgroundColor: '#7A6242', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
                                    Custom Order Request
                                </button>
                                <button type="button" onClick={handleWhatsAppEnquiry} style={{ padding: '14px', backgroundColor: '#25D366', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    WhatsApp Enquiry
                                </button>
                            </div>
                            
                            {/* SECTION 1: Shipping & Policy Icons Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center', marginTop: '10px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '20px', marginBottom: '4px' }}>🚚</span>
                                    <span style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', color: '#4a4a4a', letterSpacing: '0.5px', lineHeight: '1.2' }}>Worldwide<br/>Shipping</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '20px', marginBottom: '4px' }}>🔄</span>
                                    <span style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', color: '#4a4a4a', letterSpacing: '0.5px', lineHeight: '1.2' }}>10-Day<br/>Exchange</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '20px', marginBottom: '4px' }}>🛡️</span>
                                    <span style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', color: '#4a4a4a', letterSpacing: '0.5px', lineHeight: '1.2' }}>Secure<br/>Checkout</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '20px', marginBottom: '4px' }}>💵</span>
                                    <span style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', color: '#4a4a4a', letterSpacing: '0.5px', lineHeight: '1.2' }}>Cash On<br/>Delivery</span>
                                </div>
                            </div>

                            {/* SECTION 2: Ada Points Banner */}
                            <div style={{ 
                                backgroundColor: '#7A6242', 
                                color: '#ffffff', 
                                padding: '12px 16px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '6px',
                                fontSize: '14px', 
                                fontWeight: '400',
                                borderRadius: '2px',
                                marginTop: '5px'
                            }}>
                                <span>✦</span>
                                <span>Earn upto 131 Ada Points on this purchase</span>
                                <span style={{ cursor: 'pointer', fontSize: '12px', border: '1px solid #ffffff', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1', marginLeft: '2px' }}>i</span>
                            </div>

                            {/* SECTION 3: Brand Core Badges Grid (6 Columns) */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', textAlign: 'center', marginTop: '10px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '18px', marginBottom: '4px' }}>👩🏽‍🤝‍👩🏻</span>
                                    <span style={{ fontSize: '8px', color: '#6a6a6a', fontWeight: '600', textTransform: 'uppercase', lineHeight: '1.2' }}>Supporting<br/>30,000+ Women<br/>Artisans</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '18px', marginBottom: '4px' }}>📜</span>
                                    <span style={{ fontSize: '8px', color: '#6a6a6a', fontWeight: '600', textTransform: 'uppercase', lineHeight: '1.2' }}>GI Certified &<br/>100%<br/>% Handcrafted</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '18px', marginBottom: '4px' }}>🤝</span>
                                    <span style={{ fontSize: '8px', color: '#6a6a6a', fontWeight: '600', textTransform: 'uppercase', lineHeight: '1.2' }}>Customer<br/>Support</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '18px', marginBottom: '4px' }}>🏅</span>
                                    <span style={{ fontSize: '8px', color: '#6a6a6a', fontWeight: '600', textTransform: 'uppercase', lineHeight: '1.2' }}>Assured<br/>Quality</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '18px', marginBottom: '4px' }}>🕌</span>
                                    <span style={{ fontSize: '8px', color: '#6a6a6a', fontWeight: '600', textTransform: 'uppercase', lineHeight: '1.2' }}>Made In Avadh<br/>Region</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '18px', marginBottom: '4px' }}>🎁</span>
                                    <span style={{ fontSize: '8px', color: '#6a6a6a', fontWeight: '600', textTransform: 'uppercase', lineHeight: '1.2' }}>Earn<br/>Rewards</span>
                                </div>
                            </div>
                        </div>

                        {/* Need urgent delivery / chat bar */}
                        <a
                            href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi! I need urgent delivery info for "${product.name}".`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="urgent-chat-bar"
                            style={{ marginTop: '16px', display: 'flex' }}
                        >
                            <span className="urgent-chat-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </span>
                            <span className="urgent-chat-text">Need urgent delivery? Chat with us</span>
                            <span className="online-dot">Online</span>
                        </a>

                        <div className="info-banner">
                            <span className="info-banner-icon">★</span>
                            <span>All products arrive in a complimentary <strong>Ojas Couture</strong> gift box — beautifully packaged and ready to gift.</span>
                        </div>

                        {/* Accordion Setup */}
                       {/* ACCORDION/TAB SYSTEM */}
                        <div className="detail-tabs">
                            {isLittleWonders ? (
                                // Sheetal Batra Style for Little Wonders
                                ['description', 'customization', 'policies'].map(tab => (
                                    <button
                                        key={tab}
                                        className={`detail-tab ${activeAccordion === tab ? 'active' : ''}`}
                                        onClick={() => setActiveAccordion(tab)}
                                    >
                                        {tab === 'customization' ? 'Customization & Video Call' : tab === 'policies' ? 'Policies & Shipping' : 'Description'}
                                    </button>
                                ))
                            ) : (
                                // Ada Chikan Style: Standard simple Description view only
                                <button className="detail-tab active">Description</button>
                            )}
                        </div>

                        <div className="detail-tab-content">
                            {/* Standard Description (Used by Both Styles) */}
                            {(!isLittleWonders || activeAccordion === 'description') && (
                                <div>
                                    <p className="detail-desc">{product.description}</p>
                                    {product.fabric && <p className="meta-line"><strong>Material/Fabric:</strong> {product.fabric}</p>}
                                    <p className="meta-line"><strong>COD Available</strong> | Shipping Worldwide</p>
                                    <p className="meta-line"><strong>Wash Care:</strong> Dry Clean Only</p>
                                    <p className="meta-line"><strong>Delivery Timeline:</strong> {isLittleWonders ? '12–15 Days (Tailored Custom Stitched)' : '7–10 Days'}</p>
                                    <p className="meta-line color-vary"><strong>Color may vary slightly.</strong></p>
                                </div>
                            )}
                            
                            {/* Little Wonders Specific Customization Tab */}
                            {isLittleWonders && activeAccordion === 'customization' && (
                                <div className="customization-grid">
                                    <div className="custom-item">
                                        <strong>Video Call Consulting</strong>
                                        <p>Discover the piece you love closely with our on-call stylists.</p>
                                    </div>
                                    <div className="custom-item">
                                        <strong>Need it sooner?</strong>
                                        <p>Skip the queue — let us know when you have an event!</p>
                                    </div>
                                    <div className="custom-item">
                                        <strong>Bespoke Customise Options</strong>
                                        <p>Change the color, neckline, or design as per your liking.</p>
                                    </div>
                                    <div className="custom-item">
                                        <strong>Add or remove from set</strong>
                                        <p>Need a matching dupatta? It's all possible!</p>
                                    </div>
                                    <a
                                        href="https://wa.me/919876543210?text=Hi! I'd like to discuss customization options for Little Wonders."
                                        target="_blank" rel="noreferrer" className="custom-chat-link"
                                    >
                                        Chat with us, and we can help you with all of the above! Connect on <strong>+91 98765 43210</strong>
                                    </a>
                                </div>
                            )}

                            {/* Little Wonders Specific Sheetal Batra Policies Tab */}
                            {isLittleWonders && activeAccordion === 'policies' && (
                                <div>
                                    <p className="meta-line"><strong>Bespoke Custom Production:</strong> Since each Little Wonders outfit is curated individually to custom fits, manufacturing takes 12–15 business days before shipping.</p>
                                    <p className="meta-line"><strong>Adjustments & Fittings:</strong> Eligible for free measurement sizing adjustments and adjustments within 10 days of delivery.</p>
                                    <p className="meta-line color-vary">Our pieces are artisanal fabric crafts made with specialized custom details.</p>
                                </div>
                            )}
                        </div>
                        <div className="detail-tab-content">
                            {activeAccordion === 'description' && (
                                <div>
                                    <p className="detail-desc">{product.description}</p>
                                    {product.fabric && <p className="meta-line"><strong>Material/Fabric:</strong> {product.fabric}</p>}
                                    <p className="meta-line"><strong>COD Available</strong> | Shipping Worldwide</p>
                                    <p className="meta-line"><strong>Wash Care:</strong> Dry Clean Only</p>
                                    <p className="meta-line"><strong>Delivery Timeline:</strong> {isLittleWonders ? '12–15 Days (Tailored Custom Stitched)' : '7–10 Days'}</p>
                                    <p className="meta-line color-vary"><strong>Color may vary slightly.</strong></p>
                                </div>
                            )}
                            
                            {/* Customization Grid is visible ONLY for Little Wonders */}
                            {activeAccordion === 'customization' && isLittleWonders && (
                                <div className="customization-grid">
                                    <div className="custom-item">
                                        <strong>Video Call Consulting</strong>
                                        <p>Discover the piece you love closely with our on-call stylists.</p>
                                    </div>
                                    <div className="custom-item">
                                        <strong>Need it sooner?</strong>
                                        <p>Skip the queue — let us know when you have an event!</p>
                                    </div>
                                    <div className="custom-item">
                                        <strong>Bespoke Customise Options</strong>
                                        <p>Change the color, neckline, or design as per your liking.</p>
                                    </div>
                                    <div className="custom-item">
                                        <strong>Add or remove from set</strong>
                                        <p>Need a matching dupatta? It's all possible!</p>
                                    </div>
                                    <a
                                        href="https://wa.me/919876543210?text=Hi! I'd like to discuss customization options for Little Wonders."
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
                                    {isLittleWonders ? (
                                        /* Sheetal Batra Styled Custom Policy Terms */
                                        <>
                                            <p className="meta-line"><strong>Bespoke Custom Production:</strong> Since each Little Wonders outfit is curated individually to custom fits, manufacturing takes 12–15 business days before shipping.</p>
                                            <p className="meta-line"><strong>Adjustments & Fittings:</strong> Eligible for free measurement sizing adjustments and adjustments within 10 days of delivery.</p>
                                            <p className="meta-line color-vary">Our pieces are artisanal fabric crafts made with specialized custom details.</p>
                                        </>
                                    ) : (
                                        /* Clean Ada Chikan Styled Standard Terms */
                                        <>
                                            <p className="meta-line">Standard shipping: 5–7 business days within India.</p>
                                            <p className="meta-line">International shipping available — duties may apply.</p>
                                            <p className="meta-line">Easy exchanges within 7 days of delivery for size issues.</p>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Extra informational dropdowns are hidden for standard Ada style pages */}
                        {isLittleWonders && (
                            <div className="info-accordions">
                                {[
                                    {
                                        key: 'faqs', title: 'FAQs', icon: 'ⓘ',
                                        content: (
                                            <div>
                                                <p className="meta-line"><strong>How long will my order take?</strong><br />Most orders are dispatched within 12-15 days.</p>
                                                <p className="meta-line"><strong>Can I customise this piece?</strong><br />Yes! Color, fabric, and fit changes are available — chat with us on WhatsApp.</p>
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
                                                <span className="info-accordion-icon">{item.icon}</span>{item.title}
                                            </span>
                                            <span className="info-accordion-toggle">{activeInfoAccordion === item.key ? '−' : '+'}</span>
                                        </button>
                                        {activeInfoAccordion === item.key && <div className="info-accordion-body">{item.content}</div>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="reviews-section" style={{ padding: '40px 0', fontFamily: 'sans-serif' }}>
                    <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>Customer Reviews</h2>
                    <div className="divider-gold" style={{ margin: '0 0 32px' }} />

{product.reviews?.length > 0 ? (
    <div className="reviews-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {product.reviews.map((r, i) => (
            <div className="review-item" key={i} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
                <div className="review-header" style={{ marginBottom: '8px' }}>
                    <strong style={{ marginRight: '10px' }}>{r.name}</strong>
                    {r.verifiedPurchase && (
                        <span style={{ fontSize: '11px', backgroundColor: '#e6f4ea', color: '#137333', padding: '2px 6px', borderRadius: '4px', marginRight: '10px', fontWeight: 'bold' }}>
                            ✓ Verified Purchase
                        </span>
                    )}
                    <span className="stars" style={{ fontSize: 13, color: '#D4AF37' }}>{'★'.repeat(r.rating)}</span>
                    <span className="review-date" style={{ float: 'right', color: '#888', fontSize: '12px' }}>
                        {new Date(r.date).toLocaleDateString('en-IN')}
                    </span>
                </div>
                
                {/* Title */}
                <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '600', color: '#1a1a1a' }}>{r.title}</h4>
                
                {/* Comment Text */}
                <p style={{ margin: '0 0 12px 0', color: '#4a4a4a', lineHeight: '1.5' }}>{r.comment}</p>

                {/* Images Attachment Gallery Grid */}
                {r.images?.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        {r.images.map((img, idx) => (
                            <img key={idx} src={img} alt="User upload attachment" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                        ))}
                    </div>
                )}

                {/* Helpfulness Tracker Action Counter */}
                <button 
                    onClick={async () => {
                        const updated = await productAPI.markHelpful(product._id, r._id);
                        // Refresh product context state variable to view update increments
                        productAPI.getById(product._id).then(res => setProduct(res.data));
                    }}
                    style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', fontSize: '13px', padding: 0 }}
                >
                    Helpful ({r.helpfulCount || 0})
                </button>
            </div>
        ))}
    </div>
) : (
    <p style={{ color: 'var(--gray-warm)' }}>No reviews yet. Be the first to review!</p>
)}

                    {product.reviews?.length > 0 ? (
                        <div className="reviews-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                    ) : (
                        <p style={{ color: 'var(--gray-warm)' }}>No reviews yet. Be the first to review!</p>
                    )}

                    <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-start' }}>
                        <button 
                            onClick={() => setShowReviewModal(true)}
                            style={{ 
                                padding: '12px 28px', 
                                backgroundColor: '#5A3E2B', 
                                color: '#ffffff', 
                                border: 'none', 
                                fontSize: '14px', 
                                fontWeight: '500', 
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Write a Review
                        </button>
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
                        <Link to={isLittleWonders ? "/little-wonders" : "/shop"} className="btn-secondary">
                            View All {isLittleWonders ? "Little Wonders" : "Products"}
                        </Link>
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
                    <button 
                        className="btn-primary sticky-cta" 
                        onClick={() => setShowOrderModal(true)}
                        style={{ border: 'none', cursor: 'pointer' }}
                    >
                        Order Now
                    </button>
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

            {/* ORDER MODAL */}
            {showOrderModal && (
                <div className="modal-overlay" onClick={() => setShowOrderModal(false)} style={{ zIndex: 9999 }}>
                    <div className="size-chart-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 500, padding: 24 }}>
                        <div className="size-chart-header">
                            <h3>Place Your Order</h3>
                            <button className="modal-close" onClick={() => setShowOrderModal(false)} aria-label="Close">✕</button>
                        </div>
                        
                        <div style={{ padding: '16px 0', borderBottom: '1px solid #eee', marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                <span>{product.name} {selectedSize && `(${selectedSize})`}</span>
                                <span>₹{product.price?.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <input style={inputStyle} type="text" placeholder="Full Name" required 
                                value={orderForm.name} onChange={e => setOrderForm({...orderForm, name: e.target.value})} />
                            
                            <div style={{ display: 'flex', gap: 12 }}>
                                <input style={inputStyle} type="email" placeholder="Email" required 
                                    value={orderForm.email} onChange={e => setOrderForm({...orderForm, email: e.target.value})} />
                                <input style={inputStyle} type="tel" placeholder="Phone Number" required 
                                    value={orderForm.phone} onChange={e => setOrderForm({...orderForm, phone: e.target.value})} />
                            </div>

                            <input style={inputStyle} type="text" placeholder="Street Address" required 
                                value={orderForm.street} onChange={e => setOrderForm({...orderForm, street: e.target.value})} />
                            
                            <div style={{ display: 'flex', gap: 12 }}>
                                <input style={inputStyle} type="text" placeholder="City" required 
                                    value={orderForm.city} onChange={e => setOrderForm({...orderForm, city: e.target.value})} />
                                <input style={inputStyle} type="text" placeholder="State" required 
                                    value={orderForm.state} onChange={e => setOrderForm({...orderForm, state: e.target.value})} />
                                <input style={inputStyle} type="text" placeholder="ZIP Code" required 
                                    value={orderForm.zip} onChange={e => setOrderForm({...orderForm, zip: e.target.value})} />
                            </div>

                            <button type="submit" className="btn-primary" disabled={orderSubmitting} style={{ marginTop: 16, cursor: 'pointer', border: 'none' }}>
                                {orderSubmitting ? 'Processing...' : `Confirm Order • ₹${product.price?.toLocaleString('en-IN')}`}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* WRITE A REVIEW MODAL CARD */}
            {/* WRITE A REVIEW MODAL CARD */}
{showReviewModal && (
    <div className="modal-overlay" onClick={() => setShowReviewModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
        <div className="review-modal-card" onClick={e => e.stopPropagation()} style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '500px', padding: '28px', borderRadius: '4px', boxSizing: 'border-box', position: 'relative', fontFamily: 'sans-serif' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>Write a Review</h3>
                <button className="modal-close" onClick={() => setShowReviewModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#999' }} aria-label="Close">✕</button>
            </div>

            <form onSubmit={(e) => { handleReviewSubmit(e); setShowReviewModal(false); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Name */}
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4a4a4a', textTransform: 'uppercase' }}>Your Name</label>
                    <input
                        type="text"
                        value={reviewForm.name}
                        onChange={e => setReviewForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Enter your name"
                        style={inputStyle}
                        required
                    />
                </div>

                {/* Service/Product Context Switcher */}
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4a4a4a', textTransform: 'uppercase' }}>What are you reviewing?</label>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                        <label style={{ fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <input 
                                type="radio" 
                                name="reviewType" 
                                value="product"
                                checked={reviewForm.reviewType === 'product'}
                                onChange={e => setReviewForm(f => ({ ...f, reviewType: e.target.value }))}
                            /> Product Quality
                        </label>
                        <label style={{ fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <input 
                                type="radio" 
                                name="reviewType" 
                                value="service"
                                checked={reviewForm.reviewType === 'service'}
                                onChange={e => setReviewForm(f => ({ ...f, reviewType: e.target.value }))}
                            /> Delivery & Service
                        </label>
                    </div>
                </div>

                {/* Overall Rating Selection */}
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4a4a4a', textTransform: 'uppercase' }}>Overall Rating</label>
                    <div className="star-select" style={{ display: 'flex', gap: '6px' }}>
                        {[1, 2, 3, 4, 5].map(n => (
                            <button
                                key={n}
                                type="button"
                                className={`star-btn ${reviewForm.rating >= n ? 'active' : ''}`}
                                onClick={() => setReviewForm(f => ({ ...f, rating: n }))}
                                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', padding: 0, color: reviewForm.rating >= n ? '#D4AF37' : '#e0e0e0' }}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                {/* Review Title */}
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4a4a4a', textTransform: 'uppercase' }}>Review Title</label>
                    <input
                        type="text"
                        value={reviewForm.title}
                        onChange={e => setReviewForm(f => ({ ...f, title: e.target.value }))}
                        placeholder="Summarize your experience (e.g. Beautiful Fit!, Delayed Shipping)"
                        style={inputStyle}
                        required
                    />
                </div>

                {/* Detailed Testimonial Text Area */}
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#4a4a4a', textTransform: 'uppercase' }}>Detailed Review / Testimonial</label>
                    <textarea
                        value={reviewForm.comment}
                        onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                        placeholder="Write your detailed review details here..."
                        style={{ ...inputStyle, height: '100px', resize: 'vertical' }}
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={submitting}
                    style={{ marginTop: '8px', padding: '14px', backgroundColor: '#5A3E2B', color: '#ffffff', border: 'none', fontWeight: '600', fontSize: '15px', cursor: 'pointer', textTransform: 'uppercase' }}
                >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                {reviewMsg && <p className="review-msg" style={{ margin: 0, textAlign: 'center', color: 'green', fontSize: '14px' }}>{reviewMsg}</p>}
            </form>
        </div>
    </div>
)}

{/* --- ADD THIS COUTURE ENQUIRY MODAL AT THE BOTTOM --- */}
            {showEnquiryModal && (
                <div className="modal-overlay" onClick={() => setShowEnquiryModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10001 }}>
                    <div className="review-modal-card" onClick={e => e.stopPropagation()} style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '450px', padding: '24px', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f0f0f0', paddingBottom: '12px' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{enquiryType}</h3>
                            <button className="modal-close" onClick={() => setShowEnquiryModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#999' }}>✕</button>
                        </div>
                        <p style={{ fontSize: '14px', color: '#6a6a6a', marginBottom: '16px' }}>Enquiring for: <strong>{product.name}</strong></p>
                        <form onSubmit={handleEnquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '12px', fontWeight: '600', color: '#4a4a4a' }}>MESSAGE / CUSTOM REQUIREMENT</label>
                                <textarea 
                                    value={enquiryMessage}
                                    onChange={e => setEnquiryMessage(e.target.value)}
                                    placeholder="Enter details about sizing adjustments, expected timelines, or questions..."
                                    style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary" disabled={enquirySubmitting} style={{ border: 'none', padding: '14px', backgroundColor: '#5A3E2B', color: '#ffffff', fontWeight: '600', cursor: 'pointer' }}>
                                {enquirySubmitting ? 'Submitting Request...' : 'Submit Enquiry'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* ----------------------------------------------------- */}
        </div>
    );
}