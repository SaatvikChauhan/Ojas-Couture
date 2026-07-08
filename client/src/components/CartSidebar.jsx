import React, { useEffect } from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems = [] }) => {
  
  // Prevent background scrolling when the sidebar panel is active
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // 1. Inject the Razorpay checkout overlay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 2. Handle the Payment Gateway Trigger on click
  const handlePayment = async () => {
    // Dynamically calculate total from the real cart array items
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
    if (totalAmount <= 0) {
      alert("Your cart is empty!");
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    try {
      // Create the official Order ID on your server backend
      const orderResponse = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }) 
      });
      const orderData = await orderResponse.json();

      
      const options = {
        key: "rzp_test_XXXXXXXXXXXXXX", // ⚠️NEED TO REPLACE WITH  REAL PUBLIC KEY ID FROM RAZORPAY DASHBOARD
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Ojas Couture",
        description: "Secure Order Payment",
        order_id: orderData.id,
        handler: async function (response) {
          // Send cryptographic transaction details back to server for verification
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          
          const verification = await verifyResponse.json();
          if (verification.status === "success") {
            alert("Payment Successful! Order Confirmed 🎉");
            onClose(); // Close cart drawer panel layout view
          } else {
            alert("Payment verification failed ❌");
          }
        },
        theme: {
          color: "#4A0E17" // Optional: Matches elegant royal maroon/wine velvet themes
        }
      };

      const paymentWindow = new window.Razorpay(options);
      paymentWindow.open();
    } catch (err) {
      console.error("Checkout transaction error:", err);
      alert("Something went wrong initializing checkout.");
    }
  };

  return (
    <>
      {/* Dark tint backdrop overlay layer */}
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />

      {/* Main Sliding Panel Container */}
      <div className={`cart-sidebar-panel ${isOpen ? 'open' : ''}`}>
        
        {/* Header Section */}
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button onClick={onClose} className="cart-close-btn">&times;</button>
        </div>

        {/* Scrollable Items Container */}
        <div className="cart-items-body">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>
              Your cart is empty.
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item-row">
                <div className="cart-item-info">
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600"} 
                    alt={item.name} 
                    className="cart-item-img" 
                  />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{item.name}</h4>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>Qty: {item.quantity}</p>
                  </div>
                </div>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>₹{item.price}</span>
              </div>
            ))
          )}
        </div>

        {/* Total calculation & Checkout panel */}
        <div className="cart-footer">
          <div className="cart-total-row">
            <span style={{ color: '#555' }}>Total:</span>
            <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>
              ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
            </span>
          </div>
          {/* Linked click hook directly to Razorpay automation sequence execution */}
          <button onClick={handlePayment} className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;