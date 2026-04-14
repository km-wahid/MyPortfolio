import useScrollReveal from '../hooks/useScrollReveal';
import './Skills.css';

const Skills = ({ skillGroups = [] }) => {
  const ref = useScrollReveal();
  return (
    <section className="skills section" id="skills">
      <div className="container" ref={ref}>
        <div className="node-label">NODE-02 :: CAPABILITIES</div>
        <h2 className="section-title">My <span>Skills</span></h2>
        <p className="section-sub">$ ls -la ./skills/  <span style={{color:'var(--accent)'}}>// hover tags for details</span></p>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div key={group.category} className="skill-card terminal-card">
              <div className="skill-card-header">
                <span className="skill-id">[{group.id}]</span>
                <h3>{group.category}</h3>
              </div>
              <div className="skill-tags">
                {group.skills.map((s) => (
                  <span key={s.name} className="skill-tag" data-tip={s.tip}>
                    {s.name}
                    <span className="tooltip">{s.tip}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
