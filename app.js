
/* ================= 渲染 ================= */
const track = document.getElementById('timelineTrack');
track.innerHTML = DYNASTIES.map((d, i) => `
  <div class="t-node" data-index="${i}" role="button" tabindex="0" aria-label="跳转到${d.name}">
    <span class="years">${d.years}</span>
    <span class="name">${d.name}</span>
    <span class="tag">${d.tag}</span>
  </div>`).join('');

const dynastyList = document.getElementById('dynastyList');
dynastyList.innerHTML = DYNASTIES.map((d, i) => `
  <article class="dynasty reveal" id="dynasty-${i}">
    <div class="dynasty-head">
      <div class="dynasty-char${d.name.length > 1 ? ' multi' : ''}">${d.name}</div>
      <h3>${d.name.length > 1 ? d.name + '时期' : d.name + '朝'}</h3>
      <span class="years">${d.years}</span>
      <p class="motto">${d.motto}</p>
    </div>
    <div class="panel">
      <h4>大事记</h4>
      ${d.events.map(e => `
        <div class="event">
          <b>${e.title}<i>${e.year}</i></b>
          <p>${e.desc}</p>
        </div>`).join('')}
      <div class="people">
        <h4>风云人物</h4>
        <div class="chip-row">
          ${d.people.map(p => `<span class="chip">${p[0]}<small>${p[1]}</small></span>`).join('')}
        </div>
      </div>
    </div>
  </article>`).join('');

document.getElementById('figureGrid').innerHTML = FIGURES.map(f => `
  <div class="figure-card reveal" data-char="${f.name[0]}">
    <div class="f-name">${f.name}</div>
    <div class="f-dynasty">${f.dynasty}</div>
    <p class="f-desc">${f.desc}</p>
  </div>`).join('');

/* 时间轴拖拽滚动 */
const wrap = document.getElementById('timelineWrap');
let dragStart = null, dragMoved = false;
wrap.addEventListener('pointerdown', e => {
  if (e.pointerType === 'touch') return; // 触屏交给原生滚动
  dragStart = { x: e.clientX, left: wrap.scrollLeft };
  dragMoved = false;
  wrap.classList.add('dragging');
});
addEventListener('pointercancel', () => {
  wrap.classList.remove('dragging');
  dragStart = null;
});
addEventListener('pointermove', e => {
  if (!dragStart) return;
  const dx = e.clientX - dragStart.x;
  if (Math.abs(dx) > 6) dragMoved = true;
  wrap.scrollLeft = dragStart.left - dx;
});
addEventListener('pointerup', () => {
  wrap.classList.remove('dragging');
  dragStart = null;
});
// 拖拽后阻止误触点击
track.addEventListener('click', e => {
  if (dragMoved) {
    e.stopPropagation();
    e.preventDefault();
    dragMoved = false;
  }
}, true);

/* 箭头按钮与边界状态 */
const tPrev = document.getElementById('tPrev');
const tNext = document.getElementById('tNext');
const step = () => Math.max(wrap.clientWidth * 0.6, 300);
tPrev.addEventListener('click', () => wrap.scrollBy({ left: -step(), behavior: 'smooth' }));
tNext.addEventListener('click', () => wrap.scrollBy({ left: step(), behavior: 'smooth' }));
function updateArrows() {
  tPrev.classList.toggle('hidden', wrap.scrollLeft <= 4);
  tNext.classList.toggle('hidden',
    wrap.scrollLeft >= wrap.scrollWidth - wrap.clientWidth - 4);
}
wrap.addEventListener('scroll', updateArrows, { passive: true });
addEventListener('resize', updateArrows);
updateArrows();

/* 激活朝代在时间轴中自动居中 */
function centerNode(i) {
  const node = nodes[i];
  if (!node) return;
  wrap.scrollTo({
    left: node.offsetLeft - wrap.clientWidth / 2 + node.clientWidth / 2,
    behavior: 'smooth',
  });
}

/* 时间轴点击 / 键盘跳转 */
function gotoDynasty(node) {
  document.getElementById(`dynasty-${node.dataset.index}`)
    .scrollIntoView({ behavior: 'smooth', block: 'start' });
}
track.addEventListener('click', e => {
  const node = e.target.closest('.t-node');
  if (node) gotoDynasty(node);
});
track.addEventListener('keydown', e => {
  const node = e.target.closest('.t-node');
  if (node && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    gotoDynasty(node);
  }
});

/* ================= 粒子背景 ================= */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, pts = [];

function resize() {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
  const n = Math.min(90, Math.floor(W * H / 22000));
  pts = Array.from({ length: n }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.6 + 0.6,
  }));
}
resize();
addEventListener('resize', resize);

let mouse = { x: -9999, y: -9999 };
addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

(function draw() {
  ctx.clearRect(0, 0, W, H);
  for (const p of pts) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(212,175,55,0.55)';
    ctx.fill();
  }
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(212,175,55,${0.14 * (1 - d / 130)})`;
        ctx.stroke();
      }
    }
    const a = pts[i];
    const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
    if (dm < 180) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = `rgba(243,217,123,${0.3 * (1 - dm / 180)})`;
      ctx.stroke();
    }
  }
  requestAnimationFrame(draw);
})();

/* ================= 打字机 ================= */
const LINES = [
  '从夏商青铜，到明清烟雨',
  '五千年风云，尽在此卷',
  '江山代有才人出，各领风骚数百年',
];
const typedEl = document.getElementById('typed');
let li = 0, ci = 0, deleting = false;
(function type() {
  const line = LINES[li];
  typedEl.textContent = line.slice(0, ci);
  if (!deleting && ci < line.length) { ci++; setTimeout(type, 110); }
  else if (!deleting) { deleting = true; setTimeout(type, 2200); }
  else if (ci > 0) { ci--; setTimeout(type, 40); }
  else { deleting = false; li = (li + 1) % LINES.length; setTimeout(type, 400); }
})();

/* ================= 数字滚动（由真实数据驱动） ================= */
document.getElementById('statDynasty').dataset.count = DYNASTIES.length;
document.getElementById('statEvent').dataset.count =
  DYNASTIES.reduce((s, d) => s + d.events.length, 0);
document.getElementById('statPeople').dataset.count =
  DYNASTIES.reduce((s, d) => s + d.people.length, 0) + FIGURES.length;

function countUp(el) {
  const target = +el.dataset.count;
  const dur = 1600, t0 = performance.now();
  (function tick(t) {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}
document.querySelectorAll('[data-count]').forEach(el => {
  setTimeout(() => countUp(el), 600);
});

/* ================= 滚动显现 & 导航 ================= */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => en.isIntersecting && en.target.classList.add('visible'));
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const navbar = document.getElementById('navbar');
addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', scrollY > 40);
});

/* ================= 时间轴激活态 ================= */
const dynasties = document.querySelectorAll('.dynasty');
const nodes = document.querySelectorAll('.t-node');
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const i = +en.target.id.split('-')[1];
      nodes.forEach(n => n.classList.remove('active'));
      nodes[i].classList.add('active');
      centerNode(i);
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
dynasties.forEach(d => spy.observe(d));

/* ================= 人物卡片 3D 倾斜 ================= */
document.querySelectorAll('.figure-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
    card.style.transform = `translateY(-8px) perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
