import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dentalcare.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin-panel/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
