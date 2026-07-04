import React, { useState, useEffect } from 'react';
import { api } from './api';

export default function AdminMemberships() {
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'directory'
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  const loadData = async (tab) => {
    setLoading(true);
    try {
      const res = tab === 'applications' 
        ? await api.getMembershipApplications() 
        : await api.getMembershipDirectory();
      setData(res || []);
    } catch (err) {
      alert('Failed to load membership data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.updateMembershipStatus(id, status);
      // Remove from pending list if approved/rejected
      setData(data.filter(item => item._id !== id));
      alert(`Membership marked as ${status}`);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getBadgeColor = (type) => {
    if (type === 'Silver') return '#9ca3af';
    if (type === 'Gold') return '#fbbf24';
    if (type === 'Platinum') return '#94a3b8';
    return '#ccc';
  };

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 24 }}>Membership Management</h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, borderBottom: '1px solid #e5e7eb', paddingBottom: 10 }}>
        <button 
          onClick={() => setActiveTab('applications')} 
          style={{ background: 'none', border: 'none', fontSize: 16, fontWeight: activeTab === 'applications' ? 'bold' : 'normal', color: activeTab === 'applications' ? '#111' : '#6b7280', cursor: 'pointer' }}
        >
          Pending Applications
        </button>
        <button 
          onClick={() => setActiveTab('directory')} 
          style={{ background: 'none', border: 'none', fontSize: 16, fontWeight: activeTab === 'directory' ? 'bold' : 'normal', color: activeTab === 'directory' ? '#111' : '#6b7280', cursor: 'pointer' }}
        >
          Member Directory
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: 16 }}>Applicant Info</th>
              <th>Location</th>
              <th>Tier</th>
              <th>Dates</th>
              {activeTab === 'applications' && <th style={{ textAlign: 'right', paddingRight: 16 }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan="5" style={{ padding: 32, textAlign: 'center', color: '#6b7280' }}>No records found.</td></tr>
            ) : (
              data.map(m => (
                <tr key={m._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: 16 }}>
                    <strong>{m.fullName}</strong><br/>
                    <small style={{ color: '#6b7280' }}>{m.email} | {m.mobileNumber}</small>
                    <p style={{ margin: '8px 0 0', fontSize: 12, color: '#4b5563', maxWidth: 250 }}>{m.profile}</p>
                  </td>
                  <td>{m.city}, {m.state}<br/><small>{m.country}</small></td>
                  <td>
                    <span style={{ background: getBadgeColor(m.membershipType), color: '#fff', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 'bold' }}>
                      {m.membershipType}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: '#4b5563' }}>
                    DOB: {m.dob ? new Date(m.dob).toLocaleDateString() : 'N/A'}<br/>
                    Anniv: {m.anniversary ? new Date(m.anniversary).toLocaleDateString() : 'N/A'}
                  </td>
                  
                  {activeTab === 'applications' && (
                    <td style={{ textAlign: 'right', paddingRight: 16 }}>
                      <button onClick={() => handleStatusUpdate(m._id, 'Approved')} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 4, cursor: 'pointer', marginRight: 8 }}>Approve</button>
                      <button onClick={() => handleStatusUpdate(m._id, 'Rejected')} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>Reject</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}