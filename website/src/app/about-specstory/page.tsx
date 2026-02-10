import Image from "next/image";
import Link from "next/link";

const founders = [
  {
    name: "Jake Levirne",
    role: "Founder & CEO",
    image: "/images/founders/Jake_Levirne.png",
    linkedin: "https://www.linkedin.com/in/jakelevirne/",
    x: "https://twitter.com/awakenjake",
  },
  {
    name: "Sean Johnson",
    role: "Founder & CTO",
    image: "/images/founders/Sean_Johnson.png",
    linkedin: "https://www.linkedin.com/in/snootymonkey/",
  },
  {
    name: "Greg Ceccarelli",
    role: "Founder & CPO",
    image: "/images/founders/Greg_Ceccarelli.png",
    linkedin: "https://www.linkedin.com/in/gregceccarelli/",
    x: "https://twitter.com/gregce10",
  },
];

const philosophy = [
  {
    title: "Software as a Universal Creative Medium",
    copy:
      "Software development is evolving into a universal creative medium, accessible to anyone with ideas to express and problems to solve.",
  },
  {
    title: "Human Intent, AI Implementation",
    copy:
      "With AI handling implementation details, humans can focus on articulating intent and defining the impact they want to create.",
  },
  {
    title: "Specification as the Source of Truth",
    copy:
      "Specifications capture the why behind software, preserving reasoning and context that code alone cannot express.",
  },
  {
    title: "Collaborative Knowledge Sharing",
    copy:
      "True collaboration is exchanging knowledge and intent, not just code—understanding why something was built creates stronger outcomes.",
  },
];

export default function AboutSpecStoryPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-8">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
        <Link href="/" className="hover:text-accent">
          Back to Specflow
        </Link>
      </div>

      <header className="mt-6">
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
          About SpecStory
        </h1>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border/80 bg-border/20">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/images/about_page.png"
              alt="SpecStory team and product"
              fill
              priority
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted">
          SpecStory was founded in 2024 to preserve human intent in AI-assisted
          software development - “intent is the new source code.”
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">
          Our Story
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          We built SpecStory to solve what AI coding tools missed: the ability
          to preserve why something was built, not just what was built. We help
          teams capture context, align on intent, and ship with clarity.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">
          Founders
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="rounded-2xl border border-border/80 bg-card p-4"
            >
              <div className="overflow-hidden rounded-2xl border border-border/70 bg-border/20">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="(min-width: 768px) 220px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-sm font-semibold">{founder.name}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                {founder.role}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-muted">
                {founder.linkedin && (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-accent"
                    aria-label={`${founder.name} on LinkedIn`}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                    >
                      <path d="M4.98 3.5a2.48 2.48 0 1 1 0 4.96 2.48 2.48 0 0 1 0-4.96zM3 8.98h3.96V21H3V8.98zM9.5 8.98h3.8v1.64h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-3.96v-5.33c0-1.27-.03-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9.5V8.98z" />
                    </svg>
                  </a>
                )}
                {founder.x && (
                  <a
                    href={founder.x}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-accent"
                    aria-label={`${founder.name} on X`}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                    >
                      <path d="M18.8 2H22l-7.4 8.5L23 22h-6.6l-5.2-6.4L5.6 22H2.4l7.9-9.1L1 2h6.7l4.7 5.8L18.8 2zm-1.1 18h1.8L7.4 4h-1.9l12.2 16z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">
          Our Philosophy
        </h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {philosophy.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border/80 bg-card p-6"
            >
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">
          Contact
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted">
          Have questions, feedback, or want to join our team? Reach us at
          <a
            href="mailto:info@specstory.com"
            className="ml-2 hover:underline"
            style={{ color: "var(--accent)" }}
          >
            info@specstory.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
