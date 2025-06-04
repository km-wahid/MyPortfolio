import React from 'react';

const CircuitLines: React.FC = () => {
  // Generate random circuit lines positions
  const generateLines = () => {
    const lines = [];
    for (let i = 0; i < 15; i++) {
      const top = Math.floor(Math.random() * 100);
      const left = Math.floor(Math.random() * 100);
      const width = Math.floor(Math.random() * 150) + 50;
      const isVertical = Math.random() > 0.7;
      const delay = Math.random() * 5;

      lines.push(
        <div
          key={i}
          className={`circuit-line ${isVertical ? 'vertical' : ''} animate-circuitPulse`}
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: isVertical ? '2px' : `${width}px`,
            height: isVertical ? `${width}px` : '2px',
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    return lines;
  };

  return <div className="fixed inset-0 z-[-1] pointer-events-none">{generateLines()}</div>;
};

export default CircuitLines;