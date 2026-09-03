import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import { Providers } from './providers'
import FloatingActions from "@/components/site/FloatingActions"
import { COMPANY, SEO } from '@/lib/data/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(SEO.siteUrl),
  title: {
    default: SEO.title,
    template: '%s | ARG Buildtech',
  },
  description: SEO.description,
  keywords: SEO.keywords,
  alternates: { canonical: '/' },
  authors: [{ name: 'ARG Buildtech' }],
  creator: 'ARG Buildtech',
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SEO.siteUrl,
    type: 'website',
    siteName: 'ARG Buildtech',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport = {
  themeColor: '#A9822A',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: COMPANY.name,
  description: SEO.description,
  url: SEO.siteUrl,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  foundingDate: String(COMPANY.founded),
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.address,
    addressCountry: 'IN',
  },
  sameAs: Object.values(COMPANY.social).filter(Boolean),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body>
        <Providers>{children}</Providers>
        <FloatingActions />
      </body>
    </html>
  )
}
