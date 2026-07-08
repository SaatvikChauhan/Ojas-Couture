import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, slug, canonicalUrl, type = 'website' }) {
  const defaultUrl = `https://ojas-couture.com/${slug || ''}`;
  const finalCanonical = canonicalUrl || defaultUrl;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title ? `${title} | Ojas Couture` : 'Ojas Couture'}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={finalCanonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
}