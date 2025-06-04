import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Database, BrainCircuit
} from 'lucide-react';

import Gear from './Gear'; // Make sure this exists or comment out

import {
  SiHtml5, SiCss3, SiJavascript, SiPython, SiDocker, SiGit,
  SiGithub, SiDjango, SiCplusplus, SiNginx, SiCelery, SiRedis,
  SiPostgresql, SiMysql, SiSelenium, SiScrapy,
} from 'react-icons/si';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const skills = [
    { name: 'HTML', icon: <SiHtml5 className="text-orange-500" /> },
    { name: 'CSS', icon: <SiCss3 className="text-blue-500" /> },
    { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
    { name: 'Python', icon: <SiPython className="text-blue-400" /> },
    { name: 'C++', icon: <SiCplusplus className="text-blue-500" /> },
    { name: 'Django', icon: <SiDjango className="text-green-700" /> },
    { name: 'Git', icon: <SiGit className="text-red-500" /> },
    { name: 'GitHub', icon: <SiGithub className="text-gray-200" /> },
    { name: 'Docker', icon: <SiDocker className="text-blue-600" /> },
    { name: 'NGINX', icon: <SiNginx className="text-green-600" /> },
    { name: 'Celery', icon: <SiCelery className="text-green-400" /> },
    { name: 'Redis', icon: <SiRedis className="text-red-600" /> },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-700" /> },
    { name: 'MySQL', icon: <SiMysql className="text-blue-500" /> },
    { name: 'SQL', icon: <Database className="text-purple-400" /> },
    { name: 'Selenium', icon: <SiSelenium className="text-green-600" /> },
    { name: 'Scrapy', icon: <SiScrapy className="text-black dark:text-white" /> },
    { name: 'Problem Solving', icon: <BrainCircuit className="text-indigo-500" /> },
    { name: 'Critical Thinking', icon: <BrainCircuit className="text-pink-500" /> },
    { name: 'Communication', icon: <BrainCircuit className="text-cyan-400" /> },
    { name: 'Adaptability', icon: <BrainCircuit className="text-lime-500" /> },
    { name: 'Growth Mindset', icon: <BrainCircuit className="text-orange-400" /> },
    { name: 'Rapid Learning', icon: <BrainCircuit className="text-teal-400" /> },
  ];

  return (
    <section id="skills" className="py-20 bg-dark-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Gears */}
        <Gear size={250} top="60%" right="5%" opacity={0.05} className="animate-rotateGear hidden lg:block" />
        <Gear size={180} bottom="10%" left="10%" opacity={0.05} className="animate-slowRotateGear hidden lg:block" />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative z-10"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-neon-orange mb-4 uppercase font-semibold tracking-wider">Tech Stack</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The <span className="text-gradient-orange">Skills</span> I Own
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A curated set of technical and soft skills that power my ability to build impactful and scalable software systems.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-dark-100 rounded-lg p-4 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl mb-2">{skill.icon}</div>
                <span className="text-sm font-semibold text-white">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
