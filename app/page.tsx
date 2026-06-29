import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'

export default async function HomePage() {
  const articles = await getAllArticles()

  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-emerald-700">Beginner Weiqi Lessons</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-stone-950 md:text-6xl">
            Learn Weiqi from the rules to your first real game.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-stone-700">
            A clear, structured learning path for beginners who want to understand Go, capture stones, count territory, and improve step by step.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/articles/what-is-weiqi" className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
              Start Learning
            </Link>
            <Link href="/articles" className="rounded-full border px-5 py-3 text-sm font-semibold text-stone-800 hover:bg-stone-100">
              Browse Articles
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-6 text-3xl font-bold">Beginner Roadmap</h2>
        <div className="grid gap-4 md:grid-cols-5">
          {articles.map((article, index) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="mb-2 text-sm font-bold text-emerald-700">Step {index + 1}</p>
              <h3 className="font-semibold text-stone-900">{article.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-6 text-3xl font-bold">Latest Articles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  )
}
