import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { nav, company } from '../data/site'
import { useAuth } from '../context/AuthContext'

const IconLeaf = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 8 0 0-2-2-5-2z"/>
  </svg>
)

const IconMoon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
)

const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

export default function Header({ theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    setMobileOpen(false)
    navigate('/')
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="bg-white dark:bg-neutral-900">
        <div className="mx-auto flex h-20 max-w-container items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-800 md:px-10 lg:px-20">
          {/* 로고 */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-brand"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-eco text-white">
              <IconLeaf />
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

            {/* 게시판 (드롭다운 없음, 회원 전용) */}
            <li className="flex items-center">
              <NavLink
                to="/board"
                className={({ isActive }) =>
                  [
                    'px-7 py-7 text-lg font-semibold transition-colors',
                    isActive
                      ? 'text-brand'
                      : 'text-neutral-800 hover:text-brand dark:text-neutral-200 dark:hover:text-brand',
                  ].join(' ')
                }
              >
                게시판
              </NavLink>
            </li>
          </ul>

          {/* 오른쪽 액션 */}
          <div className="flex items-center gap-2">
            {/* 로그인 / 로그아웃 (데스크탑) */}
            {user ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="hidden rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:border-brand hover:text-brand dark:border-neutral-700 dark:text-neutral-200 lg:block"
              >
                로그아웃
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition hover:brightness-110 lg:block"
              >
                로그인
              </Link>
            )}

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 transition hover:border-brand hover:bg-brand/10 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            >
              {theme === 'light' ? <IconMoon /> : <IconSun />}
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
                className="text-neutral-500 dark:text-neutral-400"
                onClick={() => setMobileOpen(false)}
              >
                <IconClose />
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
              {/* 게시판 (모바일) */}
              <li className="border-b border-neutral-100 pb-2 dark:border-neutral-800">
                <Link
                  to="/board"
                  className="block py-2 text-lg font-bold text-neutral-900 dark:text-neutral-100"
                  onClick={() => setMobileOpen(false)}
                >
                  게시판
                </Link>
              </li>
            </ul>

            {/* 로그인 / 로그아웃 (모바일) */}
            {user ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="mt-4 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 dark:border-neutral-700 dark:text-neutral-200"
              >
                로그아웃
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-4 block rounded-lg bg-brand px-4 py-3 text-center text-sm font-bold text-white"
              >
                로그인
              </Link>
            )}

            <button
              type="button"
              onClick={() => { onToggleTheme(); setMobileOpen(false) }}
              className="mt-4 flex w-full items-center gap-3 rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium dark:border-neutral-700"
            >
              {theme === 'light' ? <><IconMoon /><span>다크 모드</span></> : <><IconSun /><span>라이트 모드</span></>}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
