import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vulnerability Tracker</h1>
        <Link href="/vulnerabilities">
          <Button>
            View Vulnerabilities
          </Button>
        </Link>
      </div>
    </main>
  )
}
