import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import { LearningRoadmap } from '@/components/LearningRoadmap'
import { TopicCards } from '@/components/TopicCards'
import { FeaturedArticles } from '@/components/FeaturedArticles'

export default async function HomePage() {
  const articles = await getAllArticles()

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-stone-200 bg-[#f4f4ef]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(#14532d_0.7px,transparent_0.7px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        />

        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.72fr] lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 text-xs font-semibold text-emerald-950 shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
              A thoughtful way to learn Weiqi
            </p>

            <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-stone-950 sm:text-6xl lg:text-[5.15rem]">
              Master the World&apos;s Oldest Strategy Game
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              Learn Weiqi through beautifully structured lessons, practical examples, and beginner-friendly guides.
            </p>

            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Link
                href="/articles/what-is-weiqi"
                className="group inline-flex min-h-12 items-center gap-8 rounded-full bg-[#123c2b] px-6 py-3 text-sm font-semibold !text-white shadow-[0_12px_30px_-14px_rgba(6,78,59,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0d3022] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
              >
                Start Learning
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/articles"
                className="group inline-flex items-center gap-3 px-2 py-3 text-sm font-semibold text-stone-700 transition-colors hover:text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
              >
                Browse Articles
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden aspect-square w-full max-w-[420px] lg:block" aria-hidden="true">
            <div className="absolute inset-0 rotate-3 rounded-[3rem] border border-emerald-950/10 bg-[#e7e3d9] shadow-[0_40px_90px_-50px_rgba(28,25,23,0.55)]" />
            <div className="absolute inset-5 -rotate-2 rounded-[2.4rem] border border-stone-300 bg-[#d8c8a7] p-10 shadow-xl">
              <div className="h-full w-full opacity-70 [background-image:linear-gradient(#766546_1px,transparent_1px),linear-gradient(90deg,#766546_1px,transparent_1px)] [background-size:12.5%_12.5%]" />
              <span className="absolute left-[35%] top-[34%] h-8 w-8 rounded-full bg-stone-950 shadow-md" />
              <span className="absolute left-[58%] top-[46%] h-8 w-8 rounded-full border border-stone-300 bg-stone-50 shadow-md" />
              <span className="absolute left-[47%] top-[57%] h-8 w-8 rounded-full bg-stone-950 shadow-md" />
            </div>
          </div>
        </div>
      </section>

      <LearningRoadmap />

      <TopicCards />

      <FeaturedArticles articles={articles} />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10" aria-labelledby="continue-exploring-title">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">Keep learning</p><h2 id="continue-exploring-title" className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">Continue Exploring</h2></div>
          <Link href="/articles" className="hidden text-sm font-semibold text-emerald-900 hover:text-emerald-700 sm:block">View all guides &rarr;</Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {articles.slice(3).map((article) => <Link key={article.slug} href={`/articles/${article.slug}`} className="group flex items-center justify-between gap-5 rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-emerald-900/20 hover:shadow-sm"><div><p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-800">{article.category}</p><h3 className="font-semibold tracking-tight text-stone-950">{article.title}</h3></div><span aria-hidden="true" className="shrink-0 text-stone-400 transition group-hover:translate-x-1 group-hover:text-emerald-900">&rarr;</span></Link>)}
        </div>
      </section>
    </div>
  )
}
