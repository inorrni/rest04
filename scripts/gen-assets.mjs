import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')

mkdirSync(publicDir, { recursive: true })

// ── 색상 상수 ──────────────────────────────
const SKY    = '#0EA5E9'
const GREEN  = '#16A34A'
const NAVY   = '#0C1A2E'

// ── OG 이미지 (1200×630, JPG, 카카오 호환) ──
await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: { r: 255, g: 255, b: 255 },
  },
})
  .composite([
    {
      input: Buffer.from(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
          <defs>
            <linearGradient id="panel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${SKY}"/>
              <stop offset="100%" stop-color="${GREEN}"/>
            </linearGradient>
            <linearGradient id="topbar" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="${SKY}"/>
              <stop offset="100%" stop-color="${GREEN}"/>
            </linearGradient>
            <clipPath id="rightClip">
              <rect x="800" y="0" width="400" height="630"/>
            </clipPath>
          </defs>

          <!-- 흰 배경 -->
          <rect width="1200" height="630" fill="white"/>

          <!-- 상단 그라데이션 바 -->
          <rect x="0" y="0" width="1200" height="8" fill="url(#topbar)"/>

          <!-- 우측 그라데이션 패널 -->
          <rect x="800" y="0" width="400" height="630" fill="url(#panel)"/>

          <!-- 우측 패널 장식 원 -->
          <circle cx="1000" cy="315" r="220" fill="white" fill-opacity="0.06"/>
          <circle cx="1000" cy="315" r="150" fill="white" fill-opacity="0.06"/>
          <circle cx="1000" cy="315" r="80"  fill="white" fill-opacity="0.08"/>

          <!-- 우측 패널 잎 아이콘 (대형) -->
          <g transform="translate(950,255) scale(3.2)" opacity="0.18">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 8 0 0-2-2-5-2z" fill="white"/>
          </g>

          <!-- 좌측: 로고 아이콘 박스 -->
          <rect x="80" y="150" width="64" height="64" rx="14"
            fill="url(#panel)"/>
          <g transform="translate(92,162) scale(1.67)" opacity="1">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 8 0 0-2-2-5-2z" fill="white"/>
          </g>

          <!-- 회사명 -->
          <text x="80" y="300"
            font-family="'Apple SD Gothic Neo','Malgun Gothic',sans-serif"
            font-size="72" font-weight="700" fill="${NAVY}">
            ENV-DX
          </text>

          <!-- 슬로건 -->
          <text x="80" y="358"
            font-family="'Apple SD Gothic Neo','Malgun Gothic',sans-serif"
            font-size="26" font-weight="400" fill="#64748B">
            환경을 데이터로, 현장을 시스템으로
          </text>

          <!-- 강조 라인 -->
          <rect x="80" y="390" width="180" height="4" rx="2" fill="url(#topbar)"/>

          <!-- 서비스 태그 -->
          <rect x="80"  y="426" width="132" height="36" rx="18" fill="${SKY}" fill-opacity="0.1"/>
          <text x="146" y="449" text-anchor="middle"
            font-family="sans-serif" font-size="15" fill="${SKY}" font-weight="600">폐기물 DX</text>

          <rect x="228" y="426" width="156" height="36" rx="18" fill="${GREEN}" fill-opacity="0.1"/>
          <text x="306" y="449" text-anchor="middle"
            font-family="sans-serif" font-size="15" fill="${GREEN}" font-weight="600">수질·대기 모니터링</text>

          <rect x="400" y="426" width="144" height="36" rx="18" fill="${SKY}" fill-opacity="0.1"/>
          <text x="472" y="449" text-anchor="middle"
            font-family="sans-serif" font-size="15" fill="${SKY}" font-weight="600">AI 환경 분석</text>

          <!-- URL -->
          <text x="80" y="590"
            font-family="sans-serif" font-size="15" fill="#94A3B8">
            inorrni.github.io/rest04
          </text>
        </svg>
      `),
      top: 0,
      left: 0,
    },
  ])
  .flatten({ background: '#FFFFFF' })
  .jpeg({ quality: 92 })
  .toFile(path.join(publicDir, 'og-image-v2.jpg'))

console.log('✓ og-image-v2.jpg (1200×630, JPG)')

// ── 파비콘 SVG ──────────────────────────────
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="${NAVY}"/>
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${SKY}"/>
      <stop offset="100%" stop-color="${GREEN}"/>
    </linearGradient>
  </defs>
  <!-- 잎사귀 아이콘 -->
  <path d="M16 6 C10 6 6 10 6 16 C6 22 10 26 16 26 C16 26 16 16 26 16 C26 10 22 6 16 6Z"
    fill="url(#g)" opacity="0.9"/>
  <circle cx="16" cy="16" r="2" fill="white" opacity="0.9"/>
</svg>`

import { writeFileSync } from 'fs'
writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg)
console.log('✓ favicon.svg')

// ── PNG 파비콘 생성 ──────────────────────────
const svgBuffer = Buffer.from(faviconSvg)

await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32.png'))
console.log('✓ favicon-32.png')

await sharp(svgBuffer).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16.png'))
console.log('✓ favicon-16.png')

await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'))
console.log('✓ apple-touch-icon.png')

console.log('\n모든 에셋 생성 완료! public/ 폴더를 확인하세요.')
