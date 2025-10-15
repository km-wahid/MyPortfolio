import { motion } from "framer-motion";
import {
  SiHtml5, SiCss3, SiJavascript, SiPython, SiDocker, SiGit,
  SiGithub, SiDjango, SiCplusplus, SiNginx, SiCelery, SiRedis,
  SiPostgresql, SiMysql, SiSelenium, SiScrapy,
} from "react-icons/si";
import { BrainCircuit, Database } from "lucide-react";

const Skills: React.FC = () => {
  const skills = [
    { name: "HTML", icon: <SiHtml5 className="text-orange-500" /> },
    { name: "CSS", icon: <SiCss3 className="text-blue-500" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "Python", icon: <SiPython className="text-blue-400" /> },
    { name: "C++", icon: <SiCplusplus className="text-blue-500" /> },
    { name: "Django", icon: <SiDjango className="text-green-700" /> },
    { name: "Git", icon: <SiGit className="text-red-500" /> },
    { name: "GitHub", icon: <SiGithub className="text-gray-200" /> },
    { name: "Docker", icon: <SiDocker className="text-blue-600" /> },
    { name: "NGINX", icon: <SiNginx className="text-green-600" /> },
    { name: "Celery", icon: <SiCelery className="text-green-400" /> },
    { name: "Redis", icon: <SiRedis className="text-red-600" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-700" /> },
    { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
    { name: "SQL", icon: <Database className="text-purple-400" /> },
    { name: "Selenium", icon: <SiSelenium className="text-green-600" /> },
    { name: "Scrapy", icon: <SiScrapy className="text-black dark:text-white" /> },
    { name: "Problem Solving", icon: <BrainCircuit className="text-indigo-500" /> },
    { name: "Critical Thinking", icon: <BrainCircuit className="text-pink-500" /> },
    { name: "Communication", icon: <BrainCircuit className="text-cyan-400" /> },
    { name: "Adaptability", icon: <BrainCircuit className="text-lime-500" /> },
    { name: "Growth Mindset", icon: <BrainCircuit className="text-orange-400" /> },
    { name: "Rapid Learning", icon: <BrainCircuit className="text-teal-400" /> },
  ];

  return (
    <section id="skills" className="py-20 bg-dark-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
          My <span className="text-gradient-orange">Tech Stack</span>
        </h2>

        {/* Smooth Infinite Horizontal Scroll */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-10 whitespace-nowrap"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            {[...skills, ...skills].map((skill, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.2,
                  y: -8,
                  textShadow: "0px 0px 12px rgba(255,165,0,0.8)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 8 }}
                className="flex flex-col items-center text-center text-white min-w-[120px] hover:text-neon-orange"
              >
                <div className="text-4xl mb-2 transition-transform duration-300">
                  {skill.icon}
                </div>
                <span className="text-sm font-semibold">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Glowing Divider */}
        <div className="mt-12 h-[2px] w-2/3 mx-auto bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-40"></div>
      </div>
    </section>
  );
};

export default Skills;
