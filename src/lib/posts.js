import { supabase } from './supabase'

// 공유 Supabase 프로젝트에서 테이블 충돌을 피하기 위한 접두어
const TABLE = 'rest04_posts'

// 게시판 카테고리 정의 (UI·검증 공용)
export const BOARDS = [
  { key: 'notice', label: '공지사항' },
  { key: 'free',   label: '자유게시판' },
  { key: 'qna',    label: 'Q&A' },
]

export const boardLabel = (key) =>
  BOARDS.find((b) => b.key === key)?.label ?? key

// 목록 — 카테고리별(또는 전체) 최신순
export async function listPosts(category) {
  let query = supabase
    .from(TABLE)
    .select('id, category, title, author_name, created_at')
    .order('created_at', { ascending: false })

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  if (error) throw error
  return data
}

// 단건 상세
export async function getPost(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

// 작성 — author_id 는 RLS·DB default(auth.uid())로 채워지지만 명시도 함께
export async function createPost({ category, title, content, authorId, authorName }) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([{ category, title, content, author_id: authorId, author_name: authorName }])
    .select('id')
    .single()
  if (error) throw error
  return data
}

// 수정 — 본인 글만 (RLS가 강제)
export async function updatePost(id, { title, content, category }) {
  const { error } = await supabase
    .from(TABLE)
    .update({ title, content, category })
    .eq('id', id)
  if (error) throw error
}

// 삭제 — 본인 글만 (RLS가 강제)
export async function deletePost(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}
