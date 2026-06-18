import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // 👈 Needed to watch URL parameters

export default function AccountDashboard() {
  const location = useLocation();
  
  // Parse the URL search query parameter (e.g., ?tab=orders)
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'profile';

  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync the active tab whenever the URL parameter changes
  useEffect(() => {
    const tab = queryParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab('profile'); // Default back to profile tab if no ?tab query exists
    }
  }, [location.search]);

  // Mock Data
  const [user, setUser] = useState({
    name: 'priyanshu',
    email: 'priyanshukumar906591@gmail.com',
    dob: '1998-08-15',
    anniversary: '2024-12-05'
  });

  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', street: '123 Luxury Lane, Connaught Place', city: 'New Delhi', pin: '110001', isDefault: true },
    { id: 2, type: 'Office', street: 'Tech Park, Phase 2, Sector 62', city: 'Noida', pin: '201301', isDefault: false }
  ]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontFamily: 'serif', color: '#2d3748', marginBottom: '32px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
        My Account
      </h1>
      
      <div style={{ display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', gap: '32px' }}>
        {/* SIDEBAR NAVIGATION */}
        <aside style={{ width: window.innerWidth < 768 ? '100%' : '25%', backgroundColor: '#f7fafc', padding: '24px', borderRadius: '8px', height: 'fit-content', border: '1px solid #edf2f7' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', textTransform: 'capitalize', color: '#2d3748', margin: 0 }}>Hi, {user.name}</h2>
            <p style={{ fontSize: '0.75rem', color: '#718096', margin: '4px 0 0', wordBreak: 'break-all' }}>{user.email}</p>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              onClick={() => setActiveTab('profile')} 
              style={activeTab === 'profile' ? activeButtonStyle : sidebarButtonStyle}
            >
              👤 Profile & Security
            </button>
            <button 
              onClick={() => setActiveTab('addresses')} 
              style={activeTab === 'addresses' ? activeButtonStyle : sidebarButtonStyle}
            >
              📍 Manage Addresses
            </button>
            <button 
              onClick={() => setActiveTab('orders')} 
              style={activeTab === 'orders' ? activeButtonStyle : sidebarButtonStyle}
            >
              📦 Order History
            </button>
            <button 
              onClick={() => setActiveTab('offers')} 
              style={activeTab === 'offers' ? activeButtonStyle : sidebarButtonStyle}
            >
              ✨ Offers & Early Access
            </button>
          </nav>
        </aside>

        {/* MAIN DISPLAY CONTENT AREA */}
        <main style={{ flex: 1, backgroundColor: '#fff', padding: '24px', border: '1px solid #edf2f7', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          
          {/* TAB 1: PROFILE & PASSWORD RESET */}
          {activeTab === 'profile' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontFamily: 'serif', color: '#744210', marginBottom: '24px' }}>Personal Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#4a5568', marginBottom: '4px' }}>Date of Birth</label>
                  <input type="date" value={user.dob} onChange={(e) => setUser({...user, dob: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#4a5568', marginBottom: '4px' }}>Date of Anniversary</label>
                  <input type="date" value={user.anniversary} onChange={(e) => setUser({...user, anniversary: e.target.value})} style={inputStyle} />
                </div>
              </div>

              <hr style={{ margin: '32px 0', border: 0, borderTop: '1px solid #e2e8f0' }} />
              
              <h2 style={{ fontSize: '1.5rem', fontFamily: 'serif', color: '#744210', marginBottom: '24px' }}>Reset Password</h2>
              <form style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#4a5568', marginBottom: '4px' }}>Current Password</label>
                  <input type="password" placeholder="••••••••" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#4a5568', marginBottom: '4px' }}>New Password</label>
                  <input type="password" placeholder="Minimum 8 characters" style={inputStyle} />
                </div>
                <button type="submit" style={{ width: 'fit-content', backgroundColor: '#1a202c', color: '#fff', padding: '10px 24px', borderRadius: '4px', border: 'none', fontSize: '0.85rem', cursor: 'pointer' }}>
                  Update Password
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: ADDRESS MANAGEMENT */}
          {activeTab === 'addresses' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontFamily: 'serif', color: '#744210', margin: 0 }}>Saved Addresses</h2>
                <button style={{ border: '1px solid #dfba6b', color: '#dfba6b', backgroundColor: 'transparent', padding: '8px 16px', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}>
                  + Add New Address
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {addresses.map((addr) => (
                  <div key={addr.id} style={{ padding: '20px', border: addr.isDefault ? '1px solid #dfba6b' : '1px solid #e2e8f0', borderRadius: '8px', position: 'relative', backgroundColor: addr.isDefault ? '#fdfbf7' : 'transparent' }}>
                    {addr.isDefault && (
                      <span style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: '#dfba6b', color: 'white', fontSize: '10px', padding: '2px 8px', borderRadius: '12px', fontWeight: '500' }}>
                        Default
                      </span>
                    )}
                    <h3 style={{ fontWeight: '600', color: '#2d3748', margin: '0 0 8px 0', fontSize: '1rem' }}>{addr.type} Address</h3>
                    <p style={{ fontSize: '0.85rem', color: '#4a5568', margin: '0 0 16px 0', lineHeight: '1.4' }}>{addr.street}, {addr.city} - {addr.pin}</p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
                      <button style={{ color: '#b7791f', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: '500', textDecoration: 'underline' }}>Change / Edit</button>
                      {!addr.isDefault && <button style={{ color: '#718096', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}>Set as Default</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontFamily: 'serif', color: '#744210', marginBottom: '24px' }}>Your Orders</h2>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem', color: '#4a5568' }}>
                  <thead style={{ backgroundColor: '#f7fafc', color: '#4a5568', textTransform: 'uppercase', fontSize: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                    <tr>
                      <th style={{ padding: '12px 16px' }}>Order ID</th>
                      <th style={{ padding: '12px 16px' }}>Date</th>
                      <th style={{ padding: '12px 16px' }}>Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                      <td style={{ padding: '16px', fontWeight: '500', color: '#1a202c' }}>#OJ-2026-8891</td>
                      <td style={{ padding: '16px' }}>June 14, 2026</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ backgroundColor: '#f0fff4', color: '#38a169', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '500' }}>Delivered</span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right', fontWeight: '500' }}>₹ 3,900</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: OFFERS & EARLY ACCESS */}
          {activeTab === 'offers' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontFamily: 'serif', color: '#744210', marginBottom: '8px' }}>Member Perks</h2>
              <p style={{ fontSize: '0.85rem', color: '#718096', marginBottom: '24px' }}>Exclusive active discounts and early collection drop previews for you.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <div style={{ border: '1px dashed #dfba6b', backgroundColor: '#fdfbf7', padding: '20px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#b7791f', trackingSpacer: '1px', textTransform: 'uppercase' }}>Anniversary Special</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#2d3748', margin: '4px 0' }}>15% OFF SITEWIDE</h3>
                  <p style={{ fontSize: '0.75rem', color: '#718096', margin: '4px 0 0' }}>Code: <span style={{ fontFamily: 'monospace', fontWeight: '700', backgroundColor: '#fff', padding: '2px 6px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>CELEBRATE15</span></p>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'serif', color: '#2d3748', marginBottom: '16px' }}>👑 VIP Early Access Items</h3>
              <div style={{ backgroundColor: '#1a202c', color: '#f7fafc', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: window.innerWidth < 600 ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                <div>
                  <h4 style={{ fontFamily: 'serif', fontSize: '1.25rem', margin: 0 }}>The "Little Wonders" Spring Drop</h4>
                  <p style={{ fontSize: '0.85rem', color: '#a0aec0', margin: '4px 0 0' }}>Public access opens next week. As an Ojas family member, you can shop it right now.</p>
                </div>
                <button style={{ backgroundColor: '#dfba6b', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Browse Collection
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

// Global Reusable Layout Styles
const sidebarButtonStyle = {
  textAlign: 'left', padding: '12px 16px', borderRadius: '4px', border: 'none',
  backgroundColor: 'transparent', color: '#4a5568', cursor: 'pointer', transition: '0.2s', fontSize: '0.9rem', width: '100%'
};

const activeButtonStyle = {
  ...sidebarButtonStyle, backgroundColor: '#dfba6b', color: '#fff', fontWeight: '500'
};

const inputStyle = {
  width: '100%', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '4px',
  outline: 'none', color: '#333', fontSize: '0.9rem', boxSizing: 'border-box'
};