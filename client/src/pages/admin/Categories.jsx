// src/pages/admin/Categories.jsx
import { useState, useEffect } from 'react';
import { api } from './api';
import { Modal, Field, Confirm, Toast, s } from './ui';

const DEFAULTS = ['Kurta', 'Bottoms', 'Unstitched Dress Material', 'Lehenga', 'Saree', 'Anarkali', 'Co-ord Sets', 'Dupatta', 'Potlis'];

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', isActive: true });
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const notify = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };
  const load = async () => { try { setCats(await api.getCategories()); } catch (e) { notify(e.message, 'error'); } };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm({ name: '', description: '', isActive: true }); setEditId(null); setModal(true); };
  const openEdit = (c) => { setForm({ name: c.name, description: c.description || '', isActive: c.isActive }); setEditId(c._id); setModal(true); };

  const save = async () => {
    if (!form.name) return notify('Category name is required', 'error');
    setSaving(true);
    try {
      if (editId) await api.updateCategory(editId, form);
      else await api.createCategory(form);
      notify(editId ? 'Category updated' : 'Category created');
      setModal(false);
      load();
    } catch (e) { notify(e.message, 'error'); }
    finally { setSaving(false); }
  };

  const del = async () => {
    try { await api.deleteCategory(confirm); notify('Category deleted'); setConfirm(null); load(); }
    catch (e) { notify(e.message, 'error'); }
  };

  const seedDefaults = async () => {
    for (const name of DEFAULTS) { try { await api.createCategory({ name }); } catch {} }
    notify('Default categories seeded');
    load();
  };

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Categories</h1>
          <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: 14 }}>{cats.length} categories</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {cats.length === 0 && <button style={s.btnGhost} onClick={seedDefaults}>Seed Defaults</button>}
          <button style={s.btnPrimary} onClick={openAdd}>+ Add Category</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
        {cats.map(c => (
          <div key={c._id} style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>{c.name}</p>
                <p style={{ margin: '3px 0 0', fontSize: 12, color: '#9ca3af' }}>/{c.slug}</p>
              </div>
              <span style={{
                padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500,
                background: c.isActive ? '#dcfce7' : '#f3f4f6',
                color: c.isActive ? '#15803d' : '#6b7280',
              }}>{c.isActive ? 'Active' : 'Inactive'}</span>
            </div>
            {c.description && <p style={{ margin: '0 0 12px', fontSize: 13, color: '#6b7280' }}>{c.description}</p>}
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={s.btnSmall} onClick={() => openEdit(c)}>Edit</button>
              <button style={s.btnDanger} onClick={() => setConfirm(c._id)}>Delete</button>
            </div>
          </div>
        ))}

        {cats.length === 0 && (
          <div style={{ gridColumn: '1/-1', padding: 48, textAlign: 'center', color: '#9ca3af', background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb' }}>
            No categories yet. Click <strong>Seed Defaults</strong> to add the standard Ojas Couture categories.
          </div>
        )}
      </div>

      {modal && (
        <Modal title={editId ? 'Edit Category' : 'Add Category'} onClose={() => setModal(false)} maxWidth={440}>
          <Field label="Category Name" required>
            <input style={s.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Kurta" autoFocus />
          </Field>
          <Field label="Description">
            <textarea style={s.textarea} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Optional short description" />
          </Field>
          {editId && (
            <Field label="Status">
              <select style={s.select} value={form.isActive ? 'true' : 'false'} onChange={e => setForm(f => ({ ...f, isActive: e.target.value === 'true' }))}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </Field>
          )}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
            <button style={s.btnGhost} onClick={() => setModal(false)}>Cancel</button>
            <button style={s.btnPrimary} onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
          </div>
        </Modal>
      )}

      {confirm && <Confirm msg="Delete this category?" onConfirm={del} onCancel={() => setConfirm(null)} />}
    </div>
  );
}