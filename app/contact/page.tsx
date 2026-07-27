import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Weiqi Studio',
  description:
    'Contact Weiqi Studio with questions, corrections, topic suggestions, website feedback, or collaboration inquiries.',
}

const feedbackTopics = [
  'Errors or unclear explanations',
  'Beginner topics you would like us to cover',
  'Website usability issues',
  'Educational or business collaborations',
]

export default function ContactPage() {
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
              Contact
            </p>

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-stone-950 sm:text-6xl">
              Contact Weiqi Studio
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              Questions, corrections, suggestions, and partnership inquiries are welcome.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_0.7fr] lg:items-start">
          <article className="rounded-[2rem] border border-stone-200/80 bg-white/85 p-7 shadow-[0_24px_80px_-60px_rgba(28,25,23,0.55)] backdrop-blur sm:p-10">
            <div className="space-y-6 text-base leading-8 text-stone-700 sm:text-lg sm:leading-9">
              <p>You can contact Weiqi Studio at:</p>

              <p>
                <a
                  href="mailto:weiqistudio2026@gmail.com"
                  className="inline-flex rounded-full bg-[#123c2b] px-5 py-3 text-sm font-semibold !text-white shadow-[0_12px_30px_-18px_rgba(6,78,59,0.85)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0d3022] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
                >
                  weiqistudio2026@gmail.com
                </a>
              </p>
            </div>
          </article>

          <aside className="rounded-[2rem] border border-emerald-950/10 bg-[#eef1e8] p-6 shadow-[0_18px_60px_-48px_rgba(6,78,59,0.45)] sm:p-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900">Feedback</p>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
              We especially appreciate feedback about:
            </h2>

            <ul className="mt-6 space-y-3">
              {feedbackTopics.map((topic) => (
                <li key={topic} className="flex gap-3 text-sm leading-6 text-stone-700 sm:text-base">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-800"
                  />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-8 rounded-[2rem] border border-stone-200 bg-white/70 p-7 text-base leading-8 text-stone-700 shadow-sm sm:p-8 sm:text-lg">
          We aim to review all messages, although we may not be able to respond to every inquiry.
        </div>
      </section>
    </div>
  )
}
