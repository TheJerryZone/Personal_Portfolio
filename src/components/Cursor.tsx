import { useEffect, useRef, useState } from 'react'

type CursorState = 'default' | 'link' | 'view' | 'explore'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('default')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(hasFinePointer)
    if (!hasFinePointer) return

    document.documentElement.classList.add('has-cursor')

    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY + 26}px) translate(-50%, -50%)`
      }
      const target = e.target as HTMLElement
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor')
      if (cursorAttr === 'view') setState('view')
      else if (cursorAttr === 'explore') setState('explore')
      else if (target.closest('a, button, [role="button"]')) setState('link')
      else setState('default')
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  if (!enabled) return null

  const size = state === 'view' || state === 'explore' ? 64 : state === 'link' ? 14 : 8

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: size,
          height: size,
          transition: 'width 0.2s ease, height 0.2s ease',
          background: state === 'view' || state === 'explore' ? 'transparent' : undefined,
        }}
      />
      <div ref={labelRef} className="cursor-label">
        {state === 'view' ? 'VIEW' : state === 'explore' ? 'EXPLORE' : ''}
      </div>
    </>
  )
}
