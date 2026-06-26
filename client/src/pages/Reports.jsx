import React from 'react';

// Hardcoded mock data for the pure frontend page
const REPORTS_DATA = [
    {
        id: '1',
        title: 'Sustainability & Ethical Production Report 2025-2026',
        description: 'A detailed overview of our commitment to fair wages, direct artisan partnerships, and eco-friendly fabric sourcing over the past financial year.',
        type: 'Annual Report',
        date: 'April 2026',
        fileSize: '2.4 MB',
        icon: '📄'
    },
    {
        id: '2',
        title: 'Ojas Couture Media & Press Kit',
        description: 'High-resolution brand assets, our brand story, founder biographies, and recent media coverage snippets for press and journalism use.',
        type: 'Media Kit',
        date: 'January 2026',
        fileSize: '15.8 MB',
        icon: '📰'
    },
    {
        id: '3',
        title: 'Lakmé Fashion Week - Exhibition Recap',
        description: 'Complete photographic coverage and post-event analysis of our showcase, including buyer demographics and emerging trend reports.',
        type: 'Event Report',
        date: 'November 2025',
        fileSize: '8.1 MB',
        icon: '📸'
    },
    {
        id: '4',
        title: 'Annual Business Summary FY2025',
        description: 'Formal business overview detailing growth metrics, new collection launches, and market expansion strategies.',
        type: 'Business Summary',
        date: 'March 2025',
        fileSize: '1.2 MB',
        icon: '📊'
    }
];

export default function Reports() {
    return (
        <div className="reports-page" style={{ paddingTop: '80px', paddingBottom: '80px', background: '#ffffff' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
                
                {/* Page Header */}
                <div style={{ textAlign: 'left', marginBottom: '48px', paddingBottom: '24px', borderBottom: '1px solid #eee' }}>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', color: '#1a1a1a', marginBottom: '12px' }}>Reports & Publications</h1>
                    <p style={{ color: '#555', fontSize: '16px', maxWidth: '700px', lineHeight: '1.6' }}>
                        Access our formal business summaries, sustainability reports, media kits, and event documentation. All files are available as downloadable PDFs.
                    </p>
                </div>

                {/* Reports List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {REPORTS_DATA.map(report => (
                        <div key={report.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', background: '#fcfcfc', border: '1px solid #eaeaea', borderRadius: '8px', transition: 'box-shadow 0.2s ease' }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.06)'} onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                            
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                {/* Icon */}
                                <div style={{ fontSize: '32px', background: '#fff', padding: '12px', borderRadius: '50%', border: '1px solid #eee', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {report.icon}
                                </div>
                                
                                {/* Info */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                                        <span style={{ background: '#1a1a1a', color: '#fff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', padding: '3px 8px', borderRadius: '3px' }}>
                                            {report.type}
                                        </span>
                                        <span style={{ fontSize: '12px', color: '#888' }}>Published: {report.date}</span>
                                    </div>
                                    <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                                        {report.title}
                                    </h3>
                                    <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', margin: '0', maxWidth: '650px' }}>
                                        {report.description}
                                    </p>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div style={{ flexShrink: 0, marginLeft: '24px' }}>
                                <button 
                                    onClick={() => alert(`Initiating download for ${report.title}...`)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'transparent', border: '1px solid #c9a84c', color: '#c9a84c', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s ease' }}
                                    onMouseOver={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a84c'; }}
                                >
                                    <span>Download PDF</span>
                                    <span style={{ fontSize: '12px', fontWeight: 'normal' }}>({report.fileSize})</span>
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}