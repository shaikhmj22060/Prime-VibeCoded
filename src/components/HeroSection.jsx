import { motion } from 'motion/react'

const ease = [0.16, 1, 0.3, 1]

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center relative px-6 md:px-16 lg:px-24 pt-28 pb-16">

      {/* Background watermark — subtle, large */}
      <div
        className="absolute inset-0 z-0 flex flex-col justify-center items-center pointer-events-none select-none overflow-hidden"
        style={{ gap: 0 }}
      >
        <h2
          className="font-anton text-transparent leading-none m-0 whitespace-nowrap"
          style={{
            fontSize: '22vw',
            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          }}
        >
          ENERGY
        </h2>
        <h2
          className="font-anton text-transparent leading-none m-0 whitespace-nowrap"
          style={{
            fontSize: '22vw',
            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          }}
        >
          HYDRATION
        </h2>
      </div>

      {/* Main content */}
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="flex flex-col items-start max-w-5xl">

          {/* Eyebrow label */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease }}
          >
            <span className="block w-8 h-px bg-[#d1ff1a]" />
            <p className="font-inter text-[#d1ff1a] text-xs tracking-[0.4em] uppercase font-semibold">
              Next Generation Hydration
            </p>
          </motion.div>

          {/* Hero headline — clipped reveal */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="font-anton uppercase leading-[0.92] tracking-tight text-white"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9.5rem)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.15, delay: 1.15, ease }}
            >
              REFUELED.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="font-anton uppercase leading-[0.92] tracking-tight"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 9.5rem)',
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255,255,255,0.55)',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.15, delay: 1.28, ease }}
            >
              REVIVED.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-14">
            <motion.h1
              className="font-anton uppercase leading-[0.92] tracking-tight text-[#ff3366]"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9.5rem)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.15, delay: 1.41, ease }}
            >
              PRIME.
            </motion.h1>
          </div>

          {/* CTA row */}
          <motion.div
            className="flex items-center gap-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7, ease }}
          >
            <button className="px-10 py-4 bg-white text-[#0a0a0a] font-anton text-lg uppercase tracking-[0.15em] hover:bg-[#ff3366] hover:text-white transition-colors duration-300">
              Shop Cherry Limeade
            </button>
            <button className="font-inter text-xs tracking-[0.35em] text-neutral-500 uppercase hover:text-white transition-colors duration-300 flex items-center gap-2">
              <span>Explore Flavors</span>
              <span className="text-base leading-none">→</span>
            </button>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <p className="font-inter text-[9px] tracking-[0.4em] text-neutral-600 uppercase">Scroll</p>
        <motion.div
          className="w-px h-10 bg-neutral-700 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', repeatDelay: 0.4 }}
        />
      </motion.div>

    </section>
  )
}