/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-24 px-6 border-t border-border bg-surface-elevated/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-[0.03] blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-display text-text-primary mb-6">
          NEVER MISS A <span className="text-accent underline decoration-accent/20">SIGNAL</span>
        </h2>
        <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
          Get the most critical AI breakthroughs and technical deep-dives 
          delivered directly to your inbox every Thursday. No noise, just signal.
        </p>
        
        <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 bg-success/20 border border-success/30 py-4 rounded-lg text-success font-medium"
              >
                <CheckCircle2 size={24} />
                Subscribed successfully!
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input 
                  type="email" 
                  placeholder="Enter your professional email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-surface border border-border px-6 py-4 rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted"
                />
                <button 
                  disabled={status === 'loading'}
                  className="bg-accent text-black font-bold px-8 py-4 rounded-lg hover:bg-accent-hover transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Subscribe'}
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <p className="text-[10px] text-text-muted mt-6 font-mono uppercase tracking-widest italic">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </form>
      </div>
    </section>
  );
};
