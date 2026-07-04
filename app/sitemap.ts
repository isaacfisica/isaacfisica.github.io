import type { MetadataRoute } from 'next';

const SITE_URL = 'https://isaacfisica.github.io';

/* 정적 export 시 out/sitemap.xml로 생성 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/faq/`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/designsystem/`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
