import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export type ArticleMeta = {
  slug: string
  title: string
  description: string
  category: string
  date: string
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  const fileNames = fs.readdirSync(articlesDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return {
        slug,
        title: data.title,
        description: data.description,
        category: data.category,
        date: data.date,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getArticleBySlug(slug: string) {
  const fullPath = path.join(articlesDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const processedContent = await remark().use(remarkGfm).use(html).process(content)

  return {
    slug,
    title: data.title,
    description: data.description,
    category: data.category,
    date: data.date,
    contentHtml: processedContent.toString(),
  }
}
