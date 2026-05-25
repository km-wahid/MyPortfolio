import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Workflow, Rocket, Briefcase, CheckCircle } from 'lucide-react';
import { ServicesContent } from '../content/siteContent';

interface ServicesProps {
  content: ServicesContent;
}

const Services: React.FC<ServicesProps> = ({ content }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      icon: <Workflow className="h-6 w-6 text-blue-400" />,
      title: 'Django Web Application Development',
      description: 'Build a production-ready Django web app with clean architecture, authentication, database design, and deployment-ready structure.',
      highlights: ['Custom dashboard', 'Database models & API', 'Secure auth flow'],
      color: 'border-blue-500/20 bg-blue-500/5',
    },
    {
      icon: <Rocket className="h-6 w-6 text-teal-400" />,
      title: 'Automation & Bot Solutions',
      description: 'Automate repetitive workflows using Python, Selenium, and task scheduling to save time and improve reliability.',
      highlights: ['Web automation', 'Scheduled jobs', 'Reporting workflow'],
      color: 'border-teal-500/20 bg-teal-500/5',
    },
    {
      icon: <Briefcase className="h-6 w-6 text-indigo-400" />,
      title: 'Backend API & System Design',
      description: 'Design scalable backend systems with clear APIs, robust data flow, and maintainable architecture for long-term growth.',
      highlights: ['REST API design', 'Performance tuning', 'Deployment guidance'],
      color: 'border-indigo-500/20 bg-indigo-500/5',
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-4">
              <span className="section-tag">Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{content.title}</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
              {content.subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={content.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
              >
                {content.fiverrLabel}
              </a>
              <a
                href={content.freelancerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border border-slate-600/30 bg-slate-800/50 hover:bg-slate-800 text-white"
              >
                {content.freelancerLabel}
              </a>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide services-scroll-row">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="glass-panel rounded-2xl p-6 flex flex-col min-w-[300px] max-w-[360px] flex-shrink-0 border border-slate-700/30"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${service.color}`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {service.highlights.map((item) => (
                    <li key={item} className="text-sm text-slate-300 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 border border-slate-600/30 bg-slate-800/50 hover:bg-slate-800 text-white text-center inline-flex justify-center items-center gap-2">
                  Get Started
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
