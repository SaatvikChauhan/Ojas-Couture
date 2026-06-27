import React, { useState, useEffect } from 'react';

// Mock Data representing a professional database response
const MOCK_USER = {
    name: "Aisha Sharma",
    email: "aisha.sharma@example.com",
    phone: "+91 98765 43210",
    joinedDate: "October 2024",
    defaultAddress: "42, Green Glen Layout, Outer Ring Road, Bangalore, Karnataka - 560103"
};

const MOCK_ORDERS = [
    {
        id: "ORD-2026-8891",
        date: "14 May 2026",
        status: "Delivered",
        total: 4500,
        items: ["Beige Chikankari Kurta Set (Size: M)"]
    },
    {
        id: "ORD-2026-1102",
        date: "02 Feb 2026",
        status: "In Transit",
        total: 1699,
        items: ["Black Embroidered Kurti Set (Size: M)"]
    }
];

const MOCK_WISHLIST = [
    { id: "3", name: "Royal Blue Banarasi Silk Saree", price: 8500, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300", inStock: true },
    { id: "5", name: "Pink Bandhani Kurti Set", price: 2200, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300", inStock: false }
];

export default function AccountDashboard({ onClose }) {
    const [activeTab, setActiveTab] = useState('profile'); // profile | orders | wishlist
    const [user, setUser] = useState(MOCK_USER);
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [wishlist, setWishlist] = useState(MOCK_WISHLIST);

    // Dynamic style helpers
    const tabStyle = (tabName) => ({
        padding: '12px 20px',
        background: 'none',
        border: 'none',
        borderBottom: activeTab === tabName ? '2px solid #5A3E2B' : '2px solid transparent',
        color: activeTab === tabName ? '#5A3E2B' : '#7a7a7a',
        fontWeight: activeTab === tabName ? '600' : '400',
        fontSize: '14px',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        transition: 'all 0.2s ease'
    });

    return (
        <div style={{
            position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '500px', height: '100vh',
            backgroundColor: '#ffffff', boxShadow: '-4px 0 25px rgba(0,0,0,0.15)', zIndex: 15000,
            display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif'
        }}>
            
            {/* Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #f0edf0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#1a1a1a' }}>My Account</h3>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#7a7a7a' }}>Welcome back, {user.name.split(' ')[0]}</p>
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}>✕</button>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #f0edf0', backgroundColor: '#faf9f6' }}>
                <button onClick={() => setActiveTab('profile')} style={tabStyle('profile')}>Profile</button>
                <button onClick={() => setActiveTab('orders')} style={tabStyle('orders')}>Orders ({orders.length})</button>
                <button onClick={() => setActiveTab('wishlist')} style={tabStyle('wishlist')}>Wishlist ({wishlist.length})</button>
            </div>

            {/* Dashboard Content Container */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                
                {/* 1. PROFILE INFO TAB */}
                {activeTab === 'profile' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ backgroundColor: '#faf9f6', padding: '16px', borderRadius: '4px', border: '1px solid #e8e5e0' }}>
                            <h4 style={{ margin: '0 0 12px', fontSize: '14px', textTransform: 'uppercase', color: '#5A3E2B' }}>Personal Details</h4>
                            <p style={{ margin: '6px 0', fontSize: '14px' }}><strong>Name:</strong> {user.name}</p>
                            <p style={{ margin: '6px 0', fontSize: '14px' }}><strong>Email:</strong> {user.email}</p>
                            <p style={{ margin: '6px 0', fontSize: '14px' }}><strong>Phone:</strong> {user.phone}</p>
                            <p style={{ margin: '6px 0', fontSize: '12px', color: '#7a7a7a', marginTop: '12px' }}>Member since: {user.joinedDate}</p>
                        </div>

                        <div style={{ backgroundColor: '#faf9f6', padding: '16px', borderRadius: '4px', border: '1px solid #e8e5e0' }}>
                            <h4 style={{ margin: '0 0 12px', fontSize: '14px', textTransform: 'uppercase', color: '#5A3E2B' }}>Default Shipping Address</h4>
                            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#4a4a4a' }}>{user.defaultAddress}</p>
                            <button style={{ marginTop: '12px', background: 'none', border: 'none', color: '#5A3E2B', fontWeight: '600', fontSize: '13px', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
                                Edit Address
                            </button>
                        </div>
                        
                        <button style={{ marginTop: 'auto', padding: '14px', backgroundColor: '#e8e5e0', color: '#1a1a1a', border: '1px solid #d1cdb8', cursor: 'pointer', fontWeight: '500' }}>
                            Log Out
                        </button>
                    </div>
                )}

                {/* 2. ORDER HISTORY TAB */}
                {activeTab === 'orders' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {orders.map((order) => (
                            <div key={order.id} style={{ border: '1px solid #e8e5e0', borderRadius: '4px', padding: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
                                    <span style={{ color: '#7a7a7a' }}>ID: <strong>{order.id}</strong></span>
                                    <span style={{ 
                                        fontWeight: '600', 
                                        color: order.status === 'Delivered' ? 'green' : '#7A6242',
                                        backgroundColor: order.status === 'Delivered' ? '#e2f0d9' : '#fff2cc',
                                        padding: '2px 8px', borderRadius: '2px', fontSize: '11px'
                                    }}>{order.status}</span>
                                </div>
                                <div style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>
                                    {order.items.map((item, idx) => <p key={idx} style={{ margin: '4px 0' }}>{item}</p>)}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', pt: '12px', borderTop: '1px solid #f5f5f5', fontSize: '13px' }}>
                                    <span style={{ color: '#7a7a7a' }}>Ordered on: {order.date}</span>
                                    <strong style={{ fontSize: '15px', color: '#1a1a1a' }}>₹{order.total.toLocaleString('en-IN')}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 3. WISHLIST TAB */}
                {activeTab === 'wishlist' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {wishlist.length > 0 ? wishlist.map((item) => (
                            <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', borderBottom: '1px solid #f5f5f5', paddingBottom: '16px' }}>
                                <img src={item.image} alt={item.name} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '2px' }} />
                                <div style={{ flex: 1 }}>
                                    <h5 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '500' }}>{item.name}</h5>
                                    <span style={{ fontSize: '14px', fontWeight: '600' }}>₹{item.price.toLocaleString('en-IN')}</span>
                                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: item.inStock ? 'green' : 'red' }}>
                                        {item.inStock ? '● In Stock' : '● Out of Stock'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <button style={{ padding: '6px 12px', backgroundColor: '#5A3E2B', color: '#fff', border: 'none', fontSize: '12px', cursor: 'pointer' }}>
                                        Add to Cart
                                    </button>
                                    <button style={{ background: 'none', border: 'none', color: '#999', fontSize: '11px', cursor: 'pointer', textAlign: 'center' }}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <p style={{ color: '#7a7a7a', textAlign: 'center' }}>Your wishlist is empty.</p>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}