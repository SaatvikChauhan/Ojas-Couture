import React from 'react';

export default function About() {
  return (
    <div style={{ paddingTop: 72 }}>
      <div className="page-header">
        <h1>About Us</h1>
        <p className="breadcrumb">Home · <span>About</span></p>
      </div>

      <section className="about-intro container">
        <div className="about-grid">
          <div className="about-img">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700" alt="Ojas Couture" />
            <div className="about-img-accent" />
          </div>
          <div className="about-text">
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '0 0 8px' }}>Our Story</p>
            <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2.4rem', margin: '0 0 16px' }}>
              Born from a Love of Indian Textiles
            </h2>
            <div className="divider-gold" style={{ margin: '0 0 24px' }} />
            <p>Ojas Couture was born from a deep love for India's extraordinary textile traditions. Founded by Pratibha Rajput, the brand celebrates the richness of Indian weaving, embroidery, and craftsmanship — bringing it to women everywhere through a carefully curated online store.</p>
            <p>The name "Ojas" — meaning vitality, brilliance, and inner glow in Sanskrit — reflects our belief that great clothing illuminates the woman wearing it. We don't just sell garments; we offer pieces that carry the soul of Indian artistry.</p>
            <p>Our Little Wonders collection, Pratibha's personal signature line, offers bespoke custom stitching — because every woman deserves an outfit made just for her.</p>
          </div>
        </div>
      </section>

      <section className="about-values" style={{ background: 'var(--ivory)' }}>
        <div className="container">
          <h2 className="section-title">What We Stand For</h2>
          <div className="divider-gold" />
          <p className="section-subtitle">Our principles guide everything we do</p>

          <div className="values-grid">
            {[
              { icon: '🪡', title: 'Artisan Partnership', desc: 'We work directly with artisan communities across India, from Lucknowi chikankari weavers to Rajasthani applique craftswomen.' },
              { icon: '🌿', title: 'Sustainable Practices', desc: 'We prioritise natural fabrics, minimal packaging waste, and ethical production at every step of our supply chain.' },
              { icon: '✨', title: 'Quality Without Compromise', desc: 'Every piece is quality-checked before it leaves our studio. We stand behind every stitch, every fabric, every design.' },
              { icon: '💛', title: 'Customer Love', desc: 'Our customers are family. We offer personalised assistance, custom stitching consultations, and genuine after-sale support.' },
              { icon: '🎨', title: 'Design Authenticity', desc: 'We never follow fast fashion. Our designs are rooted in authentic Indian aesthetics, interpreted with contemporary sensibility.' },
              { icon: '🤝', title: 'Fair Pricing', desc: 'Premium quality doesn\'t have to mean unaffordable. We price honestly — ensuring both artisans and customers are treated fairly.' },
            ].map(v => (
              <div className="value-card" key={v.title}>
                <div className="value-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-founder container">
        <div className="founder-grid">
          <div className="founder-text">
            <p className="section-subtitle" style={{ textAlign: 'left', margin: '0 0 8px' }}>Meet the Creator</p>
            <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2.2rem', margin: '0 0 16px' }}>Pratibha Rajput</h2>
            <div className="divider-gold" style={{ margin: '0 0 24px' }} />
            <p>Pratibha Rajput is the heart and hands behind Ojas Couture. With a lifelong passion for Indian textiles and a fine eye for craftsmanship, she founded Ojas to share her love for handcrafted Indian clothing with women across the country.</p>
            <p style={{ marginTop: 16 }}>Her Little Wonders collection is deeply personal — each design reflecting her belief that Indian women deserve clothing that honours their heritage while celebrating their individuality.</p>
            <p style={{ marginTop: 16 }}>Pratibha personally oversees quality control, artisan collaborations, and custom stitching for every Little Wonders order — ensuring that each piece is as special as the woman who wears it.</p>
          </div>
          <div className="founder-img">
            <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600" alt="Pratibha Rajput" />
          </div>
        </div>
      </section>
    </div>
  );
}
