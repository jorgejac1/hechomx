import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
import { ComparisonProvider } from '@/contexts/ComparisonContext'
import { ToastProvider } from '@/contexts/ToastContext'
import ComparisonBar from '@/components/product/Comparison/ComparisonBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hecho en México - Artesanías y Productos Mexicanos Auténticos',
  description: 'Descubre y compra productos auténticos hechos en México. Apoya a artesanos y creadores mexicanos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ToastProvider>
          <ComparisonProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
            <ComparisonBar />
          </ComparisonProvider>
        </ToastProvider>
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  )
}