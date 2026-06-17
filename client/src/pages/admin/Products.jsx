// src/pages/admin/Products.jsx
import { useState, useEffect, useCallback } from 'react';
import { api } from './api';
import { Modal, Field, Confirm, ImageUploader, Toast, s } from './ui';

const CATEGORIES = [
  { value: 'kurti-set', label: 'Kurti Set' },
  { value: 'kurta-set', label: 'Kurta Set' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'dress-material', label: 'Unstitched Dress Material' },
  { value: 'lehenga', label: 'Lehenga' },
  { value: 'saree', label: 'Saree' },
  { value: 'anarkali', label: 'Anarkali' },
  { value: 'co-ord-sets', label: 'Co-ord Sets' },
  { value: 'dupatta', label: 'Dupatta' },
  { value: 'potlis', label: 'Potlis' },
  { value: 'little-wonders', label: 'Little Wonders' },
  { value: 'special-price', label: 'Special Price' },
];
const BADGES = ['', 'NEW', 'HANDMADE', 'NEW ARRIVAL', 'SALE', 'BEST SELLER'];

const blank = {
  name: '', category: 'kurti-set', description: '', price: '', originalPrice: '',
  images: [], fabric: '', work: '', sizes: '', colors: '', badge: '',
  inStock: true, isBestSeller: false, isSpecialPrice: false, tags: '',
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const notify = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getProducts({ page, limit: 15, search, category: catFilter });
      setProducts(data.products);
      setTotal(data.total);
    } catch (e) { notify(e.message, 'error'); }
    finally { setLoading(false); }
  }, [page, search, catFilter]);

  useEffect(() => { load(); }, [load]);

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const openAdd = () => { setForm(blank); setEditId(null); setModal(true); };

  const openEdit = async (id) => {
    try {
      const p = await api.getProduct(id);
      setForm({ ...p, sizes: (p.sizes || []).join(', '), colors: (p.colors || []).join(', '), tags: (p.tags || []).join(', '), badge: p.badge || '' });
      setEditId(id);
      setModal(true);
    } catch (e) { notify(e.message, 'error'); }
  };

  const save = async () => {
    if (!form.name || !form.price) return notify('Name and price are required', 'error');
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        sizes: form.sizes ? form.sizes.split(',').map(x => x.trim()).filter(Boolean) : [],
        colors: form.colors ? form.colors.split(',').map(x => x.trim()).filter(Boolean) : [],
        tags: form.tags ? form.tags.split(',').map(x => x.trim()).filter(Boolean) : [],
        badge: form.badge || null,
      };
      if (editId) await api.updateProduct(editId, payload);
      else await api.createProduct(payload);
      notify(editId ? 'Product updated' : 'Product created');
      setModal(false);
      load();
    } catch (e) { notify(e.message, 'error'); }
    finally { setSaving(false); }
  };

  const del = async () => {
    try { await api.deleteProduct(confirm); notify('Product deleted'); setConfirm(null); load(); }
    catch (e) { notify(e.message, 'error'); }
  };

  const pages = Math.ceil(total / 15);

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Products</h1>
          <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: 14 }}>{total} total</p>
        </div>
        <button style={s.btnPrimary} onClick={openAdd}>+ Add Product</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <input style={{ ...s.input, width: 220 }} placeholder="Search by name…" value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }} />
        <select style={{ ...s.select, width: 220 }} value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1); }}>
          <option value="">All categories</option>
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Image', 'Name', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#374151', fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>Loading…</td></tr>
              : products.length === 0
                ? <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>No products found</td></tr>
                : products.map(p => (
                  <tr key={p._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '8px 14px' }}>
                      {p.images?.[0]
                        ? <img src={p.images[0]} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6 }} />
                        : <div style={{ width: 44, height: 44, background: '#f3f4f6', borderRadius: 6 }} />}
                    </td>
                    <td style={{ padding: '8px 14px', fontWeight: 500, maxWidth: 200 }}>
                      <div>{p.name}</div>
                      {p.badge && <span style={{ fontSize: 11, color: '#6b7280', background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>{p.badge}</span>}
                    </td>
                    <td style={{ padding: '8px 14px', color: '#6b7280', fontSize: 13 }}>
                      {CATEGORIES.find(c => c.value === p.category)?.label || p.category}
                    </td>
                    <td style={{ padding: '8px 14px' }}>₹{p.price?.toLocaleString()}</td>
                    <td style={{ padding: '8px 14px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                        background: p.inStock ? '#dcfce7' : '#fee2e2',
                        color: p.inStock ? '#15803d' : '#dc2626',
                      }}>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td style={{ padding: '8px 14px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button style={s.btnSmall} onClick={() => openEdit(p._id)}>Edit</button>
                        <button style={s.btnDanger} onClick={() => setConfirm(p._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 16 }}>
          {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)} style={{
              ...s.btnSmall,
              background: n === page ? '#1a1a1a' : 'transparent',
              color: n === page ? '#fff' : '#374151',
              border: n === page ? '1px solid #1a1a1a' : '1px solid #d1d5db',
              width: 36, padding: 0, borderRadius: 6,
            }}>{n}</button>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {modal && (
        <Modal title={editId ? 'Edit Product' : 'Add Product'} onClose={() => setModal(false)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
            <div style={{ gridColumn: '1/-1' }}>
              <Field label="Product Name" required>
                <input style={s.input} value={form.name} onChange={e => f('name', e.target.value)} placeholder="Ivory Chikankari Kurta Set" />
              </Field>
            </div>
            <Field label="Category" required>
              <select style={s.select} value={form.category} onChange={e => f('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </Field>
            <Field label="Badge">
              <select style={s.select} value={form.badge} onChange={e => f('badge', e.target.value)}>
                {BADGES.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
              </select>
            </Field>
            <Field label="Price (₹)" required>
              <input style={s.input} type="number" value={form.price} onChange={e => f('price', e.target.value)} placeholder="3900" />
            </Field>
            <Field label="Original Price (₹)">
              <input style={s.input} type="number" value={form.originalPrice} onChange={e => f('originalPrice', e.target.value)} placeholder="Optional (for showing strikethrough)" />
            </Field>
          </div>

          <Field label="Description" required>
            <textarea style={s.textarea} value={form.description} onChange={e => f('description', e.target.value)} />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
            <Field label="Fabric">
              <input style={s.input} value={form.fabric} onChange={e => f('fabric', e.target.value)} placeholder="Cotton, Silk, Georgette…" />
            </Field>
            <Field label="Work / Embellishment">
              <input style={s.input} value={form.work} onChange={e => f('work', e.target.value)} placeholder="Chikankari, Zari, Embroidery…" />
            </Field>
            <Field label="Sizes" hint="Comma-separated: S, M, L, XL">
              <input style={s.input} value={form.sizes} onChange={e => f('sizes', e.target.value)} placeholder="XS, S, M, L, XL" />
            </Field>
            <Field label="Colors" hint="Comma-separated">
              <input style={s.input} value={form.colors} onChange={e => f('colors', e.target.value)} placeholder="Ivory, Blush Pink, Navy" />
            </Field>
          </div>

          <Field label="Tags" hint="Comma-separated keywords for search">
            <input style={s.input} value={form.tags} onChange={e => f('tags', e.target.value)} placeholder="festive, wedding, casual, handmade" />
          </Field>

          <ImageUploader
            label="Product Images"
            multiple
            existing={form.images || []}
            onUpload={urls => f('images', [...(form.images || []), ...urls])}
            onRemove={i => f('images', form.images.filter((_, idx) => idx !== i))}
          />

          {/* Toggles */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { key: 'inStock', label: 'In Stock' },
              { key: 'isBestSeller', label: 'Best Seller' },
              { key: 'isSpecialPrice', label: 'Special Price' },
            ].map(({ key, label }) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer' }}>
                <input type="checkbox" checked={!!form[key]} onChange={e => f(key, e.target.checked)} style={{ width: 16, height: 16 }} />
                {label}
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button style={s.btnGhost} onClick={() => setModal(false)}>Cancel</button>
            <button style={s.btnPrimary} onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Product'}</button>
          </div>
        </Modal>
      )}

      {confirm && <Confirm msg="Delete this product? This cannot be undone." onConfirm={del} onCancel={() => setConfirm(null)} />}
    </div>
  );
}