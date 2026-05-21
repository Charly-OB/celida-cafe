import { renderHook, act } from '@testing-library/react'
import { useActiveSection } from '@/hooks/useActiveSection'

type IntersectionCallback = (entries: Partial<IntersectionObserverEntry>[]) => void

function mockIntersectionObserver() {
  const callbacks: IntersectionCallback[] = []
  const mockObserve = jest.fn()
  const mockDisconnect = jest.fn()

  global.IntersectionObserver = jest.fn().mockImplementation((cb: IntersectionCallback) => {
    callbacks.push(cb)
    return { observe: mockObserve, disconnect: mockDisconnect, unobserve: jest.fn() }
  }) as unknown as typeof IntersectionObserver

  return { callbacks, mockObserve, mockDisconnect }
}

function addSection(id: string) {
  const el = document.createElement('div')
  el.id = id
  document.body.appendChild(el)
  return () => document.body.removeChild(el)
}

describe('useActiveSection', () => {
  it('returns the first section id as initial active section', () => {
    const { result } = renderHook(() => useActiveSection(['menu', 'galeria']))
    expect(result.current).toBe('menu')
  })

  it('returns empty string when no section ids are provided', () => {
    const { result } = renderHook(() => useActiveSection([]))
    expect(result.current).toBe('')
  })

  it('creates an IntersectionObserver for each existing DOM element', () => {
    const { mockObserve } = mockIntersectionObserver()
    const removeMenu = addSection('menu')
    const removeGaleria = addSection('galeria')

    renderHook(() => useActiveSection(['menu', 'galeria']))

    expect(mockObserve).toHaveBeenCalledTimes(2)
    removeMenu()
    removeGaleria()
  })

  it('skips sections that have no corresponding DOM element', () => {
    const { mockObserve } = mockIntersectionObserver()
    const removeMenu = addSection('menu')

    renderHook(() => useActiveSection(['missing-section', 'menu']))

    expect(mockObserve).toHaveBeenCalledTimes(1)
    removeMenu()
  })

  it('updates active section when an element intersects', () => {
    const { callbacks } = mockIntersectionObserver()
    const removeMenu = addSection('menu')
    const removeGaleria = addSection('galeria')

    const { result } = renderHook(() => useActiveSection(['menu', 'galeria']))

    act(() => {
      callbacks[1]([{ isIntersecting: true } as IntersectionObserverEntry])
    })

    expect(result.current).toBe('galeria')
    removeMenu()
    removeGaleria()
  })

  it('does not update active section when element is not intersecting', () => {
    const { callbacks } = mockIntersectionObserver()
    const removeMenu = addSection('menu')

    const { result } = renderHook(() => useActiveSection(['menu']))

    act(() => {
      callbacks[0]([{ isIntersecting: false } as IntersectionObserverEntry])
    })

    expect(result.current).toBe('menu')
    removeMenu()
  })

  it('disconnects all observers on unmount', () => {
    const { mockDisconnect } = mockIntersectionObserver()
    const removeMenu = addSection('menu')

    const { unmount } = renderHook(() => useActiveSection(['menu']))
    unmount()

    expect(mockDisconnect).toHaveBeenCalledTimes(1)
    removeMenu()
  })
})
