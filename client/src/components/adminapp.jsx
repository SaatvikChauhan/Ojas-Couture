import React, { useState } from 'react';

export default function AdminApp() {
  const [activeView, setActiveView] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Unified Mock Admin States Data
  const [orders, setOrders] = useState([
    {
      id: 'OJ-2026-9041',
      customerName: 'Priyanshu Kumar',
      email: 'priyanshukumar906591@gmail.com',
      phone: '+91 90659 12345',
      address: '123 Luxury Lane, Connaught Place, New Delhi - 110001',
      product: 'Black Embroidered Kurta Set',
      amount: 3900,
      status: 'Processing',
      paymentStatus: 'Success',
      transactionId: 'TXN-998811223',
      amountPaid: 3900,
      pendingPayment: 0,
      refundStatus: 'N/A',
      returnStatus: 'None'
    },
    {
      id: 'OJ-2026-4412',
      customerName: 'Aanya Sharma',
      email: 'aanya.sharma@example.com',
      phone: '+91 98765 43210',
      address: 'Tech Park, Phase 2, Sector 62, Noida - 201301',
      product: 'Beige Chikankari Kurta Set',
      amount: 9000,
      status: 'Pending',
      paymentStatus: 'Pending',
      transactionId: 'TXN-000000000',
      amountPaid: 0,
      pendingPayment: 9000,
      refundStatus: 'N/A',
      returnStatus: 'None'
    },
    {
      id: 'OJ-2026-1109',
      customerName: 'Rohan Verma',
      email: 'rohan.v@gmail.com',
      phone: '+91 99112 23344',
      address: 'H-45, Green Park, Extension, Mumbai - 400016',
      product: 'Silk Velvet Anarkali Suit',
      amount: 12500,
      status: 'Delivered',
      paymentStatus: 'Success',
      transactionId: 'TXN-445522118',
      amountPaid: 12500,
      pendingPayment: 0,
      refundStatus: 'Requested',
      returnStatus: 'Return Requested'
    }
  ]);

  // Handler Functions
  const handleUpdateStatus = (orderId, field, value) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, [field]: value } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, [field]: value }));
    }
  };

  const triggerInvoiceEmail = (order) => {
    alert(`✉️ Invoice for order ${order.id} has been compiled and emailed successfully to ${order.email}!`);
  };

  const triggerInvoiceDownload = (order) => {
    alert(`📥 Downloading Invoice_${order.id}.pdf...`);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f8fafc' }}>
      
      {/* ADMIN LEFTSIDE PANEL BAR */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', color: '#f8fafc', padding: '24px 16px' }}>
        <h2 style={{ fontSize: '1.2rem', fontFamily: 'serif', letterSpacing: '1px', borderBottom: '1px solid #334155', paddingBottom: '16px', margin: '0 0 24px 0', color: '#dfba6b' }}>
          OJAS COUTURE ADMIN
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={() => { setActiveView('orders'); setSelectedOrder(null); }} style={activeView === 'orders' ? activeNavStyle : navStyle}>📦 Order Management</button>
          <button onClick={() => { setActiveView('customers'); setSelectedOrder(null); }} style={activeView === 'customers' ? activeNavStyle : navStyle}>👤 Customer Registry</button>
          <button onClick={() => { setActiveView('payments'); setSelectedOrder(null); }} style={activeView === 'payments' ? activeNavStyle : navStyle}>💳 Payments Log</button>
          <button onClick={() => { setActiveView('returns'); setSelectedOrder(null); }} style={activeView === 'returns' ? activeNavStyle : navStyle}>🔄 Returns & Refunds</button>
        </nav>
      </aside>

      {/* ADMIN CENTER ACTIVE VIEW DECK */}
      <main style={{ flex: 1, padding: '40px' }}>
        
        {/* VIEW 1: MASTER ORDERS MANAGEMENT TABLE */}
        {activeView === 'orders' && !selectedOrder && (
          <div>
            <h1 style={titleStyle}>Order Management</h1>
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr style={tableHeadRowStyle}>
                    <th style={thStyle}>Order ID</th>
                    <th style={thStyle}>Customer</th>
                    <th style={thStyle}>Product</th>
                    <th style={thStyle}>Amount</th>
                    <th style={thStyle}>Fulfillment Status</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} style={tableRowStyle}>
                      <td style={{ ...tdStyle, fontWeight: 'bold' }}>{order.id}</td>
                      <td style={tdStyle}>{order.customerName}</td>
                      <td style={tdStyle}>{order.product}</td>
                      <td style={tdStyle}>₹{order.amount.toLocaleString()}</td>
                      <td style={tdStyle}>
                        <select 
                          value={order.status} 
                          onChange={(e) => handleUpdateStatus(order.id, 'status', e.target.value)}
                          style={selectFieldStyle}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Returned">Returned</option>
                        </select>
                      </td>
                      <td style={tdStyle}>
                        <button onClick={() => setSelectedOrder(order)} style={actionBtnStyle}>Inspect View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 2: CUSTOMER DETAILS SHEET CONTAINER */}
        {activeView === 'customers' && (
          <div>
            <h1 style={titleStyle}>Customer Details</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {orders.map(o => (
                <div key={o.id} style={cardContainerStyle}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: '#1e293b' }}>{o.customerName}</h3>
                  <p style={cardText}>📧 <b>Email:</b> {o.email}</p>
                  <p style={cardText}>📞 <b>Phone:</b> {o.phone}</p>
                  <p style={cardText}>📍 <b>Shipping Address:</b> {o.address}</p>
                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#64748b' }}>ORDER HISTORY RECORD:</span>
                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>{o.id} — {o.product} (₹{o.amount.toLocaleString()})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: PAYMENT MANAGEMENT LEDGER */}
        {activeView === 'payments' && (
          <div>
            <h1 style={titleStyle}>Payment Ledger Control</h1>
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr style={tableHeadRowStyle}>
                    <th style={thStyle}>Order ID</th>
                    <th style={thStyle}>Payment Status</th>
                    <th style={thStyle}>Transaction ID</th>
                    <th style={thStyle}>Amount Paid</th>
                    <th style={thStyle}>Pending Balance</th>
                    <th style={thStyle}>Refund Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} style={tableRowStyle}>
                      <td style={tdStyle}><b>{o.id}</b></td>
                      <td style={tdStyle}>
                        <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: o.paymentStatus === 'Success' ? '#dcfce7' : '#fef9c3', color: o.paymentStatus === 'Success' ? '#166534' : '#854d0e' }}>
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td style={tdStyle}><code style={{ fontSize: '0.8rem' }}>{o.transactionId}</code></td>
                      <td style={tdStyle}>₹{o.amountPaid.toLocaleString()}</td>
                      <td style={tdStyle}><span style={{ color: o.pendingPayment > 0 ? '#ef4444' : '#10b981' }}>₹{o.pendingPayment.toLocaleString()}</span></td>
                      <td style={tdStyle}>{o.refundStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 4: RETURN AND REFUNDS MANAGEMENT CONTROL PANEL */}
        {activeView === 'returns' && (
          <div>
            <h1 style={titleStyle}>Returns & Refunds Processing</h1>
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr style={tableHeadRowStyle}>
                    <th style={thStyle}>Order ID</th>
                    <th style={thStyle}>Customer</th>
                    <th style={thStyle}>Product Info</th>
                    <th style={thStyle}>Return Status</th>
                    <th style={thStyle}>Actions Control</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} style={tableRowStyle}>
                      <td style={tdStyle}><b>{o.id}</b></td>
                      <td style={tdStyle}>{o.customerName}</td>
                      <td style={tdStyle}>{o.product}</td>
                      <td style={tdStyle}>
                        <span style={{ color: o.returnStatus.includes('Requested') ? '#f59e0b' : '#64748b', fontWeight: '500' }}>
                          {o.returnStatus}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        {o.returnStatus === 'Return Requested' ? (
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button onClick={() => { handleUpdateStatus(o.id, 'returnStatus', 'Approved'); handleUpdateStatus(o.id, 'refundStatus', 'Processing'); }} style={{ ...inlineActionBtn, backgroundColor: '#10b981' }}>Approve</button>
                            <button onClick={() => handleUpdateStatus(o.id, 'returnStatus', 'Rejected')} style={{ ...inlineActionBtn, backgroundColor: '#ef4444' }}>Reject</button>
                          </div>
                        ) : o.returnStatus === 'Approved' && o.refundStatus === 'Processing' ? (
                          <button onClick={() => handleUpdateStatus(o.id, 'refundStatus', 'Fully Refunded')} style={{ ...inlineActionBtn, backgroundColor: '#8b5cf6' }}>Process Refund</button>
                        ) : (
                          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No Actions Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INDEPENDENT DRILL DOWN INVOICE DISPLAY */}
        {selectedOrder && (
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: '600', cursor: 'pointer', marginBottom: '24px' }}>← Back to Master Order Sheet</button>
            
            {/* Invoice Design Wrapper Template Layout */}
            <div style={{ border: '1px solid #cbd5e1', padding: '24px', borderRadius: '4px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  <h2 style={{ fontFamily: 'serif', margin: '0 0 4px 0' }}>OJAS COUTURE</h2>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Premium Indian Designer Attire</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ margin: 0, color: '#1e293b' }}>INVOICE / BILL</h3>
                  <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}><b>ID Reference:</b> {selectedOrder.id}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#64748b' }}>Billed Client:</span>
                  <p style={{ margin: '4px 0 0' }}><b>{selectedOrder.customerName}</b></p>
                  <p style={{ margin: '2px 0 0' }}>{selectedOrder.email}</p>
                  <p style={{ margin: '2px 0 0' }}>{selectedOrder.phone}</p>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#64748b' }}>Shipping Destined Address:</span>
                  <p style={{ margin: '4px 0 0', lineHeight: '1.4' }}>{selectedOrder.address}</p>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '24px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #cbd5e1', textAlign: 'left', color: '#64748b' }}>
                    <th style={{ paddingBottom: '8px' }}>Product Line Item Description</th>
                    <th style={{ paddingBottom: '8px', textAlign: 'right' }}>Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 0' }}>{selectedOrder.product}</td>
                    <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{selectedOrder.amount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 0', fontWeight: 'bold' }}>Grand Adjusted Total</td>
                    <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 'bold', fontSize: '1.1rem', color: '#dfba6b' }}>₹{selectedOrder.amount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Invoice Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => triggerInvoiceDownload(selectedOrder)} style={{ ...actionBtnStyle, padding: '10px 20px' }}>📥 Download PDF Invoice</button>
              <button onClick={() => triggerInvoiceEmail(selectedOrder)} style={{ ...activeNavStyle, padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✉️ Dispatch Invoice via Email</button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// Global UI Layout Stylesheets Variables Constants
const navStyle = {
  width: '100%', textAlign: 'left', padding: '12px 16px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', borderRadius: '4px', fontSize: '0.9rem', transition: '0.2s'
};
const activeNavStyle = {
  ...navStyle, backgroundColor: '#dfba6b', color: '#fff', fontWeight: '600'
};
const titleStyle = {
  fontSize: '1.75rem', fontFamily: 'serif', color: '#1e293b', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px'
};
const tableContainerStyle = {
  backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
};
const tableStyle = {
  width: '100%', borderCollapse: 'collapse', textLeft: 'left', fontSize: '0.9rem'
};
const tableHeadRowStyle = {
  backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', textAlign: 'left'
};
const thStyle = {
  padding: '14px 16px', color: '#475569', fontWeight: '600'
};
const tableRowStyle = {
  borderBottom: '1px solid #f1f5f9'
};
const tdStyle = {
  padding: '14px 16px', color: '#334155'
};
const selectFieldStyle = {
  padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#fff', outline: 'none', fontSize: '0.85rem'
};
const actionBtnStyle = {
  backgroundColor: '#1e293b', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'
};
const cardContainerStyle = {
  backgroundColor: '#fff', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
};
const cardText = {
  margin: '6px 0', fontSize: '0.9rem', color: '#475569'
};
const inlineActionBtn = {
  border: 'none', color: '#fff', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600'
};