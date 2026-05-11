import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/sections/Header'

describe('Header', () => {
  it('renders all desktop navigation links', () => {
    render(<Header />)
    expect(screen.getAllByText('Menú').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Galería').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Visítanos').length).toBeGreaterThan(0)
  })

  it('mobile menu button has accessible aria-label when closed', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toBeInTheDocument()
  })

  it('mobile menu button toggles aria-label on open', async () => {
    render(<Header />)
    const btn = screen.getByRole('button', { name: 'Abrir menú' })
    await userEvent.click(btn)
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toBeInTheDocument()
  })

  it('nav links point to the correct section anchors', () => {
    render(<Header />)
    const menuLinks = screen.getAllByRole('link', { name: 'Menú' })
    expect(menuLinks[0]).toHaveAttribute('href', '#menu')
  })
})
