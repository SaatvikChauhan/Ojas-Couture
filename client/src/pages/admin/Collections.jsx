// src/pages/admin/Collections.jsx
import { useState, useEffect } from 'react';
import { api } from './api';
import { Modal, Field, Confirm, BannerUploader, Toast, s } from './ui';

export default function Collections() {
  const [cols, setCols] = useState([]);
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', banner: '', products: [], isActive: true });
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);
  const [prodSearch, setProdSearch] = useState('');

  const notify = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

  const load = async () => {
    try {
      const [c, p] = await Promise.all([api.getCollections(), api.getProducts({ limit: 200 })]);
      setCols(c);
      setProducts(p.products);
    } catch (e) { notify(e.message, 'error'); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm({ name: '', description: '', banner: '', products: [], isActive: true }); setEditId(null); setModal(true); };

  const openEdit = async (c) => {
    setForm({
      name: c.name,
      description: c.description || '',
      banner: c.banner || '',
      products: (c.products || []).map(p => p._id || p),
      isActive: c.isActive,
    });
    setEditId(c._id);
    setModal(true);
  };

  const save = async () => {
    if (!form.name) return notify('Collection name is required', 'error');
    setSaving(true);
    try {
      if (editId) await api.updateCollection(editId, form);
      else await api.createCollection(form);
      notify(editId ? 'Collection updated' : 'Collection created');
      setModal(false);
      load();
    } catch (e) { notify(e.message, 'error'); }
    finally { setSaving(false); }
  };

  const del = async () => {
    try { await api.deleteCollection(confirm); notify('Collection deleted'); setConfirm(null); load(); }
    catch (e) { notify(e.message, 'error'); }
  };

  const toggleProduct = (id) => {
    setForm(f => ({
      ...f,
      products: f.products.includes(id) ? f.products.filter(p => p !== id) : [...f.products, id],
    }));
  };

  const filtered = products.filter(p =>
    !prodSearch || p.name.toLowerCase().includes(prodSearch.toLowerCase())
  );

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Collections</h1>
          <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: 14 }}>{cols.length} collections</p>
        </div>
        <button style={s.btnPrimary} onClick={openAdd}>+ Add Collection</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {cols.map(c => (
          <div key={c._id} style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            {c.banner
              ? <img src={c.banner} alt="" style={{ width: '100%', height: 140, objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: 140, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 13 }}>No banner</div>
            }
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>{c.name}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: '#9ca3af' }}>/{c.slug} · {(c.products || []).length} products</p>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500, background: c.isActive ? '#dcfce7' : '#f3f4f6', color: c.isActive ? '#15803d' : '#6b7280' }}>
                  {c.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              {c.description && <p style={{ margin: '0 0 12px', fontSize: 13, color: '#6b7280' }}>{c.description}</p>}
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={s.btnSmall} onClick={() => openEdit(c)}>Edit</button>
                <button style={s.btnDanger} onClick={() => setConfirm(c._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}

        {cols.length === 0 && (
          <div style={{ gridColumn: '1/-1', padding: 48, textAlign: 'center', color: '#9ca3af', background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb' }}>
            No collections yet. Create your first collection.
          </div>
        )}
      </div>

      {modal && (
        <Modal title={editId ? 'Edit Collection' : 'Add Collection'} onClose={() => setModal(false)}>
          <Field label="Collection Name" required>
            <input style={s.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Summer Festive 2025" autoFocus />
          </Field>
          <Field label="Description">
            <textarea style={s.textarea} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </Field>

          <BannerUploader
            label="Collection Banner"
            value={form.banner}
            uploadFn={api.uploadCollectionBanner}
            onChange={url => setForm(f => ({ ...f, banner: url }))}
          />

          {editId && (
            <Field label="Status">
              <select style={s.select} value={form.isActive ? 'true' : 'false'} onChange={e => setForm(f => ({ ...f, isActive: e.target.value === 'true' }))}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </Field>
          )}

          {/* Product picker */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
              Products in Collection <span style={{ color: '#9ca3af', fontWeight: 400 }}>({form.products.length} selected)</span>
            </label>
            <input
              style={{ ...s.input, marginBottom: 8 }}
              placeholder="Search products…"
              value={prodSearch}
              onChange={e => setProdSearch(e.target.value)}
            />
            <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8 }}>
              {filtered.map(p => (
                <label key={p._id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6', fontSize: 14 }}>
                  <input type="checkbox" checked={form.products.includes(p._id)} onChange={() => toggleProduct(p._id)} />
                  {p.images?.[0] && <img src={p.images[0]} alt="" style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }} />}
                  <span style={{ flex: 1 }}>{p.name}</span>
                  <span style={{ color: '#9ca3af', fontSize: 13 }}>₹{p.price?.toLocaleString()}</span>
                </label>
              ))}
              {filtered.length === 0 && <p style={{ padding: 16, textAlign: 'center', color: '#9ca3af', margin: 0, fontSize: 14 }}>No products found</p>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button style={s.btnGhost} onClick={() => setModal(false)}>Cancel</button>
            <button style={s.btnPrimary} onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Collection'}</button>
          </div>
        </Modal>
      )}

      {confirm && <Confirm msg="Delete this collection?" onConfirm={del} onCancel={() => setConfirm(null)} />}
    </div>
  );
}