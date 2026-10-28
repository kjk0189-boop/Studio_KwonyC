const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

function closeMenu({ returnFocus = false } = {}) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
  mobileMenu.hidden = true;
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? '메뉴 열기' : '메뉴 닫기');
  mobileMenu.hidden = expanded;
});

mobileMenu.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  closeMenu();
  // Move focus out of the now-hidden menu to the destination section.
  const section = document.querySelector(link.hash);
  section.setAttribute('tabindex', '-1');
  section.focus({ preventScroll: true });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileMenu.hidden) closeMenu({ returnFocus: true });
});

document.addEventListener('click', (event) => {
  if (!mobileMenu.hidden && !event.target.closest('.site-header')) closeMenu();
});

const desktopLayout = window.matchMedia('(min-width: 761px)');
desktopLayout.addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

const navLinks = [...document.querySelectorAll('.desktop-nav .nav-link')];
const sections = [...document.querySelectorAll('main > section[id]')];
function markSection() {
  const current = sections.reduce((selected, section) =>
    section.getBoundingClientRect().top <= 180 ? section.id : selected, 'home');
  for (const link of navLinks) {
    const active = link.hash === `#${current}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

let queued = false;
window.addEventListener('scroll', () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { markSection(); queued = false; });
}, { passive: true });
markSection();
