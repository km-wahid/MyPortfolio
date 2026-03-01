import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: 'Initializing kernel modules...',         delay: 0   },
  { text: 'Loading neural network drivers...',      delay: 180 },
  { text: 'Mounting /dev/portfolio...',             delay: 360 },
  { text: 'Connecting to AI inference engine...',  delay: 540 },
  { text: 'Calibrating system parameters...',      delay: 720 },
  { text: 'Bootstrapping React runtime...',        delay: 900 },
  { text: 'Injecting glassmorphism layer...',       delay: 1080 },
  { text: 'Syncing project metadata...',           delay: 1260 },
  { text: 'Compiling skill matrix...',             delay: 1440 },
  { text: 'All systems nominal. Launching UI...', delay: 1700 },
];

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Schedule boot lines
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        // Auto-scroll terminal
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, line.delay + 300);
    });

    // Progress bar
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.random() * 2.5 + 0.5;
      if (current >= 100) {
        current = 100;
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 700);
        }, 500);
      }
      setProgress(Math.min(current, 100));
    }, 55);

    return () => clearInterval(intervalRef.current!);
  }, [onComplete]);

  const pct = Math.round(progress);
  const filled = Math.round((progress / 100) * 30);
  const bar = '█'.repeat(filled) + '░'.repeat(30 - filled);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, #0F1628 0%, #0B0F1A 60%, #060810 100%)',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Scan line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.5), transparent)',
            animation: 'scanLine 3s linear infinite',
          }} />

          {/* Ambient blobs */}
          <div style={{
            position: 'absolute', width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)',
            top: '5%', left: '10%', filter: 'blur(40px)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(178,75,243,0.05) 0%, transparent 70%)',
            bottom: '10%', right: '15%', filter: 'blur(40px)', pointerEvents: 'none',
          }} />

          <motion.div
            className="w-full max-w-2xl mx-4"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Terminal window */}
            <div style={{
              borderRadius: 14,
              border: '1px solid rgba(0,245,255,0.18)',
              background: 'rgba(10,14,22,0.97)',
              boxShadow: '0 0 60px rgba(0,245,255,0.08), 0 30px 80px rgba(0,0,0,0.6)',
              overflow: 'hidden',
            }}>
              {/* Title bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 16px',
                background: 'rgba(0,245,255,0.04)',
                borderBottom: '1px solid rgba(0,245,255,0.1)',
              }}>
                {/* Traffic lights */}
                {['#FF5F57','#FFBD2E','#28CA41'].map((c, i) => (
                  <div key={i} style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: c, opacity: 0.85,
                  }} />
                ))}
                <span style={{
                  flex: 1, textAlign: 'center',
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 13, color: 'rgba(0,245,255,0.5)',
                  letterSpacing: '0.12em',
                }}>
                  khalid@portfolio:~$ system_boot
                </span>
              </div>

              {/* Terminal body */}
              <div
                ref={terminalRef}
                style={{
                  padding: '20px 24px',
                  fontFamily: "'Space Grotesk', 'Courier New', monospace",
                  fontSize: 13,
                  lineHeight: 1.7,
                  minHeight: 280,
                  maxHeight: 320,
                  overflowY: 'auto',
                  scrollBehavior: 'smooth',
                }}
              >
                {/* Prompt line */}
                <div style={{ color: 'rgba(0,245,255,0.4)', marginBottom: 8 }}>
                  <span style={{ color: '#B24BF3' }}>khalid</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>@</span>
                  <span style={{ color: '#00F5FF' }}>portfolio</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>:~$ </span>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>./boot_sequence.sh</span>
                </div>

                {/* Boot lines */}
                {BOOT_LINES.map((line, i) =>
                  visibleLines.includes(i) ? (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}
                    >
                      <span style={{
                        color: i === BOOT_LINES.length - 1 ? '#00ff66' : 'rgba(0,245,255,0.5)',
                        fontSize: 11,
                      }}>
                        {i === BOOT_LINES.length - 1 ? '✓' : '›'}
                      </span>
                      <span style={{
                        color: i === BOOT_LINES.length - 1
                          ? 'rgba(0,255,102,0.9)'
                          : 'rgba(255,255,255,0.55)',
                      }}>
                        {line.text}
                      </span>
                      {i === BOOT_LINES.length - 1 && (
                        <motion.span
                          style={{ color: '#00ff66', fontSize: 11, fontWeight: 700 }}
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          [OK]
                        </motion.span>
                      )}
                    </motion.div>
                  ) : null
                )}

                {/* Blinking cursor */}
                {pct < 100 && (
                  <motion.span
                    style={{
                      display: 'inline-block', width: 8, height: 15,
                      background: '#00F5FF', marginTop: 4,
                      verticalAlign: 'middle',
                    }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Progress section */}
              <div style={{
                padding: '14px 24px 20px',
                borderTop: '1px solid rgba(0,245,255,0.08)',
                fontFamily: "'Space Grotesk', 'Courier New', monospace",
              }}>
                {/* Bar row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <span style={{ color: 'rgba(0,245,255,0.4)', fontSize: 11 }}>BOOT</span>
                  <div style={{
                    flex: 1, height: 6, borderRadius: 999,
                    background: 'rgba(0,245,255,0.08)',
                    border: '1px solid rgba(0,245,255,0.12)',
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #00F5FF, #B24BF3)',
                        boxShadow: '0 0 10px rgba(0,245,255,0.7)',
                        borderRadius: 999,
                        width: `${progress}%`,
                      }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <span style={{
                    color: '#00F5FF',
                    fontSize: 13,
                    fontWeight: 700,
                    minWidth: 42,
                    textAlign: 'right',
                  }}>
                    {pct}%
                  </span>
                </div>

                {/* Monospace bar */}
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: 'rgba(0,245,255,0.35)',
                  letterSpacing: '0.05em',
                  userSelect: 'none',
                }}>
                  <span style={{ color: 'rgba(0,245,255,0.25)' }}>[</span>
                  <span style={{ color: '#00F5FF' }}>{bar.slice(0, filled)}</span>
                  <span style={{ color: 'rgba(255,255,255,0.1)' }}>{bar.slice(filled)}</span>
                  <span style={{ color: 'rgba(0,245,255,0.25)' }}>]</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)', marginLeft: 10 }}>
                    {pct < 100 ? `${pct}/100 chunks loaded` : 'Launch ready ✓'}
                  </span>
                </div>
              </div>
            </div>

            {/* Watermark */}
            <motion.p
              className="text-center mt-5 text-xs tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.15)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Khalid Muhammad · AI Engineer Portfolio
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
