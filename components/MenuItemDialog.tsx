'use client'
import { memo } from 'react'
import Image from 'next/image'
import { Flame } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import type { MenuItem } from '@/types'

interface Props {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
}

function MenuItemDialog({ item, isOpen, onClose }: Props) {
  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-md sm:max-w-lg overflow-hidden p-0">
        {item.image && (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 500px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
          </div>
        )}
        <div className={`p-6 ${item.image ? '-mt-12 relative z-10' : ''}`}>
          <DialogHeader>
            <DialogTitle className="text-zinc-100 text-xl sm:text-2xl flex items-center gap-2">
              {item.name}
              {item.isPopular && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full">
                  <Flame className="w-3 h-3" aria-hidden="true" />
                  Popular
                </span>
              )}
            </DialogTitle>
            <DialogDescription className="text-zinc-400 mt-2 text-sm sm:text-base">
              {item.description || 'Preparado con ingredientes frescos y de la más alta calidad.'}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-orange-400 font-bold text-2xl">${item.price}</span>
            {!item.image && (
              <span className="text-zinc-400 text-sm">Toca para cerrar</span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default memo(MenuItemDialog)
