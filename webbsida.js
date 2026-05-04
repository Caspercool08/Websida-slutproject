const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");


hamburger.addEventListener("click", function() {

  const arOppen = nav.classList.toggle("visas");

  hamburger.classList.toggle("oppen", arOppen);

  hamburger.setAttribute("aria-expanded", arOppen);
});

document.addEventListener("click", function(event) {
  const header = document.querySelector("header");

  if (!header.contains(event.target)) {
    nav.classList.remove("visas");
    hamburger.classList.remove("oppen");
    hamburger.setAttribute("aria-expanded", false);
  }
});