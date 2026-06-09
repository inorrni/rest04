import { Link } from 'react-router-dom'
import { company } from '../data/site'

export default function Footer() {
  return (
    <footer className="relative">
      {/* 상단 소개 영역 */}
      <div className="mx-auto max-w-container px-4 py-20 dark:bg-neutral-900 md:px-10 lg:px-40">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
          <div className="w-56 shrink-0">
            <div className="flex items-center gap-2 text-2xl font-extrabold text-brand">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-eco text-base text-white">🌿</span>
              {company.name}
            </div>
          </div>
          <div className="flex-grow text-base leading-7 text-neutral-700 dark:text-neutral-300 md:text-[1.05rem]">
            {company.intro.map((p, i) => (
              <p key={i} className="mb-4 last:mb-0">{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 다크 영역 */}
      <div className="bg-neutral-950 px-4 py-12 md:px-10 lg:px-40">
        <div className="mx-auto flex max-w-container flex-col gap-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            {/* 주소 */}
            <div className="flex flex-col gap-2.5 text-sm">
              {company.offices.map((o) => (
                <div
                  key={o.label}
                  className="flex flex-col gap-1 md:flex-row md:gap-8"
                >
                  <div className="w-14 shrink-0 font-bold text-neutral-200">{o.label}</div>
                  <ul className="flex flex-col gap-1 font-medium text-neutral-400 md:flex-row md:gap-8">
                    <li className="md:w-60">{o.address}</li>
                    <li className="md:w-32">Tel : {o.tel}</li>
                    <li>Fax : {o.fax}</li>
                  </ul>
                </div>
              ))}
            </div>

            {/* Family site */}
            <div className="w-full md:w-56">
              <select
                aria-label="Family site"
                className="w-full rounded border border-zinc-600 bg-transparent px-4 py-2.5 text-sm font-bold text-neutral-300"
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) window.open(e.target.value, '_blank')
                }}
              >
                <option value="" disabled>Family site</option>
                {company.familySites.map((f) => (
                  <option key={f.name} value={f.url} className="text-black">
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 정책 링크 + 카피라이트 */}
          <div className="flex flex-col justify-between gap-4 border-t border-neutral-800 pt-4 text-sm md:flex-row md:items-center">
            <ul className="flex">
              {company.footerLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className={[
                      'px-6 first:pl-0',
                      l.strong
                        ? 'font-black text-white'
                        : 'font-medium text-neutral-400 hover:text-white',
                    ].join(' ')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-zinc-500">{company.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
