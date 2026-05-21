'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FEATURED_IMAGES } from '@/lib/constants'
import { fadeInUp } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const GALLERY_ITEMS = [
  {
    src: FEATURED_IMAGES.chilaquiles,
    video:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video%20chillaquiles-IuPPYAf7CorgWe1HIqJnuG24vpT3Xk.mp4',
    alt: 'Chilaquiles Verdes',
    title: 'Chilaquiles Verdes',
    price: '$175',
  },
  {
    src: FEATURED_IMAGES.panFrances,
    video:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/panfrances-oDlK4lq7BLW5zyvd4Y6wemZi8QhxeB.mp4',
    alt: 'Pan Francés con Berries',
    title: 'Pan Francés Berries',
    price: '$200',
  },
  {
    src: FEATURED_IMAGES.borregoTatemado,
    video:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video%20borrego-Fhgb9GAzqgJlvOsqdbd22qErxctu6P.mp4',
    alt: 'Borrego Tatemado',
    title: 'Borrego Tatemado',
    price: '$245',
  },
  {
    src: FEATURED_IMAGES.matchaLatte,
    video: null,
    alt: 'Matcha Latte',
    title: 'Matcha Latte',
    price: '$110',
  },
]

export default function Gallery() {
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set())
  const reduced = useReducedMotion()

  return (
    <section id="galeria" className="py-20 sm:py-28 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
            Nuestros Favoritos
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Los platillos que más disfrutan nuestros clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              {...(!reduced && {
                initial: 'hidden',
                whileInView: 'visible',
                viewport: { once: true, margin: '-50px' },
                transition: { duration: 0.6, delay: idx * 0.1 },
                variants: fadeInUp,
              })}
              onHoverStart={() => {
                if (item.video) {
                  setLoadedVideos(prev => {
                    const next = new Set(prev)
                    next.add(idx)
                    return next
                  })
                }
              }}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
            >
              <Image
                src={item.src}
                alt=""
                fill
                className={`object-cover transition-opacity duration-500 ${item.video ? 'group-hover:opacity-0' : ''}`}
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {item.video && loadedVideos.has(idx) && (
                <video
                  src={item.video}
                  preload="none"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-zinc-100 font-medium text-sm sm:text-base">{item.title}</h3>
                <p className="text-orange-400 font-semibold text-sm">{item.price}</p>
              </div>

              {item.video && (
                <div className="absolute top-3 right-3 bg-zinc-950/70 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-4 h-4 text-zinc-100"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
