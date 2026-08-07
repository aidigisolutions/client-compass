import { SEO } from '@/lib/data/site'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SEO.siteUrl}/sitemap.xml`,
  }
}
