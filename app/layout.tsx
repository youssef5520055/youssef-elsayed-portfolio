import type { Metadata, Viewport } from "next"
import { Instrument_Serif } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Toaster } from "sonner"
import MotionProvider from "@/components/portfolio/MotionProvider"
import "@/styles/globals.css"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#06090B",
  colorScheme: "dark",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://youssefelsayed.com"),
  title: "Youssef Elsayed | Software Engineer & Cybersecurity Specialist",
  description:
    "Portfolio of Youssef Elsayed Abdelaziz — Third-Year Computer Science student at Misr International University specializing in Cybersecurity, Network Security, AI/ML, Linux & Cloud Infrastructure, and Full-Stack Software Engineering.",
  keywords: [
    "Youssef Elsayed",
    "Youssef Elsayed Abdelaziz",
    "Software Engineer",
    "Cybersecurity Specialist",
    "Network Security",
    "AI",
    "Machine Learning",
    "Linux System Administration",
    "Systems Architecture",
    "Misr International University",
  ],
  authors: [{ name: "Youssef Elsayed Abdelaziz", url: "https://github.com/youssef5520055" }],
  creator: "Youssef Elsayed Abdelaziz",
  openGraph: {
    title: "Youssef Elsayed | Software Engineer & Cybersecurity Specialist",
    description:
      "Building secure, scalable, and intelligent systems across Cybersecurity, AI/ML, Cloud/Linux Infrastructure, and Full-Stack Engineering.",
    type: "website",
    url: "https://youssefelsayed.com",
    siteName: "Youssef Elsayed Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Youssef Elsayed — Software Engineer & Cybersecurity Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Youssef Elsayed | Software Engineer & Cybersecurity Specialist",
    description:
      "Building secure, scalable, and intelligent systems across Cybersecurity, AI/ML, and Modern Software Engineering.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-primary/25 selection:text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--accent-primary)] focus:text-[var(--bg-deep)] focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
        >
          Skip to main content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0D1216",
              border: "1px solid rgba(240, 244, 242, 0.14)",
              color: "#F0F4F2",
            },
          }}
        />
      </body>
    </html>
  )
}
