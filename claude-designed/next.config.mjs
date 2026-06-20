/**
 * GitHub Pages = 정적 호스팅이므로 정적 export(`output: 'export'`)로 빌드합니다.
 * `npm run build` → out/ 폴더가 생성되고, 이 폴더가 Pages로 배포됩니다.
 *
 * basePath:
 *  - 사용자/조직 페이지(username.github.io)        → '' (비움)
 *  - 프로젝트 페이지(username.github.io/repo-name)  → '/repo-name'
 *  배포 워크플로(.github/workflows/deploy.yml)가 PAGES_BASE_PATH 환경변수로
 *  이 값을 자동 주입합니다. 로컬에서 서브경로로 빌드하려면:
 *      PAGES_BASE_PATH=/repo-name npm run build
 */
const basePath = process.env.PAGES_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
