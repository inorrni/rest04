import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// 로그인 안 된 사용자는 /login 으로 보낸다. (게시판은 읽기도 회원 전용)
export default function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-neutral-400">불러오는 중…</p>
      </div>
    )
  }

  if (!user) {
    // 로그인 후 원래 가려던 곳으로 복귀시키기 위해 from 전달
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
