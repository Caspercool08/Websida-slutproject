// Hämtar hamburger-knappen och nav-elementet från HTML:en
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

// Körs när man klickar på hamburger-knappen
hamburger.addEventListener("click", function() {

  // toggle lägger till klassen "visas" om den saknas, tar bort den om den finns
  const arOppen = nav.classList.toggle("visas");

  // Uppdaterar ikonen – true = visa X, false = visa tre linjer
  hamburger.classList.toggle("oppen", arOppen);

  // Uppdaterar aria-expanded
  hamburger.setAttribute("aria-expanded", arOppen);
});

// Stänger menyn om man klickar utanför headern
document.addEventListener("click", function(event) {
  const header = document.querySelector("header");

  if (!header.contains(event.target)) {
    nav.classList.remove("visas");
    hamburger.classList.remove("oppen");
    hamburger.setAttribute("aria-expanded", false);
  }
});

// Om vi inte är på kontakt-sidan finns inte formuläret,
// då hoppar vi över allt detta med if-satsen nedan
const formulär = document.getElementById("kontaktFormulär");

if (formulär) {

  // Körs när användaren klickar på "Skicka meddelande"
  formulär.addEventListener("submit", function(event) {

    // Stoppar formuläret från att skickas så vi kan kolla fälten först
    event.preventDefault();

    // Hämtar vad användaren har skrivit i varje fält
    const epost = document.getElementById("epost").value.trim();
    const arende = document.getElementById("arende").value.trim();
    const meddelande = document.getElementById("meddelande").value.trim();

    // Tar bort gamla felmeddelanden innan vi kollar igen
    rensaFelmeddelanden();

    // Håller koll på om något är fel
    let harFel = false;

    // Kollar att e-postadressen inte är tom
    if (epost === "") {
      visaFel("epost", "Du måste fylla i din e-postadress.");
      harFel = true;

    // Kollar att e-postadressen har rätt format (måste innehålla @ och .)
    } else if (!epost.includes("@") || !epost.includes(".")) {
      visaFel("epost", "E-postadressen verkar inte stämma, kontrollera att den är rätt.");
      harFel = true;
    }

    // Kollar att ärendefältet inte är tomt
    if (arende === "") {
      visaFel("arende", "Du måste fylla i en ärenderubrik.");
      harFel = true;
    }

    // Kollar att meddelandefältet inte är tomt
    if (meddelande === "") {
      visaFel("meddelande", "Du måste skriva ett meddelande.");
      harFel = true;
    }

    // Om allt är okej visas ett bekräftelsemeddelande
    if (!harFel) {
      visaBekräftelse();
    }
  });
}


// Hjälpfunktion: visar ett felmeddelande under ett fält
// inputId = id på fältet, text = felmeddelandet som visas
function visaFel(inputId, text) {
  const input = document.getElementById(inputId);

  // Skapar ett p-element med felmeddelandet
  const felText = document.createElement("p");
  felText.className = "felmeddelande";
  felText.textContent = text;

  // Lägger felmeddelandet direkt efter input-fältet
  input.parentNode.appendChild(felText);

  // Lägger till en röd kantlinje på fältet
  input.classList.add("fel-kant");
}


// Hjälpfunktion: tar bort alla felmeddelanden och röda kantlinjer
function rensaFelmeddelanden() {
  const allaMeddelanden = document.querySelectorAll(".felmeddelande");
  allaMeddelanden.forEach(function(meddelande) {
    meddelande.remove();
  });

  const allaFältMedFel = document.querySelectorAll(".fel-kant");
  allaFältMedFel.forEach(function(fält) {
    fält.classList.remove("fel-kant");
  });
}


// Hjälpfunktion: döljer formuläret och visar ett tack-meddelande
function visaBekräftelse() {
  formulär.style.display = "none";

  const tack = document.createElement("p");
  tack.className = "tack-meddelande";
  tack.textContent = "Tack för ditt meddelande! Vi hör av oss så snart vi kan.";

  formulär.parentNode.appendChild(tack);
}