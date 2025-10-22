import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  image: string;
  tech: string[];
  problem: string;
  solution: string;
  impact: string;
  github?: string;
  demo?: string;
  description: string;
}

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const projects: Project[] = [
  {
    id: 1,
    title: 'WhatsApp Campaign Manager',
    image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tech: ['Django', 'Selenium', 'PostgreSQL', 'Redis', 'Bootstrap'],
    problem: 'Manual WhatsApp messaging was limiting business outreach capabilities.',
    solution: 'Automated WhatsApp messaging platform with QR code management and scheduling.',
    impact: 'Increased campaign efficiency by 300% and enabled simultaneous multi-channel outreach.',
    github: 'https://github.com/km-wahid/Whatsapp_Automation',
    demo: 'In Production Server',
    description: 'A comprehensive WhatsApp automation platform built with Django and Selenium. The system manages Chrome profiles, handles QR code authentication, and schedules messages to be sent to customized contact groups. Features include message templating, media attachment support, and detailed analytics dashboards.',
  },
  {
    id: 2,
    title: 'CLO Performance Evaluator',
    image: 'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tech: ['Java', 'Jetty', 'MySQL', 'Chart.js', 'Bootstrap'],
    problem: 'Tracking performance metrics for CLOs required manual calculations and analysis.',
    solution: 'Automated evaluation system with real-time dashboards and reporting.',
    impact: 'Reduced evaluation time from days to minutes and improved accuracy by 95%.',
    github: 'https://github.com/km-wahid/CLOAssessment',
    demo: 'https://cloassessment.onrender.com/',
    description: 'A Java-based application running on Jetty server that evaluates the performance of Collateralized Loan Obligations. The system imports financial data, runs complex calculations, and generates detailed performance reports with visual charts and export capabilities.',
  },
  {
    id: 3,
    title: 'IoT Air Quality Monitoring System',
    image: 'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tech: ['ESP32', 'MQTT', 'InfluxDB', 'Grafana', 'AWS'],
    problem: 'Real-time monitoring of environmental air quality was not available for small areas.',
    solution: 'IoT-based system with ESP32 sensors sending live data to InfluxDB and visualized in Grafana dashboards.',
    impact: 'Enabled continuous monitoring of air quality and real-time data visualization on AWS.',
    github: 'https://github.com/km-wahid/Air-Quality-with-ESP32',
    demo: 'Deployed on AWS (no preview)',
    description: 'A real-time IoT Air Quality Monitoring System using ESP32 sensors that collect environmental data and transmit via MQTT. Data is stored in InfluxDB and visualized in Grafana dashboards deployed on AWS. The system provides live monitoring, historical analysis, and alerting for key air quality metrics.',
  },
  {
    id: 4,
    title: 'Dockerized YouTube Downloader',
    image: 'https://images.pexels.com/photos/2265482/pexels-photo-2265482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tech: ['Python', 'Docker', 'yt-dlp', 'FastAPI', 'React'],
    problem: 'Existing downloaders lacked reliability and format options.',
    solution: 'Containerized application with progress tracking and format selection.',
    impact: 'Achieved 99.8% download success rate and supported 50+ video platforms.',
    github: 'https://github.com/km-wahid/yt-downloder',
    demo :'https://yt-downloder-rmgg.onrender.com/',
    description: 'A containerized YouTube downloader built with Python and yt-dlp, wrapped in a FastAPI backend and React frontend. The application features real-time progress tracking, format selection, batch downloading, and automatic media conversion options. The Docker implementation ensures consistent behavior across different environments.',
  },
];

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-neon-blue mb-4 uppercase font-semibold tracking-wider">Projects</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-gradient">Systems</span> I've Built
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Each project represents a problem solved, a system architected, and value delivered.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="project-card"
                onClick={() => openProjectDetails(project)}
              >
                <div className="relative h-56 overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full bg-dark-900 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-dark-900 text-gray-300">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 mb-2">
                    <strong className="text-neon-orange">Problem:</strong> {project.problem}
                  </p>
                  <p className="text-gray-400 mb-2">
                    <strong className="text-neon-blue">Solution:</strong> {project.solution}
                  </p>
                  <p className="text-gray-400 mb-4">
                    <strong className="text-accent-success">Impact:</strong> {project.impact}
                  </p>
                  <div className="flex space-x-4">
                    {project.github && (
                      <a
                        href={project.github}
                        className="text-gray-400 hover:text-neon-blue transition-colors duration-300 flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-5 w-5 mr-1" /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        className="text-gray-400 hover:text-neon-orange transition-colors duration-300 flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-5 w-5 mr-1" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900 bg-opacity-90">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-dark-200 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-dark-100"
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={closeProjectDetails}
                className="absolute top-4 right-4 bg-dark-900 bg-opacity-70 p-2 rounded-full text-white hover:text-neon-orange transition-colors duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 rounded-full bg-dark-300 text-neon-blue"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-dark-300 p-4 rounded-lg">
                  <h4 className="font-semibold text-neon-orange mb-2">Problem</h4>
                  <p className="text-gray-400">{selectedProject.problem}</p>
                </div>
                <div className="bg-dark-300 p-4 rounded-lg">
                  <h4 className="font-semibold text-neon-blue mb-2">Solution</h4>
                  <p className="text-gray-400">{selectedProject.solution}</p>
                </div>
                <div className="bg-dark-300 p-4 rounded-lg">
                  <h4 className="font-semibold text-accent-success mb-2">Impact</h4>
                  <p className="text-gray-400">{selectedProject.impact}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    className="neon-button-blue"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5 mr-2 inline-block" /> View on GitHub
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    className="neon-button-orange"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-5 w-5 mr-2 inline-block" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Projects;