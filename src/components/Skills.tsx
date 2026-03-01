import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import {
  SiHtml5, SiCss3, SiJavascript, SiPython, SiDocker, SiGit,
  SiGithub, SiDjango, SiCplusplus, SiNginx, SiCelery, SiRedis,
  SiPostgresql, SiMysql, SiSelenium, SiScrapy,
} from "react-icons/si";

import {
  Brain, MessageSquare, RefreshCcw, TrendingUp, Bolt, Puzzle, Database, Cloud,
} from "lucide-react";

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  const skills = [
    { name: "HTML",           icon: <SiHtml5      className="text-orange-500" />,                  color: 'rgba(249,115,22,0.2)' },
    { name: "CSS",            icon: <SiCss3       className="text-blue-500" />,                    color: 'rgba(59,130,246,0.2)'  },
    { name: "JavaScript",     icon: <SiJavascript className="text-yellow-400" />,                  color: 'rgba(250,204,21,0.2)'  },
    { name: "Python",         icon: <SiPython     className="text-blue-400" />,                    color: 'rgba(96,165,250,0.2)'  },
    { name: "C++",            icon: <SiCplusplus  className="text-blue-500" />,                    color: 'rgba(59,130,246,0.2)'  },
    { name: "Django",         icon: <SiDjango     className="text-green-700" />,                   color: 'rgba(21,128,61,0.2)'   },
    { name: "Git",            icon: <SiGit        className="text-red-500" />,                     color: 'rgba(239,68,68,0.2)'   },
    { name: "GitHub",         icon: <SiGithub     className="text-gray-200" />,                    color: 'rgba(156,163,175,0.15)'},
    { name: "Docker",         icon: <SiDocker     className="text-blue-600" />,                    color: 'rgba(37,99,235,0.2)'   },
    { name: "NGINX",          icon: <SiNginx      className="text-green-600" />,                   color: 'rgba(22,163,74,0.2)'   },
    { name: "Celery",         icon: <SiCelery     className="text-green-400" />,                   color: 'rgba(74,222,128,0.2)'  },
    { name: "Redis",          icon: <SiRedis      className="text-red-600" />,                     color: 'rgba(220,38,38,0.2)'   },
    { name: "PostgreSQL",     icon: <SiPostgresql className="text-blue-700" />,                    color: 'rgba(29,78,216,0.2)'   },
    { name: "MySQL",          icon: <SiMysql      className="text-blue-500" />,                    color: 'rgba(59,130,246,0.2)'  },
    { name: "SQL",            icon: <Database     className="text-purple-400" />,                  color: 'rgba(192,132,252,0.2)' },
    { name: "AWS",            icon: <Cloud        className="text-orange-400" />,                  color: 'rgba(251,146,60,0.2)'  },
    { name: "Selenium",       icon: <SiSelenium   className="text-green-600" />,                   color: 'rgba(22,163,74,0.2)'   },
    { name: "Scrapy",         icon: <SiScrapy     className="text-gray-200" />,                    color: 'rgba(156,163,175,0.15)'},
    { name: "Problem Solving",icon: <Puzzle       className="text-indigo-500" />,                  color: 'rgba(99,102,241,0.2)'  },
    { name: "Critical Thinking",icon: <Brain      className="text-pink-500" />,                    color: 'rgba(236,72,153,0.2)'  },
    { name: "Communication",  icon: <MessageSquare className="text-cyan-400" />,                   color: 'rgba(34,211,238,0.2)'  },
    { name: "Adaptability",   icon: <RefreshCcw   className="text-lime-500" />,                    color: 'rgba(132,204,22,0.2)'  },
    { name: "Growth Mindset", icon: <TrendingUp   className="text-orange-400" />,                  color: 'rgba(251,146,60,0.2)'  },
    { name: "Rapid Learning", icon: <Bolt         className="text-teal-400" />,                    color: 'rgba(45,212,191,0.2)'  },
  ];

  const repeatedSkills = [...skills, ...skills];

  useEffect(() => {
    if (containerRef.current) {
      setScrollWidth(containerRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Dark glass background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(11,15,26,0) 0%, rgba(12,17,24,0.6) 50%, rgba(11,15,26,0) 100%)',
      }} />

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.75 }}
          className="mb-14"
        >
          <div className="flex justify-center mb-4">
            <span className="section-tag">Tech Stack</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            My <span className="text-gradient">Skills & Tools</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm max-w-md mx-auto">
            Technologies I use to architect, automate, and deploy production-grade systems.
          </p>
        </motion.div>

        {/* Row 1 — slides in from left, then scrolls right */}
        <motion.div
          className="relative w-full overflow-hidden"
          ref={containerRef}
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Edge fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #0B0F1A, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(270deg, #0B0F1A, transparent)' }} />

          {scrollWidth > 0 && (
            <motion.div
              className="flex gap-6 whitespace-nowrap py-2"
              animate={{ x: [0, -scrollWidth] }}
              transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
            >
              {repeatedSkills.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.12, y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="flex flex-col items-center text-center min-w-[100px] group"
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-2 transition-all duration-300"
                    style={{
                      background: skill.color,
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
                      {skill.icon}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors duration-200">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Row 2 — slides in from right, then scrolls left */}
        <motion.div
          className="relative w-full overflow-hidden mt-6"
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #0B0F1A, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(270deg, #0B0F1A, transparent)' }} />

          {scrollWidth > 0 && (
            <motion.div
              className="flex gap-6 whitespace-nowrap py-2"
              animate={{ x: [-scrollWidth, 0] }}
              transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
            >
              {[...repeatedSkills].reverse().map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.12, y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="flex flex-col items-center text-center min-w-[100px] group"
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-2 transition-all duration-300"
                    style={{
                      background: skill.color,
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors duration-200">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Glow divider */}
        <div className="mt-14 glow-divider w-2/3" />
      </div>
    </section>
  );
};

export default Skills;
