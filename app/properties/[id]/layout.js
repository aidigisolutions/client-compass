import { getProperty, SEO } from '@/lib/data/site'

export async function generateMetadata({ params }) {
  const { id } = await params
  const p = getProperty(id)
  if (!p) {
    return { title: 'Property Not Found' }
  }
  const title = `${p.name} — ${p.bhk} in ${p.location}`
  const description = p.description.slice(0, 155)
  return {
    title,
    description,
    alternates: { canonical: `/properties/${p.id}` },
    openGraph: {
      title,
      description,
      images: [p.image],
      type: 'website',
    },
  }
}

export default function PropertyLayout({ children }) {
  return children
}
