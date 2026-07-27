import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://weiqi-studio.vercel.app'
  const articles = await getAllArticles()

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/articles`, lastModified: new Date() },
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.date),
    })),
  ]
}
