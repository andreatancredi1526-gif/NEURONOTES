/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Author {
  name: string;
  avatar: string | null;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: Author;
  publishedAt: string;
  readingTime: number;
  imageUrl: string;
  url: string;
  isNew: boolean;
  views: number;
  tags: string[];
}

export interface Category {
  slug: string;
  label: string;
  color: string;
  description: string;
}

export type RefreshState = 'idle' | 'loading' | 'success' | 'success-empty' | 'error' | 'cooldown';

export interface RefreshResult {
  articles: Article[];
  count: number;
  new_count: number;
}
