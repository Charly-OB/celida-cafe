'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { LOGO_URL } from '@/lib/constants'
import { useActiveSection } from '@/hooks/useActiveSection'

const NAV_LINKS = [
  { href: '#menu', label: 'Menú', sectionId: 'menu' },
  { href: '#galeria', label: 'Galería', sectionId: 'galeria' },
  { href: '#visitanos', label: 'Visítanos', sectionId: 'visitanos' },
  { href: '#contacto', label: 'Contacto', sectionId: 'contacto' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeSection = useActiveSection(['menu', 'galeria', 'visitanos', 'contacto'])

  const linkClass = (sectionId: string) =>
    `transition-colors text-sm ${
      activeSection === sectionId
        ? 'text-orange-400'
        : 'text-zinc-400 hover:text-orange-400'
    }`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center">
            <Image
              src={LOGO_URL}
              alt="Célida Café"
              width={120}
              height={50}
              className="h-10 w-auto object-contain invert"
              priority
              fetchPriority="high"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className={linkClass(link.sectionId)}>
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-zinc-400 hover:text-orange-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-zinc-800/50"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`${linkClass(link.sectionId)} py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}
