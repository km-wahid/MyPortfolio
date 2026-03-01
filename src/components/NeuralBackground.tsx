import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulsePhase: number;
}

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let scrollY = window.scrollY;

    const NODE_COUNT = 70;
    const MAX_DIST = 160;
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.4 + 0.2,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Subtle parallax offset
      const parallaxOffset = (scrollY * 0.05) % h;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        const pulse = Math.sin(frame * 0.015 + n.pulsePhase) * 0.3 + 0.7;
        const drawY = n.y - parallaxOffset;

        ctx.beginPath();
        ctx.arc(n.x, drawY, n.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,255,${n.alpha * pulse})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(0,245,255,0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const a = (1 - dist / MAX_DIST) * 0.12;
            const drawYi = nodes[i].y - parallaxOffset;
            const drawYj = nodes[j].y - parallaxOffset;
            const colorSeed = (i * 3 + j) % 4;
            if (colorSeed < 2) {
              ctx.strokeStyle = `rgba(0,245,255,${a})`;
            } else if (colorSeed === 2) {
              ctx.strokeStyle = `rgba(178,75,243,${a * 0.8})`;
            } else {
              ctx.strokeStyle = `rgba(0,229,255,${a * 0.6})`;
            }
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, drawYi);
            ctx.lineTo(nodes[j].x, drawYj);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const onScroll = () => { scrollY = window.scrollY; };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default NeuralBackground;
