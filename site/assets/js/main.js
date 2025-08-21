// Año del footer
document.getElementById('year').textContent = new Date().getFullYear();

// Iniciar animaciones de scroll (AOS)
if (window.AOS) {
  AOS.init({ duration: 700, once: true, offset: 40 });
}

// Pequeña animación de entrada para cards
document.querySelectorAll('.card, .grid-item, .step').forEach(el => {
  el.setAttribute('data-aos','fade-up');
});