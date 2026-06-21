# CLAUDE.md — 이삭 ISAAC Link Hub

## 프로젝트 개요

이삭(Isaac)의 개인 포트폴리오 겸 링크 허브 사이트. 물리학 박사과정생(실험 핵·입자물리학, 이탈리아 대학 재학)의 개인 브랜딩 사이트.
- **메인 페이지 (`/`)**: 링크 허브 + 물리 테마 시각 효과
- **About 페이지 (`/about`)**: 블록카드 그리드 레이아웃의 자기소개 페이지
- **FAQ 페이지 (`/faq`)**: 자주 묻는 질문 페이지 (블록카드 시스템 사용)
- **배포**: GitHub Pages (isaacfisica.github.io), 정적 Next.js export

---

## 기술 스택

- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **Styling**: 순수 CSS (Tailwind 없음) + CSS custom properties (토큰 기반 라이트/다크 테마)
- **외부 UI 라이브러리 없음** — 모든 컴포넌트 직접 구현
- **Canvas API**: 파티클 애니메이션, PCB 배경, 검출기 시뮬레이션
- **배포**: GitHub Actions → GitHub Pages (정적 export)
- **Analytics**: Google Analytics 4 (`NEXT_PUBLIC_GA_ID=G-LT8GYGQ80X`)

---

## 디렉토리 구조

```
isaac-fisica-kr/
├── app/
│   ├── layout.tsx        # 루트 레이아웃 (GA 스크립트, 폰트, Navbar 포함)
│   ├── page.tsx          # 홈 → LinkHub 컴포넌트 렌더
│   ├── about/
│   │   └── page.tsx      # /about 라우트 → About 컴포넌트 렌더
│   ├── faq/
│   │   └── page.tsx      # /faq 라우트 — 자주 묻는 질문 (블록카드 시스템 사용)
│   ├── designsystem/
│   │   └── page.tsx      # /designsystem 라우트 — 색상·타이포·컴포넌트 명세 뷰어
│   └── example/
│       └── page.tsx      # /example 라우트 — blocks.tsx 모든 컴포넌트 사용 예시 (개발 참고용)
├── components/
│   ├── About.tsx         # /about 페이지 — 블록카드 그리드 자기소개
│   ├── LinkHub.tsx       # 메인 포트폴리오 컴포넌트 (프로필, 링크)
│   └── effects/
│       ├── ParticleField.tsx  # Canvas 파티클 시스템 (트랙 분출 + 붕괴 애니메이션)
│       ├── PCBBackground.tsx  # Canvas PCB 회로 배경 애니메이션
│       └── FXPanel.tsx        # 이펙트 제어 패널 (FAB + 슬라이더)
├── lib/
│   ├── data.ts              # 콘텐츠 중앙 관리 (링크, 프로필, 소셜, FX 기본값, about 객체)
│   ├── designsystem-data.ts # 디자인 시스템 뷰어 데이터 (색상·타이포·반지름 상수 + 타입)
│   └── theme-context.tsx    # 전역 테마 상태 — ThemeProvider, useTheme (light/dark)
├── design-system/
│   ├── globals.css          # 디자인 토큰(:root) + 전체 레이아웃 스타일 + DS 유틸리티 클래스
│   ├── fx.css               # 이펙트 패널 + 캔버스 오버레이 스타일
│   ├── blocks.tsx           # 블록카드 + DS 공용 컴포넌트 (아래 표 참고)
│   ├── blocks.md            # blocks.tsx 사용 가이드 — 새 페이지 제작 시 참고
│   ├── navbar.tsx           # 상단 네비게이션 (모바일: 햄버거, 데스크탑: 메뉴 + 테마 토글)
│   ├── ThemeToggle.tsx      # 재사용 가능한 테마 토글 버튼 (isDark + onToggle props)
│   ├── footer.tsx           # 글로벌 푸터 (파형 SVG + 소셜 아이콘 + 저작권) — layout.tsx에서 렌더
│   └── icons.tsx            # SVG 아이콘 모음 — LinkIcon (플랫폼), UI 아이콘 (Sun/Moon/Atom/Arrow/Plus/User/Heart/Frown/List/Target/Star 등)
├── public/               # 정적 자산 (캐릭터 이미지, .nojekyll)
└── .github/workflows/
    └── nextjs.yml        # GitHub Pages 빌드·배포 워크플로우
```

---

## 콘텐츠 수정 위치

**콘텐츠 변경은 대부분 `lib/data.ts` 한 파일에서 완결됩니다.**

| 수정 항목 | 파일 |
|-----------|------|
| 링크 추가/수정/삭제 | `lib/data.ts` → `links` 배열 |
| 프로필 이름/소개 | `lib/data.ts` → `profile` 객체 |
| About 페이지 콘텐츠 | `lib/data.ts` → `about` 객체 (quote, profile, likes, dislikes, aims, research) |
| 푸터 소셜 아이콘 | `lib/data.ts` → `footerSocials` 배열 |
| 확장 슬롯 활성화 | `lib/data.ts` → `showSlots = true`로 변경 |
| FX 이펙트 기본값 | `lib/data.ts` → `fxDefaults` |
| 새 플랫폼 아이콘 추가 | `design-system/icons.tsx` → `LinkIcon` switch에 케이스 추가 |
| Navbar 메뉴 항목 | `design-system/navbar.tsx` → `navItems` 배열 |
| About 블록 구성 변경 | `components/About.tsx` → `<BlockGrid>` 안의 블록 추가/제거 |
| 새 블록 종류 추가 | `design-system/blocks.tsx` → `<Block>` 셸로 새 프리셋 작성 |
| DS 뷰어 색상·타이포 수치 | `lib/designsystem-data.ts` → `ACCENT_SWATCHES`, `SURFACE_SWATCHES`, `TYPE_SCALE`, `RADII` |

---

## 스타일 시스템

### 테마 구조
- **전역 상태**: `lib/theme-context.tsx` — `ThemeProvider` + `useTheme()` hook
- `ThemeProvider`는 `app/layout.tsx`에서 `<Navbar>`와 `{children}`을 감쌉니다
- 테마 전환 시 `document.documentElement`에 `data-theme` 속성이 설정됩니다
- **라이트 테마**: `:root` (기본, "실험실 벤치" 콘셉트)
- **다크 테마**: `[data-theme="dark"]` — `html` 요소에 적용되어 전역 토큰이 교체됩니다
- Navbar 포함 모든 컴포넌트가 동일한 `:root` 토큰을 사용 (별도 다크 오버라이드 불필요)

### 주요 CSS 변수 (토큰) — `design-system/globals.css` `:root`에 정의
```css
--paper       /* 배경 */
--paper-2     /* 보조 배경 (섹션 구분 등) */
--card        /* 카드 배경 */
--card-2      /* 카드 보조 배경 */
--ink         /* 주요 텍스트 */
--ink-soft    /* 보조 텍스트 */
--ink-faint   /* 흐린 텍스트 (점선 카드 등) */
--cyan        /* 강조색 (링크 hover, 포커스 등) */
--accent-text /* 강조 텍스트 (em, 라벨 등) */
--copper      /* 보조 강조 */
--mustard     /* 3차 강조 */
--tile        /* 아이콘 타일 배경 (항상 다크) */
--tile-ink    /* 아이콘 타일 전경 */
--glow        /* cyan 발광 효과 */
--shadow      /* 카드 그림자 */
--border      /* 테두리 */
--grid        /* 배경 격자 (미세) */
--grid-strong /* 배경 격자 (강조) */
```

### 디자인 시스템 유틸리티 클래스 (`design-system/globals.css`)
```css
.ds-card             /* 표준 카드 (--card 배경, 보더, 14px 라운드, 그림자) → DSCard 컴포넌트 */
.ds-link-card        /* hover: translateY(-2px) + cyan ring + glow */
.ds-pill             /* hover: border-color → --cyan */
.ds-grid-2           /* 2열 그리드 (모바일 1열) → DSGrid cols={2} 컴포넌트 */
.ds-grid-3           /* 3열 그리드 (모바일 1열) → DSGrid cols={3} 컴포넌트 */
.ds-grid-4           /* 4열 그리드 (모바일 2열) → DSGrid cols={4} 컴포넌트 */
.ds-section-head     /* 번호+라벨+페이드 라인 헤더 래퍼 → DSSectionHead 컴포넌트 */
.ds-section-head__no     /* 번호 (--accent-text, mono) */
.ds-section-head__label  /* 라벨 (--ink-soft, mono) */
.ds-section-head__line   /* 페이드 라인 */
.ds-card-label       /* 모노 소문자 카드 캡션 (10px, --ink-soft) → DSCardLabel 컴포넌트 */
```

### 폰트
- `Sora` (헤딩, 500/600/700)
- `Noto Sans KR` (한국어 본문, 400/500/700)
- `IBM Plex Mono` (기술적 UI 요소, 400/500/600)

### 반응형 브레이크포인트
- `720px`: Navbar 햄버거 메뉴 전환

---

## 이펙트 시스템

### ParticleField (`effects/ParticleField.tsx`)
- **Burst 모드**: 프로필 사진 클릭 → 다방향 입자 트랙 분출 (multiplicity 조절 가능: 2-60)
- **Decay 모드**: 배경 클릭 → 현실적 입자 붕괴 애니메이션
  - Λ⁰ → p + π⁻, K⁰ₛ → π⁺ + π⁻, γ → e⁺ + e⁻, 등 6가지 채널
- `ForwardRef` 패턴 → `LinkHub.tsx`에서 `ref`로 `triggerBurst()` 호출

### PCBBackground (`effects/PCBBackground.tsx`)
- 절차적 PCB 회로 패턴 생성 + "전류 펄스" 흐름 애니메이션
- 오프스크린 캔버스로 정적 레이어 캐싱 (성능 최적화)
- `pointer-events: none` → 클릭 이벤트 통과

### FXPanel (`effects/FXPanel.tsx`)
- FAB 버튼 (우하단 원자 아이콘) 클릭 → 이펙트 제어 패널 열림
- PCB 배경, 트랙 이벤트, 붕괴 애니메이션 개별 토글
- `data-fx-exclude` 속성이 있는 요소 클릭은 decay 이벤트 트리거 제외

---

## 빌드 & 배포

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 정적 빌드 → ./out 디렉토리
npm run lint     # ESLint
```

- `master` 브랜치에 push하면 GitHub Actions가 자동 빌드·배포
- 빌드 산출물: `./out` (next.config.mjs: `output: 'export'`)
- 이미지 최적화 비활성화 (`unoptimized: true`) — 정적 호스팅 때문

---

## About 페이지 & 블록 시스템

### About 페이지 (`components/About.tsx`)
- `lib/data.ts`의 `about` 객체에서 콘텐츠를 불러와 `design-system/blocks.tsx` 프리셋으로 조립
- `.hub` 컨테이너 구조 사용 (테마는 `:root` 토큰으로 자동 반영, `useTheme` 불필요)
- 헤더: 캐릭터 이미지 + 오실로스코프 파형 SVG 구분선 + PCB 트레이스 장식 SVG
- 현재 블록 구성: `ProfileBlock` → `TagBlock(LIKES)` → `TagBlock(DISLIKES)` → `TextBlock(AIMS)` → `TextBlock(RESEARCH)`

### 블록카드 시스템 (`design-system/blocks.tsx`)
프리셋 컴포넌트를 `<BlockGrid>` 안에 배치해 About 등 페이지를 조립하는 구조.

| 컴포넌트 | 역할 | 사용처 |
|----------|------|--------|
| `BlockGrid` | 2열 CSS 그리드 래퍼 | About 등 |
| `Block` | 범용 셸 (full/bar/code/accent props) | About 등 |
| `QuoteBlock` | 한 줄 소개 — 전체 너비 + 상단 cyan 바 | About |
| `ProfileBlock` | key/value 테이블 (전체 너비) | About |
| `TagBlock` | 태그 묶음 (LIKES/DISLIKES 등, 절반 너비 기본) | About |
| `TextBlock` | 긴 본문 텍스트 (전체 너비 기본) | About |
| `EmptyBlock` | 자리표시 점선 카드 | About |
| `DSCard` | 표준 카드 컨테이너 (`.ds-card` CSS) — `cardStyle` 대체 | DS 뷰어, 새 페이지 |
| `DSGrid` | 반응형 그리드 (cols: 2\|3\|4, `.ds-grid-N` CSS) | DS 뷰어, 새 페이지 |
| `IconTile` | 다크 타일 래퍼 (`.link-card__tile` CSS 재사용) | LinkHub, DS 뷰어 |
| `DSSectionHead` | 번호 + 라벨 + 페이드 라인 섹션 헤더 | DS 뷰어 |
| `DSCardLabel` | 모노 소문자 캡션 (`style` prop 지원) | DS 뷰어 |

- **accent 옵션**: `'cyan'` | `'copper'` | `'mustard'` | `'accent'`
- 블록 스타일: `design-system/globals.css`의 `.block-*` 클래스
- DS 컴포넌트 스타일: `design-system/globals.css`의 `.ds-*` 클래스
- 상세 사용법: `design-system/blocks.md` / 실제 예시: `/example` 페이지

---

## 자주 쓰는 패턴

### 새 링크 추가
```ts
// lib/data.ts
export const links: LinkItem[] = [
  { icon: 'youtube', label: '유튜브', sub: '@isaac.fisica', url: 'https://...' },
  // 새 항목 추가:
  { icon: 'discord', label: 'Discord', sub: '커뮤니티', url: 'https://discord.gg/...' },
];
```

### 새 아이콘 추가
```tsx
// design-system/icons.tsx — LinkIcon의 switch에 추가
case 'newicon': return <svg>...</svg>;
```

### 테마별 스타일 추가
```css
/* design-system/globals.css — :root 토큰이 전역으로 적용되므로 별도 다크 오버라이드 불필요 */
.my-element { color: var(--ink); }

/* 다크 모드에서만 다른 값이 필요한 경우 */
[data-theme="dark"] .my-element { color: var(--cyan); }
```

### 로컬 테마 토글 (전역 테마와 독립)
```tsx
// 페이지 자체에서 라이트/다크를 독립 제어할 때
'use client';
import { useState } from 'react';
import { ThemeToggle } from '@/design-system/ThemeToggle';

const [theme, setTheme] = useState<'light' | 'dark'>('light');
const isDark = theme === 'dark';

<div data-theme={theme}>
  <ThemeToggle isDark={isDark} onToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
  {/* [data-theme='dark'] CSS 선택자가 이 래퍼 안에서 동작 */}
</div>
```

### 디자인 시스템 뷰어 (`/designsystem`)
- `app/designsystem/page.tsx` 단일 파일. 별도 레이아웃·CSS 없음 — `design-system/globals.css` 토큰을 그대로 사용
- 페이지 자체에 로컬 `theme` state를 두어 전역 테마와 독립적으로 라이트/다크 전환 가능
- 모든 컴포넌트는 라이브러리에서 import (페이지에 컴포넌트 정의 없음):
  - `design-system/blocks.tsx` → `DSCard`, `DSGrid`, `IconTile`, `DSSectionHead`, `DSCardLabel`
  - `design-system/ThemeToggle.tsx` → 헤더 및 CONTROLS 데모에서 사용
  - `design-system/icons.tsx` → `LinkIcon`, `ArrowIcon`
  - `lib/designsystem-data.ts` → `ACCENT_SWATCHES`, `SURFACE_SWATCHES`, `TYPE_SCALE`, `RADII`
- 카드는 `DSCard`, 그리드는 `DSGrid`를 사용 — 인라인 `cardStyle` 객체 없음

### ThemeToggle (`design-system/ThemeToggle.tsx`)
- `isDark: boolean` + `onToggle: () => void` props만 받는 순수 UI 컴포넌트
- 글로벌 `useTheme()` 없이 어디서든 독립적으로 사용 가능 (로컬 상태 주입)
- 기존 CSS 클래스(`.toggle`, `.toggle__icon`, `.toggle__knob`) 재사용 — 별도 스타일 없음
- `navbar.tsx`의 인라인 토글과 동일한 시각 결과, 별도 컴포넌트로 추출된 버전
