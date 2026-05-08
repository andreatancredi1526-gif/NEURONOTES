/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Clock, User, ArrowUpRight } from 'lucide-react';
import { Article } from '../types';
import { CATEGORIES } from '../constants';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured }) => {
  const category = CATEGORIES.find(c => c.slug === article.category);

  if (featured) {
    return (
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative grid md:grid-cols-[40%_1fr] bg-surface border border-border rounded-xl overflow-hidden hover:border-accent transition-colors duration-300"
      >
        <div className="relative aspect-video md:aspect-auto overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {article.isNew && (
            <div className="absolute top-4 left-4 bg-accent text-black px-3 py-1 text-xs font-mono font-bold rounded-sm">
              NEW
            </div>
          )}
        </div>
        <div className="p-6 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span 
              className="px-2 py-1 text-[10px] uppercase font-mono font-bold tracking-widest rounded-sm"
              style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
            >
              {category?.label}
            </span>
            <span className="text-text-muted text-xs font-mono">
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
            {article.title}
          </h2>
          <p className="text-text-secondary text-lg mb-8 line-clamp-3 md:line-clamp-none max-w-2xl">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-elevated overflow-hidden border border-border">
                {article.author.avatar ? (
                  <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 m-2 text-text-muted" />
                )}
              </div>
              <div className="text-sm">
                <p className="text-text-primary font-medium">{article.author.name}</p>
                <div className="flex items-center gap-2 text-text-muted text-xs">
                  <Clock size={12} />
                  {article.readingTime} min read
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 text-accent font-medium group/btn">
              Read More
              <ArrowUpRight size={18} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </button>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-accent transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {article.isNew && (
          <div className="absolute top-3 left-3 bg-success text-white px-2 py-0.5 text-[10px] font-mono font-bold rounded-sm">
            NEW
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span 
            className="px-2 py-0.5 text-[9px] uppercase font-mono font-bold tracking-widest rounded-sm"
            style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
          >
            {category?.label}
          </span>
          <span className="text-text-muted text-[10px] font-mono">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="font-serif text-xl text-text-primary mb-3 leading-snug group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-text-secondary text-sm mb-6 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
          <div className="w-8 h-8 rounded-full bg-surface-elevated overflow-hidden border border-border">
             {article.author.avatar ? (
              <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 m-2 text-text-muted" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-text-primary text-xs font-medium truncate">{article.author.name}</p>
            <div className="flex items-center gap-2 text-text-muted text-[10px]">
              <Clock size={10} />
              {article.readingTime} min read
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
