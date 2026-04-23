export function onPageLoad(callback: () => void): void {
  let initialized = false;

  const run = () => {
    if (initialized) return;
    initialized = true;
    callback();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }

  document.addEventListener('astro:page-load', () => {
    initialized = false;
    run();
  });
}
