/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Article, Category, RefreshState } from '../types';
import { MOCK_ARTICLES, CATEGORIES, CONFIG } from '../constants';

interface ArticleContextType {
  articles: Article[];
  categories: Category[];
  refreshState: RefreshState;
  lastUpdated: Date;
  cooldownRemaining: number;
  newCount: number;
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (slug: string) => void;
  refreshArticles: () => Promise<void>;
  clearNewFlags: () => void;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [refreshState, setRefreshState] = useState<RefreshState>('idle');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const [newCount, setNewCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load from local storage if available (bookmarks/history could be added here)
  
  const clearNewFlags = useCallback(() => {
    setArticles(prev => prev.map(a => ({ ...a, isNew: false })));
    setNewCount(0);
  }, []);

  const refreshArticles = useCallback(async () => {
    if (refreshState !== 'idle') return;

    setRefreshState('loading');

    // Simulate API call to n8n webhook
    try {
      const response = await new Promise<Article[]>((resolve, reject) => {
        setTimeout(() => {
          // 80% chance of success, 20% of error for realism
          if (Math.random() > 0.1) {
            // Pick a random category to generate "new" articles for
            const randomCat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
            const incoming: Article[] = [
              {
                id: `new-${Date.now()}-1`,
                title: `Deep Tech: ${randomCat.label} Breakout in 2026`,
                excerpt: "New research indicates a massive shift in industry adoption for these technologies...",
                category: randomCat.slug,
                author: { name: "AI Analyst", avatar: null },
                publishedAt: new Date().toISOString(),
                readingTime: 5,
                imageUrl: `https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800`,
                url: "#",
                isNew: true,
                views: 0,
                tags: ["trending", randomCat.slug]
              },
              {
                id: `new-${Date.now()}-2`,
                title: `The Ethics of ${randomCat.label}`,
                excerpt: "Regulatory frameworks are finally catching up with the rapid pace of innovation...",
                category: randomCat.slug,
                author: { name: "Dr. Elena Vance", avatar: null },
                publishedAt: new Date().toISOString(),
                readingTime: 8,
                imageUrl: `https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=800`,
                url: "#",
                isNew: true,
                views: 0,
                tags: ["policy", "ethics"]
              }
            ];
            resolve(incoming);
          } else {
            reject(new Error("Network Error: Failed to reach webhook"));
          }
        }, 2000);
      });

      if (response.length > 0) {
        setArticles(prev => {
          // Simple dedup by ID
          const existingIds = new Set(prev.map(a => a.id));
          const trulyNew = response.filter(a => !existingIds.has(a.id));
          return [...trulyNew, ...prev];
        });
        setNewCount(response.length);
        setRefreshState('success');
      } else {
        setRefreshState('success-empty');
      }
    } catch (error) {
      console.error(error);
      setRefreshState('error');
    } finally {
      setTimeout(() => {
        setRefreshState('cooldown');
        setCooldownRemaining(CONFIG.COOLDOWN_SECONDS);
        setLastUpdated(new Date());
      }, 2000);
    }
  }, [refreshState]);

  // Cooldown timer
  useEffect(() => {
    let timer: number;
    if (refreshState === 'cooldown' && cooldownRemaining > 0) {
      timer = window.setInterval(() => {
        setCooldownRemaining(prev => {
          if (prev <= 1) {
            setRefreshState('idle');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [refreshState, cooldownRemaining]);

  const value = useMemo(() => ({
    articles,
    categories: CATEGORIES,
    refreshState,
    lastUpdated,
    cooldownRemaining,
    newCount,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    refreshArticles,
    clearNewFlags
  }), [articles, refreshState, lastUpdated, cooldownRemaining, newCount, searchQuery, selectedCategory, refreshArticles, clearNewFlags]);

  return <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>;
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};
