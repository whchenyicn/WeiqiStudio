import { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  const articles = await getAllArticles()
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'Learn Weiqi' },
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_300px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="rounded-2xl bg-white p-6 shadow-sm md:p-10">
        <nav className="mb-6 text-sm text-stone-500">
          <Link href="/">Home</Link> / <Link href="/articles">Articles</Link> / {article.title}
        </nav>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-700">{article.category}</p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-stone-950">{article.title}</h1>
        <p className="mb-8 text-lg text-stone-700">{article.description}</p>
        <div className="mb-8 rounded-xl border border-dashed bg-stone-50 p-4 text-sm text-stone-600">
          Ad placeholder — this space can be used later for Google AdSense or another ad network.
        </div>
        <div className="prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
      </article>

      <aside className="space-y-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-3 font-bold">Related Articles</h2>
          <div className="space-y-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/articles/${item.slug}`} className="block text-sm font-medium">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-2 font-bold">Learning Path</h2>
          <p className="text-sm text-stone-600">Follow the articles in order to build a solid beginner foundation.</p>
        </div>
      </aside>
    </div>
  )
}
