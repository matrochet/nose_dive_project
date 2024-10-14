// Ceci est une fonction auto-exécutable.
(function () {
  "use strict";

  // Gestion du menu déroulant
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
})();
