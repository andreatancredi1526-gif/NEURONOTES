/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Twitter, Linkedin, Github, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-background border-t-2 border-accent pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-1">
            <a href="/" className="text-3xl font-display tracking-tight flex items-center mb-6">
              <span className="text-accent">NEURO</span>
              <span className="text-text-primary">NOTES</span>
            </a>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mb-8 italic">
              "Decoding the black box of artificial intelligence through meticulous technical journalism."
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-text-muted mb-8">Categories</h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-accent transition-colors">Artificial Intelligence</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Cybersecurity</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Web3 & Blockchain</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Data Science</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Space Tech</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-text-muted mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Research Papers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Archive</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-text-muted mb-8">Editorial</h4>
              <ul className="space-y-4 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-accent transition-colors">Ethics Guidelines</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Submission Center</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Sponsorships</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-border mt-12 text-[10px] font-mono text-text-muted uppercase tracking-widest">
          <p>© 2026 NeuroNotes Engineering. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <span>Signal: Stable</span>
             <span>Region: Global</span>
             <span>v1.0.4-build</span>
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 w-12 h-12 bg-accent text-black rounded-full shadow-2xl flex items-center justify-center hover:bg-accent-hover transition-all z-[100]"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};
