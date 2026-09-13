import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  Environment,
  Sparkles,
} from '@react-three/drei'
import { useRef } from 'react'

function Core() {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime

    // Rotasi otomatis
    meshRef.current.rotation.x = time * 0.15
    meshRef.current.rotation.y = time * 0.25

    // Respons terhadap mouse
    const targetX = state.pointer.x * 0.18
    const targetY = state.pointer.y * 0.12

    meshRef.current.position.x +=
      (targetX - meshRef.current.position.x) * 0.03

    meshRef.current.position.y +=
      (targetY - meshRef.current.position.y) * 0.03
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.4}
      floatIntensity={1.5}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.45, 2]} />

        <meshStandardMaterial
          color="#111111"
          metalness={0.9}
          roughness={0.15}
          emissive="#222222"
          emissiveIntensity={0.8}
        />
      </mesh>
    </Float>
  )
}

function Ring({ rotation }) {
  const ringRef = useRef()

  useFrame((state) => {
    if (!ringRef.current) return

    const targetX = state.pointer.y * 0.08
    const targetY = state.pointer.x * 0.08

    ringRef.current.rotation.x +=
      (rotation[0] + targetX - ringRef.current.rotation.x) * 0.02

    ringRef.current.rotation.y +=
      (rotation[1] + targetY - ringRef.current.rotation.y) * 0.02
  })

  return (
    <mesh ref={ringRef} rotation={rotation}>
      <torusGeometry args={[2, 0.025, 16, 100]} />

      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 45,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />

        <pointLight
          position={[4, 4, 4]}
          intensity={8}
          distance={10}
        />

        <pointLight
          position={[-4, -2, 2]}
          intensity={4}
          distance={8}
        />

        <Core />

        <Ring rotation={[Math.PI / 2.5, 0, 0]} />
        <Ring rotation={[0, Math.PI / 3, 0]} />

        <Sparkles
          count={80}
          scale={7}
          size={2}
          speed={0.4}
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}