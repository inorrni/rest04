import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { serviceCards, notices } from '../data/site'
import { heroImages, bandImage, serviceCardImages } from '../data/images'

// ── 히어로 슬라이더 ─────────────────────────────────────────
const slides = [
  { copy: '환경을 데이터로,\n현장을 시스템으로', img: heroImages[0] },
  { copy: 'Environmental Data.\nDigital Future.',  img: heroImages[1] },
]

function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const go = (dir) => setIdx((i) => (i + dir + slides.length) % slides.length)

  return (
    <section className="relative h-[calc(100vh-5rem)] min-h-[520px] w-full overflow-hidden bg-neutral-800">
      {slides.map((s, i) => (
        <div
          key={i}
          className={[
            'absolute inset-0 transition-opacity duration-1000',
            i === idx ? 'opacity-100' : 'pointer-events-none opacity-0',
          ].join(' ')}
        >
          <img
            src={s.img}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 flex items-end">
            <p className="whitespace-pre-line px-[5%] pb-32 text-5xl font-medium leading-tight text-white drop-shadow md:text-7xl lg:text-8xl xl:text-[8rem]">
              {s.copy}
            </p>
          </div>
        </div>
      ))}

      {/* 좌우 이동 */}
      <button
        type="button"
        aria-label="이전 슬라이드"
        onClick={() => go(-1)}
        className="absolute bottom-10 left-[5%] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white/20"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="다음 슬라이드"
        onClick={() => go(1)}
        className="absolute bottom-10 left-[calc(5%+52px)] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white/20"
      >
        ›
      </button>

      {/* 바로가기 버튼 */}
      <div className="absolute bottom-10 right-[5%] z-10 hidden gap-3 md:flex">
        <Link
          to="/services/waste-dx"
          className="flex items-center gap-3 rounded-full bg-brand px-6 py-3.5 text-white transition hover:brightness-110"
        >
          사업 소개 <span>→</span>
        </Link>
        <Link
          to="/contact"
          className="flex items-center gap-3 rounded-full bg-eco px-6 py-3.5 text-white transition hover:brightness-110"
        >
          도입 문의 <span>→</span>
        </Link>
      </div>

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`슬라이드 ${i + 1}`}
            onClick={() => setIdx(i)}
            className={[
              'h-1.5 rounded-full transition-all',
              i === idx ? 'w-8 bg-white' : 'w-2 bg-white/50',
            ].join(' ')}
          />
        ))}
      </div>
    </section>
  )
}

// ── 회사 소개 인트로 링크 ────────────────────────────────────
function IntroLinks() {
  const links = [
    { label: 'CEO 인사말',  to: '/about/greeting'  },
    { label: '비전/가치',   to: '/about/vision'    },
    { label: '사업소개',    to: '/services/waste-dx'},
    { label: 'AI 동영상',   to: '/videos'           },
  ]
  return (
    <section className="py-24 text-center dark:bg-neutral-900 md:py-32">
      <p className="mx-auto mb-12 max-w-2xl px-6 text-2xl font-bold leading-snug text-neutral-800 dark:text-neutral-100 md:text-3xl">
        환경과 디지털을 잇는 전환,<br className="hidden md:block" />
        데이터로 미래를 관리합니다.
      </p>
      <ul className="flex flex-wrap justify-center gap-4 px-4">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="relative inline-flex items-center gap-3 rounded-full bg-neutral-100 py-4 pl-6 pr-12 font-bold transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
            >
              {l.label}
              <span className="absolute right-5 text-neutral-500 dark:text-neutral-400">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

// ── 사업소개 가로 스크롤 카드 ────────────────────────────────
function OurServices() {
  return (
    <section className="py-24 dark:bg-neutral-950 md:py-32">
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
        <h2 className="mb-12 text-4xl font-bold leading-tight text-brand md:text-6xl">
          Our Services<br />Transforming Environment
        </h2>
      </div>

      <div className="scrollbar-hide flex gap-6 overflow-x-auto px-4 pb-4 md:px-10 lg:px-40">
        {serviceCards.map((s) => (
          <Link
            key={s.key}
            to={s.to}
            className="group relative h-[366px] w-64 shrink-0 overflow-hidden rounded-xl"
          >
            <img
              src={serviceCardImages[s.key]}
              alt={s.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <p className="mb-4 text-2xl font-bold">{s.title}</p>
              <p className="text-sm leading-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {s.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ── 환경 DX 밴드 ─────────────────────────────────────────────
function EnvDxBand() {
  return (
    <section className="relative h-[480px] w-full overflow-hidden md:h-[600px]">
      <img
        src={bandImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-brand/80 to-eco/60 px-4 md:px-10 lg:px-40">
        <p className="mb-4 text-sm font-semibold tracking-widest text-white/80">
          ENVIRONMENT DX
        </p>
        <h2 className="mb-8 text-4xl font-bold leading-tight text-white md:text-6xl">
          지속 가능한 환경을 위한<br />디지털 전환
        </h2>
        <div>
          <Link
            to="/services/waste-dx"
            className="inline-flex items-center gap-3 rounded-full bg-white/90 px-6 py-3.5 font-bold text-brand transition hover:bg-white"
          >
            사업소개 보기 <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── 최신 소식 ───────────────────────────────────────────────
function MoreToDiscover() {
  return (
    <section className="py-24 dark:bg-neutral-900 md:py-32">
      <div className="mx-auto flex max-w-container flex-col px-4 md:px-10 lg:px-40">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b-2 border-neutral-400 pb-10 dark:border-neutral-700 md:flex-row md:items-center">
          <p className="text-4xl font-bold text-brand md:text-6xl">More to Discover</p>
          <Link
            to="/contact"
            className="relative inline-flex items-center gap-3 rounded-full bg-neutral-100 py-4 pl-6 pr-12 font-bold transition hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
          >
            문의하기 <span className="absolute right-5 text-neutral-500 dark:text-neutral-400">→</span>
          </Link>
        </div>

        <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
          {notices.map((n) => (
            <li key={n.id}>
              <div className="flex flex-col justify-between gap-1 py-5 md:flex-row md:items-center">
                <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 md:text-xl">
                  {n.title}
                </span>
                <span className="text-sm text-neutral-500 md:text-base">{n.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <IntroLinks />
      <OurServices />
      <EnvDxBand />
      <MoreToDiscover />
    </>
  )
}
