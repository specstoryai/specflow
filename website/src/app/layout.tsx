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
              <nav className="mx-auto w-full max-w-6xl px-6 py-4">
                <div className="grid grid-cols-3 items-center text-xs uppercase tracking-[0.3em]">
                  <div className="flex items-center gap-6">
                    <Image
                      src="/images/specstory-icon-mono.png"
                      alt="SpecStory icon"
                      width={10}
                      height={10}
                      className="h-6 w-6 opacity-100 dark:invert"
                    />
                  </div>
                  <Link
                    href="/"
                    className="justify-self-center text-sm tracking-[0.75em]"
                  >
                    Specflow
                  </Link>
                  <div className="flex items-center justify-self-end gap-4">
                    <ThemeToggle />
                    <a
                      href="https://www.specstory.com"
                      className="rounded-full border border-border/80 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] transition hover:border-accent hover:text-accent"
                      target="_blank"
                      rel="noreferrer"
                    >
                      SpecStory
                    </a>
                  </div>
                </div>
              </nav>
            </header>
            <main>{children}</main>
            <footer className="border-t border-border/70">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 text-xs uppercase tracking-[0.2em] text-muted">
                <span>{siteConfig.footer}</span>
                <span>Specflow is a guide library for builders.</span>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
