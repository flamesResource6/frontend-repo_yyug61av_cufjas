const slidesEl = document.getElementById('slides');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsEl = document.getElementById('dots');

const total = slidesEl.children.length;
let index = 0;
let autoplayId = null;

function renderDots() {
  dotsEl.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const btn = document.createElement('button');
    btn.className = 'dot' + (i === index ? ' active' : '');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
    btn.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(btn);
  }
}

function update() {
  const offset = -index * 100;
  slidesEl.style.transform = `translateX(${offset}%)`;
  renderDots();
}

function goTo(i) {
  index = (i + total) % total;
  update();
}

function next() { goTo(index + 1); }
function prev() { goTo(index - 1); }

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

function startAutoplay() {
  stopAutoplay();
  autoplayId = setInterval(next, 4000);
}
function stopAutoplay() {
  if (autoplayId) clearInterval(autoplayId);
  autoplayId = null;
}

// Pause on hover for accessibility
slidesEl.addEventListener('mouseenter', stopAutoplay);
slidesEl.addEventListener('mouseleave', startAutoplay);

// Keyboard support
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});

// Initialize
renderDots();
update();
startAutoplay();
