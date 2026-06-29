import { Metadata } from 'next'
import { getAllArticles } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'

export const metadata: Metadata = {
  title: 'Weiqi Articles',
  description: 'Browse beginner-friendly Weiqi articles about rules, capturing, liberties, scoring, and strategy.',
}

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="mb-4 text-4xl font-bold">Weiqi Articles</h1>
      <p className="mb-8 max-w-2xl text-stone-700">
        Start with the basic rules, then move into capturing, scoring, and beginner strategy.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
