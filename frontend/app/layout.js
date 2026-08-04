import './globals.css'
import { Providers } from './providers'
import { SiteShell } from '@/components/site/Chrome'

export const metadata = {
  title: 'Photography & Videography Studio in Mumbai & Goa | Wedding, Corporate & Commercial Photography | PK Photography',
  description: 'PK Photography offers professional photography and videography services in Mumbai and Goa. Wedding photography, corporate events, product photography, fashion, real estate, food photography and commercial shoots. Book your session today.',
  keywords: 'photographer in Mumbai, photographer Goa, photography studio Mumbai, professional photographer Mumbai, wedding photographer Mumbai, wedding photographer Goa, pre wedding shoot Goa, destination wedding photographer Goa, corporate photographer Mumbai, event photographer Mumbai, product photographer Mumbai, fashion photographer Mumbai, real estate photographer Mumbai, videographer Mumbai, Goa videographer, photography services Mumbai, photography services Goa, PK Photography, Prabhakar Kumar',
  openGraph: {
    title: 'Photography & Videography Studio in Mumbai & Goa | PK Photography',
    description: 'Professional wedding, corporate, product, fashion, real estate, food and commercial photography services in Mumbai and Goa.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://pkphotography.in/',
    siteName: 'PK Photography',
  },
  twitter: { card: 'summary_large_image', title: 'Photography & Videography Studio in Mumbai & Goa | PK Photography', description: 'Professional photography and videography services in Mumbai and Goa for weddings, corporate events, products, fashion, real estate and commercial shoots.' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://pkphotography.in/' },
}

export const viewport = {
  themeColor: '#FF5B22',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://pkphotography.in" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="bg-[#EEEAE1] text-[#161514]">
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  )
}
