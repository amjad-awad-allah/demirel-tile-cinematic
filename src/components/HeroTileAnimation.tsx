import { useEffect, useRef, useState } from 'react';

interface Tile {
  x: number;
  y: number;
  delay: number;
  pattern: number;
}

export const HeroTileAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationPhase, setAnimationPhase] = useState<'assembling' | 'morphing' | 'logo' | 'transitioning'>('assembling');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const tileSize = 80;
    const cols = Math.ceil(canvas.width / tileSize) + 1;
    const rows = Math.ceil(canvas.height / tileSize) + 1;

    const tiles: Tile[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        tiles.push({
          x: x * tileSize,
          y: y * tileSize,
          delay: Math.random() * 1000,
          pattern: Math.floor(Math.random() * 4),
        });
      }
    }

    const colors = ['#f8f9fa', '#ddd', '#e8e8e8', '#f0f0f0'];
    let startTime = Date.now();

    const drawTile = (tile: Tile, progress: number) => {
      const scale = Math.min(progress, 1);
      const size = tileSize * scale;
      const offset = (tileSize - size) / 2;

      ctx.fillStyle = colors[tile.pattern];
      ctx.fillRect(tile.x + offset, tile.y + offset, size, size);

      // Grout lines
      if (scale > 0.5) {
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 2;
        ctx.strokeRect(tile.x + offset, tile.y + offset, size, size);
      }

      // Subtle reflection
      if (scale === 1) {
        const gradient = ctx.createLinearGradient(
          tile.x,
          tile.y,
          tile.x,
          tile.y + tileSize
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(tile.x + offset, tile.y + offset, size, size);
      }
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1e3a5f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (animationPhase === 'assembling') {
        tiles.forEach((tile) => {
          const tileProgress = Math.max(0, (elapsed - tile.delay) / 800);
          if (tileProgress > 0) {
            drawTile(tile, tileProgress);
          }
        });

        if (elapsed > 2000) {
          setTimeout(() => setAnimationPhase('morphing'), 500);
        }
      } else if (animationPhase === 'morphing') {
        // Draw complete grid
        tiles.forEach((tile) => drawTile(tile, 1));

        // Fade to logo
        const fadeProgress = Math.min((elapsed - 2500) / 1000, 1);
        ctx.globalAlpha = fadeProgress;
        ctx.fillStyle = '#1e3a5f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        if (elapsed > 3500) {
          setAnimationPhase('logo');
        }
      } else if (animationPhase === 'logo') {
        // Show pure background for logo
        ctx.fillStyle = '#1e3a5f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (elapsed > 5000) {
          setAnimationPhase('transitioning');
          startTime = Date.now(); // Reset timer
        }
      } else if (animationPhase === 'transitioning') {
        // Fade back to tiles
        const fadeProgress = Math.min(elapsed / 800, 1);
        
        tiles.forEach((tile) => drawTile(tile, 1));
        
        ctx.globalAlpha = 1 - fadeProgress;
        ctx.fillStyle = '#1e3a5f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        if (elapsed > 800) {
          setAnimationPhase('assembling');
          startTime = Date.now();
        }
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
