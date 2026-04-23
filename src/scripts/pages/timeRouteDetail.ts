import { onPageLoad } from '../utils/pageLifecycle';

function initDetailReveal(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');

        if (entry.target.hasAttribute('data-reveal-inner')) {
          const parent = entry.target.closest('.mx-stops-list');
          if (parent) {
            parent.querySelectorAll<HTMLElement>('.mx-stop').forEach((stop, index) => {
              stop.style.transitionDelay = `${index * 0.08}s`;
              stop.classList.add('is-visible');
            });
          }
        }

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  );

  document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-inner]').forEach((element) => {
    observer.observe(element);
  });

  document.querySelectorAll<HTMLElement>('.mx-stop').forEach((stop) => {
    stop.classList.add('is-visible');
  });
}

onPageLoad(initDetailReveal);
