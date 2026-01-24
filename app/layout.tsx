import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/Footer';
import { defaultMetadata } from '@/config/seo';
import ScrollToTop from '@/components/common/ScrollToTop';
import { ComparisonProvider } from '@/contexts/ComparisonContext';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import ComparisonBar from '@/components/product/Comparison/ComparisonBar';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { MaintenanceProvider } from '@/components/providers/MaintenanceProvider';
import FeedbackWidget from '@/components/common/FeedbackWidget';
import { CookieConsentBanner, CookiePreferencesModal } from '@/components/cookies';

const inter = Inter({ subsets: ['latin'] });

export const metadata = defaultMetadata;

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <CookieConsentProvider>
                <MaintenanceProvider>
                  <CartProvider>
                    <ComparisonProvider>
                      <Header />
                      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
                        {children}
                      </main>
                      <Footer />
                      <ScrollToTop />
                      <Suspense fallback={null}>
                        <ComparisonBar />
                      </Suspense>
                      <FeedbackWidget />
                      <CookieConsentBanner />
                      <CookiePreferencesModal />
                    </ComparisonProvider>
                  </CartProvider>
                </MaintenanceProvider>
              </CookieConsentProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>

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
  );
}
