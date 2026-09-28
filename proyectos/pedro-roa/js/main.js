/**
 * Pedro Roa Web Application - Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  highlightActiveNavigation();
  initScrollAnimations();
  initSmoothScroll();
});

/**
 * Mobile Drawer Navigation Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      }
    });
  }
}

/**
 * Automatically highlight the active navigation link based on window location
 */
function highlightActiveNavigation() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('nav a, #mobile-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const hrefClean = href.replace('../', '').replace('./', '').toLowerCase();
    
    // Check match condition
    const isHome = (currentPath.endsWith('/') || currentPath.endsWith('index.html')) && (hrefClean === 'index.html' || hrefClean === '#');
    const isMatch = isHome || (currentPath.includes(hrefClean) && hrefClean !== '#' && hrefClean !== 'index.html');

    if (isMatch) {
      link.classList.add('nav-link-active');
    }
  });
}

/**
 * Intersection Observer for scroll-triggered fade-in animations
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .hover-card-lift').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Smooth scrolling for internal anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
