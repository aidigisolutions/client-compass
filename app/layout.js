import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import { Providers } from './providers'

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
  metadataBase: new URL('https://argbuildtech.com'),
  title: {
    default: 'ARG Buildtech | Premium Residential & Commercial Properties',
    template: '%s | ARG Buildtech',
  },
  description:
    'ARG Buildtech is a trusted real estate developer offering premium residential and commercial properties at the best locations across India. Find your dream home today.',
  keywords: [
    'ARG Buildtech', 'real estate', 'luxury apartments', 'premium properties',
    'buy property', 'rent property', 'residential', 'commercial', 'book site visit',
  ],
  openGraph: {
    title: 'ARG Buildtech | Premium Real Estate',
    description: 'Discover premium residential and commercial properties at the best locations.',
    type: 'website',
    siteName: 'ARG Buildtech',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
