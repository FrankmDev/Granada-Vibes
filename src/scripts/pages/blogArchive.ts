import { onPageLoad } from '../utils/pageLifecycle';
import { revealOnIntersect } from '../utils/reveal';

function initFilters(): void {
  const filterChips = document.querySelectorAll<HTMLButtonElement>('.filter-chip');
  const postCards = document.querySelectorAll<HTMLElement>('.post-card');
  const resultsCount = document.getElementById('results-count');
  const emptyState = document.getElementById('empty-state');
  const postsGrid = document.getElementById('posts-grid');
  const emptyReset = document.getElementById('empty-clear-filters');

  function updateCount(count: number): void {
    if (!resultsCount) return;
    resultsCount.style.opacity = '0';
    window.setTimeout(() => {
      resultsCount.textContent = count.toString();
      resultsCount.style.opacity = '1';
    }, 150);
  }

  function resetFilters(): void {
    filterChips.forEach((chip) => chip.classList.remove('active'));
    filterChips[0]?.classList.add('active');

    postCards.forEach((card) => {
      card.classList.remove('hidden');
      card.style.display = '';
    });

    updateCount(postCards.length);
    if (emptyState) emptyState.style.display = 'none';
    if (postsGrid) postsGrid.style.display = '';
  }

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;

      filterChips.forEach((currentChip) => currentChip.classList.remove('active'));
      chip.classList.add('active');

      let visibleCount = 0;

      postCards.forEach((card) => {
        const shouldShow = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !shouldShow);
        card.style.display = shouldShow ? '' : 'none';
        if (shouldShow) visibleCount++;
      });

      updateCount(visibleCount);

      if (visibleCount === 0) {
        if (postsGrid) postsGrid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'flex';
      } else {
        if (postsGrid) postsGrid.style.display = '';
        if (emptyState) emptyState.style.display = 'none';
      }
    });
  });

  emptyReset?.addEventListener('click', resetFilters);
}

function initCTAMouseGlow(): void {
  const primaryBtn = document.querySelector<HTMLElement>('.cta-btn-primary');
  if (!primaryBtn) return;

  primaryBtn.addEventListener('mousemove', (event: MouseEvent) => {
    const rect = primaryBtn.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    primaryBtn.style.setProperty('--mouse-x', `${x}%`);
    primaryBtn.style.setProperty('--mouse-y', `${y}%`);
  });
}

onPageLoad(() => {
  initFilters();
  revealOnIntersect('.post-card, .section-header');
  initCTAMouseGlow();
});
