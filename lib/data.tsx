/**
 * ────────────────────────────────────────────────────────────────────
 *  콘텐츠 데이터 — 거의 모든 수정은 이 파일에서 끝납니다.
 * ────────────────────────────────────────────────────────────────────
 *  ▷ 링크 추가/수정 : links 배열에 항목을 추가하거나 url을 바꾸세요.
 *       icon: youtube | stream | x | twitter | discord | support
 *       새 아이콘이 필요하면 design-system/icons.tsx 의 LinkIcon에 한 줄 추가.
 *  ▷ 확장 슬롯       : slots 배열 (지금은 '준비 중' placeholder).
 *  ▷ 푸터 소셜       : footerSocials 배열.
 *  ▷ showSlots=false  로 두면 확장 슬롯 섹션이 통째로 숨겨집니다.
 *  ▷ FAQ             : faq 배열 — /faq 페이지 문답 (JSX 사용 가능).
 *  ▷ 추천 콘텐츠     : featured 배열 + showFeatured 플래그 — 메인 FEATURED 섹션.
 *  ▷ 방송 스케줄     : schedule 배열 + showSchedule 플래그 — 메인 SCHEDULE 섹션.
 */

import type { ReactNode } from 'react';
import type { IconName } from '@/design-system/icons';

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

  { icon: 'stream', label: '라이브 스트리밍', sub: 'CHZZK', url: 'https://chzzk.naver.com/live/271d3c1c873ad6e013f2524ea705045c' }, // 여기에 링크
  { icon: 'twitter', label: 'Twitter (X)', sub: '@isaacfisica_kr', url: 'https://x.com/isaacfisica_kr' }, // 여기에 링크
  { icon: 'youtube', label: 'YouTube', sub: 'Youtube', url: 'https://www.youtube.com/@isaac.fisica' }, // 여기에 링크
  { icon: 'blog', label: '블로그', sub: 'Tistory', url: 'https://isaacfisica.tistory.com' }, // 여기에 링크
  { icon: 'blog', label: '스핀스핀', sub: 'SpinSpin', url: 'https://spin-spin.com/isaac' },
  { icon: 'blog', label: '버튜버학회 상담실', sub: 'OfficeHours Vtuber Academia', url: 'https://officehours.vtuberacademia.kr/v/isaac' },
  //   //{ icon: 'discord', label: 'Discord', sub: '커뮤니티 서버', url: '#' }, // 여기에 링크
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
  { icon: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@isaac.fisica' },
  { icon: 'stream', label: 'CHZZK', url: 'https://chzzk.naver.com/live/271d3c1c873ad6e013f2524ea705045c' },
  { icon: 'twitter', label: 'Twitter (X)', url: 'https://x.com/isaacfisica_kr' },
  // { icon: 'discord', label: 'Discord', url: '#' },
];

/* 프로필 */
export const profile = {
  nameKo: '이삭',
  nameEn: 'ISAAC',
  tagline: '물리학과 박사과정 // 실험 핵·입자물리학; 국제공동연구 // 이탈리아 대학 재학중',
  chips: ['물리 교양', '게임'],
  recTag: 'REC · ISAAC',
  copyright: '© 2025-2026 이삭 ISAAC',
  footnote: 'Character designed by BOOTH 扇屋敷の絵画工房',
  email: 'isaac.fisica.krNOSPAM[at]gmail.com'
};

/* 확장 슬롯 섹션 표시 여부 */
export const showSlots = false;

/* ────────────────────────────────────────────────────────────────────
   추천 콘텐츠 — 메인 페이지 FEATURED 섹션 (링크 카드와 동일한 모양).
   showFeatured=false 로 두면 섹션이 통째로 숨겨집니다.
   ──────────────────────────────────────────────────────────────────── */
export interface FeaturedItem {
  icon: IconName;
  label: string;
  sub: string;
  url: string;
}

export const showFeatured = true;

export const featured: FeaturedItem[] = [
  { icon: 'blog', label: '이탈리아 박사과정 유학 가이드', sub: '2026.11 최초작성, 수시로 수정', url: ' https://isaacfisica.github.io/pdf-viewer/#q5kEBpRc1sNnULRcf-x7q1RXSVRURVIgQElTQUFDRklTSUNBX0tS' },
  { icon: 'blog', label: '개막장대수능모의고사', sub: 'Tistory · 2026.06', url: 'https://isaacfisica.tistory.com/2' },
];

/* ────────────────────────────────────────────────────────────────────
   방송 스케줄 — 메인 페이지 SCHEDULE 섹션.
   실제 스케줄을 채운 뒤 showSchedule=true 로 바꾸면 표시됩니다.
   ──────────────────────────────────────────────────────────────────── */
export interface ScheduleItem {
  day: string;     // 요일 등: '토'
  time: string;    // 시간대: '21:00 KST'
  label: string;   // 방송 내용: '물리 교양 방송'
  note?: string;   // 부가 정보: 'CHZZK'
}

export const showSchedule = false;

export const schedule: ScheduleItem[] = [
  /* 예시 — 실제 스케줄로 교체하세요.
  { day: '토', time: '21:00 KST', label: '물리 교양 방송', note: 'CHZZK' },
  { day: '일', time: '15:00 KST', label: '게임 방송', note: 'CHZZK' },
  */
];

/* ────────────────────────────────────────────────────────────────────
   About(자기소개) 페이지 콘텐츠 — 블록카드 시스템(design-system/blocks.tsx)에서 사용.
   각 항목 텍스트만 고치면 페이지가 갱신됩니다.
   ──────────────────────────────────────────────────────────────────── */
export interface ProfileRowItem {
  k: string;
  v: string;
}

export const about: {
  quote: string;
  profile: ProfileRowItem[];
  likes: string[];
  dislikes: string[];
  aims: string;
  research: string[];
} = {
  quote: '',
  profile: [
    { k: '이름', v: '이삭' },
    { k: '전공', v: '실험 핵/입자물리학' },
    { k: '거주 국가', v: '이탈리아' },
    { k: '국적', v: '대한민국' },
    { k: '언어', v: '한국어(MT), 영어(C1), 프랑스어(A1), 이탈리아어, 일본어' },
    { k: '주요 거점', v: 'MLO NAP GVA SEL PUS' }
  ],
  likes: ['에어컨'],
  dislikes: ['스파게티 부수기', '카페 아메리카노'],
  aims: "물리학 연구가, 물리학 공부가 어렵지 않다는 것을 보여주는 것을 지향합니다. 물리는 자연에 대한 철학이며, 세상을 바라보는 하나의 관점입니다. 물리학적 지식은 세상을 이해하는데 도움을 줘야할 뿐, 그것을 공부하는 과정에서 고통받지 않도록 그 두려움을 더는 것을 목표로 합니다.",
  research:
    [
      '양자색역학적 상전이 (QCD Phase Transition)',
      '반도체 기반 방사선 검출기',
      '고에너지 핵/입자물리실험을 위한 반도체 기초 연구',
      '암흑물질 탐색을 위한 반도체 기초 연구',
      '초고속 데이터 수집과 대용량 데이터 처리에 대한 기초 연구',
      '방사선의 물질 내 반응에 대한 전산모사 (GEANT4)',
      '한국-이탈리아 및 한국-유럽 국제공동연구',
    ]
};

/* ────────────────────────────────────────────────────────────────────
   FAQ — /faq 페이지 문답. a에는 JSX를 그대로 쓸 수 있습니다 (<br/>, <i>, <strong> 등).
   ──────────────────────────────────────────────────────────────────── */
export interface FaqItem {
  q: string;
  a: ReactNode;
}

export const faq: FaqItem[] = [
  {
    q: 'CERN (유럽 핵·입자물리연구소) 가봤어요?',
    a: (
      <>
        네.<br />
        출입권한도 있고, 이메일도 있습니다. 다닌지는 대충 7년 넘었습니다. 심심하면 갑니다.
      </>
    ),
  },
  {
    q: '외국음식 많이 먹겠네요',
    a: (
      <>
        한달 식사 중 사먹는건 4번 안쪽인 것 같습니다. 나머지는 집에서 한식해먹습니다.<br />
        외식물가는 한국이 더 많이 저렴합니다. 여기서 외식 심플하게 할 돈이면 한국에서 거하게 술먹을 수도 있는듯.<br />
        참고로 저는 이재모피자나 파파존스가 좋습니다.<br /><br />
        가끔 한식치킨집 가서 참이슬 빨간뚜껑 두병이랑 치킨반마리 먹고 옵니다.
      </>
    ),
  },
  {
    q: '왜 스파게티를 부수면 안되나요?',
    a: (
      <>
        스파게티를 부수는 것은 냉면을 가위로 4번이상 자르는 것과 비슷합니다. 이렇게 냉면을 매우 잘게 자르게 되면 젓가락으로 집기 어렵게 되겠지요? 스파게티를 자르는 것은 더 심각합니다.<br />
        보통의 경우는 포크로 스파게티를 말아서 먹을텐데, 스파게티를 부수면, 면의 길이가 짧아져서 포크로 말기 어렵습니다. 그냥 먹는게 안된다고 보시면 됩니다. 포크는 젓가락처럼 그렇게 세밀하게 집을 수 있는 도구가 아닙니다.<br />
        그거 아시나요? 이탈리아에서는 파스타 먹을 때 숟가락도 안줍니다. 숟가락으로 떠먹는 것도 안된다는 뜻입니다. 그릇에 남은 소스는 어떻게 먹냐고요? 빵으로 닦아먹습니다. 참고로 소스 남기는게 예의에 어긋난다는 이야기도 있습니다.<br />
        <strong>스파게티를 부수면 안됩니다. 다시 말합니다. 부수면 안됩니다.</strong><br />
        부숴야 할만큼 냄비가 작다 싶으면 펜네, 푸실리 등 숏 파스타를 먹거나, 말려있는 롱파스타를 (딸리아뗄레 Tagliatelle 등) 사십시오. 제발.
      </>
    ),
  },
  {
    q: '진짜로 (아이스) 아메리카노를 안먹나요?',
    a: (
      <>
        네.<br />
        참고로 저는 한국에 살던 시절에도 아메리카노를 안마셨습니다.<br />
        <i>아이스 아메리카노</i>가 <i>아이스 구정물</i>이라는데 동의하는 편입니다.<br />
        그 맛대가리도 없는 무맛의 물을 왜 먹는지 잘 모르겠습니다. 그럴거면 차라리 녹차가 나을 것 같은데요. 녹차는 맛이라도 있지, 아메리카노는 맛이 없습니다. 그냥 물입니다. 물을 그 돈
        주고 사먹는게 이해가 안됩니다.<br />
        에스프레소는 풍미가 있는 쓴맛이 나는 물이지, 아메리카노는 풍미는 저세상 보냈고 그냥 쓴맛만 약간 남은 물입니다. 그러니까 구정물이지 왜먹는지 모르겠습니다.<br />
        <strong>동네 커피기계에 뽑아도 라바짜가 나오는데 왜 굳이 아메리카노를 먹어야할까요? ㅋㅋ</strong>
      </>
    ),
  },
  {
    q: '진짜로 파인애플 피자 극혐하나요?',
    a: (
      <>
        잘 모르겠긴 한데, 아직 피자가게에서 보지는 못했습니다.<br />
        예전에 나폴리에 있던 사람한테 물어봤는데 반쯤 극혐의 말을 하긴 했었습니다. 왜 그랬는지는 기억안남.
      </>
    ),
  },
  {
    q: '진짜로 크림파스타 안팔아요?',
    a: (
      <>
        아직 파는 곳 못봤습니다.<br />
        먹고 싶을 때에는 제가 집에서 해먹는 편입니다.<br />
        아, 까르보나라 스파게티는 팝니다. 그게 일반적으로 아는 크림파스타는 아니고, 다른게 있습니다. 한국에서 까르보나라라고 부르는 크림파스타는, 알프레도라고 부릅니다.
      </>
    ),
  },
];

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
