import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const FeatureLabel = ({ children }) => (
  <p className="font-inter text-[10px] tracking-[0.4em] text-neutral-600 uppercase mb-6">
    {children}
  </p>
)

export default function FeaturesSection() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Feature 1 parallax
  const f1TitleY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const f1TextY  = useTransform(scrollYProgress, [0, 1], [80, -40])

  // Feature 2 parallax (opposing)
  const f2TitleY = useTransform(scrollYProgress, [0, 1], [-40, 60])
  const f2TextY  = useTransform(scrollYProgress, [0, 1], [-20, 80])

  // Divider line scale
  const lineScale = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-neutral-900"
    >

      {/* ── Feature 01: Zero Sugar ── */}
      <div className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-24 border-b border-neutral-900">
        <div className="max-w-7xl w-full mx-auto flex justify-end">
          <div className="w-full md:w-7/12 lg:w-5/12 flex flex-col text-right">
            <FeatureLabel>01 — Formula</FeatureLabel>

            <motion.h2
              className="font-anton text-white uppercase leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: 'clamp(3rem, 7vw, 7.5rem)', y: f1TitleY }}
            >
              Zero<br />Added<br />Sugar
            </motion.h2>

            <motion.p
              style={{ y: f1TextY }}
              className="font-inter text-neutral-400 text-lg leading-relaxed mb-10 font-light"
            >
              Formulated to help you reach your prime. Packed with BCAAs, B Vitamins, Antioxidants, and
              essential electrolytes — hydration without compromise.
            </motion.p>

            {/* Stat pills */}
            <motion.div
              style={{ y: f1TextY }}
              className="flex justify-end gap-6 flex-wrap"
            >
              {[['BCAAs', 'Recovery'], ['B Vitamins', 'Energy'], ['Electrolytes', 'Hydration']].map(([stat, label]) => (
                <div key={stat} className="text-right">
                  <p className="font-anton text-white text-2xl">{stat}</p>
                  <p className="font-inter text-[10px] tracking-[0.3em] text-neutral-600 uppercase">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated divider */}
      <div className="flex justify-center py-0 overflow-hidden h-px">
        <motion.div
          className="h-px bg-neutral-800 w-full"
          style={{ scaleX: lineScale, transformOrigin: 'left' }}
        />
      </div>

      {/* ── Feature 02: Cherry Limeade ── */}
      <div className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-7xl w-full mx-auto flex justify-start">
          <div className="w-full md:w-7/12 lg:w-5/12 flex flex-col text-left">
            <FeatureLabel>02 — Flavor</FeatureLabel>

            <motion.h2
              className="font-anton uppercase leading-[0.9] tracking-tight mb-8 text-[#ff3366]"
              style={{ fontSize: 'clamp(3rem, 7vw, 7.5rem)', y: f2TitleY, color: '#ff3366' }}
            >
              Cherry<br />Limeade
            </motion.h2>

            <motion.p
              style={{ y: f2TextY }}
              className="font-inter text-neutral-300 text-xl leading-relaxed mb-10 font-light"
            >
              Built on a 10% coconut water base. An unbeatable, radically refreshing taste
              engineered for peak performance.
            </motion.p>

            {/* Ingredient callouts */}
            <motion.div
              style={{ y: f2TextY }}
              className="flex flex-col gap-4"
            >
              {[
                ['10%', 'Coconut Water Base'],
                ['0g', 'Added Sugar'],
                ['835mg', 'Electrolytes per serving'],
              ].map(([value, desc]) => (
                <div key={value} className="flex items-baseline gap-4 border-b border-neutral-900 pb-4">
                  <span className="font-anton text-3xl text-white">{value}</span>
                  <span className="font-inter text-xs tracking-[0.3em] text-neutral-500 uppercase">{desc}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  )
}