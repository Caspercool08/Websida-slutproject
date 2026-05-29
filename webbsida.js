// Hämtar hamburger-knappen och nav-elementet från HTML:en
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

// Körs när man klickar på hamburger-knappen
hamburger.addEventListener('click', function() {

  // toggle lägger till klassen "visas" om den saknas, tar bort den om den finns
  const arOppen = nav.classList.toggle('visas');

  // Uppdaterar ikonen – true = visa X, false = visa tre linjer
  hamburger.classList.toggle('oppen', arOppen);

  // Uppdaterar aria-expanded
  hamburger.setAttribute('aria-expanded', arOppen);
});

// Stänger menyn om man klickar utanför headern
document.addEventListener('click', function(event) {
  const header = document.querySelector('header');

  if (!header.contains(event.target)) {
    nav.classList.remove('visas');
    hamburger.classList.remove('oppen');
    hamburger.setAttribute('aria-expanded', false);
  }
});