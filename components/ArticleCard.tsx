import Link from 'next/link'
import { ArticleMeta } from '@/lib/articles'

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link href={`/articles/${article.slug}`} className="block rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">{article.category}</p>
      <h3 className="mb-2 text-xl font-bold text-stone-900">{article.title}</h3>
      <p className="text-sm text-stone-600">{article.description}</p>
    </Link>
  )
}
