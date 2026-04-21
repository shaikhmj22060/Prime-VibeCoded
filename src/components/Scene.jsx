import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import ProductShot from './ProductShot'
import { Suspense, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

function ScrollControlsWrapper() {
  const groupRef = useRef()
  const [maxScroll, setMaxScroll] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setMaxScroll(Math.max(1, document.body.scrollHeight - window.innerHeight));
    };
    
    handleResize();
    const timeout = setTimeout(handleResize, 500); 
    
    window.addEventListener('resize', handleResize);
    const observer = new MutationObserver(handleResize);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    }
  }, []);

  useFrame(() => {
    if (!groupRef.current) return
    
    const currentScroll = window.lenis?.scroll || window.scrollY || 0;
    const scrollY = Math.min(1, Math.max(0, currentScroll / maxScroll));

    let targetY = 0; 
    let targetX = 2.5;
    let targetRotZ = 0.05;
    let targetRotX = 0;

    if (scrollY < 0.3) {
       const p = scrollY / 0.3;
       targetX = THREE.MathUtils.lerp(3.2, -3.2, p);
       targetRotZ = THREE.MathUtils.lerp(0.05, -0.15, p);
    } else if (scrollY < 0.7) {
       const p = (scrollY - 0.3) / 0.4;
       targetX = THREE.MathUtils.lerp(-3.2, 3.2, p);
       targetRotZ = THREE.MathUtils.lerp(-0.15, 0.15, p);
    } else {
       const p = (scrollY - 0.7) / 0.3;
       targetX = THREE.MathUtils.lerp(3.2, 0, p);
       targetRotZ = THREE.MathUtils.lerp(0.15, 0, p);
       // Instead of a violent 8-unit jump, it softly glides upward just out of the frame
       targetY = THREE.MathUtils.lerp(0, 3, p); 
    }

    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.08)
  })

  return (
    <group ref={groupRef} position={[2.5, 0, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.6}>
        <ProductShot scale={1.2} />
      </Float>
    </group>
  )
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: true, alpha: true }}>
      {/* Clean, pure white lighting to avoid artificial glowing tints on the product */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 5, 10]} intensity={1} color="#ffffff" />
      
      <spotLight position={[-10, 5, -5]} angle={0.5} penumbra={1} intensity={0.8} color="#ffffff" />
      <spotLight position={[10, -5, -5]} angle={0.5} penumbra={1} intensity={0.4} color="#ffffff" />
      
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <ScrollControlsWrapper />
      </Suspense>
    </Canvas>
  )
}
