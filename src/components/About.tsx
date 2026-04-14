import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Cpu, Rocket, Code } from 'lucide-react';
import { AboutContent } from '../content/siteContent';

interface AboutProps {
  content: AboutContent;
}

const About: React.FC<AboutProps> = ({ content }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden:   { y: 30, opacity: 0, filter: 'blur(4px)' },
    visible:  { y: 0,  opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7 } },
  };
  const slideLeft  = { hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8 } } };
  const slideRight = { hidden: { x:  40, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8 } } };

  const highlights = [
    {
      icon: <Brain className="h-5 w-5 text-neon-blue" />,
      title: 'System-level thinking',
      description: 'Passion for understanding complex systems and architectures from the ground up.',
      color: 'rgba(0,245,255,0.15)',
      border: 'rgba(0,245,255,0.3)',
    },
    {
      icon: <Cpu className="h-5 w-5 text-neon-orange" />,
      title: 'Real Projects',
      description: 'Experience building WhatsApp automation, CLO tools, and Django + Selenium apps.',
      color: 'rgba(255,123,0,0.1)',
      border: 'rgba(255,123,0,0.3)',
    },
    {
      icon: <Rocket className="h-5 w-5 text-neon-purple" />,
      title: 'Automation Focus',
      description: 'Dedicated to turning complexity into clean, automated systems.',
      color: 'rgba(178,75,243,0.1)',
      border: 'rgba(178,75,243,0.3)',
    },
    {
      icon: <Code className="h-5 w-5 text-accent-success" />,
      title: 'Future Builder',
      description: "Every line of code is a brick in the future I'm building.",
      color: 'rgba(0,255,102,0.08)',
      border: 'rgba(0,255,102,0.25)',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-20 relative overflow-hidden">
      {/* Glow divider top */}
      <div className="glow-divider w-2/3 mb-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative z-10"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <span className="section-tag">About Me</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              {content.title} <span className="text-gradient">{content.subtitle}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Bio card */}
            <motion.div variants={slideLeft}>
              <div
                className="glass rounded-2xl p-8 glass-hover relative overflow-hidden"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
              >
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none" style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.1) 0%, transparent 60%)',
                  borderRadius: '0 0 100% 0',
                }} />
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none" style={{
                  background: 'linear-gradient(315deg, rgba(178,75,243,0.1) 0%, transparent 60%)',
                  borderRadius: '100% 0 0 0',
                }} />

                {content.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${paragraph.slice(0, 20)}-${index}`}
                    className={`text-gray-300 text-lg leading-relaxed ${index < content.paragraphs.length - 1 ? 'mb-5' : ''}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Highlight cards */}
            <motion.div variants={slideRight}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    className="glass rounded-xl p-5 transition-all duration-300 relative overflow-hidden group"
                    style={{ borderColor: item.border }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${item.color} 0%, transparent 70%)` }}
                    />
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 relative"
                      style={{ background: item.color, border: `1px solid ${item.border}` }}
                    >
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="glow-divider w-2/3 mt-24" />
    </section>
  );
};

export default About;
