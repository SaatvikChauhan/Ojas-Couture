// src/pages/admin/ui.jsx
// Minimal reusable components — no external UI library needed

import { useState } from 'react';
import { api } from './api';

// ── Toast ─────────────────────────────────────────────────────────────────────
export function Toast({ msg, type = 'success', onClose }) {
  if (!msg) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: type === 'error' ? '#ef4444' : '#16a34a',
      color: '#fff', padding: '12px 18px', borderRadius: 8,
      boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
      display: 'flex', gap: 12, alignItems: 'center', fontSize: 14, maxWidth: 360,
    }}>
      <span style={{ flex: 1 }}>{msg}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 20, lineHeight: 1 }}>×</button>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
export function Modal({ title, onClose, children, maxWidth = 620 }) {
  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: 16,
      }}
    >
      <div style={{
        background: '#fff', borderRadius: 12, width: '100%', maxWidth,
        maxHeight: '92vh', overflow: 'auto',
        boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
      }}>
        <div style={{
          padding: '18px 24px', borderBottom: '1px solid #f0f0f0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, background: '#fff', zIndex: 1,
        }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#6b7280', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
export function Field({ label, required, hint, children }) {
  return (
    <div style={{ marginBottom: 15 }}>
      {label && (
        <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 5 }}>
          {label}{required && <span style={{ color: '#ef4444' }}> *</span>}
        </label>
      )}
      {children}
      {hint && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#9ca3af' }}>{hint}</p>}
    </div>
  );
}

// ── Confirm dialog ────────────────────────────────────────────────────────────
export function Confirm({ msg, onConfirm, onCancel }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 28, maxWidth: 380, width: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <p style={{ margin: '0 0 20px', fontSize: 15 }}>{msg}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button style={s.btnGhost} onClick={onCancel}>Cancel</button>
          <button style={s.btnDanger} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Image uploader (calls Cloudinary via backend) ─────────────────────────────
export function ImageUploader({ label, multiple = false, existing = [], onUpload, onRemove }) {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      const { urls } = await api.uploadImages(files);
      onUpload(urls);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div style={{ marginBottom: 15 }}>
      {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 5 }}>{label}</label>}
      <label style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
        border: '2px dashed #d1d5db', borderRadius: 8, cursor: uploading ? 'not-allowed' : 'pointer',
        fontSize: 14, color: '#6b7280', background: '#fafafa',
      }}>
        <span style={{ fontSize: 20 }}>↑</span>
        <span>{uploading ? 'Uploading…' : `Click to ${multiple ? 'select images' : 'select image'}`}</span>
        <input type="file" accept="image/*" multiple={multiple} onChange={handleChange} disabled={uploading} style={{ display: 'none' }} />
      </label>
      {existing.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
          {existing.map((url, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <img src={url} alt="" style={{ width: 68, height: 68, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb' }} />
              {onRemove && (
                <button onClick={() => onRemove(i)} style={{
                  position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%',
                  background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer',
                  fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
                }}>×</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Single image uploader (for banners) ───────────────────────────────────────
export function BannerUploader({ label, value, uploadFn, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadFn(file);
      onChange(url);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div style={{ marginBottom: 15 }}>
      {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 5 }}>{label}</label>}
      {value && (
        <div style={{ marginBottom: 8, position: 'relative', display: 'inline-block' }}>
          <img src={value} alt="" style={{ maxHeight: 120, borderRadius: 8, border: '1px solid #e5e7eb' }} />
          <button onClick={() => onChange('')} style={{
            position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%',
            background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 13,
          }}>×</button>
        </div>
      )}
      <label style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
        border: '2px dashed #d1d5db', borderRadius: 8, cursor: uploading ? 'not-allowed' : 'pointer',
        fontSize: 14, color: '#6b7280', background: '#fafafa',
      }}>
        <span style={{ fontSize: 20 }}>↑</span>
        <span>{uploading ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}</span>
        <input type="file" accept="image/*" onChange={handleChange} disabled={uploading} style={{ display: 'none' }} />
      </label>
    </div>
  );
}

// ── Shared styles ──────────────────────────────────────────────────────────────
export const s = {
  input: {
    width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 8,
    fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff',
  },
  textarea: {
    width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 8,
    fontSize: 14, outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: 90,
  },
  select: {
    width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: 8,
    fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff', cursor: 'pointer',
  },
  btnPrimary: {
    background: '#1a1a1a', color: '#fff', border: 'none', padding: '10px 20px',
    borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500,
  },
  btnGhost: {
    background: 'transparent', color: '#374151', border: '1px solid #d1d5db',
    padding: '9px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 14,
  },
  btnDanger: {
    background: '#ef4444', color: '#fff', border: 'none',
    padding: '8px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13,
  },
  btnSmall: {
    background: 'transparent', color: '#374151', border: '1px solid #d1d5db',
    padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 13,
  },
};