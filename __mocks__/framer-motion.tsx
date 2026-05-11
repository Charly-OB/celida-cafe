import React from 'react'

type AnyProps = Record<string, unknown> & { children?: React.ReactNode }

const strip = ({
  animate, initial, exit, variants, transition,
  whileHover, whileTap, whileInView, onHoverStart, onHoverEnd, viewport,
  children, ...rest
}: AnyProps) => ({ rest, children })

const make = (tag: keyof React.JSX.IntrinsicElements) =>
  React.forwardRef<Element, AnyProps>((props, ref) => {
    const { rest, children } = strip(props)
    return React.createElement(tag, { ...rest, ref }, children)
  })

export const motion = {
  div: make('div'),
  button: make('button'),
  p: make('p'),
  span: make('span'),
  section: make('section'),
  nav: make('nav'),
  header: make('header'),
  footer: make('footer'),
  a: make('a'),
  img: make('img'),
  ul: make('ul'),
  li: make('li'),
}

export const AnimatePresence = ({ children }: { children?: React.ReactNode }) => <>{children}</>
