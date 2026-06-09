/**
 * Pavithran Bhagavan — Personal Portfolio Premium Logic System
 * Optimized frame throttling, hardware-accelerated scroll reveal transitions, and navigation syncing.
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollProgress();
    initScrollAnimations();
    initParallaxEffects();
    initActiveNavTracking();
});

/**
 * Executes a premium split shutter preloader dismissing sequence
 */
function initPreloader() {
    const preloader = document.getElementById('vogue-preloader');
    if (!preloader) return;

    // Smooth scroll containment lockout
    document.documentElement.classList.add('is-locked');

    setTimeout(() => {
        preloader.classList.add('fade-out');
        document.documentElement.classList.remove('is-locked');

        setTimeout(() => {
            preloader.remove();
            // Dispatches single safe canvas draw sequence instantly to lock scroll assets in place
            window.requestAnimationFrame(() => {
                window.dispatchEvent(new Event('scroll'));
            });
        }, 1200);
    }, 2600);
}

/**
 * Renders a high-precision, frame-throttled visual reading progress tracking line
 */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    let isProgressThrottled = false;

    window.addEventListener('scroll', () => {
        if (!isProgressThrottled) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                progressBar.style.width = `${scrollPercent}%`;
                isProgressThrottled = false;
            });
            isProgressThrottled = true;
        }
    }, { passive: true });
}

/**
 * Hardware-Accelerated Intersection Observer Reveal Pipeline
 * Manages Slit Masks, Curtain Image Reveals, and Gundam HUD targeting assemblies concurrently.
 */
function initScrollAnimations() {
    const animElements = document.querySelectorAll('.layout-reveal, .reveal-image-frame, .gundam-hud-trigger');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -120px 0px', // Deploys layouts elegantly right before crossing viewport boundaries
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop watching once active to conserve hardware threads
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animElements.forEach(element => observer.observe(element));
    } else {
        // Safe immediate loading backup fallback for older rendering engines
        animElements.forEach(element => element.classList.add('visible'));
    }
}

/**
 * Smooth Desktop Parallax Layering System
 */
function initParallaxEffects() {
    const heroImageCol = document.querySelector('.hero-image-col');
    const heroTextCol = document.querySelector('.hero-text-col');
    const mediaQuery = window.matchMedia('(min-width: 993px)');
    let isParallaxThrottled = false;

    function renderParallax() {
        const scrollVal = window.scrollY;
        if (heroImageCol) heroImageCol.style.transform = `translateY(${scrollVal * 0.05}px)`;
        if (heroTextCol) heroTextCol.style.transform = `translateY(${scrollVal * -0.015}px)`;
    }

    function scrollThrottler() {
        if (!isParallaxThrottled) {
            window.requestAnimationFrame(() => {
                renderParallax();
                isParallaxThrottled = false;
            });
            isParallaxThrottled = true;
        }
    }

    function handleViewportChange(e) {
        if (e.matches) {
            window.addEventListener('scroll', scrollThrottler, { passive: true });
        } else {
            window.removeEventListener('scroll', scrollThrottler);
            if (heroImageCol) heroImageCol.style.transform = '';
            if (heroTextCol) heroTextCol.style.transform = '';
        }
    }

    mediaQuery.addEventListener('change', handleViewportChange);
    if (mediaQuery.matches) window.addEventListener('scroll', scrollThrottler, { passive: true });
}

/**
 * Tracks viewport layout metrics to update primary header navigation highlights cleanly
 */
function initActiveNavTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    let isNavThrottled = false;

    window.addEventListener('scroll', () => {
        if (!isNavThrottled) {
            window.requestAnimationFrame(() => {
                let currentSectionId = '';
                const basePaddingOffset = header ? header.offsetHeight + 80 : 140;
                const currentScrollY = window.scrollY + basePaddingOffset;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;

                    if (currentScrollY >= sectionTop && currentScrollY < (sectionTop + sectionHeight)) {
                        currentSectionId = section.getAttribute('id');
                    }
                });

                if (currentSectionId) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentSectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
                isNavThrottled = false;
            });
            isNavThrottled = true;
        }
    }, { passive: true });
}