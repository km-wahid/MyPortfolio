import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Rocket, Workflow, ExternalLink } from 'lucide-react';
import { ServicesContent } from '../content/siteContent';

interface ServicesProps {
  content: ServicesContent;
}

const Services: React.FC<ServicesProps> = ({ content }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <span className="section-tag">Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">{content.title}</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              {content.subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={content.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button-blue flex items-center gap-2 text-sm"
              >
                {content.fiverrLabel} <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={content.freelancerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button-orange flex items-center gap-2 text-sm"
              >
                {content.freelancerLabel} <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-2 services-scroll-row">
            {content.items.map((service, index) => (
              <motion.div
                key={service.id}
                className="glass rounded-2xl p-6 glass-hover h-full flex flex-col min-w-[320px] md:min-w-[360px] max-w-[420px] flex-shrink-0"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.12, duration: 0.55 }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 border"
                  style={{ background: service.accent, borderColor: 'rgba(255,255,255,0.18)' }}
                >
                  {index % 3 === 0 && <Workflow className="h-5 w-5" />}
                  {index % 3 === 1 && <Rocket className="h-5 w-5" />}
                  {index % 3 === 2 && <Briefcase className="h-5 w-5" />}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.highlights.map((item) => (
                    <li key={item} className="text-sm text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="gradient-border-btn w-full justify-center text-center inline-flex mt-auto">
                  Buy Service
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
