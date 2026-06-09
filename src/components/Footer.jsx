import { Link } from 'react-router-dom'
import { company } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      {/* 상단: 로고·소개 + 사이트맵 */}
      <div className="mx-auto max-w-container px-4 py-16 md:px-10 lg:px-40">
        <div>

          {/* 브랜드 + 소개 */}
          <div className="max-w-md">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-eco text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 8 0 0-2-2-5-2z"/>
                </svg>
              </span>
              <span className="text-xl font-extrabold text-white">{company.name}</span>
            </div>
            <div className="space-y-3 text-sm leading-7">
              {company.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {/* 주소 */}
            <div className="mt-8 space-y-1 text-xs text-neutral-500">
              {company.offices.map((o) => (
                <div key={o.label} className="flex flex-wrap gap-x-5 gap-y-0.5">
                  <span className="font-semibold text-neutral-400">{o.label}</span>
                  <span>{o.address}</span>
                  <span>Tel {o.tel}</span>
                  <span>Fax {o.fax}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 하단 바: 정책 링크 + Family site + 카피라이트 */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-4 px-4 py-6 text-xs md:flex-row md:items-center md:px-10 lg:px-40">
          <ul className="flex flex-wrap gap-x-1">
            {company.footerLinks.map((l, i) => (
              <li key={l.label} className="flex items-center">
                {i > 0 && <span className="mx-3 text-neutral-700">|</span>}
                <Link
                  to={l.to}
                  className={l.strong ? 'font-bold text-white' : 'hover:text-white'}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <select
              aria-label="Family site"
              className="rounded border border-neutral-700 bg-transparent px-3 py-1.5 text-xs text-neutral-400 focus:outline-none"
              defaultValue=""
              onChange={(e) => { if (e.target.value) window.open(e.target.value, '_blank') }}
            >
              <option value="" disabled>Family site</option>
              {company.familySites.map((f) => (
                <option key={f.name} value={f.url} className="text-black">{f.name}</option>
              ))}
            </select>
            <p className="text-neutral-600">{company.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
