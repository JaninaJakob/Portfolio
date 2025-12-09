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

  // CD-Galerie Interaktivitaet
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

  // =========================
  // Scroll-Hero fuer detail.php
  // =========================
  const heroSection = document.getElementById('heroSection');
  const heroFrame   = document.getElementById('heroFrame');

  if (heroSection && heroFrame) {
    const maxRotate = (Math.random() * 8 - 4); // -4 .. +4 Grad

    function onScroll() {
      const scrollTop   = window.scrollY;
      const sectionTop  = heroSection.offsetTop;
      const sectionEnd  = sectionTop + window.innerHeight;

      let progress = (scrollTop - sectionTop) / (sectionEnd - sectionTop);
      progress = Math.max(0, Math.min(1, progress));

      const scale  = 1 - progress * 0.65;     // drehung 
      const rotate = maxRotate * progress;    // 0 -> random

      heroFrame.style.transform   = `scale(${scale}) rotate(${rotate}deg)`;
      heroFrame.style.borderRadius = `${progress * 32}px`;
      heroFrame.style.boxShadow    = `0 40px 100px rgba(0,0,0,${progress * 0.35})`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }
});






// detail.php
