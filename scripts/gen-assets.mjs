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
    background: { r: 12, g: 26, b: 46 },
  },
})
  .composite([
    // 배경 그라데이션 효과 (왼쪽 상단 글로우)
    {
      input: Buffer.from(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
          <defs>
            <radialGradient id="g1" cx="75%" cy="40%" r="55%">
              <stop offset="0%" stop-color="${SKY}" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="g2" cx="25%" cy="65%" r="50%">
              <stop offset="0%" stop-color="${GREEN}" stop-opacity="0.15"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#g1)"/>
          <rect width="1200" height="630" fill="url(#g2)"/>

          <!-- 로고 아이콘 배경 -->
          <rect x="80" y="200" width="72" height="72" rx="16"
            fill="url(#g1)" fill-opacity="0.3" stroke="${SKY}" stroke-opacity="0.5" stroke-width="1.5"/>
          <path d="M126 216c-9 2-11.1 8.17-13.18 13.34l1.89.66 1-2.3a4.49 4.49 0 002.29-.7c11 0 14-17 14-17-1 2-8 2-8 8 0 0-2-2-5-2z"
            fill="${SKY}" opacity="0.9"/>

          <!-- 회사명 -->
          <text x="80" y="320"
            font-family="'Pretendard', 'Apple SD Gothic Neo', sans-serif"
            font-size="56" font-weight="700" fill="white">
            ENV-DX
          </text>

          <!-- 슬로건 -->
          <text x="80" y="388"
            font-family="'Pretendard', 'Apple SD Gothic Neo', sans-serif"
            font-size="28" font-weight="400" fill="rgba(255,255,255,0.65)">
            환경을 데이터로, 현장을 시스템으로
          </text>

          <!-- 서비스 태그들 -->
          <rect x="80" y="430" width="140" height="34" rx="17"
            fill="${SKY}" fill-opacity="0.2" stroke="${SKY}" stroke-opacity="0.4" stroke-width="1"/>
          <text x="150" y="452" text-anchor="middle"
            font-family="sans-serif" font-size="14" fill="${SKY}" fill-opacity="0.9">
            폐기물 DX
          </text>

          <rect x="236" y="430" width="148" height="34" rx="17"
            fill="${GREEN}" fill-opacity="0.2" stroke="${GREEN}" stroke-opacity="0.4" stroke-width="1"/>
          <text x="310" y="452" text-anchor="middle"
            font-family="sans-serif" font-size="14" fill="${GREEN}" fill-opacity="0.9">
            수질·대기 모니터링
          </text>

          <rect x="400" y="430" width="154" height="34" rx="17"
            fill="${SKY}" fill-opacity="0.15" stroke="${SKY}" stroke-opacity="0.3" stroke-width="1"/>
          <text x="477" y="452" text-anchor="middle"
            font-family="sans-serif" font-size="14" fill="${SKY}" fill-opacity="0.85">
            AI 환경 분석
          </text>

          <!-- URL 우측 하단 -->
          <text x="1120" y="590" text-anchor="end"
            font-family="sans-serif" font-size="16" fill="rgba(255,255,255,0.35)">
            inorrni.github.io/rest04
          </text>
        </svg>
      `),
      top: 0,
      left: 0,
    },
  ])
  .flatten({ background: NAVY })
  .jpeg({ quality: 92 })
  .toFile(path.join(publicDir, 'og-image.jpg'))

console.log('✓ og-image.jpg (1200×630, JPG)')

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
