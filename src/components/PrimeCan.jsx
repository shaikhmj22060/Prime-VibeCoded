import { useRef } from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function PrimeCan(props) {
  const meshRef = useRef()
  
  // Load texture
  const texture = useTexture('/prime-texture.png')
  texture.colorSpace = THREE.SRGBColorSpace
  
  // Wrap to tile around the cylinder
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.repeat.set(1, 1)

  useFrame((state, delta) => {
    // Subtle idle rotation to show off the 3D aspect continuously
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.6
    }
  })

  return (
    <group {...props}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1, 1, 3.5, 64]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.2} 
          metalness={0.3}
          envMapIntensity={1.5}
        />
        {/* Top rim and top cap */}
        <mesh position={[0, 1.76, 0]}>
          <cylinderGeometry args={[0.98, 1, 0.05, 64]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.78, 0]}>
          <cylinderGeometry args={[0.92, 0.98, 0.02, 64]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Bottom rim */}
        <mesh position={[0, -1.76, 0]}>
          <cylinderGeometry args={[0.95, 1, 0.05, 64]} />
          <meshStandardMaterial color="#e0e0e0" metalness={0.9} roughness={0.2} />
        </mesh>
      </mesh>
    </group>
  )
}
