import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

type LessonHeroProps = {
  title: string
  description: string
  category: string
  date: string
  readingTime: number
}

export function LessonHero({ title, description, category, date, readingTime }: LessonHeroProps) {
  const formattedDate = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))

  return (
    <header className="border-b border-stone-200 bg-[#f4f4ef]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-9 flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500">
          <Link href="/" className="transition-colors hover:text-emerald-900">Home</Link>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <Link href="/articles" className="transition-colors hover:text-emerald-900">Lessons</Link>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span aria-current="page" className="max-w-[18rem] truncate text-stone-700">{title}</span>
        </nav>

        <div className="max-w-4xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">{category}</p>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-stone-950 sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600 sm:text-xl">{description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-stone-500">
            <span className="rounded-full bg-white px-3 py-1.5 text-stone-700 shadow-sm ring-1 ring-stone-900/[0.06]">Beginner</span>
            <span>{readingTime} min read</span>
            <span aria-hidden="true" className="text-stone-300">&bull;</span>
            <span>Updated <time dateTime={date}>{formattedDate}</time></span>
          </div>
        </div>
      </div>
    </header>
  )
}

export function AdPlaceholder({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-2xl border border-dashed border-stone-300 bg-stone-50/70 text-center ${compact ? 'px-4 py-8' : 'px-5 py-7'}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">Advertisement</p>
      <p className="mt-1.5 text-xs text-stone-400">Reserved for future Google AdSense</p>
    </div>
  )
}

type LessonSidebarProps = {
  headings: string[]
  related: ArticleMeta[]
  previousLesson?: ArticleMeta
  nextLesson?: ArticleMeta
}

export function LessonSidebar({ headings, related, previousLesson, nextLesson }: LessonSidebarProps) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start" aria-label="Lesson resources">
      <section className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_-26px_rgba(28,25,23,0.45)] ring-1 ring-stone-900/[0.06]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">In this lesson</p>
        <ol className="mt-4 space-y-3">
          {headings.length > 0 ? headings.map((heading, index) => (
            <li key={`${heading}-${index}`} className="flex gap-3 text-sm leading-5 text-stone-600">
              <span className="font-medium tabular-nums text-stone-300">{String(index + 1).padStart(2, '0')}</span>
              <span>{heading}</span>
            </li>
          )) : <li className="text-sm text-stone-500">A focused beginner lesson</li>}
        </ol>
      </section>

      {(previousLesson || nextLesson) && (
        <nav aria-label="Beginner course navigation" className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-26px_rgba(28,25,23,0.45)] ring-1 ring-stone-900/[0.06]">
          {previousLesson && (
            <Link href={`/articles/${previousLesson.slug}`} rel="prev" className="group block p-5 transition-colors hover:bg-stone-50">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400"><span aria-hidden="true">&larr;</span> Previous lesson</p>
              <p className="mt-2 text-sm font-semibold leading-5 text-stone-700 transition-colors group-hover:text-emerald-900">{previousLesson.title}</p>
            </Link>
          )}
          {previousLesson && nextLesson && <div className="mx-5 h-px bg-stone-100" />}
          {nextLesson && (
            <Link href={`/articles/${nextLesson.slug}`} rel="next" className="group block bg-emerald-950 p-5 !text-white transition-colors hover:bg-emerald-900">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">Next lesson <span aria-hidden="true">&rarr;</span></p>
              <p className="mt-2 text-sm font-semibold leading-5 text-white">{nextLesson.title}</p>
            </Link>
          )}
        </nav>
      )}

      <section className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_-26px_rgba(28,25,23,0.45)] ring-1 ring-stone-900/[0.06]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">Related lessons</p>
        <div className="mt-4 divide-y divide-stone-100">
          {related.map((item) => (
            <Link key={item.slug} href={`/articles/${item.slug}`} className="group flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <span className="text-sm font-medium leading-5 text-stone-700 transition-colors group-hover:text-emerald-900">{item.title}</span>
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-stone-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-800">&rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <AdPlaceholder compact />
    </aside>
  )
}
