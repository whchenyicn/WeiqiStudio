import Link from 'next/link'

export type RoadmapLesson = {
  title: string
  href?: string
  duration?: string
  difficulty?: string
}

const defaultLessons: RoadmapLesson[] = [
  { title: 'What is Weiqi', href: '/articles/what-is-weiqi', duration: '4 min' },
  { title: 'Board & Stones', href: '/articles/weiqi-board-and-stones', duration: '5 min' },
  { title: 'Liberties', href: '/articles/liberties-in-weiqi', duration: '6 min' },
  { title: 'Capturing', href: '/articles/how-capturing-works-in-weiqi', duration: '7 min' },
  { title: 'Atari', href: '/articles/what-is-atari-in-weiqi', duration: '5 min' },
  { title: 'Eyes', href: '/articles/eyes-in-weiqi', duration: '6 min' },
  { title: 'Territory', href: '/articles/territory-in-weiqi', duration: '7 min' },
  { title: 'Scoring', href: '/articles/scoring-in-weiqi', duration: '8 min' },
  { title: 'Play Your First Game', href: '/articles/play-your-first-game', duration: '10 min' },
]

type Point = [number, number]

type DiagramPattern = {
  black?: Point[]
  white?: Point[]
  highlights?: Point[]
  territory?: Point[]
}

const diagramPatterns: DiagramPattern[] = [
  { black: [[1, 1]], white: [[3, 3]] },
  { black: [[1, 1], [3, 2], [2, 4]], white: [[3, 1], [1, 3], [4, 3]] },
  { black: [[2, 2]], highlights: [[2, 1], [1, 2], [3, 2], [2, 3]] },
  { white: [[2, 2]], black: [[2, 1], [1, 2], [3, 2], [2, 3]] },
  { black: [[2, 2]], white: [[2, 1], [1, 2], [3, 2]], highlights: [[2, 3]] },
  { black: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [0, 2], [2, 2], [4, 2], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3]], highlights: [[1, 2], [3, 2]] },
  { black: [[0, 1], [1, 1], [1, 0], [3, 3], [3, 4], [4, 3]], territory: [[0, 0], [4, 4]] },
  { black: [[0, 1], [1, 2], [2, 1]], white: [[3, 2], [2, 3], [4, 3]], territory: [[0, 0], [1, 0], [3, 4], [4, 4]] },
  { black: [[0, 1], [1, 3], [2, 1], [3, 3], [4, 1]], white: [[0, 3], [1, 1], [2, 3], [3, 1], [4, 3]] },
]

function MiniBoard({ lessonIndex }: { lessonIndex: number }) {
  const pattern = diagramPatterns[lessonIndex] ?? diagramPatterns[0]
  const coordinate = (value: number) => 10 + value * 16

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 84 84"
      className="h-[82px] w-[82px] shrink-0 rounded-xl bg-[#f1eee6] p-1.5 opacity-90 ring-1 ring-stone-900/[0.05] sm:h-[88px] sm:w-[88px]"
    >
      <g stroke="#9d9688" strokeWidth="0.7" opacity="0.65">
        {[0, 1, 2, 3, 4].map((line) => (
          <g key={line}>
            <line x1="10" y1={coordinate(line)} x2="74" y2={coordinate(line)} />
            <line x1={coordinate(line)} y1="10" x2={coordinate(line)} y2="74" />
          </g>
        ))}
      </g>

      {pattern.territory?.map(([x, y]) => (
        <rect key={`t-${x}-${y}`} x={coordinate(x) - 4} y={coordinate(y) - 4} width="8" height="8" rx="2" fill="#52705d" opacity="0.18" />
      ))}
      {pattern.highlights?.map(([x, y]) => (
        <circle key={`h-${x}-${y}`} cx={coordinate(x)} cy={coordinate(y)} r="3.2" fill="#52705d" opacity="0.38" />
      ))}
      {pattern.black?.map(([x, y]) => (
        <circle key={`b-${x}-${y}`} cx={coordinate(x)} cy={coordinate(y)} r="5.2" fill="#292825" />
      ))}
      {pattern.white?.map(([x, y]) => (
        <circle key={`w-${x}-${y}`} cx={coordinate(x)} cy={coordinate(y)} r="5.2" fill="#faf9f6" stroke="#a8a39a" strokeWidth="0.8" />
      ))}
    </svg>
  )
}

function ModuleContent({ lesson, index }: { lesson: RoadmapLesson; index: number }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 pt-0.5">
          <p className="text-4xl font-medium leading-none tracking-[-0.055em] text-stone-300 transition-colors duration-300 group-hover:text-emerald-900/35">
            {String(index + 1).padStart(2, '0')}
          </p>

          <h3 className="mt-4 text-xl font-semibold leading-tight tracking-[-0.03em] text-stone-950">
            {lesson.title}
          </h3>

          <p className="mt-2.5 whitespace-nowrap text-xs font-medium text-stone-500">
            {lesson.duration ?? '5 min'} read
            <span aria-hidden="true" className="mx-2 text-stone-300">&bull;</span>
            {lesson.difficulty ?? 'Beginner'}
          </p>
        </div>

        <MiniBoard lessonIndex={index} />
      </div>

      <div className="mt-5">
        <span className={lesson.href
          ? 'inline-flex items-center gap-2 rounded-full bg-emerald-950 px-3.5 py-2 text-xs font-semibold !text-white shadow-[0_6px_16px_-10px_rgba(6,78,59,0.8)] transition-colors duration-300 group-hover:bg-emerald-900'
          : 'inline-flex items-center rounded-full bg-stone-100 px-3.5 py-2 text-xs font-semibold text-stone-400'}>
          {lesson.href ? (
            <>Start Lesson <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span></>
          ) : (
            'Coming Soon'
          )}
        </span>
      </div>
    </>
  )
}

function CourseModule({ lesson, index }: { lesson: RoadmapLesson; index: number }) {
  const className =
    'group block h-full rounded-[1.35rem] bg-gradient-to-b from-white to-[#fbfbf8] p-6 ring-1 ring-stone-900/[0.06] shadow-[0_10px_28px_-24px_rgba(28,25,23,0.45)] transition-all duration-300'

  return lesson.href ? (
    <Link
      href={lesson.href}
      className={`${className} hover:-translate-y-0.5 hover:ring-stone-900/[0.12] hover:shadow-[0_20px_42px_-26px_rgba(28,25,23,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800`}
    >
      <ModuleContent lesson={lesson} index={index} />
    </Link>
  ) : (
    <div className={`${className} from-white/80 to-stone-50/70`} aria-label={`${lesson.title}, coming soon`}>
      <ModuleContent lesson={lesson} index={index} />
    </div>
  )
}

export function LearningRoadmap({ lessons = defaultLessons }: { lessons?: RoadmapLesson[] }) {
  return (
    <section className="bg-[#f8f8f5]" aria-labelledby="learning-path-title">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
            Course curriculum
          </p>
          <h2
            id="learning-path-title"
            className="text-3xl font-semibold tracking-[-0.035em] text-stone-950 sm:text-4xl"
          >
            Your learning path
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            Nine focused lessons that build from the essential rules to your first complete game.
          </p>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson, index) => (
            <li key={lesson.title}>
              <CourseModule lesson={lesson} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
