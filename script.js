// ── Logika Filtriranja i Sortiranja ──
const filterGumbi = document.querySelectorAll('.btn-filter');
const sortSelect = document.getElementById('sort-select');
const kontejnerKartica = document.getElementById('kartice-kontejner');
// Pretvaramo NodeList u niz kako bismo ga lakše sortirali
const sveKartice = Array.from(kontejnerKartica.querySelectorAll('.kartica-gumb'));

// Funkcija koja radi i filtriranje i sortiranje odjednom
function azurirajKartice() {
  const aktivniFilter = document.querySelector('.btn-filter.aktivan').getAttribute('data-filter');
  const nacinSortiranja = sortSelect.value;

  // 1. Filtriranje
  let filtriraneKartice = sveKartice.filter(kartica => {
    const tip = kartica.getAttribute('data-tip');
    if (aktivniFilter === 'all') return true;
    return tip === aktivniFilter;
  });

  // 2. Sortiranje
  if (nacinSortiranja === 'asc') {
    filtriraneKartice.sort((a, b) => a.getAttribute('data-naziv').localeCompare(b.getAttribute('data-naziv'), 'hr'));
  } else if (nacinSortiranja === 'desc') {
    filtriraneKartice.sort((a, b) => b.getAttribute('data-naziv').localeCompare(a.getAttribute('data-naziv'), 'hr'));
  } // Ako je 'default', ostaju u originalnom redoslijedu iz HTML-a (kako su ubačene u niz)

  // 3. Prikazivanje na ekranu
  // Prvo sakrij sve kartice iz DOM-a
  sveKartice.forEach(k => k.style.display = 'none');
  
  // Očisti kontejner i ubaci samo filtrirane/sortirane kartice nazad
  kontejnerKartica.innerHTML = '';
  filtriraneKartice.forEach(kartica => {
    kartica.style.display = 'flex'; // Vraćamo prikaz
    kontejnerKartica.appendChild(kartica);
  });
}

// Event listeneri za klik na filter gumbe
filterGumbi.forEach(gumb => {
  gumb.addEventListener('click', () => {
    filterGumbi.forEach(g => g.classList.remove('aktivan'));
    gumb.classList.add('aktivan');
    azurirajKartice();
  });
});

// Event listener za promjenu u sort selektoru
sortSelect.addEventListener('change', azurirajKartice);