import Image from 'next/image'
import { LOGO_URL } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="py-8 bg-zinc-900/50 border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src={LOGO_URL}
            alt=""
            width={100}
            height={40}
            className="h-8 w-auto object-contain invert"
          />
          <p className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} Célida Café. Ensenada, B.C.
          </p>
        </div>
      </div>
    </footer>
  )
}
