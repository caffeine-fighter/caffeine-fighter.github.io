(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = document.querySelectorAll<HTMLElement>('.aether-reveal, .widget');
    const progress = document.querySelector<HTMLElement>('.aether-progress span');
    const menuToggle = document.querySelector<HTMLButtonElement>('#toggle-menu');
    const mainMenu = document.querySelector<HTMLElement>('#main-menu');
    const darkModeToggle = document.querySelector<HTMLElement>('#dark-mode-toggle');
    const sky = document.querySelector<HTMLElement>('.aether-sky');
    const orbit = document.querySelector<HTMLElement>('.aether-orbit');
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    root.classList.add('aether-ready');

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

    if (!reducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    (entry.target as HTMLElement).classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.08,
                rootMargin: '0px 0px -48px 0px',
            }
        );

        revealTargets.forEach((target) => observer.observe(target));
    } else {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
    }

    let ticking = false;
    const updateScrollState = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const ratio = Math.min(Math.max(scrollTop / scrollRange, 0), 1);

        if (sky && !reducedMotion) {
            sky.style.setProperty('--aether-scroll-y', `${(ratio * 60).toFixed(2)}px`);
            sky.style.setProperty('--aether-scroll-y-reverse', `${(ratio * -45).toFixed(2)}px`);
        }
        if (progress) progress.style.transform = `scaleX(${ratio})`;
        ticking = false;
    };

    window.addEventListener(
        'scroll',
        () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(updateScrollState);
        },
        { passive: true }
    );
    updateScrollState();

    if (!reducedMotion && finePointer) {
        let pointerTicking = false;
        let pointerX = 0;
        let pointerY = 0;

        window.addEventListener(
            'pointermove',
            (event) => {
                pointerX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
                pointerY = event.clientY / Math.max(window.innerHeight, 1) - 0.5;

                if (pointerTicking) return;
                pointerTicking = true;

                window.requestAnimationFrame(() => {
                    if (sky) {
                        sky.style.setProperty('--aether-shift-x', `${(pointerX * 24).toFixed(2)}px`);
                        sky.style.setProperty('--aether-shift-x-reverse', `${(pointerX * -24).toFixed(2)}px`);
                        sky.style.setProperty('--aether-shift-y', `${(pointerY * 24).toFixed(2)}px`);
                    }
                    if (orbit) {
                        orbit.style.setProperty('--aether-orbit-shift-x', `${(pointerX * 10).toFixed(2)}px`);
                        orbit.style.setProperty('--aether-orbit-shift-y', `${(pointerY * 10).toFixed(2)}px`);
                    }
                    pointerTicking = false;
                });
            },
            { passive: true }
        );
    }
})();
