// ---- Parallax yulduzlar (Canvas) ----
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.4 + 0.3,
      depth: Math.random() * 0.6 + 0.2, // parallax speed factor
      alpha: Math.random() * 0.6 + 0.3
    });
  }
}
createStars(160);

let scrollY = 0;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,1)';

  stars.forEach(star => {
    const offsetY = (star.y + scrollY * star.depth) % canvas.height;
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, offsetY, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}
drawStars();

// ---- Suzuvchi yuraklar ----
const heartsContainer = document.getElementById('hearts');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function spawnHeart() {
  if (reduceMotion) return;

  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '♥';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
  heart.style.animationDuration = (8 + Math.random() * 6) + 's';
  heart.style.fontSize = (12 + Math.random() * 14) + 'px';

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 15000);
}

setInterval(spawnHeart, 1400);
