import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

const floatingElements = [
  { text: 'def train_model():',  x: '4%',  y: '18%', delay: 0,   dur: 5   },
  { text: 'neural_net.fit()',    x: '76%', y: '14%', delay: 1.5, dur: 6   },
  { text: '<Tensor />',          x: '83%', y: '58%', delay: 0.8, dur: 4.5 },
  { text: 'import torch',        x: '2%',  y: '67%', delay: 2,   dur: 5.5 },
  { text: 'loss.backward()',     x: '68%', y: '80%', delay: 0.5, dur: 7   },
  { text: '{ epoch: 42 }',       x: '14%', y: '84%', delay: 3,   dur: 6   },
];

/* ── Syntax-highlighted code lines ── */
const CODE_LINES = [
  { tokens: [{ t: 'import ', c: '#B24BF3' }, { t: 'torch', c: '#00F5FF' }, { t: ', nn', c: '#fff' }] },
  { tokens: [] },
  { tokens: [{ t: 'class ', c: '#B24BF3' }, { t: 'NeuralNet', c: '#00F5FF' }, { t: '(nn.Module):', c: '#fff' }] },
  { tokens: [{ t: '  def ', c: '#B24BF3' }, { t: 'forward', c: '#00ff9f' }, { t: '(self, x):', c: '#fff' }] },
  { tokens: [{ t: '    x ', c: '#fff' }, { t: '= ', c: '#B24BF3' }, { t: 'self.relu(x)', c: '#00F5FF' }] },
  { tokens: [{ t: '    x ', c: '#fff' }, { t: '= ', c: '#B24BF3' }, { t: 'self.fc(x)', c: '#00F5FF' }] },
  { tokens: [{ t: '    ', c: '#fff' }, { t: 'return ', c: '#B24BF3' }, { t: 'x', c: '#fff' }] },
  { tokens: [] },
  { tokens: [{ t: 'model ', c: '#fff' }, { t: '= ', c: '#B24BF3' }, { t: 'NeuralNet()', c: '#00F5FF' }] },
  { tokens: [{ t: 'loss  ', c: '#fff' }, { t: '= ', c: '#B24BF3' }, { t: 'criterion(pred, y)', c: '#00F5FF' }] },
  { tokens: [{ t: 'loss.backward()', c: '#00ff9f' }] },
];

/* Stats that cycle in the "output" panel */
const STATS = [
  { label: 'Accuracy', value: '98.4%',   color: '#00ff9f' },
  { label: 'Loss',     value: '0.0021',  color: '#00F5FF' },
  { label: 'Epoch',    value: '42/100',  color: '#B24BF3' },
  { label: 'lr',       value: '1e-4',    color: '#ffbd2e' },
];

const CodePanel: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, x: 40, y: 10 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
    style={{
      width: '100%', maxWidth: 420,
      borderRadius: 14,
      border: '1px solid rgba(0,245,255,0.18)',
      background: 'rgba(10,14,22,0.92)',
      boxShadow: '0 0 50px rgba(0,245,255,0.07), 0 24px 60px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      backdropFilter: 'blur(12px)',
    }}
  >
    {/* Title bar */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 7,
      padding: '10px 14px',
      background: 'rgba(0,245,255,0.035)',
      borderBottom: '1px solid rgba(0,245,255,0.09)',
    }}>
      {['#FF5F57','#FFBD2E','#28CA41'].map((c, i) => (
        <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.8 }} />
      ))}
      <span style={{
        marginLeft: 6,
        fontFamily: "'Space Grotesk', monospace",
        fontSize: 12,
        color: 'rgba(0,245,255,0.45)',
        letterSpacing: '0.08em',
      }}>
        neural_net.py
      </span>
      {/* pulsing live dot */}
      <motion.div
        style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: '#00ff9f' }}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      <span style={{ fontSize: 11, color: 'rgba(0,255,159,0.6)', fontFamily: 'monospace' }}>RUNNING</span>
    </div>

    {/* Code body */}
    <div style={{ padding: '16px 18px 10px', fontFamily: "'Space Grotesk', 'Courier New', monospace", fontSize: 12.5, lineHeight: 1.75 }}>
      {/* Line numbers + code */}
      {CODE_LINES.map((line, i) => (
        <motion.div
          key={i}
          style={{ display: 'flex', gap: 14 }}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.06, duration: 0.3 }}
        >
          <span style={{ color: 'rgba(255,255,255,0.14)', userSelect: 'none', minWidth: 16, textAlign: 'right' }}>
            {line.tokens.length > 0 ? i + 1 : ''}
          </span>
          <span>
            {line.tokens.map((tok, j) => (
              <span key={j} style={{ color: tok.c }}>{tok.t}</span>
            ))}
            {/* blinking cursor on last line */}
            {i === CODE_LINES.length - 1 && (
              <motion.span
                style={{ display: 'inline-block', width: 7, height: 13, background: '#00F5FF', verticalAlign: 'middle', marginLeft: 2 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            )}
          </span>
        </motion.div>
      ))}
    </div>

    {/* Output / stats strip */}
    <div style={{
      borderTop: '1px solid rgba(0,245,255,0.08)',
      padding: '10px 18px',
      background: 'rgba(0,245,255,0.02)',
    }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 7, alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'rgba(0,255,159,0.5)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>▶ OUTPUT</span>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            style={{
              display: 'flex', flexDirection: 'column', gap: 2,
              padding: '4px 10px', borderRadius: 6,
              background: `${s.color}0f`,
              border: `1px solid ${s.color}30`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.1 }}
          >
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
              {s.label}
            </span>
            <motion.span
              style={{ fontSize: 13, fontWeight: 700, color: s.color, fontFamily: "'Space Grotesk', monospace" }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2 + i * 0.4, repeat: Infinity }}
            >
              {s.value}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center circuit-board-bg pt-16 overflow-hidden">
      {/* Floating code fragments */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="float-element hidden lg:block"
          style={{ left: el.x, top: el.y }}
          animate={{ y: [0, -14, 0], opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: el.dur, repeat: Infinity, delay: el.delay, ease: 'easeInOut' }}
        >
          {el.text}
        </motion.div>
      ))}

      {/* Glow blob */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(0,245,255,0.04) 0%, transparent 70%)',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="section-tag">SOFTWARE DEVELOPER</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="glitch text-white" data-text="From logic to launch —">
                From logic to launch —
              </span>
              <br />
              <motion.span
                className="text-gradient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{ filter: 'drop-shadow(0 0 20px rgba(0,245,255,0.3))' }}
              >
                I build systems that work.
              </motion.span>
            </motion.h1>

            <motion.h2
              className="text-gray-400 text-xl mb-8 font-grotesk"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-neon-blue mr-2">›</span>
              <TypeAnimation
                sequence={[
                  'Software Developer',    1200,
                  'Automation Enthusiast', 1200,
                  'Problem Solver',        1200,
                  'Backend Architect',     1200,
                ]}
                repeat={Infinity}
              />
            </motion.h2>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
            >
              <a href="#contact" className="gradient-border-btn">Let's Connect</a>
              <a href="/resume.pdf" download="Khalid_Resume.pdf" className="neon-button-orange flex items-center gap-2">
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </motion.div>

            <motion.div
              className="flex items-center space-x-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { href: 'https://github.com/km-wahid',                                                      icon: <Github   className="h-5 w-5" />, label: 'GitHub'   },
                { href: 'https://www.linkedin.com/in/khalid-muhammad-wahid-0263b01b3/',                     icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
                { href: 'https://mail.google.com/mail/?view=cm&fs=1&to=khalidmuhammad.official@gmail.com', icon: <Mail     className="h-5 w-5" />, label: 'Email'    },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-white/5 bg-white/[0.03] text-gray-400 hover:text-neon-blue hover:border-neon-blue/30 hover:bg-neon-blue/5 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.05 }}
                  title={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Animated code editor */}
          <div className="hidden lg:flex items-center justify-center">
            <CodePanel />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <a href="#about" className="flex flex-col items-center gap-1 text-gray-500 hover:text-neon-blue transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
