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
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ boxShadow: `0 20px 60px ${project.accentColor}22, 0 0 0 1px ${project.accentColor}33` }}
    >
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-slate-900/80 backdrop-blur-sm">
          <div className="flex flex-wrap gap-2 justify-center px-4">
            {project.tech.map((t, i) => (
              <motion.span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full font-medium"
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

        <div className="absolute bottom-0 left-0 p-5">
          <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t, i) => (
              <span key={i}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-600/30 text-slate-300"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900/60 border border-slate-600/30 text-slate-400">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3 mb-5 text-sm">
          <p className="text-slate-400">
            <span className="font-semibold text-amber-400">Problem: </span>
            {project.problem}
          </p>
          <p className="text-slate-400">
            <span className="font-semibold text-blue-400">Solution: </span>
            {project.solution}
          </p>
          <p className="text-slate-400">
            <span className="font-semibold text-green-400">Impact: </span>
            {project.impact}
          </p>
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-slate-700/30">
          {project.github && (
            <a href={project.github} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-400 transition-colors"
              onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-400 transition-colors"
              onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
          <span className="ml-auto text-xs text-slate-500 flex items-center gap-1">
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
    <section id="projects" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <span className="section-tag">Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{content.title}</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              {content.subtitle}
            </p>

            <motion.div
              className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              {[
                { value: '20+', label: 'Projects', color: '#3b82f6' },
                { value: '15+', label: 'Technologies', color: '#14b8a6' },
                { value: '4', label: 'In Production', color: '#10b981' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.08, type: 'spring', stiffness: 200 }}
                >
                  <div className="text-3xl font-bold font-grotesk" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1 tracking-wide">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8" style={{ perspective: '1000px' }}>
            {content.items.map((project, i) => (
              <TiltCard key={project.id} project={project} onClick={() => openProjectDetails(project)} index={i} inView={inView} />
            ))}
          </div>

          <motion.div
            className="flex justify-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a
              href="https://github.com/km-wahid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 border border-slate-600/30 bg-slate-800/50 text-white hover:bg-slate-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <Github className="h-4 w-4" />
              <span>View All 20+ Projects on GitHub</span>
              <motion.span
                className="text-xs opacity-60"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >→</motion.span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(12px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeProjectDetails}
        >
          <motion.div
            className="glass-panel rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{ borderColor: `${selectedProject.accentColor}33` }}
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={selectedProject.image} alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent rounded-t-2xl" />
              <button
                onClick={closeProjectDetails}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/50 hover:bg-slate-900/80 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((t, i) => (
                  <span key={i}
                    className="text-sm px-3 py-1.5 rounded-lg font-medium"
                    style={{ background: `${selectedProject.accentColor}15`, border: `1px solid ${selectedProject.accentColor}40`, color: selectedProject.accentColor }}>
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">{selectedProject.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Problem', value: selectedProject.problem, colorClass: 'text-amber-400' },
                  { label: 'Solution', value: selectedProject.solution, colorClass: 'text-blue-400' },
                  { label: 'Impact', value: selectedProject.impact, colorClass: 'text-green-400' },
                ].map((item) => (
                  <div key={item.label} className="glass-card rounded-xl p-4">
                    <h4 className={`font-semibold mb-2 text-sm ${item.colorClass}`}>{item.label}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                {selectedProject.github && (
                  <a href={selectedProject.github} className="flex-1 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" /> View on GitHub
                  </a>
                )}
                {selectedProject.demo && (
                  <a href={selectedProject.demo} className="flex-1 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-slate-600/30 bg-slate-800/50 hover:bg-slate-800 text-white"
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
