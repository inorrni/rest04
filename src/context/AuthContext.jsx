import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 최초 진입 시 기존 세션 복원
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    // 로그인/로그아웃/토큰갱신 구독
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const value = {
    session,
    user: session?.user ?? null,
    loading,

    // 이메일 + 비밀번호 회원가입
    signUp: (email, password) =>
      supabase.auth.signUp({ email, password }),

    // 이메일 + 비밀번호 로그인
    signIn: (email, password) =>
      supabase.auth.signInWithPassword({ email, password }),

    // 카카오 OAuth 로그인 — 콜백은 배포 경로(BASE_URL)로 복귀
    signInWithKakao: () =>
      supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
        },
      }),

    signOut: () => supabase.auth.signOut(),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
