import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
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
      // Ensure final position
      meshRef.current.position.set(...position);
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.y = 0;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={initialPosition} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.95, 0.15]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

const TileGrid = () => {
  const tiles = useMemo(() => {
    const result = [];
    const colors = [
      '#ffffff', '#fefefe', '#f9f9f9', '#f5f5f5',
      '#f0f0f0', '#ebebeb', '#e8e8e8', '#d9d9d9',
      '#cccccc', '#f7f7f7'
    ];

    let delayCounter = 0;
    for (let x = -6; x <= 6; x += 1) {
      for (let y = -4; y <= 4; y += 1) {
        result.push({
          position: [x * 1.05, y * 1.05, 0] as [number, number, number],
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
        <color attach="background" args={['#1A1E24']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <pointLight position={[0, 0, 10]} intensity={0.5} color="#ff6b35" />

        {/* Tiles */}
        <TileGrid />

        {/* Environment effect */}
        <fog attach="fog" args={['#1A1E24', 10, 30]} />
      </Canvas>
    </div>
  );
};
