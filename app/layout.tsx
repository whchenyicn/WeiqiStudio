import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Weiqi Studio | Beginner Go Lessons',
    template: '%s | Weiqi Studio',
  },
  description: 'A beginner-friendly Weiqi learning site with rules, lessons, strategy, glossary pages, and practical examples.',
  metadataBase: new URL('https://example.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
