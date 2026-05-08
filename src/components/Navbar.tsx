/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, Bookmark, TrendingUp } from 'lucide-react';
import { useArticles } from '../context/ArticleContext';

export const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useArticles();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 flex items-center ${
        isScrolled 
        ? 'bg-background/95 h-[var(--navbar-height-scrolled)] backdrop-blur-md shadow-xl border-b border-border/50' 
        : 'bg-transparent h-[var(--navbar-height-default)]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="/" className="text-2xl font-display tracking-tight flex items-center">
              <span className="text-accent">NEURO</span>
              <span className="text-text-primary">NOTES</span>
            </a>
            
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-text-secondary">
              <a href="#" className="text-text-primary hover:text-accent transition-colors">Home</a>
              <div className="group relative">
                <button className="hover:text-accent transition-colors">Categories</button>
                {/* Simple dropdown could go here */}
              </div>
              <a href="#" className="hover:text-accent transition-colors flex items-center gap-1.5">
                <TrendingUp size={14} className="text-accent" />
                Trending
              </a>
              <a href="#" className="hover:text-accent transition-colors">About</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-text-secondary hover:text-accent transition-colors"
            >
              <Search size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-4">
              <button className="p-2 text-text-secondary hover:text-accent transition-colors relative">
                <Bookmark size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border border-background"></span>
              </button>
              <button className="px-5 py-2 rounded-md border border-border text-sm font-medium hover:bg-surface transition-colors">
                Login
              </button>
            </div>
            <button 
              className="lg:hidden p-2 text-text-secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 p-3 text-text-muted hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <div className="w-full max-w-3xl space-y-8">
              <div className="relative">
                <input 
                  autoFocus
                  type="text"
                  placeholder="Type to search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-border py-4 text-4xl md:text-6xl font-serif text-text-primary focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted"
                />
                <div className="absolute right-0 bottom-4 text-text-muted font-mono text-sm uppercase tracking-widest">Search</div>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="text-text-muted text-sm uppercase font-mono tracking-widest">Trending:</span>
                {['Large Language Models', 'Starship', 'Zero Trust', 'Rust Lang'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => {
                        setSearchQuery(tag);
                    }}
                    className="text-text-secondary hover:text-accent transition-colors underline decoration-border underline-offset-4"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-surface flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
               <div className="text-2xl font-display tracking-tight flex items-center">
                <span className="text-accent">NEURO</span>
                <span className="text-text-primary">NOTES</span>
              </div>
              <button 
                className="p-2 text-text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow flex flex-col justify-center gap-8 p-12 text-4xl font-display">
              <a href="#" className="hover:text-accent transition-colors">Home</a>
              <a href="#" className="hover:text-accent transition-colors">Latest</a>
              <a href="#" className="hover:text-accent transition-colors">Trending</a>
              <a href="#" className="hover:text-accent transition-colors">Categories</a>
              <a href="#" className="hover:text-accent transition-colors">Saved</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
