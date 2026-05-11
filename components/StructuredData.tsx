export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: 'Célida Café',
    image: 'https://celidacafe.com/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ensenada',
      addressRegion: 'BC',
      addressCountry: 'MX',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 31.8667, longitude: -116.5964 },
    priceRange: '$$',
    servesCuisine: ['Coffee', 'Pastry', 'Brunch'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
