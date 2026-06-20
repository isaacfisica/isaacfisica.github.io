import type { Metadata, Viewport } from 'next';
import './globals.css';
import './fx.css';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: '이삭 ISAAC — 링크 허브',
  description: '이탈리아에서 입자 부수는 물리 VTuber, 이삭 ISAAC. 모든 채널·콘텐츠 링크 허브.',
  openGraph: {
    title: '이삭 ISAAC — 링크 허브',
    description: '이탈리아에서 입자 부수는 물리 VTuber, 이삭 ISAAC.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF8F3',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* 한글(Noto Sans KR)은 unicode-range로 안전하게 로드 — CJK 서브셋 이슈 회피 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Noto+Sans+KR:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* <Navbar /> */}
        {children}</body>
    </html>
  );
}
