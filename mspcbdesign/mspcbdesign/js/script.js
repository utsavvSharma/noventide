/**
 * MS PCB Design — script.js
 * Shared JS: header scroll, mobile nav, reveal animations,
 * animated counters, PCB cell animation, contact form
 */

/* ─── DOM READY ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initScrollReveal();
  initCounters();
  initPCBGrid();
  initContactForm();
  setActiveNavLink();
});

/* ─── HEADER SCROLL ─────────────────────────────────────────── */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ─── MOBILE NAV ────────────────────────────────────────────── */
function initMobileNav() {
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;

  let isOpen = false;

  hamburger.addEventListener('click', () => {
    isOpen = !isOpen;
    hamburger.classList.toggle('open', isOpen);
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      closeMobileNav();
    }
  });

  function closeMobileNav() {
    isOpen = false;
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Expose globally for inline onclick fallback
  window.closeMobileNav = closeMobileNav;
}

/* ─── SCROLL REVEAL ─────────────────────────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ─── ANIMATED COUNTERS ─────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  if (isNaN(target)) return;

  let current  = 0;
  const increment = target / 60;
  const suffix = el.getAttribute('data-suffix') || '+';

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, 24);
}

/* ─── PCB GRID ANIMATION ────────────────────────────────────── */
function initPCBGrid() {
  const cells = document.querySelectorAll('.pcb-cell');
  if (!cells.length) return;

  setInterval(() => {
    const idx = Math.floor(Math.random() * cells.length);
    cells[idx].classList.toggle('active');
  }, 480);
}

/* ─── CONTACT FORM ──────────────────────────────────────────── */
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });
    if (!valid) return;

    // Simulate submission
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      if (success) {
        success.style.display = 'block';
      }
    }, 900);
  });

  // Live validation reset
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    });
  });
}

/* ─── ACTIVE NAV LINK ───────────────────────────────────────── */
function setActiveNavLink() {
  const path  = window.location.pathname;
  const links = document.querySelectorAll('.nav a, .mobile-nav a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Match by filename or folder
    const linkPath = href.replace(/^\.+\//, '/').replace(/index\.html$/, '/');
    const currentPath = path.replace(/index\.html$/, '/');

    if (
      (path === '/' || path.endsWith('/index.html')) && (href === 'index.html' || href === '/') ||
      (path.includes('/about') && href.includes('about')) ||
      (path.includes('/Services') && href.includes('Services')) ||
      (path.includes('/Process') && href.includes('Process')) ||
      (path.includes('/Projects') && href.includes('Projects')) ||
      (path.includes('/Contact') && href.includes('Contact'))
    ) {
      link.classList.add('active');
    }
  });
}

/* ─── SMOOTH ANCHOR SCROLL ──────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // header height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

