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

  // Smooth scrolling & active section update on click
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.substring(1);
        const element = document.getElementById(targetId || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(targetId || 'home');
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
        rootMargin: '-50% 0px -50% 0px' // Consider the middle of the viewport
      }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.href.substring(1));
      if (element) {
        observer.observe(element);
      }
    });

    // Special check for top of page for Home section
    const checkTop = () => {
      if (window.scrollY < window.innerHeight * 0.3) { // If near the top
        setActiveSection('home');
      }
    }
    window.addEventListener('scroll', checkTop);
    checkTop(); // Initial check

    return () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.href.substring(1));
        if (element) {
          observer.unobserve(element);
        }
      });
      window.removeEventListener('scroll', checkTop);
    };
  }, []);

  return (
    <motion.header
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Use bg-black/70 or bg-zinc-900/70 for a slightly darker feel */}
      <nav className="flex items-center space-x-1 bg-zinc-900/70 backdrop-blur-lg text-white p-1.5 rounded-full shadow-lg border border-white/10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.href.substring(1);
          return (
            <Link key={item.name} href={item.href} passHref legacyBehavior>
              <motion.a
                className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-zinc-800 rounded-full z-0"
                    layoutId="active-pill"
                    transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                  />
                )}
                <Icon className={`relative z-10 h-4 w-4 shrink-0 ${isActive ? 'text-white' : ''}`} />
                <span className="relative z-10 whitespace-nowrap">{item.name}</span>
              </motion.a>
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
} 