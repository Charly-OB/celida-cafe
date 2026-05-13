import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import Menu from '@/components/sections/Menu'
import Gallery from '@/components/sections/Gallery'
import Conversion from '@/components/sections/Conversion'
import Contacto from '@/components/sections/Contacto'
import Footer from '@/components/sections/Footer'

export default function CelidaCafePage() {
  return (
    <main className="bg-zinc-950 min-h-screen">
      <Header />
      <Hero />
      <Menu />
      <Gallery />
      <Conversion />
      <Contacto />
      <Footer />
    </main>
  )
}
