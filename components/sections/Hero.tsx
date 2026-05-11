'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { LOGO_URL, FEATURED_IMAGES } from '@/lib/constants'
import { fadeInUp } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${FEATURED_IMAGES.matchaLatte}')` }}
        role="img"
        aria-label="Fondo decorativo: Matcha Latte de Célida Café"
      />
      <div className="absolute inset-0 bg-zinc-950/70" />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={reduced ? { duration: 0 } : { duration: 0.8 }}
          className="mb-8"
        >
          <Image
            src={LOGO_URL}
            alt="Célida Café"
            width={300}
            height={120}
            className="h-24 sm:h-32 md:h-40 w-auto mx-auto object-contain invert"
            priority
            fetchPriority="high"
          />
        </motion.div>

        <motion.p
          variants={fadeInUp}
          initial={reduced ? 'visible' : 'hidden'}
          animate="visible"
          transition={reduced ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-zinc-300 mb-10 text-pretty"
        >
          Café de especialidad en el corazón de Ensenada.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial={reduced ? 'visible' : 'hidden'}
          animate="visible"
          transition={reduced ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#menu"
            data-tracking="hero_btn"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-400 text-zinc-950 font-semibold rounded-lg hover:bg-orange-300 transition-colors"
          >
            Ver Menú
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
          <a
            href="#visitanos"
            data-tracking="hero_btn"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-zinc-400 text-zinc-100 font-semibold rounded-lg hover:border-orange-400 hover:text-orange-400 transition-colors"
          >
            Cómo Llegar
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduced ? { duration: 0 } : { delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-zinc-500 rounded-full flex justify-center">
          <motion.div
            animate={reduced ? { y: 0 } : { y: [0, 12, 0] }}
            transition={reduced ? {} : { duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
