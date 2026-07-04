import type { Metadata } from 'next';

/* page.tsx가 'use client'라 metadata를 내보낼 수 없어 레이아웃에서 지정 */
export const metadata: Metadata = {
  title: 'Design System',
  description: '이삭 ISAAC 웹페이지 디자인 시스템 — 색상·타이포·컴포넌트 명세',
};

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
