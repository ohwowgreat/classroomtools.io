import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'classroomtools.io',
  description:
    'Research-driven tools for teaching in algorithmic culture — built from Teaching After the Feed.',
  openGraph: {
    title: 'classroomtools.io',
    description:
      'Research-driven tools for teaching in algorithmic culture.',
    url: 'https://classroomtools.io',
    siteName: 'classroomtools.io',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
