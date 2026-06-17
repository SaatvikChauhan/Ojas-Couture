// src/pages/admin/Homepage.jsx
import { useState, useEffect } from 'react';
import { api } from './api';
import { Field, BannerUploader, Toast, s } from './ui';

export default function Homepage() {
  const [data, setData] = useState(null);
  const [collections, setCollections] = useState([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const notify = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

  useEffect(() => {
    const load = async () => {
      try {
        const [hp, cols] = await Promise.all([api.getHomepage(), api.getCollections()]);
        setData(hp);
        setCollections(cols);
      } catch (e) { notify(e.message, 'error'); }
    };
    load();
  }, []);

  const f = (k, v) => setData(d => ({ ...d, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      await api.updateHomepage(data);
      notify('Homepage settings saved');
    } catch (e) { notify(e.message, 'error'); }
    finally { setSaving(false); }
  };

  const addHeroBanner = async (file) => {
    try {
      const { url } = await api.uploadHomepageImage(file);
      f('heroBanners', [...(data.heroBanners || []), url]);
    } catch (e) { notify(e.message, 'error'); }
  };

  const removeHeroBanner = (i) => f('heroBanners', data.heroBanners.filter((_, idx) => idx !== i));

  if (!data) return <div style={{ padding: 40, color: '#9ca3af' }}>Loading…</div>;

  return (
    <div style={{ maxWidth: 720 }}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Homepage</h1>
          <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: 14 }}>Manage what appears on the home page</p>
        </div>
        <button style={s.btnPrimary} onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
      </div>

      {/* Hero Banners */}
      <Section title="Hero Banners">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
          {(data.heroBanners || []).map((url, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <img src={url} alt="" style={{ width: 140, height: 90, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <button onClick={() => removeHeroBanner(i)} style={{
                position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%',
                background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 13,
              }}>×</button>
            </div>
          ))}
        </div>
        <label style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px',
          border: '2px dashed #d1d5db', borderRadius: 8, cursor: 'pointer', fontSize: 14, color: '#6b7280', background: '#fafafa',
        }}>
          <span>↑</span> Upload Banner Image
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) addHeroBanner(e.target.files[0]); e.target.value = ''; }} />
        </label>
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#9ca3af' }}>Recommended size: 1440×600px. Upload multiple for a slideshow.</p>
      </Section>

      {/* Featured Collection */}
      <Section title="Featured Collection">
        <Field label="Select collection to feature on homepage">
          <select style={s.select} value={data.featuredCollection?._id || data.featuredCollection || ''}
            onChange={e => f('featuredCollection', e.target.value)}>
            <option value="">None</option>
            {collections.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </Field>
      </Section>

      {/* About Section */}
      <Section title="About Section">
        <Field label="Heading">
          <input style={s.input} value={data.aboutTitle || ''} onChange={e => f('aboutTitle', e.target.value)} placeholder="About Ojas Couture" />
        </Field>
        <Field label="Body Text">
          <textarea style={{ ...s.textarea, minHeight: 120 }} value={data.aboutText || ''} onChange={e => f('aboutText', e.target.value)} placeholder="Tell your brand story…" />
        </Field>
        <BannerUploader
          label="About Image"
          value={data.aboutImage}
          uploadFn={async (file) => { const { url } = await api.uploadHomepageImage(file); return { url }; }}
          onChange={url => f('aboutImage', url)}
        />
      </Section>

      {/* Contact Info */}
      <Section title="Contact Information">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
          <Field label="Email">
            <input style={s.input} type="email" value={data.contactEmail || ''} onChange={e => f('contactEmail', e.target.value)} placeholder="hello@ojascouture.com" />
          </Field>
          <Field label="Phone">
            <input style={s.input} value={data.contactPhone || ''} onChange={e => f('contactPhone', e.target.value)} placeholder="+91 98765 43210" />
          </Field>
          <Field label="WhatsApp Number" hint="With country code, no spaces: +919876543210">
            <input style={s.input} value={data.whatsappNumber || ''} onChange={e => f('whatsappNumber', e.target.value)} placeholder="+919876543210" />
          </Field>
          <Field label="Instagram Handle">
            <input style={s.input} value={data.instagramHandle || ''} onChange={e => f('instagramHandle', e.target.value)} placeholder="@ojascouture" />
          </Field>
        </div>
        <Field label="Address">
          <textarea style={s.textarea} value={data.contactAddress || ''} onChange={e => f('contactAddress', e.target.value)} placeholder="Your studio / store address" />
        </Field>
      </Section>

      <div style={{ textAlign: 'right', marginTop: 8 }}>
        <button style={s.btnPrimary} onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', padding: 22, marginBottom: 16 }}>
      <h2 style={{ margin: '0 0 18px', fontSize: 15, fontWeight: 600, color: '#111' }}>{title}</h2>
      {children}
    </div>
  );
}