import { render } from '@testing-library/react'
import StructuredData from '@/components/StructuredData'

describe('StructuredData', () => {
  it('renders a JSON-LD script tag', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
  })

  it('contains valid JSON', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(() => JSON.parse(script!.textContent!)).not.toThrow()
  })

  it('has required Schema.org fields', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script!.textContent!)
    expect(data['@context']).toBe('https://schema.org')
    expect(data['@type']).toBe('CafeOrCoffeeShop')
    expect(data.name).toBe('Célida Café')
    expect(data.address.addressLocality).toBe('Ensenada')
    expect(data.address.addressCountry).toBe('MX')
    expect(data.openingHoursSpecification).toHaveLength(2)
  })
})
