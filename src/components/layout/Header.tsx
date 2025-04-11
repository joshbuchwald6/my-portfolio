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
  return (
    <motion.header
      className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="flex items-center space-x-1 bg-white/70 backdrop-blur-md text-foreground p-2 rounded-full shadow-lg border border-muted/30">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} passHref legacyBehavior>
              <motion.a
                className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm transition-colors duration-200 text-muted-foreground hover:text-foreground`}
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
  );
} 