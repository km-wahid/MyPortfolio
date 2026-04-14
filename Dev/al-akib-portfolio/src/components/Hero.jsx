import { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({ hero }) => {
  const fullName = hero?.name || 'Al-Akib';
  const subtitle = hero?.designation || 'Network Engineer | CSE Graduate';
  const description = hero?.statusText || 'Open to opportunities in networking and infrastructure roles.';
  const primaryButtonTarget = hero?.primaryButtonTarget || 'projects';
  const secondaryButtonTarget = hero?.secondaryButtonTarget || 'contact';
  const socials = Array.isArray(hero?.socials) ? hero.socials : [];

  const [displayed, setDisplayed] = useState('');
  const [sub, setSub] = useState('');
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed('');
    setShowSub(false);
    setSub('');
    const t = setInterval(() => {
      setDisplayed(fullName.slice(0, ++i));
      if (i >= fullName.length) { clearInterval(t); setShowSub(true); }
    }, 100);
    return () => clearInterval(t);
  }, [fullName]);

  useEffect(() => {
    if (!showSub) return;
    let i = 0;
    const t = setInterval(() => {
      setSub(subtitle.slice(0, ++i));
      if (i >= subtitle.length) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, [showSub, subtitle]);

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="node-label">NODE-00 :: INIT_SEQUENCE</div>
        <div className="hero-terminal">
          <div className="terminal-titlebar">
            <span className="tb-dot red" /><span className="tb-dot yellow" /><span className="tb-dot green" />
            <span className="tb-title">root@network-node:~</span>
          </div>
          <div className="terminal-body">
            <div className="term-line">
              <span className="prompt-user">root@node</span>
              <span className="prompt-sep">:</span>
              <span className="prompt-path">~</span>
              <span className="prompt-dollar">$</span>
              <span className="term-cmd"> whoami</span>
            </div>
            <div className="term-output name-output">
              {displayed}<span className="cursor" style={{ opacity: displayed.length < fullName.length ? 1 : 0 }} />
            </div>
            {showSub && (
              <>
                <div className="term-line">
                  <span className="prompt-user">root@node</span>
                  <span className="prompt-sep">:</span>
                  <span className="prompt-path">~</span>
                  <span className="prompt-dollar">$</span>
                  <span className="term-cmd"> cat role.txt</span>
                </div>
                <div className="term-output sub-output">
                  {sub}<span className="cursor" style={{ opacity: sub.length < subtitle.length ? 1 : 0 }} />
                </div>
              </>
            )}
            {sub.length >= subtitle.length && (
              <>
                <div className="term-line">
                  <span className="prompt-user">root@node</span>
                  <span className="prompt-sep">:</span>
                  <span className="prompt-path">~</span>
                  <span className="prompt-dollar">$</span>
                  <span className="term-cmd"> ping --target=opportunities</span>
                </div>
                <div className="term-output status-line">
                  PING opportunities: 56 bytes of data. <span className="ok">[{description.toUpperCase()}]</span>
                </div>
                <div className="term-line blink-line">
                  <span className="prompt-user">root@node</span>
                  <span className="prompt-sep">:</span>
                  <span className="prompt-path">~</span>
                  <span className="prompt-dollar">$</span>
                  <span className="cursor" />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="hero-btns">
          <a href={`#${primaryButtonTarget}`} onClick={e => { e.preventDefault(); document.getElementById(primaryButtonTarget)?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-primary">
            {hero?.primaryButtonText || './view --projects'}
          </a>
          <a href={`#${secondaryButtonTarget}`} onClick={e => { e.preventDefault(); document.getElementById(secondaryButtonTarget)?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-outline">
            {hero?.secondaryButtonText || './contact --me'}
          </a>
        </div>
        <div className="hero-socials">
          {socials.map((s) => (
            <a key={`${s.label}-${s.href}`} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
