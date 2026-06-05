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
    initContactForm();
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

/**
 * Handles validation and submission styling of the editorial Correspondence Form
 */
function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    const statusMsg = document.getElementById('form-status-message');
    
    if (!form || !statusMsg) return;
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Simple form validation check
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const subject = document.getElementById('form-subject').value.trim();
        const message = document.getElementById('form-message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showFormStatus('Please fill in all correspondence fields.', 'error');
            return;
        }
        
        // Visual feedback for submitting state
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;
        
        // Simulate a premium, secure API dispatch
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Clear fields on successful "send"
            form.reset();
            showFormStatus('Correspondence sent successfully. Pavithran will respond shortly.', 'success');
        }, 1200);
    });
}

/**
 * Displays user feedback on form submission status
 */
function showFormStatus(message, type) {
    const statusMsg = document.getElementById('form-status-message');
    statusMsg.textContent = message;
    statusMsg.className = 'form-status'; // Reset classes
    
    if (type === 'success') {
        statusMsg.classList.add('success');
    } else if (type === 'error') {
        statusMsg.classList.add('error');
    }
    
    // Smooth clear after 6 seconds
    setTimeout(() => {
        statusMsg.style.opacity = '0';
        setTimeout(() => {
            statusMsg.textContent = '';
            statusMsg.className = 'form-status';
            statusMsg.style.opacity = '1';
        }, 300);
    }, 6000);
}
