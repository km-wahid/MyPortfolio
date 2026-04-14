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
    hidden:   { y: 24, opacity: 0, filter: 'blur(4px)' },
    visible:  { y: 0,  opacity: 1, filter: 'blur(0px)', transition: { duration: 0.65 } },
  };

  const leftVariants = {
    hidden:  { x: -60, opacity: 0, filter: 'blur(6px)' },
    visible: { x: 0,   opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const rightVariants = {
    hidden:  { x: 60, opacity: 0, filter: 'blur(6px)' },
    visible: { x: 0,  opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const fieldVariants = {
    hidden:  { y: 20, opacity: 0 },
    visible: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 0.5, delay: i * 0.08 } }),
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
    <section id="contact" className="py-14 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background radial */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(178,75,243,0.04) 0%, transparent 70%)',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-14 md:mb-16">
            <div className="flex justify-center mb-4">
              <span className="section-tag" style={{ color: '#ff7b00', borderColor: 'rgba(255,123,0,0.3)', background: 'rgba(255,123,0,0.05)' }}>
                Contact
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient-orange">{content.title}</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {content.subtitle}
            </p>
          </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Left: info */}
            <motion.div variants={leftVariants} className="lg:col-span-2 space-y-6">
              {/* Email card */}
              <div className="glass glass-hover rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none" style={{
                  background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)',
                }} />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-neon-blue" />
                  </div>
                  <h3 className="font-semibold text-white">Email Me</h3>
                </div>
                <p className="text-gray-500 text-sm mb-1">Reach me at:</p>
                <a href={`mailto:${content.email}`}
                  className="text-neon-blue text-sm hover:underline underline-offset-2">
                  {content.email}
                </a>
              </div>

              {/* Socials card */}
              <div className="glass glass-hover rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-neon-purple" />
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
                       className="flex-1 min-w-[92px] flex flex-col items-center gap-1.5 py-3 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
                      style={{
                        background:
                          s.label === 'GitHub'
                            ? 'rgba(255,255,255,0.1)'
                            : s.label === 'LinkedIn'
                              ? 'rgba(0,119,181,0.2)'
                              : 'rgba(0,245,255,0.15)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                      whileHover={{ y: -3, scale: 1.02 }}
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

              {/* Availability badge */}
              <div className="glass rounded-2xl p-4 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-success animate-glowPulse flex-shrink-0"
                  style={{ boxShadow: '0 0 8px #00ff66' }} />
                <span className="text-sm text-gray-300">
                  {content.availability}
                </span>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div variants={rightVariants} className="lg:col-span-3">
               <div className="glass glass-hover rounded-2xl p-5 sm:p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none" style={{
                  background: 'radial-gradient(circle, rgba(178,75,243,0.05) 0%, transparent 70%)',
                }} />

                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <span className="text-neon-orange font-mono">$</span>
                  <span>Send Message.exe</span>
                </h3>

                {submitSuccess ? (
                  <motion.div
                    className="rounded-xl p-8 text-center"
                    style={{ background: 'rgba(0,255,102,0.05)', border: '1px solid rgba(0,255,102,0.2)' }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <div className="text-4xl mb-3">📨</div>
                    <p className="text-accent-success text-lg font-semibold mb-1">Message sent!</p>
                    <p className="text-gray-400 text-sm">I'll get back within 24 hours — no bots, just code.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
                      <label className="block text-gray-400 text-sm mb-2 font-mono">
                        <span className="text-neon-blue">$</span> name
                      </label>
                      <input type="text" name="name" value={formState.name}
                        onChange={handleInputChange} required
                        className="terminal-input" placeholder="John Doe" />
                    </motion.div>
                    <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
                      <label className="block text-gray-400 text-sm mb-2 font-mono">
                        <span className="text-neon-blue">$</span> email
                      </label>
                      <input type="email" name="email" value={formState.email}
                        onChange={handleInputChange} required
                        className="terminal-input" placeholder="john@example.com" />
                    </motion.div>
                    <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
                      <label className="block text-gray-400 text-sm mb-2 font-mono">
                        <span className="text-neon-blue">$</span> message
                      </label>
                      <textarea name="message" value={formState.message}
                        onChange={handleInputChange} required rows={5}
                        className="terminal-input resize-none"
                        placeholder="I'd like to discuss a project..." />
                    </motion.div>

                    {submitError && (
                      <p className="text-accent-error text-sm">{submitError}</p>
                    )}

                    <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gradient-border-btn flex items-center justify-center gap-2 disabled:opacity-60"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {isSubmitting ? (
                        <motion.span
                          className="flex items-center gap-2 text-gray-300"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          <motion.span
                            style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#00F5FF' }}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          />
                          Processing...
                        </motion.span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Execute Send Command</span>
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
