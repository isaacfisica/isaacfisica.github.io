/**
 * blocks.tsx 사용 예시 페이지 (/example)
 *
 * 이 파일은 새 페이지를 만들 때 참고하는 템플릿입니다.
 * 각 블록 컴포넌트가 어떻게 렌더되는지 실제로 확인할 수 있습니다.
 * 사용 가이드: design-system/blocks.md
 */

import {
  BlockGrid,
  QuoteBlock,
  ProfileBlock,
  TagBlock,
  TextBlock,
  EmptyBlock,
  DSGrid,
  DSCard,
  DSSectionHead,
  DSCardLabel,
  IconTile,
} from '@/design-system/blocks';
import { HeartIcon, FrownIcon, ListIcon, TargetIcon, StarIcon } from '@/design-system/icons';
import { LinkIcon } from '@/design-system/icons';

export default function ExamplePage() {
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

        {/* ─── 섹션 1: BlockGrid 기반 블록카드 레이아웃 ─── */}
        <DSSectionHead no="01" label="BlockGrid · 블록카드 레이아웃" />
        <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
          <code>BlockGrid</code> 안에 프리셋 블록을 배치해 About 류 페이지를 조립합니다.
          <code>full</code> prop이 있는 블록은 2열 전체를 차지합니다.
        </p>

        <BlockGrid>
          {/* QuoteBlock: 전체 너비 + 상단 cyan 바 */}
          <QuoteBlock>
            물리학으로 세상을 설명하는 사람 — 이것이 이삭의 한 줄 소개입니다.
          </QuoteBlock>

          {/* ProfileBlock: key/value 테이블, 전체 너비 */}
          <ProfileBlock
            rows={[
              { k: '이름', v: 'Isaac' },
              { k: '소속', v: '물리학과' },
              { k: '분야', v: '실험 핵·입자물리학' },
              { k: '언어', v: '한국어 · 영어 · 이탈리아어' },
            ]}
          />

          {/* TagBlock: 기본 절반 너비, 두 개 나란히 */}
          <TagBlock
            label="LIKES"
            accent="cyan"
            icon={<HeartIcon />}
            tags={['입자물리학', '게임', '음악', '코딩', '맛집탐방']}
          />
          <TagBlock
            label="DISLIKES"
            accent="copper"
            icon={<FrownIcon />}
            tags={['페이퍼워크', '더위', '지각']}
          />

          {/* TextBlock: 전체 너비, 긴 본문 */}
          <TextBlock label="AIMS" accent="mustard" icon={<ListIcon />}>
            물리학을 더 많은 사람에게 재미있고 직관적으로 전달하는 것이 목표입니다.
            유튜브와 SNS를 통해 실험 원리, 시뮬레이션, 과학 교양 콘텐츠를 제작합니다.
          </TextBlock>

          <TextBlock label="RESEARCH" accent="accent" icon={<TargetIcon />}>
            검출기 시뮬레이션과 데이터 분석을 중심으로 연구를 진행 중입니다.
          </TextBlock>

          {/* EmptyBlock: 아직 채우지 않은 자리표시 */}
          <EmptyBlock />
        </BlockGrid>

        {/* ─── 섹션 2: DSGrid + DSCard 레이아웃 ─── */}
        <div style={{ marginTop: 56 }}>
          <DSSectionHead no="02" label="DSGrid + DSCard · 그리드 레이아웃" />
          <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
            <code>DSGrid cols={'{2|3|4}'}</code>와 <code>DSCard</code>를 조합해
            디자인 시스템 뷰어·콘텐츠 나열 페이지를 구성합니다.
          </p>

          {/* 4열 그리드 */}
          <DSCardLabel style={{ marginBottom: 10 }}>cols=4 — 아이콘 타일 나열</DSCardLabel>
          <DSGrid cols={4} style={{ marginBottom: 20 }}>
            {(['youtube', 'stream', 'x', 'discord'] as const).map((name) => (
              <DSCard key={name} style={{ padding: 16, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  <IconTile>
                    <LinkIcon name={name} />
                  </IconTile>
                </div>
                <DSCardLabel>{name}</DSCardLabel>
              </DSCard>
            ))}
          </DSGrid>

          {/* 3열 그리드 */}
          <DSCardLabel style={{ marginBottom: 10 }}>cols=3 — 설명 카드</DSCardLabel>
          <DSGrid cols={3} style={{ marginBottom: 20 }}>
            {[
              { label: 'BlockGrid', desc: '2열 블록카드 래퍼. About 류 페이지에 사용.' },
              { label: 'DSGrid',    desc: '2/3/4열 반응형 그리드. 콘텐츠 나열에 사용.' },
              { label: 'DSCard',    desc: '표준 카드 컨테이너. cardStyle 대체.' },
            ].map((item) => (
              <DSCard key={item.label} style={{ padding: 18 }}>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </DSCard>
            ))}
          </DSGrid>

          {/* 2열 그리드 */}
          <DSCardLabel style={{ marginBottom: 10 }}>cols=2 — 좌우 패널</DSCardLabel>
          <DSGrid cols={2}>
            <DSCard style={{ padding: 24 }}>
              <DSSectionHead no="A" label="왼쪽 패널" />
              <p style={{ color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.7 }}>
                2열 그리드의 왼쪽 카드입니다.
                <code>DSGrid cols={'{2}'}</code>를 사용합니다.
              </p>
            </DSCard>
            <DSCard style={{ padding: 24 }}>
              <DSSectionHead no="B" label="오른쪽 패널" />
              <p style={{ color: 'var(--ink-soft)', fontSize: 14, lineHeight: 1.7 }}>
                2열 그리드의 오른쪽 카드입니다.
                모바일에서는 1열로 자동 전환됩니다.
              </p>
            </DSCard>
          </DSGrid>
        </div>

        {/* ─── 섹션 3: DS 유틸 컴포넌트 ─── */}
        <div style={{ marginTop: 56 }}>
          <DSSectionHead no="03" label="DS 유틸 · DSSectionHead / DSCardLabel / IconTile" />
          <DSCard style={{ padding: 24 }}>
            <DSCardLabel style={{ marginBottom: 16 }}>DSCardLabel — 모노 소문자 캡션</DSCardLabel>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {(['youtube', 'stream', 'x', 'discord', 'support'] as const).map((name) => (
                <div key={name} style={{ textAlign: 'center' }}>
                  <IconTile>
                    <LinkIcon name={name} />
                  </IconTile>
                  <DSCardLabel style={{ marginTop: 6 }}>{name}</DSCardLabel>
                </div>
              ))}
            </div>
          </DSCard>
        </div>

        <footer style={{ marginTop: 48, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--ink-faint)', fontSize: 12, fontFamily: "'IBM Plex Mono',monospace" }}>
            blocks.tsx 예시 페이지 — design-system/blocks.md 참고
          </p>
        </footer>
      </main>
    </div>
  );
}
