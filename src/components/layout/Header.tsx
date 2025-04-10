'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, User, Briefcase, Mail } from 'lucide-react'; // Import icons

interface HeaderProps {
  className?: string;
}

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Work', href: '#projects', icon: Briefcase }, // Renamed 'Work' section to 'Projects' to match page content
  { name: 'Contact', href: '#contact', icon: Mail },
];

export function Header({ className = '' }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(targetId || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Update active section immediately on click for better UX
          setActiveSection(targetId || 'home');
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      let currentSection = 'home';
      navItems.forEach((item) => {
        const element = document.getElementById(item.href.substring(1));
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the top of the section is within the top half of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = item.href.substring(1);
          }
        }
      });
      // Special case for the top of the page
      if (window.scrollY < window.innerHeight / 2) {
        currentSection = 'home';
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="flex items-center space-x-1 bg-gray-900/80 backdrop-blur-md text-white px-3 py-2 rounded-full shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.href.substring(1);
          return (
            <Link key={item.name} href={item.href} passHref legacyBehavior>
              <motion.a
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-full text-sm transition-colors duration-200 hover:text-pink-400 ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gray-700/50 rounded-full z-0"
                    layoutId="active-pill"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`relative z-10 h-4 w-4 ${isActive ? 'text-pink-400' : ''}`} />
                <span className="relative z-10">{item.name}</span>
              </motion.a>
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
} 