import { MetadataRoute } from 'next';
import { MOCK_SERVICES } from '@/data/mockData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://drmuhammeddental.com';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/book-appointment',
    '/team',
    '/before-after',
    '/clinic-tour',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  let dynamicServiceRoutes: MetadataRoute.Sitemap = MOCK_SERVICES.map((service) => ({
    url: `${baseUrl}/service/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  try {
    const res = await fetch('http://127.0.0.1:8000/admin-panel/services/', {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const services = await res.json();
      if (Array.isArray(services) && services.length > 0) {
        dynamicServiceRoutes = services.map((service: any) => ({
          url: `${baseUrl}/service/${service.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }));
      }
    }
  } catch {
    // If backend is unreachable, MOCK_SERVICES are used safely
  }

  return [...staticRoutes, ...dynamicServiceRoutes];
}
