import { useEffect } from 'react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" onClick={e => e.stopPropagation()}>
        <div className="modal-titlebar">
          <div className="tb-dots">
            <span className="tb-dot red" onClick={onClose} title="Close" />
            <span className="tb-dot yellow" />
            <span className="tb-dot green" />
          </div>
          <span className="modal-title">root@node:~$ cat ./projects/{project.slug}.md</span>
        </div>
        <div className="modal-body">
          <div className="modal-icon">{project.icon}</div>
          <h2 className="modal-project-title">{project.title}</h2>
          <div className="modal-section">
            <span className="ms-label">// DESCRIPTION</span>
            <p>{project.desc}</p>
          </div>
          {project.details && (
            <div className="modal-section">
              <span className="ms-label">// TECHNICAL_DETAILS</span>
              <ul>
                {project.details.map((d, i) => <li key={i}><span className="li-arrow">→</span> {d}</li>)}
              </ul>
            </div>
          )}
          <div className="modal-section">
            <span className="ms-label">// TECH_STACK</span>
            <div className="modal-tags">
              {project.tags.map(t => <span key={t}>{t}</span>)}
            </div>
          </div>
          <div className="modal-footer">
            <a href={project.link} className="btn btn-primary" target="_blank" rel="noreferrer">
              ./open --project
            </a>
            <button className="btn btn-outline" onClick={onClose}>
              [ESC] close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
