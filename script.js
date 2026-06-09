document.addEventListener("DOMContentLoaded", () => {
  
  // ══════════════════════════════
  // 1. NAVIGACIJA LOGIKA (Dropdown i Hamburger)
  // ══════════════════════════════
  const navItems = document.querySelectorAll('.nav-item');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  navItems.forEach(item => {
    const trigger = item.querySelector('.nav-trigger');
    if (!trigger) return;
    
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = item.classList.contains('otvoren');
      
      // Zatvori ostale dropdown izbornike
      navItems.forEach(i => {
        i.classList.remove('otvoren');
        const t = i.querySelector('.nav-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      
      if (!isOpen) {
        item.classList.add('otvoren');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Klik izvan zatvara sve dropdowne
  document.addEventListener('click', () => {
    navItems.forEach(i => {
      i.classList.remove('otvoren');
      const t = i.querySelector('.nav-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  // Mobilni Hamburger izbornik
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('vidljiv');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('vidljiv');
      });
    });
  }

  // ══════════════════════════════
  // 2. LOGIKA FILTRIRANJA I SORTIRANJA KARTICA
  // ══════════════════════════════
  const filterGumbi = document.querySelectorAll('.btn-filter');
  const sortSelect = document.getElementById('sort-select');
  const kontejnerKartica = document.getElementById('kartice-kontejner');
  
  if (kontejnerKartica && sortSelect) {
    // Pretvaramo kartice u array kako bismo ih sortirali
    const sveKartice = Array.from(kontejnerKartica.querySelectorAll('.kartica-gumb'));

    function azurirajKartice() {
      const aktivniFilter = document.querySelector('.btn-filter.aktivan').getAttribute('data-filter');
      const nacinSortiranja = sortSelect.value;

      // Korak A: Filtriranje (Sve / Besplatno / Premium)
      let filtriraneKartice = sveKartice.filter(kartica => {
        const tip = kartica.getAttribute('data-tip');
        if (aktivniFilter === 'all') return true;
        return tip === aktivniFilter;
      });

      // Korak B: Sortiranje uz punu podršku za hrvatsku abecedu (č, ć, š, ž...)
      if (nacinSortiranja === 'asc') {
        filtriraneKartice.sort((a, b) => a.getAttribute('data-naziv').localeCompare(b.getAttribute('data-naziv'), 'hr'));
      } else if (nacinSortiranja === 'desc') {
        filtriraneKartice.sort((a, b) => b.getAttribute('data-naziv').localeCompare(a.getAttribute('data-naziv'), 'hr'));
      } 
      // Ako je 'default', elementi se automatski slažu kako su upisani u HTML-u

      // Korak C: Renderiranje u DOM-u s animacijom prikaza
      sveKartice.forEach(k => k.style.display = 'none');
      kontejnerKartica.innerHTML = '';
      
      filtriraneKartice.forEach(kartica => {
        kartica.style.display = 'flex';
        kontejnerKartica.appendChild(kartica);
      });
    }

    // Klik na filter gumbe
    filterGumbi.forEach(gumb => {
      gumb.addEventListener('click', () => {
        filterGumbi.forEach(g => g.classList.remove('aktivan'));
        gumb.classList.add('aktivan');
        azurirajKartice();
      });
    });

    // Promjena selektora sortiranja
    sortSelect.addEventListener('change', azurirajKartice);
  }
});