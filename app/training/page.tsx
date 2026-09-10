import type { Metadata } from 'next'
import { GoPuzzle } from '@/components/GoPuzzle'
import { puzzles } from '@/lib/puzzles'

export const metadata: Metadata = {
  title: 'Weiqi Training',
  description:
    'Practice beginner Weiqi concepts with interactive puzzles about liberties, atari, capturing, and weak groups.',
  alternates: {
    canonical: '/training',
  },
  openGraph: {
    title: 'Weiqi Training',
    description:
      'Practice beginner Weiqi concepts with interactive puzzles about liberties, atari, capturing, and weak groups.',
    url: '/training',
  },
  twitter: {
    title: 'Weiqi Training',
    description:
      'Practice beginner Weiqi concepts with interactive puzzles about liberties, atari, capturing, and weak groups.',
  },
}

export default function TrainingPage() {
  return (
    <div className="bg-[#fafaf8]">
      <section className="relative isolate overflow-hidden border-b border-stone-200 bg-[#f4f4ef]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:radial-gradient(#14532d_0.7px,transparent_0.7px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_84%)]"
        />

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900 shadow-sm">
              Training
            </p>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-stone-950 sm:text-6xl">
              Practice Weiqi with interactive puzzles.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              Start with small beginner positions. Choose a move, get immediate feedback, and build pattern recognition one concept at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
            Beginner puzzle set
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-stone-950">
            Learn by playing the key move.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            This MVP introduces the reusable puzzle system that can later appear inside lessons with a component like <code className="rounded bg-stone-100 px-1.5 py-0.5 text-sm text-stone-800">&lt;GoPuzzle puzzleId=&quot;atari-001&quot; /&gt;</code>.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {puzzles.map((puzzle) => (
            <GoPuzzle key={puzzle.id} puzzleId={puzzle.id} />
          ))}
        </div>
      </section>
    </div>
  )
}
