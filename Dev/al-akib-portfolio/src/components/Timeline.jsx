import useScrollReveal from '../hooks/useScrollReveal';
import './Timeline.css';

const Timeline = ({ items = [] }) => {
  const ref = useScrollReveal();

  return (
    <section className="timeline section" id="timeline">
      <div className="container" ref={ref}>
        <div className="node-label">NODE-04 :: TIMELINE</div>
        <h2 className="section-title">Career <span>Timeline</span></h2>
        <p className="section-sub">$ cat ./timeline.log</p>
        <div className="timeline-list">
          {items.map((item, idx) => (
            <div className="timeline-item terminal-card" key={`${item.year}-${item.title}-${idx}`}>
              <div className="timeline-year">{item.year}</div>
              <h3>{item.title}</h3>
              <p className="timeline-org">{item.organization}</p>
              <p className="timeline-summary">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
