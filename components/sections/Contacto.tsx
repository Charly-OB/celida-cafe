'use client'
import { motion } from 'framer-motion'
import { Phone, Instagram, Facebook } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { BUSINESS_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { fadeInUp } from '@/lib/animations'
import type { SocialLink } from '@/types'

const PLATFORM_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Phone, // fallback (no usado)
  tiktok: Phone,  // fallback (no usado)
} as const

function SocialCard({ link, delay }: { link: SocialLink; delay: number }) {
  const Icon = PLATFORM_ICONS[link.platform]
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      variants={fadeInUp}
    >
      <Card className="bg-zinc-900 border-zinc-800 h-full">
        <CardContent className="pt-8 pb-8 flex flex-col items-center gap-4 text-center">
          <div className="p-3 bg-orange-400/10 rounded-full">
            <Icon className="w-6 h-6 text-orange-400" aria-hidden="true" />
          </div>
          <div>
            <p className="text-zinc-400 text-sm mb-1">{link.label}</p>
            <p className="text-zinc-100 font-medium">{link.handle}</p>
          </div>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} de Célida Café — ${link.handle}`}
            className="text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium"
          >
            Ver perfil →
          </a>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Contacto() {
  return (
    <section id="contacto" className="py-20 sm:py-28 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
            Contáctanos
          </h2>
          <p className="text-zinc-400">Encuéntranos en redes o llámanos directamente.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Teléfono */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            variants={fadeInUp}
          >
            <Card className="bg-zinc-900 border-zinc-800 h-full">
              <CardContent className="pt-8 pb-8 flex flex-col items-center gap-4 text-center">
                <div className="p-3 bg-orange-400/10 rounded-full">
                  <Phone className="w-6 h-6 text-orange-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm mb-1">Teléfono</p>
                  <p className="text-zinc-100 font-medium">{BUSINESS_INFO.phone}</p>
                </div>
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`}
                  aria-label={`Llamar a Célida Café al ${BUSINESS_INFO.phone}`}
                  className="text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium"
                >
                  Llamar ahora →
                </a>
              </CardContent>
            </Card>
          </motion.div>

          {/* Redes sociales */}
          {SOCIAL_LINKS.map((link, idx) => (
            <SocialCard key={link.platform} link={link} delay={0.2 + idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
