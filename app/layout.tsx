import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Genially GEO',
  description: '',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>{children}</body>
    </html>
  )
}
