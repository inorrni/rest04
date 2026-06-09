import { useState } from 'react'
import SubPageLayout from '../components/SubPageLayout'
import { inquiryTypes } from '../data/site'
import { submitInquiry } from '../lib/inquiries'
import { subpageImages } from '../data/images'

const tabs = [{ label: '도입 문의', to: '/contact', end: true }]

const INIT = { name: '', email: '', company: '', inquiryType: '', message: '' }

function validate(f) {
  const e = {}
  if (!f.name.trim()) e.name = '이름을 입력해주세요.'
  if (!f.email.trim()) e.email = '이메일을 입력해주세요.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = '올바른 이메일 형식이 아닙니다.'
  if (!f.inquiryType) e.inquiryType = '문의 유형을 선택해주세요.'
  if (!f.message.trim()) e.message = '문의 내용을 입력해주세요.'
  else if (f.message.trim().length < 10) e.message = '10자 이상 입력해주세요.'
  return e
}

const inputCls = 'w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'

function ContactForm() {
  const [fields, setFields] = useState(INIT)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setFields((prev) => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('sending')
    try {
      await submitInquiry(fields)
      setStatus('success')
      setFields(INIT)
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-sm font-semibold tracking-widest text-brand">CONTACT</p>
        <h3 className="mb-10 text-3xl font-bold text-neutral-800 dark:text-neutral-100 md:text-4xl">도입을 검토 중이신가요?</h3>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300" htmlFor="name">
                이름 <span className="text-red-500">*</span>
              </label>
              <input id="name" type="text" className={inputCls} placeholder="홍길동"
                value={fields.name} onChange={set('name')} aria-invalid={!!errors.name} />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300" htmlFor="email">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input id="email" type="email" className={inputCls} placeholder="example@company.kr"
                value={fields.email} onChange={set('email')} aria-invalid={!!errors.email} />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300" htmlFor="company">
              회사명 <span className="text-xs font-normal text-neutral-400">(선택)</span>
            </label>
            <input id="company" type="text" className={inputCls} placeholder="(주)지오환경"
              value={fields.company} onChange={set('company')} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300" htmlFor="inquiryType">
              문의 유형 <span className="text-red-500">*</span>
            </label>
            <select id="inquiryType" className={inputCls + ' appearance-none'}
              value={fields.inquiryType} onChange={set('inquiryType')} aria-invalid={!!errors.inquiryType}>
              {inquiryTypes.map((t) => (
                <option key={t.value} value={t.value} disabled={!t.value}>{t.label}</option>
              ))}
            </select>
            {errors.inquiryType && <p className="text-xs text-red-500">{errors.inquiryType}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300" htmlFor="message">
              문의 내용 <span className="text-red-500">*</span>
            </label>
            <textarea id="message" rows={6} className={inputCls + ' resize-y'}
              placeholder="도입 환경, 규모, 원하시는 기능 등을 자유롭게 적어주세요."
              value={fields.message} onChange={set('message')} aria-invalid={!!errors.message} />
            {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-full bg-brand px-8 py-4 font-bold text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {status === 'sending' ? '전송 중...' : '문의 보내기 →'}
          </button>

          <div aria-live="polite">
            {status === 'success' && (
              <p className="rounded-lg bg-eco/10 px-4 py-3 text-sm font-medium text-eco">
                ✓ 문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.
              </p>
            )}
            {status === 'error' && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                전송에 실패했습니다. 잠시 후 다시 시도해주세요.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <SubPageLayout sectionTitle="문의" tabs={tabs} headLabel="contact" imageUrl={subpageImages.contact}>
      <ContactForm />
    </SubPageLayout>
  )
}
