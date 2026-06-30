import Link from 'next/link'

export type LearningTopic = {
  title: string
  description: string
  href: string
  icon: 'rules' | 'lessons' | 'glossary' | 'strategy' | 'mistakes' | 'life-and-death'
  label?: string
}

const defaultTopics: LearningTopic[] = [
  {
    title: 'Rules',
    description: 'Build a clear foundation, one essential concept at a time.',
    href: '/articles',
    icon: 'rules',
    label: 'Rules track',
  },
  {
    title: 'Beginner Lessons',
    description: 'Follow a calm path from your first stone to your first game.',
    href: '/articles',
    icon: 'lessons',
    label: 'Beginner path',
  },
  {
    title: 'Glossary',
    description: 'Learn the language of Weiqi without getting lost in jargon.',
    href: '/articles',
    icon: 'glossary',
    label: 'Reference',
  },
  {
    title: 'Strategy',
    description: 'See the ideas that connect each move to the whole board.',
    href: '/articles',
    icon: 'strategy',
    label: 'Strategy basics',
  },
  {
    title: 'Common Mistakes',
    description: 'Recognise beginner patterns and learn how to improve them.',
    href: '/articles',
    icon: 'mistakes',
    label: 'Improve faster',
  },
  {
    title: 'Life & Death',
    description: 'Understand when groups can survive, and what makes them safe.',
    href: '/articles',
    icon: 'life-and-death',
    label: 'Core patterns',
  },
]

function TopicIcon({ name }: { name: LearningTopic['icon'] }) {
  const paths = {
    rules: <><path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h3"/></>,
    lessons: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 9H12v11H7.5A3.5 3.5 0 0 0 4 16.5z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 9H12v11h4.5a3.5 3.5 0 0 1 3.5-3.5z"/></>,
    glossary: <><path d="M5 5h14v14H5z"/><path d="M8 9h8M8 12h6M8 15h4"/></>,
    strategy: <><circle cx="6" cy="17" r="2"/><circle cx="18" cy="7" r="2"/><path d="M8 17c5 0 2-10 8-10M12 17h5"/></>,
    mistakes: <><path d="m12 3 9 17H3z"/><path d="M12 9v4M12 17h.01"/></>,
    'life-and-death': <><circle cx="8" cy="12" r="4"/><circle cx="16" cy="12" r="4"/><path d="M12 6v12"/></>,
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

export function TopicCards({ topics = defaultTopics }: { topics?: LearningTopic[] }) {
  return (
    <section className="border-y border-stone-200 bg-white" aria-labelledby="topics-title">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
            Explore
          </p>
          <h2
            id="topics-title"
            className="text-3xl font-semibold tracking-[-0.035em] text-stone-950 sm:text-4xl"
          >
            Learn by topic
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            Dip into a concept or follow your curiosity. Every topic is designed to feel clear and approachable.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className="group rounded-2xl border border-stone-200 bg-[#fafaf8] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-900/20 hover:bg-white hover:shadow-[0_18px_45px_-30px_rgba(20,83,45,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-950 text-white [&>svg]:h-5 [&>svg]:w-5">
                  <TopicIcon name={topic.icon} />
                </span>
                <span
                  aria-hidden="true"
                  className="text-stone-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-800">{topic.label ?? 'Learning topic'}</p>
              <h3 className="text-lg font-semibold tracking-tight text-stone-950">{topic.title}</h3>
              <p className="mt-1.5 max-w-sm text-sm leading-5 text-stone-600">{topic.description}</p>
              <p className="mt-4 text-xs font-semibold text-emerald-900 opacity-70 transition group-hover:opacity-100">Explore topic <span aria-hidden="true">&rarr;</span></p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
