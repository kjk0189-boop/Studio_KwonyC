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
  const section = link.hash ? document.querySelector(link.hash) : null;
  if (!section) return;
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


const categoryFilters = document.querySelector('.blog-filters');
if (categoryFilters) {
  const posts = [...document.querySelectorAll('#blog-posts [data-category]')];
  const empty = document.querySelector('#blog-empty');
  const options = [...categoryFilters.querySelectorAll('[data-filter]')];
  categoryFilters.hidden = false;
  for (const option of options) {
    option.addEventListener('click', () => {
      const category = option.dataset.filter;
      for (const button of options) {
        button.setAttribute('aria-pressed', String(button === option));
      }
      for (const post of posts) {
        post.hidden = category !== 'all' && post.dataset.category !== category;
      }
      empty.hidden = posts.some(post => !post.hidden);
    });
  }
}
