import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';
import * as THREE from 'three';

interface TileProps {
  position: [number, number, number];
  delay: number;
  color: string;
}

const Tile = ({ position, delay, color }: TileProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => {
    return [
      position[0] + (Math.random() - 0.5) * 20,
      position[1] + Math.random() * 10 + 15,
      position[2] + (Math.random() - 0.5) * 10,
    ] as [number, number, number];
  }, [position]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const elapsed = state.clock.getElapsedTime();
    const progress = Math.min((elapsed - delay) / 2, 1);

    if (progress < 1) {
      // Assembly animation
      meshRef.current.position.x = THREE.MathUtils.lerp(
        initialPosition[0],
        position[0],
        progress
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        initialPosition[1],
        position[1],
        progress
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        initialPosition[2],
        position[2],
        progress
      );

      // Rotation during assembly
      meshRef.current.rotation.x = (1 - progress) * Math.PI * 2;
      meshRef.current.rotation.y = (1 - progress) * Math.PI * 2;
    } else {
      // Wave animation after assembly
      const waveTime = elapsed - delay - 2;
      if (waveTime > 0) {
        const wave = Math.sin(position[0] * 0.3 + position[1] * 0.3 + waveTime * 2) * 0.3;
        meshRef.current.position.z = position[2] + wave;
        
        // Gentle rotation wave
        meshRef.current.rotation.z = Math.sin(position[0] * 0.2 + waveTime) * 0.1;
      } else {
        // Ensure final position
        meshRef.current.position.set(...position);
        meshRef.current.rotation.x = 0;
        meshRef.current.rotation.y = 0;
        meshRef.current.rotation.z = 0;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={initialPosition} castShadow receiveShadow>
        <boxGeometry args={[1.8, 1.8, 0.2]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.1}
          envMapIntensity={0.7}
          transparent={true}
          opacity={0.9}
        />
        <Edges scale={1.002} threshold={15} color={'hsl(0 0% 55%)'} />
      </mesh>
    </Float>
  );
};

const TileGrid = () => {
  const tiles = useMemo(() => {
    const result = [];
const colors = [
  'hsl(35 20% 97%)', 'hsl(30 15% 96%)', 'hsl(40 10% 98%)',
  'hsl(0 0% 96%)', 'hsl(0 0% 98%)', 'hsl(25 8% 97%)'
];



    let delayCounter = 0;
    for (let x = -6; x <= 6; x += 1) {
      for (let y = -4; y <= 4; y += 1) {
        result.push({
          position: [x * 1.9, y * 1.9, 0] as [number, number, number],
          delay: delayCounter * 0.03,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
        delayCounter++;
      }
    }
    return result;
  }, []);

  return (
    <>
      {tiles.map((tile, index) => (
        <Tile key={index} {...tile} />
      ))}
    </>
  );
};

export const Hero3DAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#f8f9fa']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} />
        <pointLight position={[5, 5, 10]} intensity={0.3} color="#ff6b35" />

        {/* Tiles */}
        <TileGrid />

        {/* Subtle fog */}
        <fog attach="fog" args={['#f8f9fa', 15, 35]} />
      </Canvas>
    </div>
  );
};
