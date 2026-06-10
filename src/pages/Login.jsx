import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { subpageImages } from '../data/images'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/supabase'

const tabs = [{ label: '로그인', to: '/login', end: true }]

const inputCls = 'w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'

const IconKakao = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.77 1.86 5.2 4.65 6.58-.2.7-.73 2.6-.84 3-.13.5.18.49.39.36.16-.11 2.6-1.77 3.66-2.5.71.1 1.44.16 2.14.16 5.52 0 10-3.48 10-7.8S17.52 3 12 3z"/>
  </svg>
)

function AuthForm() {
  const { signIn, signUp, signInWithKakao } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/board'

  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      setStatus('error'); setMessage('이메일과 비밀번호를 입력해주세요.'); return
    }
    if (password.length < 6) {
      setStatus('error'); setMessage('비밀번호는 6자 이상이어야 합니다.'); return
    }
    setStatus('sending'); setMessage('')
    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password)
        if (error) throw error
        navigate(redirectTo, { replace: true })
      } else {
        const { data, error } = await signUp(email, password)
        if (error) throw error
        // 이메일 인증이 켜져 있으면 세션이 바로 안 생긴다.
        if (data.session) {
          navigate(redirectTo, { replace: true })
        } else {
          setStatus('success')
          setMessage('가입 확인 메일을 보냈습니다. 메일의 링크를 누른 뒤 로그인해주세요.')
        }
      }
    } catch (err) {
      setStatus('error')
      setMessage(translateError(err?.message))
    }
  }

  const handleKakao = async () => {
    setStatus('sending'); setMessage('')
    const { error } = await signInWithKakao()
    if (error) { setStatus('error'); setMessage(translateError(error.message)) }
    // 성공 시 카카오로 리다이렉트되므로 이후 코드는 실행되지 않음
  }

  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <div className="mx-auto max-w-md">
        <p className="mb-3 text-sm font-semibold tracking-widest text-brand">MEMBER</p>
        <h3 className="mb-8 text-3xl font-bold text-neutral-800 dark:text-neutral-100 md:text-4xl">
          {mode === 'login' ? '로그인' : '회원가입'}
        </h3>

        {!isSupabaseConfigured && (
          <p className="mb-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Supabase 환경변수가 설정되지 않아 로그인이 동작하지 않습니다. (.env.local 확인)
          </p>
        )}

        {/* 카카오 로그인 */}
        <button
          type="button"
          onClick={handleKakao}
          disabled={status === 'sending'}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500] px-4 py-3.5 font-bold text-[#191600] transition hover:brightness-95 disabled:opacity-60"
        >
          <IconKakao /> 카카오로 시작하기
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-neutral-400">
          <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
          또는 이메일로
          <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300" htmlFor="email">이메일</label>
            <input id="email" type="email" autoComplete="email" className={inputCls}
              placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300" htmlFor="password">비밀번호</label>
            <input id="password" type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              className={inputCls} placeholder="6자 이상"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" disabled={status === 'sending'}
            className="mt-2 rounded-full bg-brand px-8 py-4 font-bold text-white transition hover:brightness-110 disabled:opacity-60">
            {status === 'sending' ? '처리 중…' : mode === 'login' ? '로그인' : '회원가입'}
          </button>

          <div aria-live="polite">
            {status === 'error' && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{message}</p>
            )}
            {status === 'success' && (
              <p className="rounded-lg bg-eco/10 px-4 py-3 text-sm font-medium text-eco">{message}</p>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          {mode === 'login' ? '계정이 없으신가요? ' : '이미 계정이 있으신가요? '}
          <button type="button"
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setStatus('idle'); setMessage('') }}
            className="font-bold text-brand hover:underline">
            {mode === 'login' ? '회원가입' : '로그인'}
          </button>
        </p>
      </div>
    </div>
  )
}

function translateError(msg = '') {
  if (/Invalid login credentials/i.test(msg)) return '이메일 또는 비밀번호가 올바르지 않습니다.'
  if (/already registered|already exists/i.test(msg)) return '이미 가입된 이메일입니다.'
  if (/Email not confirmed/i.test(msg)) return '이메일 인증이 완료되지 않았습니다. 메일을 확인해주세요.'
  return msg || '오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
}

export default function Login() {
  return (
    <SubPageLayout sectionTitle="회원" tabs={tabs} headLabel="member" imageUrl={subpageImages.contact}>
      <AuthForm />
    </SubPageLayout>
  )
}
