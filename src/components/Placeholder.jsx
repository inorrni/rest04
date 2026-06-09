// 이미지 자리 표시자 — 실제 이미지로 교체 시 <img> 또는 배경 이미지로 대체
export default function Placeholder({ label = '', ratio = '16/9', className = '', dark = false }) {
  const ratioMap = { '16/9': '56.25%', '32/9': '28.125%', '16/5': '31.25%', '4/3': '75%', '1/1': '100%' }
  const pad = ratio === 'auto' ? undefined : (ratioMap[ratio] ?? '56.25%')

  return (
    <div
      className={`relative w-full overflow-hidden ${dark ? 'bg-neutral-700' : 'bg-neutral-200 dark:bg-neutral-700'} ${className}`}
      style={pad ? { paddingBottom: pad } : { height: '100%' }}
    >
      <div className={`absolute inset-0 flex items-center justify-center text-sm font-medium tracking-widest ${dark ? 'text-neutral-500' : 'text-neutral-400 dark:text-neutral-500'}`}>
        {label}
      </div>
    </div>
  )
}
