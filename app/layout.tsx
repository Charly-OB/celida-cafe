import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import StructuredData from '@/components/StructuredData'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://celidacafe.com'), // TODO: confirm production domain
  title: { default: 'Célida Café — Cafetería artesanal en Ensenada', template: '%s | Célida Café' },
  description: 'Café de especialidad, repostería y experiencia gastronómica en Ensenada, Baja California.',
  generator: 'v0.app',
  openGraph: {
    title: 'Célida Café',
    description: 'Café de especialidad en Ensenada, BC',
    url: 'https://celidacafe.com',
    siteName: 'Célida Café',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Célida Café' }], // TODO: create /public/og-image.jpg
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Célida Café',
    description: 'Café de especialidad en Ensenada, BC',
    images: ['/og-image.jpg'], // TODO: create /public/og-image.jpg
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} bg-zinc-950`}>
      <body className="font-sans antialiased bg-zinc-950 text-zinc-100">
        {children}
        <StructuredData />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
