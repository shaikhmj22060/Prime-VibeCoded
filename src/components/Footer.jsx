import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'motion/react'
import { useRef, useState } from 'react'

const NavLink = ({ children }) => (
  <li className="font-inter text-[10px] tracking-[0.35em] text-neutral-500 uppercase hover:text-white cursor-pointer transition-colors duration-300">
    {children}
  </li>
)

export default function Footer() {
  const footerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  })

  const logoScale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const logoY     = useTransform(scrollYProgress, [0, 1], [80, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  const maskImage = useMotionTemplate`radial-gradient(20vw circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`

  function handleMouseMove({ clientX, clientY, currentTarget }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <footer
      ref={footerRef}
      className="flex flex-col px-6 md:px-16 lg:px-24 pb-10 pt-0 relative overflow-hidden bg-transparent border-t border-neutral-900"
    >

      {/* ── Top: newsletter + links ── */}
      <div className="py-16 md:py-20 flex flex-col md:flex-row justify-between gap-16 max-w-7xl mx-auto w-full">

        {/* Newsletter */}
        <div className="w-full md:w-5/12 lg:w-4/12">
          <p className="font-inter text-[10px] tracking-[0.4em] text-neutral-600 uppercase mb-6">
            Stay in the loop
          </p>
          <h3 className="font-anton text-white text-4xl md:text-5xl uppercase leading-tight mb-4">
            Join The<br />Prime Team
          </h3>
          <p className="font-inter text-neutral-500 text-sm leading-relaxed mb-8">
            New flavors, exclusive gear drops, and hydration intel — delivered to your inbox.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent border border-neutral-800 text-white px-5 py-4 w-full font-inter text-sm focus:outline-none focus:border-[#ff3366] transition-colors placeholder:text-neutral-700"
            />
            <button className="bg-[#ff3366] text-white font-anton uppercase px-8 py-4 text-sm tracking-widest hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap">
              Join
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-16 md:gap-24 mt-2">
          <div>
            <p className="font-inter text-[9px] tracking-[0.4em] text-neutral-700 uppercase mb-6">Menu</p>
            <ul className="flex flex-col gap-5">
              <NavLink>Shop</NavLink>
              <NavLink>About</NavLink>
              <NavLink>Find Us</NavLink>
              <NavLink>Stockists</NavLink>
            </ul>
          </div>
          <div>
            <p className="font-inter text-[9px] tracking-[0.4em] text-neutral-700 uppercase mb-6">Legal</p>
            <ul className="flex flex-col gap-5">
              <NavLink>Terms</NavLink>
              <NavLink>Privacy</NavLink>
              <NavLink>Contact</NavLink>
              <NavLink>Cookies</NavLink>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Massive logotype ── */}
      <motion.div
        style={{ scale: logoScale, y: logoY }}
        className="relative w-full max-w-7xl mx-auto"
      >
        <div
          className="relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Outlined base */}
          <h1
            className="font-anton text-transparent uppercase select-none cursor-default leading-none text-center"
            style={{
              fontSize: 'clamp(6rem, 19vw, 20rem)',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              lineHeight: 0.9,
              paddingTop: '0.05em',
              paddingBottom: '0.05em',
            }}
          >
            PRIME
          </h1>

          {/* Spotlight hover fill */}
          <motion.h1
            className="font-anton text-[#ff3366] uppercase select-none cursor-default leading-none text-center absolute inset-0 pointer-events-none"
            style={{
              fontSize: 'clamp(6rem, 19vw, 20rem)',
              lineHeight: 0.9,
              paddingTop: '0.05em',
              paddingBottom: '0.05em',
              maskImage,
              WebkitMaskImage: maskImage,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          >
            PRIME
          </motion.h1>
        </div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <div className="mt-6 pt-6 border-t border-neutral-900 flex justify-between items-center w-full max-w-7xl mx-auto">
        <p className="font-inter text-[9px] tracking-[0.3em] text-neutral-700 uppercase">
          © 2026 Prime Hydration, LLC
        </p>
        <button
          className="font-inter text-[9px] tracking-[0.3em] text-neutral-700 uppercase hover:text-white transition-colors duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to Top ↑
        </button>
      </div>

    </footer>
  )
}