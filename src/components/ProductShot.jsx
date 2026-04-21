import { useRef, useEffect, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ProductShot(props) {
  const meshRef = useRef();
  const [aspect, setAspect] = useState(1 / 2.33);

  const texture = useTexture("/CherryLimeade-Front_400x.webp", (tex) => {
    const imgAspect = tex.image.width / tex.image.height;
    setAspect(imgAspect);
  });

  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base idle wobble combined with reactive mouse tracking for 3D depth
      const idleX = Math.sin(state.clock.elapsedTime) * 0.05;
      const idleY = Math.cos(state.clock.elapsedTime * 0.4) * 0.05;

      const mouseX = state.pointer.x * 0.4  ;
      const mouseY = -state.pointer.y * 0.4;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        idleX + mouseY,
        0.1,
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        idleY + mouseX,
        0.1,
      );
    }
  });

  // We scale the plane appropriately
  const height = 4.5;
  const width = height * aspect;

  return (
    <group {...props}>
      <mesh ref={meshRef}>
        <planeGeometry args={[width, height, 32, 32]} />
        {/* Adjusted values to prevent image wash-out / glare while maintaining depth */}
        <meshPhysicalMaterial
          map={texture}
          transparent={true}
          roughness={0.4}
          metalness={0.0}
          clearcoat={0.0}
          envMapIntensity={0.6}
          side={THREE.DoubleSide}
          alphaTest={0.5}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
