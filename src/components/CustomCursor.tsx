import { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef   = useRef<HTMLDivElement>(null);
  const haloRef  = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const hoverRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
    setIsMobile(mobile);
    if (mobile) return;

    const dot  = dotRef.current;
    const halo = haloRef.current;
    if (!dot || !halo) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      dot.style.transform  = `translate(${e.clientX}px, ${e.clientY}px)`;
      halo.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const setHover = (on: boolean) => {
      hoverRef.current = on;
      if (on) {
        dot.style.opacity  = '0';
        halo.style.width   = '48px';
        halo.style.height  = '48px';
        halo.style.borderColor = 'rgba(178,75,243,0.9)';
        halo.style.boxShadow   = '0 0 18px rgba(178,75,243,0.5)';
      } else {
        dot.style.opacity  = '1';
        halo.style.width   = '28px';
        halo.style.height  = '28px';
        halo.style.borderColor = 'rgba(0,245,255,0.7)';
        halo.style.boxShadow   = '0 0 10px rgba(0,245,255,0.35)';
      }
    };

    const onEnter = () => setHover(true);
    const onLeave = () => setHover(false);

    const els = document.querySelectorAll('a, button, [data-cursor]');
    els.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      els.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); });
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Sharp dot — exact position */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#00F5FF',
          boxShadow: '0 0 6px #00F5FF',
          pointerEvents: 'none',
          zIndex: 100000,
          willChange: 'transform',
          /* offset so center of dot is at cursor tip */
          marginTop: -3,
          marginLeft: -3,
          transition: 'opacity 0.15s ease',
        }}
      />
      {/* Soft halo — lags slightly */}
      <div
        ref={haloRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 28, height: 28,
          borderRadius: '50%',
          border: '1.5px solid rgba(0,245,255,0.7)',
          boxShadow: '0 0 10px rgba(0,245,255,0.35)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          marginTop: -14,
          marginLeft: -14,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;

