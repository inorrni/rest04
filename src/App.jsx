import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RequireAuth from './components/RequireAuth'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Videos from './pages/Videos'
import Contact from './pages/Contact'
import SimplePage from './pages/SimplePage'
import Login from './pages/Login'
import BoardList from './pages/board/BoardList'
import BoardDetail from './pages/board/BoardDetail'
import BoardWrite from './pages/board/BoardWrite'

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme')
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
          <ScrollToTop />
          <Header theme={theme} onToggleTheme={toggleTheme} />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about/:tab" element={<About />} />
              <Route path="/about" element={<Navigate to="/about/greeting" replace />} />
              <Route path="/services/:category" element={<Services />} />
              <Route path="/services" element={<Navigate to="/services/waste-dx" replace />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<SimplePage />} />
              <Route path="/terms" element={<SimplePage />} />

              {/* 로그인 (공개) */}
              <Route path="/login" element={<Login />} />

              {/* 게시판 — 회원 전용 (읽기·쓰기 모두 로그인 필요) */}
              <Route path="/board" element={<Navigate to="/board/notice" replace />} />
              <Route path="/board/:category" element={<RequireAuth><BoardList /></RequireAuth>} />
              <Route path="/board/:category/new" element={<RequireAuth><BoardWrite /></RequireAuth>} />
              <Route path="/board/:category/:id" element={<RequireAuth><BoardDetail /></RequireAuth>} />
              <Route path="/board/:category/:id/edit" element={<RequireAuth><BoardWrite edit /></RequireAuth>} />

              <Route path="*" element={
                <div className="flex min-h-[60vh] items-center justify-center">
                  <p className="text-2xl font-bold text-neutral-400">페이지를 찾을 수 없습니다.</p>
                </div>
              } />
            </Routes>
          </main>

          <Footer />
          <ScrollToTopButton />
        </div>
      </HashRouter>
    </AuthProvider>
  )
}
