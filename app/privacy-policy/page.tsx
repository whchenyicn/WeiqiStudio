import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the Weiqi Studio Privacy Policy to understand what information may be collected and how it may be used.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy',
    description:
      'Read the Weiqi Studio Privacy Policy to understand what information may be collected and how it may be used.',
    url: '/privacy-policy',
  },
  twitter: {
    title: 'Privacy Policy',
    description:
      'Read the Weiqi Studio Privacy Policy to understand what information may be collected and how it may be used.',
  },
}

const collectedInformation = [
  'Browser and device type',
  'Pages visited',
  'Approximate location',
  'Referral source',
  'Time spent on the website',
  'General website interaction data',
]

const sections = [
  {
    title: 'Introduction',
    body: [
      'Weiqi Studio respects your privacy. This Privacy Policy explains what information may be collected when you visit this website and how that information may be used.',
    ],
  },
  {
    title: 'Information You Provide',
    body: [
      'If you contact Weiqi Studio directly, we may receive information such as your name, email address, and the contents of your message.',
      'We use this information only to respond to your inquiry or manage the relevant communication.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'Weiqi Studio may use cookies or similar technologies for essential website functions, analytics, and future advertising features.',
      'You can control or disable cookies through your browser settings. Some website features may not work correctly if cookies are disabled.',
    ],
  },
  {
    title: 'Analytics',
    body: [
      'We may use third-party analytics services to understand how visitors use the website. These services may collect technical and usage information according to their own privacy policies.',
    ],
  },
  {
    title: 'Advertising',
    body: [
      'Weiqi Studio may display advertising in the future, including advertising provided by third-party networks such as Google AdSense.',
      'Advertising partners may use cookies or similar technologies to show relevant ads, measure ad performance, and prevent abuse according to their own privacy policies.',
    ],
  },
  {
    title: 'Contact',
    body: ['If you have questions about this Privacy Policy, you can contact Weiqi Studio by email.'],
  },
]

export default function PrivacyPolicyPage() {
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
              Policy
            </p>

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-stone-950 sm:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-7 text-sm font-medium text-stone-500">Last updated: July 28, 2026</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <article className="rounded-[2rem] border border-stone-200/80 bg-white/85 p-7 shadow-[0_24px_80px_-60px_rgba(28,25,23,0.55)] backdrop-blur sm:p-10">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">1. Introduction</h2>
              <p className="mt-4 text-base leading-8 text-stone-700 sm:text-lg">
                Weiqi Studio respects your privacy. This Privacy Policy explains what information may be collected when
                you visit this website and how that information may be used.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
                2. Information We May Collect
              </h2>
              <p className="mt-4 text-base leading-8 text-stone-700 sm:text-lg">
                We may collect limited technical and usage information, including:
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {collectedInformation.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-stone-700 sm:text-base">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-800"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-base leading-8 text-stone-700 sm:text-lg">
                This information may be collected through analytics tools and is used to understand website performance
                and improve the user experience.
              </p>
            </section>

            {sections.slice(1).map((section, index) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
                  {index + 3}. {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-stone-700 sm:text-lg">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.title === 'Contact' ? (
                    <p>
                      <a
                        href="mailto:weiqistudio2026@gmail.com"
                        className="font-semibold text-emerald-900 underline decoration-emerald-900/25 underline-offset-4 transition hover:text-emerald-700"
                      >
                        weiqistudio2026@gmail.com
                      </a>
                    </p>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
