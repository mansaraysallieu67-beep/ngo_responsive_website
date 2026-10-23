const pages = [...document.querySelectorAll('.page')];
const navLinks = [...document.querySelectorAll('[data-page]')];
const mainNav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');

function showPage(id) {
  const pageId = pages.some(p => p.id === id) ? id : 'home';
  pages.forEach(page => page.classList.toggle('active', page.id === pageId));
  navLinks.forEach(link => link.classList.toggle('current', link.dataset.page === pageId));
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function routeFromHash() { showPage((location.hash || '#home').slice(1)); }
window.addEventListener('hashchange', routeFromHash);
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href').slice(1);
    if (pages.some(page => page.id === id)) {
      event.preventDefault();
      if (location.hash === '#' + id) showPage(id);
      else location.hash = id;
    }
  });
});
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === button));
    document.querySelectorAll('.project-card').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
  });
});
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const note = document.querySelector('.form-note');
  note.textContent = 'Thank you! Your message has been prepared. Connect a backend or email service to receive submissions.';
  event.currentTarget.reset();
});
routeFromHash();
