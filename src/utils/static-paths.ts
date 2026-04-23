import type { GetStaticPaths } from 'astro';
import { getAllEvents, getAllPosts, getAllRoutes } from '@data/index.js';

export const getEventStaticPaths: GetStaticPaths = () =>
  getAllEvents().map((event) => ({
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
