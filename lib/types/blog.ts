/**
 * @fileoverview Blog type definitions.
 * Defines the shape of mock blog content used across blog list and detail pages.
 * @module lib/types/blog
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
  highlights?: string[];
}
