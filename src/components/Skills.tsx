import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Brain, Cpu, Network, Database, Cloud, Zap, Shield, Code,
  Github, Server, Terminal,
  DatabaseZap, Layers, Bot, FileCode, Layout, Palette, Search
} from 'lucide-react';
import { SkillsContent } from '../content/siteContent';

const SKILL_ICONS: Record<string, React.ReactNode> = {
  // AI & ML Skills
  'AI Engineering': <Brain className="h-5 w-5 text-blue-400" />,
  'LangChain': <Layers className="h-5 w-5 text-purple-400" />,
  'OpenAI API': <Bot className="h-5 w-5 text-green-400" />,
  'RAG': <DatabaseZap className="h-5 w-5 text-indigo-400" />,
  'ML & RAG': <Brain className="h-5 w-5 text-pink-400" />,
  'Vector Databases': <Database className="h-5 w-5 text-cyan-400" />,
  'Vector DB': <Database className="h-5 w-5 text-cyan-400" />,
  'LLM Agents': <Bot className="h-5 w-5 text-emerald-400" />,
  'Prompt Engineering': <FileCode className="h-5 w-5 text-amber-400" />,
  'Machine Learning': <Brain className="h-5 w-5 text-orange-400" />,
  'NumPy': <Layout className="h-5 w-5 text-blue-400" />,
  'Pandas': <Layers className="h-5 w-5 text-blue-400" />,
  'Deep Learning': <Brain className="h-5 w-5 text-purple-400" />,
  'PyTorch': <Cpu className="h-5 w-5 text-red-400" />,
  'TensorFlow': <Cpu className="h-5 w-5 text-orange-400" />,
  'LLMOps': <Network className="h-5 w-5 text-indigo-400" />,
  'ML Pipelines': <Network className="h-5 w-5 text-purple-400" />,
  'API Integration': <Zap className="h-5 w-5 text-yellow-400" />,
  'Vector Search': <Search className="h-5 w-5 text-cyan-400" />,

  // Backend & Database Skills
  'Python': <Terminal className="h-5 w-5 text-blue-400" />,
  'Django': <Server className="h-5 w-5 text-green-400" />,
  'Celery': <Network className="h-5 w-5 text-teal-400" />,
  'Redis': <DatabaseZap className="h-5 w-5 text-amber-400" />,
  'PostgreSQL': <Database className="h-5 w-5 text-blue-400" />,
  'SQL': <Database className="h-5 w-5 text-blue-400" />,
  'MySQL': <Database className="h-5 w-5 text-blue-500" />,

  // DevOps & Tools Skills
  'Docker': <Layers className="h-5 w-5 text-blue-500" />,
  'NGINX': <Server className="h-5 w-5 text-slate-400" />,
  'AWS': <Cloud className="h-5 w-5 text-amber-400" />,
  'Git': <Terminal className="h-5 w-5 text-orange-400" />,
  'GitHub': <Github className="h-5 w-5 text-slate-400" />,
  'Selenium': <Bot className="h-5 w-5 text-purple-400" />,

  // Core Skills
  'JavaScript': <FileCode className="h-5 w-5 text-yellow-400" />,
  'HTML': <FileCode className="h-5 w-5 text-orange-400" />,
  'CSS': <Palette className="h-5 w-5 text-blue-400" />,

  // Mindset Skills
  'Problem Solving': <Shield className="h-5 w-5 text-indigo-400" />,
  'Critical Thinking': <Brain className="h-5 w-5 text-indigo-400" />,
  'Rapid Learning': <Zap className="h-5 w-5 text-yellow-400" />,
  'Growth Mindset': <Cpu className="h-5 w-5 text-emerald-400" />,
  'Communication': <Network className="h-5 w-5 text-teal-400" />,
  'Adaptability': <Layers className="h-5 w-5 text-purple-400" />,
  'Ai Engineer': <Brain className="h-5 w-5 text-blue-400" />,
};

const CATEGORY_COLORS = {
  'AI Engineering': 'border-blue-500/20 bg-blue-500/5',
  'Backend & Database': 'border-teal-500/20 bg-teal-500/5',
  'DevOps & Automation': 'border-amber-500/20 bg-amber-500/5',
  'Core Mindset & Instincts': 'border-indigo-500/20 bg-indigo-500/5',
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'AI Engineering': <Brain className="h-5 w-5 text-blue-400" />,
  'Backend & Database': <Database className="h-5 w-5 text-teal-400" />,
  'DevOps & Automation': <Cloud className="h-5 w-5 text-amber-400" />,
  'Core Mindset & Instincts': <Shield className="h-5 w-5 text-indigo-400" />,
};

interface SkillsProps {
  content: SkillsContent;
}

const Skills: React.FC<SkillsProps> = ({ content }) => {
  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const skills = content.items.map((name) => {
    const category = getCategoryName(name);
    return {
      name,
      category,
      icon: SKILL_ICONS[name] || SKILL_ICONS[category] || <Code className="h-5 w-5 text-slate-400" />,
      color: CATEGORY_COLORS[category] || 'border-slate-600/20 bg-slate-600/5',
    };
  });

  const groupedSkills = skills.reduce((groups, skill) => {
    if (!groups[skill.category]) {
      groups[skill.category] = [];
    }
    groups[skill.category].push(skill);
    return groups;
  }, {} as Record<string, typeof skills>);

  const orderedCategories = [
    'AI Engineering',
    'Backend & Database',
    'DevOps & Automation',
    'Core Mindset & Instincts',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-28 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="section-tag">Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{content.title}</span>
          </h2>
          <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {orderedCategories.map((category) => {
            const categorySkills = groupedSkills[category] || [];
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={category}
                variants={cardVariants}
                className="glass-panel rounded-2xl p-6 border border-slate-700/30"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/30">
                  <div className={`p-2 rounded-lg ${CATEGORY_COLORS[category] || 'border-slate-600/20 bg-slate-600/5'}`}>
                    {CATEGORY_ICONS[category] || <Code className="h-5 w-5 text-slate-400" />}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category}</h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {categorySkills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-700/30 bg-slate-800/40 text-slate-300 hover:text-white hover:border-blue-500/30 transition-all duration-200"
                    >
                      {skill.icon}
                      <span className="text-sm font-medium tracking-wide">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const getCategoryName = (name: string): string => {
  const aiCategories = [
    'AI Engineering', 'LangChain', 'OpenAI API', 'RAG', 'ML & RAG', 'Vector Databases',
    'Vector DB', 'LLM Agents', 'Prompt Engineering', 'Machine Learning', 'NumPy',
    'Pandas', 'Deep Learning', 'PyTorch', 'TensorFlow', 'LLMOps', 'ML Pipelines',
    'API Integration', 'Vector Search'
  ];

  const backendCategories = ['Python', 'Django', 'Celery', 'Redis', 'PostgreSQL', 'SQL', 'MySQL'];

  const devOpsCategories = ['Docker', 'NGINX', 'AWS', 'Git', 'GitHub', 'Selenium'];

  const mindsetCategories = [
    'Problem Solving', 'Critical Thinking', 'Rapid Learning', 'Growth Mindset',
    'Communication', 'Adaptability'
  ];

  if (aiCategories.includes(name)) return 'AI Engineering';
  if (backendCategories.includes(name)) return 'Backend & Database';
  if (devOpsCategories.includes(name)) return 'DevOps & Automation';
  if (mindsetCategories.includes(name)) return 'Core Mindset & Instincts';

  return 'Core Mindset & Instincts';
};

export default Skills;
