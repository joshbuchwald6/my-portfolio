'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, useMotionValue, useSpring, animate } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Home, User, Briefcase, Mail, ArrowUp, Github, Linkedin, FileText } from 'lucide-react';

// --- Interfaces (Keep or adjust as needed) ---
interface Project {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  caseStudyUrl?: string; // Link to PDF or page
}

interface Certification {
  name: string;
  issuer: string;
  logoUrl: string;
}

// --- Data (Replace with your actual data) ---
const projectsData: Project[] = [
  {
    title: 'Ebay Campaign Strategy',
    description: 'Developed a data-driven digital marketing plan focusing on user engagement.',
    category: 'Digital Marketing',
    imageUrl: '/images/ebay.svg', // Corrected path
    tags: ['Strategy', 'Social Media', 'Analytics', 'Campaign Management'],
    caseStudyUrl: '/pdfs/ebay-case-study.pdf',
  },
  {
    title: 'Nikon Brand Presentation',
    description: 'Crafted a compelling narrative and visual presentation for a new product line.',
    category: 'Brand Strategy',
    imageUrl: '/images/Nikon_Logo.svg', // Corrected path
    tags: ['Branding', 'Presentation Design', 'Storytelling'],
    caseStudyUrl: '/pdfs/nikon-case-study.pdf',
  },
  {
    title: 'CYM Coffee Co. Identity',
    description: 'Established a unique brand identity and launch marketing materials.',
    category: 'Brand Identity',
    imageUrl: '/images/CYM.jpg', // Corrected path
    tags: ['Logo Design', 'Marketing Collateral', 'Launch Strategy'],
    caseStudyUrl: '/pdfs/cym-case-study.pdf',
  },
];

const certificationsData: Certification[] = [
  { name: 'Social Media Marketing', issuer: 'Hootsuite', logoUrl: '/images/hootsuite.svg' },
  { name: 'Content Marketing', issuer: 'LinkedIn', logoUrl: '/images/linkedin.svg' },
  { name: 'Google Ads Search', issuer: 'Google', logoUrl: '/images/google.svg' },
  { name: 'Microsoft Advertising', issuer: 'Microsoft', logoUrl: '/images/microsoft.svg' },
];

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Work', href: '#work', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

// --- Animation Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } // Consistent duration
  },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// --- Custom Smooth Scroll Function ---
function smoothScrollTo(targetId: string) {
  const element = document.getElementById(targetId);
  if (!element) return;

  const elementTop = element.offsetTop;
  const currentScroll = window.scrollY;
  
  // Adjust offset calculation (e.g., scroll slightly *past* the top)
  const offset = 50; // Scroll 50px below the element's top
  const targetScrollPosition = elementTop - offset;

  // Use Framer Motion's animate function for smooth scrolling
  animate(currentScroll, targetScrollPosition, {
    type: "spring",
    stiffness: 60,  // Decreased stiffness for slower/smoother feel
    damping: 25,   // Adjusted damping slightly
    // You could also try tween:
    // type: "tween",
    // duration: 1.0, // Longer duration
    // ease: "easeInOut",
    onUpdate: (latest) => {
      // Ensure scroll doesn't go below 0
      window.scrollTo(0, Math.max(0, latest));
    }
  });
}

// --- Main Page Component ---
export default function PortfolioPage() {
  const { scrollY } = useScroll();

  // --- Cursor Light State & Logic ---
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isLightVisible, setIsLightVisible] = useState(false);

  // Spring settings for the light effect position
  const springConfig = { damping: 30, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Restore full useEffect for cursor light visibility
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const body = document.body;
    const handleMouseEnter = () => { setIsLightVisible(true); };
    const handleMouseLeave = () => { setIsLightVisible(false); };

    window.addEventListener('mousemove', moveCursor);
    body.addEventListener('mouseenter', handleMouseEnter);
    body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      body.removeEventListener('mouseenter', handleMouseEnter);
      body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  // --- Navigation Logic ---
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.substring(1);
        if (targetId) {
          // Call the custom smooth scroll function
          smoothScrollTo(targetId);
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // --- Component Variants ---
  const MotionLink = motion(Link);
  const MotionImage = motion(Image);

  // --- Page JSX ---
  return (
    <div className="bg-dot-pattern min-h-screen font-sans antialiased">
      {/* --- Background Spotlight --- */}
      <div className="bg-spotlight" />

      {/* --- Cursor Light Element (Remove/Comment Out) --- */}
      {/* 
            <motion.div
        className="cursor-light"
        style={{ translateX: cursorX, translateY: cursorY }}
        animate={{ opacity: isLightVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      /> 
      */}

      {/* --- Navigation (Non-Sticky) --- */}
      <motion.header
        className={`relative pt-6 pb-6 flex justify-center z-40`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <nav className="flex items-center space-x-1 bg-white/60 backdrop-blur-md text-foreground p-1 rounded-full shadow-subtle border border-muted/30">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} passHref legacyBehavior>
                <motion.a
                  className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-sm transition-colors duration-200 text-muted-foreground hover:text-foreground`}
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

      {/* --- Main Content --- */}
      <main className="max-w-4xl mx-auto px-6 pb-24 space-y-32 md:space-y-48">
        {/* --- Hero Section --- */}
        <motion.section
          id="home"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-center min-h-[60vh] flex flex-col justify-center"
        >
          <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl mb-4 tracking-tighter">
            Sara Beer
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Combined Degree Public Relations Student at the University of Florida
          </p>
                  <motion.div
             variants={fadeInUp}
             className="flex justify-center space-x-4"
           >
             <MotionLink
               href="#contact"
               className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full text-base font-medium transition-colors hover:bg-opacity-90 shadow-sm"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               Get In Touch
             </MotionLink>
             <MotionLink
               href="/pdfs/sararesume.pdf" // Corrected resume path
               target="_blank"
               rel="noopener noreferrer"
               className="bg-muted/50 text-foreground px-6 py-2.5 rounded-full text-base font-medium transition-colors hover:bg-muted shadow-sm"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               View Resume
             </MotionLink>
                  </motion.div>
        </motion.section>

        {/* --- About Section --- */}
        <motion.section
          id="about"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="grid md:grid-cols-5 gap-12 md:gap-16 items-center"
        >
          <div className="md:col-span-2 rounded-lg overflow-hidden shadow-subtle">
                          <Image
              src="/images/headshot.png" // Use your headshot
              alt="Sara Beer"
              width={500} // Increased width slightly for potentially better rendering
              height={625} // Increased height slightly
              className="w-full h-auto object-cover"
              priority
                          />
                        </div>
          <div className="md:col-span-3 space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
              Driven by strategy, <br />focused on impact.
            </h2>
            <p className="text-muted-foreground text-lg">
              Hi, I'm Sara. As a passionate Public Relations student at UF, I thrive on crafting compelling narratives and building meaningful connections. My focus is on leveraging strategic communication to drive measurable results and elevate brand presence.
            </p>
            <p className="text-muted-foreground text-lg">
              From digital campaigns to brand identity development, I bring a blend of creativity and analytical thinking to every project.
            </p>
          </div>
        </motion.section>

        {/* --- Work Section --- */}
        <motion.section
          id="work"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          className="space-y-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-center">
            Selected Work
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow-subtle border border-muted/50 transition-shadow hover:shadow-md"
              >
                <div className="aspect-video overflow-hidden flex items-center justify-center bg-gray-50 p-4">
                  <MotionImage
                    src={project.imageUrl}
                    alt={project.title}
                    width={400} // Adjust width as needed for logos
                    height={225} // Adjust height as needed for logos
                    className="w-auto h-full max-h-[150px] object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">{project.category}</p>
                  <h3 className="font-heading font-bold text-xl mb-2 text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground text-base mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-muted/50 text-muted-foreground px-2 py-0.5 rounded-full">
                        {tag}
                </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    {project.caseStudyUrl && (
                      <Link href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent font-medium hover:underline">
                        View Case Study
                      </Link>
                    )}
                    {/* Add Live URL link if available */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Certifications Section --- */}
        <motion.section
          id="certifications"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="space-y-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-center">
            Certifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {certificationsData.map((cert, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-subtle border border-muted/50 transition-transform hover:-translate-y-1"
              >
                <Image src={cert.logoUrl} alt={cert.issuer} width={48} height={48} className="mb-3" />
                <p className="font-medium text-sm text-foreground mb-0.5">{cert.name}</p>
                <p className="text-xs text-muted-foreground">{cert.issuer}</p>
            </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Contact Section --- */}
        <motion.section
          id="contact"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 py-20 rounded-lg shadow-inner border border-muted/30"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Let's Connect
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-8">
            Interested in collaborating or have a question? Feel free to reach out!
          </p>
          <div className="flex justify-center space-x-4">
            <MotionLink
              href="mailto:sara.beer@example.com" // REPLACE EMAIL
              className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full text-base font-medium transition-colors hover:bg-opacity-90 shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Email Me
            </MotionLink>
            <MotionLink
              href="https://www.linkedin.com/in/sara-beer/" // Updated LinkedIn URL
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted/50 text-foreground px-6 py-2.5 rounded-full text-base font-medium transition-colors hover:bg-muted shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LinkedIn
            </MotionLink>
          </div>
        </motion.section>

      </main>

      {/* --- Footer --- */}
      <footer className="max-w-4xl mx-auto px-6 py-12 text-center border-t border-muted/50">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Sara Beer. All rights reserved.
        </p>
        {/* Add optional social links here */}
      </footer>

      {/* --- Scroll To Top Button --- */}
      <motion.button
        className="fixed bottom-6 right-6 bg-foreground text-background p-3 rounded-full shadow-lg z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ scale: 0, opacity: 0 }}
        animate={scrollY.get() > 400 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </motion.button>

    </div>
  );
}
