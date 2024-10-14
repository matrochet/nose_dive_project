// Ceci est une fonction auto-exécutable.
(function () {
  "use strict";

  // Déclare la constante pour la durée de chaque slide
  const slideTimeout = 5000;
  // Récupère les boutons de navigation
  const prev = document.querySelector("#prev");
  const next = document.querySelector("#next");
  // Récupère tous les éléments de type "slide"
  const $slides = document.querySelectorAll(".slide");
  // Initialisation de la variable pour les "dots"
  let $dots;
  // Initialisation de la variable pour l'intervalle d'affichage des slides
  let intervalId;
  // Initialisation du slide courant à 1
  let currentSlide = 1;

  // Fonction pour afficher un slide spécifique en utilisant un index
  function slideTo(index) {
    currentSlide = index >= $slides.length || index < 1 ? 0 : index;
    $slides.forEach(
      ($elt) => ($elt.style.transform = `translateX(-${currentSlide * 100}%)`)
    );
    $dots.forEach(
      ($elt, key) =>
        ($elt.classList = `dot ${key === currentSlide ? "active" : "inactive"}`)
    );
  }

  // Fonction pour afficher le prochain slide
  function showSlide() {
    slideTo(currentSlide);
    currentSlide++;
  }

  // Boucle pour créer les "dots"
  for (let i = 1; i <= $slides.length; i++) {
    let dotClass = i == currentSlide ? "active" : "inactive";
    let $dot = `<span data-slidId="${i}" class="dot ${dotClass}"></span>`;
    document.querySelector(".carousel-dots").innerHTML += $dot;
  }

  // Récupère tous les "dots"
  $dots = document.querySelectorAll(".dot");

  // Boucle pour ajouter des écouteurs d'événement "click" sur chaque "dot"
  $dots.forEach(($elt, key) =>
    $elt.addEventListener("click", () => slideTo(key))
  );

  // Ajout d'écouteurs d'événement pour les boutons "prev" et "next"
  prev.addEventListener("click", () => slideTo(--currentSlide));
  next.addEventListener("click", () => slideTo(++currentSlide));

  // Initialisation de l'intervalle pour afficher les slides
  intervalId = setInterval(showSlide, slideTimeout);

  // Boucle sur tous les éléments de type "slide" pour gérer les interactions
  $slides.forEach(($elt) => {
    let startX, endX;

    // Gestion de la souris
    $elt.addEventListener("mouseover", () => clearInterval(intervalId), false);
    $elt.addEventListener(
      "mouseout",
      () => {
        intervalId = setInterval(showSlide, slideTimeout);
      },
      false
    );

    // Gestion du toucher
    $elt.addEventListener("touchstart", (event) => {
      startX = event.touches[0].clientX;
    });
    $elt.addEventListener("touchend", (event) => {
      endX = event.changedTouches[0].clientX;
      if (startX > endX) {
        slideTo(currentSlide + 1);
      } else if (startX < endX) {
        slideTo(currentSlide - 1);
      }
    });
  });

  // Gestion du menu déroulant
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
})();
