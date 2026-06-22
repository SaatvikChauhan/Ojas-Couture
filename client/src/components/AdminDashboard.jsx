import React, { useState } from 'react';

// 1. Mock DB State matching your exact Ojas Couture JSON data structure
const initialOrders = [
  {
    "_id": "ORD-2026-94821",
    "customer": {
      "name": "Anjali Verma",
      "email": "anjali@example.com",
      "phone": "+91 98765 43210",
      "shippingAddress": "123, MG Road, Indiranagar, Bangalore, 560038"
    },
    "products": [
      { "name": "Wine Velvet Lehenga Choli", "quantity": 1, "price": 12000 }
    ],
    "totalAmount": 12000,
    "orderStatus": "Processing", 
    "payment": {
      "status": "Success", 
      "transactionId": "TXN_99214710",
      "amountPaid": 12000,
      "pendingPayment": 0,
      "refundStatus": "None" 
    },
    "returnRequest": {
      "isRequested": false,
      "status": "N/A" 
    }
  },
  {
    "_id": "ORD-2026-94822",
    "customer": {
      "name": "Priya Sharma",
      "email": "priya@gmail.com",
      "phone": "+91 96506 56166",
      "shippingAddress": "Flat 402, Sunset Heights, Mumbai, 400001"
    },
    "products": [
      { "name": "Black Embroidered Kurti Set", "quantity": 1, "price": 1699 }
    ],
    "totalAmount": 1699,
    "orderStatus": "Pending", 
    "payment": {
      "status": "Pending", 
      "transactionId": "TXN_882941",
      "amountPaid": 0,
      "pendingPayment": 1699,
      "refundStatus": "None" 
    },
    "returnRequest": {
      "isRequested": true,
      "status": "Pending Review" 
    }
  }
];

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('orders-all');
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Core navigation structural map matching your exact architecture requirements
  const menuStructure = [
    {
      title: "Products",
      items: [
        { id: "products-all", label: "All Products" },
        { id: "products-categories", label: "Categories" },
        { id: "products-collections", label: "Collections" }
      ]
    },
    {
      title: "Orders",
      items: [
        { id: "orders-all", label: "All Orders" },
        { id: "orders-payments", label: "Payments" },
        { id: "orders-returns", label: "Returns" }
      ]
    },
    {
      title: "Customers",
      items: [
        { id: "customers-users", label: "Users" },
        { id: "customers-inquiries", label: "Customer Inquiries" }
      ]
    },
    {
      title: "Content Management",
      items: [
        { id: "content-home", label: "Homepage" },
        { id: "content-about", label: "About Us" },
        { id: "content-banners", label: "Banners" }
      ]
    }
  ];

  // Action Handlers
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
  };

  const handleReturnAction = (orderId, action) => {
    setOrders(orders.map(o => {
      if (o._id === orderId) {
        return {
          ...o,
          orderStatus: action === 'Approve' ? 'Returned' : o.orderStatus,
          returnRequest: { ...o.returnRequest, status: action === 'Approve' ? 'Approved' : 'Rejected' },
          payment: { ...o.payment, refundStatus: action === 'Approve' ? 'Refunded' : 'Rejected' }
        };
      }
      return o;
    }));
    alert(`Return request ${action}d successfully!`);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f3f4f6' }}>
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <div style={{ width: '260px', backgroundColor: '#111827', color: '#fff', padding: '24px 16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '32px', color: '#b392ac', paddingLeft: '8px' }}>Ojas Admin Panel</h2>
        {menuStructure.map(group => (
          <div key={group.title} style={{ marginBottom: '24px' }}>
            <h4 style={{ textTransform: 'uppercase', fontSize: '11px', color: '#9ca3af', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '8px' }}>{group.title}</h4>
            {group.items.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                style={{
                  width: '100%', textAlign: 'left', padding: '10px 12px', margin: '4px 0', border: 'none', borderRadius: '6px',
                  backgroundColor: activeMenu === item.id ? '#1f2937' : 'transparent',
                  color: activeMenu === item.id ? '#fff' : '#9ca3af', cursor: 'pointer', fontWeight: '500', display: 'block'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* DYNAMIC VIEW CONTENT CONTAINER */}
      <div style={{ flexGrow: 1, padding: '40px', overflowY: 'auto' }}>
        
        {/* VIEW 1: ALL ORDERS TAB */}
        {activeMenu === 'orders-all' && (
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '22px' }}>Order Management Log</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#4b5563' }}>
                  <th style={{ padding: '12px' }}>Order ID</th>
                  <th style={{ padding: '12px' }}>Customer Name</th>
                  <th style={{ padding: '12px' }}>Product</th>
                  <th style={{ padding: '12px' }}>Amount</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{order._id}</td>
                    <td style={{ padding: '12px' }}>{order.customer.name}</td>
                    <td style={{ padding: '12px' }}>{order.products[0]?.name}</td>
                    <td style={{ padding: '12px' }}>₹{order.totalAmount}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', backgroundColor: '#fef3c7', color: '#d97706' }}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <select 
                        value={order.orderStatus} 
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        style={{ padding: '6px', borderRadius: '4px', marginRight: '8px', border: '1px solid #d1d5db' }}
                      >
                        {['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button onClick={() => setSelectedOrder(order)} style={{ padding: '6px 12px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* VIEW 2: PAYMENTS LOG TAB */}
        {activeMenu === 'orders-payments' && (
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 20px 0' }}>Payment Management Ledger</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '12px' }}>Transaction ID</th>
                  <th style={{ padding: '12px' }}>Payment Status</th>
                  <th style={{ padding: '12px' }}>Amount Paid</th>
                  <th style={{ padding: '12px' }}>Pending Balance</th>
                  <th style={{ padding: '12px' }}>Refund Tracker</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>{order.payment.transactionId}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{order.payment.status}</td>
                    <td style={{ padding: '12px', color: 'green' }}>₹{order.payment.amountPaid}</td>
                    <td style={{ padding: '12px', color: 'red' }}>₹{order.payment.pendingPayment}</td>
                    <td style={{ padding: '12px' }}>{order.payment.refundStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* VIEW 3: RETURNS TAB */}
        {activeMenu === 'orders-returns' && (
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 20px 0' }}>Returns & Refunds Resolution Queue</h2>
            {orders.map(order => (
              <div key={order._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #e5e7eb', alignItems: 'center' }}>
                <div>
                  <strong>{order._id}</strong> — {order.customer.name} requested return for <em>{order.products[0]?.name}</em>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#6b7280' }}>Return Status Tracker: {order.returnRequest.status}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleReturnAction(order._id, 'Approve')} style={{ background: '#10b981', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Approve & Refund</button>
                  <button onClick={() => handleReturnAction(order._id, 'Reject')} style={{ background: '#ef4444', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FALLBACK PLACEHOLDER FOR COMPLETED MENUS */}
        {!['orders-all', 'orders-payments', 'orders-returns'].includes(activeMenu) && (
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', textAlign: 'center', color: '#6b7280' }}>
            <h3>Your completed component hooks up here</h3>
            <p>Menu Segment Route ID: <strong>{activeMenu}</strong></p>
          </div>
        )}
      </div>

      {/* CUSTOMER FILE MODAL VIEW PANEL & INVOICING OPTIONS */}
      {selectedOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', width: '500px', maxWidth: '90%' }}>
            <h3 style={{ marginTop: 0 }}>Customer Details & File</h3>
            <hr style={{ border: '0', borderTop: '1px solid #e5e7eb', margin: '12px 0' }} />
            <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
            <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
            <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
            <p><strong>Shipping Address:</strong> {selectedOrder.customer.shippingAddress}</p>
            
            <div style={{ background: '#f3f4f6', padding: '16px', borderRadius: '6px', margin: '20px 0' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Invoice Management Actions</h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => alert('Invoice Generated')} style={{ padding: '6px 12px', cursor: 'pointer' }}>Generate</button>
                <button onClick={() => alert('Downloading PDF Invoice Sheet...')} style={{ padding: '6px 12px', cursor: 'pointer' }}>Download PDF</button>
                <button onClick={() => alert(`Invoice emailed safely to ${selectedOrder.customer.email}`)} style={{ background: '#4f46e5', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Email Customer</button>
              </div>
            </div>
            <button onClick={() => setSelectedOrder(null)} style={{ width: '100%', padding: '10px', background: '#374151', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Close Panel View</button>
          </div>
        </div>
      )}

    </div>
  );
}