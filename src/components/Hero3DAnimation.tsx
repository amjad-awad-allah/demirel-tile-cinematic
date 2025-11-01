import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Data type for spawned tiles
type Vec3 = [number, number, number];
interface SpawnedTile {
  id: number;
  position: Vec3;
  velocity: Vec3;
  rotation: Vec3;
  angular: Vec3; // angular velocity
  size: [number, number, number];
  color: string;
  bornAt: number;
}

interface TileProps {
  data: SpawnedTile;
  onDie: (id: number) => void;
}

const Tile = ({ data, onDie }: TileProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pos = useRef<THREE.Vector3>(new THREE.Vector3(...data.position));
  const vel = useRef<THREE.Vector3>(new THREE.Vector3(...data.velocity));
  const rot = useRef<THREE.Euler>(new THREE.Euler(...data.rotation));
  const ang = useRef<THREE.Vector3>(new THREE.Vector3(...data.angular));
  const bornAt = useRef<number>(data.bornAt);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Physics-like update
    vel.current.y -= 3.5 * delta; // gravity
    pos.current.addScaledVector(vel.current, delta);

    rot.current.x += ang.current.x * delta;
    rot.current.y += ang.current.y * delta;
    rot.current.z += ang.current.z * delta;

    // Apply to mesh
    meshRef.current.position.copy(pos.current);
    meshRef.current.rotation.copy(rot.current);

    // Kill conditions: out of bounds or too old
    const age = state.clock.getElapsedTime() - bornAt.current;
    if (pos.current.y < -24 || age > 14) {
      onDie(data.id);
    }
  });

  return (
    <mesh ref={meshRef} position={data.position} rotation={data.rotation}>
      <boxGeometry args={data.size} />
      <meshStandardMaterial
        color={data.color}
        roughness={0.35}
        metalness={0.06}
        envMapIntensity={0.4}
        transparent
        opacity={0.65}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Colors inspired by ceramic tiles and laminate wood tones
const CERAMIC_PALETTE = [
  '#e9e6df', // light marble
  '#dcd7cf', // warm stone
  '#c9c1b6', // beige ceramic
  '#b59c7a', // sand stone
  '#8b7355', // taupe brown
  '#7b5b3b', // walnut
  '#b28a67', // oak
  '#8a8f9a', // slate gray
  '#a0826d', // terracotta light
  '#3f3f3f', // charcoal
];

let TILE_ID = 1;

export const Hero3DAnimation = () => {
  const [tiles, setTiles] = useState<SpawnedTile[]>([]);
  const lastScrollY = useRef<number>(0);
  const lastSpawnAt = useRef<number>(0);
  const MAX_TILES = 48;

  // Spawn helper
  const spawnTiles = (count: number, direction: number) => {
    const now = performance.now();
    const newTiles: SpawnedTile[] = [];

    for (let i = 0; i < count; i++) {
      const isPlank = Math.random() < 0.35; // some tiles as laminate planks
      const width = isPlank ? (Math.random() * 0.4 + 0.2) * 4 : Math.random() * 0.4 + 0.6;
      const height = isPlank ? Math.random() * 0.2 + 0.2 : Math.random() * 0.4 + 0.6;
      const thickness = isPlank ? 0.08 : 0.12;

      const x = (Math.random() - 0.5) * 28; // spread horizontally
      const y = 16 + Math.random() * 6; // start above view
      const z = -6 + Math.random() * 8; // slight depth variance

      // Velocity influenced by scroll direction and randomness
      const vY = (Math.random() * 3 + 3) * (direction >= 0 ? 1 : 0.7);
      const vX = (Math.random() - 0.5) * 0.6;
      const vZ = (Math.random() - 0.5) * 0.4;

      const color = CERAMIC_PALETTE[(Math.random() * CERAMIC_PALETTE.length) | 0];

      newTiles.push({
        id: TILE_ID++,
        position: [x, y, z],
        velocity: [vX, -vY, vZ],
        rotation: [Math.random() * 0.2, Math.random() * 0.2, Math.random() * 0.2],
        angular: [
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 1.0,
        ],
        size: [width, height, thickness],
        color,
        bornAt: now / 1000,
      });
    }

    setTiles((prev) => {
      const merged = [...prev, ...newTiles];
      // Limit max tiles, drop oldest
      return merged.length > MAX_TILES ? merged.slice(merged.length - MAX_TILES) : merged;
    });
  };

  // Spawn new tiles on scroll, with throttling
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - (lastScrollY.current || 0);
      lastScrollY.current = current;

      const now = performance.now();
      if (now - lastSpawnAt.current < 60) return; // throttle ~60ms
      lastSpawnAt.current = now;

      const intensity = Math.min(5, Math.floor(Math.abs(delta) / 120) + 1);
      if (intensity > 0) spawnTiles(intensity, Math.sign(delta));
    };

    // Initial gentle spawn to show effect
    spawnTiles(6, 1);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDie = (id: number) => {
    setTiles((prev) => prev.filter((t) => t.id !== id));
  };

  // Memo lights so they don't re-create
  const Lights = useMemo(() => {
    return (
      <>
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 6]} intensity={0.7} color={new THREE.Color('#ffffff')} />
        <directionalLight position={[-6, -4, -6]} intensity={0.25} color={new THREE.Color('#d3c7ba')} />
        <pointLight position={[0, 10, 4]} intensity={0.35} color={new THREE.Color('#b28a67')} />
      </>
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 22], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {Lights}
        {tiles.map((t) => (
          <Tile key={t.id} data={t} onDie={handleDie} />
        ))}
      </Canvas>
    </div>
  );
};
