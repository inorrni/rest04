import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import SubPageLayout from '../../components/SubPageLayout'
import { subpageImages } from '../../data/images'
import { getPost, deletePost, boardLabel } from '../../lib/posts'
import { useAuth } from '../../context/AuthContext'
import { boardTabs, fmtDate } from './boardTabs'

export default function BoardDetail() {
  const { category, id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [post, setPost] = useState(null)
  const [status, setStatus] = useState('loading')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let alive = true
    setStatus('loading')
    getPost(id)
      .then((row) => { if (alive) { setPost(row); setStatus('done') } })
      .catch(() => { if (alive) setStatus('error') })
    return () => { alive = false }
  }, [id])

  const isOwner = user && post && user.id === post.author_id

  const handleDelete = async () => {
    if (!window.confirm('이 글을 삭제할까요? 되돌릴 수 없습니다.')) return
    setDeleting(true)
    try {
      await deletePost(id)
      navigate(`/board/${category}`, { replace: true })
    } catch {
      alert('삭제에 실패했습니다.')
      setDeleting(false)
    }
  }

  return (
    <SubPageLayout sectionTitle="게시판" tabs={boardTabs} headLabel="board" imageUrl={subpageImages.contact}>
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
        <div className="mx-auto max-w-3xl">
          {status === 'loading' && <p className="py-16 text-center text-sm text-neutral-400">불러오는 중…</p>}
          {status === 'error' && <p className="py-16 text-center text-sm text-red-500">글을 불러오지 못했습니다.</p>}

          {status === 'done' && post && (
            <article>
              <p className="mb-2 text-sm font-semibold tracking-widest text-brand">{boardLabel(post.category)}</p>
              <h3 className="mb-4 text-3xl font-bold text-neutral-800 dark:text-neutral-100">{post.title}</h3>
              <div className="mb-8 flex items-center gap-3 border-b border-neutral-200 pb-6 text-sm text-neutral-500 dark:border-neutral-800">
                <span>{post.author_name}</span>
                <span className="text-neutral-300">·</span>
                <span>{fmtDate(post.created_at)}</span>
              </div>

              <div className="min-h-[8rem] whitespace-pre-wrap break-words leading-relaxed text-neutral-700 dark:text-neutral-300">
                {post.content}
              </div>

              <div className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
                <Link to={`/board/${category}`} className="text-sm font-medium text-neutral-500 hover:text-brand">← 목록</Link>
                {isOwner && (
                  <div className="flex gap-2">
                    <Link to={`/board/${category}/${id}/edit`}
                      className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-700 transition hover:border-brand hover:text-brand dark:border-neutral-700 dark:text-neutral-300">
                      수정
                    </Link>
                    <button type="button" onClick={handleDelete} disabled={deleting}
                      className="rounded-full border border-red-300 px-5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60">
                      {deleting ? '삭제 중…' : '삭제'}
                    </button>
                  </div>
                )}
              </div>
            </article>
          )}
        </div>
      </div>
    </SubPageLayout>
  )
}
