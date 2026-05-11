'use client'
import { motion } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BUSINESS_INFO } from '@/lib/constants'
import { fadeInUp } from '@/lib/animations'

export default function Conversion() {
  return (
    <section id="visitanos" className="py-20 sm:py-28 bg-zinc-950">
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
            Visítanos
          </h2>
          <p className="text-zinc-400">Te esperamos con el café perfecto.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            variants={fadeInUp}
          >
            <Card className="bg-zinc-900 border-zinc-800 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-400/10 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-400" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-zinc-100">Horarios</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">{BUSINESS_INFO.hours.weekdays.label}</span>
                    <span className="text-zinc-100 font-medium">
                      {BUSINESS_INFO.hours.weekdays.open} - {BUSINESS_INFO.hours.weekdays.close}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">{BUSINESS_INFO.hours.weekends.label}</span>
                    <span className="text-zinc-100 font-medium">
                      {BUSINESS_INFO.hours.weekends.open} - {BUSINESS_INFO.hours.weekends.close}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeInUp}
            className="md:col-span-2"
          >
            <Card className="bg-zinc-900 border-zinc-800 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-400/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-400" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-zinc-100">Encuentra tu mesa</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-zinc-400">
                  Ubicados en el corazón de Ensenada, B.C. — a solo pasos de la zona turística.
                  Un espacio acogedor donde el aroma del café recién tostado te da la bienvenida.
                </p>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tracking="maps_cta"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-orange-400 text-zinc-950 font-semibold rounded-lg hover:bg-orange-300 transition-colors"
                >
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                  Abrir en Google Maps
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
