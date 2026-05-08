/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useArticles } from '../context/ArticleContext';

export const RefreshBar: React.FC = () => {
  const { 
    refreshState, 
    refreshArticles, 
    lastUpdated, 
    cooldownRemaining, 
    newCount,
    articles 
  } = useArticles();

  const statusText = useMemo(() => {
    switch (refreshState) {
      case 'loading': return 'Ricerca in corso...';
      case 'success': return `✓ ${newCount} nuovi articoli`;
      case 'success-empty': return 'Tutto aggiornato';
      case 'error': return 'Errore — Riprova';
      case 'cooldown': return `Refresh cooldown (${cooldownRemaining}s)`;
      default: return 'Aggiorna notizie';
    }
  }, [refreshState, newCount, cooldownRemaining]);

  const buttonClass = useMemo(() => {
    const base = "relative px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 transition-all duration-300 ";
    switch (refreshState) {
      case 'loading': return base + "bg-surface-elevated text-text-secondary cursor-not-allowed";
      case 'success': return base + "bg-success text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]";
      case 'error': return base + "bg-error text-white";
      case 'cooldown': return base + "bg-surface-elevated text-text-muted cursor-not-allowed opacity-60";
      default: return base + "bg-accent text-black hover:bg-accent-hover active:scale-95";
    }
  }, [refreshState]);

  return (
    <div className="sticky top-[var(--navbar-height-scrolled)] z-[90] w-full h-[var(--refresh-bar-height)] border-b border-border bg-background/95 backdrop-blur-md flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-xs font-mono text-text-secondary">
          <div className="flex flex-col">
            <span className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">Ultimo aggiornamento</span>
            <span>{lastUpdated.toLocaleTimeString()}</span>
          </div>
          <div className="h-8 w-px bg-border hidden sm:block"></div>
          <div className="flex flex-col">
            <span className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">Database</span>
            <span>{articles.length} articoli disponibili</span>
          </div>
        </div>

        <div className="relative">
          <button 
            onClick={refreshArticles}
            disabled={refreshState !== 'idle'}
            className={buttonClass}
            title={refreshState === 'cooldown' ? `Prossimo aggiornamento tra ${cooldownRemaining}s` : ''}
          >
            <AnimatePresence mode="wait">
              {refreshState === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 size={16} />
                </motion.div>
              )}
              {(refreshState === 'success' || refreshState === 'success-empty') && (
                <motion.div
                  key="success"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check size={16} />
                </motion.div>
              )}
              {refreshState === 'error' && (
                <motion.div
                  key="error"
                  initial={{ x: -2, rotate: -10 }}
                  animate={{ x: 0, rotate: 0 }}
                >
                  <AlertCircle size={16} />
                </motion.div>
              )}
              {(refreshState === 'idle' || refreshState === 'cooldown') && (
                <motion.div key="idle" transition={{ duration: 0.4 }}>
                  <RefreshCw size={16} className={refreshState === 'idle' ? "group-hover:rotate-180 transition-transform duration-500" : ""} />
                </motion.div>
              )}
            </AnimatePresence>
            <span>{statusText}</span>
          </button>
        </div>
      </div>
      
      {/* Progress Bar for Loading State */}
      <AnimatePresence>
        {refreshState === 'loading' && (
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-left overflow-hidden"
          >
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-white/30"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
