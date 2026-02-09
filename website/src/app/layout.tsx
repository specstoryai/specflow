import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-20 border-b border-border/70 bg-background/80 backdrop-blur">
              <nav className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 sm:py-4">
                <div className="grid grid-cols-3 items-center uppercase">
                  <a
                    href="https://www.specstory.com"
                    className="flex items-center gap-2 text-muted transition hover:text-accent sm:gap-3"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src="/images/specstory-icon-mono.png"
                      alt="SpecStory icon"
                      width={20}
                      height={20}
                      className="h-4 w-4 opacity-90 dark:invert sm:h-5 sm:w-5"
                    />
                    <span className="text-[10px] tracking-[0.2em] sm:text-xs sm:tracking-[0.25em] md:text-sm">
                      SpecStory
                    </span>
                  </a>
                  <Link
                    href="/"
                    className="justify-self-center text-[10px] tracking-[0.4em] sm:text-xs sm:tracking-[0.6em] md:text-sm md:tracking-[0.75em]"
                  >
                    Specflow
                  </Link>
                  <div className="flex items-center justify-self-end">
                    <ThemeToggle />
                  </div>
                </div>
              </nav>
            </header>
            <main>{children}</main>
            <footer className="border-t border-border/70">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 text-xs uppercase tracking-[0.2em] text-muted md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <span className="block">{siteConfig.footer}</span>
                  <span className="block">Intent is the new source code.</span>
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="https://github.com/specstoryai"
                      className="transition hover:text-accent"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="SpecStory GitHub"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.9-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.07c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.56 1.41.21 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.69.95.69 1.92 0 1.39-.01 2.5-.01 2.84 0 .26.18.58.69.48A10.2 10.2 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                      </svg>
                    </a>
                    <a
                      href="mailto:info@specstory.com"
                      className="transition hover:text-accent"
                      aria-label="Email SpecStory"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                        <path d="M22 8l-10 6L2 8" />
                      </svg>
                    </a>
                    <a
                      href="https://x.com/specstoryai"
                      className="transition hover:text-accent"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="SpecStory on X"
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
                    <a
                      href="https://discord.com/invite/E47yQyEUd3"
                      className="transition hover:text-accent"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="SpecStory Discord"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="currentColor"
                      >
                        <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.68 4.369a.07.07 0 0 0-.032.027C.533 9.046-.32 13.579.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.039.078.078 0 0 0 .084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.105 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.095.252-.194.371-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .077.009c.12.098.246.198.372.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.04.106c.36.7.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028 19.86 19.86 0 0 0 6.002-3.038.077.077 0 0 0 .032-.056c.5-5.177-.838-9.673-3.548-13.661a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.182 0-2.156-1.085-2.156-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.156 2.419 0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.156 2.419 0 1.334-.946 2.419-2.156 2.419z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/specstory/"
                      className="transition hover:text-accent"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="SpecStory LinkedIn"
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
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link href="/about-specstory" className="transition hover:text-accent">
                    About
                  </Link>
                  <a
                    href="https://docs.specstory.com/"
                    className="transition hover:text-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Docs
                  </a>
                  <a
                    href="https://www.intent.build/"
                    className="transition hover:text-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Intent
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
