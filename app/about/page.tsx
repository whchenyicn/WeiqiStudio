import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Weiqi Studio',
  description:
    'Learn about Weiqi Studio, a beginner-focused resource for learning Weiqi, Go, and Baduk through clear lessons and practical guides.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Weiqi Studio',
    description:
      'Learn about Weiqi Studio, a beginner-focused resource for learning Weiqi, Go, and Baduk through clear lessons and practical guides.',
    url: '/about',
  },
  twitter: {
    title: 'About Weiqi Studio',
    description:
      'Learn about Weiqi Studio, a beginner-focused resource for learning Weiqi, Go, and Baduk through clear lessons and practical guides.',
  },
}

const resources = [
  'Step-by-step beginner lessons',
  'Clear explanations of essential rules and concepts',
  'Practical guides for improving',
  'Comparisons, terminology, rankings, books, and playing resources',
  'Original educational Weiqi diagrams',
]

export default function AboutPage() {
  return (
    <div className="bg-[#f7f6f1]">
      <section className="relative isolate overflow-hidden border-b border-stone-200">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:radial-gradient(#14532d_0.7px,transparent_0.7px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
        />

        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900 shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
              About
            </p>

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-stone-950 sm:text-6xl">
              About Weiqi Studio
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              Weiqi Studio helps complete beginners learn Weiqi clearly and confidently.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_0.7fr] lg:items-start">
          <article className="rounded-[2rem] border border-stone-200/80 bg-white/85 p-7 shadow-[0_24px_80px_-60px_rgba(28,25,23,0.55)] backdrop-blur sm:p-10">
            <div className="space-y-6 text-base leading-8 text-stone-700 sm:text-lg sm:leading-9">
              <p>
                Weiqi, also known as Go or Baduk, is one of the world’s oldest strategy games. Its rules are simple,
                but the game offers a lifetime of depth.
              </p>

              <p>Our goal is to make the first steps easier.</p>

              <p>
                We create structured beginner lessons, practical explanations, and clear educational diagrams without
                unnecessary jargon. Whether you want to understand the rules, play your first game, or improve your
                basic skills, Weiqi Studio provides a calm and straightforward place to begin.
              </p>
            </div>
          </article>

          <aside className="rounded-[2rem] border border-emerald-950/10 bg-[#eef1e8] p-6 shadow-[0_18px_60px_-48px_rgba(6,78,59,0.45)] sm:p-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900">Learning resource</p>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-950">What You Will Find Here</h2>

            <ul className="mt-6 space-y-3">
              {resources.map((resource) => (
                <li key={resource} className="flex gap-3 text-sm leading-6 text-stone-700 sm:text-base">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-800"
                  />
                  <span>{resource}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-8 rounded-[2rem] border border-stone-200 bg-white/70 p-7 text-base leading-8 text-stone-700 shadow-sm sm:p-8 sm:text-lg">
          Weiqi Studio is designed as a long-term learning resource. Content is reviewed and improved over time to keep
          it useful, accurate, and easy to understand.
        </div>
      </section>
    </div>
  )
}
