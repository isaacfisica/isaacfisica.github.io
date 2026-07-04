import type { Metadata } from 'next';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'About',
  description: '이삭 ISAAC 자기소개 — 실험 핵·입자물리학, 연구 주제, 좋아하는 것들',
};

export default function Page() {
  return <About />;
}
