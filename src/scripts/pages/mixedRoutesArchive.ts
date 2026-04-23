import { onPageLoad } from '../utils/pageLifecycle';
import { revealOnIntersect } from '../utils/reveal';

onPageLoad(() => {
  revealOnIntersect('.plan-card', { threshold: 0.1 });
});
