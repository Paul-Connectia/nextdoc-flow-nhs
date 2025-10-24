import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: object;
  noIndex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "NextDoc - NHS Career Success Platform for International Doctors",
  description = "AI-powered tools for NHS career success. PLAB preparation, CV optimization, interview simulation, and career guidance for international medical professionals.",
  keywords = "NHS careers, PLAB preparation, medical CV, NHS jobs, international doctors, UK medical training, NHS interview preparation, medical career guidance",
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = "/lovable-uploads/nhs-medical-hero.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  noIndex = false
}) => {
  const fullTitle = title.includes('NextDoc') ? title : `${title} | NextDoc`;
  const currentUrl = canonicalUrl || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="NextDoc" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Additional Meta */}
      <meta name="author" content="NextDoc UK" />
      <meta name="language" content="en-GB" />
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="United Kingdom" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Default Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "NextDoc UK",
          "url": "https://nextdocglobal.com",
          "logo": "https://nextdocglobal.com/lovable-uploads/logo.png",
          "description": "Leading platform for NHS career development and international doctor transition support",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+44-20-1234-5678",
            "contactType": "customer service",
            "email": "info@nextdocglobal.com"
          },
          "sameAs": [
            "https://linkedin.com/company/nextdoc-global",
            "https://twitter.com/nextdocglobal"
          ]
        })}
      </script>
    </Helmet>
  );
};