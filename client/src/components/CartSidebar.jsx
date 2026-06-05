import React from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems = [] }) => {
  return (
    <>
      {/* Backdrop overlay when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl font-bold focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* Sidebar Content / Items List */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Your cart is currently empty.
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image || "https://via.placeholder.com/60"} 
                      alt={item.name} 
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">₹{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Footer / Checkout Button */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white">
          <div className="flex justify-between mb-4">
            <span className="font-medium text-gray-700">Total:</span>
            <span className="font-bold text-lg text-gray-900">
              ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
            </span>
          </div>
          <button className="w-full bg-black text-white py-2.5 rounded hover:bg-gray-800 transition duration-200 uppercase tracking-wider text-sm font-medium">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;