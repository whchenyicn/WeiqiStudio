import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between">
        <p>Weiqi Studio is a beginner-friendly learning platform for the game of Go.</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/about" className="transition hover:text-emerald-900">
            About
          </Link>
          <Link href="/contact" className="transition hover:text-emerald-900">
            Contact
          </Link>
          <Link href="/privacy-policy" className="transition hover:text-emerald-900">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
