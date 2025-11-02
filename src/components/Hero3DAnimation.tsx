import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// Import tile interior photos
import tile1 from '@/assets/hero-tile-1.jpg';
import tile2 from '@/assets/hero-tile-2.jpg';
import tile3 from '@/assets/hero-tile-3.jpg';
import tile4 from '@/assets/hero-tile-4.jpg';
import tile5 from '@/assets/hero-tile-5.jpg';
import tile6 from '@/assets/hero-tile-6.jpg';
import tile7 from '@/assets/hero-tile-7.jpg';
import tile8 from '@/assets/hero-tile-8.jpg';

interface TileProps {
  position: [number, number, number];
  rotation: [number, number, number];
  delay: number;
  color: string;
  size: [number, number, number];
  imageUrl: string;
}

const Tile = ({ position, rotation, delay, color, size, imageUrl }: TileProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  
  const initialPosition = useMemo(() => {
    return [
      position[0] + (Math.random() - 0.5) * 30,
      position[1] - 20,
      position[2] + (Math.random() - 0.5) * 15,
    ] as [number, number, number];
  }, [position]);

  useEffect(() => {
    // Load image texture and apply warm overlay for brand consistency
    const loader = new THREE.TextureLoader();
    loader.load(imageUrl, (loadedTexture) => {
      // Create canvas for overlay effect
      const canvas = document.createElement('canvas');
      const size = 2048;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Draw the loaded image
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          ctx.drawImage(img, 0, 0, size, size);
          
          // Apply warm beige overlay for uniformity (rgba(245,244,242,0.85))
          ctx.fillStyle = 'rgba(245, 244, 242, 0.85)';
          ctx.globalCompositeOperation = 'soft-light';
          ctx.fillRect(0, 0, size, size);
          
          // Subtle vignette for depth
          const vignette = ctx.createRadialGradient(size/2, size/2, size*0.3, size/2, size/2, size*0.7);
          vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
          vignette.addColorStop(1, 'rgba(0, 0, 0, 0.08)');
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = vignette;
          ctx.fillRect(0, 0, size, size);
          
          // Create texture from canvas
          const finalTexture = new THREE.CanvasTexture(canvas);
          finalTexture.wrapS = THREE.ClampToEdgeWrapping;
          finalTexture.wrapT = THREE.ClampToEdgeWrapping;
          finalTexture.anisotropy = 16;
          setTexture(finalTexture);
        };
        img.src = imageUrl;
      }
    });
  }, [imageUrl]);

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
        roughness={0.35}
        metalness={0.05}
        envMapIntensity={1.0}
        transparent={true}
        opacity={Math.max(0.88, depthOpacity)}
      />
    </mesh>
  );
};

const TileGrid = () => {
  const tiles = useMemo(() => {
    // Interior photo textures showcasing Fliesen Demirel craftsmanship
    const tileImages = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8];
    
    // Warm neutral base colors with orange accent on tile 7
    const colors = [
      '#F5F4F2', // Neutral warm base
      '#F5F4F2',
      '#F5F4F2',
      '#F5F4F2',
      '#F5F4F2',
      '#F5F4F2',
      'rgba(232, 117, 43, 0.10)', // Orange accent tile
      '#F5F4F2',
    ];
    const diagonalAngle = (15 * Math.PI) / 180; // 15 degrees
    
    return [
      {
        position: [-4, 2, -2] as [number, number, number],
        rotation: [0.1, 0.1, diagonalAngle] as [number, number, number],
        delay: 0,
        color: colors[0],
        size: [4, 6, 0.3] as [number, number, number],
        imageUrl: tileImages[0],
      },
      {
        position: [3, 3, -1] as [number, number, number],
        rotation: [-0.05, 0.05, diagonalAngle] as [number, number, number],
        delay: 0.4,
        color: colors[1],
        size: [5, 5, 0.3] as [number, number, number],
        imageUrl: tileImages[1],
      },
      {
        position: [-2, -3, 0] as [number, number, number],
        rotation: [0.08, -0.08, diagonalAngle] as [number, number, number],
        delay: 0.8,
        color: colors[2],
        size: [4.5, 5.5, 0.3] as [number, number, number],
        imageUrl: tileImages[2],
      },
      {
        position: [5, -2, 1] as [number, number, number],
        rotation: [-0.1, 0.1, diagonalAngle] as [number, number, number],
        delay: 1.2,
        color: colors[3],
        size: [5, 4, 0.3] as [number, number, number],
        imageUrl: tileImages[3],
      },
      {
        position: [0, 0, -3] as [number, number, number],
        rotation: [0.05, -0.05, diagonalAngle] as [number, number, number],
        delay: 1.6,
        color: colors[4],
        size: [6, 4.5, 0.3] as [number, number, number],
        imageUrl: tileImages[4],
      },
      {
        position: [-5, -1, 2] as [number, number, number],
        rotation: [-0.08, 0.08, diagonalAngle] as [number, number, number],
        delay: 2.0,
        color: colors[5],
        size: [4, 5, 0.3] as [number, number, number],
        imageUrl: tileImages[5],
      },
      {
        position: [2, -4, -1] as [number, number, number],
        rotation: [0.1, -0.1, diagonalAngle] as [number, number, number],
        delay: 2.4,
        color: colors[6],
        size: [5.5, 4.5, 0.3] as [number, number, number],
        imageUrl: tileImages[6],
      },
      {
        position: [-3, 4, 1] as [number, number, number],
        rotation: [-0.05, 0.08, diagonalAngle] as [number, number, number],
        delay: 2.8,
        color: colors[7],
        size: [4.5, 5, 0.3] as [number, number, number],
        imageUrl: tileImages[7],
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
        
        {/* Warm soft lighting for elegant interior showcase */}
        <ambientLight intensity={0.45} color="#FFF6EA" />
        <directionalLight
          position={[-12, 15, 10]}
          intensity={1.1}
          color="#FFF4E6"
          castShadow
          shadow-mapSize={[4096, 4096]}
          shadow-camera-far={50}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
          shadow-bias={-0.00015}
          shadow-radius={10}
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
