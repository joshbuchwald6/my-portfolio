'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, User, Briefcase, Mail } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  category: string;
  color: string;
  logo: string;
  bgColor: string;
  textColor: string;
  fullContent: {
    overview: string;
    challenges: string[];
    solutions: string[];
    results: string[];
    pdf: string;
  };
}

const projects: Project[] = [
  {
    title: 'Ebay Campaign',
    description: 'Strategic digital marketing campaign showcasing innovative approaches.',
    category: 'Digital Marketing',
    color: '#E53238',
    logo: '/images/ebay.svg',
    bgColor: '#FFFFFF',
    textColor: '#2B2B2B',
    fullContent: {
      overview: 'Led a transformative digital marketing campaign for eBay, focusing on user engagement and market expansion.',
      challenges: [
        'Increasing user engagement in competitive marketplace',
        'Differentiating brand messaging in saturated market',
        'Optimizing conversion rates across multiple channels'
      ],
      solutions: [
        'Developed targeted social media strategy reaching 2M+ users',
        'Implemented data-driven A/B testing improving CTR by 45%',
        'Created cohesive cross-platform campaign narrative'
      ],
      results: [
        '156% increase in user engagement',
        '43% improvement in conversion rates',
        '2.1M new platform visitors'
      ],
      pdf: '/pdfs/ebay-case-study.pdf'
    }
  },
  {
    title: 'Nikon Presentation',
    description: 'Professional brand presentation highlighting product innovation.',
    category: 'Brand Strategy',
    color: '#FFD700',
    logo: '/images/Nikon_Logo.svg',
    bgColor: '#000000',
    textColor: '#FFFFFF',
    fullContent: {
      overview: "Developed comprehensive brand strategy and product launch campaign for Nikon's latest DSLR series.",
      challenges: [
        'Positioning premium products in competitive market',
        'Communicating technical excellence to diverse audience',
        'Building brand loyalty in digital age'
      ],
      solutions: [
        'Created immersive product storytelling campaign',
        'Developed influencer partnership program',
        'Implemented multi-channel marketing strategy'
      ],
      results: [
        '89% positive brand sentiment increase',
        '1.2M social media impressions',
        '67% increase in professional segment sales'
      ],
      pdf: '/pdfs/nikon-case-study.pdf'
    }
  },
  {
    title: 'CYM Coffee Co.',
    description: 'Brand identity and marketing strategy for an artisanal coffee company.',
    category: 'Brand Identity',
    color: '#6F4E37',
    logo: '/images/CYM.jpg',
    bgColor: '#F5F0EB',
    textColor: '#2B2B2B',
    fullContent: {
      overview: 'Created complete brand identity and launch strategy for boutique coffee roaster entering competitive market.',
      challenges: [
        'Establishing unique brand identity in saturated market',
        'Creating compelling storytelling around artisanal process',
        'Developing loyal customer base from scratch'
      ],
      solutions: [
        'Designed distinctive visual identity system',
        'Created engaging origin story narrative',
        'Implemented local community engagement strategy'
      ],
      results: [
        '200% growth in first year',
        '15K+ social media following',
        '92% customer retention rate'
      ],
      pdf: '/pdfs/cym-case-study.pdf'
    }
  }
];

const skills = [
  { name: 'Brand Strategy', level: 95 },
  { name: 'Marketing', level: 90 },
  { name: 'Digital Campaigns', level: 85 },
  { name: 'Content Creation', level: 88 },
  { name: 'Social Media', level: 92 },
  { name: 'Analytics', level: 85 }
];

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Work', href: '#projects', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault();
      const targetId = (e.target as HTMLAnchorElement).getAttribute('href')?.slice(1);
      const targetElement = document.getElementById(targetId!);
      targetElement?.scrollIntoView({ behavior: 'smooth' });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleScroll);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  useEffect(() => {
    const header = document.querySelector('.header');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`relative pt-5 mb-5 flex justify-center z-50`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <nav className="flex items-center space-x-1 bg-zinc-900/70 backdrop-blur-lg text-white p-1.5 rounded-full shadow-lg border border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} passHref legacyBehavior>
                <motion.a
                  className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm transition-colors duration-200 text-gray-400 hover:text-white`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon className={`relative z-10 h-4 w-4 shrink-0`} />
                  <span className="relative z-10 whitespace-nowrap">{item.name}</span>
                </motion.a>
              </Link>
            );
          })}
        </nav>
      </motion.header>
      <main className="min-h-screen bg-white text-gray-900">
        {/* Hero Section */}
        <section id="home" className="h-screen flex items-center justify-center bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center relative z-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1 }} 
                className="text-6xl md:text-7xl font-semibold mb-8 text-gray-800"
                style={{ letterSpacing: "-0.02em" }}
              >
                Sara Beer
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.2 }} 
                className="text-xl md:text-2xl text-gray-600 font-light"
              >
                Combined Degree Public Relations Student at the University of Florida
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-6 py-3 bg-pink-500 text-white rounded-full text-lg font-medium hover:bg-pink-600 transition-colors"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                Contact Me
              </motion.button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-8 md:px-24 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-light mb-4 text-gray-900">About Me</h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-lg text-gray-700"
                >
                  I am a <span className="font-semibold text-blue-500">Public Relations</span> student with a passion for <span className="font-semibold text-blue-500">creative storytelling</span> and <span className="font-semibold text-blue-500">strategic communication</span>.
                </motion.p>
              </div>
              <motion.div
                className="rounded-xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/images/headshot.png"
                  alt="About Me Photo"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-24 px-8 md:px-24 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-8">
              <motion.div
                className="flex-none w-full md:w-1/3 flex items-center gap-4 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src="/images/linkedin.svg" alt="LinkedIn" width={50} height={50} />
                <div className="text-left">
                  <span className="text-xl font-semibold text-blue-900">Mobile Marketing Strategy</span>
                  <p className="text-sm text-gray-600">LinkedIn</p>
                </div>
              </motion.div>
              <motion.div
                className="flex-none w-full md:w-1/3 flex items-center gap-4 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src="/images/google.svg" alt="Google" width={50} height={50} />
                <div className="text-left">
                  <span className="text-xl font-semibold text-blue-900">Google Analytics</span>
                  <p className="text-sm text-gray-600">Google</p>
                </div>
              </motion.div>
              <motion.div
                className="flex-none w-full md:w-1/3 flex items-center gap-4 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src="/images/hootsuite.svg" alt="Hootsuite" width={50} height={50} />
                <div className="text-left">
                  <span className="text-xl font-semibold text-blue-900">Hootsuite Platform Certification</span>
                  <p className="text-sm text-gray-600">Hootsuite</p>
                </div>
              </motion.div>
              <motion.div
                className="flex-none w-full md:w-1/3 flex items-center gap-4 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src="/images/microsoft.svg" alt="Microsoft" width={50} height={50} />
                <div className="text-left">
                  <span className="text-xl font-semibold text-blue-900">Microsoft PowerPoint 2013</span>
                  <p className="text-sm text-gray-600">Microsoft</p>
                </div>
              </motion.div>
              <motion.div
                className="flex-none w-full md:w-1/3 flex items-center gap-4 bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image src="/images/microsoft.svg" alt="Microsoft" width={50} height={50} />
                <div className="text-left">
                  <span className="text-xl font-semibold text-blue-900">Microsoft Word 2013 Certification</span>
                  <p className="text-sm text-gray-600">Microsoft</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-8 md:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-32">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                  style={{ backgroundColor: project.bgColor }}
                >
                  <div className="grid md:grid-cols-2 items-center">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br"
                        style={{ 
                          backgroundColor: project.color,
                          opacity: 0.1
                        }}
                        whileHover={{ opacity: 0.2 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="relative w-full h-full">
                          <Image
                            src={project.logo}
                            alt={project.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-12" style={{ color: project.textColor }}>
                      <span 
                        className="inline-block px-4 py-1 rounded-full text-sm mb-4 font-medium"
                        style={{ 
                          backgroundColor: project.color + '22',
                          color: project.color
                        }}
                      >
                        {project.category}
                      </span>
                      <h2 className="text-4xl font-light mb-4">{project.title}</h2>
                      <p className="opacity-80 text-lg">{project.description}</p>
                      <motion.button
                        className="mt-6 text-sm font-medium flex items-center gap-2"
                        style={{ color: project.color }}
                        whileHover={{ x: 5 }}
                      >
                        View Case Study
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Project Lightbox */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 p-4 md:p-8 overflow-y-auto"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl max-w-4xl mx-auto p-8 md:p-12 relative"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <button
                  className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="relative h-32 mb-8">
                  <Image
                    src={selectedProject.logo}
                    alt={selectedProject.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <span 
                  className="inline-block px-4 py-1 rounded-full text-sm mb-4 font-medium"
                  style={{ 
                    backgroundColor: selectedProject.color + '22',
                    color: selectedProject.color
                  }}
                >
                  {selectedProject.category}
                </span>
                <h2 className="text-4xl font-light mb-6 text-gray-900">{selectedProject.title}</h2>
                
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-light mb-4 text-gray-900">Overview</h3>
                    <p className="text-gray-700 text-lg">{selectedProject.fullContent.overview}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-xl font-light mb-4 text-gray-900">Challenges</h3>
                      <ul className="space-y-3">
                        {selectedProject.fullContent.challenges.map((challenge: string, i: number) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 text-gray-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedProject.color }} />
                            {challenge}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-light mb-4 text-gray-900">Solutions</h3>
                      <ul className="space-y-3">
                        {selectedProject.fullContent.solutions.map((solution: string, i: number) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 text-gray-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedProject.color }} />
                            {solution}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-light mb-4 text-gray-900">Results</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {selectedProject.fullContent.results.map((result: string, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-gray-50 rounded-xl p-6 text-center"
                        >
                          <p className="text-gray-700 font-medium">{result}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <a
                      href={selectedProject.fullContent.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      View Presentation
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-8 md:px-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-light mb-8"
            >
              Let&apos;s Work Together
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 mb-12 text-lg"
            >
              Ready to elevate your brand? Get in touch to discuss your next project.
            </motion.p>
            <motion.a
              href="mailto:contact@sarabeer.com"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div>
        </section>

        {/* Resume Section */}
        <section className="py-24 px-8 md:px-24 bg-gradient-to-br from-gray-200 to-gray-300">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-light mb-8"
            >
              Resume
            </motion.h2>
            <motion.a
              href="/resume.pdf"
              download
              className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-8 md:px-24 bg-gray-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-8 mb-8"
          >
            <motion.a href="#" className="hover:text-blue-500" whileHover={{ scale: 1.1 }}>
              <i className="fab fa-linkedin fa-2x"></i>
            </motion.a>
            <motion.a href="#" className="hover:text-blue-500" whileHover={{ scale: 1.1 }}>
              <i className="fab fa-twitter fa-2x"></i>
            </motion.a>
            <motion.a href="#" className="hover:text-blue-500" whileHover={{ scale: 1.1 }}>
              <i className="fas fa-envelope fa-2x"></i>
            </motion.a>
          </motion.div>
          <p className="text-lg mb-4">Let's connect and create something amazing together!</p>
          <motion.button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Scroll to Top
          </motion.button>
        </div>
      </footer>
    </>
  );
}
