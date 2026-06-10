import { BOARDS } from '../../lib/posts'

// SubPageLayout 용 탭 — 게시판 카테고리 공용
export const boardTabs = BOARDS.map((b) => ({
  label: b.label,
  to: `/board/${b.key}`,
  end: false,
}))

export const fmtDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`
}
