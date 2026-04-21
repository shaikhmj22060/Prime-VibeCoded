import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(() => onComplete(), 900);
          }, 300);
          return 100;
        }
        // Ease-in-out feel: fast start, slow middle, fast end
        const remaining = 100 - p;
        const increment = Math.max(0.4, Math.min(2.5, remaining * 0.04 + 0.8));
        return Math.min(100, p + increment);
      });
    }, 16);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col"
      animate={done ? { clipPath: 'inset(0 0 100% 0)' } : { clipPath: 'inset(0 0 0% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Top bar: brand + counter */}
      <div className="flex justify-between items-start px-8 md:px-16 pt-10">
        <motion.p
          className="font-inter text-[10px] tracking-[0.35em] text-neutral-600 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Prime Hydration
        </motion.p>
        <motion.p
          className="font-inter text-[10px] tracking-[0.3em] text-neutral-600 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          © 2026
        </motion.p>
      </div>

      {/* Center: massive stacked text */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative select-none">
          {/* Outlined ghost text */}
          <h1
            className="font-anton uppercase leading-none text-transparent"
            style={{
              fontSize: 'clamp(5rem, 18vw, 16rem)',
              WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            }}
          >
            PRIME
          </h1>

          {/* Filled reveal — bottom to top */}
          <motion.h1
            className="font-anton uppercase leading-none text-white absolute inset-0"
            style={{
              fontSize: 'clamp(5rem, 18vw, 16rem)',
              clipPath: `inset(${100 - progress}% 0 0 0)`,
            }}
          >
            PRIME
          </motion.h1>

          {/* Accent color overlay at fill boundary */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-[#ff3366]"
            style={{
              bottom: `${progress}%`,
              opacity: progress > 2 && progress < 98 ? 1 : 0,
            }}
            transition={{ duration: 0 }}
          />
        </div>
      </div>

      {/* Bottom: progress bar + label */}
      <div className="px-8 md:px-16 pb-10 flex flex-col gap-4">
        {/* Thin progress bar */}
        <div className="w-full h-px bg-neutral-900 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#ff3366]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0 }}
          />
        </div>

        <div className="flex justify-between items-center">
          <motion.p
            className="font-inter text-[10px] tracking-[0.3em] text-neutral-600 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Loading experience
          </motion.p>
          <p className="font-inter text-[10px] tracking-[0.2em] text-neutral-500 tabular-nums">
            {String(Math.floor(progress)).padStart(3, '0')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}