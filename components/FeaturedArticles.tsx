import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

function FeaturedArticleCard({ article, index }: { article: ArticleMeta; index: number }) {
  return <Link href={`/articles/${article.slug}`} className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-900/20 hover:shadow-[0_24px_60px_-32px_rgba(20,83,45,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800">
    <div className="relative aspect-[16/7] overflow-hidden border-b border-stone-200 bg-[#eeeee8]">
      <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:linear-gradient(#14532d_0.6px,transparent_0.6px),linear-gradient(90deg,#14532d_0.6px,transparent_0.6px)] [background-size:28px_28px]"/>
      <span className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white text-xs font-semibold tabular-nums text-emerald-950 shadow-sm">{String(index + 1).padStart(2, '0')}</span>
    </div>
    <div className="p-6 sm:p-7"><div className="flex items-start justify-between gap-5"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">{article.category}</p><h3 className="text-xl font-semibold leading-tight tracking-[-0.025em] text-stone-950">{article.title}</h3></div><span aria-hidden="true" className="mt-1 text-stone-400 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-900">&nearr;</span></div><p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-600">{article.description}</p></div>
  </Link>
}

export function FeaturedArticles({ articles }: { articles: ArticleMeta[] }) {
  const featuredArticles = articles.slice(0, 3)
  if (!featuredArticles.length) return null
  return <section className="bg-[#f8f8f5]" aria-labelledby="featured-articles-title"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10"><div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-2xl"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">Editor&apos;s selection</p><h2 id="featured-articles-title" className="text-3xl font-semibold tracking-[-0.035em] text-stone-950 sm:text-4xl">Featured guides</h2><p className="mt-4 text-base leading-7 text-stone-600">Begin with a few of our most useful guides, selected to make the early steps feel effortless.</p></div><Link href="/articles" className="group inline-flex w-fit items-center gap-3 text-sm font-semibold text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800">Browse all guides <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span></Link></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{featuredArticles.map((article,index)=><FeaturedArticleCard key={article.slug} article={article} index={index}/>)}</div></div></section>
}
