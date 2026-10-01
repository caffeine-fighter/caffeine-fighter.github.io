(() => {
    const root = document.documentElement;
    const menuToggle = document.querySelector<HTMLButtonElement>('#toggle-menu');
    const mainMenu = document.querySelector<HTMLElement>('#main-menu');
    const darkModeToggle = document.querySelector<HTMLElement>('#dark-mode-toggle');
    if (menuToggle && mainMenu) {
        const sync = () => menuToggle.setAttribute('aria-expanded', String(mainMenu.classList.contains('show')));
        sync();
        new MutationObserver(sync).observe(mainMenu, { attributes: true, attributeFilter: ['class'] });
    }
    if (darkModeToggle) {
        const sync = () => darkModeToggle.setAttribute('aria-checked', String(root.dataset.scheme === 'dark'));
        darkModeToggle.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            darkModeToggle.click();
        });
        sync();
        new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-scheme'] });
    }
    const progress = document.querySelector<HTMLElement>('.aether-progress span');
    if (progress) {
        let ticking = false;
        const update = () => {
            const height = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`;
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        }, { passive: true });
        update();
    }
})();
