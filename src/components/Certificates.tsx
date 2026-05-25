import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Trophy } from 'lucide-react';
import { CertificatesContent } from '../content/siteContent';

interface CertificatesProps {
  content: CertificatesContent;
}

const Certificates: React.FC<CertificatesProps> = ({ content }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="certificates" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-4">
              <span className="section-tag">Achievements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{content.title}</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">{content.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.items.map((item, index) => (
              <motion.article
                key={item.id}
                className="glass-panel rounded-2xl overflow-hidden group"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * index, duration: 0.4 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/10 backdrop-blur-sm">
                      {item.kind === 'Achievement' ? <Trophy className="h-3.5 w-3.5 text-amber-400" /> : <Award className="h-3.5 w-3.5 text-blue-400" />}
                      <span>{item.kind}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm mb-3">{item.organization}</p>
                  {item.credentialId && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>Credential ID: {item.credentialId}</span>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
