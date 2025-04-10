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
      className={`relative pt-5 mb-5 flex justify-center z-50 ${className}`}
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
  );
} 