import { SEO } from '@/lib/data/site'

export default function sitemap() {
  const base = SEO.siteUrl
  const routes = ['', '/about', '/properties', '/contact', '/book-visit']
  const staticPages = routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : 0.8,
  }))
  return staticPages
}
