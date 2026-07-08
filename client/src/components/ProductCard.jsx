export default function ProductCard({ product }) {

  const productId = product._id || product.id;
  const { name, price, originalPrice, images, badge } = product;

  return (
    
    <Link to={`/product/${productId}`} className="product-card" style={{ display: 'block' }}>
      <div className="product-card-img-wrap">
        {badge && <div className="product-card-badge"><span className="badge">{badge}</span></div>}
        <img
          className="product-img"
          src={images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'}
          alt={name}
          loading="lazy"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1558171813-2f5bbbc3cf44?w=600'; }}
        />
      </div>
      <div className="product-card-info">
        <h3 className="product-card-name">{name}</h3>
        <div>
          <span className="product-card-price">₹{price?.toLocaleString('en-IN')}</span>
          {originalPrice && originalPrice > price && (
            <span className="product-card-original">₹{originalPrice?.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </Link>
  );
}