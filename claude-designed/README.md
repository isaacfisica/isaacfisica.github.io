# 이삭 ISAAC — 링크 허브

물리학 전공 VTuber **이삭 ISAAC**의 싱글페이지 링크 허브.
Next.js(App Router) + 정적 export 기반이라 **GitHub Pages**에 그대로 배포됩니다.
"실험실 작업대" 무드 · Cherenkov 시안 포인트 · 라이트(기본)/다크 테마 토글.

## 빠른 시작

```bash
npm install      # 의존성 설치 (Node 18+ 권장)
npm run dev      # 개발 서버 → http://localhost:3000
npm run build    # 정적 빌드 → out/ 폴더 생성
```

`npm run build` 결과인 `out/` 폴더가 그대로 배포 산출물입니다.

## 콘텐츠 수정 (거의 모든 변경은 한 파일에서)

`lib/data.ts` 만 고치면 됩니다.

- **링크 추가/수정** — `links` 배열에 `{ icon, label, sub, url }` 추가
  - `icon`: `youtube` · `stream` · `x` · `discord` · `support`
  - 새 아이콘이 필요하면 `components/icons.tsx` 의 `LinkIcon` switch에 `case` 한 개 추가
- **확장 슬롯** — `slots` 배열 (지금은 "준비 중" placeholder)
- **푸터 소셜** — `footerSocials` 배열
- **프로필/문구** — `profile` 객체
- **확장 슬롯 섹션 끄기** — `showSlots = false`

### 캐릭터 일러스트 넣기

1. 이미지를 `public/character.png` 로 저장
2. `components/LinkHub.tsx` 의 `avatar__clip` 안에서 `<div className="avatar__ph">` 를 지우고
   바로 위의 `<img ... />` 주석을 해제

## 디자인 토큰

색·간격은 `app/globals.css` 상단의 `.hub`(라이트=기본) / `.hub[data-theme="dark"]`(다크)
CSS 변수에서 일괄 관리합니다. 테마 토글은 **메모리 상태만** 사용해 새로고침 시 라이트로 초기화됩니다(브라우저 스토리지 미사용).

## GitHub Pages 배포

1. 이 프로젝트를 GitHub 저장소에 push
2. 저장소 **Settings → Pages → Build and deployment → Source: GitHub Actions** 선택
3. `main` 브랜치에 push할 때마다 `.github/workflows/deploy.yml` 가 자동으로 빌드·배포

`basePath`(서브경로)는 워크플로가 저장소 종류를 보고 자동 설정합니다.

- 사용자/조직 페이지 `username.github.io` → basePath 없음
- 프로젝트 페이지 `username.github.io/repo-name` → `/repo-name`

로컬에서 서브경로로 빌드해 확인하려면:

```bash
PAGES_BASE_PATH=/repo-name npm run build
```

## 구조

```
app/
  layout.tsx      # 폰트 로드 + 메타데이터
  page.tsx        # 엔트리 (LinkHub 렌더)
  globals.css     # 디자인 토큰 + 전체 스타일
components/
  LinkHub.tsx     # 페이지 본문 (테마 토글 포함, client component)
  icons.tsx       # 인라인 SVG 아이콘
lib/
  data.ts         # ★ 링크/슬롯/프로필 데이터 — 주로 여기만 수정
public/
  .nojekyll       # Pages가 _next 폴더를 무시하지 않도록
.github/workflows/
  deploy.yml      # GitHub Pages 자동 배포
```

> 참고: 루트의 `이삭 ISAAC 링크허브.dc.html` 는 원본 디자인 시안(미리보기용)입니다.
> 실제 사이트는 위 Next.js 코드에서 빌드됩니다.
