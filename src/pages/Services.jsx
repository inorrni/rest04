import { useParams, Navigate } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { serviceDetail } from '../data/site'
import { subpageImages } from '../data/images'

const tabs = [
  { label: '폐기물 DX',        to: '/services/waste-dx',    end: true },
  { label: '수질·대기 모니터링', to: '/services/monitor'              },
  { label: '법정 문서 자동화',  to: '/services/legal-doc'            },
  { label: 'AI 환경 분석',     to: '/services/ai-analysis'          },
]

function ServiceContent({ category }) {
  const d = serviceDetail[category]
  if (!d) return null

  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <p className="mb-3 text-sm font-semibold tracking-widest text-brand">SERVICE</p>
      <h3 className="mb-4 text-3xl font-bold text-neutral-800 dark:text-neutral-100 md:text-4xl">{d.title}</h3>
      <p className="mb-10 text-lg font-medium text-brand">{d.summary}</p>

      <div className="mb-12 flex flex-col gap-5">
        {d.body.map((p, i) => (
          <p key={i} className="text-base leading-8 text-neutral-600 dark:text-neutral-300">{p}</p>
        ))}
      </div>

      <div>
        <p className="mb-4 text-sm font-semibold tracking-widest text-neutral-500 dark:text-neutral-400">KEY FEATURES</p>
        <ul className="flex flex-wrap gap-3">
          {d.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full bg-brand/10 px-5 py-2.5 text-sm font-semibold text-brand"
            >
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Services() {
  const { category = 'waste-dx' } = useParams()
  if (!serviceDetail[category]) return <Navigate to="/services/waste-dx" replace />

  return (
    <SubPageLayout sectionTitle="사업소개" tabs={tabs} headLabel={category} imageUrl={subpageImages[category]}>
      <ServiceContent category={category} />
    </SubPageLayout>
  )
}
