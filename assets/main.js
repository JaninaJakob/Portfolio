document.addEventListener('DOMContentLoaded', () => {
  // Burger-Menue
  const btn = document.getElementById('burger-btn');
  const nav = document.getElementById('main-nav');

  if (btn && nav) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('active');
    });
  }

  // CD-Galerie Interaktivitaet (unveraendert)
  const rack = document.getElementById('rack');
  if (rack) {
    const panels = Array.from(rack.querySelectorAll('.panel'));
    if (panels.length === 0) {
      console.error('Keine .panel-Elemente im Rack gefunden.');
    } else {

      const readVarPx = (el, name, fallback) => {
        const v = parseFloat(getComputedStyle(el).getPropertyValue(name));
        return Number.isFinite(v) ? v : fallback;
      };

      function openPanel(panel) {
        const rackRect = rack.getBoundingClientRect();
        const style    = getComputedStyle(rack);
        const padLeft  = parseFloat(style.paddingLeft)  || 0;
        const padRight = parseFloat(style.paddingRight) || 0;
        const innerW   = rackRect.width - padLeft - padRight;

        const expanded = readVarPx(document.documentElement, '--expanded', 700);

        const pRect      = panel.getBoundingClientRect();
        const offsetLeft = pRect.left - rackRect.left - padLeft;

        let left = offsetLeft;
        if (left + expanded > innerW) left = innerW - expanded;
        if (left < 0) left = 0;

        rack.classList.add('has-active');
        panels.forEach(p => {
          const active = (p === panel);
          p.classList.toggle('active', active);
          p.style.left = active ? (left + padLeft) + 'px' : '';
        });
      }

      function closeAll() {
        rack.classList.remove('has-active');
        panels.forEach(p => {
          p.classList.remove('active');
          p.style.left = '';
        });
      }

      const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;

      panels.forEach(p => {
        p.addEventListener('mouseenter', () => openPanel(p));
        p.addEventListener('focus',      () => openPanel(p));

        p.addEventListener('click', e => {
          const link = e.target.closest('a[href]');
          if (link) return;

          const panelLink = p.querySelector('a.panel-link');
          if (!panelLink || !panelLink.href) return;

          if (!isTouch) {
            openPanel(p);
            window.location.href = panelLink.href;
            return;
          }

          const active = p.classList.contains('active');
          if (active) {
            window.location.href = panelLink.href;
          } else {
            openPanel(p);
          }
        });
      });

      rack.addEventListener('mouseleave', closeAll);
      rack.addEventListener('focusout', e => {
        if (!rack.contains(e.relatedTarget)) closeAll();
      });

      window.addEventListener('resize', () => {
        const current = panels.find(p => p.classList.contains('active'));
        if (current) openPanel(current);
      });
    }
  }

  // Kategorie-Filter
  const cat = new URLSearchParams(window.location.search).get('cat');
  document.querySelectorAll('li[data-category]').forEach(item => {
    item.style.display = (!cat || item.dataset.category === cat)
      ? 'block'
      : 'none';
  });

  // Scroll-Hero fuer detail.php
  const heroSection = document.getElementById('heroSection');
  const heroFrame = document.getElementById('heroFrame');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');

  if (heroSection && heroFrame) {
    const maxRotate = (Math.random() * 8 - 4); // -4 .. +4 Grad

    function onScroll() {
      const scrollTop = window.scrollY;
      const sectionTop = heroSection.offsetTop;
      const sectionEnd = sectionTop + window.innerHeight;

      let progress = (scrollTop - sectionTop) / (sectionEnd - sectionTop);
      progress = Math.max(0, Math.min(1, progress));

      const scale = 1 - progress * 0.65;
      const rotate = maxRotate * progress;

      // Text langsam ausblenden (wie vorher)
      const textOpacity = 1 - progress;
      if (heroTitle) heroTitle.style.opacity = textOpacity.toString();
      if (heroSubtitle) heroSubtitle.style.opacity = textOpacity.toString();

      // Nur das Bild transformieren
      heroFrame.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
      heroFrame.style.borderRadius = `${progress * 32}px`;
      heroFrame.style.boxShadow = `0 40px 100px rgba(0,0,0,${progress * 0.35})`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }
});

const heroSection = document.getElementById('heroSection');
const heroFrame = document.getElementById('heroFrame');
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');
const heroBigtext = document.getElementById('heroBigtext'); // NEU

if (heroSection && heroFrame) {
  const maxRotate = (Math.random() * 8 - 4); // -4 .. +4 Grad

  function onScroll() {
    const scrollTop = window.scrollY;
    const sectionTop = heroSection.offsetTop;
    const sectionEnd = sectionTop + window.innerHeight;

    let progress = (scrollTop - sectionTop) / (sectionEnd - sectionTop);
    progress = Math.max(0, Math.min(1, progress));

    const scale = 1 - progress * 0.65;
    const rotate = maxRotate * progress;

    // Text langsam ausblenden
    const textOpacity = 1 - progress;
    if (heroTitle) heroTitle.style.opacity = String(textOpacity);
    if (heroSubtitle) heroSubtitle.style.opacity = String(textOpacity);

    // Bild transformieren
    heroFrame.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
    heroFrame.style.borderRadius = `${progress * 32}px`;
    heroFrame.style.boxShadow = `0 40px 100px rgba(0,0,0,${progress * 0.35})`;

    // NEU: "BILDER" erst gegen Ende einblenden
    if (heroBigtext) {
      const revealStart = 0.72; // ab wann einblenden (0..1)
      const t = (progress - revealStart) / (1 - revealStart);
      const eased = Math.max(0, Math.min(1, t));

      heroBigtext.style.opacity = String(eased);
      heroBigtext.style.transform = `translateY(-50%) translateY(${(1 - eased) * 20}px)`;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

(() => {
  const viewport = document.getElementById('polaroidViewport');
  const track = document.getElementById('polaroidTrack');
  if (!viewport || !track) return;

  /* ========= SETUP: Inhalte klonen ========= */
  const items = Array.from(track.children);
  const cloneCount = items.length;

  // Vorne & hinten klonen
  items.forEach(el => track.appendChild(el.cloneNode(true)));
  items.slice().reverse().forEach(el => {
    track.insertBefore(el.cloneNode(true), track.firstChild);
  });

  // Nach dem Klonen in die "echte" Mitte springen
  let itemWidth = items[0].getBoundingClientRect().width;
  let gap = parseFloat(getComputedStyle(track).gap) || 0;
  let step = itemWidth + gap;

  let startOffset = step * cloneCount;
  viewport.scrollLeft = startOffset;

  /* ========= ENDLOS-LOGIK ========= */
  function checkLoop() {
    const maxScroll = step * cloneCount * 2;
    if (viewport.scrollLeft <= step) {
      viewport.scrollLeft += step * cloneCount;
    }
    if (viewport.scrollLeft >= maxScroll) {
      viewport.scrollLeft -= step * cloneCount;
    }
  }

  viewport.addEventListener('scroll', checkLoop, { passive: true });

  /* ========= DRAG MIT MAUS ========= */
  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  viewport.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX;
    startScroll = viewport.scrollLeft;
    viewport.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    viewport.style.cursor = '';
  });

  viewport.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    viewport.scrollLeft = startScroll - (e.pageX - startX);
  });

  /* ========= SNAP (optional, sehr angenehm) ========= */
  let snapTimeout;
  viewport.addEventListener('scroll', () => {
    clearTimeout(snapTimeout);
    snapTimeout = setTimeout(() => {
      const snapped = Math.round(viewport.scrollLeft / step) * step;
      viewport.scrollTo({ left: snapped, behavior: 'smooth' });
    }, 120);
  });
})();

(() => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImg) return;

  // Klick auf Polaroid
  document.querySelectorAll('.polaroid img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();

      lightboxImg.src = img.src;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  // Schliessen
  function closeLightbox(){
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();



