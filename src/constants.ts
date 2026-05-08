/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Article } from './types';

export const CONFIG = {
  WEBHOOK_URL: 'https://ais-news-webhook.cloud/blog-refresh', // Mock URL
  REFRESH_TIMEOUT_MS: 30000,
  COOLDOWN_SECONDS: 60,
  AUTO_REFRESH_INTERVAL: 15 * 60 * 1000,
  NEW_BANNER_DISMISS_MS: 10000,
  ARTICLES_PER_PAGE: 12,
  SEARCH_DEBOUNCE_MS: 300,
};

export const CATEGORIES: Category[] = [
  { slug: 'ai', label: 'Intelligenza Artificiale', color: '#f5c518', description: 'LLM, computer vision, robotica, ricerca' },
  { slug: 'cybersecurity', label: 'Cybersecurity', color: '#ef4444', description: 'Minacce, zero-trust, crittografia' },
  { slug: 'web3', label: 'Web3 & Blockchain', color: '#8b5cf6', description: 'Smart contract, DeFi, NFT, layer2' },
  { slug: 'data-science', label: 'Data Science', color: '#3b82f6', description: 'Analytics, visualizzazione, ML applicato' },
  { slug: 'space-tech', label: 'Space & Deep Tech', color: '#06b6d4', description: 'Esplorazione spaziale, biotech, quantum' },
  { slug: 'dev', label: 'Software & Dev', color: '#22c55e', description: 'Open source, strumenti, architetture' },
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Self-Supervised Learning explained: the future of AI training",
    excerpt: "Teaching machines to learn without labeled data by using patterns within the data itself is the new frontier of efficiency in deep learning.",
    category: "ai",
    author: { name: "Fatima El-Hashmi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima" },
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    readingTime: 22,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    url: "#",
    isNew: false,
    views: 4200,
    tags: ["machine learning", "self-supervised", "deep learning"]
  },
  {
    id: "2",
    title: "Zero Trust Architecture: why it's more than just a buzzword",
    excerpt: "In an era of persistent threats, moving away from perimeter-based security to a identity-centric model is no longer optional.",
    category: "cybersecurity",
    author: { name: "Erik Nordmann", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Erik" },
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    readingTime: 12,
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    url: "#",
    isNew: false,
    views: 3100,
    tags: ["zero trust", "network security", "enterprise"]
  },
  {
    id: "3",
    title: "Ethereum Layer 2: comparing Optimism and Arbitrum",
    excerpt: "Scalability remains the holy grail of blockchain. We dive deep into the technical differences between the two leading rollup solutions.",
    category: "web3",
    author: { name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    readingTime: 15,
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    url: "#",
    isNew: false,
    views: 5800,
    tags: ["ethereum", "layer 2", "scalability"]
  },
  {
    id: "4",
    title: "Visualizing high-dimensional data with T-SNE and UMAP",
    excerpt: "The challenge of dimensionality reduction is visualizing complex relationships. Here is how to choose the right algorithm.",
    category: "data-science",
    author: { name: "Marco Rossi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco" },
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    readingTime: 18,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
    url: "#",
    isNew: false,
    views: 2900,
    tags: ["data viz", "algorithms", "statistics"]
  },
  {
    id: "5",
    title: "Starship Flight 5: What's next for orbital heavy lift",
    excerpt: "SpaceX's rapidly iterating vehicle is changing the economics of space. We look at the payload capacity and thermal shield upgrades.",
    category: "space-tech",
    author: { name: "James Holden", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" },
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    readingTime: 10,
    imageUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800",
    url: "#",
    isNew: false,
    views: 8400,
    tags: ["spacex", "starship", "exploration"]
  },
  {
    id: "6",
    title: "Rust for Javascript developers: memory management",
    excerpt: "Moving from a garbage-collected language to the borrow checker can be daunting. Let's break down ownership and lifetimes.",
    category: "dev",
    author: { name: "Alex Rivers", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
    readingTime: 25,
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
    url: "#",
    isNew: false,
    views: 6700,
    tags: ["rust", "programming", "performance"]
  },
  {
    id: "7",
    title: "The impact of Transformers on Computer Vision",
    excerpt: "Vision Transformers (ViT) are challenging the dominance of CNNs in image classification and object detection tasks.",
    category: "ai",
    author: { name: "Fatima El-Hashmi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima" },
    publishedAt: new Date(Date.now() - 518400000).toISOString(),
    readingTime: 14,
    imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800",
    url: "#",
    isNew: false,
    views: 3900,
    tags: ["transformers", "computer vision", "AI"]
  },
  {
    id: "8",
    title: "Securing the CI/CD pipeline against supply chain attacks",
    excerpt: "Recent exploits have shown that the build pipeline itself is the weakest link. Here is how to sign your artifacts.",
    category: "cybersecurity",
    author: { name: "Erik Nordmann", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Erik" },
    publishedAt: new Date(Date.now() - 604800000).toISOString(),
    readingTime: 20,
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800",
    url: "#",
    isNew: false,
    views: 2400,
    tags: ["devsecops", "security", "supply chain"]
  }
];
