import { Metadata } from 'next'
import { getAllArticles } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'

export const metadata: Metadata = {
  title: 'Weiqi Learning Library',
  description: 'Browse beginner-friendly Weiqi lessons and guides about rules, capturing, liberties, scoring, study, and strategy.',
}

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="mb-4 text-4xl font-bold">Weiqi Learning Library</h1>
      <p className="mb-8 max-w-2xl text-stone-700">
        Browse the full collection of Weiqi Studio lessons and guides. If you are starting from zero, begin with the Beginner Guide first.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
