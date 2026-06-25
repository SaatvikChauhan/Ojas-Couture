import React, { useState, useEffect } from 'react';
import { api as adminOrderAPI } from './api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    adminOrderAPI.getCustomers()
      // FIXED: custom fetch wrapper returns array directly
      .then(res => setCustomers(res || []))
      .catch(() => alert('Failed to load customers'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading customers...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Customer Database</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20, textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: 12 }}>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Total Spent</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <React.Fragment key={c._id}>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: 12 }}>{c.name}</td>
                <td>{c._id}</td>
                <td>{c.phone}</td>
                <td style={{ fontWeight: 'bold' }}>Rs. {c.totalSpent}</td>
                <td>
                  <button onClick={() => setExpandedRow(expandedRow === c._id ? null : c._id)} style={{ padding: '4px 8px' }}>
                    {expandedRow === c._id ? 'Hide' : 'View Orders'}
                  </button>
                </td>
              </tr>
              {expandedRow === c._id && (
                <tr style={{ background: '#f9fafb' }}>
                  <td colSpan="5" style={{ padding: 16 }}>
                    <strong>Shipping Address:</strong> {c.shippingAddress?.street}, {c.shippingAddress?.city}, {c.shippingAddress?.state} {c.shippingAddress?.zip}
                    <h4 style={{ margin: '12px 0 6px' }}>Order History:</h4>
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {c.orderHistory?.map(oh => (
                        <li key={oh.orderId} style={{ marginBottom: 4 }}>
                          Order {oh.orderId} - Rs. {oh.amount} 
                          <span style={{ marginLeft: 10, padding: '2px 6px', background: '#e5e7eb', borderRadius: 4, fontSize: 12 }}>
                            {oh.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
          {customers.length === 0 && (
            <tr><td colSpan="5" style={{ padding: 20, textAlign: 'center' }}>No customers found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}