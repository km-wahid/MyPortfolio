import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, X, Layers } from 'lucide-react';
import { ProjectsContent } from '../content/siteContent';

interface Project {
  id: number;
  title: string;
  image: string;
  tech: string[];
  problem: string;
  solution: string;
  impact: string;
  github?: string;
  demo?: string;
  description: string;
  accentColor: string;
}

const TiltCard: React.FC<{ project: Project; onClick: () => void; index: number; inView: boolean }> = ({
  project, onClick, index, inView,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  /* alternating left / right entrance */
  const fromX = index % 2 === 0 ? -70 : 70;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="project-card cursor-pointer"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      initial={{ opacity: 0, x: fromX, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.13, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ boxShadow: `0 0 40px ${project.accentColor}33, 0 20px 60px rgba(0,0,0,0.5)`, borderColor: `${project.accentColor}55` }}
    >
      {/* Shimmer sweep on card enter */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none',
          background: `linear-gradient(105deg, transparent 40%, ${project.accentColor}22 50%, transparent 60%)`,
        }}
        initial={{ x: '-100%' }}
        animate={inView ? { x: '200%' } : {}}
        transition={{ duration: 0.9, delay: index * 0.13 + 0.35, ease: 'easeInOut' }}
      />
      {/* Image */}
      <div className="relative h-52 overflow-hidden rounded-t-2xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/40 to-transparent project-image-overlay" />

        {/* Hover tech stack reveal */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 project-stack-overlay"
          style={{ background: 'rgba(11,15,26,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="flex flex-wrap gap-2 justify-center px-4">
            {project.tech.map((t, i) => (
              <motion.span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ background: `${project.accentColor}22`, border: `1px solid ${project.accentColor}55`, color: project.accentColor }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 p-5">
          <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t, i) => (
              <span key={i}
                className="text-xs px-2 py-0.5 rounded-full project-mini-chip"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-full project-mini-chip" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <div className="space-y-2 mb-4 text-sm">
          <p className="text-gray-400">
            <span className="font-semibold" style={{ color: '#ff7b00' }}>Problem: </span>
            {project.problem}
          </p>
          <p className="text-gray-400">
            <span className="font-semibold text-neon-blue">Solution: </span>
            {project.solution}
          </p>
          <p className="text-gray-400">
            <span className="font-semibold text-accent-success">Impact: </span>
            {project.impact}
          </p>
        </div>
        <div className="flex items-center gap-4 pt-2 border-t border-white/5">
          {project.github && (
            <a href={project.github} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-neon-blue transition-colors"
              onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-neon-orange transition-colors"
              onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
          <span className="ml-auto text-xs text-gray-600 flex items-center gap-1">
            <Layers className="h-3 w-3" /> Hover for stack
          </span>
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectsProps {
  content: ProjectsContent;
}

const Projects: React.FC<ProjectsProps> = ({ content }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProjectDetails = (p: Project) => { setSelectedProject(p); document.body.style.overflow = 'hidden'; };
  const closeProjectDetails = () => { setSelectedProject(null); document.body.style.overflow = 'auto'; };

  return (
    <section id="projects" className="py-14 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-10 sm:mb-14 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex justify-center mb-4">
              <span className="section-tag">Projects</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">{content.title}</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {content.subtitle}
            </p>

            {/* Mini stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-8 sm:mt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {[
                { value: `${content.items.length}+`, label: 'Projects', color: '#00F5FF' },
                { value: '15+', label: 'Technologies',  color: '#B24BF3' },
                { value: '2',   label: 'In Production', color: '#00ff9f' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.1, type: 'spring', stiffness: 200 }}
                >
                  <div className="text-2xl font-bold font-grotesk" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5 tracking-wide">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8" style={{ perspective: '1000px' }}>
            {content.items.map((project, i) => (
              <TiltCard key={project.id} project={project} onClick={() => openProjectDetails(project)} index={i} inView={inView} />
            ))}
          </div>

          {/* See All Projects */}
          <motion.div
            className="flex justify-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="https://github.com/km-wahid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-3 group px-5 sm:px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 project-see-all-link"
              style={{
                border: '1px solid rgba(0,245,255,0.25)',
                background: 'rgba(0,245,255,0.05)',
                color: '#00F5FF',
              }}
            >
              <Github className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>See All 20+ Projects on GitHub</span>
              <motion.span
                className="text-xs opacity-60"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >→</motion.span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 project-modal-overlay"
          style={{ background: 'rgba(11,15,26,0.92)', backdropFilter: 'blur(12px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeProjectDetails}
        >
          <motion.div
            className="glass rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{ borderColor: `${selectedProject.accentColor}33`, boxShadow: `0 0 60px ${selectedProject.accentColor}22` }}
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={selectedProject.image} alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 to-transparent rounded-t-2xl" />
              <button
                onClick={closeProjectDetails}
                className="absolute top-4 right-4 glass p-2 rounded-full hover:border-neon-blue/30 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((t, i) => (
                  <span key={i}
                    className="text-sm px-3 py-1 rounded-full font-medium"
                    style={{ background: `${selectedProject.accentColor}15`, border: `1px solid ${selectedProject.accentColor}40`, color: selectedProject.accentColor }}>
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">{selectedProject.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Problem', value: selectedProject.problem, color: '#ff7b00' },
                  { label: 'Solution', value: selectedProject.solution, color: '#00F5FF' },
                  { label: 'Impact',   value: selectedProject.impact,   color: '#00ff66' },
                ].map((item) => (
                  <div key={item.label} className="glass rounded-xl p-4">
                    <h4 className="font-semibold mb-2 text-sm" style={{ color: item.color }}>{item.label}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                {selectedProject.github && (
                  <a href={selectedProject.github} className="neon-button-blue flex items-center gap-2 text-sm"
                    target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" /> View on GitHub
                  </a>
                )}
                {selectedProject.demo && (
                  <a href={selectedProject.demo} className="neon-button-orange flex items-center gap-2 text-sm"
                    target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
