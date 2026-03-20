import type { BlogPost } from '@types';
import { semanaSantaContent } from './content/semana-santa.js';
import { finDeSemanaContent } from './content/fin-de-semana.js';
import { miradoresContent } from './content/miradores.js';

export const posts: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'semana-santa-granada-2026-guia-completa',
    title: {
      es: 'Semana Santa de Granada 2026: la guía completa',
      en: 'Holy Week in Granada 2026: The Complete Guide',
    },
    description: {
      es: 'Todo lo que necesitas saber para vivir la Semana Santa de Granada como un local: procesiones imprescindibles, momentos únicos, dónde comer, cómo moverte y consejos prácticos.',
      en: 'Everything you need to know to experience Holy Week in Granada like a local: must-see processions, unique moments, where to eat, how to get around and practical tips.',
    },
    content: semanaSantaContent,
    publishDate: '2026-02-15',
    category: 'guia',
    tags: ['semana santa', 'procesiones', 'tradiciones', 'granada', 'primavera'],
    author: 'Granada Vibes',
    readingTime: 14,
    featured: true,
  },
  {
    id: 'blog-002',
    slug: 'que-hacer-granada-fin-de-semana',
    title: {
      es: 'Qué hacer en Granada en un fin de semana: la ruta definitiva según los que vivimos aquí',
      en: 'What to Do in Granada in a Weekend: The Definitive Guide by Locals',
    },
    description: {
      es: 'La guía de fin de semana que haría un granadino para un amigo que viene a visitarle. Sin trampas turísticas, con las calles, bares y rincones que de verdad merecen la pena.',
      en: 'The weekend guide a local would make for a friend visiting. No tourist traps — just the streets, bars and corners that are truly worth your time.',
    },
    content: finDeSemanaContent,
    publishDate: '2026-03-01',
    category: 'guia',
    tags: ['fin de semana', 'tapas', 'albaicín', 'alhambra', 'granada'],
    author: 'Granada Vibes',
    readingTime: 12,
    featured: true,
  },
  {
    id: 'blog-003',
    slug: 'miradores-granada-guia-completa',
    title: {
      es: 'Los miradores de Granada: cuándo ir, cómo llegar y cuál es mejor según lo que buscas',
      en: 'Granada\'s Viewpoints: When to Go, How to Get There, and Which One Is Best for You',
    },
    description: {
      es: 'Guía definitiva de los miradores de Granada: San Nicolás, San Cristóbal, Santa Isabel la Real, La Lona y la Silla del Moro. Horarios, cómo llegar y cuál elegir.',
      en: 'The definitive guide to Granada\'s viewpoints: San Nicolás, San Cristóbal, Santa Isabel la Real, La Lona and Silla del Moro. Best times, how to get there and which to choose.',
    },
    content: miradoresContent,
    publishDate: '2026-03-10',
    category: 'guia',
    tags: ['miradores', 'albaicín', 'fotografía', 'atardecer', 'granada'],
    author: 'Granada Vibes',
    readingTime: 10,
    featured: false,
  },
];
