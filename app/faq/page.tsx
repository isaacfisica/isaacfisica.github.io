import type { Metadata } from 'next';
import { faq } from '@/lib/data';
import { BlockGrid, FaqBlock } from '@/design-system/blocks';

export const metadata: Metadata = {
  title: 'FAQ',
  description: '이삭 ISAAC 자주 묻는 질문 — CERN, 이탈리아 생활, 스파게티와 아메리카노에 대하여',
};

/* 문답 수정/추가는 lib/data.tsx 의 faq 배열에서 하면 됩니다. */
export default function FaqPage() {
  return (
    <div
      className="hub"
      style={{
        backgroundColor: 'var(--paper)',
        backgroundImage:
          'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px),linear-gradient(var(--grid-strong) 1px,transparent 1px),linear-gradient(90deg,var(--grid-strong) 1px,transparent 1px)',
        backgroundSize: '26px 26px,26px 26px,130px 130px,130px 130px',
        minHeight: '100vh',
      }}
    >
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 96px' }}>
        <h1>FAQ (자주 묻는 질문)</h1>
        <BlockGrid>
          {faq.map((item) => (
            <FaqBlock q={item.q} key={item.q}>
              {item.a}
            </FaqBlock>
          ))}
        </BlockGrid>
      </main>
    </div>
  );
}
