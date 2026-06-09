import { useState, useMemo } from 'react'
import { videos, videoCategories, VIDEOS_PER_PAGE } from '../data/videos'

function VideoCard({ video }) {
  const isPlaceholder = video.youtubeId.startsWith('placeholder')

  return (
    <article className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800">
      {/* embed 영역 16:9 */}
      <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-700">
        {isPlaceholder ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand/20 to-eco/10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 pl-1 text-xl text-white/70">
              ▶
            </div>
            <p className="text-sm font-medium text-neutral-400 dark:text-neutral-500">영상 준비 중</p>
          </div>
        ) : (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            loading="lazy"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* 정보 */}
      <div className="p-4">
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-neutral-800 dark:text-neutral-100">
          {video.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-5 text-neutral-500 dark:text-neutral-400">
          {video.description}
        </p>
      </div>
    </article>
  )
}

export default function Videos() {
  const [activeCat, setActiveCat] = useState(videoCategories[0].id)
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () => videos.filter((v) => v.category === activeCat),
    [activeCat]
  )
  const totalPages = Math.ceil(filtered.length / VIDEOS_PER_PAGE)
  const paged = useMemo(() => {
    const start = (page - 1) * VIDEOS_PER_PAGE
    return filtered.slice(start, start + VIDEOS_PER_PAGE)
  }, [filtered, page])

  const handleCat = (id) => { setActiveCat(id); setPage(1) }

  return (
    <div>
      {/* 헤더 탭 — SubPageLayout 스타일 */}
      <div className="sticky top-20 z-30 bg-white shadow-sm dark:bg-neutral-900 dark:shadow-neutral-800">
        <div className="mx-auto max-w-container px-4 pt-12 md:px-10 lg:px-20">
          <div className="flex flex-col-reverse justify-between md:flex-row">
            <h2 className="mb-6 text-4xl font-bold leading-none text-stone-500 dark:text-neutral-400 md:mb-12 md:text-5xl">
              동영상
            </h2>
            <p className="mb-4 text-sm font-medium text-zinc-500 dark:text-neutral-500 md:mb-0">
              홈<span className="ml-3 border-l border-zinc-300 pl-3 dark:border-neutral-700">동영상</span>
            </p>
          </div>

          <ul className="flex w-full justify-around overflow-x-auto font-bold" role="tablist">
            {videoCategories.map((cat) => (
              <li key={cat.id} className="shrink-0">
                <button
                  role="tab"
                  aria-selected={activeCat === cat.id}
                  onClick={() => handleCat(cat.id)}
                  className={[
                    'block whitespace-nowrap border-b-2 px-4 py-5 transition md:px-10 md:py-7',
                    activeCat === cat.id
                      ? 'border-brand text-brand'
                      : 'border-transparent text-neutral-700 hover:text-brand dark:text-neutral-300 dark:hover:text-brand',
                  ].join(' ')}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 그리드 + 페이지네이션 */}
      <div className="border-b border-neutral-200 py-16 dark:border-neutral-800 md:py-24">
        <div className="mx-auto max-w-container px-4 md:px-10 lg:px-20">
          {/* 2열×3행 = 6개/페이지 */}
          <div
            className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            role="tabpanel"
          >
            {paged.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2" aria-label="동영상 페이지">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="flex h-9 w-9 items-center justify-center rounded border border-neutral-200 text-sm text-neutral-600 transition hover:border-brand hover:text-brand disabled:opacity-30 dark:border-neutral-700 dark:text-neutral-400"
                aria-label="이전 페이지"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  aria-current={p === page ? 'page' : undefined}
                  className={[
                    'flex h-9 w-9 items-center justify-center rounded border text-sm font-medium transition',
                    p === page
                      ? 'border-brand bg-brand text-white'
                      : 'border-neutral-200 text-neutral-600 hover:border-brand hover:text-brand dark:border-neutral-700 dark:text-neutral-400',
                  ].join(' ')}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded border border-neutral-200 text-sm text-neutral-600 transition hover:border-brand hover:text-brand disabled:opacity-30 dark:border-neutral-700 dark:text-neutral-400"
                aria-label="다음 페이지"
              >
                ›
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}
