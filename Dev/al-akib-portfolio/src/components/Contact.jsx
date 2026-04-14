import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { IconMail, IconLinkedIn, IconGitHub, IconLocation } from './Icons';
import './Contact.css';

const iconByName = {
  mail: <IconMail size={18} />,
  linkedin: <IconLinkedIn size={18} />,
  github: <IconGitHub size={18} />,
  location: <IconLocation size={18} />,
};

const Contact = ({ contacts = [], footer = {} }) => {
  const ref = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section className="contact section" id="contact">
      <div className="container" ref={ref}>
        <div className="node-label">NODE-05 :: ESTABLISH_CONNECTION</div>
        <h2 className="section-title">Get In <span>Touch</span></h2>
        <p className="section-sub">$ ping al-akib --type=message <span style={{color:'var(--accent)'}}>// TTL=64 ms</span></p>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="ci-header">// CONNECTION ENDPOINTS</div>
            {contacts.map(item => (
              <div key={item.key} className="ci-item">
                <span className="ci-icon">{iconByName[item.icon] || iconByName.location}</span>
                <div>
                  <div className="ci-key">{item.key}</div>
                  {item.href
                    ? <a href={item.href} target="_blank" rel="noreferrer" className="ci-val link">{item.val}</a>
                    : <div className="ci-val"><span className="ok">{item.val}</span></div>
                  }
                </div>
              </div>
            ))}
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="cf-header">// COMPOSE_MESSAGE</div>
            {sent && (
              <div className="success-msg">
                ✓ PACKET DELIVERED — I&apos;ll respond within 24h.
              </div>
            )}
            {[
              { name: 'name', label: '--name', placeholder: 'your_name', type: 'text' },
              { name: 'email', label: '--from', placeholder: 'your@email.com', type: 'email' },
            ].map(f => (
              <div key={f.name} className="form-group">
                <label>
                  <span className="fl-dollar">$</span> send {f.label}=
                  {focused === f.name && <span className="cursor" />}
                </label>
                <input
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  onFocus={() => setFocused(f.name)}
                  onBlur={() => setFocused('')}
                  required
                />
              </div>
            ))}
            <div className="form-group">
              <label>
                <span className="fl-dollar">$</span> send --message=
                {focused === 'message' && <span className="cursor" />}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="your_message..."
                rows={5}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              $ send --execute 🚀
            </button>
          </form>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-inner">
          <span>© {footer.year} {footer.name}</span>
          <span className="footer-sep">|</span>
          <span>{footer.designation}</span>
          <span className="footer-sep">|</span>
          <span className="footer-status">
            <span className="status-dot" /> {footer.status}
          </span>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
