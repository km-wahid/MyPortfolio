import { useEffect, useRef } from 'react';
import './NetworkCanvas.css';

const NetworkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    canvas.width  = W();
    canvas.height = H();

    const onResize = () => {
      canvas.width  = W();
      canvas.height = H();
    };
    window.addEventListener('resize', onResize);

    // Nodes
    const nodes = Array.from({ length: 22 }, () => ({
      x:  Math.random() * W(),
      y:  Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 3 + 3,
      pt: Math.random() * Math.PI * 2,
    }));

    // Packets
    const packets = [];
    const spawnPacket = () => {
      const a = Math.floor(Math.random() * nodes.length);
      const b = (a + 1 + Math.floor(Math.random() * (nodes.length - 1))) % nodes.length;
      const d = Math.hypot(nodes[b].x - nodes[a].x, nodes[b].y - nodes[a].y);
      if (d < 200) packets.push({ a, b, t: 0, spd: 1.5 / d });
    };
    const interval = setInterval(spawnPacket, 500);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(n => {
        n.pt += 0.02;
        n.x  += n.vx;
        n.y  += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const d  = Math.hypot(dx, dy);
          if (d < 200) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,255,65,${(1 - d / 200) * 0.22})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.spd;
        if (p.t >= 1) { packets.splice(i, 1); continue; }
        const x = nodes[p.a].x + (nodes[p.b].x - nodes[p.a].x) * p.t;
        const y = nodes[p.a].y + (nodes[p.b].y - nodes[p.a].y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,179,255,0.9)';
        ctx.fill();
      }

      // Node dots
      nodes.forEach(n => {
        const pulse = Math.sin(n.pt) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,65,${0.4 + pulse * 0.4})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-canvas" />;
};

export default NetworkCanvas;
