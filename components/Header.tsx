import Link from 'next/link'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Articles' },
  { href: '/articles/what-is-weiqi', label: 'Start Here' },
]

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-stone-900">Learn Weiqi</Link>
        <nav className="flex gap-5 text-sm font-medium">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
