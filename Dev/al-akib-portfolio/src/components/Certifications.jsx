import useScrollReveal from '../hooks/useScrollReveal';
import { IconShield, IconCloud, IconHack, IconLinux, IconPython } from './Icons';
import './Certifications.css';

const iconByName = {
  shield: (color) => <IconShield size={26} color={color} />,
  cloud: () => <IconCloud size={26} />,
  hack: () => <IconHack size={26} />,
  linux: () => <IconLinux size={26} />,
  python: () => <IconPython size={26} />,
};

const Certifications = ({ certifications = [] }) => {
  const ref = useScrollReveal();
  return (
    <section className="certs section" id="certifications">
      <div className="container" ref={ref}>
        <div className="node-label">NODE-04 :: CREDENTIALS</div>
        <h2 className="section-title">My <span>Certifications</span></h2>
        <p className="section-sub">$ cat ./certs/index.json <span style={{color:'var(--accent)'}}>// {certifications.length} records found</span></p>
        <div className="certs-grid">
          {certifications.map((c, i) => (
            <div key={c.name} className="cert-card terminal-card">
              <div className="cert-row-top">
                <span className="cert-idx">[{String(i).padStart(2,'0')}]</span>
                <span className="cert-icon" style={{ color: c.color }}>
                  {(iconByName[c.iconName] || iconByName.shield)(c.color)}
                </span>
                <span className={`cert-badge ${c.badge === 'VERIFIED' ? 'verified' : 'completed'}`}>
                  {c.badge === 'VERIFIED' ? '✓ VERIFIED' : '✓ COMPLETED'}
                </span>
              </div>
              <h3 style={{ color: c.color }}>{c.name}</h3>
              <p className="cert-issuer">{c.issuer}</p>
              <p className="cert-year">ISSUED: {c.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
