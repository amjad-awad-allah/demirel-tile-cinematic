import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TileProps {
  position: [number, number, number];
  rotation: [number, number, number];
  delay: number;
  color: string;
  size: [number, number, number];
}

const Tile = ({ position, rotation, delay, color, size }: TileProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  
  const initialPosition = useMemo(() => {
    return [
      position[0] + (Math.random() - 0.5) * 30,
      position[1] - 20,
      position[2] + (Math.random() - 0.5) * 15,
    ] as [number, number, number];
  }, [position]);

  useEffect(() => {
    // Create marble/stone texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Base stone color
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#F3F2EE');
      gradient.addColorStop(0.5, '#E8E5DE');
      gradient.addColorStop(1, '#D9D6CF');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Add marble veins
      ctx.strokeStyle = 'rgba(180, 175, 165, 0.15)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 512, 0);
        ctx.bezierCurveTo(
          Math.random() * 512, Math.random() * 512,
          Math.random() * 512, Math.random() * 512,
          Math.random() * 512, 512
        );
        ctx.stroke();
      }
      
      // Add subtle stone texture
      for (let i = 0; i < 2000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const brightness = Math.random() * 20 + 220;
        ctx.fillStyle = `rgba(${brightness}, ${brightness - 5}, ${brightness - 10}, 0.3)`;
        ctx.fillRect(x, y, 1, 1);
      }
      
      const canvasTexture = new THREE.CanvasTexture(canvas);
      canvasTexture.wrapS = THREE.RepeatWrapping;
      canvasTexture.wrapT = THREE.RepeatWrapping;
      setTexture(canvasTexture);
    }
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const elapsed = state.clock.getElapsedTime();
    const entranceDuration = 3;
    const progress = Math.min((elapsed - delay) / entranceDuration, 1);

    if (progress < 1) {
      // Smooth entrance animation
      const eased = progress * progress * (3 - 2 * progress); // Smoothstep
      meshRef.current.position.x = THREE.MathUtils.lerp(
        initialPosition[0],
        position[0],
        eased
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        initialPosition[1],
        position[1],
        eased
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        initialPosition[2],
        position[2],
        eased
      );

      // Gentle rotation during entrance
      meshRef.current.rotation.x = THREE.MathUtils.lerp(Math.PI * 2, rotation[0], eased);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(Math.PI * 2, rotation[1], eased);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(Math.PI, rotation[2], eased);
    } else {
      // Slow floating animation after entrance (25s cycle)
      const floatTime = (elapsed - delay - entranceDuration) * 0.04;
      const floatOffset = Math.sin(floatTime + delay) * 0.3;
      meshRef.current.position.y = position[1] + floatOffset;
      
      // Very gentle rotation (30s cycle)
      const rotationTime = (elapsed - delay - entranceDuration) * 0.033;
      meshRef.current.rotation.z = rotation[2] + Math.sin(rotationTime + delay) * 0.08;
      meshRef.current.rotation.x = rotation[0] + Math.cos(rotationTime * 0.7 + delay) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={initialPosition} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        map={texture}
        color={color}
        roughness={0.4}
        metalness={0.1}
        envMapIntensity={0.8}
      />
    </mesh>
  );
};

const TileGrid = () => {
  const tiles = useMemo(() => {
    const colors = ['#D9D6CF', '#E8E5DE', '#F3F2EE'];
    const diagonalAngle = (15 * Math.PI) / 180; // 15 degrees
    
    return [
      {
        position: [-4, 2, -2] as [number, number, number],
        rotation: [0.1, 0.1, diagonalAngle] as [number, number, number],
        delay: 0,
        color: colors[0],
        size: [4, 6, 0.3] as [number, number, number],
      },
      {
        position: [3, 3, -1] as [number, number, number],
        rotation: [-0.05, 0.05, diagonalAngle] as [number, number, number],
        delay: 0.3,
        color: colors[1],
        size: [5, 5, 0.3] as [number, number, number],
      },
      {
        position: [-2, -3, 0] as [number, number, number],
        rotation: [0.08, -0.08, diagonalAngle] as [number, number, number],
        delay: 0.6,
        color: colors[2],
        size: [4.5, 5.5, 0.3] as [number, number, number],
      },
      {
        position: [5, -2, 1] as [number, number, number],
        rotation: [-0.1, 0.1, diagonalAngle] as [number, number, number],
        delay: 0.9,
        color: colors[0],
        size: [5, 4, 0.3] as [number, number, number],
      },
      {
        position: [0, 0, -3] as [number, number, number],
        rotation: [0.05, -0.05, diagonalAngle] as [number, number, number],
        delay: 1.2,
        color: colors[1],
        size: [6, 4.5, 0.3] as [number, number, number],
      },
      {
        position: [-5, -1, 2] as [number, number, number],
        rotation: [-0.08, 0.08, diagonalAngle] as [number, number, number],
        delay: 1.5,
        color: colors[2],
        size: [4, 5, 0.3] as [number, number, number],
      },
      {
        position: [2, -4, -1] as [number, number, number],
        rotation: [0.1, -0.1, diagonalAngle] as [number, number, number],
        delay: 1.8,
        color: colors[0],
        size: [5.5, 4.5, 0.3] as [number, number, number],
      },
      {
        position: [-3, 4, 1] as [number, number, number],
        rotation: [-0.05, 0.08, diagonalAngle] as [number, number, number],
        delay: 2.1,
        color: colors[2],
        size: [4.5, 5, 0.3] as [number, number, number],
      },
    ];
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
      {/* Radial gradient fade at edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(248, 249, 250, 0.6) 70%, rgba(248, 249, 250, 0.95) 100%)'
        }}
      />
      
      <Canvas
        camera={{ position: [0, 0, 18], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#f8f9fa']} />
        
        {/* Enhanced Lighting for realistic depth */}
        <ambientLight intensity={0.6} color="#ffffff" />
        <directionalLight
          position={[8, 10, 6]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          color="#fff5e6"
        />
        <directionalLight position={[-8, -5, -4]} intensity={0.5} color="#e8f4ff" />
        <pointLight position={[0, 0, 10]} intensity={0.4} distance={30} color="#ffffff" />
        <hemisphereLight args={['#ffffff', '#b0a8a0', 0.3]} />

        {/* Tiles */}
        <TileGrid />

        {/* Atmospheric fog */}
        <fog attach="fog" args={['#f8f9fa', 18, 40]} />
      </Canvas>
    </div>
  );
};
