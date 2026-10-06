(() => {
    const root = document.documentElement;
    const menuToggle = document.querySelector<HTMLButtonElement>('#toggle-menu');
    const mainMenu = document.querySelector<HTMLElement>('#main-menu');
    const darkModeToggle = document.querySelector<HTMLElement>('#dark-mode-toggle');

    if (menuToggle && mainMenu) {
        const syncMenuState = () => {
            menuToggle.setAttribute('aria-expanded', String(mainMenu.classList.contains('show')));
        };

        syncMenuState();
        new MutationObserver(syncMenuState).observe(mainMenu, {
            attributes: true,
            attributeFilter: ['class'],
        });
    }

    if (darkModeToggle) {
        const syncColorScheme = () => {
            darkModeToggle.setAttribute('aria-checked', String(root.dataset.scheme === 'dark'));
        };

        darkModeToggle.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            darkModeToggle.click();
        });
        syncColorScheme();
        new MutationObserver(syncColorScheme).observe(root, {
            attributes: true,
            attributeFilter: ['data-scheme'],
        });
    }
})();
