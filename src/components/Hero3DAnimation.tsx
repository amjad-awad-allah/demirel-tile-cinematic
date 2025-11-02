import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
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
    // Create warm beige marble texture with elegant, natural appearance
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Darker warm marble base gradient (#E2DDD6 → #D6CFC8)
      const baseGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 1024);
      baseGradient.addColorStop(0, '#EBE6DF');
      baseGradient.addColorStop(0.25, '#E2DDD6');
      baseGradient.addColorStop(0.5, '#DDD8D1');
      baseGradient.addColorStop(0.75, '#DAD3CC');
      baseGradient.addColorStop(1, '#D6CFC8');
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, 1024, 1024);
      
      // Enhanced warm marble veining (+15% visibility)
      ctx.globalCompositeOperation = 'multiply';
      for (let i = 0; i < 15; i++) {
        ctx.strokeStyle = `rgba(200, 190, 175, ${0.07 + Math.random() * 0.08})`;
        ctx.lineWidth = 1 + Math.random() * 1.5;
        ctx.beginPath();
        ctx.moveTo(Math.random() * 1024, 0);
        for (let j = 0; j < 5; j++) {
          ctx.bezierCurveTo(
            Math.random() * 1024, Math.random() * 256 * (j + 1),
            Math.random() * 1024, Math.random() * 256 * (j + 1),
            Math.random() * 1024, 256 * (j + 1)
          );
        }
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
      
      // Fine warm crystalline grain (ceramic quality with beige tone)
      for (let i = 0; i < 4500; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const brightness = Math.random() * 15 + 235;
        const warmth = Math.random() * 8;
        const alpha = Math.random() * 0.1 + 0.06;
        ctx.fillStyle = `rgba(${brightness + warmth}, ${brightness}, ${brightness - warmth}, ${alpha})`;
        ctx.fillRect(x, y, 1, 1);
      }
      
      // Natural warm stone speckles (beige/taupe mineral deposits)
      for (let i = 0; i < 120; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const size = Math.random() * 2.5 + 0.8;
        const tone = 195 + Math.random() * 30;
        ctx.fillStyle = `rgba(${tone + 10}, ${tone}, ${tone - 10}, 0.12)`;
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Subtle polished highlights (warm glow)
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 25; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const radius = Math.random() * 35 + 18;
        const highlight = ctx.createRadialGradient(x, y, 0, x, y, radius);
        highlight.addColorStop(0, 'rgba(255, 250, 240, 0.06)');
        highlight.addColorStop(1, 'rgba(255, 250, 240, 0)');
        ctx.fillStyle = highlight;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }
      ctx.globalCompositeOperation = 'source-over';
      
      const canvasTexture = new THREE.CanvasTexture(canvas);
      canvasTexture.wrapS = THREE.RepeatWrapping;
      canvasTexture.wrapT = THREE.RepeatWrapping;
      canvasTexture.anisotropy = 16;
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
      // Premium slow floating animation (30s cycle for natural movement)
      const floatTime = (elapsed - delay - entranceDuration) * 0.033; // 30s cycle
      
      // Gentle vertical oscillation: ±4px equivalent (±0.25 units)
      const floatOffset = Math.sin(floatTime + delay * 2) * 0.25;
      meshRef.current.position.y = position[1] + floatOffset;
      
      // Subtle Y-axis rotation: 0-6° (0-0.105 radians) for premium feel
      const rotationRange = 0.105; // ~6 degrees
      const yRotation = Math.sin(floatTime * 0.7 + delay) * rotationRange;
      meshRef.current.rotation.y = rotation[1] + yRotation;
      
      // Minimal X-axis tilt for natural drift
      const xRotation = Math.cos(floatTime * 0.5 + delay * 1.5) * 0.04;
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
        roughness={0.4}
        metalness={0.05}
        envMapIntensity={1.1}
        transparent={true}
        opacity={Math.max(0.85, depthOpacity)}
      />
    </mesh>
  );
};

const TileGrid = () => {
  const tiles = useMemo(() => {
    // Darker marble palette with enhanced contrast
    const colors = [
      '#E2DDD6', // Primary: Darker warm marble
      '#D6CFC8', // Secondary: Darker warm gray
      '#E2DDD6', // Primary repeated
      '#D6CFC8', // Secondary repeated
      '#E2DDD6', // Primary repeated
      '#D6CFC8', // Secondary repeated
      'rgba(232, 117, 43, 0.10)', // Accent: Orange glow (tile 7, 10% opacity)
      '#E2DDD6', // Primary
    ];
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
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0
        }}
        style={{ background: 'transparent' }}
        shadows="soft"
      >
        <color attach="background" args={['#f8f9fa']} />
        
        {/* HDRI Environment for realistic reflections */}
        <Environment preset="studio" />
        
        {/* Reduced lighting for better contrast and depth */}
        <ambientLight intensity={0.4} color="#FFFAF5" />
        <directionalLight
          position={[-12, 15, 10]}
          intensity={1.1}
          castShadow
          shadow-mapSize={[4096, 4096]}
          shadow-camera-far={50}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
          shadow-bias={-0.00015}
          shadow-radius={10}
          color="#FFF6EA"
        />
        <directionalLight 
          position={[8, -4, -5]} 
          intensity={0.285} 
          color="#FFF9F0" 
        />
        <pointLight 
          position={[-8, 8, 12]} 
          intensity={0.3325} 
          distance={35} 
          color="#FFFCF7"
          castShadow
        />
        <hemisphereLight 
          args={['#FFFCF7', '#D6CFC8', 0.38]} 
        />

        {/* Tiles */}
        <TileGrid />

        {/* Subtle atmospheric fog for depth */}
        <fog attach="fog" args={['#f8f9fa', 20, 45]} />
      </Canvas>
    </div>
  );
};
