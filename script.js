/**
 * Pavithran Bhagavan — Personal Portfolio Logic
 * Custom interactions, scroll animations, navigation states, and correspondence forms.
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollProgress();
    initScrollAnimations();
    initParallaxEffects();
    initActiveNavTracking();
});

/**
 * Triggers the luxury fullscreen preloader intro animation when the site loads
 */
function initPreloader() {
    const preloader = document.getElementById('vogue-preloader');
    if (!preloader) return;
    
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    
    // Animate content entrance inside preloader
    setTimeout(() => {
        preloader.classList.add('active');
    }, 200);
    
    // Dismiss preloader and restore scrolling
    setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.classList.add('loaded');
        document.body.style.overflow = '';
        
        // Remove preloader element from DOM after transition completes
        setTimeout(() => {
            preloader.remove();
            // Force scroll dispatch to run IntersectionObserver checking instantly
            window.dispatchEvent(new Event('scroll'));
        }, 1200);
    }, 2800);
}

/**
 * Creates and updates a premium scroll progress bar at the top of the viewport
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    });
}

/**
 * Scroll Animations using IntersectionObserver
 * Detects elements with '.fade-in', '.reveal-text', or '.reveal-image' class and makes them visible.
 */
function initScrollAnimations() {
    const animElements = document.querySelectorAll('.fade-in, .reveal-text, .reveal-image');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px', // Trigger slightly before scrolling past
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Once visible, stop observing
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        animElements.forEach(element => {
            element.classList.add('visible');
        });
    }
}

/**
 * Subtle parallax effects on editorial columns for premium movement depth
 */
function initParallaxEffects() {
    const heroImageCol = document.querySelector('.hero-image-col');
    const heroTextCol = document.querySelector('.hero-text-col');
    
    if (window.innerWidth > 768) { // Only run parallax on desktop viewports
        window.addEventListener('scroll', () => {
            const scrollVal = window.scrollY;
            
            // Offset scroll heights to create premium layout layer depth
            if (heroImageCol) {
                heroImageCol.style.transform = `translateY(${scrollVal * 0.08}px)`;
            }
            if (heroTextCol) {
                heroTextCol.style.transform = `translateY(${scrollVal * -0.02}px)`;
            }
        });
    }
}

/**
 * Tracks scroll position to highlight the active section link in navigation
 */
function initActiveNavTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // Offset for header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
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
    });
}
