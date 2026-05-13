import type { MenuItem, BusinessInfo, SocialLink } from '@/types'

export const LOGO_URL =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/272254599_111214188126865_1887894279816353139_n-mPekrHELOxlnip2vHJ0w1VqWm8NDbs.jpg'

export const FEATURED_IMAGES = {
  chilaquiles:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chilaquiles_verdes-16HdYwmW2oZCzhSE5uzZpbrjJhdkyt.jpg',
  panFrances:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pan_frances_berries-aBzSS2c2Byc1HFUjKyxnD12kTT8qOF.jpg',
  borregoTatemado:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/borrego_tatemado-0EOpmmgHKFagLoQoPwtGEe8XAHt7D9.jpg',
  matchaLatte:
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/matcha_latte-dvfv1K8oVPxglc29AlfKw0XB9VFfdo.jpg',
}

export const MENU_ITEMS: Record<string, MenuItem[]> = {
  maquina: [
    { name: 'Espresso Sencillo', price: 45, description: 'Shot sencillo de espresso con crema perfecta' },
    { name: 'Espresso Doble', price: 55, isPopular: true, description: 'Doble shot de espresso intenso y aromático' },
    { name: 'E. Americano', price: 60, description: 'Espresso diluido con agua caliente, suave y equilibrado' },
    { name: 'Flat White', price: 65, isPopular: true, description: 'Espresso con leche vaporizada, textura aterciopelada' },
    { name: 'Cortado', price: 55, description: 'Espresso cortado con un toque de leche' },
    { name: 'Capuchino', price: 70, description: 'Espresso, leche vaporizada y espuma cremosa' },
    { name: 'Latte', price: 75, description: 'Espresso con abundante leche vaporizada' },
    { name: 'Mocha Mexicano', price: 80, description: 'Espresso con chocolate mexicano y leche' },
    { name: 'Chai', price: 80, description: 'Té chai especiado con leche vaporizada' },
    { name: 'Dirty Chai', price: 90, description: 'Chai latte con un shot de espresso' },
  ],
  frio: [
    { name: 'Latte Frío', price: 80, description: 'Latte helado con espresso y leche fría' },
    { name: 'Chai Frío', price: 85, description: 'Chai especiado servido con hielo' },
    { name: 'Dirty Chai', price: 90, description: 'Chai frío con shot de espresso' },
    { name: 'Cold Brew', price: 85, isPopular: true, description: 'Café infusionado en frío durante 12 horas, suave y refrescante' },
    { name: 'Choco Brew', price: 80, description: 'Cold brew con chocolate artesanal' },
    { name: 'Cold Brew Tonic', price: 90, description: 'Cold brew con agua tónica y un twist cítrico' },
    { name: 'Espressotonic', price: 90, description: 'Espresso con agua tónica, refrescante y único' },
  ],
  metodos: [
    { name: 'Chemex', price: 80, description: 'Método de filtrado que resalta notas frutales y florales' },
    { name: 'V60 Drip', price: 80, description: 'Extracción limpia con cuerpo medio y claridad en sabor' },
  ],
  matcha: [
    { name: 'Matcha Latte', price: 110, isPopular: true, image: FEATURED_IMAGES.matchaLatte, description: 'Matcha ceremonial japonés con leche vaporizada, cremoso y vibrante' },
    { name: 'Matcha Cortado', price: 80, description: 'Matcha con un toque de leche' },
    { name: 'Americano Matcha', price: 90, description: 'Matcha diluido con agua, ligero y refrescante' },
    { name: 'Cold Foam Matcha', price: 110, description: 'Matcha helado con espuma fría de leche' },
    { name: 'Matcha Tonic', price: 100, description: 'Matcha con agua tónica y hielo' },
  ],
  extras: [
    { name: 'Jarabe Toffee', price: 20, description: 'Dulce sabor a caramelo tostado' },
    { name: 'Jarabe Vainilla', price: 20, description: 'Clásico toque de vainilla' },
    { name: 'Leche de Soya', price: 20, description: 'Alternativa vegetal de soya' },
    { name: 'Leche de Almendra', price: 20, description: 'Leche de almendras cremosa' },
    { name: 'Leche de Avena', price: 35, description: 'Leche de avena premium, ideal para latte art' },
  ],
  brunch: [
    { name: 'Huevos Rancheros', price: 185, description: 'Tostada, aguacate, jamón serrano y salsa tatemada' },
    { name: 'Huevos Benedictinos', price: 210, isPopular: true, description: 'Jamón serrano, morrones tatemados y arúgula' },
    { name: 'Huevos Campechanos', price: 195, description: 'Con chicharrón prensado, salsa macha, panela y aguacate' },
    { name: 'Focaccia', price: 160, description: 'Jamón serrano, tomates confitados, albahaca y pesto' },
    { name: 'Mollete', price: 150, description: 'De frijoles, queso, salsa bandera y huevito estrellado' },
    { name: 'Tortita de Doña Quetita', price: 145, description: 'Cochinita pibil, cebolla, habanero y frijoles' },
    { name: 'Avena con Berries', price: 140, description: 'Avena fría, yoghurt, albahaca, granola de pistaches y fruta' },
    { name: 'Hotcakes de Elote', price: 145, description: 'Mantequilla salada y miel de manzanilla' },
    { name: 'Chilaquiles', price: 175, isPopular: true, image: FEATURED_IMAGES.chilaquiles, description: 'Verdes o Rojos con aguacate, queso panela, crema y cebolla blanca' },
    { name: 'Tlacoyos con Machaca', price: 210, description: 'Con machaca de Sonora y guacamole' },
    { name: 'Tlacoyos de Lengua', price: 225, description: 'De lengua en salsa verde y garbanzo' },
    { name: 'Toast de Aguacate', price: 180, description: 'Con tocino, chile de árbol y huevo pochado' },
    { name: 'Borrego Tatemado', price: 245, isPopular: true, image: FEATURED_IMAGES.borregoTatemado, description: 'Aguacate, huevos estrellados y tortillas' },
    { name: 'Papas Confitadas con Tocino', price: 200, description: 'Tocino con crema de poro, romero, arúgula y huevos estrellados' },
    { name: 'Papas Confitadas con Chorizo', price: 200, description: 'Chorizo refrito, salsa de chorizo y huevos estrellados' },
  ],
  brunchExtras: [
    { name: 'Huevo', price: 25, description: 'Huevo al gusto' },
    { name: 'Borrego', price: 70, description: 'Porción extra de borrego tatemado' },
    { name: 'Machaca', price: 55, description: 'Machaca de res estilo Sonora' },
    { name: 'Carnitas', price: 65, description: 'Carnitas de cerdo confitadas' },
    { name: 'Pan', price: 30, description: 'Pan artesanal de la casa' },
    { name: 'Frijoles', price: 35, description: 'Frijoles refritos o de la olla' },
    { name: 'Aguacate', price: 50, description: 'Medio aguacate fresco' },
  ],
  panaderia: [
    { name: 'Pan Francés Maracuyá', price: 200, description: 'Con queso mascarpone' },
    { name: 'Pan Francés Berries', price: 200, isPopular: true, image: FEATURED_IMAGES.panFrances, description: 'Berries, polen y albahaca' },
    { name: 'Tarta de Guayaba', price: 80, description: 'Tarta dulce con guayaba fresca' },
    { name: 'Pan de Plátano', price: 90, description: 'Pan húmedo de plátano maduro' },
    { name: 'Galleta de Plátano y Avena', price: 55, description: 'Galleta saludable sin azúcar refinada' },
    { name: 'Beso de Nuez', price: 30, description: 'Pequeño bocado de nuez caramelizada' },
    { name: 'Galletón', price: 70, description: 'Sabores surtidos' },
  ],
  bebidas: [
    { name: 'Tisanas', price: 60, description: 'Infusiones de hierbas naturales' },
    { name: 'Chocolate de Agua', price: 55, description: 'Chocolate oaxaqueño tradicional' },
    { name: 'Topo Chico 355ml', price: 40, description: 'Agua mineral con gas' },
    { name: 'Topo Chico 750ml', price: 85, description: 'Agua mineral con gas tamaño grande' },
    { name: 'Coca Cola', price: 25, description: 'Refresco de cola' },
    { name: 'Coca Cola Light', price: 25, description: 'Refresco de cola sin azúcar' },
    { name: 'Agua Alho', price: 25, description: 'Agua natural embotellada' },
  ],
  jugos: [
    { name: 'Verde', price: 55, description: 'Jugo verde con apio, pepino, manzana y limón' },
    { name: 'Naranja', price: 55, description: 'Jugo de naranja natural recién exprimido' },
  ],
}

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Célida Café',
  address: 'Ensenada, Baja California, México',
  phone: '646 413 6156',
  mapsUrl: 'https://maps.google.com/?q=Ensenada,+Baja+California,+Mexico',
  hours: {
    weekdays: { open: '7am', close: '8pm', label: 'Lunes - Viernes' },
    weekends: { open: '8am', close: '6pm', label: 'Sábado - Domingo' },
  },
  coordinates: { lat: 31.8667, lng: -116.5964 },
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/celidacafe',
    platform: 'instagram',
    handle: '@celidacafe',
  },
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/share/1BW9UzHmb1/',
    platform: 'facebook',
    handle: 'Célida Café',
  },
]
