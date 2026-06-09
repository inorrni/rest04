import { useParams, Navigate } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { aboutContent } from '../data/site'
import { subpageImages } from '../data/images'

const tabs = [
  { label: 'CEO 인사말',  to: '/about/greeting', end: true },
  { label: '비전/가치',   to: '/about/vision'   },
  { label: '연혁',        to: '/about/history'  },
  { label: '브랜드 소개', to: '/about/brand'    },
]

function Greeting() {
  const d = aboutContent.greeting
  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <div className="flex flex-col gap-12 md:flex-row">
        <div className="mx-auto h-64 w-64 shrink-0 overflow-hidden rounded-2xl bg-neutral-200 dark:bg-neutral-700 md:h-80 md:w-80" />
        <div>
          <p className="mb-2 text-sm font-semibold tracking-widest text-brand">GREETING</p>
          <h3 className="mb-8 text-3xl font-bold text-neutral-800 dark:text-neutral-100 md:text-4xl">{d.title}</h3>
          {d.message.map((p, i) => (
            <p key={i} className="mb-5 text-base leading-8 text-neutral-600 dark:text-neutral-300">{p}</p>
          ))}
          <p className="mt-8 text-right text-lg font-bold text-neutral-700 dark:text-neutral-200">{d.ceo}</p>
        </div>
      </div>
    </div>
  )
}

function Vision() {
  const d = aboutContent.vision
  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <div className="mb-16 text-center">
        <p className="mb-3 text-sm font-semibold tracking-widest text-brand">VISION</p>
        <h3 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 md:text-4xl">{d.visionStatement}</h3>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {d.values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-neutral-200 p-8 dark:border-neutral-700">
            <h4 className="mb-3 text-xl font-bold text-brand">{v.title}</h4>
            <p className="leading-7 text-neutral-600 dark:text-neutral-300">{v.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function History() {
  const d = aboutContent.history
  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <p className="mb-12 text-sm font-semibold tracking-widest text-brand">HISTORY</p>
      <div className="relative border-l-2 border-brand/30 pl-8">
        {d.items.map((item) => (
          <div key={item.year} className="mb-12 last:mb-0">
            <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full bg-brand" />
            <p className="mb-3 text-2xl font-extrabold text-brand">{item.year}</p>
            <ul className="flex flex-col gap-2">
              {item.events.map((ev) => (
                <li key={ev} className="text-base leading-7 text-neutral-600 dark:text-neutral-300">
                  — {ev}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function Brand() {
  const d = aboutContent.brand
  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <p className="mb-3 text-sm font-semibold tracking-widest text-brand">BRAND</p>
      <h3 className="mb-8 text-3xl font-bold text-neutral-800 dark:text-neutral-100 md:text-4xl">{d.title}</h3>
      <p className="mb-12 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">{d.concept}</p>
      <div className="flex flex-wrap gap-4">
        {d.colors.map((c) => (
          <div key={c.name} className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-700">
            <p className="mb-1 font-bold text-neutral-800 dark:text-neutral-100">{c.name}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const contentMap = { greeting: Greeting, vision: Vision, history: History, brand: Brand }

export default function About() {
  const { tab = 'greeting' } = useParams()
  if (!aboutContent[tab]) return <Navigate to="/about/greeting" replace />
  const Content = contentMap[tab] || Greeting

  return (
    <SubPageLayout sectionTitle="회사소개" tabs={tabs} headLabel={tab} imageUrl={subpageImages[tab]}>
      <Content />
    </SubPageLayout>
  )
}
