import { useState, useEffect } from 'react';
import './LoadingScreen.css';

const BOOT_LINES = [
  { pct: 2,  text: 'BIOS POST check... OK' },
  { pct: 6,  text: 'Initializing network stack...' },
  { pct: 12, text: 'Loading kernel modules: [net-core] [tcp-ip] [routing]' },
  { pct: 18, text: 'Mounting file systems... done' },
  { pct: 24, text: 'Starting interface eth0... UP  (100Mbps/Full-Duplex)' },
  { pct: 30, text: 'ARP cache initialized' },
  { pct: 36, text: 'Routing table loaded: 6 routes' },
  { pct: 42, text: 'OSPF process started — Area 0.0.0.0 active' },
  { pct: 48, text: 'BGP neighbors: 3 established' },
  { pct: 54, text: 'Firewall rules applied: 48 ACEs loaded' },
  { pct: 60, text: 'IDS/IPS engine online — signature DB v4.21' },
  { pct: 66, text: 'Encrypting tunnels... IPSec SA established' },
  { pct: 72, text: 'DNS resolver configured: 8.8.8.8, 1.1.1.1' },
  { pct: 78, text: 'Checking SSH daemon... RUNNING [port 22]' },
  { pct: 84, text: 'Loading portfolio assets... done' },
  { pct: 90, text: 'Establishing secure session...' },
  { pct: 95, text: 'Rendering network topology...' },
  { pct: 100, text: 'SYSTEM READY — Welcome, Al-Akib' },
];

const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [lines, setLines]       = useState([]);
  const [done, setDone]         = useState(false);
  const [sliding, setSliding]   = useState(false);

  /* ── tick: fill progress + print log lines ── */
  useEffect(() => {
    let idx = 0;
    let pct = 0;
    const t = setInterval(() => {
      const target = idx < BOOT_LINES.length ? BOOT_LINES[idx].pct : 100;
      if (pct < target) {
        pct = Math.min(pct + 1, target);
        setProgress(pct);
      }
      if (pct === target && idx < BOOT_LINES.length) {
        const text = BOOT_LINES[idx].text;
        setLines(prev => [...prev, text]);
        idx++;
        if (idx === BOOT_LINES.length) {
          clearInterval(t);
          setTimeout(() => setDone(true), 400);
        }
      }
    }, 28);
    return () => clearInterval(t);
  }, []);

  /* ── when done: wait, slide, then unmount ── */
  useEffect(() => {
    if (!done) return;
    // Show "ACCESS GRANTED" for 1.2s then start slide
    const t1 = setTimeout(() => setSliding(true), 1200);
    // After slide animation (1s), call onDone to unmount from App
    const t2 = setTimeout(() => onDone(), 1200 + 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [done, onDone]);

  const bar    = Math.floor(progress / 2);
  const filled = '█'.repeat(bar);
  const empty  = '░'.repeat(50 - bar);

  return (
    <div className={`loader ${sliding ? 'slide-away' : ''}`}>
      <div className="loader-inner">
        <div className="loader-header">
          <span className="lh-brand">AL-AKIB PORTFOLIO OS v1.0</span>
          <span className="lh-sep"> — </span>
          <span className="lh-sub">Network Engineering Suite</span>
        </div>
        <div className="loader-divider" />

        <div className="loader-log">
          {lines.map((line, i) => (
            <div key={i} className="log-line">
              <span className="log-ts">
                [{String(Math.floor((i / BOOT_LINES.length) * 23)).padStart(2,'0')}:
                 {String(Math.floor((i / BOOT_LINES.length) * 59)).padStart(2,'0')}]
              </span>
              <span className="log-ok">
                {i === BOOT_LINES.length - 1 ? ' ✓ ' : ' OK '}
              </span>
              <span>{line}</span>
            </div>
          ))}
          {!done && <div className="log-cursor">_</div>}
        </div>

        <div className="loader-progress">
          <div className="lp-label">LOADING SYSTEM</div>
          <div className="lp-bar-wrap">
            <span className="lp-bracket">[</span>
            <span className="lp-filled">{filled}</span>
            <span className="lp-empty">{empty}</span>
            <span className="lp-bracket">]</span>
            <span className="lp-pct"> {String(progress).padStart(3,' ')}%</span>
          </div>
          {done && (
            <div className="lp-done">
              &gt; ACCESS GRANTED — INITIALIZING INTERFACE...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
