import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { HeroContent, SocialLink } from '../content/siteContent';
import codingVideo from '../assets/code.mp4';
import codingPoster from '../assets/coding.png';

interface HeroProps {
  content: HeroContent;
  socials: SocialLink[];
  theme?: 'dark' | 'light';
}

const Hero: React.FC<HeroProps> = ({ content, socials, theme }) => {
  const overlayStyle = theme === 'light'
    ? { background: 'linear-gradient(to bottom, rgba(248, 250, 252, 0.45) 0%, rgba(248, 250, 252, 0.85) 50%, rgba(255, 255, 255, 1) 100%)' }
    : { background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0.9) 50%, rgba(15, 23, 42, 1) 100%)' };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden px-4 py-24 grid place-content-center"
    >
      {/* Background HTML5 Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={codingPoster}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
        preload="auto"
      >
        <source src={codingVideo} type="video/mp4" />
      </video>

      {/* Theme-Adaptive Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-all duration-500"
        style={overlayStyle}
      />

      {/* Ambient Gradient Blobs - simplified for performance */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-10 left-10 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
          style={{ animation: 'float 8s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl"
          style={{ animation: 'float 8s ease-in-out infinite 4s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-3xl"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <span className="mb-6 inline-block rounded-full px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase border border-blue-500/20 bg-blue-500/10 text-blue-400 backdrop-blur-sm">
          {content.badge}
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white font-grotesk mb-6">
          <span className="block">{content.titleLine1}</span>
          <span className="text-gradient block mt-2">{content.titleLine2}</span>
        </h1>

        <h2 className="text-lg md:text-xl mt-6 min-h-[2.5rem] text-slate-300 max-w-2xl mx-auto">
          <span className="inline-block w-4 h-4 mr-2 flex items-center justify-center text-blue-400">
            <ArrowRight className="w-4 h-4" />
          </span>
          <TypeAnimation
            sequence={content.roles.flatMap((role) => [role, 1500])}
            speed={52}
            repeat={Infinity}
            cursor={false}
          />
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 btn-primary"
          >
            {content.ctaText}
          </a>
          <a
            href="/resume.pdf"
            download="Khalid_Resume.pdf"
            className="px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide border border-slate-600/30 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-slate-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 glass-panel"
          >
            <Download className="h-4 w-4 text-blue-400" /> {content.resumeText}
          </a>
        </div>

        <div className="flex items-center gap-4 mt-10">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl transition-all duration-300 border border-slate-600/20 bg-white/[0.02] text-slate-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 hover:scale-110 group"
              title={s.label}
            >
              <div className="relative">
                {s.label === 'GitHub' && <Github className="h-5 w-5 group-hover:text-[#181717] transition-colors" />}
                {s.label === 'LinkedIn' && <Linkedin className="h-5 w-5 group-hover:text-[#0a66c2] transition-colors" />}
                {s.label === 'Email' && <Mail className="h-5 w-5 group-hover:text-[#ea4335] transition-colors" />}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium bg-slate-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {s.label}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
