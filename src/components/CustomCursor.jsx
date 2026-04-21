import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Dot: snappy, follows instantly
  const dotX = useSpring(mouseX, { damping: 30, stiffness: 600, mass: 0.2 })
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 600, mass: 0.2 })

  // Ring: trails with lag for premium feel
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 200, mass: 0.8 })
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 200, mass: 0.8 })

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e) => {
      const el = e.target
      const interactive =
        el.tagName === 'BUTTON' ||
        el.tagName === 'A' ||
        el.closest('button') ||
        el.closest('a') ||
        el.classList.contains('cursor-pointer') ||
        el.closest('[data-cursor="pointer"]')
      setIsHovering(!!interactive)
    }

    const onDown = () => setIsClicking(true)
    const onUp   = () => setIsClicking(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [mouseX, mouseY])

  // Sizes
  const dotSize = isClicking ? 6 : 5
  const ringSize = isHovering ? 48 : isClicking ? 20 : 32

  return (
    <>
      {/* Inner dot — sharp, fast */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[200] hidden md:block mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          backgroundColor: '#ffffff',
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring — lagging, expansive */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[199] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          border: isHovering ? '1px solid rgba(255,51,102,0.7)' : '1px solid rgba(209,255,26,0.35)',
          backgroundColor: isHovering ? 'rgba(255,51,102,0.06)' : 'transparent',
        }}
        animate={{ width: ringSize, height: ringSize, marginLeft: -ringSize / 2, marginTop: -ringSize / 2 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  )
}