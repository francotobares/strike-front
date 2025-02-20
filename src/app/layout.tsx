import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'

export const metadata: Metadata = {
  title: 'Stroik',
  description: 'Stroik assesstment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
