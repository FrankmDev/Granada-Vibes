// NavBar interaction: mobile menu toggle + scroll detection
(function () {
  const button = document.getElementById('mobile-menu-button') as HTMLButtonElement | null;
  const menu = document.getElementById('mobile-menu') as HTMLElement | null;
  const menuIcon = document.getElementById('menu-icon') as HTMLElement | null;
  const lang = document.documentElement.lang;

  if (button && menu) {
    let isOpen = false;

    const ICON_OPEN = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />';
    const ICON_CLOSE = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />';

    const closeMenu = () => {
      isOpen = false;
      menu.classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
      if (menuIcon) {
        menuIcon.innerHTML = ICON_OPEN;
        menuIcon.classList.remove('rotate-90');
      }
    };

    button.addEventListener('click', () => {
      isOpen = !isOpen;
      menu.classList.toggle('hidden');
      button.setAttribute('aria-expanded', String(isOpen));

      if (menuIcon) {
        if (isOpen) {
          menuIcon.innerHTML = ICON_CLOSE;
          menuIcon.classList.add('rotate-90');
        } else {
          menuIcon.innerHTML = ICON_OPEN;
          menuIcon.classList.remove('rotate-90');
        }
      }

      button.setAttribute('aria-label', isOpen
        ? (lang === 'es' ? 'Cerrar menú' : 'Close menu')
        : (lang === 'es' ? 'Abrir menú' : 'Open menu')
      );
    });

    document.addEventListener('click', (event) => {
      if (isOpen && event.target instanceof Node && !button.contains(event.target) && !menu.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (isOpen && event.key === 'Escape') {
        closeMenu();
        button.focus();
      }
    });
  }

  // Nav scroll detection
  const headerBg = document.getElementById('header-bg') as HTMLElement | null;
  const headerLine = document.getElementById('header-line') as HTMLElement | null;
  const sentinel = document.getElementById('nav-sentinel');

  if (sentinel && headerBg && headerLine) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          headerBg.style.background = 'rgba(250, 248, 245, 0.95)';
          headerBg.style.backdropFilter = 'blur(24px) saturate(200%)';
          headerBg.style.borderBottom = '1px solid rgba(232, 228, 222, 0.8)';
          headerLine.style.opacity = '1';
        } else {
          headerBg.style.background = 'rgba(250, 248, 245, 0.8)';
          headerBg.style.backdropFilter = 'blur(20px) saturate(180%)';
          headerBg.style.borderBottom = '1px solid rgba(232, 228, 222, 0.5)';
          headerLine.style.opacity = '0';
        }
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
  }
})();
