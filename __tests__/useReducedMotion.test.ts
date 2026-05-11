import { renderHook, act } from '@testing-library/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function mockMatchMedia(matches: boolean) {
  const listeners: Array<() => void> = []
  const mq = {
    matches,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn((_: string, cb: () => void) => {
      listeners.push(cb)
    }),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    _listeners: listeners,
  }
  Object.defineProperty(window, 'matchMedia', { writable: true, value: jest.fn(() => mq) })
  return mq
}

describe('useReducedMotion', () => {
  it('returns true when prefers-reduced-motion: reduce is set', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  it('returns false when prefers-reduced-motion is not active', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('responds to media query changes', () => {
    const mq = mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)

    act(() => {
      mq.matches = true
      mq._listeners.forEach(cb => cb())
    })
    expect(result.current).toBe(true)
  })
})
