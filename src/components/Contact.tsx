import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
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
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
        },
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
    <section id="contact" className="py-20 bg-dark-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-neon-orange mb-4 uppercase font-semibold tracking-wider">Contact</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's <span className="text-gradient-orange">Connect</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or just want to chat about technology? I'm always open to new
              opportunities and collaborations.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
              <div className="bg-dark-300 rounded-lg p-6 border border-dark-100">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-neon-blue" /> Email Me
                </h3>
                <p className="text-gray-400 mb-2">Reach me at:</p>
                <a href="mailto:khalidmuhammad.official@gmail.com" className="text-neon-blue hover:underline">
                  khalidmuhammad.official@gmail.com
                </a>
              </div>

              <div className="bg-dark-300 rounded-lg p-6 border border-dark-100">
                <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/km-wahid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-dark-100 hover:bg-dark-900 text-white p-3 rounded-full transition-colors duration-300"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/khalid-muhammad-wahid-0263b01b3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-dark-100 hover:bg-dark-900 text-white p-3 rounded-full transition-colors duration-300"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="mailto:khalidmuhammad.official@gmail.com"
                    className="bg-dark-100 hover:bg-dark-900 text-white p-3 rounded-full transition-colors duration-300"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="bg-dark-300 rounded-lg p-6 border border-dark-100">
                <h3 className="text-xl font-bold mb-6 font-mono flex items-center">
                  <span className="text-neon-orange mr-2">$</span> Send Message.exe
                </h3>

                {submitSuccess ? (
                  <div className="bg-dark-100 p-6 rounded-lg border border-accent-success text-center">
                    <p className="text-accent-success text-lg mb-2">📨 Message sent!</p>
                    <p className="text-gray-300">I'll get back within 24 hours — no bots, just code.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2 font-mono">$ name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                        className="terminal-input"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2 font-mono">$ email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                        className="terminal-input"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-gray-300 mb-2 font-mono">$ message:</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="terminal-input resize-none"
                        placeholder="I'd like to discuss a project..."
                      />
                    </div>

                    {submitError && <div className="text-accent-error text-sm">{submitError}</div>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="neon-button-orange w-full flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" /> Execute Send Command
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
