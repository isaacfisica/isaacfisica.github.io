import Link from 'next/link';
import { BlockGrid, TextBlock } from '@/design-system/blocks';
import { SearchIcon, ArrowIcon } from '@/design-system/icons';

/* 404 — 정적 export 시 out/404.html로 생성되어 GitHub Pages가 자동으로 사용 */
export default function NotFound() {
  return (
    <div className="hub">
      <main className="main">
        <div className="topbar">
          <span className="rec">
            <span className="rec__dot" />
            ERROR · 404
          </span>
        </div>

        <div className="hero">
          <h1 className="name">
            404 <em>NOT FOUND</em>
          </h1>
          <p className="tagline">요청하신 페이지가 검출되지 않았습니다.</p>
        </div>

        {/* 오실로스코프 파형 구분선 — 신호 소실 */}
        <svg className="divider" viewBox="0 0 460 26" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 13 H150 l6 -8 l6 16 l7 -19 l6 19 l6 -8 H300" fill="none" stroke="var(--cyan)" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
          <path d="M300 13 H460" fill="none" stroke="var(--border)" strokeWidth={1.5} strokeDasharray="3 6" />
        </svg>

        <BlockGrid>
          <TextBlock label="DETECTOR LOG" accent="copper" icon={<SearchIcon />}>
            이 주소에서는 아무 입자도 관측되지 않았습니다. 링크가 오래되었거나, 주소가 잘못 입력되었을 수
            있습니다. 아래 링크로 메인 페이지로 돌아갈 수 있습니다.
          </TextBlock>
        </BlockGrid>

        <div className="links" style={{ marginTop: 18 }}>
          <Link className="link-card" href="/">
            <span className="link-card__tile">
              <span className="dot" />
              <ArrowIcon />
            </span>
            <span className="link-card__text">
              <span className="link-card__label">메인으로 돌아가기</span>
              <span className="link-card__sub">isaacfisica.github.io</span>
            </span>
            <span className="link-card__arrow">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
