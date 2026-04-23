export function revealOnIntersect(
  selectors: string,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
  },
): void {
  const elements = document.querySelectorAll<HTMLElement>(selectors);
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, options);

  elements.forEach((element) => observer.observe(element));
}
