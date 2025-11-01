import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Vec3 = [number, number, number];

interface TileData {
  id: number;
  startPosition: Vec3;
  targetPosition: Vec3;
  rotation: Vec3;
  size: [number, number, number];
  color: string;
  spawnTime: number;
  floatOffset: number;
}

interface TileProps {
  data: TileData;
}

const Tile = ({ data }: TileProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const elapsed = state.clock.getElapsedTime();
    const timeSinceSpawn = elapsed - data.spawnTime;
    
    // Animation phase: falling (2 seconds)
    const fallDuration = 2;
    const progress = Math.min(timeSinceSpawn / fallDuration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // ease out cubic

    if (progress < 1) {
      // Falling animation
      meshRef.current.position.x = THREE.MathUtils.lerp(
        data.startPosition[0],
        data.targetPosition[0],
        easeProgress
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        data.startPosition[1],
        data.targetPosition[1],
        easeProgress
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        data.startPosition[2],
        data.targetPosition[2],
        easeProgress
      );

      // Rotation during fall
      meshRef.current.rotation.x = data.rotation[0] * (1 - easeProgress) * Math.PI * 2;
      meshRef.current.rotation.y = data.rotation[1] * (1 - easeProgress) * Math.PI * 2;
      meshRef.current.rotation.z = data.rotation[2] * (1 - easeProgress);
    } else {
      // Floating animation after landing
      const floatTime = elapsed + data.floatOffset;
      meshRef.current.position.x = data.targetPosition[0] + Math.sin(floatTime * 0.5) * 0.2;
      meshRef.current.position.y = data.targetPosition[1] + Math.sin(floatTime * 0.3) * 0.15;
      meshRef.current.position.z = data.targetPosition[2] + Math.cos(floatTime * 0.4) * 0.2;
      
      // Gentle rotation while floating
      meshRef.current.rotation.x = Math.sin(floatTime * 0.2) * 0.05;
      meshRef.current.rotation.y = Math.cos(floatTime * 0.25) * 0.05;
      meshRef.current.rotation.z = Math.sin(floatTime * 0.15) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} position={data.startPosition}>
      <boxGeometry args={data.size} />
      <meshStandardMaterial
        color={data.color}
        roughness={0.35}
        metalness={0.1}
        envMapIntensity={0.4}
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Ceramic and laminate colors
const TILE_COLORS = [
  '#e9e6df', // light marble
  '#dcd7cf', // warm stone
  '#c9c1b6', // beige ceramic
  '#b59c7a', // sand stone
  '#8b7355', // taupe brown
  '#7b5b3b', // walnut
  '#b28a67', // oak laminate
  '#8a8f9a', // slate gray
  '#a0826d', // terracotta
  '#5d4e37', // dark wood
];

let TILE_ID = 0;

export const Hero3DAnimation = () => {
  const [tiles, setTiles] = useState<TileData[]>([]);
  const lastScrollY = useRef(0);
  const lastSpawnTime = useRef(0);

  const spawnTiles = (count: number, currentTime: number) => {
    const newTiles: TileData[] = [];

    for (let i = 0; i < count; i++) {
      const isPlank = Math.random() < 0.3;
      const width = isPlank ? Math.random() * 2 + 2 : Math.random() * 0.8 + 0.5;
      const height = isPlank ? Math.random() * 0.3 + 0.2 : Math.random() * 0.8 + 0.5;
      const thickness = 0.12;

      // Start position (above viewport)
      const startX = (Math.random() - 0.5) * 30;
      const startY = 20 + Math.random() * 8;
      const startZ = (Math.random() - 0.5) * 12;

      // Target position (random in view)
      const targetX = (Math.random() - 0.5) * 25;
      const targetY = (Math.random() - 0.5) * 16;
      const targetZ = -8 + Math.random() * 12;

      const color = TILE_COLORS[Math.floor(Math.random() * TILE_COLORS.length)];

      newTiles.push({
        id: TILE_ID++,
        startPosition: [startX, startY, startZ],
        targetPosition: [targetX, targetY, targetZ],
        rotation: [Math.random(), Math.random(), Math.random()],
        size: [width, height, thickness],
        color,
        spawnTime: currentTime,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    setTiles((prev) => [...prev, ...newTiles]);
  };

  useEffect(() => {
    // Initial spawn
    spawnTiles(8, 0);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      const now = performance.now() / 1000;

      lastScrollY.current = currentScrollY;

      // Throttle spawning
      if (now - lastSpawnTime.current < 0.15) return;
      
      // Spawn based on scroll intensity
      if (scrollDelta > 30) {
        const spawnCount = Math.min(Math.floor(scrollDelta / 80) + 1, 4);
        spawnTiles(spawnCount, now);
        lastSpawnTime.current = now;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Lights = useMemo(() => (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[8, 10, 8]} intensity={0.6} />
      <directionalLight position={[-6, -5, -6]} intensity={0.3} />
      <pointLight position={[0, 12, 6]} intensity={0.4} color="#b28a67" />
    </>
  ), []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 22], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {Lights}
        {tiles.map((tile) => (
          <Tile key={tile.id} data={tile} />
        ))}
      </Canvas>
    </div>
  );
};
