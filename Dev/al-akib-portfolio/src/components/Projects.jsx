import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import ProjectModal from './ProjectModal';
import './Projects.css';

const Projects = ({ projects = [] }) => {
  const ref = useScrollReveal();
  const [active, setActive] = useState(null);

  return (
    <section className="projects section" id="projects">
      <div className="container" ref={ref}>
        <div className="node-label">NODE-03 :: PROJECT_LIST</div>
        <h2 className="section-title">My <span>Projects</span></h2>
        <p className="section-sub">$ ls ./projects/ <span style={{color:'var(--accent)'}}>// click any node to inspect</span></p>
        <div className="projects-grid">
          {projects.map((p, idx) => (
            <div key={p.slug} className="project-card terminal-card" onClick={() => setActive(p)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setActive(p)}>
              <div className="pc-header">
                <span className="pc-index">[{String(idx).padStart(2,'0')}]</span>
                <span className="pc-icon">{p.icon}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(t => <span key={t}>{t}</span>)}
              </div>
              <div className="pc-open">→ INSPECT NODE</div>
            </div>
          ))}
        </div>
      </div>
      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
};

export default Projects;
