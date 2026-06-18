import React, { useState } from 'react';

export default function AccountDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock Data (Replace these with your actual backend/API states)
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
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans">
      <h1 className="text-3xl font-serif text-gray-800 mb-8 border-b pb-4">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-1/4 bg-gray-50 p-6 rounded-lg h-fit border border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl font-semibold capitalize text-gray-800">Hi, {user.name}</h2>
            <p className="text-xs text-gray-500 break-all">{user.email}</p>
          </div>
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`text-left px-4 py-3 rounded transition ${activeTab === 'profile' ? 'bg-amber-700 text-white font-medium' : 'text-gray-600 hover:bg-gray-150'}`}
            >
              👤 Profile & Security
            </button>
            <button 
              onClick={() => setActiveTab('addresses')} 
              className={`text-left px-4 py-3 rounded transition ${activeTab === 'addresses' ? 'bg-amber-700 text-white font-medium' : 'text-gray-600 hover:bg-gray-150'}`}
            >
              📍 Manage Addresses
            </button>
            <button 
              onClick={() => setActiveTab('orders')} 
              className={`text-left px-4 py-3 rounded transition ${activeTab === 'orders' ? 'bg-amber-700 text-white font-medium' : 'text-gray-600 hover:bg-gray-150'}`}
            >
              📦 Order History
            </button>
            <button 
              onClick={() => setActiveTab('offers')} 
              className={`text-left px-4 py-3 rounded transition ${activeTab === 'offers' ? 'bg-amber-700 text-white font-medium' : 'text-gray-600 hover:bg-gray-150'}`}
            >
              ✨ Offers & Early Access
            </button>
          </nav>
        </aside>

        {/* MAIN DISPLAY CONTENT AREA */}
        <main className="w-full md:w-3/4 bg-white p-6 border border-gray-100 rounded-lg shadow-sm">
          
          {/* TAB 1: PROFILE & PASSWORD RESET */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-serif text-amber-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                  <input type="date" value={user.dob} className="w-full border p-2.5 rounded focus:ring-1 focus:ring-amber-700 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Date of Anniversary</label>
                  <input type="date" value={user.anniversary} className="w-full border p-2.5 rounded focus:ring-1 focus:ring-amber-700 outline-none" />
                </div>
              </div>

              <hr className="my-8" />
              
              <h2 className="text-2xl font-serif text-amber-900 mb-6">Reset Password</h2>
              <form className="max-w-md flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full border p-2.5 rounded focus:ring-1 focus:ring-amber-700 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                  <input type="password" placeholder="Minimum 8 characters" className="w-full border p-2.5 rounded focus:ring-1 focus:ring-amber-700 outline-none" />
                </div>
                <button type="submit" className="w-fit bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded text-sm transition">
                  Update Password
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: ADDRESS MANAGEMENT */}
          {activeTab === 'addresses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-amber-900">Saved Addresses</h2>
                <button className="border border-amber-700 text-amber-700 px-4 py-2 rounded text-sm hover:bg-amber-50 transition">
                  + Add New Address
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className={`p-5 border rounded-lg relative ${addr.isDefault ? 'border-amber-700 bg-amber-50/30' : 'border-gray-200'}`}>
                    {addr.isDefault && (
                      <span className="absolute top-3 right-3 bg-amber-700 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                        Default
                      </span>
                    )}
                    <h3 className="font-semibold text-gray-800 mb-2">{addr.type} Address</h3>
                    <p className="text-sm text-gray-600 mb-4">{addr.street}, {addr.city} - {addr.pin}</p>
                    <div className="flex gap-4 text-sm">
                      <button className="text-amber-800 font-medium hover:underline">Change / Edit</button>
                      {!addr.isDefault && <button className="text-gray-500 hover:underline">Set as Default</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-serif text-amber-900 mb-6">Your Orders</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-gray-700 uppercase text-xs border-b">
                    <tr>
                      <th className="px-4 py-3">Order ID</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50/50">
                      <td className="px-4 py-4 font-medium text-gray-900">#OJ-2026-8891</td>
                      <td className="px-4 py-4">June 14, 2026</td>
                      <td className="px-4 py-4"><span className="text-green-700 bg-green-50 px-2 py-1 rounded text-xs font-medium">Delivered</span></td>
                      <td className="px-4 py-4 text-right font-medium">₹ 3,900</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: OFFERS & EARLY ACCESS */}
          {activeTab === 'offers' && (
            <div>
              <h2 className="text-2xl font-serif text-amber-900 mb-2">Member Perks</h2>
              <p className="text-sm text-gray-500 mb-6">Exclusive active discounts and early collection drop previews for you.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="border border-dashed border-amber-500 bg-amber-50/20 p-5 rounded-lg">
                  <span className="text-xs font-bold text-amber-800 tracking-wider uppercase">Anniversary Special</span>
                  <h3 className="text-lg font-bold text-gray-800 mt-1">15% OFF SITEWIDE</h3>
                  <p className="text-xs text-gray-500 mt-1">Code: <span className="font-mono font-bold bg-white px-1.5 py-0.5 border rounded">CELEBRATE15</span></p>
                </div>
              </div>

              <h3 className="text-xl font-serif text-gray-800 mb-4">👑 VIP Early Access Items</h3>
              <div className="bg-neutral-900 text-amber-100 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-xl">The "Little Wonders" Spring Drop</h4>
                  <p className="text-sm text-neutral-400 mt-1">Public access opens next week. As an Ojas family member, you can shop it right now.</p>
                </div>
                <button className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-5 py-2.5 rounded shadow whitespace-nowrap transition">
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