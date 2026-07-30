import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://weiqi-studio.vercel.app',
    sitemap: 'https://weiqi-studio.vercel.app/sitemap.xml',
  }
}
