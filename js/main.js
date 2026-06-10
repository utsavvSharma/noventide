/* ============================================================
   UGO GREENTECH SOLUTIONS — MAIN JS v2
   ============================================================ */

/* ── PAGE LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 800);
});

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
if (cursor && cursorRing && window.innerWidth > 768) {
  let rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    rx += (e.clientX - rx) * 0.14;
    ry += (e.clientY - ry) * 0.14;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
  });
  document.querySelectorAll('a,button,.glass-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width = '20px'; cursor.style.height = '20px'; });
    el.addEventListener('mouseleave', () => { cursor.style.width = '12px'; cursor.style.height = '12px'; });
  });
}

/* ── PARTICLES ── */
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  const colors = ['rgba(183,239,58,', 'rgba(149,213,178,', 'rgba(216,243,220,'];
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 2.5 + 0.5;
      this.dx = (Math.random() - 0.5) * 0.35;
      this.dy = -Math.random() * 0.5 - 0.1;
      this.op = Math.random() * 0.5 + 0.1;
      this.fade = Math.random() * 0.006 + 0.002;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.leaf = Math.random() > 0.82;
    }
    draw() {
      ctx.globalAlpha = this.op;
      if (this.leaf) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.sin(Date.now() * 0.001 + this.x) * 0.3);
        ctx.fillStyle = this.color + '0.7)';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.r * 3, this.r * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        ctx.fillStyle = this.color + this.op + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    update() {
      this.x += this.dx;
      this.y += this.dy;
      this.op -= this.fade;
      if (this.op <= 0 || this.y < -20) this.reset();
    }
  }

  for (let i = 0; i < 65; i++) particles.push(new Particle());
  const animate = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  };
  animate();
}

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ── HAMBURGER ── */
const ham = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (ham && mobileNav) {
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
}

/* ── MOBILE ACCORDION ── */
document.querySelectorAll('.mobile-accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    if (body) body.classList.toggle('open');
    const icon = btn.querySelector('.icon');
    if (icon) icon.textContent = body?.classList.contains('open') ? '▴' : '▾';
  });
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObs.observe(el));

/* ── ANIMATED COUNTERS ── */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      const dec = el.dataset.dec ? parseInt(el.dataset.dec) : 0;
      let start = 0;
      const dur = 1800;
      const startTime = performance.now();
      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / dur, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = start + (target - start) * ease;
        el.textContent = (dec ? val.toFixed(dec) : Math.floor(val)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.counter-number').forEach(el => counterObs.observe(el));

/* ── PROGRESS BARS ── */
const progressObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = (e.target.dataset.width || '0') + '%';
      progressObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.progress-bar-inner').forEach(el => progressObs.observe(el));

/* ── SCROLL TO TOP ── */
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => scrollTopBtn.classList.toggle('visible', window.scrollY > 400));
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── NEWSLETTER FORM ── */
document.querySelectorAll('#newsletter-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    const btn = form.querySelector('.newsletter-btn');
    if (!input || !input.value) return;
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#95D5B2';
    input.value = '';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
  });
});

/* ── TICKER CLONE (infinite) ── */
const ticker = document.getElementById('ticker');
if (ticker) {
  const clone = ticker.cloneNode(true);
  ticker.parentNode.appendChild(clone);
}

/* ── CLIENTS MARQUEE ── */
const marquee = document.getElementById('clients-marquee');
if (marquee) {
  const clone = marquee.cloneNode(true);
  marquee.parentNode.appendChild(clone);
}

/* ── PARALLAX on HERO ── */
document.addEventListener('mousemove', e => {
  const mx = (e.clientX / window.innerWidth - 0.5) * 12;
  const my = (e.clientY / window.innerHeight - 0.5) * 12;
  document.querySelectorAll('.hero-ring').forEach((el, i) => {
    const factor = (i + 1) * 0.4;
    el.style.transform = `translate(${mx * factor}px, ${my * factor}px)`;
  });
});
