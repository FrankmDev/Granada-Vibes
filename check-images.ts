import { getUpcomingEvents } from './src/data/events/queries.js';
const evts = getUpcomingEvents(20);
evts.forEach(e => {
  console.log(e.slug, '=>', e.image, e.imageUrl);
})
