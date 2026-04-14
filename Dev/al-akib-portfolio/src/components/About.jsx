import useScrollReveal from '../hooks/useScrollReveal';
import './About.css';

const About = ({ about }) => {
  const ref = useScrollReveal();
  return (
    <section className="about section" id="about">
      <div className="container" ref={ref}>
        <div className="node-label">NODE-01 :: SYS_INFO</div>
        <h2 className="section-title">About <span>Me</span></h2>
        <div className="about-grid">
          <div className="about-avatar">
            <div className="avatar-ring">
              <div className="avatar-hex">
                <span>🌐</span>
                <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
              </div>
            </div>
            <div className="node-id">NODE ID: 0x1A2B3C</div>
          </div>
            <div className="about-text">
              <div className="term-prompt-line"><span className="p-dollar">$</span> cat about.txt</div>
              <p>{about?.bio}</p>
              <p>
                {about?.details}
              </p>
              <div className="about-stats">
                <div className="stat-item"><span className="stat-key">DEGREE</span><span className="stat-val">{about?.degree}</span></div>
                <div className="stat-item"><span className="stat-key">STATUS</span><span className="stat-val ok">{about?.status}</span></div>
                <div className="stat-item"><span className="stat-key">MODE</span><span className="stat-val">{about?.mode}</span></div>
              </div>
            <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-primary">
              ./connect --now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
