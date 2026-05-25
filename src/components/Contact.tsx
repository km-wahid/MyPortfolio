import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, Send, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ContactContent, SocialLink } from '../content/siteContent';

interface ContactProps {
  content: ContactContent;
  socials: SocialLink[];
}

const Contact: React.FC<ContactProps> = ({ content, socials }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const leftVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const rightVariants = {
    hidden: { x: 40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const fieldVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 0.4, delay: i * 0.08 } }),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: formState.name, from_email: formState.email, message: formState.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitSuccess(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-l from-teal-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-4">
              <span className="section-tag" style={{ borderColor: 'rgba(20, 184, 166, 0.3)', background: 'rgba(20, 184, 166, 0.08)', color: '#14b8a6' }}>
                Get In Touch
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{content.title}</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
              {content.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div variants={leftVariants} className="lg:col-span-2 space-y-6">
              <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-slate-700/30">
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-3xl" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white">Email Me</h3>
                </div>
                <p className="text-slate-400 text-sm mb-2">Reach me at:</p>
                <a href={`mailto:${content.email}`}
                  className="text-blue-400 text-sm hover:text-blue-300 transition-colors font-medium"
                >
                  {content.email}
                </a>
              </div>

              <div className="glass-panel rounded-2xl p-6 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white">Connect With Me</h3>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {socials.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[90px] flex flex-col items-center gap-2 py-3 rounded-xl border border-slate-700/30 bg-slate-800/40 text-slate-400 hover:text-white hover:border-slate-600 transition-all duration-300"
                      whileHover={{ y: -3 }}
                      title={s.label}
                    >
                      {s.label === 'GitHub' && <Github className="h-5 w-5" />}
                      {s.label === 'LinkedIn' && <Linkedin className="h-5 w-5" />}
                      {s.label === 'Email' && <Mail className="h-5 w-5" />}
                      <span className="text-xs font-medium">{s.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-4 flex items-center gap-3 border border-slate-700/30">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="text-sm text-slate-300">
                  {content.availability}
                </span>
              </div>
            </motion.div>

            <motion.div variants={rightVariants} className="lg:col-span-3">
              <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-700/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/5 to-transparent rounded-tr-3xl" />
                </div>

                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-lg">$</span>
                  <span>Send Message</span>
                </h3>

                {submitSuccess ? (
                  <motion.div
                    className="rounded-xl p-8 text-center border border-green-500/20 bg-green-500/5"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-400" />
                    </div>
                    <p className="text-green-400 text-lg font-semibold mb-2">Message Sent!</p>
                    <p className="text-slate-400 text-sm">I'll get back within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
                      <label className="block text-slate-400 text-sm mb-2 font-medium">
                        Name
                      </label>
                      <input type="text" name="name" value={formState.name}
                        onChange={handleInputChange} required
                        className="terminal-input" placeholder="John Doe" />
                    </motion.div>
                    <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
                      <label className="block text-slate-400 text-sm mb-2 font-medium">
                        Email
                      </label>
                      <input type="email" name="email" value={formState.email}
                        onChange={handleInputChange} required
                        className="terminal-input" placeholder="john@example.com" />
                    </motion.div>
                    <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
                      <label className="block text-slate-400 text-sm mb-2 font-medium">
                        Message
                      </label>
                      <textarea name="message" value={formState.message}
                        onChange={handleInputChange} required rows={5}
                        className="terminal-input resize-none" placeholder="I'd like to discuss a project..." />
                    </motion.div>

                    {submitError && (
                      <p className="text-red-400 text-sm bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
                        {submitError}
                      </p>
                    )}

                    <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
