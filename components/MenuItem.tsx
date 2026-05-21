'use client'
import { memo } from 'react'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'
import type { MenuItem as MenuItemType } from '@/types'

interface Props {
  item: MenuItemType
  onClick: () => void
}

function MenuItem({ item, onClick }: Props) {
  return (
    <motion.button
      variants={fadeInUp}
      onClick={onClick}
      aria-label={`Ver detalles de ${item.name}${item.isPopular ? ', popular' : ''}`}
      className="w-full flex items-start justify-between py-3 border-b border-zinc-800/50 last:border-b-0 hover:bg-zinc-800/30 px-2 -mx-2 rounded-lg transition-colors text-left cursor-pointer group"
    >
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2">
          <h3 className="text-zinc-100 font-medium text-sm sm:text-base group-hover:text-orange-400 transition-colors">
            {item.name}
          </h3>
          {item.isPopular && (
            <Flame className="w-4 h-4 text-orange-400 flex-shrink-0" aria-hidden="true" />
          )}
          {item.image && (
            <span className="text-xs text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded">FOTO</span>
          )}
        </div>
        {item.description && (
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 line-clamp-1">{item.description}</p>
        )}
      </div>
      <span className="text-orange-400 font-semibold tabular-nums text-sm sm:text-base">${item.price}</span>
    </motion.button>
  )
}

export default memo(MenuItem)
