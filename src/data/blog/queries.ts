import type { BlogPost } from '@types';
import { posts } from './posts.js';

export function getAllPosts(): BlogPost[] {
  return posts.slice().sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.id !== post.id)
    .filter((p) => p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    .slice(0, limit);
}
