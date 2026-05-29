import type { GetStaticPaths } from 'astro';
import { getAllPosts, getAllRoutes, getIndexableEvents } from '@data/index.js';

export const getEventStaticPaths: GetStaticPaths = () =>
  getIndexableEvents().map((event) => ({
    params: { slug: event.slug },
    props: { event },
  }));

export const getRouteStaticPaths: GetStaticPaths = () =>
  getAllRoutes().map((route) => ({
    params: { slug: route.slug },
    props: { route },
  }));

export const getBlogStaticPaths: GetStaticPaths = () =>
  getAllPosts().map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
