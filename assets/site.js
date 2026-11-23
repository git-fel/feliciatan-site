// Small interactions shared by all pages. No libraries needed.

// 1) Scroll reveal: elements with class "reveal" fade up when they enter the screen.
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  reveals.forEach((el, i) => {
    // Stagger siblings slightly so cards arrive one after another instead of all at once.
    el.style.transitionDelay = ((i % 4) * 90) + 'ms';
    io.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add('in'));   // very old browsers: just show everything
}

// 2) Spotlight on cards: tell the CSS where the mouse is inside the card.
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

// 3) Navigation gets a thin line once you scroll.
const nav = document.querySelector('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// 4) "Copy BibTeX" buttons: copy the text of the element named in data-copy.
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const text = document.querySelector(btn.dataset.copy).innerText;
    const label = btn.textContent;
    navigator.clipboard.writeText(text).then(() => { btn.textContent = 'Copied'; setTimeout(() => { btn.textContent = label; }, 1500); });
  });
});
