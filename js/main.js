'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const header     = document.getElementById('header');
  const hamburger  = document.getElementById('hamburger');
  const nav        = document.getElementById('nav');
  const navLinks   = document.querySelectorAll('.nav__link');
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const revealEls  = document.querySelectorAll('.reveal');
  const sections   = document.querySelectorAll('section[id]');

  /* -------------------------------------------------------
     Header: shrink on scroll
  ------------------------------------------------------- */
  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------------
     Mobile hamburger menu
  ------------------------------------------------------- */
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    hamburger.classList.toggle('hamburger--open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      hamburger.classList.remove('hamburger--open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Ouvrir le menu');
      document.body.style.overflow = '';
    });
  });

  /* -------------------------------------------------------
     Pricing tabs
  ------------------------------------------------------- */
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => {
        b.classList.remove('tab-btn--active');
        b.setAttribute('aria-selected', 'false');
      });
      tabContents.forEach(c => {
        c.classList.remove('tab-content--active');
        c.hidden = true;
      });

      btn.classList.add('tab-btn--active');
      btn.setAttribute('aria-selected', 'true');

      const panel = document.getElementById(`tab-${target}`);
      panel.classList.add('tab-content--active');
      panel.hidden = false;

      // Trigger reveal animations for newly visible elements
      panel.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
        el.classList.add('revealed');
      });
    });
  });

  /* -------------------------------------------------------
     Scroll reveal with IntersectionObserver
  ------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings in the same grid
          const siblings = [...(entry.target.parentElement?.children ?? [])];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 320);
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  /* -------------------------------------------------------
     Active nav link highlight on scroll
  ------------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'nav__link--active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => navObserver.observe(s));
  }

  /* -------------------------------------------------------
     Lightbox
  ------------------------------------------------------- */
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const galleryItems = [...document.querySelectorAll('.galerie__item img')];
  let currentIndex   = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryItems[index].src;
    lightboxImg.alt = galleryItems[index].alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
  }

  galleryItems.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => openLightbox(i));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev)  lightboxPrev.addEventListener('click', showPrev);
  if (lightboxNext)  lightboxNext.addEventListener('click', showNext);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox?.hidden) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  /* -------------------------------------------------------
     Smooth scroll polyfill for browsers that need it
  ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
