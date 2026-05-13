import { render, screen } from '@testing-library/react'
import Contacto from '@/components/sections/Contacto'

describe('Contacto', () => {
  it('renders the section heading', () => {
    render(<Contacto />)
    expect(screen.getByRole('heading', { name: /contáctanos/i })).toBeInTheDocument()
  })

  it('renders the phone number', () => {
    render(<Contacto />)
    expect(screen.getByText('646 413 6156')).toBeInTheDocument()
  })

  it('renders a callable phone link', () => {
    render(<Contacto />)
    const phoneLink = screen.getByRole('link', { name: /llamar a célida café/i })
    expect(phoneLink).toHaveAttribute('href', 'tel:6464136156')
  })

  it('renders Instagram link', () => {
    render(<Contacto />)
    const igLink = screen.getByRole('link', { name: /instagram de célida café/i })
    expect(igLink).toHaveAttribute('href', 'https://www.instagram.com/celidacafe')
    expect(igLink).toHaveAttribute('target', '_blank')
    expect(igLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders Facebook link', () => {
    render(<Contacto />)
    const fbLink = screen.getByRole('link', { name: /facebook de célida café/i })
    expect(fbLink).toHaveAttribute('href', 'https://www.facebook.com/share/1BW9UzHmb1/')
    expect(fbLink).toHaveAttribute('target', '_blank')
  })

  it('has the correct section id for navbar anchor', () => {
    const { container } = render(<Contacto />)
    const section = container.querySelector('#contacto')
    expect(section).toBeInTheDocument()
    expect(section?.tagName).toBe('SECTION')
  })
})
