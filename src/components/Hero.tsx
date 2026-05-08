/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 overflow-hidden grain-texture">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-[radial-gradient(circle_at_center,rgba(245,197,24,0.05)_0%,rgba(13,13,13,0)_70%)]" />
        <img 
            src="https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero background" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono font-bold tracking-[0.2em] mb-8 uppercase">
              The AI Frontier
            </span>
            <h1 className="text-6xl md:text-9xl font-display leading-[0.85] text-text-primary mb-8 tracking-tighter">
              DECODE THE <br />
              <span className="text-accent italic">FUTURE</span> WITH AI
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl leading-relaxed">
              In-depth analysis, breaking breakthroughs, and the technical pulse 
              of intelligence systems shaping the next decade.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-accent text-black rounded-lg font-bold text-lg flex items-center justify-center gap-3 hover:bg-accent-hover transition-all shadow-[0_0_30px_rgba(245,197,24,0.2)]"
              >
                Start Reading
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
              </button>
              <button className="px-8 py-4 border border-border text-text-primary rounded-lg font-bold text-lg hover:bg-surface transition-all">
                Browse Topics
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Stats (Decorative) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-16 right-6 hidden xl:block"
      >
        <div className="flex gap-16 border-t border-border pt-8">
          <div>
            <p className="text-[10px] uppercase font-mono text-text-muted tracking-widest mb-1">Weekly Reads</p>
            <p className="text-2xl font-serif text-text-primary">12.4K+</p>
          </div>
           <div>
            <p className="text-[10px] uppercase font-mono text-text-muted tracking-widest mb-1">Active Assets</p>
            <p className="text-2xl font-serif text-text-primary">247+</p>
          </div>
           <div>
            <p className="text-[10px] uppercase font-mono text-text-muted tracking-widest mb-1">Signal Strength</p>
            <p className="text-2xl font-serif text-text-primary">98.2%</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
