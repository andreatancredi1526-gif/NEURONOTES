/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUp } from 'lucide-react';
import { ArticleProvider, useArticles } from './context/ArticleContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RefreshBar } from './components/RefreshBar';
import { ArticleFeed } from './components/ArticleFeed';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

function AppContent() {
  const { newCount, clearNewFlags, refreshState } = useArticles();
  const [showNewBanner, setShowNewBanner] = useState(false);

  useEffect(() => {
    if (newCount > 0 && refreshState === 'success') {
      setShowNewBanner(true);
      const timer = setTimeout(() => setShowNewBanner(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [newCount, refreshState]);

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-accent selection:text-black">
      <Navbar />
      
      <main>
        <Hero />
        <RefreshBar />
        
        {/* New Articles Banner */}
        <AnimatePresence>
          {showNewBanner && (
            <motion.div 
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="bg-accent/10 border-b border-accent/20 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <p className="text-sm text-accent font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  {newCount} nuovi articoli disponibili — Scorri per vederli
                </p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => {
                        document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' });
                        setShowNewBanner(false);
                    }}
                    className="text-xs uppercase font-mono font-bold tracking-widest text-accent hover:underline"
                  >
                    Vedi ora
                  </button>
                  <button 
                    onClick={() => setShowNewBanner(false)}
                    className="text-accent/50 hover:text-accent transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ArticleFeed />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ArticleProvider>
      <AppContent />
    </ArticleProvider>
  );
}
