import Link from 'next/link'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Articles' },
  { href: '/articles/what-is-weiqi', label: 'Start Here' },
]

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <div className="flex min-w-0 items-center gap-3">
          {/* A future logo can be inserted here without changing the brand group layout. */}
          <Link href="/" className="whitespace-nowrap text-lg font-semibold tracking-[-0.02em] text-stone-950">Weiqi Studio</Link>
        </div>
        <nav aria-label="Main navigation" className="flex items-center gap-4 text-sm font-medium text-stone-600 sm:gap-7">
          {nav.map((item) => (
            <Link className="transition-colors hover:text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800" key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
