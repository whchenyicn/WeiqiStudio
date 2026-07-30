import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://weiqi-studio.vercel.app'
  const articles = await getAllArticles()
  const staticLastModified = new Date('2026-07-30')

  return [
    { url: baseUrl, lastModified: staticLastModified },
    { url: `${baseUrl}/articles`, lastModified: staticLastModified },
    { url: `${baseUrl}/about`, lastModified: staticLastModified },
    { url: `${baseUrl}/contact`, lastModified: staticLastModified },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date('2026-07-28') },
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updated),
    })),
  ]
}
