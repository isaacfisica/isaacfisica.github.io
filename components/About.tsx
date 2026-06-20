'use client';

/**
 * ────────────────────────────────────────────────────────────────────
 *  About(자기소개) 페이지 — lib/blocks.tsx 의 블록카드 컴포넌트로 조립한 예시.
 *  ▷ 내용 수정   : lib/data.ts 의 `about` 객체만 고치면 됩니다.
 *  ▷ 블록 추가   : 아래 <BlockGrid> 안에 프리셋 블록을 더 넣거나 빼세요.
 *  ▷ 새 블록 종류 : lib/blocks.tsx 의 <Block> 셸로 프리셋을 추가할 수 있습니다.
 * ────────────────────────────────────────────────────────────────────
 */

import { about } from '@/lib/data';
import {
  TargetIcon,
  HeartIcon,
  FrownIcon,
  ListIcon,
  UserIcon,
  StarIcon,
} from '@/components/icons';
import {
  BlockGrid,
  QuoteBlock,
  ProfileBlock,
  TagBlock,
  TextBlock,
  EmptyBlock,
} from '@/lib/blocks';
export default function About() {
  return (
    <div className="hub">
      {/* 배경 PCB 트레이스 (정적 장식) */}
      <svg className="deco deco--tl" width="180" height="180" viewBox="0 0 160 160" fill="none" stroke="var(--copper)" strokeWidth={1.4} aria-hidden="true">
        <path d="M0 30 H42 L62 50 H112" />
        <path d="M0 72 H30 L56 98 H92 L112 78 H160" />
        <circle cx="112" cy="50" r="3.2" fill="var(--copper)" stroke="none" />
        <circle cx="92" cy="98" r="3.2" fill="var(--copper)" stroke="none" />
      </svg>
      <svg className="deco deco--br" width="180" height="180" viewBox="0 0 160 160" fill="none" stroke="var(--cyan)" strokeWidth={1.4} aria-hidden="true">
        <path d="M0 30 H42 L62 50 H112" />
        <path d="M0 72 H30 L56 98 H92 L112 78 H160" />
        <circle cx="112" cy="50" r="3.2" fill="var(--cyan)" stroke="none" />
      </svg>

      <main className="main">

        {/* ───────── HEADER ───────── */}
        <div className="about-head">
          <div className="about-head__media">
            <svg className="about-head__rings" width="84" height="84" viewBox="0 0 84 84" fill="none" aria-hidden="true">
              <circle cx="42" cy="42" r="40" stroke="var(--grid-strong)" strokeWidth={1} />
              <circle cx="42" cy="42" r="32" stroke="var(--cyan)" strokeWidth={1} strokeOpacity={0.4} strokeDasharray="3 7" />
            </svg>
            <div className="about-head__clip">
              {/* 캐릭터 이미지를 넣으려면 public/character.png 추가 후 아래 주석을 해제하세요. */}
              <img className="avatar__img" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/character.png`} alt="이삭" /> 
              {/* <div className="about-head__ph">
                <span>캐릭터</span>
              </div> */}
            </div>
          </div>
          <div>
            <div className="about-head__eyebrow">ABOUT</div>
            <h1 className="about-head__name">
              이삭 <em>ISAAC</em>
            </h1>
          </div>
        </div>

        {/* 오실로스코프 파형 구분선 */}
        <svg className="divider" viewBox="0 0 460 26" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 13 H150 l6 -8 l6 16 l7 -19 l6 19 l6 -8 H212 C 244 13 244 4 274 4 S 318 22 348 13 H460" fill="none" stroke="var(--cyan)" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
        </svg>

        {/* ───────── BLOCK GRID ───────── */}
        <BlockGrid>
          {/* <QuoteBlock>{about.quote}</QuoteBlock> */}
          <ProfileBlock rows={about.profile} />
          <TagBlock label="LIKES" accent="cyan" icon={<HeartIcon />} tags={about.likes} />
          <TagBlock label="DISLIKES" accent="copper" icon={<FrownIcon />} tags={about.dislikes} />
          <TextBlock label="AIMS" accent="mustard" icon={<TargetIcon />}>
            {about.aims}
          </TextBlock>
          <TextBlock label="RESEARCH" accent="mustard" icon={<StarIcon />}>
            {about.research.map((v, i) => (
              <span key={`research-${i}`}>{v} <br /></span>
            ))}
          </TextBlock>
          {/* <EmptyBlock /> */}
        </BlockGrid>
      </main>
    </div>
  );
}
