/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, TrendingUp, ChevronRight } from 'lucide-react';
import { useArticles } from '../context/ArticleContext';
import { ArticleCard } from './ArticleCard';

export const ArticleFeed: React.FC = () => {
  const { 
    articles, 
    categories, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery
  } = useArticles();

  const filteredArticles = useMemo(() => {
    let result = articles;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(a => a.category === selectedCategory);
    }
    
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    
    return result;
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticle = useMemo(() => {
    // Only show featured if not searching and on 'all'
    if (selectedCategory === 'all' && !searchQuery && filteredArticles.length > 0) {
      return filteredArticles[0];
    }
    return null;
  }, [filteredArticles, selectedCategory, searchQuery]);

  const listArticles = useMemo(() => {
    if (featuredArticle) return filteredArticles.slice(1);
    return filteredArticles;
  }, [filteredArticles, featuredArticle]);

  return (
    <section id="feed" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Category Filter Bar */}
      <div className="sticky top-[calc(var(--navbar-height-scrolled)+var(--refresh-bar-height))] z-80 mb-16 bg-background/95 backdrop-blur-md py-4 -mx-4 px-4 border-y border-border flex items-center justify-between overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 pr-8">
            <button 
                onClick={() => setSelectedCategory('all')}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === 'all' 
                    ? 'bg-accent text-black shadow-[0_5px_15px_rgba(245,197,24,0.3)]' 
                    : 'bg-surface-elevated text-text-secondary border border-border hover:border-text-muted'
                }`}
            >
                Tutti
            </button>
            {categories.map(cat => (
                <button 
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                        selectedCategory === cat.slug 
                        ? 'bg-white text-black border-white' 
                        : 'bg-surface-elevated text-text-secondary border-border hover:border-text-muted hover:bg-surface'
                    }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
        
        <div className="hidden md:flex items-center gap-4 text-text-muted text-sm border-l border-border pl-8">
            <Filter size={16} />
            <select className="bg-transparent border-none focus:ring-0 cursor-pointer hover:text-text-primary transition-colors pr-8">
                <option>Più recenti</option>
                <option>Più letti</option>
                <option>Trending</option>
            </select>
        </div>
      </div>

      {searchQuery && (
          <div className="mb-12">
              <h2 className="text-2xl font-serif text-text-muted italic">
                  Risultati per: <span className="text-accent underline decoration-accent/30">"{searchQuery}"</span>
              </h2>
              <p className="text-text-muted text-sm mt-2">{filteredArticles.length} articoli trovati</p>
          </div>
      )}

      {featuredArticle && !searchQuery && (
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={20} className="text-accent" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Editor's Pick</span>
          </div>
          <ArticleCard article={featuredArticle} featured />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {listArticles.map((article, index) => (
            <motion.div
              layout
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredArticles.length === 0 && (
          <div className="py-24 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-elevated border border-border mb-6">
                 <Filter size={32} className="text-text-muted" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">Nessun articolo trovato</h3>
              <p className="text-text-secondary max-w-md mx-auto">
                  Non abbiamo trovato nulla che corrisponda ai tuoi criteri. Prova a cambiare categoria o a premere su "Aggiorna notizie".
              </p>
          </div>
      )}

      <div className="mt-24 text-center">
          <button className="px-10 py-4 border border-border rounded-lg text-text-primary font-bold hover:bg-surface transition-all flex items-center mx-auto gap-2 group">
              Carica altri articoli
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
      </div>
    </section>
  );
};
