document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('burger-btn');
  const nav = document.getElementById('main-nav');

  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('active');
  });
});









//CD-Galerie Interaktivität

(function(){
  const rack   = document.getElementById('rack');
  if(!rack){ console.error('Rack mit id="rack" nicht gefunden.'); return; }

  const panels = Array.from(rack.querySelectorAll('.panel'));
  if(panels.length === 0){ console.error('Keine .panel-Elemente im Rack gefunden.'); return; }

  const readVarPx = (el, name, fallback) => {
    const v = parseFloat(getComputedStyle(el).getPropertyValue(name));
    return Number.isFinite(v) ? v : fallback;
  };

  function openPanel(panel){
    const rackRect = rack.getBoundingClientRect();
    const style    = getComputedStyle(rack);
    const padLeft  = parseFloat(style.paddingLeft)  || 0;
    const padRight = parseFloat(style.paddingRight) || 0;
    const innerW   = rackRect.width - padLeft - padRight;

    const expanded = readVarPx(document.documentElement, '--expanded', 700);

    // aktuelle linke Position des Panels innerhalb des Racks (ohne padding)
    const pRect      = panel.getBoundingClientRect();
    const offsetLeft = pRect.left - rackRect.left - padLeft;

    // Standard: an der Stelle oeffnen, wo es liegt
    let left = offsetLeft;

    // rechts begrenzen
    if (left + expanded > innerW) left = innerW - expanded;
    // links begrenzen
    if (left < 0) left = 0;

    rack.classList.add('has-active');
    panels.forEach(p => {
      const active = (p === panel);
      p.classList.toggle('active', active);
      p.style.left = active ? (left + padLeft) + 'px' : '';
    });
  }

  function closeAll(){
    rack.classList.remove('has-active');
    panels.forEach(p => { p.classList.remove('active'); p.style.left=''; });
  }

  const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;

  // *** WICHTIG: nicht mehr auf panel.mouseleave schliessen! ***
  panels.forEach(p => {
    // Aktivieren
    p.addEventListener('mouseenter', () => openPanel(p));
    p.addEventListener('focus',      () => openPanel(p));

    // Touch: Tap toggelt
    p.addEventListener('click', (e) => {
      if (!isTouch) return;
      const active = p.classList.contains('active');
      if (active) closeAll(); else openPanel(p);
    });
  });

  // Schliessen nur wenn die Maus das RACK verlaesst (nicht das Panel)
  rack.addEventListener('mouseleave', closeAll);
  // Tastatur: wenn das Rack den Fokus komplett verliert
  rack.addEventListener('focusout', (e) => {
    if (!rack.contains(e.relatedTarget)) closeAll();
  });

  // Neu positionieren bei Resize
  window.addEventListener('resize', () => {
    const current = panels.find(p => p.classList.contains('active'));
    if (current) openPanel(current);
  });
})();



// Kategorie-Filter für CD-Galerie
const cat = new URLSearchParams(window.location.search).get("cat");

document.querySelectorAll("li[data-category]").forEach(item => {
  if (!cat || item.dataset.category === cat) {
    item.style.display = "block";
  } else {
    item.style.display = "none";
  }
});



// detail.php
