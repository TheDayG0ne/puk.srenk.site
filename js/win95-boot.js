// ==================== CONTROL PANEL SETTINGS STORE ====================
var _cpSet = (function(){
  var def = {
    mouse:    { speed: 5, dblClick: 5, leftHanded: false, trails: false },
    keyboard: { delay: 3, repeat: 5, lang: 'RU' },
    network:  { dhcp: true, ip: '192.168.1.69', mask: '255.255.255.0', gw: '192.168.1.1', dns: '8.8.8.8' },
    passwords:{ desktop: '', screensaver: '', hint: '' },
    user:     { login: 'Пользователь', password: '', hint: '', fullName: 'Пользователь ПУКДОС' },
    sound:    { volume: 70, scheme: 0 },
    timeOffset: 0
  };
  try {
    var s = localStorage.getItem('pukdos_cp');
    if (s) { var p=JSON.parse(s); Object.keys(def).forEach(function(k){ if(p[k]) Object.assign(def[k],p[k]); }); }
  } catch(e) {}
  return def;
})();
function _saveCpSet() { try { localStorage.setItem('pukdos_cp', JSON.stringify(_cpSet)); } catch(e){} }

// Helper: tab switcher inside a win-client (call from inline onclick)
function cpSwitchTab(winId, idx, tabs) {
  var cl = document.getElementById('cl_' + winId);
  if (!cl) return;
  cl.querySelectorAll('[data-tab-page]').forEach(function(p) {
    p.style.display = (parseInt(p.dataset.tabPage) === idx) ? '' : 'none';
  });
  cl.querySelectorAll('[data-tab-btn]').forEach(function(b) {
    b.style.fontWeight = (parseInt(b.dataset.tabBtn) === idx) ? 'bold' : '';
    b.style.background = (parseInt(b.dataset.tabBtn) === idx) ? '#ffffff' : '';
  });
}
// Helper: render a tabbar HTML string
function _tabBar(winId, tabs, active) {
  return '<div style="display:flex;gap:2px;padding:4px 4px 0;border-bottom:1px solid #808080;margin-bottom:4px">' +
    tabs.map(function(t,i){
      return '<button class="w-btn" data-tab-btn="'+i+'" style="'+(i===active?'font-weight:bold;background:#fff;':'')+'min-width:60px;margin-bottom:-1px;border-bottom:'+(i===active?'1px solid #fff':'')+';" onclick="cpSwitchTab(\''+winId+'\','+i+')">'+t+'</button>';
    }).join('') + '</div>';
}

// ---- Boot message pools ----
var _bootMsgsFunny = [
  'Инициализация пуков...','Загрузка ядра ПУКДОС...','Проверка газовых резервов...',
  'Монтирование дисков...','Обнуление молекул метана...','Подключение к газовой сети...',
  'Проверка кишечного буфера...','Дефрагментация обоняния...','Загрузка газовых драйверов...',
  'Инициализация Пук-сопроцессора...','Калибровка давления...','Оптимизация выхлопа...',
  'Поиск тёплого места...','Загрузка воспоминаний о борще...','Проверка герметичности...',
  'Компиляция звуков природы...','Синхронизация с ПУКПРОМ...','Запуск рабочего стола...'
];

function _runBootProgress(msgs, onDone) {
  var boot = document.getElementById('boot');
  var fill = document.getElementById('boot-fill');
  var st   = document.getElementById('boot-status');

  if (_biosSet.quickPost) {
    fill.style.width = '100%';
    st.textContent = msgs[msgs.length - 1];
    setTimeout(function() {
      boot.style.transition = 'opacity 0.3s'; boot.style.opacity = '0';
      setTimeout(function() { boot.style.display = 'none'; boot.style.opacity = ''; onDone(); }, 300);
    }, 400);
    return;
  }

  // Target duration: 4-10 seconds random, modified by turbo mode
  var targetMs = 4000 + Math.random() * 6000; // 4000..10000
  if (_biosSet.turboMode === 'MAXIMUM PUK') targetMs = 1500 + Math.random() * 1500;
  else if (_biosSet.turboMode === 'ECO')    targetMs = 8000 + Math.random() * 5000;

  // We'll fire ~20-30 ticks over that duration
  var ticks = 20 + Math.floor(Math.random() * 12);
  var tickMs = targetMs / ticks;

  var pct = 0, mi = 0;
  var iv = setInterval(function() {
    // Non-linear progress: fast at start, slow in middle, fast at end
    var remaining = 100 - pct;
    var step = (remaining * (0.08 + Math.random() * 0.12));
    pct += step;
    if (pct > 100) pct = 100;
    fill.style.width = pct + '%';
    // Distribute messages evenly across progress
    var msgIdx = Math.min(Math.floor((pct / 100) * msgs.length), msgs.length - 1);
    st.textContent = msgs[msgIdx];
    mi++;
    if (pct >= 99) {
      pct = 100;
      fill.style.width = '100%';
      st.textContent = msgs[msgs.length - 1];
      clearInterval(iv);
      setTimeout(function() {
        boot.style.transition = 'opacity 0.4s'; boot.style.opacity = '0';
        setTimeout(function() { boot.style.display = 'none'; boot.style.opacity = ''; onDone(); }, 400);
      }, 350);
    }
  }, tickMs);
}

function _showBootUI(icon, title, subtitle) {
  var boot = document.getElementById('boot');
  boot.style.display = 'flex';
  boot.innerHTML =
    '<div style="font-size:52px">' + icon + '</div>' +
    '<div style="font-size:20px;font-weight:bold;margin-top:8px">' + title + '</div>' +
    '<div style="color:#808080;font-size:11px;margin-top:4px">' + subtitle + '</div>' +
    '<div id="boot-bar"><div id="boot-fill"></div></div>' +
    '<div id="boot-status">...</div>';
}

function _bootFromHDD(onDone) {
  _showBootUI('💨', 'ПУКДОС 95', _biosSet.pukMode === 'DISABLED' ? 'ПУК ОТКЛЮЧЁН' : 'Microsoft — только не та');
  var msgs = _bootMsgsFunny.slice();
  if (_biosSet.pukMode === 'DISABLED')       msgs[0] = 'Пуки отключены. Тихий режим...';
  if (_biosSet.fartCoprocessor === 'Disabled') msgs[4] = 'Сопроцессор пуков — ОТКЛЮЧЁН';
  if (_biosSet.gasLock === 'On')             msgs[msgs.length-1] = 'Газовый замок АКТИВЕН. Пуки заблокированы.';
  _runBootProgress(msgs, onDone);
}

function _showDiskSelector(disks, onSelect) {
  var boot = document.getElementById('boot');
  boot.style.display = 'flex';
  var items = disks.map(function(d, i) {
    return '<div class="boot-disk-item" id="bdisk_'+i+'" onclick="_diskSelected('+i+')" style="cursor:pointer;padding:4px 12px;margin:2px 0;border:1px solid transparent;font-size:12px">'+d.label+'</div>';
  }).join('');
  boot.innerHTML =
    '<div style="font-size:32px">💾</div>' +
    '<div style="font-size:15px;font-weight:bold;margin-top:6px">Выберите загрузочный диск</div>' +
    '<div style="color:#aaa;font-size:10px;margin-bottom:8px">Вставьте дискету и нажмите Enter, или выберите из списка</div>' +
    '<div id="disk-list" style="text-align:left;width:320px;border:1px inset #888;background:#000;padding:4px;font-family:monospace">' + items + '</div>' +
    '<div id="disk-status" style="color:#aaa;font-size:10px;margin-top:8px">&nbsp;</div>';
  var sel = 0;
  var diskItems = boot.querySelectorAll('.boot-disk-item');
  diskItems[0].style.background = '#0000aa'; diskItems[0].style.color = '#fff';
  window._diskSelected = function(i) {
    diskItems[sel].style.background = ''; diskItems[sel].style.color = '';
    sel = i;
    diskItems[sel].style.background = '#0000aa'; diskItems[sel].style.color = '#fff';
    document.getElementById('disk-status').textContent = 'Читаю ' + disks[i].label + '...';
    setTimeout(function() { onSelect(disks[i]); }, 600);
  };
  var keyH = function(e) {
    if (e.key === 'ArrowDown')  { diskItems[sel].style.background=''; diskItems[sel].style.color=''; sel=(sel+1)%disks.length; diskItems[sel].style.background='#0000aa'; diskItems[sel].style.color='#fff'; }
    if (e.key === 'ArrowUp')    { diskItems[sel].style.background=''; diskItems[sel].style.color=''; sel=(sel-1+disks.length)%disks.length; diskItems[sel].style.background='#0000aa'; diskItems[sel].style.color='#fff'; }
    if (e.key === 'Enter')      { document.removeEventListener('keydown', keyH); _diskSelected(sel); }
  };
  document.addEventListener('keydown', keyH);
}

function _bootFromFloppy(onDone) {
  var disks = [
    { label: 'PukDOS 6.0',       scenario: 'pukdos6' },
    { label: 'ПУКДОС95 Setup',   scenario: 'setup95' },
    { label: 'АнтиГаз 2.4',      scenario: 'antigas' },
    { label: 'PukNux 22.04 LTS', scenario: 'puknux'  },
    { label: 'Анапа 2001',       scenario: 'anapa'   }
  ];
  _showDiskSelector(disks, function(disk) {
    if (disk.scenario === 'anapa') {
      var boot = document.getElementById('boot');
      boot.innerHTML = '<div style="font-size:28px;color:#f00;margin-top:40px">⚠</div>' +
        '<div style="font-size:13px;font-weight:bold;margin-top:8px">Диск не является загрузочным</div>' +
        '<div style="color:#aaa;font-size:11px;margin-top:4px">Замените дискету и нажмите любую клавишу для продолжения</div>';
      var k = function() {
        document.removeEventListener('keydown', k);
        document.removeEventListener('click', k);
        boot.style.display = 'none';
        startBootScreen();
      };
      setTimeout(function() {
        document.addEventListener('keydown', k);
        document.addEventListener('click', k);
      }, 500);
      return;
    }
    var scenarios = {
      pukdos6: { icon: '💾', title: 'PukDOS 6.0', sub: 'Загрузка MS-DOS-совместимой оболочки...', msgs: ['Инициализация дискеты...','Загрузка PukDOS 6.0...','Проверка CONFIG.PUK...','Выполнение AUTOEXEC.PUK...','PukDOS готов.'], final: function(){ _bootDOSMode(onDone); } },
      setup95: { icon: '💾', title: 'ПУКДОС 95 Setup', sub: 'Установка операционной системы...', msgs: ['Чтение установочных файлов...','Копирование ядра...','Настройка реестра пуков...','Установка драйверов...','Подготовка к установке...'], final: function(){ _bootSetup95(onDone); } },
      antigas: { icon: '💾', title: 'АнтиГаз 2.4', sub: 'Загрузка антивирусного диска...', msgs: ['Загрузка АнтиГаз LiveDisk...','Инициализация сканера...','Загрузка базы газовых угроз...','Монтирование файловой системы...','АнтиГаз готов к работе.'], final: function(){ _bootAntiGas(onDone); } },
      puknux:  { icon: '💾', title: 'PukNux 22.04 LTS', sub: 'Ядро PukNux 5.15.0-puk', msgs: ['[    0.000000] Booting PukNux 5.15.0...','[    0.123456] ACPI: BIOS IRQ routing is broken','[    0.456789] PUK subsystem initialized','[    1.234567] Mounting root filesystem...','[    2.000000] init: Welcome to PukNux!'], final: function(){ _bootPukNux(onDone); } }
    };
    var sc = scenarios[disk.scenario];
    _showBootUI(sc.icon, sc.title, sc.sub);
    _runBootProgress(sc.msgs, sc.final);
  });
}

function _bootFromCD(onDone) {
  var discs = [
    { label: 'ПУКДОС95 CD Edition v2',   scenario: 'cd95'      },
    { label: 'Пуколайзер PRO 2003',       scenario: 'pukpro'    },
    { label: 'Газовые симуляторы Deluxe', scenario: 'gazsim'    },
    { label: 'DOOM: Пуковая редакция',    scenario: 'doom'      },
    { label: 'Большая энциклопедия пуков',scenario: 'ency'      }
  ];
  var boot = document.getElementById('boot');
  boot.style.display = 'flex';
  var items = discs.map(function(d, i) {
    return '<div class="boot-disk-item" id="bcd_'+i+'" onclick="_cdSelected('+i+')" style="cursor:pointer;padding:4px 12px;margin:2px 0;border:1px solid transparent;font-size:12px">'+d.label+'</div>';
  }).join('');
  boot.innerHTML =
    '<div style="font-size:32px">💿</div>' +
    '<div style="font-size:15px;font-weight:bold;margin-top:6px">Выберите загрузочный диск CD/DVD</div>' +
    '<div style="color:#aaa;font-size:10px;margin-bottom:8px">↑↓ для выбора, Enter для загрузки</div>' +
    '<div id="disk-list" style="text-align:left;width:340px;border:1px inset #888;background:#000;padding:4px;font-family:monospace">' + items + '</div>' +
    '<div id="disk-status" style="color:#aaa;font-size:10px;margin-top:8px">&nbsp;</div>';
  var sel = 0;
  var diskItems = boot.querySelectorAll('.boot-disk-item');
  diskItems[0].style.background = '#0000aa'; diskItems[0].style.color = '#fff';
  window._cdSelected = function(i) {
    diskItems[sel].style.background = ''; diskItems[sel].style.color = '';
    sel = i;
    diskItems[sel].style.background = '#0000aa'; diskItems[sel].style.color = '#fff';
    document.getElementById('disk-status').textContent = 'Читаю диск: ' + discs[i].label + '...';
    setTimeout(function() { _runCDScenario(discs[i], onDone); }, 700);
  };
  var keyH2 = function(e) {
    if (e.key === 'ArrowDown') { diskItems[sel].style.background=''; diskItems[sel].style.color=''; sel=(sel+1)%discs.length; diskItems[sel].style.background='#0000aa'; diskItems[sel].style.color='#fff'; }
    if (e.key === 'ArrowUp')   { diskItems[sel].style.background=''; diskItems[sel].style.color=''; sel=(sel-1+discs.length)%discs.length; diskItems[sel].style.background='#0000aa'; diskItems[sel].style.color='#fff'; }
    if (e.key === 'Enter')     { document.removeEventListener('keydown', keyH2); _cdSelected(sel); }
  };
  document.addEventListener('keydown', keyH2);
}

function _runCDScenario(disc, onDone) {
  function _thenBoot(cdApp) {
    if (cdApp) window._pendingCDApp = cdApp;
    _bootFromHDD(onDone);
  }

  var cdScenes = {
    cd95:   { icon:'💿', title:'ПУКДОС 95 CD', sub:'Полная установка с диска...', msgs:['Запуск с CD...','Загрузка мастера установки...','Проверка требований...','Подготовка диска...','Запуск установщика ПУКДОС 95!'], final: function(){ _bootSetup95(function(){ _thenBoot(null); }); } },
    pukpro: { icon:'💿', title:'Пуколайзер PRO', sub:'Максимальные пуки для максимальных нужд', msgs:['Загрузка Пуколайзер PRO...','Инициализация турбо-пука...','Активация лицензии...','Оптимизация газовых каналов...','Готов к работе!'], final: function(){ _thenBoot('pukpro'); } },
    gazsim: { icon:'💿', title:'Газовые симуляторы Deluxe', sub:'Профессиональная симуляция', msgs:['Чтение диска...','Загрузка физического движка...','Инициализация частиц...','Подготовка сценариев...','Запуск симулятора...'], final: function(){ _thenBoot('gazsim'); } },
    doom:   { icon:'💿', title:'DOOM: Пуковая редакция', sub:'id Software + ПУКПРОМ', msgs:['Загрузка WAD...','Инициализация рендерера...','Загрузка звуков пуков...','Настройка управления...','DOOM готов. Убивай монстров!'], final: function(){ _thenBoot('doom'); } },
    ency:   { icon:'💿', title:'Энциклопедия Пуков', sub:'2000+ статей о пуках', msgs:['Чтение индекса...','Загрузка иллюстраций...','Инициализация поиска...','Проверка целостности...','Энциклопедия готова.'], final: function(){ _thenBoot('ency'); } }
  };
  var sc = cdScenes[disc.scenario] || cdScenes['cd95'];
  _showBootUI(sc.icon, sc.title, sc.sub);
  _runBootProgress(sc.msgs, sc.final);
}

// ==================== PUKDOS 6.0 TERMINAL ====================
function _bootDOSMode(onExitToPukdos) {
  var boot = document.getElementById('boot');
  boot.style.display = 'flex';
  boot.style.alignItems = 'flex-start';
  boot.style.justifyContent = 'flex-start';
  boot.innerHTML =
    '<div style="width:100%;height:100%;display:flex;flex-direction:column;padding:8px;box-sizing:border-box">' +
      '<div id="dos-output" style="flex:1;overflow-y:auto;font-family:\'Courier New\',monospace;font-size:13px;line-height:1.5;white-space:pre-wrap;word-break:break-all"></div>' +
      '<div style="display:flex;align-items:center;margin-top:4px">' +
        '<span id="dos-prompt" style="font-family:\'Courier New\',monospace;font-size:13px;white-space:nowrap;color:#c0c0c0">C:\\&gt; </span>' +
        '<input id="dos-input" type="text" autocomplete="off" spellcheck="false" ' +
          'style="flex:1;background:transparent;border:none;outline:none;color:#c0c0c0;font-family:\'Courier New\',monospace;font-size:13px;caret-color:#c0c0c0">' +
      '</div>' +
    '</div>';

  var out = document.getElementById('dos-output');
  var inp = document.getElementById('dos-input');
  var cwd = 'C:\\';
  var _dosHistory = [];
  var _dosHistIdx = -1;

  var _dosFS = {
    'C:\\': ['CONFIG.PUK', 'AUTOEXEC.PUK', 'COMMAND.COM', 'PukDOS'],
    'C:\\PukDOS': ['EDIT.EXE', 'DEBUG.EXE', 'FORMAT.COM', 'SCANDISK.EXE'],
    'C:\\Мои документы': []
  };

  function print(text, color) {
    var line = document.createElement('div');
    if (color) line.style.color = color;
    line.textContent = text;
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
  }

  function _dosCmd(raw) {
    var parts = raw.trim().split(/\s+/);
    var cmd = parts[0].toUpperCase();
    var args = parts.slice(1);

    print(cwd + '> ' + raw);

    if (!raw.trim()) return;

    switch(cmd) {
      case 'HELP':
        print('Доступные команды PukDOS 6.0:');
        print('  VER        — версия PukDOS');
        print('  DIR        — содержимое директории');
        print('  CD <dir>   — сменить директорию');
        print('  CLS        — очистить экран');
        print('  TYPE <file>— вывести файл');
        print('  ECHO <text>— вывести текст');
        print('  SET        — переменные среды');
        print('  DATE       — текущая дата');
        print('  TIME       — текущее время');
        print('  MEM        — информация о памяти');
        print('  COPY <src> <dst> — копировать файл');
        print('  DEL <file> — удалить файл');
        print('  MD <dir>   — создать директорию');
        print('  RD <dir>   — удалить директорию');
        print('  TREE       — дерево директорий');
        print('  CHKDSK     — проверка диска');
        print('  FORMAT     — форматирование (опасно!)');
        print('  PUK        — секретная команда 💨');
        print('  EXIT       — выход в ПУКДОС 95');
        break;
      case 'VER':
        print('PukDOS Version 6.0');
        print('Copyright (C) ООО ПУКПРОМ, 1987-2001. All farts reserved.');
        break;
      case 'DIR':
        var dir = args[0] ? (cwd + args[0]).toUpperCase() : cwd;
        var files = _dosFS[cwd] || [];
        print(' Том диска C: PUK420');
        print(' Серийный номер тома: 0420-69FF');
        print('');
        print(' Каталог ' + cwd);
        print('');
        files.forEach(function(f) {
          var isDir = _dosFS[cwd + '\\' + f] !== undefined;
          var size = isDir ? '<DIR>          ' : (Math.floor(Math.random()*9999)+100)+'  ';
          var d = '01.04.1999';
          print(d + '  ' + size + ' ' + f);
        });
        print('');
        print('         ' + files.filter(function(f){ return !_dosFS[cwd+'\\'+f]; }).length + ' файл(ов)');
        print('         ' + files.filter(function(f){ return !!_dosFS[cwd+'\\'+f]; }).length + ' папок(и)');
        break;
      case 'CD':
        if (!args[0] || args[0] === '..') {
          var parts2 = cwd.replace(/\\$/, '').split('\\');
          if (parts2.length > 1) { parts2.pop(); cwd = parts2.join('\\') + (parts2.length > 1 ? '\\' : '\\'); }
          else { cwd = 'C:\\'; }
        } else {
          var newDir = cwd + args[0].toUpperCase();
          if (_dosFS[newDir]) { cwd = newDir + '\\'; }
          else { print('Каталог не найден - ' + args[0], '#f44'); }
        }
        document.getElementById('dos-prompt').textContent = cwd + '> ';
        break;
      case 'CLS':
        out.innerHTML = '';
        break;
      case 'TYPE':
        if (!args[0]) { print('Требуется имя файла.', '#f44'); break; }
        var fname = args[0].toUpperCase();
        if (fname === 'CONFIG.PUK') {
          print('[PukDOS]'); print('DEVICE=C:\\PukDOS\\PUK.SYS /puk'); print('FILES=30'); print('BUFFERS=20'); print('STACKS=9,256');
        } else if (fname === 'AUTOEXEC.PUK') {
          print('@ECHO OFF'); print('PROMPT $P$G'); print('PATH C:\\;C:\\PukDOS'); print('SET PUKMODE=MAXIMUM'); print('ECHO PukDOS готов к работе.');
        } else { print('Файл не найден - ' + args[0], '#f44'); }
        break;
      case 'ECHO':
        if (!args.length) { print('ECHO включён.'); break; }
        print(args.join(' '));
        break;
      case 'SET':
        print('COMSPEC=C:\\COMMAND.COM');
        print('PATH=C:\\;C:\\PukDOS');
        print('PROMPT=$P$G');
        print('PUKMODE=MAXIMUM');
        print('TEMP=C:\\TEMP');
        print('WINDIR=C:\\PukDOS');
        print('OS=PukDOS');
        print('OS_VER=6.0');
        break;
      case 'DATE':
        var now = new Date();
        print('Текущая дата: ' + now.toLocaleDateString('ru-RU', {weekday:'long', year:'numeric', month:'long', day:'numeric'}));
        break;
      case 'TIME':
        var now2 = new Date();
        print('Текущее время: ' + now2.toLocaleTimeString('ru-RU'));
        break;
      case 'MEM':
        print('');
        print('Типы памяти        Всего    Используется    Свободно');
        print('──────────────── ─────── ─────────────── ────────');
        print('Обычная            640K           420K      220K');
        print('Расширенная      65 536K         4 096K   61 440K');
        print('Газовый резерв   69 420K            69K   69 351K');
        print('');
        print('Итого памяти доступно: 61 660K');
        break;
      case 'COPY':
        if (args.length < 2) { print('Синтаксис: COPY <источник> <назначение>', '#f44'); break; }
        print('Скопировано файлов: 1');
        break;
      case 'DEL':
        if (!args[0]) { print('Требуется имя файла.', '#f44'); break; }
        print('Удалить ' + args[0] + '? (Y/N) Y');
        print(args[0] + ' удалён.');
        break;
      case 'MD': case 'MKDIR':
        if (!args[0]) { print('Синтаксис: MD <имя>', '#f44'); break; }
        _dosFS[cwd + args[0].toUpperCase()] = [];
        (_dosFS[cwd] = _dosFS[cwd] || []).push(args[0].toUpperCase());
        print('Директория создана.');
        break;
      case 'RD': case 'RMDIR':
        if (!args[0]) { print('Синтаксис: RD <имя>', '#f44'); break; }
        print('Директория удалена.');
        break;
      case 'TREE':
        print(cwd);
        (Object.keys(_dosFS)).filter(function(k){ return k.startsWith(cwd) && k !== cwd; }).forEach(function(k) {
          var depth = k.split('\\').length - cwd.split('\\').length;
          print(Array(depth).join('  ') + '├─ ' + k.split('\\').pop());
        });
        break;
      case 'CHKDSK':
        print('');
        print('CHKDSK проверяет диск C:...');
        setTimeout(function(){ print('420 МБ всего на диске'); print('69 МБ занято'); print('351 МБ свободно'); print('0 потерянных кластеров пуков'); print(''); print('CHKDSK завершён.'); }, 800);
        break;
      case 'FORMAT':
        print('WARNING: Форматирование уничтожит все пуки на диске C:!', '#ff0');
        print('Введите "YES" для продолжения... Или нет. Лучше нет.', '#ff0');
        print('Форматирование отменено. Пуки спасены.', '#0f0');
        break;
      case 'PUK':
        print('');
        print('        💨💨💨💨💨💨💨💨💨💨', '#ff0');
        print('     ПУКДОС 6.0 — МАКСИМАЛЬНЫЙ ПУК!', '#ff0');
        print('        💨💨💨💨💨💨💨💨💨💨', '#ff0');
        print('');
        playWin95Sound && playWin95Sound('startup');
        break;
      case 'EXIT': case 'WIN':
        print('');
        print('Загрузка ПУКДОС 95...', '#0ff');
        setTimeout(function() {
          boot.style.transition = 'opacity 0.4s'; boot.style.opacity = '0';
          setTimeout(function() {
            boot.style.display = 'none'; boot.style.opacity = '';
            boot.style.alignItems = ''; boot.style.justifyContent = '';
            if (onExitToPukdos) _bootFromHDD(onExitToPukdos);
            else showLoginScreen();
          }, 400);
        }, 800);
        break;
      default:
        print('\'' + parts[0] + '\' не является внутренней командой PukDOS,', '#f44');
        print('исполняемой программой или пакетным файлом.', '#f44');
    }
    print('');
  }

  inp.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var val = inp.value;
      _dosHistory.unshift(val);
      _dosHistIdx = -1;
      inp.value = '';
      _dosCmd(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (_dosHistIdx < _dosHistory.length - 1) { _dosHistIdx++; inp.value = _dosHistory[_dosHistIdx]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (_dosHistIdx > 0) { _dosHistIdx--; inp.value = _dosHistory[_dosHistIdx]; }
      else { _dosHistIdx = -1; inp.value = ''; }
    }
  });

  // Boot sequence then show prompt
  var bootLines = [
    'PukDOS Version 6.0',
    'Copyright (C) ООО ПУКПРОМ, 1987-2001. All farts reserved.',
    '',
    'Загрузка HIMEM.SYS... OK',
    'Загрузка PUK.SYS... OK (420 пуков в памяти)',
    'Загрузка AUTOEXEC.PUK...',
    '',
    'Добро пожаловать в PukDOS 6.0!',
    'Введите HELP для списка команд. EXIT для выхода в ПУКДОС 95.',
    ''
  ];
  var li = 0;
  var iv = setInterval(function() {
    if (li < bootLines.length) { print(bootLines[li]); li++; }
    else { clearInterval(iv); inp.focus(); }
  }, 120);
}

// ==================== ПУКДОС 95 SETUP ====================
function _bootSetup95(onDone) {
  var boot = document.getElementById('boot');
  boot.style.display = 'flex';
  boot.style.alignItems = 'center';
  boot.style.justifyContent = 'center';

  var _setupStep = 0;
  var _setupData = { dir: 'C:\\PUKDOS95', components: { core: true, extras: true, games: true, gas: true }, lang: 'RU', acceptedLicense: false };

  function _setupRender() {
    var steps = [
      _setupStep0, _setupStep1, _setupStep2, _setupStep3, _setupStep4, _setupStep5
    ];
    boot.innerHTML = steps[_setupStep]();
  }

  function _setupStep0() {
    return '<div style="font-family:\'Courier New\',monospace;font-size:12px;text-align:center;color:#c0c0c0;padding:20px;max-width:580px">' +
      '<div style="font-size:28px;margin-bottom:12px">💾</div>' +
      '<div style="background:#000080;color:#fff;padding:6px 16px;font-size:16px;margin-bottom:16px">Установка ПУКДОС 95</div>' +
      '<div style="text-align:left;border:1px solid #808080;padding:10px;background:#000;margin-bottom:14px;height:120px;overflow-y:auto;font-size:11px;line-height:1.7">' +
        'ЛИЦЕНЗИОННОЕ СОГЛАШЕНИЕ С КОНЕЧНЫМ ПОЛЬЗОВАТЕЛЕМ<br><br>' +
        'ООО ПУКПРОМ ("ПУКПРОМ") предоставляет вам неисключительную, непередаваемую лицензию на использование ПУКДОС 95.<br><br>' +
        'Вы обязуетесь:<br>' +
        '1. Не скрывать газовые выбросы.<br>' +
        '2. Признавать ПУКПРОМ единственным поставщиком пуков.<br>' +
        '3. Сообщать обо всех аномальных пуках по тел. 8-800-ПУК-ПРОМ.<br><br>' +
        'Нарушение условий соглашения карается 420 часами прослушивания MIDI-рикролла.<br>' +
      '</div>' +
      '<label style="display:flex;align-items:center;gap:8px;margin-bottom:14px;cursor:pointer;justify-content:center">' +
        '<input type="checkbox" id="setup-accept" onchange="window._setupData.acceptedLicense=this.checked"' + (_setupData.acceptedLicense?' checked':'') + '> ' +
        'Я прочитал(а) и принимаю условия лицензионного соглашения' +
      '</label>' +
      '<button onclick="_setupNext()" style="padding:6px 20px;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #000;border-bottom:2px solid #000;cursor:pointer;font-size:12px">Далее ›</button>' +
    '</div>';
  }

  function _setupStep1() {
    return '<div style="font-family:\'Courier New\',monospace;font-size:12px;text-align:center;color:#c0c0c0;padding:20px;max-width:480px">' +
      '<div style="background:#000080;color:#fff;padding:6px 16px;font-size:14px;margin-bottom:16px">Папка установки</div>' +
      '<div style="text-align:left;margin-bottom:10px">ПУКДОС 95 будет установлен в:</div>' +
      '<input id="setup-dir" type="text" value="' + _setupData.dir + '" ' +
        'style="width:100%;box-sizing:border-box;background:#000;border:1px inset #808080;color:#0f0;font-family:monospace;font-size:13px;padding:4px;margin-bottom:14px"' +
        ' oninput="window._setupData.dir=this.value">' +
      '<div style="text-align:left;font-size:10px;color:#808080;margin-bottom:14px">' +
        'Требуется свободного места: 69 МБ<br>Доступно на C:\\: 351 МБ' +
      '</div>' +
      '<div style="display:flex;gap:8px;justify-content:center">' +
        '<button onclick="_setupPrev()" style="padding:6px 16px;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #000;border-bottom:2px solid #000;cursor:pointer;font-size:12px">‹ Назад</button>' +
        '<button onclick="_setupNext()" style="padding:6px 16px;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #000;border-bottom:2px solid #000;cursor:pointer;font-size:12px">Далее ›</button>' +
      '</div>' +
    '</div>';
  }

  function _setupStep2() {
    var comps = [
      { id:'core', label:'Ядро ПУКДОС 95 (обязательно)', size:'25 МБ', disabled:true },
      { id:'extras', label:'Дополнительные компоненты', size:'18 МБ', disabled:false },
      { id:'games', label:'Игры и развлечения', size:'12 МБ', disabled:false },
      { id:'gas', label:'Газовый сопроцессор', size:'14 МБ', disabled:false }
    ];
    return '<div style="font-family:\'Courier New\',monospace;font-size:12px;text-align:center;color:#c0c0c0;padding:20px;max-width:480px">' +
      '<div style="background:#000080;color:#fff;padding:6px 16px;font-size:14px;margin-bottom:16px">Компоненты установки</div>' +
      '<div style="text-align:left;margin-bottom:8px">Выберите компоненты для установки:</div>' +
      comps.map(function(c) {
        return '<label style="display:flex;align-items:center;gap:8px;margin-bottom:6px;cursor:pointer">' +
          '<input type="checkbox" ' + (c.disabled ? 'disabled checked' : 'onchange="window._setupData.components.' + c.id + '=this.checked"' + (_setupData.components[c.id] ? ' checked' : '')) + '> ' +
          '<span style="flex:1">' + c.label + '</span>' +
          '<span style="color:#808080">' + c.size + '</span>' +
        '</label>';
      }).join('') +
      '<div style="display:flex;gap:8px;justify-content:center;margin-top:14px">' +
        '<button onclick="_setupPrev()" style="padding:6px 16px;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #000;border-bottom:2px solid #000;cursor:pointer;font-size:12px">‹ Назад</button>' +
        '<button onclick="_setupNext()" style="padding:6px 16px;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #000;border-bottom:2px solid #000;cursor:pointer;font-size:12px">Далее ›</button>' +
      '</div>' +
    '</div>';
  }

  function _setupStep3() {
    return '<div style="font-family:\'Courier New\',monospace;font-size:12px;text-align:center;color:#c0c0c0;padding:20px;max-width:480px">' +
      '<div style="background:#000080;color:#fff;padding:6px 16px;font-size:14px;margin-bottom:16px">Язык системы</div>' +
      '<div style="text-align:left;margin-bottom:10px">Выберите язык интерфейса:</div>' +
      '<select id="setup-lang" onchange="window._setupData.lang=this.value" style="width:100%;background:#000;color:#0f0;border:1px inset #808080;font-family:monospace;font-size:13px;padding:4px;margin-bottom:14px">' +
        '<option value="RU"' + (_setupData.lang==='RU'?' selected':'') + '>Русский (рекомендуется)</option>' +
        '<option value="EN"' + (_setupData.lang==='EN'?' selected':'') + '>English</option>' +
        '<option value="PUK"' + (_setupData.lang==='PUK'?' selected':'') + '>Пуковый (ограниченная поддержка)</option>' +
      '</select>' +
      '<div style="display:flex;gap:8px;justify-content:center">' +
        '<button onclick="_setupPrev()" style="padding:6px 16px;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #000;border-bottom:2px solid #000;cursor:pointer;font-size:12px">‹ Назад</button>' +
        '<button onclick="_setupNext()" style="padding:6px 16px;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #000;border-bottom:2px solid #000;cursor:pointer;font-size:12px">Далее ›</button>' +
      '</div>' +
    '</div>';
  }

  function _setupStep4() {
    // Installation progress
    var html = '<div style="font-family:\'Courier New\',monospace;font-size:12px;text-align:center;color:#c0c0c0;padding:20px;max-width:480px">' +
      '<div style="background:#000080;color:#fff;padding:6px 16px;font-size:14px;margin-bottom:16px">Установка ПУКДОС 95...</div>' +
      '<div id="setup-progress-bar" style="width:100%;background:#000;border:1px inset #808080;height:20px;margin-bottom:8px">' +
        '<div id="setup-progress-fill" style="width:0%;height:100%;background:#0000aa;transition:width 0.3s"></div>' +
      '</div>' +
      '<div id="setup-progress-pct" style="margin-bottom:8px">0%</div>' +
      '<div id="setup-progress-msg" style="font-size:10px;color:#808080;height:16px">Копирование файлов...</div>' +
    '</div>';

    setTimeout(function() {
      var msgs = [
        'Копирование PukDOS95.CAB...',
        'Установка ядра системы...',
        'Регистрация компонентов...',
        'Установка газового драйвера...',
        'Настройка реестра пуков...',
        'Копирование системных файлов...',
        'Установка драйверов устройств...',
        'Настройка сетевых компонентов...',
        'Создание групп программ...',
        'Финальная настройка...',
        'Установка завершена!'
      ];
      var pct = 0;
      var mi = 0;
      var iv = setInterval(function() {
        pct += 7 + Math.random() * 5;
        if (pct > 100) pct = 100;
        var fill = document.getElementById('setup-progress-fill');
        var pctEl = document.getElementById('setup-progress-pct');
        var msgEl = document.getElementById('setup-progress-msg');
        if (fill) fill.style.width = pct + '%';
        if (pctEl) pctEl.textContent = Math.floor(pct) + '%';
        if (msgEl) msgEl.textContent = msgs[Math.min(mi++, msgs.length - 1)];
        if (pct >= 100) {
          clearInterval(iv);
          setTimeout(function() {
            _setupStep = 5;
            _setupRender();
          }, 800);
        }
      }, 500);
    }, 100);

    return html;
  }

  function _setupStep5() {
    // Mark first run done since we just installed
    localStorage.setItem('pukdos_first_run', '1');
    return '<div style="font-family:\'Courier New\',monospace;font-size:12px;text-align:center;color:#c0c0c0;padding:24px;max-width:480px">' +
      '<div style="font-size:36px;margin-bottom:12px">✅</div>' +
      '<div style="background:#006400;color:#fff;padding:6px 16px;font-size:14px;margin-bottom:16px">Установка завершена!</div>' +
      '<div style="text-align:left;line-height:1.8;margin-bottom:16px">' +
        '✔ ПУКДОС 95 успешно установлен в ' + _setupData.dir + '<br>' +
        '✔ Язык интерфейса: ' + (_setupData.lang === 'RU' ? 'Русский' : _setupData.lang === 'EN' ? 'English' : 'Пуковый') + '<br>' +
        '✔ Газовый сопроцессор: ' + (_setupData.components.gas ? 'установлен' : 'пропущен') + '<br>' +
        '✔ Игры: ' + (_setupData.components.games ? 'установлены' : 'пропущены') + '<br>' +
        '<br>' +
        '<span style="color:#ff0">Для завершения установки требуется перезагрузка.</span>' +
      '</div>' +
      '<button onclick="_setupFinish()" style="padding:8px 24px;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #000;border-bottom:2px solid #000;cursor:pointer;font-size:13px;font-weight:bold">Перезагрузить сейчас ›</button>' +
    '</div>';
  }

  window._setupNext = function() {
    if (_setupStep === 0 && !_setupData.acceptedLicense) {
      boot.querySelector('#setup-accept') && (boot.querySelector('#setup-accept').style.outline = '2px solid red');
      return;
    }
    if (_setupStep < 5) { _setupStep++; _setupRender(); }
  };
  window._setupPrev = function() {
    if (_setupStep > 0) { _setupStep--; _setupRender(); }
  };
  window._setupFinish = function() {
    // Show restarting screen
    boot.innerHTML =
      '<div style="text-align:center;color:#c0c0c0;font-family:\'Courier New\',monospace">' +
        '<div style="font-size:32px;margin-bottom:12px">🔄</div>' +
        '<div style="font-size:16px;font-weight:bold;margin-bottom:8px">Перезагрузка системы...</div>' +
        '<div style="font-size:11px;color:#808080">ПУКДОС 95 установлен. Выполняется перезагрузка.<br>Пожалуйста, подождите.</div>' +
      '</div>';
    // Reset all non-BIOS localStorage keys
    setTimeout(function() {
      try {
        var biosData = localStorage.getItem('pukdos_bios');
        localStorage.clear();
        if (biosData) localStorage.setItem('pukdos_bios', biosData);
        // firstRun flag: NOT set — so setup wizard will run on next boot
        // (pukdos_first_run is intentionally not restored)
      } catch(e) {}
      // Full page reload to restart from BIOS
      location.reload();
    }, 2500);
  };
  // Expose _setupData globally so inline HTML handlers (onchange/oninput) can write to it
  window._setupData = _setupData;

  _setupRender();
}

// ==================== PUKNUX TERMINAL ====================
function _bootPukNux(onExitToPukdos) {
  var boot = document.getElementById('boot');
  boot.style.display = 'flex';
  boot.style.alignItems = 'flex-start';
  boot.style.justifyContent = 'flex-start';
  boot.innerHTML =
    '<div style="width:100%;height:100%;display:flex;flex-direction:column;padding:8px;box-sizing:border-box;background:#1a1a1a">' +
      '<div id="nux-output" style="flex:1;overflow-y:auto;font-family:\'Courier New\',monospace;font-size:12px;line-height:1.5;white-space:pre-wrap;word-break:break-all;color:#d0d0d0"></div>' +
      '<div style="display:flex;align-items:center;margin-top:4px">' +
        '<span id="nux-prompt" style="font-family:\'Courier New\',monospace;font-size:12px;white-space:nowrap;color:#00aa00">puk@puknux:~$ </span>' +
        '<input id="nux-input" type="text" autocomplete="off" spellcheck="false" ' +
          'style="flex:1;background:transparent;border:none;outline:none;color:#d0d0d0;font-family:\'Courier New\',monospace;font-size:12px;caret-color:#d0d0d0">' +
      '</div>' +
    '</div>';

  var out = document.getElementById('nux-output');
  var inp = document.getElementById('nux-input');
  var _cwd = '/home/puk';
  var _nuxHistory = [];
  var _nuxHistIdx = -1;
  var _nuxFS = {
    '/': ['home', 'etc', 'bin', 'usr', 'var', 'tmp', 'proc'],
    '/home': ['puk'],
    '/home/puk': ['README.puk', '.bashrc', 'Документы', 'Загрузки'],
    '/home/puk/Документы': [],
    '/home/puk/Загрузки': ['puknux-22.04-iso.torrent'],
    '/etc': ['puk.conf', 'fstab', 'hosts', 'passwd'],
    '/bin': ['bash', 'ls', 'cat', 'grep', 'puk'],
    '/usr': ['bin', 'lib', 'share'],
    '/var': ['log'],
    '/proc': ['cpuinfo', 'meminfo', 'pukinfo']
  };
  var _nuxEnv = { USER: 'puk', HOME: '/home/puk', SHELL: '/bin/bash', PATH: '/usr/bin:/bin', PUKLEVEL: 'MAX', TERM: 'xterm-256color' };

  function nprint(text, color) {
    var line = document.createElement('div');
    if (color) line.style.color = color;
    line.innerHTML = text;
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
  }

  function _updatePrompt() {
    var disp = _cwd.replace('/home/puk', '~');
    document.getElementById('nux-prompt').textContent = '\u001b[0m' || '';
    document.getElementById('nux-prompt').innerHTML =
      '<span style="color:#00aa00">puk@puknux</span>' +
      '<span style="color:#d0d0d0">:</span>' +
      '<span style="color:#4488ff">' + disp + '</span>' +
      '<span style="color:#d0d0d0">$ </span>';
  }

  function _nuxCmd(raw) {
    var parts = raw.trim().split(/\s+/);
    var cmd = parts[0];
    var args = parts.slice(1);
    var disp = _cwd.replace('/home/puk', '~');
    nprint('<span style="color:#00aa00">puk@puknux</span><span style="color:#d0d0d0">:' + disp + '$ </span>' + raw.replace(/</g,'&lt;'));

    if (!raw.trim()) return;

    switch(cmd) {
      case 'help':
        nprint('Команды PukNux:');
        nprint('  ls [-la]      — список файлов');
        nprint('  cd &lt;dir&gt;      — сменить директорию');
        nprint('  pwd           — текущая директория');
        nprint('  cat &lt;file&gt;    — вывод файла');
        nprint('  echo &lt;text&gt;   — вывод текста');
        nprint('  whoami        — текущий пользователь');
        nprint('  uname -a      — информация о системе');
        nprint('  ps            — процессы');
        nprint('  top           — мониторинг ресурсов');
        nprint('  df -h         — использование диска');
        nprint('  free -h       — использование памяти');
        nprint('  env           — переменные среды');
        nprint('  mkdir &lt;dir&gt;   — создать директорию');
        nprint('  rm &lt;file&gt;     — удалить файл');
        nprint('  touch &lt;file&gt;  — создать файл');
        nprint('  grep &lt;p&gt; &lt;f&gt;  — поиск в файле');
        nprint('  history       — история команд');
        nprint('  clear         — очистить экран');
        nprint('  puk           — системная утилита 💨');
        nprint('  sudo          — суперпользователь');
        nprint('  exit          — выход в ПУКДОС 95');
        break;
      case 'ls':
        var lsDir = _nuxFS[_cwd] || [];
        var showDetails = args.includes('-l') || args.includes('-la') || args.includes('-al');
        if (showDetails) {
          nprint('total ' + (lsDir.length * 4));
          if (args.includes('-a') || args.includes('-la') || args.includes('-al')) {
            nprint('<span style="color:#4488ff">drwxr-xr-x 2 puk puk 4096 ' + new Date().toLocaleDateString('ru-RU') + ' .</span>');
            nprint('<span style="color:#4488ff">drwxr-xr-x 3 puk puk 4096 ' + new Date().toLocaleDateString('ru-RU') + ' ..</span>');
            nprint('<span style="color:#aaa">-rw-r--r-- 1 puk puk  420 ' + new Date().toLocaleDateString('ru-RU') + ' .bashrc</span>');
          }
          lsDir.forEach(function(f) {
            var isDir = !!_nuxFS[_cwd + '/' + f];
            nprint((isDir ? '<span style="color:#4488ff">drwxr-xr-x 2 puk puk 4096' : '<span style="color:#d0d0d0">-rw-r--r-- 1 puk puk  ' + (Math.floor(Math.random()*999)+100)) + ' ' + new Date().toLocaleDateString('ru-RU') + ' ' + f + '</span>');
          });
        } else {
          var colored = lsDir.map(function(f) {
            return _nuxFS[_cwd+'/'+f] ? '<span style="color:#4488ff">'+f+'</span>' : f;
          }).join('  ');
          if (colored) nprint(colored);
        }
        break;
      case 'cd':
        if (!args[0] || args[0] === '~') { _cwd = '/home/puk'; }
        else if (args[0] === '..') {
          var ps = _cwd.split('/'); ps.pop(); _cwd = ps.join('/') || '/';
        } else {
          var target = args[0].startsWith('/') ? args[0] : _cwd + '/' + args[0];
          target = target.replace(/\/+/g, '/');
          if (_nuxFS[target] !== undefined) { _cwd = target; }
          else { nprint('<span style="color:#f44">bash: cd: ' + args[0] + ': Нет такого файла или каталога</span>'); }
        }
        _updatePrompt();
        break;
      case 'pwd':
        nprint(_cwd);
        break;
      case 'cat':
        if (!args[0]) { nprint('<span style="color:#f44">cat: не указан файл</span>'); break; }
        var fname = args[0];
        var fContents = {
          'README.puk': 'PukNux 22.04 LTS (Фарт Фокс)\n\nДобро пожаловать в PukNux!\n\nОсновные команды: help, ls, cd, cat, pwd\nДля выхода в ПУКДОС 95: exit\n\nSince 2004, powered by ПУКПРОМ.',
          '.bashrc': '# ~/.bashrc PukNux bash config\nexport PUKLEVEL=MAX\nexport PS1="\\[\\e[32m\\]puk@puknux\\[\\e[0m\\]:\\[\\e[34m\\]\\w\\[\\e[0m\\]$ "\nalias ll="ls -la"\nalias puk="echo 💨"',
          'puk.conf': '[puk]\nlevel=MAXIMUM\ncoprocessor=enabled\ngas_limit=69420\nmode=turbo',
          'fstab': '/dev/sda1  /        ext4   defaults   0 1\n/dev/sda2  swap     swap   defaults   0 0\ntmpfs      /tmp     tmpfs  defaults   0 0',
          'hosts': '127.0.0.1   localhost\n127.0.1.1   puknux\n192.168.1.1 router.puk\n69.42.0.1   pukprom.ru',
          'passwd': 'root:x:0:0:root:/root:/bin/bash\npuk:x:1000:1000:Пук Пукович:/home/puk:/bin/bash',
          'cpuinfo': 'processor\t: 0\nvendor_id\t: PukProm\nmodel name\t: Pentium Puk(tm) @ 420 MHz\ncpu MHz\t\t: 420.069\ncache size\t: 420 KB\nflags\t\t: fpu puk gas fart sse',
          'meminfo': 'MemTotal:    65536 kB\nMemFree:     61440 kB\nSwapTotal:   65536 kB\nPukReserve:  69420 kB',
          'pukinfo': 'PukLevel: MAXIMUM\nGasMode: ENABLED\nFartCoprocessor: ACTIVE\nPuks/s: 420'
        };
        var content = fContents[fname.split('/').pop()];
        if (content) { content.split('\n').forEach(function(l){ nprint(l); }); }
        else { nprint('<span style="color:#f44">cat: ' + fname + ': Нет такого файла или каталога</span>'); }
        break;
      case 'echo':
        nprint(args.join(' ').replace(/\$(\w+)/g, function(_,v){ return _nuxEnv[v]||''; }));
        break;
      case 'whoami':
        nprint('puk');
        break;
      case 'uname':
        if (args.includes('-a')) {
          nprint('PukNux puknux 5.15.0-puk-amd64 #1 SMP PukProm ' + new Date().toDateString() + ' x86_64 x86_64 x86_64 GNU/PukNux');
        } else {
          nprint('PukNux');
        }
        break;
      case 'ps':
        nprint('  PID TTY          TIME CMD');
        nprint('    1 ?        00:00:01 systemd');
        nprint('   42 ?        00:00:00 pukd');
        nprint('  420 ?        00:04:20 gas-daemon');
        nprint(' 1337 pts/0    00:00:00 bash');
        nprint(' 1338 pts/0    00:00:00 ps');
        break;
      case 'top':
        nprint('<span style="color:#0f0">top - ' + new Date().toLocaleTimeString('ru-RU') + ' up 4:20,  1 user,  load average: 0.69, 0.42, 0.00</span>');
        nprint('Tasks:   6 total,   1 running,   5 sleeping');
        nprint('%Cpu(s):  4.2 us,  0.0 sy,  0.0 ni, 95.8 id,  0.0 wa');
        nprint('MiB Mem :  64.0 total,  60.0 free,   4.0 used,   0.0 buff');
        nprint('');
        nprint('  PID USER PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND');
        nprint('  420 puk  20   0  420420  69420   4200 S   4.2   0.1   4:20.69 gas-daemon');
        nprint('    1 root 20   0    8192   4096   2048 S   0.0   0.0   0:01.00 systemd');
        break;
      case 'df':
        nprint('Filesystem      Size  Used Avail Use% Mounted on');
        nprint('/dev/sda1       420M   69M  351M  17% /');
        nprint('tmpfs            64M     0   64M   0% /tmp');
        nprint('pukfs           420G  4.2G  416G   1% /puk');
        break;
      case 'free':
        nprint('              total        used        free      shared  buff/cache   available');
        nprint('Mem:          65536        4096       61440           0           0       61440');
        nprint('Swap:         65536           0       65536');
        nprint('Puk:          69420          69       69351');
        break;
      case 'env':
        Object.keys(_nuxEnv).forEach(function(k){ nprint(k + '=' + _nuxEnv[k]); });
        break;
      case 'mkdir':
        if (!args[0]) { nprint('<span style="color:#f44">mkdir: нет операнда</span>'); break; }
        var nd = (_cwd + '/' + args[0]).replace(/\/+/g, '/');
        _nuxFS[nd] = [];
        (_nuxFS[_cwd] = _nuxFS[_cwd] || []).push(args[0]);
        nprint('Директория создана: ' + args[0]);
        break;
      case 'touch':
        if (!args[0]) { nprint('<span style="color:#f44">touch: нет операнда</span>'); break; }
        (_nuxFS[_cwd] = _nuxFS[_cwd] || []).push(args[0]);
        break;
      case 'rm':
        if (!args[0]) { nprint('<span style="color:#f44">rm: нет операнда</span>'); break; }
        if (args[0] === '-rf' || args[0] === '-rf' || (args.includes('-rf') && args.includes('/'))) {
          nprint('<span style="color:#f00;font-weight:bold">rm: НЕТ. Ты серьёзно?! Пуки не трогать!</span>');
        } else {
          nprint('rm: удалён ' + (args[args.length-1] || ''));
        }
        break;
      case 'grep':
        if (args.length < 2) { nprint('<span style="color:#f44">Usage: grep &lt;pattern&gt; &lt;file&gt;</span>'); break; }
        nprint(args[1] + ':' + Math.floor(Math.random()*99+1) + ': <span style="color:#f44">' + args[0] + '</span> — пуков найдено: ' + Math.floor(Math.random()*5+1));
        break;
      case 'history':
        _nuxHistory.forEach(function(h, i){ nprint((i+1) + '  ' + h); });
        break;
      case 'clear':
        out.innerHTML = '';
        break;
      case 'puk':
        nprint('<span style="color:#ff0">💨 PukNux Gas Utility v3.14</span>');
        nprint('Газовый уровень: ' + _nuxEnv.PUKLEVEL);
        nprint('Пуков в секунду: 420');
        nprint('Статус: <span style="color:#0f0">ВСЁ ОК 💚</span>');
        playWin95Sound && playWin95Sound('startup');
        break;
      case 'sudo':
        nprint('[sudo] пароль пользователя puk: ');
        setTimeout(function(){ nprint('<span style="color:#f44">puk не входит в группу sudoers. Этот инцидент будет доложен в ПукПром.</span>'); }, 600);
        break;
      case 'apt': case 'apt-get':
        if (args[0] === 'install') {
          nprint('Чтение списков пакетов... Готово');
          nprint('Построение дерева зависимостей... Готово');
          nprint('Следующие новые пакеты будут установлены:');
          nprint('  ' + (args[1] || 'unknown-package'));
          nprint('0 обновлено, 1 добавлено, 0 удалено.');
          setTimeout(function(){ nprint('Получение: 1 ' + (args[1]||'pkg') + ' [420 kB]'); }, 300);
          setTimeout(function(){ nprint('Распаковка ' + (args[1]||'pkg') + '...'); }, 800);
          setTimeout(function(){ nprint('Настройка ' + (args[1]||'pkg') + '... Готово'); }, 1400);
        } else {
          nprint('apt: команда \'' + (args[0]||'') + '\' не поддерживается');
        }
        break;
      case 'exit': case 'reboot':
        nprint('');
        nprint('<span style="color:#0ff">Завершение сеанса PukNux...</span>');
        nprint('<span style="color:#808080">Сохранение истории bash...</span>');
        setTimeout(function() {
          boot.style.transition = 'opacity 0.4s'; boot.style.opacity = '0';
          setTimeout(function() {
            boot.style.display = 'none'; boot.style.opacity = '';
            boot.style.alignItems = ''; boot.style.justifyContent = '';
            if (onExitToPukdos) _bootFromHDD(onExitToPukdos);
            else showLoginScreen();
          }, 400);
        }, 1000);
        break;
      default:
        nprint('<span style="color:#f44">bash: ' + cmd + ': команда не найдена</span>');
    }
    nprint('');
  }

  inp.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var val = inp.value;
      _nuxHistory.unshift(val);
      _nuxHistIdx = -1;
      inp.value = '';
      _nuxCmd(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (_nuxHistIdx < _nuxHistory.length - 1) { _nuxHistIdx++; inp.value = _nuxHistory[_nuxHistIdx]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (_nuxHistIdx > 0) { _nuxHistIdx--; inp.value = _nuxHistory[_nuxHistIdx]; }
      else { _nuxHistIdx = -1; inp.value = ''; }
    }
  });

  // Kernel boot sequence then drop to shell
  var bootMsgs = [
    '[    0.000000] <span style="color:#fff">Booting PukNux kernel 5.15.0-puk-amd64</span>',
    '[    0.001000] Command line: BOOT_IMAGE=/vmlinuz-5.15.0-puk root=/dev/sda1 quiet puk=1',
    '[    0.123000] <span style="color:#0f0">ACPI: RSDP 0x00000000000F05B0 000024 (v02 PUKBRD)</span>',
    '[    0.234000] puk: <span style="color:#0ff">Puk subsystem v3.14 initialized — MAXIMUM PUK</span>',
    '[    0.345000] NET: Registered PF_INET protocol family',
    '[    0.456000] SCSI subsystem initialized',
    '[    0.600000] PCI: Using configuration type 1 for base access',
    '[    0.800000] <span style="color:#0f0">EXT4-fs (sda1): mounted filesystem with ordered data mode</span>',
    '[    1.000000] input: PUK Keyboard at /dev/input/event0',
    '[    1.200000] <span style="color:#0ff">gas-daemon: starting gas coprocessor... OK</span>',
    '[    2.000000] <span style="color:#fff">PukNux 22.04 LTS (Фарт Фокс) tty1</span>',
    '',
    'puknux login: puk',
    'Password: ●●●●●●●',
    '<span style="color:#0f0">Welcome to PukNux 22.04 LTS (GNU/PukNux 5.15.0-puk-amd64)</span>',
    '',
    ' * Документация:  https://pukprom.ru/puknux',
    ' * Газовая поддержка: 8-800-ПУК-ПРОМ',
    '',
    'Введите <span style="color:#ff0">help</span> для списка команд. <span style="color:#ff0">exit</span> для выхода в ПУКДОС 95.',
    ''
  ];
  var li = 0;
  var iv = setInterval(function() {
    if (li < bootMsgs.length) { nprint(bootMsgs[li]); li++; }
    else { clearInterval(iv); inp.focus(); }
  }, 100);
}

// ==================== АНТИГАЗ ====================
function _bootAntiGas(onDone) {
  var boot = document.getElementById('boot');
  boot.style.display = 'flex';
  var threats = [
    { name: 'Trojan.Puk.Methane.A', loc: 'C:\\WINDOWS\\SYSTEM32\\GAS.DLL', status: '✅ Обезврежен' },
    { name: 'Adware.FartBar.2001', loc: 'C:\\Program Files\\FartBar', status: '✅ Удалён' },
    { name: 'Worm.PukWorm.B', loc: 'C:\\TEMP\\WUK32.EXE', status: '✅ Помещён в карантин' }
  ];
  var threatFound = Math.random() > 0.5;
  var lines = [
    '╔══════════════════════════════════════════╗',
    '║   🛡 АнтиГаз 2.4 — Газовый Антивирус   ║',
    '╚══════════════════════════════════════════╝',
    '',
    'Версия баз: 20010420.69 (актуальна)',
    'Начинаю полное сканирование системы...',
    '',
    'Сканирование C:\\WINDOWS\\SYSTEM32...',
    'Сканирование C:\\Program Files...',
    'Сканирование C:\\TEMP...',
    'Сканирование реестра пуков...',
    'Сканирование загрузочного сектора...',
    ''
  ];

  if (threatFound) {
    lines.push('⚠ ОБНАРУЖЕНЫ УГРОЗЫ:');
    threats.forEach(function(t) {
      lines.push('  > ' + t.name);
      lines.push('    Расположение: ' + t.loc);
      lines.push('    Статус: ' + t.status);
      lines.push('');
    });
    lines.push('Итого угроз: ' + threats.length + ' | Обезврежено: ' + threats.length);
  } else {
    lines.push('✅ Угрозы не обнаружены.');
    lines.push('Газовый уровень: В НОРМЕ 💚');
    lines.push('Все пуки — доверенные и безопасные.');
  }

  lines = lines.concat([
    '',
    '══════════════════════════════════════════',
    'Сканирование завершено. Система чиста.',
    'Загрузка ПУКДОС 95...'
  ]);

  boot.innerHTML = '<div id="ag-term" style="font-family:monospace;font-size:12px;text-align:left;width:100%;max-height:100%;overflow-y:auto;padding:16px;box-sizing:border-box;line-height:1.7;color:#0f0;background:#001000"></div>';
  var term = document.getElementById('ag-term');
  var li = 0;
  var iv = setInterval(function() {
    if (li < lines.length) {
      var div = document.createElement('div');
      div.textContent = lines[li];
      if (lines[li].includes('⚠') || lines[li].includes('УГРОЗ')) div.style.color = '#ff0';
      if (lines[li].includes('✅')) div.style.color = '#0f0';
      term.appendChild(div);
      term.scrollTop = term.scrollHeight;
      li++;
    } else {
      clearInterval(iv);
      setTimeout(function() {
        boot.style.transition = 'opacity 0.4s'; boot.style.opacity = '0';
        setTimeout(function() {
          boot.style.display = 'none'; boot.style.opacity = '';
          if (onDone) _bootFromHDD(onDone);
          else showLoginScreen();
        }, 400);
      }, 1500);
    }
  }, 180);
}

function startBootScreen() {
  // Check BIOS User Password
  if (typeof _biosSet !== 'undefined' && _biosSet.userPass && _biosSet.userPassEnabled) {
    var bootEl = document.getElementById('boot');
    if (bootEl) {
      bootEl.style.display = 'flex';
      bootEl.style.alignItems = 'center';
      bootEl.style.justifyContent = 'center';
      bootEl.innerHTML =
        '<div style="text-align:center;font-family:\'Courier New\',monospace;color:#c0c0c0">' +
          '<div style="font-size:24px;margin-bottom:16px">🔒</div>' +
          '<div style="font-size:14px;font-weight:bold;margin-bottom:8px">BIOS USER PASSWORD</div>' +
          '<div style="font-size:11px;margin-bottom:12px">Введите пароль для загрузки:</div>' +
          '<input type="password" id="bios-pass-input" style="background:#000;border:1px inset #808080;color:#0f0;font-family:monospace;font-size:13px;padding:4px 8px;margin-bottom:8px;text-align:center;outline:none" autofocus>' +
          '<div id="bios-pass-err" style="color:#f00;font-size:10px;min-height:14px"></div>' +
        '</div>';
      setTimeout(function() {
        var inp = bootEl.querySelector('#bios-pass-input');
        if (inp) {
          inp.focus();
          inp.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
              if (inp.value === _biosSet.userPass) {
                bootEl.style.display = 'none';
                bootEl.style.alignItems = '';
                bootEl.style.justifyContent = '';
                _doStartBootScreen();
              } else {
                document.getElementById('bios-pass-err').textContent = 'Неверный пароль. Попробуйте ещё раз.';
                inp.value = '';
              }
            }
          });
        }
      }, 50);
      return;
    }
  }
  _doStartBootScreen();
}

function _doStartBootScreen() {
  var dev = _biosSet.bootDevice1 || 'HDD (💨)';
  if (dev === 'Floppy (💾)') {
    _bootFromFloppy(showLoginScreen);
  } else if (dev === 'CD-ROM') {
    _bootFromCD(showLoginScreen);
  } else {
    _bootFromHDD(showLoginScreen);
  }
}

function showLoginScreen() {
  var ls = document.getElementById('login-screen');
  if (!ls) { _afterLogin(); return; }
  var yr = document.getElementById('login-year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Render login UI based on current user settings
  var u = _cpSet.user;
  var loginContent = document.getElementById('login-content');
  if (loginContent) {
    loginContent.innerHTML =
      '<div style="font-size:48px;margin-bottom:8px">👤</div>' +
      '<div style="font-size:16px;font-weight:bold;margin-bottom:16px;color:#000080">' + (u.fullName || u.login || 'Пользователь') + '</div>' +
      (u.password
        ? '<input type="password" id="login-pass" placeholder="Пароль" style="width:180px;margin-bottom:8px;padding:4px;font-size:13px;border:2px inset #c0c0c0" onkeydown="if(event.key===\'Enter\')doLogin()">' +
          '<br>'
        : '') +
      '<div style="display:flex;gap:6px;justify-content:center;margin-top:4px">' +
        '<button class="w-btn" onclick="doLogin()" style="min-width:80px">OK</button>' +
        '<button class="w-btn" onclick="loginCancel()" style="min-width:80px">Отмена</button>' +
      '</div>' +
      (u.hint ? '<div style="font-size:10px;color:#808080;margin-top:8px">Подсказка: ' + u.hint + '</div>' : '');
  }

  ls.style.display = 'flex';
  setTimeout(function() {
    var inp = document.getElementById('login-pass');
    if (inp) inp.focus();
  }, 100);
}

function doLogin() {
  var u = _cpSet.user;
  var passInp = document.getElementById('login-pass');
  var entered = passInp ? passInp.value : '';

  // Check password if set
  if (u.password && entered !== u.password) {
    playWin95Sound('error');
    var passErr = document.getElementById('login-pass-err');
    if (!passErr && passInp) {
      passErr = document.createElement('div');
      passErr.id = 'login-pass-err';
      passErr.style.cssText = 'color:red;font-size:11px;margin-top:4px';
      passErr.textContent = 'Неверный пароль. Попробуйте ещё раз.';
      passInp.parentNode.insertBefore(passErr, passInp.nextSibling);
    }
    if (passInp) { passInp.value = ''; passInp.focus(); }
    return;
  }

  var ls = document.getElementById('login-screen');
  if (ls) {
    ls.style.transition = 'opacity 0.4s';
    ls.style.opacity = '0';
    setTimeout(function() { ls.style.display = 'none'; ls.style.opacity = ''; }, 400);
  }
  setTimeout(function() { _afterLogin(); }, 450);
}

function loginCancel() {
  playWin95Sound('question');
  var d = document.createElement('div');
  d.id = 'login-cancel-dlg';
  d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999995;display:flex;align-items:center;justify-content:center';
  d.innerHTML =
    '<div style="background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #000;border-bottom:2px solid #000;padding:0;min-width:280px;font-family:\'MS Sans Serif\',Arial,sans-serif;font-size:12px">' +
      '<div style="background:#000080;color:#fff;padding:3px 6px;font-weight:bold;font-size:12px;display:flex;align-items:center;gap:6px">❓ Выход из системы</div>' +
      '<div style="padding:16px 16px 8px">' +
        '<p style="margin:0 0 12px">Что вы хотите сделать?</p>' +
        '<div style="display:flex;flex-direction:column;gap:4px">' +
          '<button class="w-btn" onclick="_loginCancelAct(\'retry\')" style="text-align:left;padding:4px 10px">🔄 Повторить вход в систему</button>' +
          '<button class="w-btn" onclick="_loginCancelAct(\'shutdown\')" style="text-align:left;padding:4px 10px">🔌 Выключить компьютер</button>' +
          '<button class="w-btn" onclick="_loginCancelAct(\'reboot\')" style="text-align:left;padding:4px 10px">🔁 Перезагрузить компьютер</button>' +
          '<button class="w-btn" onclick="_loginCancelAct(\'support\')" style="text-align:left;padding:4px 10px">📞 Позвонить в ПукПром</button>' +
        '</div>' +
      '</div>' +
      '<div style="padding:8px 16px;display:flex;justify-content:flex-end">' +
        '<button class="w-btn" onclick="document.getElementById(\'login-cancel-dlg\').remove()">Закрыть</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(d);
}

function _loginCancelAct(act) {
  var dlg = document.getElementById('login-cancel-dlg');
  if (dlg) dlg.remove();
  if (act === 'retry') {
    var inp = document.getElementById('login-pass');
    if (inp) { inp.value = ''; inp.focus(); }
    var err = document.getElementById('login-pass-err');
    if (err) err.remove();
  } else if (act === 'shutdown') {
    var ls = document.getElementById('login-screen');
    if (ls) ls.style.display = 'none';
    doShutdown();
  } else if (act === 'reboot') {
    var ls2 = document.getElementById('login-screen');
    if (ls2) ls2.style.display = 'none';
    doShutdown('restart');
  } else if (act === 'support') {
    playWin95Sound('question');
    var d2 = document.createElement('div');
    d2.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999996;display:flex;align-items:center;justify-content:center';
    d2.innerHTML =
      '<div style="background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #000;border-bottom:2px solid #000;min-width:260px;font-family:\'MS Sans Serif\',Arial,sans-serif;font-size:12px">' +
        '<div style="background:#000080;color:#fff;padding:3px 6px;font-weight:bold">📞 Служба поддержки ПукПром</div>' +
        '<div style="padding:14px;line-height:1.8">' +
          '☎ Телефон: 8-800-ПУК-ПРОМ<br>' +
          '📠 Факс: +7 (420) 69-420-00<br>' +
          '📧 Email: support@pukprom.ru<br>' +
          '⏰ Режим работы: 24/7 кроме газовых праздников<br>' +
          '<span style="color:#808080;font-size:10px">Среднее время ожидания: 420 минут</span>' +
        '</div>' +
        '<div style="padding:8px;display:flex;justify-content:flex-end">' +
          '<button class="w-btn" onclick="this.closest(\'div[style*=fixed]\').remove()">Закрыть</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(d2);
  }
}

function _afterLogin() {
  // Clean up any lingering login-cancel dialogs
  var dlg = document.getElementById('login-cancel-dlg');
  if (dlg) dlg.remove();
  var desktop = document.getElementById('desktop');
  var taskbar = document.getElementById('taskbar');
  if (desktop) desktop.style.display = '';
  if (taskbar) taskbar.style.display = '';
  applyTbSettings();
  applyDesktopTheme();
  startClock();
  scheduleRandomErrors();
  // Apply saved volume
  if (_cpSet.sound) { _win95Vol = _cpSet.sound.volume / 100; }
  // Apply saved time offset
  if (_cpSet.timeOffset) { _timeOffset = _cpSet.timeOffset; }
  playWin95Sound('startup');
  // Газовый оркестр: extra ambient puk sounds
  if (_cpSet.sound && _cpSet.sound.scheme === 2) {
    setInterval(function() {
      if (Math.random() < 0.3) playWin95Sound('balloon');
    }, 30000);
  }
  // Apply cursor trails if saved
  if (_cpSet.mouse && _cpSet.mouse.trails) _applyCursorTrails(true);
  // Init desktop icons (positions, drag, context menus)
  if (typeof initDesktopIcons === 'function') initDesktopIcons();
  // First run check
  var firstRun = !localStorage.getItem('pukdos_first_run');
  if (firstRun) {
    setTimeout(function() { openApp('welcome'); }, 600);
    setTimeout(function() { startSetupWizard(); }, 1200);
  }
  // Open app requested by CD boot (after desktop is ready)
  if (window._pendingCDApp) {
    var _cdApp = window._pendingCDApp;
    window._pendingCDApp = null;
    setTimeout(function() { openApp(_cdApp); }, 1500);
  }
}

