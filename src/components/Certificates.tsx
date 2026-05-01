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
    <section id="certificates" className="py-12 sm:py-14 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex justify-center mb-4">
              <span className="section-tag">Certificates</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">{content.title}</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{content.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {content.items.map((item, index) => (
              <motion.article
                key={item.id}
                className="glass rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 * index, duration: 0.55 }}
              >
                <div className="h-52 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-gray-300 mb-3">
                    {item.kind === 'Achievement' ? <Trophy className="h-3.5 w-3.5 text-neon-orange" /> : <Award className="h-3.5 w-3.5 text-neon-blue" />}
                    <span>{item.kind}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.organization}</p>
                  {item.credentialId && (
                    <p className="text-xs text-gray-500 mt-2">
                      Credential ID: <span className="text-gray-300">{item.credentialId}</span>
                    </p>
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
