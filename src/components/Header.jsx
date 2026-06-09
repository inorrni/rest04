import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, company } from '../data/site'

export default function Header({ theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(null)

  // 모바일 메뉴 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="bg-white dark:bg-neutral-900">
        {/* GNB 바 */}
        <div className="mx-auto flex h-20 max-w-container items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-800 md:px-10 lg:px-20">
          {/* 로고 */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-brand"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-eco text-base text-white">
              🌿
            </span>
            {company.name}
          </Link>

          {/* 데스크탑 메뉴 */}
          <ul className="hidden items-stretch lg:flex">
            {nav.map((item) => (
              <li
                key={item.label}
                className="relative flex items-center"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'px-7 py-7 text-lg font-semibold transition-colors',
                      isActive
                        ? 'text-brand'
                        : 'text-neutral-800 hover:text-brand dark:text-neutral-200 dark:hover:text-brand',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>

                {/* 하위 드롭다운 — 해당 버튼 바로 아래 */}
                {hovered === item.label && (
                  <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-0">
                    <div className="min-w-[160px] rounded-b-xl border border-t-0 border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
                      {item.children.map((c) => (
                        <Link
                          key={c.label + c.to}
                          to={c.to}
                          onClick={() => setHovered(null)}
                          className="block whitespace-nowrap px-6 py-3 text-sm text-neutral-600 transition first:pt-4 last:pb-4 hover:bg-neutral-50 hover:font-semibold hover:text-brand dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-brand"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* 오른쪽 액션 */}
          <div className="flex items-center gap-2">
            {/* 다크/라이트 토글 */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-lg transition hover:border-brand hover:bg-brand/10 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* 햄버거 (모바일) */}
            <button
              type="button"
              aria-label="메뉴 열기"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <span className="h-0.5 w-6 bg-neutral-800 dark:bg-neutral-200" />
              <span className="h-0.5 w-6 bg-neutral-800 dark:bg-neutral-200" />
              <span className="h-0.5 w-6 bg-neutral-800 dark:bg-neutral-200" />
            </button>
          </div>
        </div>

      </nav>

      {/* 모바일 패널 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm overflow-y-auto bg-white p-6 shadow-xl dark:bg-neutral-900">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xl font-extrabold text-brand">{company.name}</span>
              <button
                type="button"
                aria-label="메뉴 닫기"
                className="text-2xl text-neutral-500 dark:text-neutral-400"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.label} className="border-b border-neutral-100 pb-2 dark:border-neutral-800">
                  <Link
                    to={item.to}
                    className="block py-2 text-lg font-bold text-neutral-900 dark:text-neutral-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <ul className="flex flex-col">
                    {item.children.map((c) => (
                      <li key={c.label + c.to}>
                        <Link
                          to={c.to}
                          className="block py-1.5 pl-3 text-sm text-neutral-500 dark:text-neutral-400"
                          onClick={() => setMobileOpen(false)}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            {/* 모바일 다크모드 토글 */}
            <button
              type="button"
              onClick={() => { onToggleTheme(); setMobileOpen(false) }}
              className="mt-4 flex w-full items-center gap-3 rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium dark:border-neutral-700"
            >
              {theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
