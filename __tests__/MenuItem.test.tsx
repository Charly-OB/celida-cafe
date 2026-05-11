import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MenuItem from '@/components/MenuItem'

const mockItem = {
  name: 'Espresso Doble',
  price: 55,
  description: 'Doble shot de espresso intenso y aromático',
  isPopular: true,
}

describe('MenuItem', () => {
  it('renders item name and price', () => {
    render(<MenuItem item={mockItem} onClick={() => {}} />)
    expect(screen.getByText('Espresso Doble')).toBeInTheDocument()
    expect(screen.getByText('$55')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<MenuItem item={mockItem} onClick={() => {}} />)
    expect(screen.getByText('Doble shot de espresso intenso y aromático')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn()
    render(<MenuItem item={mockItem} onClick={handleClick} />)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('has descriptive aria-label including popular status', () => {
    render(<MenuItem item={mockItem} onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Ver detalles de Espresso Doble, popular',
    )
  })

  it('aria-label omits popular when item is not popular', () => {
    render(<MenuItem item={{ ...mockItem, isPopular: false }} onClick={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Ver detalles de Espresso Doble',
    )
  })
})
