const basePath = process.env.PAGES_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // 상위 폴더의 package-lock.json 때문에 워크스페이스 루트를 잘못 추정하는 것 방지
  turbopack: { root: import.meta.dirname },
  images: { 
    unoptimized: true,
    // images.domains → images.remotePatterns 로 변경 권장
    remotePatterns: []
  },
  ...(basePath && { 
    basePath, 
    assetPrefix: basePath 
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;