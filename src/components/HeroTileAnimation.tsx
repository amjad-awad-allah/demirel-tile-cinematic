import { useEffect, useRef, useState } from 'react';

interface Tile {
  x: number;
  y: number;
  delay: number;
  pattern: number;
  floatOffset: number;
  floatSpeed: number;
  seed: number; // For consistent patterns
}

export const HeroTileAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationPhase, setAnimationPhase] = useState<'assembling' | 'floating'>('assembling');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const tileSize = 150; // Much larger tiles
    const cols = Math.ceil(canvas.width / tileSize) + 1;
    const rows = Math.ceil(canvas.height / tileSize) + 1;

    // Ceramic and tile colors: marble whites/greys, wood tones, terrazzo
    const colors = [
      { base: '#f5f5f0', pattern: 'marble' },      // White marble
      { base: '#e8e6e3', pattern: 'solid' },        // Light grey
      { base: '#d4d2c8', pattern: 'terrazzo' },     // Beige terrazzo
      { base: '#c9b8a3', pattern: 'wood' },         // Light wood
      { base: '#8b7355', pattern: 'wood' },         // Medium wood
      { base: '#a89f91', pattern: 'solid' },        // Taupe
      { base: '#f0ebe5', pattern: 'marble' },       // Cream marble
      { base: '#5d4e37', pattern: 'wood' },         // Dark wood
    ];

    const tiles: Tile[] = [];
    let delayCounter = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        tiles.push({
          x: x * tileSize,
          y: y * tileSize,
          delay: delayCounter * 40,
          pattern: Math.floor(Math.random() * colors.length),
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: 0.5 + Math.random() * 0.5,
          seed: Math.random(), // Fixed seed for consistent patterns
        });
        delayCounter++;
      }
    }

    let startTime = Date.now();

    // Seeded random for consistent patterns
    const seededRandom = (seed: number, index: number) => {
      const x = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    const drawWoodGrain = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, baseColor: string, seed: number) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(x, y, size, size);
      
      // Wood grain lines - using seed for consistency
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const offset = (seededRandom(seed, i) - 0.5) * 20;
        ctx.beginPath();
        ctx.moveTo(x, y + (size / 8) * i + offset);
        ctx.quadraticCurveTo(
          x + size / 2, 
          y + (size / 8) * i + offset + (seededRandom(seed, i + 100) - 0.5) * 10,
          x + size, 
          y + (size / 8) * i + offset
        );
        ctx.stroke();
      }
    };

    const drawMarble = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, baseColor: string, seed: number) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(x, y, size, size);
      
      // Marble veins - using seed for consistency
      ctx.strokeStyle = 'rgba(180, 180, 180, 0.3)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x + seededRandom(seed, i) * size, y);
        ctx.quadraticCurveTo(
          x + seededRandom(seed, i + 10) * size,
          y + size / 2,
          x + seededRandom(seed, i + 20) * size,
          y + size
        );
        ctx.stroke();
      }
    };

    const drawTerrazzo = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, baseColor: string, seed: number) => {
      ctx.fillStyle = baseColor;
      ctx.fillRect(x, y, size, size);
      
      // Terrazzo chips - using seed for consistency
      const chips = ['#ffffff', '#333333', '#666666', '#999999'];
      for (let i = 0; i < 15; i++) {
        ctx.fillStyle = chips[Math.floor(seededRandom(seed, i) * chips.length)];
        const chipX = x + seededRandom(seed, i + 100) * size;
        const chipY = y + seededRandom(seed, i + 200) * size;
        const chipSize = seededRandom(seed, i + 300) * 8 + 3;
        ctx.beginPath();
        ctx.arc(chipX, chipY, chipSize, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawTile = (tile: Tile, progress: number, time: number = 0) => {
      const scale = Math.min(progress, 1);
      const size = tileSize * scale;
      const offset = (tileSize - size) / 2;

      // Floating animation after assembly
      const floatY = animationPhase === 'floating' 
        ? Math.sin(time * 0.001 * tile.floatSpeed + tile.floatOffset) * 3 
        : 0;

      ctx.save();
      ctx.translate(0, floatY);

      const tileColor = colors[tile.pattern];
      
      // Draw tile with pattern based on type - using tile.seed for consistency
      if (tileColor.pattern === 'wood') {
        drawWoodGrain(ctx, tile.x + offset, tile.y + offset, size, tileColor.base, tile.seed);
      } else if (tileColor.pattern === 'marble') {
        drawMarble(ctx, tile.x + offset, tile.y + offset, size, tileColor.base, tile.seed);
      } else if (tileColor.pattern === 'terrazzo') {
        drawTerrazzo(ctx, tile.x + offset, tile.y + offset, size, tileColor.base, tile.seed);
      } else {
        ctx.fillStyle = tileColor.base;
        ctx.fillRect(tile.x + offset, tile.y + offset, size, size);
      }

      // Grout lines
      if (scale > 0.3) {
        ctx.strokeStyle = '#9e9e9e';
        ctx.lineWidth = 3;
        ctx.strokeRect(tile.x + offset, tile.y + offset, size, size);
      }

      // Glossy shine effect
      if (scale > 0.7) {
        const gradient = ctx.createLinearGradient(
          tile.x,
          tile.y,
          tile.x + tileSize * 0.3,
          tile.y + tileSize * 0.3
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(tile.x + offset, tile.y + offset, size * 0.6, size * 0.6);
      }

      // Subtle shadow
      if (scale === 1) {
        const shadowGradient = ctx.createLinearGradient(
          tile.x,
          tile.y + tileSize * 0.7,
          tile.x,
          tile.y + tileSize
        );
        shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.12)');
        ctx.fillStyle = shadowGradient;
        ctx.fillRect(tile.x + offset, tile.y + offset + size * 0.7, size, size * 0.3);
      }

      ctx.restore();
    };

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1A1E24';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (animationPhase === 'assembling') {
        let allComplete = true;
        tiles.forEach((tile) => {
          const tileProgress = Math.max(0, Math.min(1, (elapsed - tile.delay) / 600));
          if (tileProgress < 1) allComplete = false;
          if (tileProgress > 0) {
            drawTile(tile, tileProgress, currentTime);
          }
        });

        // Switch to floating phase when all tiles are assembled
        if (allComplete && elapsed > tiles[tiles.length - 1].delay + 600) {
          setAnimationPhase('floating');
        }
      } else if (animationPhase === 'floating') {
        // Keep tiles visible and floating
        tiles.forEach((tile) => {
          drawTile(tile, 1, currentTime);
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [animationPhase]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ transform: 'translateZ(0)' }}
      />
    </div>
  );
};
