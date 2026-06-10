import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SubPageLayout from '../../components/SubPageLayout'
import { subpageImages } from '../../data/images'
import { createPost, updatePost, getPost, BOARDS } from '../../lib/posts'
import { useAuth } from '../../context/AuthContext'
import { boardTabs } from './boardTabs'

const inputCls = 'w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100'

// 표시 이름: 카카오 닉네임 > 이메일 아이디
function displayName(user) {
  return (
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    '익명'
  )
}

export default function BoardWrite({ edit = false }) {
  const { category, id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [cat, setCat] = useState(category)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  // 수정 모드: 기존 글 로드 + 본인 글 가드
  useEffect(() => {
    if (!edit) return
    getPost(id)
      .then((row) => {
        if (user && row.author_id !== user.id) {
          alert('본인 글만 수정할 수 있습니다.')
          navigate(`/board/${category}/${id}`, { replace: true })
          return
        }
        setCat(row.category); setTitle(row.title); setContent(row.content)
      })
      .catch(() => setError('글을 불러오지 못했습니다.'))
  }, [edit, id, user, category, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      setStatus('error'); setError('제목과 내용을 모두 입력해주세요.'); return
    }
    setStatus('sending'); setError('')
    try {
      if (edit) {
        await updatePost(id, { title: title.trim(), content: content.trim(), category: cat })
        navigate(`/board/${cat}/${id}`, { replace: true })
      } else {
        const { id: newId } = await createPost({
          category: cat,
          title: title.trim(),
          content: content.trim(),
          authorId: user.id,
          authorName: displayName(user),
        })
        navigate(`/board/${cat}/${newId}`, { replace: true })
      }
    } catch (err) {
      setStatus('error'); setError(err?.message || '저장에 실패했습니다.')
    }
  }

  return (
    <SubPageLayout sectionTitle="게시판" tabs={boardTabs} headLabel="board" imageUrl={subpageImages.contact}>
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-8 text-3xl font-bold text-neutral-800 dark:text-neutral-100">
            {edit ? '글 수정' : '글쓰기'}
          </h3>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300" htmlFor="cat">게시판</label>
              <select id="cat" className={inputCls + ' appearance-none'} value={cat} onChange={(e) => setCat(e.target.value)}>
                {BOARDS.map((b) => <option key={b.key} value={b.key}>{b.label}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300" htmlFor="title">제목</label>
              <input id="title" type="text" className={inputCls} placeholder="제목을 입력하세요"
                value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300" htmlFor="content">내용</label>
              <textarea id="content" rows={12} className={inputCls + ' resize-y'} placeholder="내용을 입력하세요"
                value={content} onChange={(e) => setContent(e.target.value)} />
            </div>

            {status === 'error' && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>
            )}

            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={() => navigate(-1)}
                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300">
                취소
              </button>
              <button type="submit" disabled={status === 'sending'}
                className="rounded-full bg-brand px-8 py-3 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-60">
                {status === 'sending' ? '저장 중…' : edit ? '수정 완료' : '등록'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </SubPageLayout>
  )
}
