import { NavLink } from 'react-router-dom'

export default function SubPageLayout({ sectionTitle, tabs, headLabel, imageUrl, children }) {
  return (
    <div>
      {/* sticky 탭 네비 */}
      <div className="sticky top-20 z-30 bg-white shadow-sm dark:bg-neutral-900 dark:shadow-neutral-800">
        <div className="mx-auto max-w-container px-4 pt-12 md:px-10 lg:px-20">
          <div className="flex flex-col-reverse justify-between md:flex-row">
            <h2 className="mb-6 text-4xl font-bold leading-none text-stone-500 dark:text-neutral-400 md:mb-12 md:text-5xl">
              {sectionTitle}
            </h2>
            <p className="mb-4 text-sm font-medium text-zinc-500 dark:text-neutral-500 md:mb-0">
              홈<span className="ml-3 border-l border-zinc-300 pl-3 dark:border-neutral-700">{sectionTitle}</span>
            </p>
          </div>

          <ul className="flex w-full justify-around overflow-x-auto font-bold">
            {tabs.map((t) => (
              <li key={t.to + t.label} className="shrink-0">
                <NavLink
                  to={t.to}
                  end={t.end}
                  className={({ isActive }) =>
                    [
                      'block whitespace-nowrap border-b-2 px-4 py-5 transition md:px-10 md:py-7',
                      isActive
                        ? 'border-brand text-brand'
                        : 'border-transparent text-neutral-700 hover:text-brand dark:text-neutral-300 dark:hover:text-brand',
                    ].join(' ')
                  }
                >
                  {t.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 페이지 헤드 이미지 */}
      <div className="aspect-[32/9] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      {/* 본문 */}
      <div className="border-b border-neutral-200 py-16 dark:border-neutral-800 md:py-24">
        {children}
      </div>
    </div>
  )
}
