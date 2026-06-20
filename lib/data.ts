/**
 * ────────────────────────────────────────────────────────────────────
 *  콘텐츠 데이터 — 거의 모든 수정은 이 파일에서 끝납니다.
 * ────────────────────────────────────────────────────────────────────
 *  ▷ 링크 추가/수정 : links 배열에 항목을 추가하거나 url을 바꾸세요.
 *       icon: youtube | stream | x | discord | support
 *       새 아이콘이 필요하면 components/icons.tsx 의 LinkIcon에 한 줄 추가.
 *  ▷ 확장 슬롯       : slots 배열 (지금은 '준비 중' placeholder).
 *  ▷ 푸터 소셜       : footerSocials 배열.
 *  ▷ showSlots=false  로 두면 확장 슬롯 섹션이 통째로 숨겨집니다.
 */

export type IconName = 'youtube' | 'stream' | 'x' | 'discord' | 'support';

export interface LinkItem {
  icon: IconName;
  label: string;
  sub: string;
  url: string;
}

export interface SlotItem {
  label: string;
  note: string;
}

export interface SocialItem {
  icon: IconName;
  label: string;
  url: string;
}

/* 메인 링크 — url의 "#" 자리에 실제 주소를 넣으세요. */
export const links: LinkItem[] = [
  //{  icon: 'youtube', label: 'YouTube', sub: '메인 채널 · 물리 교양 + 개그과학', url: '#' }, // 여기에 링크
  { icon: 'stream', label: '스트리밍', sub: 'CHZZK', url: 'https://chzzk.naver.com/live/271d3c1c873ad6e013f2524ea705045c' }, // 여기에 링크
  { icon: 'x', label: 'X (트위터)', sub: '@isaacfisica_kr', url: 'https://x.com/isaacfisica_kr' }, // 여기에 링크
  //{ icon: 'discord', label: 'Discord', sub: '커뮤니티 서버', url: '#' }, // 여기에 링크
  //{ icon: 'support', label: '후원 · 멤버십', sub: '채널 멤버십 / 슈퍼챗', url: '#' }, // 여기에 링크
];

/* 확장 슬롯 — 추후 활성화 시 위 links 처럼 실제 섹션으로 교체 */
export const slots: SlotItem[] = [
  { label: 'Live · 최신 영상', note: '준비 중' },
  { label: '방송 스케줄', note: '준비 중' },
  { label: 'About 이삭', note: '준비 중' },
  { label: 'FAQ', note: '준비 중' },
];

/* 푸터 소셜 아이콘 줄 */
export const footerSocials: SocialItem[] = [
  // { icon: 'youtube', label: 'YouTube', url: '#' },
  { icon: 'stream', label: 'CHZZK', url: 'https://chzzk.naver.com/live/271d3c1c873ad6e013f2524ea705045c' },
  { icon: 'x', label: 'X', url: 'https://x.com/isaacfisica_kr' },
  // { icon: 'discord', label: 'Discord', url: '#' },
];

/* 프로필 */
export const profile = {
  nameKo: '이삭',
  nameEn: 'ISAAC',
  tagline: '물리학과 박사과정 // 실험 핵·입자물리학;국제공동연구 // 이탈리아 대학 재학중',
  chips: ['물리 교양', '게임'],
  recTag: 'REC · ISAAC-2026',
  copyright: '© 2026 이삭 ISAAC',
  footnote: 'Character designed by BOOTH 扇屋敷の絵画工房',
};

/* 확장 슬롯 섹션 표시 여부 */
export const showSlots = false;

/* ────────────────────────────────────────────────────────────────────
   FX 기믹 기본값 (런타임 패널로 on/off 가능)
   - pcb    : 전류가 흐르는 PCB 회로 배경 애니메이션
   - tracks : 프로필 사진 클릭 → 이벤트 디스플레이 트랙 분출
   - decay  : 배경 클릭 → Λ⁰ → p + π⁻ 붕괴 애니메이션
   - multiplicity : 프로필 클릭 시 생성되는 트랙(입자) 개수
   ──────────────────────────────────────────────────────────────────── */
export const fxDefaults = {
  pcb: true,
  tracks: true,
  decay: true,
  multiplicity: 14,
};
