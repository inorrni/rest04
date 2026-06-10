import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import SubPageLayout from '../../components/SubPageLayout'
import { subpageImages } from '../../data/images'
import { listPosts, boardLabel, BOARDS } from '../../lib/posts'
import { boardTabs, fmtDate } from './boardTabs'

export default function BoardList() {
  const { category } = useParams()
  const valid = BOARDS.some((b) => b.key === category)

  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!valid) return
    let alive = true
    setStatus('loading')
    listPosts(category)
      .then((rows) => { if (alive) { setPosts(rows); setStatus('done') } })
      .catch(() => { if (alive) setStatus('error') })
    return () => { alive = false }
  }, [category, valid])

  if (!valid) return <Navigate to="/board/notice" replace />

  return (
    <SubPageLayout sectionTitle="게시판" tabs={boardTabs} headLabel="board" imageUrl={subpageImages.contact}>
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">{boardLabel(category)}</h3>
            <Link to={`/board/${category}/new`}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110">
              글쓰기
            </Link>
          </div>

          {status === 'loading' && <p className="py-16 text-center text-sm text-neutral-400">불러오는 중…</p>}
          {status === 'error' && <p className="py-16 text-center text-sm text-red-500">목록을 불러오지 못했습니다.</p>}
          {status === 'done' && posts.length === 0 && (
            <p className="py-16 text-center text-sm text-neutral-400">아직 게시글이 없습니다. 첫 글을 작성해보세요.</p>
          )}

          {status === 'done' && posts.length > 0 && (
            <ul className="divide-y divide-neutral-200 border-t border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link to={`/board/${category}/${p.id}`}
                    className="flex items-center justify-between gap-4 py-4 transition hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    <span className="flex-1 truncate font-medium text-neutral-800 dark:text-neutral-100">{p.title}</span>
                    <span className="hidden shrink-0 text-sm text-neutral-500 sm:block">{p.author_name}</span>
                    <span className="shrink-0 text-sm text-neutral-400">{fmtDate(p.created_at)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SubPageLayout>
  )
}
