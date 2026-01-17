// Detecta los elementos al hacer scroll para animarlos
const boxes = document.querySelectorAll('.box');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

boxes.forEach(box => {
  observer.observe(box);
});

// Código para el calendario
const daysEl = document.getElementById('days'), monthEl = document.getElementById('month');
let dt = new Date();

function render() {
  const year = dt.getFullYear(), month = dt.getMonth();
  monthEl.textContent = dt.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
  daysEl.innerHTML = '';
  const firstDay = new Date(year, month, 1).getDay() || 7;
  const total = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i < firstDay; i++) daysEl.innerHTML += `<div></div>`;
  for (let d = 1; d <= total; d++) {
    const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();
    daysEl.innerHTML += `<div class="${isToday ? 'today' : ''}">${d}</div>`;
  }
}

document.getElementById('prev').onclick = () => {
  dt.setMonth(dt.getMonth() - 1);
  render();
}
document.getElementById('next').onclick = () => {
  dt.setMonth(dt.getMonth() + 1);
  render();
}

render();

function scheduleMidnight() {
  const now = new Date();
  const msMid = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
  setTimeout(() => {
    render();
    setInterval(render, 86400000);
  }, msMid);
}
scheduleMidnight();

const eventos = {
  '2025-06-25': 'feriado',
  '2025-07-10': 'examen',
  '2025-08-15': 'evento'
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const form = document.getElementById("formContacto");
const estado = document.getElementById("estadoForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Validación básica
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !email || !mensaje) {
    estado.textContent = "Por favor complete los campos obligatorios.";
    estado.style.color = "red";
    return;
  }

  // Simulación de envío
  estado.textContent = "Mensaje enviado correctamente. Gracias por contactarnos.";
  estado.style.color = "green";

  form.reset();
});
