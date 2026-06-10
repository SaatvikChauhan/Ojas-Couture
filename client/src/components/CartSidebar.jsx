// import React, { useEffect } from 'react';

// const CartSidebar = ({ isOpen, onClose, cartItems = [] }) => {
  
//   // Prevent background scrolling when the sidebar panel is active
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? 'hidden' : '';
//     return () => { document.body.style.overflow = ''; };
//   }, [isOpen]);

//   return (
//     <>
//       {/* Dark tint backdrop overlay layer */}
//       <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />

//       {/* Main Sliding Panel Container */}
//       <div className={`cart-sidebar-panel ${isOpen ? 'open' : ''}`}>
        
//         {/* Header Section */}
//         <div className="cart-header">
//           <h2>Your Cart</h2>
//           <button onClick={onClose} className="cart-close-btn">&times;</button>
//         </div>

//         {/* Scrollable Items Container */}
//         <div className="cart-items-body">
//           {cartItems.length === 0 ? (
//             <div style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>
//               Your cart is empty.
//             </div>
//           ) : (
//             cartItems.map((item) => (
//               <div key={item._id} className="cart-item-row">
//                 <div className="cart-item-info">
//                   <img 
//                     src={item.image || "https://via.placeholder.com/60"} 
//                     alt={item.name} 
//                     className="cart-item-img" 
//                   />
//                   <div>
//                     <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{item.name}</h4>
//                     <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#666' }}>Qty: {item.quantity}</p>
//                   </div>
//                 </div>
//                 <span style={{ fontWeight: '600', fontSize: '14px' }}>₹{item.price}</span>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Total calculation & Checkout panel */}
//         <div className="cart-footer">
//           <div className="cart-total-row">
//             <span style={{ color: '#555' }}>Total:</span>
//             <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>
//               ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
//             </span>
//           </div>
//           <button className="checkout-btn">Proceed to Checkout</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartSidebar;