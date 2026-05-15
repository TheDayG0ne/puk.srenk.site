// ════════════════════════════════════════════
//  КОНФИГ
// ════════════════════════════════════════════
const FACTS = [
  "Средний человек производит 0.5–2.5 литра газа в день. Это официально.",
  "В космосе никто не слышит твой пук. Но ты всё равно его чувствуешь.",
  "Пауки могут пукать. Учёные подтвердили в 2019 году.",
  "Первый задокументированный анекдот в истории (2300 лет до н.э.) был про пук.",
  "Термиты — самые активные производители метана на Земле. Настоящие чемпионы.",
  "Кенгуру не пукают метаном. Биологи изучают их 40 лет, чтобы понять как.",
  "Нажми ещё раз. Тут ещё есть факты.",
  "Маnatees используют пуки для управления плавучестью. Это не шутка.",
  "Этот сайт был создан за одну ночь. И ты сейчас его читаешь. Что-то пошло не так.",
  "404 интеллекта не найдено. Но зато нашёл этот сайт. Ты молодец.",
  "Если ты дочитал до этого факта — у тебя слишком много свободного времени.",
  "Текущий IP твоего роутера: нет, я правда не знаю. Успокойся.",
];

const QUIZ = [
  {
    q: "Какой самый важный орган тела?",
    a: ["Мозг", "Сердце", "ТОТ САМЫЙ", "Прямая кишка"],
    correct: 3,
    response: "ПРАВИЛЬНО! Без него этот сайт потерял бы весь смысл."
  },
  {
    q: "Что такое puk.srenk.site?",
    a: ["Серьёзный деловой ресурс", "Банк", "Правительственный портал", "Я не знаю, но мне нравится"],
    correct: 3,
    response: "АБСОЛЮТНО ВЕРНО. Добро пожаловать в клуб."
  },
  {
    q: "Сколько пуков нужно для счастья?",
    a: ["Ноль (я взрослый)", "Один", "Не менее 47", "ВСЕ ПУК"],
    correct: 3,
    response: "Математически доказано наукой с этого сайта."
  },
  {
    q: "Чем занимается ООО «ПУКПРОМ»?",
    a: ["Нефтепереработка", "IT-разработка", "Продажа воздуха", "Всё вышеперечисленное"],
    correct: 3,
    response: "Диверсифицированный бизнес — залог успеха."
  },
];

const MEMES = [
  { id:'zhdun',    bg:'linear-gradient(135deg,#c8b89a,#7d5a3c)', art:'( ᐑ )',         name:'ЖДУН',              quote:'Жду...',                   click:'Ждал 1000 лет. Продолжаю ждать.', rot:'2deg'  },
  { id:'vjeuh',    bg:'linear-gradient(135deg,#5500aa,#aa00ff)', art:'=ฅ^ω^ฅ=🪄',    name:'ВЖУХ',              quote:'Вжух и пятница',           click:'Вжух и в продакшн без тестов!',   rot:'-3deg' },
  { id:'fox',      bg:'linear-gradient(135deg,#d44000,#ff8c00)', art:'•ᴗ•',           name:'УПОРОТАЯ ЛИСА',     quote:'когда всё хорошо',         click:'AAAAAAAAAAAAAAAAAAAA',             rot:'4deg'  },
  { id:'oi',       bg:'linear-gradient(135deg,#c40050,#ff4488)', art:'╮(╯_╰)╭',       name:'ОЙ ВСЁ',            quote:'Ой, всё.',                  click:'Разговор закончен. Уходи.',       rot:'-2deg' },
  { id:'bear',     bg:'linear-gradient(135deg,#006620,#aacc00)', art:'🐻🚲',           name:'МЕДВЕДЬ НА ВЕЛО',   quote:'ЦИРК! ЦИРК!',              click:'Медведь едет. Медведь одобряет.', rot:'3deg'  },
  { id:'norm',     bg:'linear-gradient(135deg,#003399,#0077ff)', art:'🙆',             name:'ЭТО НОРМАЛЬНО',     quote:'Это нормально?',           click:'Всё по плану. Не паникуй.',       rot:'-1deg' },
  { id:'shlepa',   bg:'linear-gradient(135deg,#7d3c00,#cc8800)', art:'( ´•ᴗ•` )',     name:'ШЛЁПА',             quote:'Шлёп!',                    click:'Шлёп шлёп шлёп шлёп шлёп',       rot:'5deg'  },
  { id:'pikachu',  bg:'linear-gradient(135deg,#ccaa00,#ff8800)', art:'⊙_⊙',           name:'ПИКАЧУ УДИВЛЁН',    quote:'Я в шоке.',                click:'КАК? ПОЧЕМУ? ЧТО ПРОИСХОДИТ?!',  rot:'-4deg' },
  { id:'ladno',    bg:'linear-gradient(135deg,#885500,#ff8c00)', art:'🐕🔥',           name:'ЛАДНО',             quote:'Это нормально',            click:'Внутри горю. Говорю «норм».',     rot:'2deg'  },
  { id:'lie',      bg:'linear-gradient(135deg,#880000,#ccaa00)', art:'🏆😈',           name:'ПОЗДРАВЛЯЮ, СОВРАЛ',quote:'Поздравляю!',              click:'Поздравляю. Ты снова попался.',   rot:'-3deg' },
  { id:'stop',     bg:'linear-gradient(135deg,#cc0000,#000088)', art:'🦀',             name:'СТОП КРАБ',         quote:'СТОП. КРАБ.',              click:'СТОП КРАБ СТОП КРАБ СТОП КРАБ',  rot:'6deg'  },
  { id:'kek',      bg:'linear-gradient(135deg,#00aa55,#00ff88)', art:'XD',             name:'КЕК',               quote:'Кек. Лул. Роф.',           click:'ЛМАО РОФЛ КЕК ХАХА ДА',          rot:'-2deg' },
  { id:'quad',     bg:'linear-gradient(135deg,#aa00ff,#00ffcc)', art:'🐾🏃',           name:'КВАДРОБИКА',        quote:'Мяу. Я человек.',          click:'КВАДРОБИКА — СПОРТ БУДУЩЕГО',     rot:'3deg'  },
  { id:'fine',     bg:'linear-gradient(135deg,#333,#555)',       art:'(✿◡‿◡)',         name:'ВСЁ ХОРОШО',        quote:'*внутри умирает*',         click:'Улыбаюсь. Машу. Горю.',           rot:'-5deg' },
  { id:'hl3',      bg:'linear-gradient(135deg,#1b2838,#4c9be8)', art:'λ',             name:'ГДЕ ХЛ3',           quote:'Скоро™',                   click:'Скоро™. Верим. Уже 20 лет.',      rot:'1deg'  },
  { id:'ok',       bg:'linear-gradient(135deg,#555,#999)',       art:'👴',             name:'ОК БУМЕР',          quote:'Ок, бумер.',               click:'Разговор с рукой. Не сегодня.',   rot:'-2deg' },
  { id:'trash',    bg:'linear-gradient(135deg,#1a0a2e,#6600aa)', art:'🗑️',            name:'Я В КОРЗИНЕ',       quote:'Отправь меня в корзину',   click:'Перемещено. Без права восстановления.', rot:'4deg'},
  { id:'brain',    bg:'linear-gradient(135deg,#004466,#0088cc)', art:'🧠✨',           name:'ТАК ВОТ ТЫ КАКОЙ', quote:'Большой мозг момент',      click:'200 IQ. Мыслю планетами.',        rot:'-3deg' },
];


const ACHIEVEMENTS_LIST = [
  { id: 'first_puk',   icon: '💨', title: 'ПЕРВЫЙ ПУК',    desc: 'Нажал на кнопку. Поздравляем.' },
  { id: 'ten_puks',    icon: '🔥', title: '10 ПУКОВ',      desc: 'Ты явно не занят.' },
  { id: 'fifty_puks',  icon: '💀', title: '50 ПУКОВ',      desc: 'Это уже болезнь.' },
  { id: 'doge_click',  icon: '🐕', title: 'ДОГE-МАСТЕР',  desc: 'Кликнул на догу 10 раз.' },
  { id: 'konami',      icon: '🎮', title: 'ГЕЙМЕР',        desc: 'Знаешь Konami-код. Уважаю.' },
  { id: 'cat_found',   icon: '🐱', title: 'КОТ НАЙДЕН',    desc: 'Ты нашёл котика!' },
  { id: 'all_facts',   icon: '📚', title: 'УЧЁНЫЙ',        desc: 'Прочитал все факты.' },
  { id: 'snake_10',    icon: '🐍', title: 'ЗМЕЕВОД',       desc: 'Набрал 10 очков в змейке.' },
  { id: 'secret',      icon: '🔮', title: 'ИСКАТЕЛЬ',      desc: 'Нашёл секретную зону.' },
];

// ════════════════════════════════════════════
//  STATE
// ════════════════════════════════════════════
let pukCount = 0;
let dogeClicks = 0;
let factIndex = 0;
let quizIndex = 0;
let earnedAchievements = new Set();
let secretClicks = 0;

// ════════════════════════════════════════════
//  LOCALSTORAGE PERSISTENCE
// ════════════════════════════════════════════
(function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem('pukprom_state') || '{}');
    if (typeof s.pukCount === 'number') pukCount = s.pukCount;
    if (typeof s.dogeClicks === 'number') dogeClicks = s.dogeClicks;
    if (typeof s.factIndex === 'number') factIndex = s.factIndex;
    if (typeof s.quizIndex === 'number') quizIndex = s.quizIndex;
    if (typeof s.secretClicks === 'number') secretClicks = s.secretClicks;
    if (Array.isArray(s.achievements)) earnedAchievements = new Set(s.achievements);
  } catch(e) {}
})();

function saveState() {
  try {
    localStorage.setItem('pukprom_state', JSON.stringify({
      pukCount, dogeClicks, factIndex, quizIndex, secretClicks,
      achievements: [...earnedAchievements],
    }));
  } catch(e) {}
}

// ════════════════════════════════════════════
//  HINTS TOGGLE
// ════════════════════════════════════════════
function toggleHints() {
  document.getElementById('hints-panel').classList.toggle('show');
}
document.addEventListener('click', e => {
  const wrap = document.getElementById('hints-wrap');
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById('hints-panel').classList.remove('show');
  }
});

// ════════════════════════════════════════════
//  LOADER
// ════════════════════════════════════════════
const loaderMessages = [
  "инициализация пуков...",
  "загрузка дога...",
  "подключение к серверу газа...",
  "калибровка мемов...",
  "проверка наличия котиков...",
  "шифрование пуков...",
  "финальный пук...",
  "готово. наверное.",
];

(function runLoader() {
  const bar = document.getElementById('loader-bar');
  const status = document.getElementById('loader-status');
  let pct = 0;
  let msgIdx = 0;

  const iv = setInterval(() => {
    const inc = Math.random() * 18 + 2;
    pct = Math.min(pct + inc, 100);
    bar.style.width = pct + '%';
    status.textContent = loaderMessages[msgIdx % loaderMessages.length];
    if (pct > (msgIdx + 1) * 12) msgIdx++;

    if (pct >= 100) {
      clearInterval(iv);
      status.textContent = '✓ ПУК-СИСТЕМА ГОТОВА';
      setTimeout(() => {
        document.getElementById('loader').style.transition = 'opacity 0.8s';
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
          document.getElementById('loader').style.display = 'none';
          onPageReady();
        }, 800);
      }, 600);
    }
  }, 150);
})();

// ════════════════════════════════════════════
//  PAGE READY
// ════════════════════════════════════════════
function onPageReady() {
  // Copyright year
  const yr = new Date().getFullYear();
  document.querySelectorAll('#copyright-year, .footer-year').forEach(el => el.textContent = yr);

  // Restore state in UI
  document.getElementById('puk-count').textContent = pukCount;
  document.getElementById('fact-text').textContent = FACTS[factIndex];

  initCanvas();
  initCursor();
  initVisualizer();
  initMemeWall();
  initQuiz();
  initScrollProgress();
  initKonami();
  initSecretZone();
  buildConsoleArt();
  showToast("💨 Добро пожаловать в пук-систему v2.0");
  setTimeout(() => showToast("👀 Подсказка: посмотри в консоль"), 3000);
  setTimeout(() => {
    document.getElementById('cat-img').classList.add('show');
    showToast("🐱 Котик появился! Кликни на него!");
  }, 8000);
  document.getElementById('cat-img').addEventListener('click', () => {
    giveAchievement('cat_found');
    // Сначала громкий пердёж, потом мяукание
    FartEngine.playLoud();
    setTimeout(() => FartEngine.meow(), 900);
    showModal('🐱 КОТИК ПОЙМАН', 'Ты нашёл котика! Его зовут Пукс. Он живёт здесь уже 3 года и всё ещё не понимает, что происходит.');
    document.getElementById('cat-img').classList.remove('show');
  });
}

// ════════════════════════════════════════════
//  CANVAS BACKGROUND (Matrix rain)
// ════════════════════════════════════════════
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / 20);
    drops = Array(cols).fill(1);
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = "💨ПУКpuk01アイウエオABCDEF<>{}[];";

  setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00ff4422';
    ctx.font = '14px monospace';
    drops.forEach((y, i) => {
      const c = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(c, i * 20, y * 20);
      if (y * 20 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 50);
}

// ════════════════════════════════════════════
//  CUSTOM CURSOR
// ════════════════════════════════════════════
function initCursor() {
  const cur = document.getElementById('cursor');
  const cursors = ['💨', '🐾', '✨', '💫', '🌀'];
  let cursorIdx = 0;
  let trailColors = ['#ff0080','#ff8800','#ffff00','#00ff88','#0088ff','#8800ff'];
  let tc = 0;

  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';

    // Trail dot
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    dot.style.background = trailColors[tc++ % trailColors.length];
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  });

  document.addEventListener('mousedown', () => cur.classList.add('clicking'));
  document.addEventListener('mouseup', () => cur.classList.remove('clicking'));

  // Cursor rotation via scroll
  window.addEventListener('scroll', () => {
    cursorIdx = (cursorIdx + 1) % cursors.length;
    cur.textContent = cursors[cursorIdx];
  });
}

// ════════════════════════════════════════════
//  SCROLL PROGRESS
// ════════════════════════════════════════════
function initScrollProgress() {
  window.addEventListener('scroll', () => {
    const h = document.body.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    document.getElementById('scroll-progress').style.width = pct + '%';
  });
}

// ════════════════════════════════════════════
//  VISUALIZER (fake)
// ════════════════════════════════════════════
function initVisualizer() {
  const viz = document.getElementById('visualizer');
  for (let i = 0; i < 24; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const h = Math.floor(Math.random() * 40) + 8;
    const speed = (Math.random() * 0.4 + 0.2).toFixed(2) + 's';
    bar.style.setProperty('--h', h + 'px');
    bar.style.setProperty('--speed', speed);
    bar.style.background = `hsl(${i * 15}, 100%, 55%)`;
    viz.appendChild(bar);
  }
}

// ════════════════════════════════════════════
//  MEME WALL
// ════════════════════════════════════════════
function initMemeWall() {
  const wall = document.getElementById('meme-wall');
  MEMES.forEach(m => {
    const card = document.createElement('div');
    card.className = 'meme-card';
    card.style.background = m.bg;
    card.style.setProperty('--rot', m.rot || '0deg');
    card.innerHTML = `
      <div class="meme-art">${m.art}</div>
      <div class="meme-name">${m.name}</div>
      <div class="meme-quote">${m.quote}</div>
    `;
    card.addEventListener('click', () => {
      spawnFloaty(['😂','💀','🔥','✨'][Math.floor(Math.random()*4)],
        card.getBoundingClientRect().left + 60, card.getBoundingClientRect().top);
      showToast(m.click);
      FartEngine.play();
    });
    wall.appendChild(card);
  });
}


// ════════════════════════════════════════════
//  QUIZ
// ════════════════════════════════════════════
function initQuiz() { loadQuiz(quizIndex); }

function loadQuiz(idx) {
  const q = QUIZ[idx % QUIZ.length];
  document.getElementById('quiz-question').textContent = q.q;
  const ans = document.getElementById('quiz-answers');
  ans.innerHTML = '';
  q.a.forEach((a, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-btn';
    btn.textContent = a;
    btn.addEventListener('click', () => {
      if (i === q.correct) {
        showModal('✅ ПРАВИЛЬНО!', q.response + '<br><br>Следующий вопрос загружается...');
        quizIndex++;
        setTimeout(() => { closeModal(); loadQuiz(quizIndex); }, 2000);
      } else {
        btn.style.background = 'rgba(255,0,0,0.3)';
        btn.style.borderColor = '#f00';
        showToast('❌ Неправильно. Думай лучше.');
        btn.disabled = true;
        setTimeout(() => {
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
        }, 1500);
      }
    });
    ans.appendChild(btn);
  });
}

// ════════════════════════════════════════════
//  FART SOUND ENGINE (Web Audio API)
// ════════════════════════════════════════════
const FartEngine = (() => {
  let _ctx = null;
  let _bus = null; // мастер-компрессор (лимитер)

  function getCtx() {
    if (!_ctx) {
      try { _ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch(e) { return null; }
    }
    if (_ctx && _ctx.state === 'suspended') _ctx.resume().catch(()=>{});
    return _ctx;
  }

  // Мастер-шина: DynamicsCompressor как хард-лимитер + boost
  function getBus() {
    const ac = getCtx();
    if (!ac) return null;
    if (!_bus) {
      const boost = ac.createGain();
      boost.gain.value = 2.5; // предусиление
      const comp = ac.createDynamicsCompressor();
      comp.threshold.value = -4;
      comp.knee.value = 2;
      comp.ratio.value = 20;      // хард-лимитер
      comp.attack.value  = 0.001;
      comp.release.value = 0.08;
      boost.connect(comp);
      comp.connect(ac.destination);
      _bus = boost; // пишем на буст — компрессор всё равно не даст клиппинга
    }
    return _bus;
  }

  // Розовый шум (Voss-McCartney)
  function makeNoise(ac, duration) {
    const buf = ac.createBuffer(1, Math.ceil(ac.sampleRate * duration), ac.sampleRate);
    const data = buf.getChannelData(0);
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0;
    for (let i = 0; i < data.length; i++) {
      const wh = Math.random() * 2 - 1;
      b0=0.99886*b0+wh*0.0555179; b1=0.99332*b1+wh*0.0750759;
      b2=0.96900*b2+wh*0.1538520; b3=0.86650*b3+wh*0.3104856;
      b4=0.55000*b4+wh*0.5329522; b5=-0.7616*b5+wh*0.0168980;
      data[i] = (b0+b1+b2+b3+b4+b5+wh*0.5362)*0.11;
    }
    const src = ac.createBufferSource();
    src.buffer = buf;
    return src;
  }

  // Ядро синтеза пука: шум → резонантный BP → АМ-тремоло → лимитер
  function _fart(ac, dest, now, dur, f0, f1, wetness, vol) {
    const master = ac.createGain();
    master.gain.setValueAtTime(0, now);
    master.gain.linearRampToValueAtTime(vol, now + 0.007); // мгновенная атака
    master.gain.setValueAtTime(vol, now + dur * 0.45);
    master.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    master.connect(dest);

    // Основной слой — резонантный BP (тональность пука)
    const ns = makeNoise(ac, dur + 0.2);
    const bp1 = ac.createBiquadFilter();
    bp1.type = 'bandpass';
    bp1.frequency.setValueAtTime(f0, now);
    bp1.frequency.exponentialRampToValueAtTime(f1, now + dur);
    bp1.Q.value = 2 + wetness * 11; // резонанс зависит от «влажности»

    // Гармоник (2-й обертон)
    const ns2 = makeNoise(ac, dur + 0.2);
    const bp2 = ac.createBiquadFilter();
    bp2.type = 'bandpass';
    bp2.frequency.setValueAtTime(f0 * 2.3, now);
    bp2.frequency.exponentialRampToValueAtTime(f1 * 1.8, now + dur);
    bp2.Q.value = 2.2;
    const g2 = ac.createGain(); g2.gain.value = 0.3;

    // 3-й обертон (хрипота)
    const ns3b = makeNoise(ac, dur + 0.1);
    const bp3 = ac.createBiquadFilter();
    bp3.type = 'bandpass';
    bp3.frequency.setValueAtTime(f0 * 3.7, now);
    bp3.frequency.exponentialRampToValueAtTime(f1 * 3.0, now + dur);
    bp3.Q.value = 1.5;
    const g3b = ac.createGain(); g3b.gain.value = wetness * 0.2;

    // Суббас (тело — ощущение в животе)
    const ns3 = makeNoise(ac, dur + 0.2);
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 130; lp.Q.value = 1.2;
    const g3 = ac.createGain(); g3.gain.value = 0.55;

    // АМ-тремоло — прерывистость «бррр»
    const amOsc = ac.createOscillator();
    amOsc.type = 'sine';
    amOsc.frequency.setValueAtTime(7 + wetness * 32 + Math.random() * 18, now);
    amOsc.frequency.linearRampToValueAtTime(3 + Math.random() * 6, now + dur);
    const amG = ac.createGain();
    amG.gain.setValueAtTime(0, now);
    amG.gain.linearRampToValueAtTime(wetness * 0.4, now + 0.03);
    amOsc.connect(amG); amG.connect(master.gain);

    ns.connect(bp1);   bp1.connect(master);
    ns2.connect(bp2);  bp2.connect(g2);  g2.connect(master);
    ns3b.connect(bp3); bp3.connect(g3b); g3b.connect(master);
    ns3.connect(lp);   lp.connect(g3);  g3.connect(master);

    const end = now + dur + 0.3;
    [ns, ns2, ns3b, ns3].forEach(s => { s.start(now); s.stop(end); });
    amOsc.start(now); amOsc.stop(end);
  }

  // 10 пресетов [f0, f1, dur, wetness, vol] — vol теперь передаётся через лимитер
  const PRESETS = [
    [165, 68,  0.22, 0.40, 1.8],  // короткий сухой
    [115, 46,  0.85, 0.85, 1.7],  // долгий влажный
    [ 88, 36,  1.40, 0.95, 1.9],  // мощный затяжной
    [205, 92,  0.14, 0.28, 1.8],  // резкий хлопок
    [145, 58,  0.50, 0.70, 1.7],  // средний влажный
    [ 72, 28,  1.20, 0.92, 2.0],  // басовитый глубокий
    [182, 72,  0.38, 0.52, 1.6],  // интеллигентный
    [ 98, 42,  0.72, 0.80, 1.8],  // сочный
    [130, 50,  1.0,  0.88, 1.9],  // тягучий протяжный
    [250,100,  0.10, 0.20, 1.7],  // пистолетный щелчок
  ];

  function play() {
    const ac = getCtx(), dest = getBus();
    if (!ac || !dest) return;
    const [f0,f1,dur,wet,vol] = PRESETS[Math.floor(Math.random()*PRESETS.length)];
    _fart(ac, dest, ac.currentTime, dur, f0, f1, wet, vol);
  }

  function playLoud() {
    const ac = getCtx(), dest = getBus();
    if (!ac || !dest) return;
    const now = ac.currentTime;
    // Три слоя — мощный залп
    _fart(ac, dest, now,       1.6, 95,  35, 0.97, 3.5);
    _fart(ac, dest, now+0.04,  1.1, 78,  28, 0.93, 2.8);
    _fart(ac, dest, now+0.08,  0.8, 125, 48, 0.88, 2.2);
  }

  // Реалистичное мяукание — формантный синтез
  function meow() {
    const ac = getCtx(), dest = getBus();
    if (!ac || !dest) return;
    const now = ac.currentTime;
    const dur = 0.55 + Math.random() * 0.3;

    const master = ac.createGain();
    master.gain.setValueAtTime(0, now);
    master.gain.linearRampToValueAtTime(0.9, now + 0.025);
    master.gain.setValueAtTime(0.9, now + dur * 0.25);
    master.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    master.connect(dest);

    const carrier = ac.createOscillator();
    carrier.type = 'sawtooth';
    carrier.frequency.setValueAtTime(550, now);
    carrier.frequency.linearRampToValueAtTime(920, now + dur * 0.12);
    carrier.frequency.exponentialRampToValueAtTime(380, now + dur * 0.65);
    carrier.frequency.exponentialRampToValueAtTime(440, now + dur);

    const vib = ac.createOscillator();
    vib.frequency.value = 5.5 + Math.random();
    const vibG = ac.createGain();
    vibG.gain.setValueAtTime(0, now);
    vibG.gain.linearRampToValueAtTime(22, now + 0.08);
    vib.connect(vibG); vibG.connect(carrier.frequency);

    const f1f = ac.createBiquadFilter();
    f1f.type = 'bandpass'; f1f.Q.value = 5;
    f1f.frequency.setValueAtTime(730, now);
    f1f.frequency.exponentialRampToValueAtTime(380, now + dur);

    const f2f = ac.createBiquadFilter();
    f2f.type = 'bandpass'; f2f.Q.value = 6;
    f2f.frequency.setValueAtTime(1090, now);
    f2f.frequency.exponentialRampToValueAtTime(780, now + dur);

    const gf1 = ac.createGain(); gf1.gain.value = 1.0;
    const gf2 = ac.createGain(); gf2.gain.value = 0.6;
    carrier.connect(f1f); f1f.connect(gf1); gf1.connect(master);
    carrier.connect(f2f); f2f.connect(gf2); gf2.connect(master);

    const brNs = makeNoise(ac, dur + 0.1);
    const brHpf = ac.createBiquadFilter();
    brHpf.type = 'highpass'; brHpf.frequency.value = 2500;
    const brG = ac.createGain(); brG.gain.value = 0.04;
    brNs.connect(brHpf); brHpf.connect(brG); brG.connect(master);

    const end = now + dur + 0.1;
    carrier.start(now); carrier.stop(end);
    vib.start(now);     vib.stop(end);
    brNs.start(now);    brNs.stop(end);
  }

  // Реалистичный лай
  function bark() {
    const ac = getCtx(), dest = getBus();
    if (!ac || !dest) return;
    const now = ac.currentTime;
    const n = 1 + (Math.random() > 0.4 ? 1 : 0);
    for (let b = 0; b < n; b++) {
      const t = now + b * 0.20;
      const dur = 0.11 + Math.random() * 0.08;
      const master = ac.createGain();
      master.gain.setValueAtTime(0, t);
      master.gain.linearRampToValueAtTime(1.4 - b * 0.3, t + 0.006);
      master.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      master.connect(dest);

      const freq = 340 + Math.random() * 130;
      const osc = ac.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t + dur);
      const gO = ac.createGain(); gO.gain.value = 0.55;
      osc.connect(gO); gO.connect(master);

      const ns = makeNoise(ac, dur + 0.05);
      const bp = ac.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = freq * 2.5; bp.Q.value = 1.4;
      const gN = ac.createGain(); gN.gain.value = 0.7;
      ns.connect(bp); bp.connect(gN); gN.connect(master);

      osc.start(t); osc.stop(t + dur + 0.06);
      ns.start(t);  ns.stop(t + dur + 0.06);
    }
  }

  // Win95 UI звуки
  function win95(type) {
    const ac = getCtx(); if (!ac) return;
    const now = ac.currentTime;
    const dest = ac.destination; // Win95 звуки тихие — без буста
    const seqs = {
      click: [[800,0.04]],
      open:  [[523,0.07],[659,0.07],[784,0.1]],
      close: [[784,0.07],[659,0.07],[523,0.1]],
      error: [[440,0.12],[440,0.12]],
      ding:  [[880,0.15]],
    };
    const seq = seqs[type] || seqs.click;
    seq.forEach(([f,d],i) => {
      const off = seq.slice(0,i).reduce((a,[,dd])=>a+dd,0);
      const o = ac.createOscillator(), g = ac.createGain();
      g.gain.setValueAtTime(0.18, now+off);
      g.gain.exponentialRampToValueAtTime(0.0001, now+off+d);
      o.frequency.value = f;
      o.connect(g); g.connect(dest);
      o.start(now+off); o.stop(now+off+d+0.01);
    });
  }

  return { play, playLoud, meow, bark, win95 };
})();

// ════════════════════════════════════════════
//  PUK BUTTON
// ════════════════════════════════════════════
function doPuk(e) {
  FartEngine.play();
  pukCount++;
  document.getElementById('puk-count').textContent = pukCount;
  document.getElementById('puk-btn').style.animation = 'none';
  void document.getElementById('puk-btn').offsetWidth;
  document.getElementById('puk-btn').style.animation = 'pukExplosion 0.4s ease, breathe 2s ease-in-out 0.4s infinite';

  spawnFloaty('💨', e.clientX, e.clientY);
  spawnFloaty(['🌬️','💫','✨','🌀','💥'][Math.floor(Math.random()*5)], e.clientX + (Math.random()-0.5)*60, e.clientY + (Math.random()-0.5)*40);

  // Screen shake
  document.body.style.animation = 'shake 0.3s ease';
  setTimeout(() => document.body.style.animation = '', 300);

  // Puk sounds (emoji messages)
  const sounds = ['💨 ПФФФ', '💨 БРРРП', '💨 ПУУК', '💨 ТРРРР', '💨 ФФФ', '💨 ПИИИ'];
  if (pukCount % 5 === 0) showToast(sounds[Math.floor(Math.random()*sounds.length)]);

  // Achievements
  if (pukCount === 1)  giveAchievement('first_puk');
  if (pukCount === 10) giveAchievement('ten_puks');
  if (pukCount === 50) giveAchievement('fifty_puks');

  saveState();

  // Special events
  if (pukCount === 100) {
    setTimeout(() => {
      document.getElementById('diploma-modal').style.display = 'flex';
      document.getElementById('diploma-name-input').focus();
    }, 400);
  }
  if (pukCount === 200) showModal('💀 200 ПУКОВ', 'Ты... ты серьёзно? 200?<br><br>Пожалуйста. Остановись.<br><br>Нет, не надо. Продолжай.');
  if (pukCount === 42)  showToast('42 — ответ на всё 🌌');
  if (pukCount === 69)  showToast('Nice. 😏');
  if (pukCount === 1000) showModal('☠️ 1000 ПУКОВ', 'Это не сайт. Это твоя жизнь теперь.');
}

// ════════════════════════════════════════════
//  DOGE
// ════════════════════════════════════════════
function dogeClick() {
  dogeClicks++;
  FartEngine.bark();
  const words = ['wow', 'much click', 'very doge', 'so amaze', 'pls stop', 'ow', 'many click', '💛', 'such sound', 'wow bark'];
  showToast(words[dogeClicks % words.length]);
  if (dogeClicks === 10) giveAchievement('doge_click');
  saveState();
  if (dogeClicks === 20) {
    showModal('🐕 СТОП', 'Дог просит тебя остановиться.<br>Но ты не остановишься.<br>Мы оба это знаем.');
  }
  if (dogeClicks === 50) {
    document.getElementById('doge-img').style.animation = 'spin 0.2s linear infinite';
    showToast('🌀 ДОГ ДОСТИГ ПРЕДЕЛА');
  }
}

// ════════════════════════════════════════════
//  FACTS
// ════════════════════════════════════════════
function nextFact() {
  factIndex = (factIndex + 1) % FACTS.length;
  document.getElementById('fact-text').textContent = FACTS[factIndex];
  spawnFloaty('💡', window.innerWidth/2, window.innerHeight/2);
  if (factIndex === FACTS.length - 1) giveAchievement('all_facts');
  saveState();
}

// ════════════════════════════════════════════
//  KONAMI CODE
// ════════════════════════════════════════════
function initKonami() {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    if (e.key === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        activateKonami();
      }
    } else {
      pos = e.key === code[0] ? 1 : 0;
    }
  });
}

function activateKonami() {
  giveAchievement('konami');
  const ov = document.getElementById('konami-overlay');
  ov.classList.add('show');
  // Показать иконку Win95
  const ico = document.getElementById('win95-icon');
  if (ico) ico.classList.add('show');
  // Spawn lots of emoji
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      spawnFloaty(['💨','🎮','⭐','💥','🌈'][Math.floor(Math.random()*5)],
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight);
    }, i * 80);
  }
  showToast('💾 Секретная страница разблокирована! Иконка в углу экрана →');
  setTimeout(() => ov.classList.remove('show'), 3000);
}

// ════════════════════════════════════════════
//  SECRET ZONE
// ════════════════════════════════════════════
function initSecretZone() {
  const zone = document.getElementById('secret-zone');
  zone.addEventListener('click', () => {
    secretClicks++;
    saveState();
    if (secretClicks === 1) {
      giveAchievement('secret');
      showModal('🔮 СЕКРЕТ НАЙДЕН', 'Ты нашёл скрытую зону!<br><br>Вот твоя награда:<br><br>💎 ничего<br><br>Но ты молодец.');
    } else if (secretClicks === 5) {
      showModal('🔮 СНОВА ТЫ', 'Опять нажимаешь в угол?<br>Там больше нет секретов.<br><br>...Или есть?');
    } else if (secretClicks === 13) {
      showModal('🌑 ТЫ ЕЩЁ ТУТ?', 'Тринадцатое нажатие.<br>Это плохая примета.<br><br>Ничего не произошло.<br><br>Пока.');
    }
  });
}

// ════════════════════════════════════════════
//  8-BIT RICKROLL — ноты из настоящего MIDI-файла (130 BPM, Ab major)
// ════════════════════════════════════════════
let _rrCtx = null, _rrNodes = [], _rrPlaying = false, _rrTimer = null;

function playRickroll8bit() {
  if (_rrPlaying) return;
  _rrPlaying = true;
  _rrCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Ноты извлечены напрямую из MIDI: [start_ms, freq_hz, dur_ms]
  const mel = [[5538,554.37,692],[6231,622.25,692],[6923,415.3,462],[7385,622.25,692],[8077,698.46,692],[8769,830.61,115],[8885,739.99,115],[9000,698.46,115],[9115,554.37,808],[9231,349.23,577],[9923,622.25,692],[10615,415.3,1615],[11769,349.23,1038],[12462,830.61,115],[12577,739.99,115],[12692,698.46,115],[12808,554.37,115],[12923,349.23,462],[13615,622.25,692],[14308,415.3,115],[14423,369.99,115],[14538,349.23,115],[14769,622.25,692],[15462,698.46,692],[16154,830.61,115],[16269,739.99,115],[16385,698.46,115],[16500,554.37,808],[16615,349.23,462],[17308,622.25,692],[18000,415.3,1962],[18692,349.23,115],[18923,349.23,1269],[19615,1108.73,115],[19731,1108.73,115],[19846,1108.73,115],[19962,1108.73,115],[20192,1108.73,115],[20308,349.23,1615],[24000,349.23,1615],[25846,415.3,346],[26308,415.3,115],[27692,349.23,1615],[31385,830.61,1846],[33462,698.46,231],[33923,622.25,231],[34385,554.37,231],[35077,466.16,1615],[36462,349.23,231],[36923,415.3,1731],[37615,349.23,231],[38769,466.16,1731],[40615,466.16,231],[40961,466.16,115],[41077,349.23,231],[41308,523.25,1038],[41769,830.61,115],[41885,830.61,115],[42461,1108.73,692],[42923,554.37,231],[43154,1244.51,692],[43846,830.61,462],[44308,1244.51,692],[44769,523.25,231],[45000,1396.91,692],[45692,1661.22,115],[45808,1479.98,115],[45923,1396.91,115],[46038,1108.73,808],[46154,349.23,577],[46846,1244.51,692],[47538,830.61,1615],[48000,523.25,346],[48461,554.37,1038],[48692,349.23,808],[49154,830.61,115],[49269,830.61,115],[49385,1661.22,115],[49500,1479.98,115],[49615,1396.91,115],[49731,1108.73,808],[49846,554.37,346],[50308,554.37,231],[50538,1244.51,692],[51231,830.61,462],[51692,1244.51,692],[52154,622.25,231],[52385,1396.91,692],[52731,523.25,115],[52846,466.16,231],[53077,1661.22,115],[53192,1479.98,115],[53308,1396.91,115],[53423,1108.73,808],[53538,349.23,577],[54231,1244.51,692],[54923,830.61,1962],[55385,523.25,346],[55846,415.3,923],[56538,1108.73,115],[56654,1108.73,115],[56769,1108.73,115],[56885,1108.73,115],[57115,1108.73,115],[57231,349.23,1615],[60923,349.23,1615],[62769,415.3,346],[63231,415.3,115],[63923,349.23,231],[64615,349.23,1615],[68308,830.61,1846],[70385,698.46,231],[70846,622.25,231],[71308,554.37,231],[72000,466.16,1615],[73385,349.23,231],[73846,415.3,1731],[74538,349.23,231],[75692,466.16,1731],[77538,466.16,231],[77885,466.16,115],[78000,349.23,231],[78231,523.25,1038],[78692,830.61,115],[78808,830.61,115],[79385,1108.73,692],[79846,554.37,231],[80077,1244.51,692],[80769,830.61,462],[81231,1244.51,692],[81692,523.25,231],[81923,1396.91,692],[82615,1661.22,115],[82731,1479.98,115],[82846,1396.91,115],[82961,1108.73,808],[83077,349.23,577],[83769,1244.51,692],[84461,830.61,1615],[84923,523.25,346],[85385,554.37,1038],[85615,349.23,808],[86077,830.61,115],[86192,830.61,115],[86308,1661.22,115],[86423,1479.98,115],[86538,1396.91,115],[86654,1108.73,808],[86769,554.37,346],[87231,554.37,231],[87461,1244.51,692],[88154,830.61,462],[88615,1244.51,692],[89077,622.25,231],[89308,1396.91,692],[89654,523.25,115],[89769,466.16,231],[90000,1661.22,115],[90115,1479.98,115],[90231,1396.91,115],[90346,1108.73,808],[90461,349.23,577],[91154,1244.51,692],[91846,830.61,1962],[92308,523.25,346],[92769,415.3,923],[93461,1108.73,115],[93577,1108.73,115],[93692,1108.73,115],[93808,1108.73,115],[94038,1108.73,115],[94154,1108.73,692],[94615,554.37,231],[94846,1244.51,692],[95538,830.61,462],[96000,1244.51,692],[96461,523.25,231],[96692,1396.91,692],[97385,1661.22,115],[97500,1479.98,115],[97615,1396.91,115],[97731,1108.73,808],[97846,349.23,577],[98538,1244.51,692],[99231,830.61,1615],[99692,523.25,346],[100154,554.37,1038],[100385,349.23,808],[100846,830.61,115],[100961,830.61,115],[101077,1661.22,115],[101192,1479.98,115],[101308,1396.91,115],[101423,1108.73,808],[101538,554.37,346],[102000,554.37,231],[102231,1244.51,692],[102923,830.61,462],[103385,1244.51,692],[103846,622.25,231],[104077,1396.91,692],[104423,523.25,115],[104538,466.16,231],[104769,1661.22,115],[104885,1479.98,115],[105000,1396.91,115],[105115,1108.73,808],[105231,349.23,577],[105923,1244.51,692],[106615,830.61,1962],[107077,523.25,346],[107538,415.3,923],[108231,1108.73,115],[108346,1108.73,115],[108461,1108.73,115],[108577,1108.73,115],[108808,1108.73,115],[108923,415.3,1500],[109269,349.23,115],[109615,349.23,115],[109846,349.23,231],[110192,349.23,115],[110423,369.99,115],[110538,349.23,115],[110769,554.37,346],[111000,349.23,115],[111115,554.37,346],[111231,349.23,231],[111461,523.25,346],[112615,415.3,1500],[112961,349.23,115],[113308,349.23,115],[113538,349.23,231],[113885,349.23,115],[114115,369.99,115],[114231,349.23,115],[114461,554.37,346],[114692,349.23,115],[114808,554.37,346],[114923,349.23,231],[115154,523.25,346],[116308,415.3,1500],[116654,349.23,115],[117000,349.23,115],[117231,349.23,231],[117577,349.23,115],[117692,349.23,231],[117808,369.99,115],[117923,349.23,115],[118154,554.37,346],[118384,349.23,115],[118500,554.37,346],[118615,349.23,231],[118846,523.25,346],[120000,415.3,1500],[120346,349.23,115],[120692,349.23,115],[120923,349.23,231],[121269,349.23,115],[121384,349.23,231],[121500,369.99,115],[121615,349.23,115],[121846,554.37,346],[122077,349.23,115],[122192,554.37,346],[122308,349.23,231],[122538,523.25,346],[129231,349.23,577],[129461,415.3,115],[129692,415.3,231],[130384,349.23,231],[137077,349.23,115],[137308,349.23,462],[138461,932.33,1846],[139846,349.23,231],[140308,1244.51,923],[141000,349.23,231],[141231,1396.91,923],[142154,932.33,1846],[144000,466.16,115],[144346,466.16,115],[144461,349.23,231],[144692,523.25,1038],[145154,830.61,115],[145269,830.61,115],[145846,1108.73,692],[146308,554.37,231],[146538,1244.51,692],[147231,830.61,462],[147692,1244.51,692],[148154,523.25,231],[148384,1396.91,692],[149077,1661.22,115],[149192,1479.98,115],[149308,1396.91,115],[149423,1108.73,808],[149538,349.23,577],[150231,1244.51,692],[150923,830.61,1615],[151384,523.25,346],[151846,554.37,1038],[152077,349.23,808],[152538,830.61,115],[152654,830.61,115],[152769,1661.22,115],[152884,1479.98,115],[153000,1396.91,115],[153115,1108.73,808],[153231,554.37,346],[153692,554.37,231],[153923,1244.51,692],[154615,830.61,462],[155077,1244.51,692],[155538,622.25,231],[155769,1396.91,692],[156115,523.25,115],[156231,466.16,231],[156461,1661.22,115],[156577,1479.98,115],[156692,1396.91,115],[156808,1108.73,808],[156923,349.23,577],[157615,1244.51,692],[158308,830.61,1962],[158769,523.25,346],[159231,415.3,923],[159923,1108.73,115],[160038,1108.73,115],[160154,1108.73,115],[160269,1108.73,115],[160500,1108.73,115],[160615,1108.73,692],[161077,554.37,231],[161308,1244.51,692],[162000,830.61,462],[162461,1244.51,692],[162923,523.25,231],[163154,1396.91,692],[163846,1661.22,115],[163961,1479.98,115],[164077,1396.91,115],[164192,1108.73,808],[164308,349.23,577],[165000,1244.51,692],[165692,830.61,1615],[166154,523.25,346],[166615,554.37,1038],[166846,349.23,808],[167308,830.61,115],[167423,830.61,115],[167538,1661.22,115],[167654,1479.98,115],[167769,1396.91,115],[167884,1108.73,808],[168000,554.37,346],[168461,554.37,231],[168692,1244.51,692],[169384,830.61,462],[169846,1244.51,692],[170308,622.25,231],[170538,1396.91,692],[170884,523.25,115],[171000,466.16,231],[171231,1661.22,115],[171346,1479.98,115],[171461,1396.91,115],[171577,1108.73,808],[171692,349.23,577],[172384,1244.51,692],[173077,830.61,1962],[173538,523.25,346],[174000,415.3,923],[174692,1108.73,115],[174808,1108.73,115],[174923,1108.73,115],[175038,1108.73,115],[175269,1108.73,115],[175384,1108.73,692],[175846,554.37,231],[176077,1244.51,692],[176769,830.61,462],[177231,1244.51,692],[177692,523.25,231],[177923,1396.91,692],[178615,1661.22,115],[178731,1479.98,115],[178846,1396.91,115],[178961,1108.73,808],[179077,349.23,577],[179769,1244.51,692],[180461,830.61,1615],[180923,523.25,346],[181384,554.37,1038],[181615,349.23,808],[182077,830.61,115],[182192,830.61,115],[182308,1661.22,115],[182423,1479.98,115],[182538,1396.91,115],[182654,1108.73,808],[182769,554.37,346],[183231,554.37,231],[183461,1244.51,692],[184154,830.61,462],[184615,1244.51,692],[185077,622.25,231],[185308,1396.91,692],[185654,523.25,115],[185769,466.16,231],[186000,1661.22,115],[186115,1479.98,115],[186231,1396.91,115],[186346,1108.73,808],[186461,349.23,577],[187154,1244.51,692],[187846,830.61,1962],[188308,523.25,346],[188769,554.37,923],[189692,415.3,115],[189808,466.16,115],[189923,554.37,115],[190038,466.16,115],[190154,1396.91,346],[190500,1396.91,231],[190846,1244.51,692],[191538,1661.22,462],[192000,1661.22,1731]];
  const bas = [[4385,146.83,115],[4500,146.83,231],[5538,233.08,577],[5769,116.54,923],[6231,207.65,1038],[6692,116.54,462],[7154,116.54,462],[7385,207.65,577],[7615,116.54,462],[8077,116.54,462],[8538,116.54,462],[9000,116.54,462],[9231,233.08,577],[9462,116.54,923],[9923,207.65,1038],[10385,116.54,462],[10846,116.54,462],[11077,207.65,577],[11308,116.54,462],[11769,116.54,462],[12231,116.54,462],[12462,233.08,115],[12692,116.54,462],[12923,233.08,462],[13154,116.54,923],[13615,207.65,1038],[14077,116.54,462],[14538,116.54,462],[14769,207.65,462],[15000,116.54,462],[15462,116.54,462],[15923,116.54,462],[16385,116.54,462],[16615,233.08,462],[16846,116.54,923],[17308,207.65,1038],[17769,116.54,462],[18231,116.54,462],[18692,116.54,462],[18923,233.08,1269],[19154,116.54,462],[19615,116.54,462],[20077,116.54,462],[20308,185.0,1615],[20538,116.54,923],[21000,233.08,231],[21462,116.54,462],[21923,116.54,462],[22385,116.54,462],[22615,233.08,231],[22846,116.54,462],[23192,233.08,115],[23308,116.54,462],[23769,116.54,462],[24000,185.0,1615],[24231,116.54,923],[24462,233.08,231],[25154,116.54,462],[25615,116.54,462],[25846,233.08,577],[26077,116.54,462],[26538,116.54,462],[27000,116.54,462],[27462,116.54,462],[27692,185.0,1615],[27923,116.54,923],[28154,233.08,231],[28846,116.54,462],[29308,116.54,462],[29769,116.54,462],[30000,233.08,231],[30231,116.54,462],[30577,233.08,115],[30692,116.54,462],[31154,116.54,462],[31385,185.0,1731],[31615,116.54,923],[31846,233.08,231],[32538,116.54,462],[32769,207.65,231],[33000,116.54,462],[33231,185.0,577],[33462,116.54,462],[33923,116.54,462],[34385,116.54,462],[34846,116.54,462],[35308,116.54,923],[36231,116.54,462],[36692,116.54,462],[37154,116.54,462],[37615,116.54,462],[38077,116.54,462],[38308,207.65,462],[38538,116.54,462],[39000,116.54,923],[39692,233.08,231],[39923,116.54,462],[40385,116.54,462],[40846,116.54,462],[41308,116.54,462],[41769,116.54,462],[41885,207.65,115],[42000,207.65,115],[42115,233.08,115],[42231,116.54,462],[42346,233.08,115],[42461,233.08,577],[42692,116.54,923],[43615,116.54,462],[43846,207.65,115],[43961,233.08,115],[44077,116.54,462],[44192,233.08,115],[44308,174.61,462],[44538,116.54,462],[45000,116.54,462],[45461,116.54,462],[45692,207.65,115],[45808,233.08,115],[45923,116.54,462],[46038,233.08,115],[46154,233.08,577],[46385,116.54,923],[47192,233.08,115],[47308,116.54,462],[47538,207.65,231],[47769,116.54,462],[48000,174.61,462],[48231,116.54,462],[48692,116.54,462],[49154,116.54,462],[49269,207.65,115],[49385,207.65,115],[49500,233.08,115],[49615,116.54,462],[49731,233.08,115],[49846,233.08,577],[50077,116.54,923],[51000,116.54,462],[51231,207.65,115],[51346,233.08,115],[51461,116.54,462],[51577,233.08,115],[51692,174.61,462],[51923,116.54,462],[52385,116.54,462],[52846,116.54,462],[53077,207.65,115],[53192,233.08,115],[53308,116.54,462],[53423,233.08,115],[53538,233.08,577],[53769,116.54,923],[54577,233.08,115],[54692,116.54,462],[55154,116.54,462],[55385,207.65,115],[55615,116.54,462],[55846,233.08,1269],[56077,116.54,462],[56538,116.54,462],[57000,116.54,462],[57231,185.0,1615],[57461,116.54,923],[57692,233.08,231],[58385,116.54,462],[58846,116.54,462],[59192,233.08,115],[59308,116.54,462],[59769,116.54,462],[60231,116.54,462],[60692,116.54,462],[60923,185.0,1615],[61154,116.54,923],[61385,233.08,231],[62077,116.54,462],[62538,116.54,462],[62769,233.08,577],[63000,116.54,462],[63461,116.54,462],[63923,116.54,462],[64385,116.54,462],[64615,185.0,1615],[64846,116.54,923],[65077,233.08,231],[65769,116.54,462],[66231,116.54,462],[66692,116.54,462],[66923,233.08,231],[67154,116.54,462],[67500,233.08,115],[67615,116.54,462],[68077,116.54,462],[68308,185.0,1731],[68538,116.54,923],[68769,233.08,231],[69461,116.54,462],[69692,207.65,231],[69923,116.54,462],[70154,185.0,577],[70385,116.54,462],[70846,116.54,462],[71308,116.54,462],[71769,116.54,462],[72231,116.54,923],[73154,116.54,462],[73615,116.54,462],[74077,116.54,462],[74538,116.54,462],[75000,116.54,462],[75231,207.65,462],[75461,116.54,462],[75923,116.54,923],[76615,233.08,231],[76846,116.54,462],[77308,116.54,462],[77769,116.54,462],[78231,116.54,462],[78692,116.54,462],[78808,207.65,115],[78923,207.65,115],[79038,233.08,115],[79154,116.54,462],[79269,233.08,115],[79385,233.08,577],[79615,116.54,923],[80538,116.54,462],[80769,207.65,115],[80885,233.08,115],[81000,116.54,462],[81115,233.08,115],[81231,174.61,577],[81461,116.54,462],[81923,116.54,462],[82385,116.54,462],[82615,207.65,115],[82731,233.08,115],[82846,116.54,462],[82961,233.08,115],[83077,233.08,577],[83308,116.54,923],[84115,233.08,115],[84231,116.54,462],[84461,207.65,231],[84692,116.54,462],[84923,174.61,577],[85154,116.54,462],[85615,116.54,462],[86077,116.54,462],[86192,207.65,115],[86308,207.65,115],[86423,233.08,115],[86538,116.54,462],[86654,233.08,115],[86769,233.08,577],[87000,116.54,923],[87923,116.54,462],[88154,207.65,115],[88269,233.08,115],[88385,116.54,462],[88500,233.08,115],[88615,174.61,577],[88846,116.54,462],[89308,116.54,462],[89769,116.54,462],[90000,207.65,115],[90115,233.08,115],[90231,116.54,462],[90346,233.08,115],[90461,233.08,577],[90692,116.54,923],[91500,233.08,115],[91615,116.54,462],[92077,116.54,462],[92308,207.65,231],[92538,116.54,462],[93000,116.54,462],[93461,116.54,462],[93692,207.65,115],[93808,233.08,115],[93923,116.54,462],[94038,233.08,115],[94154,233.08,577],[94385,116.54,923],[95308,116.54,462],[95538,207.65,115],[95654,233.08,115],[95769,116.54,462],[95885,233.08,115],[96000,207.65,577],[96231,116.54,462],[96692,116.54,462],[97154,116.54,462],[97385,207.65,115],[97500,233.08,115],[97615,116.54,462],[97731,233.08,115],[97846,233.08,577],[98077,116.54,923],[98885,233.08,115],[99000,116.54,462],[99231,207.65,231],[99461,116.54,462],[99692,207.65,577],[99923,116.54,462],[100385,116.54,462],[100846,116.54,462],[100961,207.65,115],[101077,207.65,115],[101192,233.08,115],[101308,116.54,462],[101423,233.08,115],[101538,233.08,577],[101769,116.54,923],[102692,116.54,462],[102923,207.65,115],[103038,233.08,115],[103154,116.54,462],[103269,233.08,115],[103385,207.65,577],[103615,116.54,462],[104077,116.54,462],[104538,116.54,462],[104769,207.65,115],[104885,233.08,115],[105000,116.54,462],[105115,233.08,115],[105231,233.08,577],[105461,116.54,923],[106269,233.08,115],[106385,116.54,462],[106846,116.54,462],[107077,207.65,231],[107308,116.54,462],[107538,233.08,1385],[107769,116.54,462],[108231,116.54,462],[108692,116.54,462],[108923,233.08,231],[109154,116.54,923],[109269,233.08,115],[109615,233.08,115],[109846,233.08,231],[110077,116.54,346],[110192,233.08,115],[110423,116.54,115],[110538,116.54,115],[110654,116.54,346],[111000,116.54,462],[111115,233.08,115],[111231,233.08,231],[111461,116.54,346],[111808,116.54,115],[111923,116.54,115],[112038,116.54,346],[112154,138.59,3692],[112269,155.56,231],[112385,116.54,462],[112500,155.56,3462],[112615,233.08,231],[112846,116.54,923],[112961,233.08,115],[113308,233.08,115],[113538,233.08,231],[113769,116.54,346],[113885,233.08,115],[114115,116.54,115],[114231,116.54,115],[114346,116.54,346],[114692,116.54,462],[114808,233.08,115],[114923,233.08,231],[115154,116.54,346],[115500,116.54,115],[115615,116.54,115],[115731,116.54,346],[115846,138.59,3692],[115961,155.56,231],[116077,116.54,462],[116192,155.56,3462],[116308,233.08,231],[116538,116.54,923],[116654,233.08,115],[116884,233.08,115],[117000,233.08,115],[117231,207.65,115],[117346,233.08,115],[117461,116.54,346],[117577,233.08,115],[117808,116.54,115],[117923,116.54,115],[118038,116.54,346],[118384,116.54,462],[118500,233.08,115],[118615,233.08,231],[118846,116.54,346],[119192,116.54,115],[119308,116.54,115],[119423,116.54,346],[119538,138.59,3692],[119654,155.56,231],[119769,116.54,462],[119884,155.56,3462],[120000,233.08,231],[120231,116.54,923],[120346,233.08,115],[120577,233.08,115],[120692,233.08,115],[120923,207.65,115],[121038,233.08,115],[121154,116.54,346],[121269,233.08,115],[121500,116.54,115],[121615,116.54,115],[121731,116.54,346],[122077,116.54,462],[122192,233.08,115],[122308,233.08,231],[122538,116.54,346],[122884,116.54,115],[123000,116.54,115],[123115,116.54,346],[123346,155.56,68654],[123461,116.54,462],[123923,116.54,923],[124384,233.08,231],[124846,116.54,462],[125308,116.54,462],[125769,116.54,462],[126000,233.08,231],[126231,116.54,462],[126577,233.08,115],[126692,116.54,462],[127154,116.54,462],[127615,116.54,923],[127846,233.08,231],[128538,116.54,462],[128769,207.65,462],[129000,116.54,462],[129231,185.0,577],[129461,116.54,462],[129923,116.54,462],[130384,116.54,462],[130846,116.54,462],[131308,116.54,923],[131769,233.08,231],[132231,116.54,462],[132692,116.54,462],[133154,116.54,462],[133384,233.08,231],[133615,116.54,462],[133961,233.08,115],[134077,116.54,462],[134538,116.54,462],[135000,116.54,923],[135231,233.08,231],[135923,116.54,462],[136154,207.65,462],[136384,116.54,462],[136615,185.0,577],[136846,116.54,462],[137308,116.54,462],[137769,116.54,462],[138231,116.54,462],[138692,116.54,923],[139615,116.54,462],[140077,116.54,462],[140538,116.54,462],[141000,116.54,462],[141461,116.54,462],[141692,207.65,923],[141923,116.54,462],[142384,116.54,923],[143077,233.08,231],[143308,116.54,462],[143769,116.54,462],[144231,116.54,462],[144692,116.54,462],[145154,116.54,462],[145269,207.65,115],[145384,207.65,115],[145500,233.08,115],[145615,116.54,462],[145731,233.08,115],[145846,233.08,577],[146077,116.54,923],[147000,116.54,462],[147231,207.65,115],[147346,233.08,115],[147461,116.54,462],[147577,233.08,115],[147692,174.61,462],[147923,116.54,462],[148384,116.54,462],[148846,116.54,462],[149077,207.65,115],[149192,233.08,115],[149308,116.54,462],[149423,233.08,115],[149538,233.08,577],[149769,116.54,923],[150577,233.08,115],[150692,116.54,462],[150923,207.65,231],[151154,116.54,462],[151384,174.61,462],[151615,116.54,462],[152077,116.54,462],[152538,116.54,462],[152654,207.65,115],[152769,207.65,115],[152884,233.08,115],[153000,116.54,462],[153115,233.08,115],[153231,233.08,577],[153461,116.54,923],[154384,116.54,462],[154615,207.65,115],[154731,233.08,115],[154846,116.54,462],[154961,233.08,115],[155077,174.61,462],[155308,116.54,462],[155769,116.54,462],[156231,116.54,462],[156461,207.65,115],[156577,233.08,115],[156692,116.54,462],[156808,233.08,115],[156923,233.08,577],[157154,116.54,923],[157961,233.08,115],[158077,116.54,462],[158538,116.54,462],[158769,207.65,115],[159000,116.54,462],[159461,116.54,462],[159923,116.54,462],[160154,207.65,115],[160269,233.08,115],[160384,116.54,462],[160500,233.08,115],[160615,233.08,577],[160846,116.54,923],[161769,116.54,462],[162000,207.65,115],[162115,233.08,115],[162231,116.54,462],[162346,233.08,115],[162461,207.65,577],[162692,116.54,462],[163154,116.54,462],[163615,116.54,462],[163846,207.65,115],[163961,233.08,115],[164077,116.54,462],[164192,233.08,115],[164308,233.08,577],[164538,116.54,923],[165346,233.08,115],[165461,116.54,462],[165692,207.65,231],[165923,116.54,462],[166154,207.65,577],[166384,116.54,462],[166846,116.54,462],[167308,116.54,462],[167423,207.65,115],[167538,207.65,115],[167654,233.08,115],[167769,116.54,462],[167884,233.08,115],[168000,233.08,577],[168231,116.54,923],[169154,116.54,462],[169384,207.65,115],[169500,233.08,115],[169615,116.54,462],[169731,233.08,115],[169846,207.65,577],[170077,116.54,462],[170538,116.54,462],[171000,116.54,462],[171231,207.65,115],[171346,233.08,115],[171461,116.54,462],[171577,233.08,115],[171692,233.08,577],[171923,116.54,923],[172731,233.08,115],[172846,116.54,462],[173308,116.54,462],[173538,207.65,231],[173769,116.54,462],[174231,116.54,462],[174692,116.54,462],[174923,207.65,115],[175038,233.08,115],[175154,116.54,462],[175269,233.08,115],[175384,233.08,577],[175615,116.54,923],[176538,116.54,462],[176769,207.65,115],[176884,233.08,115],[177000,116.54,462],[177115,233.08,115],[177231,207.65,577],[177461,116.54,462],[177923,116.54,462],[178384,116.54,462],[178615,207.65,115],[178731,233.08,115],[178846,116.54,462],[178961,233.08,115],[179077,233.08,577],[179308,116.54,923],[180115,233.08,115],[180231,116.54,462],[180461,207.65,231],[180692,116.54,462],[180923,207.65,577],[181154,116.54,462],[181615,116.54,462],[182077,116.54,462],[182192,207.65,115],[182308,207.65,115],[182423,233.08,115],[182538,116.54,462],[182654,233.08,115],[182769,233.08,577],[183000,116.54,923],[183923,116.54,462],[184154,207.65,115],[184269,233.08,115],[184384,116.54,462],[184500,233.08,115],[184615,207.65,577],[184846,116.54,462],[185308,116.54,462],[185769,116.54,462],[186000,207.65,115],[186115,233.08,115],[186231,116.54,462],[186346,233.08,115],[186461,233.08,577],[186692,116.54,923],[187500,233.08,115],[187615,116.54,462],[188077,116.54,462],[188308,207.65,115],[188538,116.54,462],[188769,233.08,1269],[189000,116.54,462],[189461,116.54,462],[189923,116.54,231],[190154,116.54,692],[190846,116.54,1154]];

  const minMs = 5538;    // первая нота в MIDI
  const loopMs = 188693;  // длительность одного прохода

  const master = _rrCtx.createGain();
  master.gain.value = 0.12;
  const softFilter = _rrCtx.createBiquadFilter();
  softFilter.type = 'lowpass';
  softFilter.frequency.value = 1600;
  master.connect(softFilter);
  softFilter.connect(_rrCtx.destination);
  _rrNodes.push(master, softFilter);

  function schedOsc(freq, t0, dur, type, vol) {
    if (!_rrPlaying || !_rrCtx) return;
    const osc = _rrCtx.createOscillator();
    const g   = _rrCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0,      t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.01);
    g.gain.setValueAtTime(vol,    t0 + dur * 0.80);
    g.gain.linearRampToValueAtTime(0,   t0 + dur);
    osc.connect(g); g.connect(master);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
    _rrNodes.push(osc);
  }

  // Look-ahead scheduler: schedule only 4s ahead, tick every 2s
  const LOOKAHEAD = 4.0;
  const TICK_MS   = 2000;
  const startCtxTime = _rrCtx.currentTime + 0.05;
  let   scheduledUpTo = startCtxTime; // absolute ctx time we've scheduled to

  function tick() {
    if (!_rrPlaying || !_rrCtx) return;
    const schedUntil = _rrCtx.currentTime + LOOKAHEAD;
    if (schedUntil > scheduledUpTo) {
      // Schedule all notes that fall in [scheduledUpTo, schedUntil)
      // We may span multiple loop iterations
      const allNotes = mel.map(([t,hz,d]) => [t,hz,d,'square',0.22])
                    .concat(bas.map(([t,hz,d]) => [t,hz,d,'sawtooth',0.09]));
      const loopSec = loopMs / 1000;
      // Determine which loop iterations overlap our window
      const firstIter = Math.max(0, Math.floor((scheduledUpTo - startCtxTime) / loopSec));
      for (let i = firstIter; i < firstIter + 3; i++) {
        const loopBase = startCtxTime + i * loopSec;
        for (const [t, hz, d, type, vol] of allNotes) {
          const noteStart = loopBase + (t - minMs) / 1000;
          if (noteStart >= scheduledUpTo && noteStart < schedUntil) {
            schedOsc(hz, noteStart, d / 1000, type, vol);
          }
        }
      }
      scheduledUpTo = schedUntil;
    }
    _rrTimer = setTimeout(tick, TICK_MS);
  }

  tick();
}

function stopRickroll8bit() {
  _rrPlaying = false;
  if (_rrTimer) { clearTimeout(_rrTimer); _rrTimer = null; }
  _rrNodes.forEach(n => { try { if (n.stop) n.stop(0); } catch(e) {} });
  _rrNodes = [];
  if (_rrCtx) { _rrCtx.close(); _rrCtx = null; }
}

// ════════════════════════════════════════════
//  SHOW SECRET (rick roll etc)
// ════════════════════════════════════════════
function showSecret(type) {
  if (type === 'rickroll') {
    const existing = document.getElementById('rickroll-modal');
    if (existing) { existing.remove(); stopRickroll8bit(); return; }

    // Show modal first so it's visible even if audio fails
    const modal = document.createElement('div');
    modal.id = 'rickroll-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:99999;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
      <div style="background:#111;border:3px solid #ff0080;border-radius:16px;padding:28px 32px;max-width:480px;width:92%;text-align:center;animation:modalPop 0.4s cubic-bezier(.34,1.56,.64,1)">
        <div style="font-size:40px;margin-bottom:8px">🎵</div>
        <h3 style="font-family:'Press Start 2P',monospace;font-size:13px;color:#ff0080;animation:rainbow 1s linear infinite;margin-bottom:14px">
          РИКРОЛЛ АКТИВИРОВАН
        </h3>
        <div style="font-family:'Press Start 2P',monospace;font-size:9px;color:#00ff88;line-height:2.2;margin-bottom:16px;animation:blink 1s step-end infinite">
          ♪ NOW PLAYING: 8-BIT EDITION ♪
        </div>
        <div style="background:#000;border:2px solid #ff0080;border-radius:8px;padding:16px;margin-bottom:16px;font-size:12px;line-height:2;opacity:0.8">
          🎵 Never gonna give you up<br>
          🎵 Never gonna let you down<br>
          🎵 Never gonna run around and desert you<br>
          🎵 Never gonna make you cry<br>
          🎵 Never gonna say goodbye<br>
          🎵 Never gonna tell a lie and hurt you
        </div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button onclick="window.open('/rickroll.html','_blank')"
            style="padding:9px 18px;background:#ff0080;border:none;border-radius:8px;
                   color:#fff;font-family:'Press Start 2P',monospace;font-size:9px;cursor:pointer">
            🎵 ОТКРЫТЬ
          </button>
          <button onclick="window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','_blank')"
            style="padding:9px 18px;background:#ff0000;border:none;border-radius:8px;
                   color:#fff;font-family:'Press Start 2P',monospace;font-size:9px;cursor:pointer">
            ▶ ЮТУБ
          </button>
          <button onclick="document.getElementById('rickroll-modal').remove();stopRickroll8bit()"
            style="padding:9px 18px;background:#333;border:2px solid #ff0080;border-radius:8px;
                   color:#fff;font-family:'Press Start 2P',monospace;font-size:9px;cursor:pointer;font-weight:bold">
            СДАЮСЬ
          </button>
        </div>
        <p style="margin-top:12px;font-size:9px;opacity:0.3">💀 Rick Astley, 1987 · 8-bit синтез © ПУКПРОМ</p>
      </div>
    `;
    modal.addEventListener('click', e => {
      if (e.target === modal) { modal.remove(); stopRickroll8bit(); }
    });
    document.body.appendChild(modal);

    giveAchievement('secret');
    // Start audio after modal is in DOM (user gesture already happened)
    try { playRickroll8bit(); } catch(e) { console.warn('Rickroll audio failed:', e); }
  }
}

// ════════════════════════════════════════════
//  FLOATING EMOJI
// ════════════════════════════════════════════
function spawnFloaty(emoji, x, y) {
  const el = document.createElement('div');
  el.className = 'floaty';
  el.textContent = emoji;
  el.style.left = (x - 14) + 'px';
  el.style.top = (y - 14) + 'px';
  el.style.setProperty('--dx', (Math.random()*80-40)+'px');
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ════════════════════════════════════════════
//  TOAST
// ════════════════════════════════════════════
function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => t.remove(), 3100);
}

// ════════════════════════════════════════════
//  MODAL
// ════════════════════════════════════════════
function showModal(title, body) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = body;
  document.getElementById('modal').classList.add('show');
}
function closeModal() {
  document.getElementById('modal').classList.remove('show');
}
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) closeModal();
});

// ════════════════════════════════════════════
//  ACHIEVEMENTS
// ════════════════════════════════════════════
function giveAchievement(id) {
  if (earnedAchievements.has(id)) return;
  earnedAchievements.add(id);
  saveState();
  const a = ACHIEVEMENTS_LIST.find(x => x.id === id);
  if (!a) return;

  const el = document.createElement('div');
  el.className = 'achievement';
  el.innerHTML = `${a.icon} ${a.title}<br><span style="color:#aaa;font-size:8px">${a.desc}</span>`;
  document.getElementById('achievements').appendChild(el);
  setTimeout(() => el.remove(), 5500);
  showToast(`🏆 Ачивка: ${a.title}`);
}

// ════════════════════════════════════════════
//  SNAKE GAME
// ════════════════════════════════════════════
(function() {
  const canvas = document.getElementById('snake-canvas');
  const ctx = canvas.getContext('2d');
  const SIZE = 15;
  const COLS = canvas.width / SIZE;
  const ROWS = canvas.height / SIZE;
  let snake, dir, food, score, running, loop;

  window.startSnake = function() {
    snake = [{x:10,y:10},{x:9,y:10},{x:8,y:10}];
    dir = {x:1,y:0};
    nextDir = {x:1,y:0};
    score = 0;
    running = true;
    placeFood();
    clearInterval(loop);
    loop = setInterval(snakeTick, 130);
    document.getElementById('snake-score').textContent = 'СЧЁТ: 0';
  };

  let nextDir = {x:1,y:0};
  document.addEventListener('keydown', e => {
    const map = {
      'ArrowUp': {x:0,y:-1}, 'w':{x:0,y:-1}, 'W':{x:0,y:-1},
      'ArrowDown': {x:0,y:1}, 's':{x:0,y:1}, 'S':{x:0,y:1},
      'ArrowLeft': {x:-1,y:0}, 'a':{x:-1,y:0}, 'A':{x:-1,y:0},
      'ArrowRight': {x:1,y:0}, 'd':{x:1,y:0}, 'D':{x:1,y:0},
    };
    if (map[e.key]) {
      const nd = map[e.key];
      if (nd.x !== -dir.x || nd.y !== -dir.y) nextDir = nd;
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
    }
  });

  function placeFood() {
    do {
      food = {x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS)};
    } while (snake.some(s => s.x===food.x && s.y===food.y));
  }

  function snakeTick() {
    dir = nextDir;
    const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
    if (head.x < 0) head.x = COLS-1;
    if (head.x >= COLS) head.x = 0;
    if (head.y < 0) head.y = ROWS-1;
    if (head.y >= ROWS) head.y = 0;
    if (snake.some(s => s.x===head.x && s.y===head.y)) {
      clearInterval(loop);
      running = false;
      drawSnake();
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#ff4444';
      ctx.font = "bold 20px 'Press Start 2P', monospace";
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 10);
      ctx.fillStyle = '#fff';
      ctx.font = "12px 'Press Start 2P', monospace";
      ctx.fillText('💨 СЧЁТ: ' + score, canvas.width/2, canvas.height/2 + 20);
      showToast('🐍 Игра окончена! Счёт: ' + score);
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      document.getElementById('snake-score').textContent = 'СЧЁТ: ' + score;
      placeFood();
      if (score === 10) giveAchievement('snake_10');
    } else {
      snake.pop();
    }
    drawSnake();
  }

  function drawSnake() {
    ctx.fillStyle = '#050505';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    // food
    ctx.font = (SIZE-2) + 'px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💨', food.x*SIZE + SIZE/2, food.y*SIZE + SIZE/2);
    // snake
    snake.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? '#00ff88' : `hsl(${140 + i*3}, 100%, ${50 - i}%)`;
      ctx.fillRect(s.x*SIZE+1, s.y*SIZE+1, SIZE-2, SIZE-2);
    });
  }

  // Initial draw
  ctx.fillStyle = '#050505';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#444';
  ctx.font = "10px 'Press Start 2P', monospace";
  ctx.textAlign = 'center';
  ctx.fillText('НАЖМИ ИГРАТЬ', canvas.width/2, canvas.height/2);
})();

// ════════════════════════════════════════════
//  CONSOLE ART
// ════════════════════════════════════════════
function buildConsoleArt() {
  console.clear();
  console.log('%c💨 ПУК.СРЕНЬК.САЙТ', 'color:#00ff88;font-size:32px;font-weight:bold;text-shadow:0 0 10px #00ff88');
  console.log('%c         https://puk.srenk.site', 'color:#aaa');
  console.log('%cТы нашёл секретную консоль. Поздравляем.', 'color:#ff00ff;font-size:16px');
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color:#333');
  console.log('%c🛠️ КОНСОЛЬНЫЕ КОМАНДЫ:', 'color:#c8a900;font-size:14px;font-weight:bold');
  console.log('%c   activateRainbow()  — радуга', 'color:#aaa');
  console.log('%c   EVERYTHING()       — хаос', 'color:#aaa');
  console.log('%c   spawnFloaty("🦄", 500, 300)  — единорог', 'color:#aaa');
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color:#333');
  console.log('%c🏆 ДОСТИЖЕНИЯ (localStorage):', 'color:#c8a900;font-size:14px;font-weight:bold');
  console.log('%c   pukprom.showAchievements()  — посмотреть прогресс', 'color:#aaa');
  console.log('%c   pukprom.resetState()        — сбросить всё', 'color:#aaa');
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color:#333');
  console.log('%cP.S. Ты читаешь консоль вместо того чтобы жить.', 'color:#555;font-style:italic');
  console.log('%cP.P.S. Разработал TheDayG0ne на коленке по приколу. thedayg0ne.ru', 'color:#444;font-style:italic');

  // Make some functions global
  window.activateRainbow = function() {
    document.body.style.animation = 'rainbow 0.5s linear infinite';
    document.body.style.filter = 'hue-rotate(0deg)';
    let h = 0;
    const iv = setInterval(() => {
      h += 5;
      document.body.style.filter = `hue-rotate(${h}deg)`;
    }, 50);
    setTimeout(() => { clearInterval(iv); document.body.style.filter = ''; }, 5000);
    console.log('%c🌈 РАДУГА АКТИВИРОВАНА на 5 секунд', 'color:rainbow;font-size:18px');
    showToast('🌈 Режим радуги активирован!');
  };

  window.EVERYTHING = function() {
    activateKonami();
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        spawnFloaty(['💨','🌈','💥','⭐','🎉','🦄','🐉','👾'][Math.floor(Math.random()*8)],
          Math.random()*window.innerWidth, Math.random()*window.innerHeight);
      }, i * 60);
    }
    document.body.style.transition = 'filter 0.3s';
    let count = 0;
    const iv = setInterval(() => {
      document.body.style.filter = count%2===0 ? 'invert(1)' : 'invert(0)';
      count++;
      if (count > 8) { clearInterval(iv); document.body.style.filter = ''; }
    }, 200);
    showToast('💀 ВСЁЁЁ!!!');
    showModal('💀 MAXIMUM CHAOS', 'Ты ввёл EVERYTHING().<br>Поздравляем. Ты сломал сайт.<br>Или нет?<br><br>Никто не знает.');
  };

  window.pukprom = {
    showAchievements() {
      const all = ACHIEVEMENTS_LIST.map(a => ({
        id: a.id, icon: a.icon, title: a.title,
        earned: earnedAchievements.has(a.id),
      }));
      console.table(all);
      console.log(`%cПуков сделано: ${pukCount}`, 'color:#00ff88;font-weight:bold');
    },
    resetState() {
      localStorage.removeItem('pukprom_state');
      console.log('%c♻️ Состояние сброшено. Обнови страницу.', 'color:#ff4444');
    },
  };
}

// ════════════════════════════════════════════
//  FAKE DEANON
// ════════════════════════════════════════════
(function initDeanon() {
  const startTime = Date.now();

  // Reveal helper: delays + typewriter effect
  function revealField(id, value, delay) {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('loading');
      el.classList.add('revealed');
      // typewriter
      let i = 0;
      el.textContent = '';
      const iv = setInterval(() => {
        el.textContent += value[i++];
        if (i >= value.length) clearInterval(iv);
      }, 35);
    }, delay);
  }

  // Browser / OS detection
  function detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Edg/')) return 'Microsoft Edge';
    if (ua.includes('OPR/') || ua.includes('Opera')) return 'Opera';
    if (ua.includes('YaBrowser')) return 'Яндекс.Браузер';
    if (ua.includes('Chrome')) return 'Google Chrome';
    if (ua.includes('Firefox')) return 'Mozilla Firefox';
    if (ua.includes('Safari')) return 'Safari';
    return 'Неизвестный браузер';
  }

  function detectOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Windows NT 10')) return 'Windows 10/11';
    if (ua.includes('Windows NT 6.3')) return 'Windows 8.1';
    if (ua.includes('Windows NT 6.1')) return 'Windows 7 (серьёзно?)';
    if (ua.includes('Mac OS X')) return 'macOS';
    if (ua.includes('Android')) return 'Android (звоним с телефона?)';
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS (богатенький)';
    if (ua.includes('Linux')) return 'Linux (хакер детектед)';
    return 'Абакус';
  }

  // Fake dramatic "hacking" values to show before real data
  const fakeIPs = ['192.168.1.', '10.0.0.', '172.16.0.'];
  function fakeScan(id, callback) {
    const el = document.getElementById(id);
    let ticks = 0;
    const chars = '0123456789ABCDEF.:';
    const iv = setInterval(() => {
      el.textContent = Array.from({length: 12}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
      ticks++;
      if (ticks > 12) { clearInterval(iv); callback(); }
    }, 80);
  }

  // Countdown (fake, cycles)
  let cdVal = Math.floor(Math.random() * 90) + 10;
  const countdownFaces = ['😱','💀','🔥','⚠️','☠️'];
  let cdFace = 0;
  setInterval(() => {
    cdVal--;
    if (cdVal <= 0) cdVal = Math.floor(Math.random() * 90) + 10;
    const el = document.getElementById('deanon-countdown');
    if (el) {
      el.textContent = cdVal + ' СЕК ' + countdownFaces[cdFace++ % countdownFaces.length];
    }
  }, 1000);

  // Time on site
  setInterval(() => {
    const secs = Math.floor((Date.now() - startTime) / 1000);
    const el = document.getElementById('d-time');
    if (el) el.textContent = secs + ' сек (ты уже не уйдёшь)';
    const elP = document.getElementById('d-puks');
    if (elP) elP.textContent = pukCount + (pukCount >= 10 ? ' 🚑' : '');
  }, 1000);

  // Real browser data — reveal with drama
  setTimeout(() => {
    fakeScan('d-browser', () => revealField('d-browser', detectBrowser(), 0));
  }, 800);
  setTimeout(() => {
    fakeScan('d-os', () => revealField('d-os', detectOS(), 0));
  }, 1200);
  revealField('d-screen', `${screen.width}×${screen.height} (${screen.colorDepth}-bit)`, 1600);
  revealField('d-tz', Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Moscow', 2000);
  revealField('d-lang', navigator.language || 'ru-RU', 2400);

  // Battery API (real, if supported)
  if (navigator.getBattery) {
    navigator.getBattery().then(b => {
      const pct = Math.round(b.level * 100);
      const status = b.charging ? '🔌 заряжается' : (pct < 20 ? '🪫 КРИТИЧНО' : '🔋 от батареи');
      revealField('d-battery', `${pct}% ${status}`, 2800);
    }).catch(() => revealField('d-battery', 'скрыто (подозрительно)', 2800));
  } else {
    revealField('d-battery', 'недоступно (iOS? богатенький)', 2800);
  }

  // Fetch: сначала пробуем /geo (nginx proxy_pass на eth0.lol на сервере),
  // потом сам eth0.lol напрямую (работает если CORS включён на сервере),
  // потом fallback на ipapi.co (всегда работает в браузере).
  function applyGeoData(data) {
    console.log('[deanon] geo response:', data);

    fakeScan('d-ip', () => revealField('d-ip', data.ip || '???', 0));

    // eth0.lol format: latitude/longitude; ipapi.co format: тоже
    const lat = data.latitude ?? data.lat;
    const lon = data.longitude ?? data.lon ?? data.longitude;
    const location = (lat != null && lon != null)
      ? `${lat}, ${lon} 📍`
      : (data.city ? data.city + ' 📍' : 'Где-то на Земле 🌍');
    setTimeout(() => revealField('d-city', location, 400), 200);

    // eth0.lol: country + country_iso; ipapi.co: country_name + country_code
    const countryName = data.country || data.country_name || '';
    const countryCode = data.country_iso || data.country_code || '';
    const country = [countryName, countryCode].filter(Boolean).join(' · ');
    setTimeout(() => revealField('d-country', country || '???', 800), 400);

    // eth0.lol: asn_org + asn; ipapi.co: org
    const org = data.asn_org
      ? `${data.asn_org} (${data.asn})`
      : (data.org || data.asn || 'Засекречено');
    setTimeout(() => revealField('d-org', org, 1200), 600);

    if (data.hostname) {
      setTimeout(() => showToast('🖥 Хост: ' + data.hostname), 2200);
    }

    setTimeout(() => {
      const loc = countryName || 'планете';
      showToast('😱 ' + loc + '? Мы знаем где ты живёшь!');
      setTimeout(() => showToast('📡 Данные переданы в Пукпром'), 2000);
    }, 1800);
  }

  // Попытка 1: /geo на своём сервере (nginx proxy_pass → https://eth0.lol/)
  // Для настройки добавь в nginx: location /geo { proxy_pass https://eth0.lol/; proxy_set_header Accept "application/json"; }
  fetch('/geo')
    .then(r => { if (!r.ok) throw new Error('no local proxy'); return r.json(); })
    .then(applyGeoData)
    .catch(() => {
      // Попытка 2: eth0.lol напрямую (работает в Firefox с отключённым CORS, или если откроешь файл локально)
      fetch('https://eth0.lol/', { headers: { 'Accept': 'application/json' } })
        .then(r => { if (!r.ok) throw new Error('eth0 failed'); return r.json(); })
        .then(applyGeoData)
        .catch(() => {
          // Попытка 3: ipapi.co — всегда работает в браузере
          console.warn('[deanon] eth0.lol blocked by CORS (нет заголовка Access-Control-Allow-Origin). Fallback → ipapi.co');
          fetch('https://ipapi.co/json/')
            .then(r => r.json())
            .then(applyGeoData)
            .catch(err => {
              console.error('[deanon] все источники недоступны:', err);
              fakeScan('d-ip', () => revealField('d-ip', '77.88.' + Math.floor(Math.random()*255) + '.' + Math.floor(Math.random()*255), 0));
              revealField('d-city', 'Мухосранск', 1000);
              revealField('d-country', 'Россия', 1400);
              revealField('d-org', 'ООО "Скрытый VPN"', 1800);
            });
        });
    });
})();

// ════════════════════════════════════════════
//  RANDOM TITLE CHANGES
// ════════════════════════════════════════════
const titles = [
  '💨 ПУК.СРЕНЬК.САЙТ',
  '👀 ТЫ ВСЕГДА ТУТ?',
  '💀 УХОДИ. ШУЧУ, ОСТАВАЙСЯ.',
  '🌚 Я ВСЁ ВИЖУ',
  '🐕 wow. much tab.',
  '💨 пуук...',
  '🔮 СЕКРЕТ БЛИЗКО',
];
let titleIdx = 0;
setInterval(() => {
  if (document.hidden) {
    titleIdx = (titleIdx + 1) % titles.length;
    document.title = titles[titleIdx];
  } else {
    document.title = '💨 ПУК.СРЕНЬК.САЙТ — ОФИЦИАЛЬНАЯ РЕЗИДЕНЦИЯ ПУКА';
  }
}, 3000);

// ════════════════════════════════════════════
//  RANDOM BOUNCY BALL
// ════════════════════════════════════════════
(function() {
  const ball = document.getElementById('bouncy');
  let bx = 200, by = 200, vx = 4, vy = 3;
  let active = false;

  setTimeout(() => {
    ball.style.display = 'block';
    active = true;
    animate();
  }, 15000);

  function animate() {
    if (!active) return;
    bx += vx; by += vy;
    if (bx <= 0 || bx >= window.innerWidth - 30)  { vx = -vx; spawnFloaty('✨', bx, by); }
    if (by <= 0 || by >= window.innerHeight - 30) { vy = -vy; spawnFloaty('✨', bx, by); }
    ball.style.left = bx + 'px';
    ball.style.top = by + 'px';
    requestAnimationFrame(animate);
  }

  ball.addEventListener('click', () => {
    vx *= -1.2; vy *= -1.2;
    if (Math.abs(vx) > 15) vx = 5;
    if (Math.abs(vy) > 15) vy = 5;
    spawnFloaty('💥', bx, by);
    showToast('ТЫ УДАРИЛ МЯЧ!');
  });
})();

// ════════════════════════════════════════════
//  IDLE DETECTION
// ════════════════════════════════════════════
let idleTimer;
function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    showToast('👀 Эй. Ты живой?');
    setTimeout(() => showToast('🌚 Может стоит поработать?'), 2000);
  }, 30000);
}
['mousemove','keydown','click','scroll'].forEach(ev => document.addEventListener(ev, resetIdle));
resetIdle();

// ════════════════════════════════════════════
//  EASTER EGG: Type "puk" anywhere
// ════════════════════════════════════════════
let typed = '';
document.addEventListener('keypress', e => {
  typed += e.key.toLowerCase();
  typed = typed.slice(-12);
  if (typed.includes('puk')) {
    typed = '';
    doPuk({clientX: window.innerWidth/2, clientY: window.innerHeight/2});
    showToast('🎯 Ты написал puk! +1 пук!');
  }
  if (typed.includes('srenk')) {
    typed = '';
    showModal('🏠 СРЕНЬК', 'Ты написал SRENK.<br><br>Это дом.<br>Добро пожаловать домой.<br><br>🏠');
  }
  if (typed.includes('win95') || typed.includes('win 95')) {
    typed = '';
    showToast('💾 Загрузка ПУКДОС 95...');
    setTimeout(() => window.open('win95.html', '_blank'), 600);
  }
  if (typed.includes('вжух') || typed.includes('vjuh')) {
    typed = '';
    showToast('🪄 ВЖУХ! И всё наладилось!');
    for (let i = 0; i < 25; i++)
      setTimeout(() => spawnFloaty(['🪄','✨','⭐','💫'][i%4], Math.random()*window.innerWidth, Math.random()*window.innerHeight), i*50);
  }
  if (typed.includes('sudo')) {
    typed = '';
    showSudoTerminal();
  }
  if (typed.includes('ждун') || typed.includes('zhdun')) {
    typed = '';
    spawnZhdun();
  }
  if (typed.includes('mama') || typed.includes('мама')) {
    typed = '';
    showModal('😭 МА-МА', 'Мама, забери меня домой.<br>Я попал на плохой сайт.<br><br>💀');
  }
  if (typed.includes('help')) {
    typed = '';
    showModal('❓ ПОМОЩЬ', 'Помочь не можем.<br><br>Ты уже здесь.<br>Это всё.');
  }
  if (typed.includes('xyzzy')) {
    typed = '';
    showToast('🕯️ Ничего не произошло.');
    setTimeout(() => showToast('...или произошло?'), 1500);
  }
});

// ════════════════════════════════════════════
//  EASTER EGG: CUSTOM CONTEXT MENU
// ════════════════════════════════════════════
document.addEventListener('contextmenu', e => {
  e.preventDefault();
  showContextMenu(e.clientX, e.clientY);
});

function showContextMenu(x, y) {
  const menu = document.getElementById('ctx-menu');
  menu.style.left = Math.min(x, window.innerWidth  - 220) + 'px';
  menu.style.top  = Math.min(y, window.innerHeight - 200) + 'px';
  menu.classList.add('show');
}

document.addEventListener('click', () => {
  document.getElementById('ctx-menu').classList.remove('show');
});

// ════════════════════════════════════════════
//  EASTER EGG: MOUSE SHAKE → EARTHQUAKE
// ════════════════════════════════════════════
let _mouseHistory = [], _quakeCooldown = false;
document.addEventListener('mousemove', e => {
  const now = Date.now();
  _mouseHistory.push({ x: e.clientX, y: e.clientY, t: now });
  _mouseHistory = _mouseHistory.filter(p => now - p.t < 400);
  if (_mouseHistory.length < 6 || _quakeCooldown) return;
  let totalDist = 0;
  for (let i = 1; i < _mouseHistory.length; i++) {
    const dx = _mouseHistory[i].x - _mouseHistory[i-1].x;
    const dy = _mouseHistory[i].y - _mouseHistory[i-1].y;
    totalDist += Math.sqrt(dx*dx + dy*dy);
  }
  if (totalDist > 900) {
    _quakeCooldown = true;
    triggerEarthquake();
    setTimeout(() => { _quakeCooldown = false; }, 3000);
  }
});

function triggerEarthquake() {
  document.body.classList.add('quake');
  FartEngine.playLoud();
  showToast('🌍 ЗЕМЛЕТРЯСЕНИЕ!!! Слишком быстро шевелишь мышкой!');
  for (let i = 0; i < 20; i++)
    setTimeout(() => spawnFloaty(['💥','🌋','⚡','🔥'][i%4], Math.random()*window.innerWidth, Math.random()*window.innerHeight), i*60);
  setTimeout(() => document.body.classList.remove('quake'), 700);
}

// ════════════════════════════════════════════
//  EASTER EGG: ZHDUN
// ════════════════════════════════════════════
let _zhdunTimer = null;
function spawnZhdun() {
  const el = document.getElementById('zhdun');
  el.classList.add('show');
  showToast('👀 ЖДУН ПОЯВИЛСЯ');
  clearTimeout(_zhdunTimer);
  _zhdunTimer = setTimeout(() => el.classList.remove('show'), 6000);
}

// ════════════════════════════════════════════
//  EASTER EGG: SUDO TERMINAL
// ════════════════════════════════════════════
const SUDO_COMMANDS = {
  help:    'Доступные команды: puk, cat, doge, rm, ls, hack, exit',
  ls:      'пук1.txt  пук2.exe  зловоние.dll  ждун.bin  СЕКРЕТ/',
  cat:     '🐱 МЯУ',
  doge:    'wow  such terminal  very sudo  many command  pls exit',
  hack:    'Взлом NASA...\n[████████░░] 84%\nОшибка: слишком много пуков в системе.\nВзлом отменён.',
  rm:      'rm: невозможно удалить \'/\': сайт защищён пуками',
  'rm -rf /': '💀 СИСТЕМА УНИЧТОЖЕНА\n\nЭто шутка. Всё хорошо.',
  exit:    '👋 Выход...',
  puk:     '💨 *пук*\nПук задокументирован в базе данных ПУКПРОМ.',
  sudo:    '[sudo] пароль для пользователя: ошибка: не положено',
  whoami:  'ты',
  date:    () => new Date().toLocaleString('ru-RU') + '  (официальное время ПУКПРОМА)',
  uname:   'ПУКДОС 95 Release 6.9.420 (Methane Edition) x86_64',
};

function showSudoTerminal() {
  const term = document.getElementById('sudo-terminal');
  term.classList.add('show');
  const out = document.getElementById('sudo-output');
  out.textContent = 'ПУКПРОМ ТЕРМИНАЛ v2.0\nВведите команду. Введите "exit" для закрытия.\n\n';
  document.getElementById('sudo-input').focus();
}

document.addEventListener('DOMContentLoaded', () => {
  const inp = document.getElementById('sudo-input');
  if (!inp) return;
  inp.addEventListener('keydown', e => {
    if (e.key === 'Escape') { document.getElementById('sudo-terminal').classList.remove('show'); return; }
    if (e.key !== 'Enter') return;
    const cmd = inp.value.trim().toLowerCase();
    inp.value = '';
    const out = document.getElementById('sudo-output');
    out.textContent += '$ ' + cmd + '\n';
    if (cmd === 'exit') {
      document.getElementById('sudo-terminal').classList.remove('show');
      return;
    }
    const resp = SUDO_COMMANDS[cmd];
    out.textContent += (typeof resp === 'function' ? resp() : resp || `bash: ${cmd}: команда не найдена`) + '\n\n';
    out.scrollTop = out.scrollHeight;
  });

  // Win95 icon click
  const icon = document.getElementById('win95-icon');
  if (icon) icon.addEventListener('click', () => {
    window.open('win95.html', '_blank');
  });
});

// ════════════════════════════════════════════
//  DIPLOMA GENERATION
// ════════════════════════════════════════════
function doGenerateDiploma() {
  const nameRaw = (document.getElementById('diploma-name-input').value || '').trim();
  const name = nameRaw || 'Аноним Пукович';
  const status = document.getElementById('diploma-status');
  status.textContent = '⏳ Готовим диплом...';

  // Небольшая задержка чтобы браузер успел обновить статус
  setTimeout(() => {
    try {
      const canvas = _drawDiplomaCanvas(name);
      const imgData = canvas.toDataURL('image/jpeg', 0.97);

      if (window.jspdf && window.jspdf.jsPDF) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        doc.addImage(imgData, 'JPEG', 0, 0, 297, 210);
        doc.save(`Диплом_Пукпрома_${name.replace(/\s+/g,'_')}.pdf`);
        status.textContent = '✅ Диплом скачан! Храни его с гордостью.';
      } else {
        // Fallback: скачать PNG
        const a = document.createElement('a');
        a.href = imgData;
        a.download = `Диплом_Пукпрома_${name.replace(/\s+/g,'_')}.png`;
        a.click();
        status.textContent = '✅ Диплом скачан как PNG (jsPDF не загрузился).';
      }

      giveAchievement('diploma');
      setTimeout(() => {
        document.getElementById('diploma-modal').style.display = 'none';
      }, 3000);
    } catch(e) {
      console.error('Diploma error:', e);
      status.textContent = '❌ Ошибка генерации: ' + e.message;
    }
  }, 80);
}

function _drawDiplomaCanvas(name) {
  const W = 1190, H = 842; // A4 landscape ~141dpi
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const c = cv.getContext('2d');

  // ── Фон ──────────────────────────────────────────
  const bg = c.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#fffbee');
  bg.addColorStop(0.5, '#fff8e0');
  bg.addColorStop(1, '#fff3cc');
  c.fillStyle = bg;
  c.fillRect(0, 0, W, H);

  // Фоновый паттерн (мелкие пузырьки)
  c.save();
  c.globalAlpha = 0.04;
  c.font = '20px serif';
  c.fillStyle = '#c8a900';
  for (let y = 40; y < H; y += 55)
    for (let x = 30; x < W; x += 60)
      c.fillText('💨', x, y);
  c.restore();

  // ── Рамки ────────────────────────────────────────
  // Внешняя золотая
  c.strokeStyle = '#b8960c';
  c.lineWidth = 14;
  _roundRect(c, 12, 12, W-24, H-24, 6);
  c.stroke();

  // Средняя
  c.strokeStyle = '#d4af37';
  c.lineWidth = 4;
  _roundRect(c, 24, 24, W-48, H-48, 4);
  c.stroke();

  // Внутренняя тонкая
  c.strokeStyle = '#c8a900';
  c.lineWidth = 1.5;
  _roundRect(c, 32, 32, W-64, H-64, 3);
  c.stroke();

  // ── Угловые орнаменты ────────────────────────────
  c.font = '36px serif';
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillStyle = '#c8a900';
  [[50, 50],[W-50, 50],[50, H-50],[W-50, H-50]].forEach(([x,y]) => c.fillText('✦', x, y));

  // ── Шапка ────────────────────────────────────────
  // Гербовый значок
  c.font = '56px serif';
  c.textAlign = 'center';
  c.fillText('💨', W/2, 105);

  // Заголовок
  c.fillStyle = '#6b0000';
  c.font = 'bold 76px Georgia, Times New Roman, serif';
  c.textAlign = 'center';
  c.textBaseline = 'alphabetic';
  // Тень
  c.shadowColor = 'rgba(0,0,0,0.15)';
  c.shadowBlur = 8;
  c.shadowOffsetY = 3;
  c.fillText('ДИПЛОМ', W/2, 188);
  c.shadowBlur = 0; c.shadowOffsetY = 0;

  // Подзаголовок
  c.fillStyle = '#c8a900';
  c.font = 'italic bold 28px Georgia, serif';
  c.fillText('ПОЧЁТНОГО ПУКИСТА ПЕРВОГО КЛАССА', W/2, 228);

  // Организация
  c.fillStyle = '#666';
  c.font = '19px Georgia, serif';
  c.fillText('Общество с ограниченной пукответственностью  «ПУКПРОМ»  ·  puk.srenk.site', W/2, 262);

  // ── Разделитель ──────────────────────────────────
  _drawDivider(c, 70, 278, W-70, '#c8a900');

  // ── Основной текст ───────────────────────────────
  c.fillStyle = '#444';
  c.font = '24px Georgia, serif';
  c.fillText('Настоящим подтверждается, что', W/2, 326);

  // Имя получателя
  c.shadowColor = 'rgba(0,0,128,0.25)';
  c.shadowBlur = 10;
  c.fillStyle = '#00006a';
  c.font = 'bold 58px Georgia, serif';
  // Автоматически уменьшаем шрифт если имя длинное
  const nameFont = name.length > 18 ? 'bold 42px Georgia, serif' : 'bold 58px Georgia, serif';
  c.font = nameFont;
  c.fillText(name, W/2, 400);
  c.shadowBlur = 0;

  // Подчёркивание имени
  const nm = c.measureText(name);
  const nx = W/2 - nm.width/2;
  c.strokeStyle = '#00006a';
  c.lineWidth = 2;
  c.beginPath(); c.moveTo(nx, 410); c.lineTo(nx + nm.width, 410); c.stroke();

  // Описание достижения
  c.fillStyle = '#333';
  c.font = '22px Georgia, serif';
  c.fillText('совершил(а) ровно 100 (сто) официальных пуков на платформе puk.srenk.site,', W/2, 456);
  c.fillText('тем самым внеся неоценимый вклад в развитие мировой пукологии', W/2, 486);
  c.fillText('и получает все права, привилегии и обязанности, причитающиеся данному званию.', W/2, 516);

  // Звёздочка-сноска
  c.fillStyle = '#aaa';
  c.font = 'italic 14px Georgia, serif';
  c.fillText('* Привилегии не установлены. Обязанности тоже. Диплом действителен пока вы не закрыли вкладку.', W/2, 548);

  // ── Разделитель ──────────────────────────────────
  _drawDivider(c, 70, 566, W-70, '#c8a900');

  // ── Печать (круглая) ─────────────────────────────
  c.save();
  c.translate(W - 175, H - 165);
  c.rotate(-0.22);
  // Внешний круг
  c.strokeStyle = 'rgba(139,0,0,0.3)';
  c.lineWidth = 7;
  c.beginPath(); c.arc(0, 0, 82, 0, Math.PI*2); c.stroke();
  c.lineWidth = 2.5;
  c.beginPath(); c.arc(0, 0, 67, 0, Math.PI*2); c.stroke();
  // Текст по кругу
  c.fillStyle = 'rgba(139,0,0,0.35)';
  c.font = 'bold 13px Arial';
  c.textAlign = 'center';
  _circleText(c, 'ООО ПУКПРОМ • ОФИЦИАЛЬНАЯ ПЕЧАТЬ •', 0, 0, 74, -Math.PI/2);
  // Центр
  c.font = '44px serif';
  c.textBaseline = 'middle';
  c.fillText('💨', 0, 0);
  c.font = 'bold 12px Arial';
  c.textBaseline = 'alphabetic';
  c.fillText('ГАЗОДИНАМИКА', 0, 30);
  c.restore();

  // ── Подписи и дата ───────────────────────────────
  const dateStr = new Date().toLocaleDateString('ru-RU', {day:'numeric', month:'long', year:'numeric'});
  c.fillStyle = '#555';
  c.font = '18px Georgia, serif';
  c.textAlign = 'left';
  c.textBaseline = 'alphabetic';
  c.fillText('г. Пукбург,  ' + dateStr, 72, H - 88);

  // Линии подписей
  const sigY = H - 80;
  [[180, 'Пук П.П.', 'Генеральный директор по газам'], [480, 'Пукин А.Б.', 'Главный пуколог']]
    .forEach(([x, sig, pos]) => {
      c.strokeStyle = '#666'; c.lineWidth = 1;
      c.beginPath(); c.moveTo(x, sigY); c.lineTo(x + 200, sigY); c.stroke();
      c.fillStyle = '#444'; c.font = 'italic 15px Georgia, serif'; c.textAlign = 'left';
      c.fillText(sig, x, sigY + 18);
      c.fillStyle = '#888'; c.font = '13px Georgia, serif';
      c.fillText(pos, x, sigY + 36);
    });

  return cv;
}

// ── Вспомогательные функции диплома ──────────────
function _roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x+r, y);
  c.lineTo(x+w-r, y); c.arcTo(x+w,y,x+w,y+r,r);
  c.lineTo(x+w, y+h-r); c.arcTo(x+w,y+h,x+w-r,y+h,r);
  c.lineTo(x+r, y+h); c.arcTo(x,y+h,x,y+h-r,r);
  c.lineTo(x, y+r); c.arcTo(x,y,x+r,y,r);
  c.closePath();
}

function _drawDivider(c, x1, y, x2, color) {
  const grad = c.createLinearGradient(x1, y, x2, y);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(0.3, color);
  grad.addColorStop(0.7, color);
  grad.addColorStop(1, 'transparent');
  c.strokeStyle = grad;
  c.lineWidth = 1.5;
  c.beginPath(); c.moveTo(x1, y); c.lineTo(x2, y); c.stroke();
  // Центральный ромб
  c.fillStyle = color;
  c.save();
  c.translate((x1+x2)/2, y);
  c.rotate(Math.PI/4);
  c.fillRect(-5, -5, 10, 10);
  c.restore();
}

function _circleText(c, text, cx, cy, r, startAngle) {
  const step = (Math.PI * 2) / text.length;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  for (let i = 0; i < text.length; i++) {
    const a = startAngle + i * step;
    c.save();
    c.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    c.rotate(a + Math.PI/2);
    c.fillText(text[i], 0, 0);
    c.restore();
  }
}

// Enter в поле имени = генерация
document.addEventListener('DOMContentLoaded', () => {
  const inp = document.getElementById('diploma-name-input');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') doGenerateDiploma(); });
});
