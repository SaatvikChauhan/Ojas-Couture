import React, { useState, useEffect } from 'react';
import { api } from './api';

const STATUSES = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.getOrders();
      setOrders(res.data);
    } catch (err) {
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateStatus(id, newStatus);
      setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDownload = async (id, orderId) => {
    try {
      const res = await api.downloadInvoice(id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download invoice');
    }
  };

  const handleEmail = async (id) => {
    try {
      await api.emailInvoice(id);
      alert('Invoice emailed to customer!');
    } catch (err) {
      alert('Failed to email invoice');
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Order Management</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20, textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: 12 }}>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: 12, fontWeight: 'bold' }}>{order.orderId}</td>
              <td>
                {order.customer.name}<br/>
                <small style={{ color: '#6b7280' }}>{order.customer.email}</small>
              </td>
              <td>
                {order.products.map((p, i) => (
                  <div key={i} style={{ fontSize: 13 }}>{p.quantity}x {p.name}</div>
                ))}
              </td>
              <td>Rs. {order.totalAmount}</td>
              <td>
                <select 
                  value={order.status} 
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid #d1d5db' }}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td>
                <button onClick={() => handleDownload(order._id, order.orderId)} style={{ marginRight: 8, padding: '4px 8px', cursor: 'pointer' }}>⬇️ PDF</button>
                <button onClick={() => handleEmail(order._id)} style={{ padding: '4px 8px', cursor: 'pointer' }}>✉️ Email</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}