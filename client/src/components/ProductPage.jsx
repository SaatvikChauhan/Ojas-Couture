import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Assuming you have a Cart Context

const ProductPage = () => {
  const { addToCart, toggleCartDrawer } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  const product = {
    id: "6a33fc6da7ccde6a55b6d3bd",
    name: "Mustard Phulkari Dupatta Set",
    price: 2800,
    image: "mustard-phulkari.jpg"
  };

  const sizes = ['S', 'M', 'L', 'XL'];

  // 1. ADD TO CART HANDLER
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    // Add item to global React State / LocalStorage
    addToCart({ ...product, size: selectedSize, quantity: 1 });
    // Slide open your sidebar drawer automatically
    toggleCartDrawer(true); 
  };

  // 2. ORDER NOW HANDLER (Direct Gateway Redirect)
  const handleOrderNow = async () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    try {
      // Send single product payload directly to backend checkout session
      const response = await fetch('http://localhost:5000/api/checkout/direct-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: { ...product, size: selectedSize, quantity: 1 }
        })
      });

      const data = await response.json();

      if (data.url) {
        // Redirect user straight to Stripe/Razorpay/Hosted checkout page
        window.location.href = data.url;
      } else {
        alert("Failed to initiate checkout. Try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <p className="price">₹{product.price}</p>

      {/* Size Buttons */}
      <div className="size-selection">
        <p>SELECT SIZE</p>
        {sizes.map(size => (
          <button 
            key={size} 
            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Dual Action Buttons */}
      <div className="product-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button className="btn-add-to-cart" onClick={handleAddToCart}>
          ADD TO CART
        </button>
        <button className="btn-order-now" onClick={handleOrderNow}>
          ORDER NOW
        </button>
      </div>
    </div>
  );
};

export default ProductPage;