import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'classroomtools.io',
  description:
    'Free classroom tools built from Teaching After the Feed, an action research project on how students learn in algorithmic culture.',
  openGraph: {
    title: 'classroomtools.io',
    description:
      'Free classroom tools built from Teaching After the Feed, an action research project on teaching in algorithmic culture.',
    url: 'https://classroomtools.io',
    siteName: 'classroomtools.io',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
