import { useEffect, useRef, useState } from 'react';

interface Tile {
  x: number;
  y: number;
  delay: number;
  pattern: number;
  floatOffset: number;
  floatSpeed: number;
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

    const tiles: Tile[] = [];
    let delayCounter = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        tiles.push({
          x: x * tileSize,
          y: y * tileSize,
          delay: delayCounter * 40, // Sequential animation
          pattern: Math.floor(Math.random() * 5),
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: 0.5 + Math.random() * 0.5,
        });
        delayCounter++;
      }
    }

    // Colors from the logo: dark blue (#1e3a5f), orange (#ff6b35), blue-grey (#3d5a80), and complementary shades
    const colors = ['#1e3a5f', '#ff6b35', '#3d5a80', '#2a4568', '#243447', '#ff8c5a', '#4a6885', '#1a2f4a'];
    let startTime = Date.now();

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

      ctx.fillStyle = colors[tile.pattern];
      ctx.fillRect(tile.x + offset, tile.y + offset, size, size);

      // Grout lines (darker, more prominent)
      if (scale > 0.3) {
        ctx.strokeStyle = '#1A1E24';
        ctx.lineWidth = 4;
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
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
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
        shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
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
