import { useParams } from 'react-router-dom'

const content = {
  privacy: {
    title: '개인정보처리방침',
    body: 'ENV-DX는 개인정보보호법에 따라 이용자의 개인정보를 보호하고 관련된 고충을 신속하고 원활하게 처리할 수 있도록 최선을 다하고 있습니다.',
  },
  terms: {
    title: '이용약관',
    body: '본 약관은 ENV-DX가 제공하는 서비스의 이용 조건 및 절차, 기타 필요한 사항을 규정합니다.',
  },
}

export default function SimplePage() {
  const { page = 'privacy' } = useParams()
  const d = content[page] || content.privacy

  return (
    <div className="mx-auto max-w-container px-4 py-24 dark:bg-neutral-950 md:px-10 lg:px-40">
      <h1 className="mb-8 text-3xl font-bold text-neutral-800 dark:text-neutral-100">{d.title}</h1>
      <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300">{d.body}</p>
    </div>
  )
}
