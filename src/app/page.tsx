'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { useState } from 'react';
import Image from 'next/image';

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
    testimonial: {
      text: string;
      author: string;
    };
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
      testimonial: {
        text: 'Sara&apos;s strategic approach transformed our digital presence, delivering exceptional results that exceeded our expectations.',
        author: 'Marketing Director, eBay'
      }
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
      overview: 'Developed comprehensive brand strategy and product launch campaign for Nikon&apos;s latest DSLR series.',
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
      testimonial: {
        text: 'The brand strategy perfectly captured our vision while making our technical excellence accessible to all audiences.',
        author: 'Brand Manager, Nikon'
      }
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
      testimonial: {
        text: 'Sara&apos;s branding work helped us stand out in a crowded market and connect authentically with our target audience.',
        author: 'Founder, CYM Coffee Co.'
      }
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

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="h-screen flex items-center px-8 md:px-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(200,200,255,0.1),transparent)] pointer-events-none" />
          <div className="max-w-5xl relative z-10">
            <motion.h1 
              initial={{opacity:0,y:20}} 
              animate={{opacity:1,y:0}} 
              className="text-6xl md:text-7xl font-light mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
            >
              Sara Beer
            </motion.h1>
            <motion.p 
              initial={{opacity:0}} 
              animate={{opacity:1}} 
              transition={{delay:0.2}} 
              className="text-xl md:text-2xl text-gray-700 font-light"
            >
              Marketing Strategy & Brand Development
            </motion.p>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-8 md:px-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-gray-700 text-lg md:text-xl leading-relaxed"
                >
                  I&apos;m a strategic marketing professional with a passion for creating compelling brand narratives and driving impactful campaigns. With years of experience in digital marketing and brand development, I help businesses connect with their audience through innovative strategies and creative solutions.
                </motion.p>
              </div>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24 px-8 md:px-24">
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

                  <blockquote className="border-l-4 pl-6 italic text-gray-700">
                    &quot;{selectedProject.fullContent.testimonial.text}&quot;
                    <footer className="mt-2 text-sm text-gray-500 font-medium">
                      &mdash; {selectedProject.fullContent.testimonial.author}
                    </footer>
                  </blockquote>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Section */}
        <section className="py-24 px-8 md:px-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
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
      </main>
    </>
  );
}
