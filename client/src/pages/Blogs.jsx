import React from 'react';
import { Link } from 'react-router-dom';

// Hardcoded mock data for the pure frontend page
const BLOG_POSTS = [
    {
        id: '1',
        title: 'Introducing Our Festive Collection 2026',
        category: 'New Arrivals',
        date: 'June 20, 2026',
        excerpt: 'Dive into our latest collection featuring rich velvets, intricate zardozi work, and silhouettes designed to make you the star of every wedding and festive gathering this season.',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200',
        featured: true
    },
    {
        id: '2',
        title: 'The Art of Zardozi Embroidery',
        category: 'Craftsmanship',
        date: 'June 10, 2026',
        excerpt: 'Discover the centuries-old technique of Zardozi. We take you behind the scenes to show how our master artisans weave magic with golden threads.',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800'
    },
    {
        id: '3',
        title: 'How to Style a Tissue Silk Kurta',
        category: 'Styling Guide',
        date: 'May 28, 2026',
        excerpt: 'Tissue silk is having a massive moment. Here are 5 ways to style your sheer, metallic tissue kurtas for day events and evening soirées.',
        image: 'https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=800'
    },
    {
        id: '4',
        title: 'Ojas Couture at the Delhi Bridal Expo',
        category: 'Events',
        date: 'May 15, 2026',
        excerpt: 'A look back at our stunning runway showcase featuring the Little Wonders collection, and the incredible response from brides-to-be.',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800'
    }
];

export default function Blog() {
    const featuredPost = BLOG_POSTS.find(p => p.featured);
    const regularPosts = BLOG_POSTS.filter(p => !p.featured);

    return (
        <div className="blog-page" style={{ paddingTop: '80px', paddingBottom: '80px', background: '#faf9f8' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                
                {/* Page Header */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', color: '#1a1a1a', marginBottom: '16px' }}>Journal & News</h1>
                    <div style={{ width: '60px', height: '2px', background: '#c9a84c', margin: '0 auto 16px' }}></div>
                    <p style={{ color: '#666', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
                        Stay updated with our latest collections, styling guides, and stories of craftsmanship from the heart of Ojas Couture.
                    </p>
                </div>

                {/* Featured Post */}
                {featuredPost && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
                        <div style={{ flex: '1 1 50%', minHeight: '400px' }}>
                            <img src={featuredPost.image} alt={featuredPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: '1 1 50%', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#c9a84c', letterSpacing: '1px', marginBottom: '12px' }}>
                                {featuredPost.category} • {featuredPost.date}
                            </span>
                            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: '#1a1a1a', marginBottom: '20px', lineHeight: '1.2' }}>
                                {featuredPost.title}
                            </h2>
                            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '32px', fontSize: '16px' }}>
                                {featuredPost.excerpt}
                            </p>
                            <div>
                                <Link to={`/blog/${featuredPost.id}`} style={{ display: 'inline-block', padding: '12px 24px', background: '#1a1a1a', color: '#fff', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Read Article
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Regular Posts Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
                    {regularPosts.map(post => (
                        <div key={post.id} style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                            <div style={{ height: '240px', overflow: 'hidden' }}>
                                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                            </div>
                            <div style={{ padding: '24px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#c9a84c', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>
                                    {post.category} • {post.date}
                                </span>
                                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#1a1a1a', marginBottom: '12px', lineHeight: '1.3' }}>
                                    {post.title}
                                </h3>
                                <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                                    {post.excerpt}
                                </p>
                                <Link to={`/blog/${post.id}`} style={{ color: '#1a1a1a', textDecoration: 'none', fontSize: '14px', fontWeight: '600', borderBottom: '1px solid #c9a84c', paddingBottom: '2px' }}>
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}