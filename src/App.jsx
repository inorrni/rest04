import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
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
  )
}
