export interface MenuItem {
  name: string
  price: number
  description?: string
  isPopular?: boolean
  image?: string
}

export interface BusinessInfo {
  name: string
  address: string
  mapsUrl: string
  hours: {
    weekdays: { open: string; close: string; label: string }
    weekends: { open: string; close: string; label: string }
  }
  coordinates: { lat: number; lng: number }
}

export interface SocialLink {
  label: string
  url: string
}
