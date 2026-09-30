/* ================= 数据 ================= */
const DYNASTIES = [
  {
    name: '夏', years: '约前2070 – 前1600', tag: '家天下之始', motto: '九州既定，华夏初立',
    events: [
      { title: '大禹治水', year: '约前21世纪', desc: '大禹改堵为疏，历十三年平治水患，划定九州，威望遍及天下。' },
      { title: '启建夏朝', year: '约前2070年', desc: '禹之子启废禅让制，开创世袭「家天下」，中国第一个王朝诞生。' },
      { title: '少康中兴', year: '约前19世纪', desc: '少康复国重建夏祚，成为史上最早的「中兴」范本。' },
    ],
    people: [['禹', '治水圣王'], ['启', '开国君主'], ['少康', '中兴之主']],
  },
  {
    name: '商', years: '约前1600 – 前1046', tag: '青铜与甲骨', motto: '甲骨文里，文明有字可考',
    events: [
      { title: '成汤灭夏', year: '约前1600年', desc: '鸣条之战，商汤推翻夏桀暴政，建立商朝。' },
      { title: '盘庚迁殷', year: '约前1300年', desc: '迁都于殷后商朝稳定强盛，故称「殷商」，殷墟甲骨文由此而来。' },
      { title: '武王伐纣', year: '前1046年', desc: '牧野之战，商纣王自焚鹿台，六百年商祚终结。' },
    ],
    people: [['汤', '开国贤王'], ['盘庚', '迁都明君'], ['妇好', '女将统帅']],
  },
  {
    name: '周', years: '前1046 – 前256', tag: '礼乐与百家', motto: '溥天之下，莫非王土',
    events: [
      { title: '周公制礼', year: '约前1042年', desc: '周公旦制礼作乐、分封诸侯，奠定三千年宗法秩序。' },
      { title: '春秋争霸', year: '前770年起', desc: '周室东迁，齐桓晋文相继称霸，「尊王攘夷」大旗起落。' },
      { title: '战国变法', year: '前356年起', desc: '商鞅变法使秦国崛起，诸子百家争鸣，思想黄金时代到来。' },
    ],
    people: [['姬发', '周武王'], ['姜子牙', '开国元勋'], ['孔子', '万世师表'], ['老子', '道家始祖']],
  },
  {
    name: '秦', years: '前221 – 前207', tag: '天下一统', motto: '书同文，车同轨',
    events: [
      { title: '秦灭六国', year: '前221年', desc: '嬴政十年扫六合，称「始皇帝」，建立首个大一统中央集权帝国。' },
      { title: '郡县与统一度量', year: '前221年', desc: '废分封行郡县，统一文字、货币、度量衡，修筑驰道与长城。' },
      { title: '大泽乡起义', year: '前209年', desc: '陈胜吴广揭竿而起，「王侯将相宁有种乎」，强秦三年而亡。' },
    ],
    people: [['嬴政', '千古一帝'], ['李斯', '帝国丞相'], ['蒙恬', '长城名将']],
  },
  {
    name: '汉', years: '前202 – 220', tag: '汉家气象', motto: '犯强汉者，虽远必诛',
    events: [
      { title: '楚汉相争', year: '前206–前202年', desc: '刘邦项羽四年争霸，垓下之围四面楚歌，大汉立国。' },
      { title: '汉武盛世', year: '前141–前87年', desc: '北击匈奴、张骞凿空西域开辟丝绸之路，独尊儒术立国立教。' },
      { title: '光武中兴', year: '25年', desc: '刘秀重建汉室，史称东汉，「云台二十八将」名垂青史。' },
    ],
    people: [['刘邦', '布衣天子'], ['汉武帝', '雄才大略'], ['卫青', '龙城飞将'], ['司马迁', '史家绝唱']],
  },
  {
    name: '三国', years: '220 – 280', tag: '英雄逐鹿', motto: '滚滚长江东逝水',
    events: [
      { title: '官渡之战', year: '200年', desc: '曹操以少胜多破袁绍，奠定统一北方之基。' },
      { title: '赤壁之战', year: '208年', desc: '孙刘联军火攻破曹，三分天下格局就此形成。' },
      { title: '三国归晋', year: '280年', desc: '司马氏代魏灭蜀平吴，分久必合，天下重归一统。' },
    ],
    people: [['曹操', '乱世枭雄'], ['诸葛亮', '卧龙丞相'], ['周瑜', '江东周郎'], ['关羽', '武圣']],
  },
  {
    name: '晋', years: '266 – 420', tag: '门阀与风骨', motto: '魏晋风度，竹林遗响',
    events: [
      { title: '八王之乱', year: '291–306年', desc: '宗室相残十六年，西晋元气大伤，北方烽烟四起。' },
      { title: '衣冠南渡', year: '317年', desc: '司马睿建康称帝，东晋开启，中原士族大规模南迁。' },
      { title: '淝水之战', year: '383年', desc: '谢安八万北府兵破苻坚百万之众，「风声鹤唳，草木皆兵」。' },
    ],
    people: [['司马懿', '冢虎'], ['谢安', '东山再起'], ['王羲之', '书圣'], ['陶渊明', '田园诗祖']],
  },
  {
    name: '南北朝', years: '420 – 589', tag: '融合与开凿', motto: '南朝四百八十寺',
    events: [
      { title: '孝文帝改革', year: '494年', desc: '北魏迁都洛阳，推行汉化，民族大融合的高峰。' },
      { title: '石窟开凿', year: '5世纪起', desc: '云冈、龙门石窟相继开凿，佛教艺术登峰造极。' },
      { title: '侯景之乱', year: '548年', desc: '南朝由盛转衰，江南繁华付之一炬。' },
    ],
    people: [['拓跋宏', '改革皇帝'], ['刘裕', '南朝第一帝'], ['祖冲之', '圆周率大家'], ['花木兰', '传奇女杰']],
  },
  {
    name: '隋', years: '581 – 618', tag: '承前启后', motto: '大运河上，帝国血脉',
    events: [
      { title: '开皇之治', year: '581年起', desc: '杨坚统一南北，创三省六部制与科举雏形，户口滋盛。' },
      { title: '开凿大运河', year: '605年起', desc: '贯通南北五大水系，此后千年皆为帝国经济命脉。' },
      { title: '隋末烽烟', year: '611年起', desc: '三征高句丽耗尽国力，群雄并起，二世而亡。' },
    ],
    people: [['杨坚', '开国文帝'], ['杨广', '争议炀帝'], ['李春', '赵州桥匠师']],
  },
  {
    name: '唐', years: '618 – 907', tag: '万邦来朝', motto: '九天阊阖开宫殿，万国衣冠拜冕旒',
    events: [
      { title: '贞观之治', year: '627–649年', desc: '李世民虚心纳谏、轻徭薄赋，开创千古称颂的治世典范。' },
      { title: '开元盛世', year: '713–741年', desc: '李隆基励精图治，长安成为世界之都，唐诗进入黄金时代。' },
      { title: '安史之乱', year: '755年', desc: '安禄山起兵，盛唐急转直下，藩镇割据埋下唐亡伏笔。' },
    ],
    people: [['李世民', '天可汗'], ['武则天', '一代女皇'], ['李白', '诗仙'], ['杜甫', '诗圣'], ['玄奘', '西行取经']],
  },
  {
    name: '五代十国', years: '907 – 979', tag: '乱世棋局', motto: '城头变幻大王旗',
    events: [
      { title: '朱温篡唐', year: '907年', desc: '唐亡，中原先后更替五个短命王朝，南方十国并立。' },
      { title: '石敬瑭割燕云', year: '938年', desc: '幽云十六州正式割让予契丹，中原门户洞开四百年。' },
      { title: '陈桥兵变', year: '960年', desc: '赵匡胤黄袍加身建宋，乱世终见一统曙光。' },
    ],
    people: [['李煜', '词中帝王'], ['柴荣', '五代英主'], ['冯道', '政坛不倒翁']],
  },
  {
    name: '宋', years: '960 – 1279', tag: '文治巅峰', motto: '与士大夫共治天下',
    events: [
      { title: '杯酒释兵权', year: '961年', desc: '赵匡胤以柔克刚收兵权，重文抑武国策就此确立。' },
      { title: '王安石变法', year: '1069年', desc: '青苗、市易诸法图强，新旧党争影响北宋国运。' },
      { title: '靖康之变与崖山', year: '1127 / 1279年', desc: '金兵掳走徽钦二帝；南宋末年崖山海战，陆秀夫负帝投海。' },
    ],
    people: [['赵匡胤', '宋太祖'], ['苏轼', '千古文豪'], ['岳飞', '精忠报国'], ['文天祥', '丹心照汗青']],
  },
  {
    name: '元', years: '1271 – 1368', tag: '铁蹄与大都会', motto: '一代天骄，弯弓射雕',
    events: [
      { title: '忽必烈建元', year: '1271年', desc: '定国号「大元」，1279年灭南宋，疆域空前辽阔，驿站贯通欧亚。' },
      { title: '马可·波罗来华', year: '1275年', desc: '元大都繁华震惊欧洲，《马可·波罗游记》风靡西方。' },
      { title: '红巾军起义', year: '1351年', desc: '「莫道石人一只眼」，元末民变星火燎原。' },
    ],
    people: [['忽必烈', '开国皇帝'], ['郭守敬', '天文巨匠'], ['关汉卿', '元曲大家'], ['马可·波罗', '传奇旅人']],
  },
  {
    name: '明', years: '1368 – 1644', tag: '洪武日月', motto: '不和亲、不赔款、不割地',
    events: [
      { title: '洪武开国', year: '1368年', desc: '朱元璋布衣起兵驱逐蒙元，废丞相、兴大狱，皇权空前集中。' },
      { title: '郑和下西洋', year: '1405年起', desc: '七下西洋，宝船纵横万里，远达东非，航海史空前壮举。' },
      { title: '崇祯殉国', year: '1644年', desc: '李自成破北京，崇祯自缢煤山，明朝灭亡。' },
    ],
    people: [['朱元璋', '布衣皇帝'], ['郑和', '航海先驱'], ['王阳明', '心学宗师'], ['戚继光', '抗倭名将'], ['张居正', '改革首辅']],
  },
  {
    name: '清', years: '1636 – 1912', tag: '帝国余晖', motto: '古今兴亡多少事，都付笑谈中',
    events: [
      { title: '康乾盛世', year: '1681–1796年', desc: '平定三藩、收台湾、征准噶尔，帝国版图达历史极盛。' },
      { title: '鸦片战争', year: '1840年', desc: '虎门销烟引来坚船利炮，《南京条约》开启百年屈辱史。' },
      { title: '辛亥革命', year: '1911年', desc: '武昌首义，1912年溥仪退位，两千年帝制就此终结。' },
    ],
    people: [['康熙', '盛世明君'], ['林则徐', '禁烟英雄'], ['曾国藩', '中兴名臣'], ['慈禧', '铁腕太后'], ['孙中山', '革命先驱']],
  },
];

const FIGURES = [
  { name: '秦始皇', dynasty: '秦', desc: '扫六合而天下一，书同文车同轨，奠定两千年帝制格局。' },
  { name: '汉武帝', dynasty: '汉', desc: '北逐匈奴，凿空西域，罢黜百家独尊儒术，铸就汉家气魄。' },
  { name: '司马迁', dynasty: '西汉', desc: '究天人之际，通古今之变，一部《史记》成史家之绝唱。' },
  { name: '诸葛亮', dynasty: '三国', desc: '出师一表真名世，鞠躬尽瘁死而后已，智慧与忠诚的化身。' },
  { name: '王羲之', dynasty: '东晋', desc: '兰亭一序千古风流，《兰亭集序》被誉为天下第一行书。' },
  { name: '李世民', dynasty: '唐', desc: '从谏如流开创贞观之治，被各族尊奉为「天可汗」。' },
  { name: '武则天', dynasty: '唐·武周', desc: '中国历史上唯一正统女皇，无字碑任后人评说功过。' },
  { name: '李白', dynasty: '唐', desc: '笔落惊风雨，诗成泣鬼神，绣口一吐便是半个盛唐。' },
  { name: '苏轼', dynasty: '北宋', desc: '大江东去浪淘尽，诗词文书画皆绝，千古第一全才。' },
  { name: '岳飞', dynasty: '南宋', desc: '精忠报国，壮志饥餐胡虏肉，一曲《满江红》气壮山河。' },
  { name: '王阳明', dynasty: '明', desc: '龙场悟道创立心学，知行合一，立德立功立言三不朽。' },
  { name: '康熙', dynasty: '清', desc: '擒鳌拜、平三藩、收台湾，在位六十一年开创盛世。' },
];

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
