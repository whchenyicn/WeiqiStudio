import type { Metadata } from 'next'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { AdPlaceholder, LessonHero, LessonSidebar } from '@/components/article/LessonArticle'
import styles from '@/components/article/ArticleContent.module.css'

const siteUrl = 'https://weiqi-studio.vercel.app'

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

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  const url = `/articles/${article.slug}`

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url,
      publishedTime: article.date,
      modifiedTime: article.updated,
      authors: ['Weiqi Studio'],
      siteName: 'Weiqi Studio',
    },
    twitter: {
      card: 'summary',
      title: article.title,
      description: article.description,
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

function cleanHtmlText(html: string) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function getFaqJsonLd(html: string) {
  const faqStart = html.search(/<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>/i)
  if (faqStart === -1) return null

  const afterFaq = html.slice(faqStart)
  const nextSection = afterFaq.slice(1).search(/<h2[^>]*>/i)
  const faqHtml = nextSection === -1 ? afterFaq : afterFaq.slice(0, nextSection + 1)
  const matches = Array.from(
    faqHtml.matchAll(/<h3[^>]*>(.*?)<\/h3>([\s\S]*?)(?=<h3[^>]*>|$)/g)
  )

  const mainEntity = matches
    .map((match) => {
      const question = cleanHtmlText(match[1])
      const answer = cleanHtmlText(match[2])
      if (!question || !answer) return null

      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      }
    })
    .filter(Boolean)

  if (mainEntity.length < 2) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  const articles = await getAllArticles()
  const courseIndex = beginnerCourse.indexOf(article.slug)
  const previousSlug = courseIndex > 0 ? beginnerCourse[courseIndex - 1] : undefined
  const nextSlug = courseIndex >= 0 && courseIndex < beginnerCourse.length - 1
    ? beginnerCourse[courseIndex + 1]
    : undefined
  const previousLesson = articles.find((item) => item.slug === previousSlug)
  const nextLesson = articles.find((item) => item.slug === nextSlug)
  const related = articles
    .filter((item) => item.slug !== article.slug && item.slug !== previousSlug && item.slug !== nextSlug)
    .slice(0, 4)
  const readingTime = getReadingTime(article.contentHtml)
  const headings = getLessonHeadings(article.contentHtml)
  const articleUrl = `${siteUrl}/articles/${article.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: articleUrl,
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: 'Weiqi Studio', url: siteUrl },
    publisher: { '@type': 'Organization', name: 'Weiqi Studio', url: siteUrl },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Learning Library',
        item: `${siteUrl}/articles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  }

  const faqJsonLd = getFaqJsonLd(article.contentHtml)

  return (
    <div className="bg-[#fafaf8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}

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

        <LessonSidebar
          headings={headings}
          related={related}
          previousLesson={previousLesson}
          nextLesson={nextLesson}
        />
      </div>
    </div>
  )
}
