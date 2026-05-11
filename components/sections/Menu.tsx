'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import MenuItemCard from '@/components/MenuItem'
import MenuItemDialog from '@/components/MenuItemDialog'
import { MENU_ITEMS } from '@/lib/constants'
import { fadeInUp } from '@/lib/animations'
import type { MenuItem } from '@/types'

function MenuCategory({
  title,
  items,
  onItemClick,
}: {
  title: string
  items: MenuItem[]
  onItemClick: (item: MenuItem) => void
}) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-4">{title}</h3>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {items.map((item, idx) => (
          <MenuItemCard key={idx} item={item} onClick={() => onItemClick(item)} />
        ))}
      </motion.div>
    </div>
  )
}

const CATEGORIES = [
  { id: 'cafeteria', label: 'Cafetería' },
  { id: 'brunch', label: 'Brunch' },
  { id: 'panaderia', label: 'Panadería' },
  { id: 'bebidas', label: 'Bebidas' },
]

export default function Menu() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedItem(null), 200)
  }

  return (
    <section id="menu" className="py-20 sm:py-28 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
            Nuestra Carta
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-4">
            Café de especialidad, brunch artesanal y panadería fresca.
          </p>
          <p className="text-zinc-400 text-sm inline-flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" aria-hidden="true" />
            indica los favoritos de nuestros clientes
          </p>
        </motion.div>

        <Tabs defaultValue="cafeteria" className="w-full">
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide mb-8">
            <TabsList className="bg-zinc-900 border border-zinc-800 w-full sm:w-auto inline-flex">
              {CATEGORIES.map(cat => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="data-[state=active]:bg-zinc-800 data-[state=active]:text-orange-400 text-zinc-400 whitespace-nowrap px-4 py-2 text-sm"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="cafeteria" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <MenuCategory title="Máquina" items={MENU_ITEMS.maquina} onItemClick={handleItemClick} />
                <MenuCategory title="Métodos" items={MENU_ITEMS.metodos} onItemClick={handleItemClick} />
              </div>
              <div>
                <MenuCategory title="Frío" items={MENU_ITEMS.frio} onItemClick={handleItemClick} />
                <MenuCategory title="Matcha" items={MENU_ITEMS.matcha} onItemClick={handleItemClick} />
                <MenuCategory title="Extras" items={MENU_ITEMS.extras} onItemClick={handleItemClick} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="brunch" className="mt-0">
            <MenuCategory title="Platillos" items={MENU_ITEMS.brunch} onItemClick={handleItemClick} />
            <MenuCategory title="Extras" items={MENU_ITEMS.brunchExtras} onItemClick={handleItemClick} />
          </TabsContent>

          <TabsContent value="panaderia" className="mt-0">
            <MenuCategory title="Panadería y Postres" items={MENU_ITEMS.panaderia} onItemClick={handleItemClick} />
          </TabsContent>

          <TabsContent value="bebidas" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              <MenuCategory title="Bebidas" items={MENU_ITEMS.bebidas} onItemClick={handleItemClick} />
              <MenuCategory title="Jugos Naturales" items={MENU_ITEMS.jugos} onItemClick={handleItemClick} />
            </div>
          </TabsContent>
        </Tabs>

        <MenuItemDialog item={selectedItem} isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </section>
  )
}
