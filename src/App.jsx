import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import Scene from './components/Scene'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true,
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      wheelMultiplier: 0.6,
    });

    // Make lenis globally available for other components (like 3D Scene) to tap into its scroll event
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.lenis;
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <Preloader onComplete={() => setLoading(false)} />
      
      {!loading && (
        <main className="relative w-full bg-prime-dark overflow-hidden">
          {/* 3D Scene Canvas - Fixed with pointer-events-none so it doesn't block DOM interaction */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10" style={{ mixBlendMode: 'normal' }}>
            <Scene />
          </div>

          {/* Traditional DOM Content layered over/under */}
          <div className="relative z-20 mix-blend-difference pointer-events-none">
             {/* This wrapper can be used for text that blends with the 3D object, wait actually standard text is better for now */}
          </div>

          <div className="relative z-20 pointer-events-auto">
            <HeroSection />
            <FeaturesSection />
            <Footer />
          </div>
        </main>
      )}
    </>
  )
}

export default App
