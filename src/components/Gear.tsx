import React from 'react';

interface GearProps {
  size?: number;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  opacity?: number;
  color?: string;
  className?: string;
}

const Gear: React.FC<GearProps> = ({
  size = 100,
  top,
  right,
  bottom,
  left,
  opacity = 0.1,
  color = '#ffffff',
  className = '',
}) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    opacity,
    ...(top && { top }),
    ...(right && { right }),
    ...(bottom && { bottom }),
    ...(left && { left }),
  };

  const teethCount = Math.floor(size / 15);
  const innerRadius = size * 0.3;
  const outerRadius = size * 0.5;
  const centerX = size / 2;
  const centerY = size / 2;

  // Create gear path
  const createGearPath = () => {
    let path = '';

    for (let i = 0; i < teethCount; i++) {
      const angle = (i * 2 * Math.PI) / teethCount;
      const nextAngle = ((i + 1) * 2 * Math.PI) / teethCount;
      const midAngle = (angle + nextAngle) / 2;

      const innerX1 = centerX + innerRadius * Math.cos(angle);
      const innerY1 = centerY + innerRadius * Math.sin(angle);

      const outerX1 = centerX + outerRadius * Math.cos(angle);
      const outerY1 = centerY + outerRadius * Math.sin(angle);

      const outerX2 = centerX + outerRadius * Math.cos(midAngle - 0.1);
      const outerY2 = centerY + outerRadius * Math.sin(midAngle - 0.1);

      const outerX3 = centerX + (outerRadius + size * 0.1) * Math.cos(midAngle);
      const outerY3 = centerY + (outerRadius + size * 0.1) * Math.sin(midAngle);

      const outerX4 = centerX + outerRadius * Math.cos(midAngle + 0.1);
      const outerY4 = centerY + outerRadius * Math.sin(midAngle + 0.1);

      const outerX5 = centerX + outerRadius * Math.cos(nextAngle);
      const outerY5 = centerY + outerRadius * Math.sin(nextAngle);

      const innerX2 = centerX + innerRadius * Math.cos(nextAngle);
      const innerY2 = centerY + innerRadius * Math.sin(nextAngle);

      if (i === 0) {
        path += `M ${innerX1} ${innerY1} `;
      }

      path += `L ${outerX1} ${outerY1} `;
      path += `L ${outerX2} ${outerY2} `;
      path += `L ${outerX3} ${outerY3} `;
      path += `L ${outerX4} ${outerY4} `;
      path += `L ${outerX5} ${outerY5} `;
      path += `L ${innerX2} ${innerY2} `;
    }

    path += 'Z';
    return path;
  };

  return (
    <div style={style} className={className}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path d={createGearPath()} fill={color} />
        <circle cx={centerX} cy={centerY} r={innerRadius * 0.7} fill={color} opacity={0.8} />
      </svg>
    </div>
  );
};

export default Gear;