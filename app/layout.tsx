import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from 'sonner'
import '@/styles/globals.css' // Adjusting import to use @/styles alias if available or relative

export const metadata: Metadata = {
  metadataBase: new URL('https://youssefelsayed.com'), // Replace with actual domain when available
  title: 'Youssef Elsayed | Software & Cybersecurity Engineer',
  description:
    'Professional portfolio of Youssef Elsayed AbdelFatah. Specializing in Software Engineering, Cybersecurity, AI, and Systems Architecture.',
  keywords: [
    'Software Engineer',
    'Cybersecurity',
    'AI',
    'Machine Learning',
    'Systems Architecture',
    'Youssef Elsayed',
  ],
  authors: [{ name: 'Youssef Elsayed AbdelFatah' }],
  creator: 'Youssef Elsayed AbdelFatah',
  openGraph: {
    title: 'Youssef Elsayed | Software & Cybersecurity Engineer',
    description: 'Technical portfolio showcasing software engineering and cybersecurity expertise.',
    type: 'website',
    url: 'https://youssefelsayed.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-primary">
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  )
}
