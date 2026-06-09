/**
 * VOGUE X GUNDAM HYBRID CORE MOTION ARCHITECTURE
 * Production System Scripts - 2026 Edition
 */

document.addEventListener("DOMContentLoaded", () => {
    initializePreloader();
    initializeScrollTracking();
    initializeIntersectionEngine();
});

/**
 * Destroys the preloader sequence and updates scrolling clearance tokens
 */
function initializePreloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.classList.add("fade-out");
            document.body.classList.remove("is-locked");

            // Clean DOM entirely post shutter execution
            preloader.addEventListener("transitionend", (e) => {
                if (e.propertyName === "visibility" || e.propertyName === "transform") {
                    preloader.remove();
                }
            });
        }, 800);
    });
}

/**
 * Tracks document delta metrics to manipulate top status progress bars
 */
function initializeScrollTracking() {
    const progressBar = document.getElementById("progress-bar");
    if (!progressBar) return;

    window.addEventListener("scroll", () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        progressBar.style.width = `${scrolled}%`;
    });
}

/**
 * Controls Intersection observers for triggers across systems
 */
function initializeIntersectionEngine() {
    const trackingOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const coreObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Kill tracking once visual is executed
            }
        });
    }, trackingOptions);

    // Register active observation nodes
    const structuralTriggers = [
        ".layout-reveal",
        ".reveal-image-frame",
        ".gundam-hud-trigger"
    ];

    structuralTriggers.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            coreObserver.observe(element);
        });
    });
}