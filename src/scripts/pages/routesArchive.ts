import { onPageLoad } from '../utils/pageLifecycle';
import { revealOnIntersect } from '../utils/reveal';

function initFilters(): void {
  const filterChips = document.querySelectorAll<HTMLButtonElement>('.filter-chip');
  const routeCards = document.querySelectorAll<HTMLElement>('.expedition-card');
  const routeCount = document.getElementById('route-count');
  const filterReset = document.getElementById('filter-reset');
  const emptyState = document.getElementById('empty-state');
  const gridContainer = document.getElementById('routes-grid-container');
  const emptyReset = document.getElementById('empty-reset');
  const filterBar = document.getElementById('filter-bar');
  const filterBarWrapper = filterBar?.parentElement;

  if (filterBar && filterBarWrapper) {
    const updateScrollIndicators = () => {
      const hasOverflow = filterBar.scrollWidth > filterBar.clientWidth;
      const atStart = filterBar.scrollLeft <= 10;
      const atEnd = filterBar.scrollLeft >= filterBar.scrollWidth - filterBar.clientWidth - 10;

      filterBarWrapper.classList.toggle('has-scroll-left', hasOverflow && !atStart);
      filterBarWrapper.classList.toggle('has-scroll-right', hasOverflow && !atEnd);
    };

    filterBar.addEventListener('scroll', updateScrollIndicators, { passive: true });
    window.addEventListener('resize', updateScrollIndicators, { passive: true });
    updateScrollIndicators();
  }

  function updateCount(count: number): void {
    if (!routeCount) return;
    routeCount.textContent = count.toString();
    routeCount.classList.add('count-pulse');
    window.setTimeout(() => routeCount.classList.remove('count-pulse'), 300);
  }

  function resetFilters(): void {
    filterChips.forEach((chip) => chip.classList.remove('active'));
    filterChips[0]?.classList.add('active');

    routeCards.forEach((card) => {
      card.classList.remove('hidden');
      card.style.display = '';
    });

    updateCount(routeCards.length);
    filterReset?.style.setProperty('display', 'none');
    emptyState?.style.setProperty('display', 'none');
    gridContainer?.style.setProperty('display', '');
  }

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;

      filterChips.forEach((currentChip) => currentChip.classList.remove('active'));
      chip.classList.add('active');

      let visibleCount = 0;

      routeCards.forEach((card) => {
        const shouldShow = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !shouldShow);
        card.style.display = shouldShow ? '' : 'none';
        if (shouldShow) visibleCount++;
      });

      updateCount(visibleCount);
      filterReset?.style.setProperty('display', filter !== 'all' ? 'flex' : 'none');

      if (visibleCount === 0) {
        gridContainer?.style.setProperty('display', 'none');
        emptyState?.style.setProperty('display', 'flex');
      } else {
        gridContainer?.style.setProperty('display', '');
        emptyState?.style.setProperty('display', 'none');
      }
    });
  });

  filterReset?.addEventListener('click', resetFilters);
  emptyReset?.addEventListener('click', resetFilters);
}

onPageLoad(() => {
  initFilters();
  revealOnIntersect('.expedition-card, .rhythm-card, .rhythm-header');
});
