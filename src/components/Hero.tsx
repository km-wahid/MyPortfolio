import { useEffect } from 'react';
import { motion, animate, useMotionTemplate, useMotionValue } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { HeroContent, SocialLink } from '../content/siteContent';

const COLORS_TOP = ['#00F5FF', '#00A8FF', '#B24BF3', '#FF2D78'];

interface HeroProps {
  content: HeroContent;
  socials: SocialLink[];
}

const Hero: React.FC<HeroProps> = ({ content, socials }) => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    const controls = animate(color, COLORS_TOP, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
    return () => controls.stop();
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #050914 42%, ${color})`;
  const buttonBorder = useMotionTemplate`1px solid ${color}`;
  const buttonGlow = useMotionTemplate`0px 8px 30px ${color}`;

  return (
    <motion.section
      id="home"
      style={{ backgroundImage }}
      className="relative min-h-screen overflow-hidden px-4 py-24 text-gray-200 grid place-content-center"
    >
      <motion.div
        className="absolute -top-32 -left-24 w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(19,255,170,0.24), transparent 68%)', filter: 'blur(14px)' }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 w-[42vw] h-[42vw] max-w-[620px] max-h-[620px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(206,132,207,0.26), transparent 68%)', filter: 'blur(18px)' }}
        animate={{ x: [0, -36, 0], y: [0, -22, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-[#0B0F1A]/30 to-[#0B0F1A]/90" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs tracking-[0.12em] uppercase text-neon-blue">
          {content.badge}
        </span>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
          }}
        >
          <motion.span
            className="text-white block"
            variants={{
              hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: 'easeOut' } },
            }}
          >
            {content.titleLine1}
          </motion.span>
          <motion.span
            className="text-gradient block mt-1 hero-title-glow"
            variants={{
              hidden: { opacity: 0, y: 28, scale: 0.98, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.85, ease: 'easeOut' } },
            }}
          >
            {content.titleLine2}
          </motion.span>
        </motion.h1>

        <h2 className="text-gray-300 text-lg md:text-xl mt-6 min-h-[2rem] md:min-h-[2.2rem]">
          <span className="text-neon-blue mr-2">›</span>
          <TypeAnimation
            sequence={content.roles.flatMap((role) => [role, 1200])}
            speed={52}
            repeat={Infinity}
          />
        </h2>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <motion.a
            href="#contact"
            style={{ border: buttonBorder, boxShadow: buttonGlow }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hover-rotate-btn"
          >
            <span>{content.ctaText}</span>
          </motion.a>
          <a href="/resume.pdf" download="Khalid_Resume.pdf" className="neon-button-orange flex items-center gap-2">
            <Download className="h-4 w-4" /> {content.resumeText}
          </a>
        </motion.div>

        <div className="flex items-center gap-4 mt-8">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-gray-300 hover:text-neon-blue hover:border-neon-blue/40 transition-all duration-300"
              title={s.label}
            >
              {s.label === 'GitHub' && <Github className="h-5 w-5" />}
              {s.label === 'LinkedIn' && <Linkedin className="h-5 w-5" />}
              {s.label === 'Email' && <Mail className="h-5 w-5" />}
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
