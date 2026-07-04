import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Sora, Noto_Sans_KR, IBM_Plex_Mono } from 'next/font/google';
import '@/design-system/globals.css';
import '@/design-system/fx.css';
import Navbar from '@/design-system/navbar';
import { ThemeProvider } from '@/design-system/theme-context';
import Footer from '@/design-system/footer';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/* next/font — 빌드 시 셀프호스팅 (render-blocking 없음, CJK는 unicode-range 슬라이스로 분할 로드)
   CSS에서는 var(--font-sora) / var(--font-noto-kr) / var(--font-plex-mono)로 참조 */
const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-sora',
});
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-kr',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const SITE_URL = 'https://isaacfisica.github.io';
const TITLE = '이삭 ISAAC';
const DESCRIPTION = '이탈리아 물리학과 대학원생; 실험 핵·입자물리학; 국제공동연구';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s · ${TITLE}`,
  },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: TITLE,
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF8F3',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${sora.variable} ${notoSansKr.variable} ${plexMono.variable}`}>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
