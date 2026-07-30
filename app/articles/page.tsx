import Link from 'next/link'
import { Metadata } from 'next'
import { getAllArticles, type ArticleMeta } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Weiqi Learning Library',
  description:
    'Browse the structured Weiqi Studio learning library with beginner lessons, rules, strategy, life and death, study guides, and resources.',
  alternates: {
    canonical: '/articles',
  },
  openGraph: {
    title: 'Weiqi Learning Library',
    description:
      'Browse the structured Weiqi Studio learning library with beginner lessons, rules, strategy, life and death, study guides, and resources.',
    url: '/articles',
  },
  twitter: {
    title: 'Weiqi Learning Library',
    description:
      'Browse the structured Weiqi Studio learning library with beginner lessons, rules, strategy, life and death, study guides, and resources.',
  },
}

const beginnerGuideSlug = 'beginner-guide-to-weiqi'

const beginnerCourse = [
  'what-is-weiqi',
  'weiqi-board-and-stones',
  'liberties-in-weiqi',
  'how-capturing-works-in-weiqi',
  'what-is-atari-in-weiqi',
  'eyes-in-weiqi',
  'territory-in-weiqi',
  'scoring-in-weiqi',
  'play-your-first-game',
]

const librarySections = [
  {
    id: 'rules',
    kicker: 'Rules',
    title: 'Understand how the game works',
    description:
      'Learn the rule details beginners meet after the core course, from board sizes and komi to scoring systems and handicap games.',
    slugs: [
      'what-is-komi-in-weiqi',
      '9x9-vs-13x13-vs-19x19-weiqi-boards',
      'chinese-rules-vs-japanese-rules',
      'what-are-handicap-games-in-weiqi',
      'ko-rule-explained-in-weiqi',
    ],
  },
  {
    id: 'strategy',
    kicker: 'Strategy',
    title: 'Make better beginner decisions',
    description:
      'Move from knowing the rules to choosing useful moves: openings, initiative, territory, influence, thickness, and common mistakes.',
    slugs: [
      'where-to-play-first-move-in-weiqi',
      'why-start-in-the-corners-in-weiqi',
      'what-are-sente-and-gote-in-weiqi',
      'when-should-you-tenuki-in-weiqi',
      'what-is-influence-in-weiqi',
      'thickness-vs-territory-in-weiqi',
      'common-beginner-mistakes-in-weiqi',
      'beginner-weiqi-mistakes',
    ],
  },
  {
    id: 'life-and-death',
    kicker: 'Life & Death',
    title: 'Keep your groups alive',
    description:
      'Build the pattern recognition beginners need to understand eyes, weak groups, dead groups, and simple life-and-death practice.',
    slugs: [
      'how-to-know-if-a-group-is-alive-in-weiqi',
      'what-is-a-false-eye-in-weiqi',
      'when-is-a-group-dead-in-weiqi',
      'how-to-save-a-weak-group-in-weiqi',
      'should-beginners-solve-tsumego',
    ],
  },
  {
    id: 'improvement',
    kicker: 'Improvement',
    title: 'Study, review, and improve steadily',
    description:
      'Use simple routines to play more thoughtfully, review your games, stay consistent, and understand what realistic progress feels like.',
    slugs: [
      'how-to-study-weiqi-effectively',
      'how-often-should-you-play-weiqi',
      'how-to-review-your-weiqi-games',
      'how-to-improve-at-weiqi',
      'how-long-does-it-take-to-learn-weiqi',
    ],
  },
  {
    id: 'resources',
    kicker: 'Resources',
    title: 'Choose tools, references, and next steps',
    description:
      'Find places to play, beginner-friendly apps and books, useful terminology, rankings, and comparisons with related strategy games.',
    slugs: [
      'best-online-places-to-play-weiqi',
      'best-weiqi-apps-for-beginners',
      'best-weiqi-books-for-beginners',
      'weiqi-terms-glossary',
      'weiqi-ranking-system-explained',
      'go-vs-weiqi-vs-baduk',
      'weiqi-vs-chess',
    ],
  },
]

function getArticleMap(articles: ArticleMeta[]) {
  return new Map(articles.map((article) => [article.slug, article]))
}

function getArticlesBySlug(articleMap: Map<string, ArticleMeta>, slugs: string[]) {
  return slugs
    .map((slug) => articleMap.get(slug))
    .filter((article): article is ArticleMeta => Boolean(article))
}

function LibraryArticleLink({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex items-start justify-between gap-4 rounded-2xl border border-stone-200/80 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-900/20 hover:shadow-[0_18px_45px_-34px_rgba(20,83,45,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
    >
      <span>
        <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
          {article.category}
        </span>
        <span className="block text-sm font-semibold leading-5 tracking-[-0.015em] text-stone-950">
          {article.title}
        </span>
        <span className="mt-1.5 block text-xs leading-5 text-stone-500">
          {article.description}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="mt-1 shrink-0 text-stone-300 transition duration-300 group-hover:translate-x-0.5 group-hover:text-emerald-900"
      >
        &rarr;
      </span>
    </Link>
  )
}

function CourseLesson({ article, index }: { article: ArticleMeta; index: number }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group grid grid-cols-[2.25rem_1fr_auto] items-start gap-3 rounded-2xl border border-stone-200/80 bg-white px-4 py-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-900/20 hover:shadow-[0_16px_38px_-32px_rgba(20,83,45,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
    >
      <span className="font-mono text-xs font-semibold text-stone-400">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span>
        <span className="block text-sm font-semibold leading-5 text-stone-950">{article.title}</span>
        <span className="mt-1 block text-xs text-stone-500">Beginner course lesson</span>
      </span>
      <span
        aria-hidden="true"
        className="text-stone-300 transition duration-300 group-hover:translate-x-0.5 group-hover:text-emerald-900"
      >
        &rarr;
      </span>
    </Link>
  )
}

export default async function ArticlesPage() {
  const articles = await getAllArticles()
  const articleMap = getArticleMap(articles)
  const beginnerGuide = articleMap.get(beginnerGuideSlug)
  const courseArticles = getArticlesBySlug(articleMap, beginnerCourse)
  const sectionIds = librarySections.flatMap((section) => section.slugs)
  const shownSlugs = new Set([beginnerGuideSlug, ...beginnerCourse, ...sectionIds])
  const remainingArticles = articles.filter((article) => !shownSlugs.has(article.slug))

  return (
    <div className="bg-[#fafaf8]">
      <section className="relative isolate overflow-hidden border-b border-stone-200 bg-[#f4f4ef]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:radial-gradient(#14532d_0.7px,transparent_0.7px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        />

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.55fr)] lg:items-end">
            <div className="max-w-4xl">
              <p className="mb-5 inline-flex rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900 shadow-sm">
                Learning Library
              </p>
              <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-stone-950 sm:text-6xl">
                Learn Weiqi in a clear order.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
                Start with the complete beginner guide, follow the core course, then explore rules, strategy,
                life and death, study habits, and resources at your own pace.
              </p>
            </div>

            {beginnerGuide && (
              <Link
                href={`/articles/${beginnerGuide.slug}`}
                className="group rounded-[2rem] bg-emerald-950 p-6 text-white shadow-[0_26px_80px_-44px_rgba(6,78,59,0.85)] transition duration-300 hover:-translate-y-1 hover:bg-[#0d3022] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  Start here
                </span>
                <span className="mt-4 block text-2xl font-semibold leading-tight tracking-[-0.03em]">
                  {beginnerGuide.title}
                </span>
                <span className="mt-3 block text-sm leading-6 text-emerald-50/80">
                  {beginnerGuide.description}
                </span>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-950 transition duration-300 group-hover:translate-x-0.5">
                  Start learning <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            )}
          </div>

          <nav
            aria-label="Learning library sections"
            className="mt-10 flex gap-2 overflow-x-auto pb-1 text-sm font-semibold text-stone-600"
          >
            <a className="shrink-0 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-stone-900/[0.06] transition hover:text-emerald-900" href="#beginner-course">
              Beginner Course
            </a>
            {librarySections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="shrink-0 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-stone-900/[0.06] transition hover:text-emerald-900"
              >
                {section.kicker}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section id="beginner-course" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
              Beginner Course
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-stone-950">
              The nine lessons every new player should learn first.
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              This is the linear foundation. Read these in order if the board still feels unfamiliar.
            </p>
          </div>

          <ol className="grid gap-3 md:grid-cols-2">
            {courseArticles.map((article, index) => (
              <li key={article.slug}>
                <CourseLesson article={article} index={index} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
              Explore by topic
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-stone-950">
              Choose the right shelf for what you need next.
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              The library is grouped by learning intent, so you can continue without scanning one long archive.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {librarySections.map((section) => {
              const sectionArticles = getArticlesBySlug(articleMap, section.slugs)

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-8 rounded-[2rem] bg-[#fafaf8] p-5 ring-1 ring-stone-900/[0.06] sm:p-6"
                >
                  <div className="mb-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                      {section.kicker}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-stone-950">
                      {section.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-stone-600">{section.description}</p>
                  </div>

                  <div className="grid gap-3">
                    {sectionArticles.map((article) => (
                      <LibraryArticleLink key={article.slug} article={article} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>

      {remainingArticles.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
              Additional guides
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-stone-950">
              More from Weiqi Studio
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {remainingArticles.map((article) => (
              <LibraryArticleLink key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
