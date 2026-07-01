import type { Metadata } from 'next'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { AdPlaceholder, LessonHero, LessonSidebar } from '@/components/article/LessonArticle'
import styles from '@/components/article/ArticleContent.module.css'

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

function getReadingTime(html: string) {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return Math.max(1, Math.ceil(text.split(' ').filter(Boolean).length / 200))
}

function getLessonHeadings(html: string) {
  return Array.from(html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g), (match) =>
    match[1].replace(/<[^>]*>/g, '').trim()
  )
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  const articles = await getAllArticles()
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 4)
  const readingTime = getReadingTime(article.contentHtml)
  const headings = getLessonHeadings(article.contentHtml)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'Weiqi Studio' },
  }

  return (
    <div className="bg-[#fafaf8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <LessonHero
        title={article.title}
        description={article.description}
        category={article.category}
        date={article.date}
        readingTime={readingTime}
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 lg:px-10">
        <div className="min-w-0">
          <AdPlaceholder />
          <article className="mt-8 rounded-[1.75rem] bg-white px-6 py-8 shadow-[0_16px_50px_-40px_rgba(28,25,23,0.5)] ring-1 ring-stone-900/[0.05] sm:px-10 sm:py-12 lg:px-12">
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          </article>
        </div>

        <LessonSidebar headings={headings} related={related} />
      </div>
    </div>
  )
}
