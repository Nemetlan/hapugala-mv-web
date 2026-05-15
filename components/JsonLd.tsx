import { SCHOOL_DATA } from '@/constants';

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SchoolSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "School",
    "name": SCHOOL_DATA.name,
    "alternateName": SCHOOL_DATA.officialName,
    "url": `https://${SCHOOL_DATA.website}`,
    "logo": `https://${SCHOOL_DATA.website}/logo.png`,
    "image": `https://${SCHOOL_DATA.website}/og-image.jpg`,
    "description": "A prestigious educational institution in Galle, Sri Lanka, established in 1902.",
    "founder": {
      "@type": "Person",
      "name": "Andyess George Jayasundara Mudalidu"
    },
    "foundingDate": "1902-01-02",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hapugala",
      "addressLocality": "Wackwella",
      "addressRegion": "Galle",
      "addressCountry": "LK"
    },
    "telephone": SCHOOL_DATA.phone,
    "email": SCHOOL_DATA.email,
    "sameAs": [
      // Add social media links here if available
    ]
  };

  return <JsonLd data={schema} />;
}

export function BreadcrumbSchema({ items }: { items: { name: string, item: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };

  return <JsonLd data={schema} />;
}
