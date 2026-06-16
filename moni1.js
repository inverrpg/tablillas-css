// ===== STACK SLIDER (index-based) =====
// En vez de reordenar el DOM, mantenemos un índice "activo" y calculamos
// la posición/escala/opacidad de cada tarjeta según su distancia relativa
// a ese índice. Las tarjetas nunca cambian de orden en el HTML.

const items = Array.from(document.querySelectorAll('.stack-item'));
const container = document.querySelector('.stack-container');
const nextBtn = document.querySelector('.stack-next');
const prevBtn = document.querySelector('.stack-prev');

let active = 0;
const total = items.length;

// Offsets horizontales para las tarjetas en segundo plano (índice 1, 2, 3...)
function getLayout() {
  const isMobile = window.innerWidth <= 760;
  return isMobile
    ? { offsets: [0, 130, 260, 390], scales: [1, 0.62, 0.62, 0.62] }
    : { offsets: [0, 360, 590, 820], scales: [1, 0.7, 0.7, 0.7] };
}

function render() {
  const { offsets, scales } = getLayout();

  items.forEach((item, i) => {
    // distancia circular hacia adelante desde la tarjeta activa
    let dist = (i - active + total) % total;

    item.classList.toggle('is-active', dist === 0);

    if (dist === 0) {
      item.style.transform = 'translateX(0) scale(1)';
      item.style.opacity = '1';
      item.style.width = '100%';
      item.style.height = '100%';
      item.style.zIndex = String(total);
      return;
    }

    if (dist <= 3) {
      const offset = offsets[dist];
      const scale = scales[dist];
      item.style.transform = `translateX(${offset}px) scale(${scale})`;
      item.style.opacity = '1';
      item.style.width = '46%';
      item.style.height = '100%';
      item.style.zIndex = String(total - dist);
    } else {
      // fuera de la vista, esperando turno
      const offset = offsets[3] + 160;
      item.style.transform = `translateX(${offset}px) scale(0.6)`;
      item.style.opacity = '0';
      item.style.width = '46%';
      item.style.height = '100%';
      item.style.zIndex = '0';
    }
  });
}

function goNext() {
  active = (active + 1) % total;
  render();
}

function goPrev() {
  active = (active - 1 + total) % total;
  render();
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);
window.addEventListener('resize', render);

render();

// ===== AUTOPLAY =====
let autoplay = setInterval(goNext, 6000);

container.addEventListener('mouseenter', () => clearInterval(autoplay));
container.addEventListener('mouseleave', () => {
  clearInterval(autoplay);
  autoplay = setInterval(goNext, 6000);
});

// ===== HERO CURSOR GLOW =====
const hero = document.querySelector('.hero');
const glow = document.querySelector('[data-cursor-glow]');

if (hero && glow) {
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let raf = null;

  function tick() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    raf = requestAnimationFrame(tick);
  }

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    if (!raf) raf = requestAnimationFrame(tick);
  });

  hero.addEventListener('mouseleave', () => {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  });
}
