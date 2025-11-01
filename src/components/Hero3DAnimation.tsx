import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TileProps {
  position: [number, number, number];
  color: string;
  scrollY: number;
}

const Tile = ({ position, color, scrollY }: TileProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const randomOffset = useMemo(() => ({
    x: (Math.random() - 0.5) * 3,
    speed: Math.random() * 0.5 + 0.3,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
    floatOffset: Math.random() * Math.PI * 2
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Falling animation based on scroll
    const fallSpeed = scrollY * 0.01 * randomOffset.speed;
    const yPos = position[1] - fallSpeed;
    
    // Reset to top when tile goes too far down
    const resetY = yPos < -20 ? 15 : yPos;
    
    meshRef.current.position.x = position[0] + randomOffset.x + Math.sin(time * 0.3 + randomOffset.floatOffset) * 0.5;
    meshRef.current.position.y = resetY + Math.sin(time * 0.2 + randomOffset.floatOffset) * 0.3;
    meshRef.current.position.z = position[2] + Math.cos(time * 0.3 + randomOffset.floatOffset) * 0.5;
    
    // Gentle rotation
    meshRef.current.rotation.x += randomOffset.rotationSpeed;
    meshRef.current.rotation.y += randomOffset.rotationSpeed * 0.5;
    meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.15]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.2}
        transparent={true}
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const TileGrid = ({ scrollY }: { scrollY: number }) => {
  const tiles = useMemo(() => {
    const result = [];
    const colors = [
      '#e8dcc4', // Beige ceramic
      '#d4c5a9', // Light brown
      '#f5f5f5', // Off white
      '#e0e0e0', // Light gray
      '#c9b8a3', // Warm beige
      '#f0ead6', // Cream
    ];

    // Reduced number of tiles
    for (let i = 0; i < 25; i++) {
      result.push({
        position: [
          (Math.random() - 0.5) * 30,
          Math.random() * 30 - 5,
          (Math.random() - 0.5) * 10 - 5
        ] as [number, number, number],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return result;
  }, []);

  return (
    <>
      {tiles.map((tile, index) => (
        <Tile key={index} {...tile} scrollY={scrollY} />
      ))}
    </>
  );
};

export const Hero3DAnimation = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <directionalLight position={[-5, -5, -5]} intensity={0.2} />
        <pointLight position={[0, 10, 5]} intensity={0.3} color="#f0ead6" />

        <TileGrid scrollY={scrollY} />
      </Canvas>
    </div>
  );
};
