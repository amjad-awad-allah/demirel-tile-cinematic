import { useRef, useMemo, useEffect, useState } from 'react';
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
  const [roughnessMap, setRoughnessMap] = useState<THREE.CanvasTexture | null>(null);
  
  const initialPosition = useMemo(() => {
    return [
      position[0] + (Math.random() - 0.5) * 20,
      position[1] + Math.random() * 10 + 15,
      position[2] + (Math.random() - 0.5) * 10,
    ] as [number, number, number];
  }, [position]);

  useEffect(() => {
    // Create subtle ceramic pattern for roughness
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Base gray for roughness map
      ctx.fillStyle = '#888888';
      ctx.fillRect(0, 0, 256, 256);
      
      // Add very subtle noise pattern for ceramic texture
      for (let i = 0; i < 1200; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const brightness = Math.random() * 60 + 100;
        ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
        ctx.fillRect(x, y, 2, 2);
      }
      
      // Add subtle diagonal lines for ceramic feel
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 40, 0);
        ctx.lineTo(i * 40 + 256, 256);
        ctx.stroke();
      }
      
      const canvasTexture = new THREE.CanvasTexture(canvas);
      canvasTexture.wrapS = THREE.RepeatWrapping;
      canvasTexture.wrapT = THREE.RepeatWrapping;
      setRoughnessMap(canvasTexture);
    }
  }, []);

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
          roughnessMap={roughnessMap}
          roughness={0.2}
          metalness={0.3}
          envMapIntensity={1.4}
          transparent={true}
          opacity={0.9}
        />
        <Edges scale={1.002} threshold={15} color={'hsl(0 0% 60%)'} />
      </mesh>
    </Float>
  );
};

const TileGrid = () => {
  const tiles = useMemo(() => {
    const result = [];
const colors = [
  'hsla(35, 15%, 88%, 0.9)',
  'hsla(30, 12%, 86%, 0.9)',
  'hsla(40, 10%, 90%, 0.9)',
  'hsla(0, 0%, 87%, 0.9)',
  'hsla(0, 0%, 89%, 0.9)',
  'hsla(25, 8%, 85%, 0.9)'
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
