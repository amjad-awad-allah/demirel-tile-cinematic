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
    // Create refined marble/stone texture with subtle details
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Base stone gradient (#EAE8E3 → #D9D6CF)
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#EAE8E3');
      gradient.addColorStop(0.4, '#E0DED9');
      gradient.addColorStop(0.7, '#D9D6CF');
      gradient.addColorStop(1, '#D5D3CE');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Add elegant marble veins (subtle and natural)
      ctx.strokeStyle = 'rgba(170, 165, 155, 0.12)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 512, 0);
        ctx.bezierCurveTo(
          Math.random() * 512, Math.random() * 256,
          Math.random() * 512, Math.random() * 256 + 256,
          Math.random() * 512, 512
        );
        ctx.stroke();
      }
      
      // Add fine marble texture (10-20% opacity effect)
      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const brightness = Math.random() * 15 + 225;
        ctx.fillStyle = `rgba(${brightness}, ${brightness - 3}, ${brightness - 6}, 0.15)`;
        ctx.fillRect(x, y, 1, 1);
      }
      
      // Add occasional darker speckles for stone realism
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const size = Math.random() * 2 + 1;
        ctx.fillStyle = 'rgba(180, 175, 170, 0.2)';
        ctx.fillRect(x, y, size, size);
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
      // Slow floating animation after entrance (20s cycle)
      const floatTime = (elapsed - delay - entranceDuration) * 0.05; // 20s cycle
      
      // Vertical movement: ±5px equivalent (±0.3 units)
      const floatOffset = Math.sin(floatTime + delay * 2) * 0.3;
      meshRef.current.position.y = position[1] + floatOffset;
      
      // Subtle Y-axis rotation: 0-8° (0-0.14 radians)
      const rotationRange = 0.14; // ~8 degrees
      const yRotation = Math.sin(floatTime * 0.8 + delay) * rotationRange;
      meshRef.current.rotation.y = rotation[1] + yRotation;
      
      // Very subtle X-axis tilt
      const xRotation = Math.cos(floatTime * 0.6 + delay * 1.5) * 0.05;
      meshRef.current.rotation.x = rotation[0] + xRotation;
      
      meshRef.current.rotation.z = rotation[2];
    }
  });

  // Calculate depth-based opacity for blur effect on far tiles
  const depthOpacity = 1 - Math.abs(position[2]) * 0.08;

  return (
    <mesh ref={meshRef} position={initialPosition} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        map={texture}
        color={color}
        roughness={0.5}
        metalness={0.05}
        envMapIntensity={0.7}
        transparent={true}
        opacity={Math.max(0.75, depthOpacity)}
      />
    </mesh>
  );
};

const TileGrid = () => {
  const tiles = useMemo(() => {
    const colors = ['#EAE8E3', '#E0DED9', '#D9D6CF', '#D5D3CE'];
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
        delay: 0.4,
        color: colors[1],
        size: [5, 5, 0.3] as [number, number, number],
      },
      {
        position: [-2, -3, 0] as [number, number, number],
        rotation: [0.08, -0.08, diagonalAngle] as [number, number, number],
        delay: 0.8,
        color: colors[2],
        size: [4.5, 5.5, 0.3] as [number, number, number],
      },
      {
        position: [5, -2, 1] as [number, number, number],
        rotation: [-0.1, 0.1, diagonalAngle] as [number, number, number],
        delay: 1.2,
        color: colors[0],
        size: [5, 4, 0.3] as [number, number, number],
      },
      {
        position: [0, 0, -3] as [number, number, number],
        rotation: [0.05, -0.05, diagonalAngle] as [number, number, number],
        delay: 1.6,
        color: colors[3],
        size: [6, 4.5, 0.3] as [number, number, number],
      },
      {
        position: [-5, -1, 2] as [number, number, number],
        rotation: [-0.08, 0.08, diagonalAngle] as [number, number, number],
        delay: 2.0,
        color: colors[2],
        size: [4, 5, 0.3] as [number, number, number],
      },
      {
        position: [2, -4, -1] as [number, number, number],
        rotation: [0.1, -0.1, diagonalAngle] as [number, number, number],
        delay: 2.4,
        color: colors[1],
        size: [5.5, 4.5, 0.3] as [number, number, number],
      },
      {
        position: [-3, 4, 1] as [number, number, number],
        rotation: [-0.05, 0.08, diagonalAngle] as [number, number, number],
        delay: 2.8,
        color: colors[3],
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
        shadows
      >
        <color attach="background" args={['#f8f9fa']} />
        
        {/* Refined Lighting: soft directional from top-left with gentle shadows */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight
          position={[-10, 12, 8]}
          intensity={1.0}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-bias={-0.0001}
          color="#fffbf5"
        />
        <directionalLight position={[5, -3, -4]} intensity={0.3} color="#f5f3ef" />
        <pointLight position={[-5, 5, 10]} intensity={0.35} distance={30} color="#ffffff" />
        <hemisphereLight args={['#ffffff', '#d9d6cf', 0.4]} />

        {/* Tiles */}
        <TileGrid />

        {/* Atmospheric fog */}
        <fog attach="fog" args={['#f8f9fa', 18, 40]} />
      </Canvas>
    </div>
  );
};
