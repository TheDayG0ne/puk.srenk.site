
// ==================== BIOS ====================
(function() {
  var biosEl = document.getElementById('bios');
  var biosOut = document.getElementById('bios-out');
  if (!biosEl || !biosOut) { startBootScreen(); return; }

  var ASCII_LOGO = [
    ' ______  __  __ __  __ ____  ____  ____  __  __',
    ' |  _ \\ | | | || |/ /|  _ \\|  _ \\/ __ \\|  \\/  |',
    ' | |_) || | | ||   / | |_) | |_) | |  | | |\\/| |',
    ' |  __/ | |_| ||   \\ |  __/|  _ <| |__| | |  | |',
    ' |_|     \\___/ |_|\\_\\|_|   |_| \\_\\\\____/|_|  |_|',
    '',
    '     P U K P R O M   S Y S T E M S   I N C.',
    '   "Технологии газового превосходства с 1993 года"',
  ];

  var BIOS_LINES = [
    { text: '', delay: 0 },
    { text: 'ПУКПРОМ BIOS v4.20.69, Copyright (C) 1993-' + new Date().getFullYear() + ' PukProm Inc.', delay: 60, color: '#fff' },
    { text: 'PukProm PUK-420 BIOS', delay: 30, color: '#fff' },
    { text: '', delay: 30 },
    { text: 'CPU: Pentium Puk(tm) @ 420 MHz', delay: 80 },
    { text: 'Coprocessor: Enabled (Gas Mode)', delay: 60 },
    { text: 'CPU CACHE: Enabled', delay: 50 },
    { text: '', delay: 30 },
    { text: 'Memory Test: ', delay: 100, noNewline: true },
    { text: '65536K OK', delay: 800, append: true, color: '#0f0' },
    { text: '', delay: 20 },
    { text: 'Extended Memory: 65536K', delay: 60 },
    { text: 'Gas Reserve Memory: 69420K', delay: 60 },
    { text: '', delay: 40 },
    { text: 'BIOS-e820: Int 15h AX=E820h fart map has 6 entries', delay: 70 },
    { text: 'Detecting Primary Master ... ПУКПРОМ HDD 420MB', delay: 200 },
    { text: 'Detecting Primary Slave  ... None', delay: 150 },
    { text: 'Detecting Secondary      ... CD-ROM ПУКПРОМ x24', delay: 150 },
    { text: '', delay: 40 },
    { text: 'PCI device listing...', delay: 80 },
    { text: '  Bus 0, device 0: VGA Puk 2MB', delay: 50 },
    { text: '  Bus 0, device 1: SoundBlaster Puk16 Pro', delay: 50 },
    { text: '  Bus 0, device 2: 56k Puk-Modem', delay: 50 },
    { text: '', delay: 40 },
    { text: 'Checking NVRAM...', delay: 120 },
    { text: 'NVRAM OK (69 пуков обнаружено)', delay: 80 },
    { text: '', delay: 50 },
    { text: 'Press DEL to enter SETUP, F1 to continue', delay: 0, color: '#ff0' },
    { text: '', delay: 30 },
    { text: 'Starting ПУКДОС 95...', delay: 1200, color: '#0ff' },
  ];

  // Render ASCII logo first (instantly)
  var logoHtml = '<pre style="color:#0aa;font-size:12px;line-height:1.4;margin:0 0 12px 0;font-family:\'Courier New\',monospace;white-space:pre">' +
    ASCII_LOGO.map(function(l){ return escHtml(l); }).join('\n') + '</pre>';
  biosOut.innerHTML = logoHtml;

  function escHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  var lineIdx = 0;
  var totalDelay = 0;

  BIOS_LINES.forEach(function(line) {
    totalDelay += line.delay;
    (function(l, t) {
      setTimeout(function() {
        if (l.append) {
          var last = biosOut.lastElementChild;
          if (last) last.innerHTML += '<span style="color:'+(l.color||'#aaa')+'">'+escHtml(l.text)+'</span>';
        } else {
          var span = document.createElement('div');
          span.style.color = l.color || '#aaa';
          span.style.minHeight = '1.6em';
          if (l.noNewline) span.style.display = 'inline';
          span.textContent = l.text;
          biosOut.appendChild(span);
        }
        // Auto-scroll
        biosEl.scrollTop = biosEl.scrollHeight;
      }, t);
    })(line, totalDelay);
  });

  // DEL key handler during BIOS
  var biosFinished = false;
  var biosSetupActive = false;
  var biosAutoTimer = null;

  function scheduleBiosEnd() {
    biosAutoTimer = setTimeout(function() {
      if (biosSetupActive) return;
      biosFinished = true;
      document.removeEventListener('keydown', biosKeyHandler);
      biosEl.style.transition = 'opacity 0.5s';
      biosEl.style.opacity = '0';
      setTimeout(function() {
        biosEl.style.display = 'none';
        startBootScreen();
      }, 500);
    }, totalDelay + 600);
  }

  function biosKeyHandler(e) {
    if ((e.key === 'Delete' || e.key === 'Del') && !biosSetupActive && !biosFinished) {
      e.preventDefault();
      biosSetupActive = true;
      clearTimeout(biosAutoTimer);
      showBiosSetup(function() {
        biosSetupActive = false;
        biosFinished = true;
        document.removeEventListener('keydown', biosKeyHandler);
        biosEl.style.transition = 'opacity 0.5s';
        biosEl.style.opacity = '0';
        setTimeout(function() {
          biosEl.style.display = 'none';
          startBootScreen();
        }, 500);
      });
    }
  }

  document.addEventListener('keydown', biosKeyHandler);
  scheduleBiosEnd();
})();

// ==================== BIOS SETUP ====================
function showBiosSetup(onExit) {
  var overlay = document.createElement('div');
  overlay.id = 'bios-setup';
  overlay.style.cssText = 'position:fixed;inset:0;background:#00007b;color:#aaa;font-family:"Courier New",monospace;font-size:13px;z-index:9999999;display:flex;flex-direction:column;align-items:stretch;justify-content:stretch;';

  var tabs = ['Main', 'Advanced', 'Boot', 'Security', 'Exit'];
  var tabIdx = 0;

  var pages = {
    Main: [
      { label: 'System Date',     value: (function(){ var d=new Date(); return d.toLocaleDateString('ru'); })(), editable: true },
      { label: 'System Time',     value: '04:20:00',        editable: true },
      { label: 'CPU',             value: 'Pentium Puk(tm) @ 420 MHz', editable: false },
      { label: 'Gas Reserve',     value: '69420 KB',        editable: false },
      { label: 'Total Memory',    value: '65536 KB',        editable: false },
      { label: 'Puk Mode',        value: 'ENABLED',         editable: true, options: ['ENABLED','DISABLED'] },
    ],
    Advanced: [
      { label: 'CPU Cache',       value: 'Enabled',         editable: true, options: ['Enabled','Disabled'] },
      { label: 'Fart Coprocessor',value: 'Enabled',         editable: true, options: ['Enabled','Disabled'] },
      { label: 'USB Legacy',      value: 'Disabled',        editable: true, options: ['Enabled','Disabled'] },
      { label: 'Gas Compression', value: 'Auto',            editable: true, options: ['Auto','Manual','Off'] },
      { label: 'Puk Voltage',     value: '1.69v',           editable: false },
      { label: 'Turbo Mode',      value: 'MAXIMUM PUK',     editable: true, options: ['MAXIMUM PUK','NORMAL','ECO'] },
    ],
    Boot: [
      { label: '1st Boot Device', value: 'Floppy (💾)',     editable: true, options: ['Floppy (💾)','HDD (💨)','CD-ROM'] },
      { label: '2nd Boot Device', value: 'HDD (💨)',        editable: true, options: ['HDD (💨)','Floppy (💾)','CD-ROM'] },
      { label: '3rd Boot Device', value: 'CD-ROM',          editable: true, options: ['CD-ROM','HDD (💨)','Floppy (💾)'] },
      { label: 'Boot Logo',       value: 'ПУКПРОМ',         editable: false },
      { label: 'Quick POST',      value: 'Disabled',        editable: true, options: ['Enabled','Disabled'] },
    ],
    Security: [
      { label: 'Supervisor Pass', value: 'puk1234',         editable: false },
      { label: 'User Password',   value: '********',        editable: false },
      { label: 'Gas Lock',        value: 'Off',             editable: true, options: ['On','Off'] },
      { label: 'Chassis Intrusion','value': 'Ignore it',    editable: false },
    ],
    Exit: [
      { label: 'Save & Exit Setup',      value: '', action: 'save', editable: true },
      { label: 'Exit Without Saving',    value: '', action: 'nosave', editable: true },
      { label: 'Load Optimal Puk Defaults', value: '', action: 'defaults', editable: true },
    ],
  };

  var rowIdx = 0;

  function render() {
    var page = pages[tabs[tabIdx]];
    var tabHtml = tabs.map(function(t, i) {
      var style = i === tabIdx
        ? 'background:#aaa;color:#00007b;padding:2px 10px;font-weight:bold;'
        : 'background:#00007b;color:#aaa;padding:2px 10px;border:1px solid #aaa;';
      return '<span style="' + style + 'cursor:pointer" data-tab="'+i+'">' + t + '</span>';
    }).join(' ');

    var rowsHtml = page.map(function(item, i) {
      var isSel = i === rowIdx;
      var bg = isSel ? 'background:#aaa;color:#00007b;' : '';
      var valStyle = item.action ? 'color:#ff0;font-weight:bold;' : 'color:#0ff;';
      return '<div style="padding:3px 12px;' + bg + 'display:flex;justify-content:space-between;width:480px;max-width:90vw">' +
        '<span>' + item.label + '</span>' +
        '<span style="' + valStyle + '">' + (item.action ? '[ ' + item.label + ' ]' : item.value) + '</span>' +
        '</div>';
    }).join('');

    overlay.innerHTML =
      '<div style="background:#00007b;color:#fff;text-align:center;padding:4px;font-weight:bold;border-bottom:2px solid #aaa;">' +
        'ПУКПРОМ BIOS SETUP UTILITY  v4.20.69' +
      '</div>' +
      '<div style="padding:4px 8px;border-bottom:1px solid #555;">' + tabHtml + '</div>' +
      '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 8px;">' +
        '<div style="border:2px solid #aaa;padding:8px;width:520px;max-width:96vw">' +
          rowsHtml +
        '</div>' +
        '<div style="margin-top:12px;color:#888;font-size:11px;text-align:center;">' +
          '← → Select Tab &nbsp;|&nbsp; ↑↓ Select Item &nbsp;|&nbsp; Enter: Toggle &nbsp;|&nbsp; F10: Save &amp; Exit &nbsp;|&nbsp; ESC: Exit' +
        '</div>' +
      '</div>' +
      '<div style="background:#00007b;color:#888;text-align:center;padding:4px;font-size:11px;border-top:1px solid #555;">' +
        'PukProm Inc. | Gas is our business | support@pukprom.puk' +
      '</div>';

    // Re-attach tab click handlers
    overlay.querySelectorAll('[data-tab]').forEach(function(el) {
      el.addEventListener('click', function() {
        tabIdx = parseInt(el.dataset.tab);
        rowIdx = 0;
        render();
      });
    });
  }

  function onKey(e) {
    var page = pages[tabs[tabIdx]];
    if (e.key === 'ArrowDown') { rowIdx = (rowIdx + 1) % page.length; render(); }
    else if (e.key === 'ArrowUp') { rowIdx = (rowIdx - 1 + page.length) % page.length; render(); }
    else if (e.key === 'ArrowRight') { tabIdx = (tabIdx + 1) % tabs.length; rowIdx = 0; render(); }
    else if (e.key === 'ArrowLeft') { tabIdx = (tabIdx - 1 + tabs.length) % tabs.length; rowIdx = 0; render(); }
    else if (e.key === 'Enter') {
      var item = page[rowIdx];
      if (item.action === 'save') {
        applyBiosSettings(pages);
        cleanup();
      } else if (item.action === 'nosave' || item.action === 'defaults') {
        if (item.action === 'defaults') resetBiosDefaults(pages);
        cleanup();
      } else if (item.options) {
        var idx = item.options.indexOf(item.value);
        item.value = item.options[(idx + 1) % item.options.length];
        render();
      }
    }
    else if (e.key === 'F10') { applyBiosSettings(pages); cleanup(); }
    else if (e.key === 'Escape') { cleanup(); }
    e.preventDefault();
  }

  function cleanup() {
    document.removeEventListener('keydown', onKey);
    overlay.style.transition = 'opacity 0.4s';
    overlay.style.opacity = '0';
    setTimeout(function() {
      overlay.remove();
      if (onExit) onExit();
    }, 400);
  }

  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);
  render();
}

// ==================== BOOT ====================
// ==================== BIOS SETTINGS STORE ====================
var _biosSet = {
  quickPost: false,
  turboMode: 'MAXIMUM PUK',
  pukMode: 'ENABLED',
  gasCompression: 'Auto',
  cpuCache: 'Enabled',
  fartCoprocessor: 'Enabled',
  bootDevice1: 'Floppy (💾)',
  gasLock: 'Off'
};

function applyBiosSettings(pages) {
  try {
    _biosSet.quickPost        = (pages.Boot.find(function(i){ return i.label==='Quick POST'; }).value === 'Enabled');
    _biosSet.turboMode        = pages.Advanced.find(function(i){ return i.label==='Turbo Mode'; }).value;
    _biosSet.pukMode          = pages.Main.find(function(i){ return i.label==='Puk Mode'; }).value;
    _biosSet.gasCompression   = pages.Advanced.find(function(i){ return i.label==='Gas Compression'; }).value;
    _biosSet.cpuCache         = pages.Advanced.find(function(i){ return i.label==='CPU Cache'; }).value;
    _biosSet.fartCoprocessor  = pages.Advanced.find(function(i){ return i.label==='Fart Coprocessor'; }).value;
    _biosSet.bootDevice1      = pages.Boot.find(function(i){ return i.label==='1st Boot Device'; }).value;
    _biosSet.gasLock          = pages.Security.find(function(i){ return i.label==='Gas Lock'; }).value;
    try { localStorage.setItem('pukdos_bios', JSON.stringify(_biosSet)); } catch(e){}
  } catch(e) {}
}

function resetBiosDefaults(pages) {
  pages.Advanced.find(function(i){ return i.label==='Turbo Mode'; }).value = 'MAXIMUM PUK';
  pages.Main.find(function(i){ return i.label==='Puk Mode'; }).value = 'ENABLED';
  pages.Advanced.find(function(i){ return i.label==='CPU Cache'; }).value = 'Enabled';
  pages.Advanced.find(function(i){ return i.label==='Fart Coprocessor'; }).value = 'Enabled';
  pages.Boot.find(function(i){ return i.label==='Quick POST'; }).value = 'Disabled';
  pages.Security.find(function(i){ return i.label==='Gas Lock'; }).value = 'Off';
}

// Load saved BIOS settings from localStorage
(function() {
  try {
    var saved = localStorage.getItem('pukdos_bios');
    if (saved) Object.assign(_biosSet, JSON.parse(saved));
  } catch(e) {}
})();

function startBootScreen() {
  var boot = document.getElementById('boot');
  boot.style.display = 'flex';

  var bootMsg = 'Microsoft — только не та';
  var bootIcon = '💨';
  if (_biosSet.pukMode === 'DISABLED') bootMsg = 'ПУК ОТКЛЮЧЁН';
  if (_biosSet.bootDevice1 === 'Floppy (💾)') bootIcon = '💾';
  else if (_biosSet.bootDevice1 === 'CD-ROM') bootIcon = '💿';

  boot.innerHTML =
    '<div style="font-size:52px">' + bootIcon + '</div>' +
    '<div style="font-size:20px;font-weight:bold;margin-top:8px">ПУКДОС 95</div>' +
    '<div style="color:#808080;font-size:11px;margin-top:4px">' + bootMsg + '</div>' +
    '<div id="boot-bar"><div id="boot-fill"></div></div>' +
    '<div id="boot-status">Инициализация пуков...</div>';

  var fill = document.getElementById('boot-fill');
  var st   = document.getElementById('boot-status');
  var msgs = ['Инициализация пуков...','Загрузка ядра ПУКДОС...','Проверка газовых резервов...','Монтирование дисков...','Запуск рабочего стола...'];
  if (_biosSet.pukMode === 'DISABLED') msgs[0] = 'Пуки отключены. Загрузка в тихом режиме...';
  if (_biosSet.fartCoprocessor === 'Disabled') msgs[2] = 'Сопроцессор пуков — ОТКЛЮЧЁН';
  if (_biosSet.bootDevice1 !== 'HDD (💨)') msgs[3] = 'Чтение с ' + _biosSet.bootDevice1 + '...';
  if (_biosSet.gasLock === 'On') msgs[4] = 'Газовый замок АКТИВЕН. Пуки заблокированы.';

  // Speed depends on Turbo Mode
  var tickMs = 180;
  var stepMin = 4, stepMax = 22;
  if (_biosSet.turboMode === 'MAXIMUM PUK') { tickMs = 80; stepMin = 15; stepMax = 35; }
  else if (_biosSet.turboMode === 'ECO')    { tickMs = 350; stepMin = 2; stepMax = 8; }

  // Quick POST = skip straight to 100%
  if (_biosSet.quickPost) {
    fill.style.width = '100%';
    st.textContent = msgs[msgs.length - 1];
    setTimeout(function() {
      boot.style.transition = 'opacity 0.3s';
      boot.style.opacity = '0';
      setTimeout(function() {
        boot.style.display = 'none';
        startClock();
        scheduleRandomErrors();
        playWin95Sound('startup');
        setTimeout(function() { openApp('welcome'); }, 300);
      }, 300);
    }, 400);
    return;
  }

  var pct = 0, mi = 0;
  var iv = setInterval(function() {
    pct += Math.random() * (stepMax - stepMin) + stepMin;
    if (pct > 100) pct = 100;
    fill.style.width = pct + '%';
    st.textContent = msgs[Math.min(mi++, msgs.length-1)];
    if (pct >= 100) {
      clearInterval(iv);
      setTimeout(function() {
        boot.style.transition = 'opacity 0.4s';
        boot.style.opacity = '0';
        setTimeout(function() {
          boot.style.display = 'none';
          startClock();
          scheduleRandomErrors();
          playWin95Sound('startup');
          setTimeout(function() { openApp('welcome'); }, 300);
        }, 400);
      }, 300);
    }
  }, tickMs);
}

// ==================== WINDOW MANAGER ====================
var _z = 100;
var _wins = {};

function createWin(cfg) {
  var id = cfg.id;
  if (_wins[id]) { focusWin(id); if (_wins[id].min) restoreWin(id); return; }
  var W = window.innerWidth, H = window.innerHeight - 28;
  var w = cfg.w || 420, h = cfg.h || 300;
  var x = cfg.x !== undefined ? cfg.x : Math.max(20, Math.min(W-w-20, 40 + Math.random()*(W-w-60)|0));
  var y = cfg.y !== undefined ? cfg.y : Math.max(20, Math.min(H-h-20, 40 + Math.random()*(H-h-60)|0));

  var el = document.createElement('div');
  el.className = 'w95win';
  el.id = 'win_'+id;
  el.style.cssText = 'left:'+x+'px;top:'+y+'px;width:'+w+'px;height:'+h+'px;z-index:'+(++_z);

  var resizeHandles = cfg.resize !== false ? [
    '<div class="wr wr-n"  data-d="n"  data-id="'+id+'"></div>',
    '<div class="wr wr-s"  data-d="s"  data-id="'+id+'"></div>',
    '<div class="wr wr-w"  data-d="w"  data-id="'+id+'"></div>',
    '<div class="wr wr-e"  data-d="e"  data-id="'+id+'"></div>',
    '<div class="wr wr-nw" data-d="nw" data-id="'+id+'"></div>',
    '<div class="wr wr-ne" data-d="ne" data-id="'+id+'"></div>',
    '<div class="wr wr-sw" data-d="sw" data-id="'+id+'"></div>',
    '<div class="wr wr-se" data-d="se" data-id="'+id+'"></div>',
  ].join('') : '';

  el.innerHTML =
    '<div class="win-titlebar" id="tb_'+id+'">' +
      '<span class="win-titlebar-icon">'+( cfg.icon||'🖥️')+'</span>' +
      '<span class="win-titlebar-text">'+cfg.title+'</span>' +
      '<div class="win-titlebar-btns">' +
        '<div class="win-titlebar-btn" title="Свернуть" onclick="minWin(\''+id+'\')">_</div>' +
        '<div class="win-titlebar-btn" title="Развернуть" onclick="maxWin(\''+id+'\')">□</div>' +
        '<div class="win-titlebar-btn" title="Закрыть" onclick="closeWin(\''+id+'\')">✕</div>' +
      '</div>' +
    '</div>' +
    (cfg.menu ? '<div class="win-menubar" id="mb_'+id+'">'+cfg.menu+'</div>' : '') +
    '<div class="win-client" id="cl_'+id+'">'+( cfg.content||'')+'</div>' +
    (cfg.status !== undefined ? '<div class="win-sb"><div class="win-sb-field" id="sb_'+id+'">'+cfg.status+'</div></div>' : '') +
    resizeHandles;

  document.getElementById('desktop').appendChild(el);
  _wins[id] = { id:id, title:cfg.title, icon:cfg.icon||'🖥️', min:false, max:false, _x:x,_y:y,_w:w,_h:h };

  // Taskbar button
  var tb = document.createElement('div');
  tb.className = 'tb-win-btn active';
  tb.id = 'tbb_'+id;
  tb.innerHTML = '<span>'+(cfg.icon||'🖥️')+'</span><span style="overflow:hidden;text-overflow:ellipsis;max-width:110px">'+cfg.title+'</span>';
  tb.onclick = function() {
    if (_wins[id] && _wins[id].min) { restoreWin(id); }
    else if (parseInt(el.style.zIndex) === _z) { minWin(id); }
    else { focusWin(id); }
  };
  tb.addEventListener('contextmenu', function(e) {
    e.preventDefault(); e.stopPropagation();
    tbWinBtnCtxMenu(e.clientX, e.clientY, id);
  });
  document.getElementById('taskbar-wins').appendChild(tb);

  initDrag(id);
  el.addEventListener('mousedown', function() { focusWin(id); });
  focusWin(id);
  if (cfg.afterOpen) setTimeout(cfg.afterOpen, 60);
}

function focusWin(id) {
  var el = document.getElementById('win_'+id); if (!el) return;
  el.style.zIndex = ++_z;
  Object.keys(_wins).forEach(function(wid) {
    var w = document.getElementById('win_'+wid); if (w) w.classList.toggle('inactive', wid!==id);
    var tb = document.getElementById('tbb_'+wid); if (tb) tb.classList.toggle('active', wid===id);
  });
}
function minWin(id) {
  var el = document.getElementById('win_'+id); if (!el) return;
  el.style.display='none'; _wins[id].min=true;
  var tb=document.getElementById('tbb_'+id); if(tb) tb.classList.remove('active');
}
function restoreWin(id) {
  var el=document.getElementById('win_'+id); if(!el) return;
  el.style.display='flex'; _wins[id].min=false; focusWin(id);
}
function maxWin(id) {
  var el=document.getElementById('win_'+id); var s=_wins[id]; if(!el||!s) return;
  if (s.max) {
    el.style.left=s._x+'px'; el.style.top=s._y+'px';
    el.style.width=s._w+'px'; el.style.height=s._h+'px';
    s.max=false;
  } else {
    s._x=parseInt(el.style.left); s._y=parseInt(el.style.top);
    s._w=el.offsetWidth; s._h=el.offsetHeight;
    el.style.left='0'; el.style.top='0';
    el.style.width='100%'; el.style.height=(window.innerHeight-28)+'px';
    s.max=true;
  }
}
function closeWin(id) {
  if (id === 'media') rrStop();
  if (id === 'taskman') { if (_tmTimer) { clearInterval(_tmTimer); _tmTimer = null; } }
  var el=document.getElementById('win_'+id); if(el) el.remove();
  var tb=document.getElementById('tbb_'+id); if(tb) tb.remove();
  delete _wins[id];
}

// ==================== DRAG ====================
function initDrag(id) {
  var tb=document.getElementById('tb_'+id);
  var el=document.getElementById('win_'+id);
  if (!tb||!el) return;
  var sx,sy,ox,oy,drag=false;
  tb.addEventListener('mousedown',function(e){
    if(e.target.classList.contains('win-titlebar-btn')) return;
    if(_wins[id]&&_wins[id].max) return;
    drag=true; sx=e.clientX; sy=e.clientY;
    ox=parseInt(el.style.left)||0; oy=parseInt(el.style.top)||0;
    e.preventDefault();
  });
  tb.addEventListener('dblclick',function(e){
    if(e.target.classList.contains('win-titlebar-btn')) return;
    maxWin(id);
  });
  document.addEventListener('mousemove',function(e){ if(!drag) return; el.style.left=(ox+e.clientX-sx)+'px'; el.style.top=(oy+e.clientY-sy)+'px'; });
  document.addEventListener('mouseup',function(){ drag=false; });
}

// ==================== RESIZE ====================
(function(){
  var rs=false,dir,el,sx,sy,sw,sh,sl,st_r;
  document.addEventListener('mousedown',function(e){
    if(!e.target.classList.contains('wr')) return;
    var id=e.target.dataset.id;
    if(_wins[id]&&_wins[id].max) return;
    el=document.getElementById('win_'+id); dir=e.target.dataset.d;
    sx=e.clientX; sy=e.clientY; sw=el.offsetWidth; sh=el.offsetHeight;
    sl=parseInt(el.style.left); st_r=parseInt(el.style.top);
    rs=true; e.preventDefault();
  });
  document.addEventListener('mousemove',function(e){
    if(!rs) return;
    var dx=e.clientX-sx, dy=e.clientY-sy, mw=180, mh=80;
    if(dir.includes('e')) el.style.width =Math.max(mw,sw+dx)+'px';
    if(dir.includes('s')) el.style.height=Math.max(mh,sh+dy)+'px';
    if(dir.includes('w')){ var nw=Math.max(mw,sw-dx); el.style.width=nw+'px'; el.style.left=(sl+sw-nw)+'px'; }
    if(dir.includes('n')){ var nh=Math.max(mh,sh-dy); el.style.height=nh+'px'; el.style.top=(st_r+sh-nh)+'px'; }
  });
  document.addEventListener('mouseup',function(){ rs=false; });
})();

// ==================== MENUS ====================
document.addEventListener('click',function(e){
  if(!e.target.closest('.win-mi')) {
    document.querySelectorAll('.win-mi.open').forEach(function(m){ m.classList.remove('open'); });
  }
});
function toggleMI(el) {
  var open=el.classList.contains('open');
  document.querySelectorAll('.win-mi.open').forEach(function(m){ m.classList.remove('open'); });
  if(!open) el.classList.add('open');
}

// ==================== START MENU ====================
function toggleSM() {
  var m=document.getElementById('start-menu');
  var b=document.getElementById('start-btn');
  m.classList.toggle('show'); b.classList.toggle('active');
}
function closeSM() {
  document.getElementById('start-menu').classList.remove('show');
  document.getElementById('start-btn').classList.remove('active');
}
document.addEventListener('click',function(e){
  if(!e.target.closest('#start-menu')&&!e.target.closest('#start-btn')) closeSM();
});

// ==================== CONTEXT MENU ====================
document.getElementById('desktop').addEventListener('contextmenu',function(e){
  e.preventDefault();
  var m=document.getElementById('ctx95');
  m.style.left=e.clientX+'px'; m.style.top=e.clientY+'px';
  m.classList.add('show');
});
document.addEventListener('click',function(e){
  if(!e.target.closest('#ctx95')) hideCtx();
  if(!e.target.closest('#ctx-popup')) hideCtxPopup();
});
document.addEventListener('contextmenu', function(e) {
  // close generic popup if click outside
  if (!e.target.closest('#ctx-popup')) hideCtxPopup();
});
function hideCtx(){ document.getElementById('ctx95').classList.remove('show'); }

// ==================== GENERIC CONTEXT MENU ====================
function showCtxPopup(x, y, items) {
  var m = document.getElementById('ctx-popup');
  var html = items.map(function(item) {
    if (item === '-') return '<div class="ctx95-sep"></div>';
    if (item.title) return '<div class="ctx-title">' + item.title + '</div>';
    var cls = 'ctx95-item' + (item.disabled ? ' dis' : '');
    var onclick = item.disabled ? '' : 'onclick="hideCtxPopup();(' + item.fn.toString() + ')()"';
    return '<div class="' + cls + '" ' + onclick + '>' + item.label + '</div>';
  }).join('');
  m.innerHTML = html;
  // Clamp to viewport
  var W = window.innerWidth, H = window.innerHeight;
  m.style.left = '-9999px'; m.style.top = '-9999px'; m.classList.add('show');
  var mw = m.offsetWidth, mh = m.offsetHeight;
  m.style.left = Math.min(x, W - mw - 4) + 'px';
  m.style.top  = Math.min(y, H - mh - 4) + 'px';
}
function hideCtxPopup() {
  document.getElementById('ctx-popup').classList.remove('show');
}

// ==================== TASKBAR CONTEXT MENU ====================
function tbCtxMenu(e) {
  // Don't show on start button, taskbar buttons, systray
  if (e.target.closest('#start-btn') || e.target.closest('#systray')) return;
  e.preventDefault();
  e.stopPropagation();
  closeSM(); hideCtx();

  var haswins = Object.keys(_wins).length > 0;
  var tbWinBtn = e.target.closest('.tb-win-btn');
  if (tbWinBtn) {
    // Right-click on a window button
    var id = tbWinBtn.id.replace('tbb_','');
    tbWinBtnCtxMenu(e.clientX, e.clientY, id);
    return;
  }

  // Right-click on empty taskbar area
  showCtxPopup(e.clientX, e.clientY - 4, [
    { title: 'Панель задач' },
    haswins ? { label: 'Каскадом', fn: function(){ tbCascade(); } }
             : { label: 'Каскадом', disabled: true },
    haswins ? { label: 'Свернуть все', fn: function(){ tbMinAll(); } }
             : { label: 'Свернуть все', disabled: true },
    haswins ? { label: 'Показать рабочий стол', fn: function(){ tbMinAll(); } }
             : { label: 'Показать рабочий стол', disabled: true },
    '-',
    { label: 'Диспетчер пуков', fn: function(){ openApp('taskman'); } },
    '-',
    { label: 'Настройки панели задач', fn: function(){ openApp('tbsettings'); } },
  ]);
}

function tbWinBtnCtxMenu(x, y, id) {
  var w = _wins[id]; if (!w) return;
  var isMin = w.min, isMax = w.max;
  showCtxPopup(x, y - 4, [
    { title: (w.icon||'') + ' ' + w.title },
    isMin  ? { label: 'Восстановить', fn: function(){ restoreWin(id); } }
           : { label: 'Восстановить', disabled: true },
    !isMax ? { label: 'Развернуть',   fn: function(){ if(w.min) restoreWin(id); maxWin(id); } }
           : { label: 'Восстановить размер', fn: function(){ maxWin(id); } },
    !isMin ? { label: 'Свернуть',     fn: function(){ minWin(id); } }
           : { label: 'Свернуть',     disabled: true },
    '-',
    { label: 'Закрыть', fn: function(){ closeWin(id); } },
  ]);
}

function tbCascade() {
  var ids = Object.keys(_wins).filter(function(id){ return !_wins[id].min; });
  ids.forEach(function(id, i) {
    var el = document.getElementById('win_'+id); if (!el) return;
    el.style.left = (30 + i * 28) + 'px';
    el.style.top  = (30 + i * 28) + 'px';
  });
}
function tbMinAll() {
  Object.keys(_wins).forEach(function(id){ if (!_wins[id].min) minWin(id); });
}

// ==================== CLOCK ====================
var _clockPopupOpen = false;
function startClock(){
  function tick(){
    var d=new Date();
    document.getElementById('clock').textContent=
      String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
    if(_clockPopupOpen) drawAnalogClock();
  }
  tick(); setInterval(tick,1000);
}

function toggleClockPopup(e) {
  e.stopPropagation();
  var p=document.getElementById('clock-popup');
  var vp=document.getElementById('vol-popup');
  if(vp) vp.style.display='none';
  _clockPopupOpen = p.style.display==='none' || !p.style.display;
  if(_clockPopupOpen){
    p.style.display='block';
    drawAnalogClock();
    renderCalendar();
  } else {
    p.style.display='none';
  }
}

function drawAnalogClock(){
  var cv=document.getElementById('clock-cv'); if(!cv) return;
  var ctx=cv.getContext('2d'), W=120, H=120, cx=60, cy=60, r=54;
  var now=new Date();
  ctx.clearRect(0,0,W,H);
  // Face
  ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='#000'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke();
  // Hour marks
  for(var i=0;i<12;i++){
    var a=i*Math.PI/6, x1=cx+Math.cos(a)*(r-4), y1=cy+Math.sin(a)*(r-4);
    var x2=cx+Math.cos(a)*(r-10), y2=cy+Math.sin(a)*(r-10);
    ctx.strokeStyle='#000'; ctx.lineWidth=i%3===0?2:1;
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  }
  // Hands
  function hand(angle, len, width, color){
    ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=width; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(angle-Math.PI/2)*len, cy+Math.sin(angle-Math.PI/2)*len);
    ctx.stroke(); ctx.restore();
  }
  var h=now.getHours()%12, m=now.getMinutes(), s=now.getSeconds();
  hand((h + m/60)*Math.PI/6, r*0.55, 4, '#000');  // hour
  hand((m + s/60)*Math.PI/30, r*0.75, 2.5, '#000'); // minute
  hand(s*Math.PI/30, r*0.85, 1, '#f00');             // second
  // Center dot
  ctx.fillStyle='#000'; ctx.beginPath(); ctx.arc(cx,cy,3,0,Math.PI*2); ctx.fill();
}

function renderCalendar(){
  var d=new Date(), y=d.getFullYear(), m=d.getMonth(), today=d.getDate();
  var months=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  var days=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  var first=new Date(y,m,1).getDay(); first=(first+6)%7; // Mon=0
  var last=new Date(y,m+1,0).getDate();
  var html='<div style="font-weight:bold;margin-bottom:4px">'+months[m]+' '+y+'</div>';
  html+='<table style="border-collapse:collapse;width:100%"><tr>';
  days.forEach(function(d){ html+='<td style="font-weight:bold;color:#000080;font-size:9px;padding:1px">'+d+'</td>'; });
  html+='</tr><tr>';
  for(var i=0;i<first;i++) html+='<td></td>';
  var col=first;
  for(var day=1;day<=last;day++){
    var style='font-size:10px;padding:1px;cursor:default;';
    if(day===today) style+='background:#000080;color:#fff;font-weight:bold;';
    html+='<td style="'+style+'">'+day+'</td>';
    col++;
    if(col===7&&day<last){ html+='</tr><tr>'; col=0; }
  }
  html+='</tr></table>';
  var el=document.getElementById('clock-cal'); if(el) el.innerHTML=html;
}

document.addEventListener('click',function(e){
  if(!e.target.closest('#clock-popup')&&!e.target.closest('#clock')){
    var p=document.getElementById('clock-popup'); if(p) p.style.display='none'; _clockPopupOpen=false;
  }
  if(!e.target.closest('#vol-popup')&&!e.target.closest('#vol-icon')){
    var v=document.getElementById('vol-popup'); if(v) v.style.display='none';
  }
});

// ==================== VOLUME ====================
var _win95Vol = 0.7;
function toggleVolPopup(e) {
  e.stopPropagation();
  var p=document.getElementById('vol-popup');
  var cp=document.getElementById('clock-popup');
  if(cp) { cp.style.display='none'; _clockPopupOpen=false; }
  p.style.display = (p.style.display==='none'||!p.style.display) ? 'block' : 'none';
  if(p.style.display==='block'){
    var sl=document.getElementById('vol-slider'); if(sl) sl.value=Math.round(_win95Vol*100);
    var pt=document.getElementById('vol-pct'); if(pt) pt.textContent=Math.round(_win95Vol*100)+'%';
  }
}
function setWin95Vol(val) {
  _win95Vol = val/100;
  var pt=document.getElementById('vol-pct'); if(pt) pt.textContent=val+'%';
  var icon=document.getElementById('vol-icon');
  if(icon) icon.textContent = val==0?'🔇':val<40?'🔉':'🔊';
  // Play puk sound snippet on change
  playVolPuk();
}
var _volPukTimer=null;
function playVolPuk(){
  if(_volPukTimer) clearTimeout(_volPukTimer);
  _volPukTimer = setTimeout(function(){
    try {
      var ac=new(window.AudioContext||window.webkitAudioContext)();
      var ns=ac.createOscillator(); var g=ac.createGain();
      ns.type='sawtooth'; ns.frequency.setValueAtTime(180,ac.currentTime);
      ns.frequency.exponentialRampToValueAtTime(60,ac.currentTime+0.3);
      g.gain.setValueAtTime(_win95Vol*0.3,ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001,ac.currentTime+0.4);
      ns.connect(g); g.connect(ac.destination);
      ns.start(ac.currentTime); ns.stop(ac.currentTime+0.45);
      setTimeout(function(){ ac.close(); },600);
    } catch(e){}
  },200);
}

// ==================== WIN95 SOUNDS ====================
function playWin95Sound(type) {
  try {
    var ac=new(window.AudioContext||window.webkitAudioContext)();
    var master=ac.createGain(); master.gain.value=_win95Vol*0.4; master.connect(ac.destination);
    var now=ac.currentTime;

    function note(freq,start,dur,vol,type){
      var o=ac.createOscillator(); var g=ac.createGain();
      o.type=type||'sine'; o.frequency.value=freq;
      g.gain.setValueAtTime(0,now+start);
      g.gain.linearRampToValueAtTime((vol||0.5),now+start+0.02);
      g.gain.setValueAtTime(vol||0.5, now+start+dur-0.05);
      g.gain.linearRampToValueAtTime(0,now+start+dur);
      o.connect(g); g.connect(master);
      o.start(now+start); o.stop(now+start+dur+0.05);
    }
    function puk(start,freq,dur){
      var ns=ac.createOscillator(); var g=ac.createGain();
      var lp=ac.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=400;
      ns.type='sawtooth';
      ns.frequency.setValueAtTime(freq||120,now+start);
      ns.frequency.exponentialRampToValueAtTime(40,now+start+(dur||0.4));
      g.gain.setValueAtTime(_win95Vol*0.25,now+start);
      g.gain.exponentialRampToValueAtTime(0.0001,now+start+(dur||0.4));
      ns.connect(lp); lp.connect(g); g.connect(master);
      ns.start(now+start); ns.stop(now+start+(dur||0.5));
    }

    if(type==='startup'){
      // Win95-style ascending startup with puk flavour
      note(330,0.0,0.18,0.4,'square');
      note(415,0.18,0.18,0.4,'square');
      note(494,0.36,0.18,0.4,'square');
      note(659,0.54,0.5, 0.5,'square');
      note(554,1.0, 0.12,0.3,'square');
      note(622,1.12,0.12,0.3,'square');
      note(659,1.24,0.5, 0.5,'square');
      note(830,1.74,0.12,0.3,'square');
      note(880,1.86,0.12,0.3,'square');
      note(740,2.0, 1.2, 0.6,'square');
      // puk accents
      puk(0.0,  140, 0.15);
      puk(0.54, 180, 0.25);
      puk(1.24, 160, 0.2);
      puk(2.0,  200, 0.5);
      setTimeout(function(){ ac.close(); },4000);
    } else if(type==='shutdown'){
      // Descending shutdown with sad puk
      note(659,0.0, 0.3, 0.5,'square');
      note(554,0.3, 0.15,0.4,'square');
      note(494,0.45,0.15,0.4,'square');
      note(415,0.6, 0.15,0.4,'square');
      note(330,0.75,0.6, 0.5,'square');
      note(220,1.35,0.5, 0.3,'square');
      puk(0.0, 120, 0.15);
      puk(0.75,100, 0.3);
      puk(1.35, 80, 0.6);
      setTimeout(function(){ ac.close(); },3000);
    }
  } catch(e){}
}

// ==================== TOAST ====================
function win95toast(msg){
  var t=document.createElement('div'); t.className='w95toast';
  t.textContent=msg; document.body.appendChild(t);
  setTimeout(function(){ t.remove(); },3000);
}

// ==================== OPEN APP ====================
function openApp(name){
  switch(name){
    case 'welcome':  appWelcome(); break;
    case 'mypc':     appMyPC(); break;
    case 'notepad':    appNotepad(); break;
    case 'calc':       appCalc(); break;
    case 'paint':      appPaint(); break;
    case 'ie':         appIE(); break;
    case 'doom':       appDoom(); break;
    case 'sysinfo':    appSysInfo(); break;
    case 'trash':      appTrash(); break;
    case 'media':      appMedia(); break;
    case 'taskman':    appTaskMan(); break;
    case 'ctrl':       appCtrlPanel(); break;
    case 'tbsettings': appTbSettings(); break;
  }
}

// ==================== WELCOME ====================
function appWelcome(){
  createWin({id:'welcome',title:'Добро пожаловать в ПУКДОС 95',icon:'💨',
    w:360,h:230,resize:false,
    x:Math.floor(window.innerWidth/2-180), y:Math.floor((window.innerHeight-28)/2-115),
    content:'<div style="padding:20px;text-align:center;line-height:1.8">'+
      '<div style="font-size:44px">💨</div>'+
      '<div style="font-size:15px;font-weight:bold;margin:6px 0">ПУКДОС 95</div>'+
      '<div>Добро пожаловать в самую важную<br>операционную систему в истории.</div>'+
      '<div style="color:#808080;font-size:10px;margin-top:6px">Версия 4.0.950 · ООО ПУКПРОМ</div>'+
      '<div style="margin-top:16px"><button class="w-btn" onclick="closeWin(\'welcome\')">OK</button></div>'+
    '</div>'
  });
}

// ==================== MY COMPUTER ====================
function appMyPC(){
  createWin({id:'mypc',title:'Мой компьютер',icon:'🖥️',w:500,h:320,status:'Объектов: 5',
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">'+
        '<div class="win-dd-item dis">Создать ярлык</div><div class="win-dd-sep"></div>'+
        '<div class="win-dd-item" onclick="closeWin(\'mypc\')">Закрыть</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Правка<div class="win-dd">'+
        '<div class="win-dd-item dis">Вырезать</div><div class="win-dd-item dis">Копировать</div>'+
        '<div class="win-dd-item dis">Вставить</div><div class="win-dd-sep"></div>'+
        '<div class="win-dd-item dis">Выделить всё</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Вид<div class="win-dd">'+
        '<div class="win-dd-item" onclick="win95toast(\'Крупные значки — уже так\')">Крупные значки</div>'+
        '<div class="win-dd-item" onclick="win95toast(\'Таблица — недоступно\')">Таблица</div>'+
        '<div class="win-dd-item" onclick="win95toast(\'Обновлено\')">Обновить</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">'+
        '<div class="win-dd-item" onclick="win95toast(\'ПУКДОС 95 v4.0.950. ООО ПУКПРОМ.\')">О системе...</div></div></div>',
    content:
      '<div class="expl-wrap">'+
        '<div class="expl-tree" id="mypc-tree">'+
          '<div class="expl-ti sel" onclick="mcSel(this,\'main\')">🖥️ Мой компьютер</div>'+
          '<div style="padding-left:12px">'+
            '<div class="expl-ti" onclick="mcSel(this,\'c\')">💾 Диск C:</div>'+
            '<div class="expl-ti" onclick="mcSel(this,\'d\')">�� Диск D:</div>'+
            '<div class="expl-ti" onclick="mcSel(this,\'a\')">📀 Диск A:</div>'+
          '</div>'+
          '<div class="expl-ti" onclick="mcSel(this,\'prn\')">🖨️ Принтеры</div>'+
          '<div class="expl-ti" onclick="mcSel(this,\'ctrl\')">⚙️ Панель управления</div>'+
        '</div>'+
        '<div class="expl-content" id="mypc-con">'+
          '<div class="expl-item" ondblclick="mcSel(document.querySelector(\'#mypc-tree .expl-ti:nth-child(2)\'),\'c\')">'+
            '<div class="ei-icon">💾</div><div class="ei-lbl">Диск C:<br>(ПУКДОС)</div></div>'+
          '<div class="expl-item" ondblclick="mcSel(document.querySelector(\'#mypc-tree .expl-ti:nth-child(3)\'),\'d\')">'+
            '<div class="ei-icon">💿</div><div class="ei-lbl">Диск D:<br>(ГАЗОВЫЙ)</div></div>'+
          '<div class="expl-item" ondblclick="win95toast(\'Диск A: не готов. Вставьте дискету.\')">'+
            '<div class="ei-icon">📀</div><div class="ei-lbl">Диск A:<br>(3½ дюйма)</div></div>'+
          '<div class="expl-item" ondblclick="win95toast(\'Принтер не найден.\')">'+
            '<div class="ei-icon">🖨️</div><div class="ei-lbl">Принтеры</div></div>'+
          '<div class="expl-item" ondblclick="openApp(\'sysinfo\')">'+
            '<div class="ei-icon">⚙️</div><div class="ei-lbl">Панель управления</div></div>'+
        '</div>'+
      '</div>'
  });
}
function mcSel(el,type){
  if(!el) return;
  el.closest('.expl-tree').querySelectorAll('.expl-ti').forEach(function(t){ t.classList.remove('sel'); });
  el.classList.add('sel');
  var con=document.getElementById('mypc-con'); if(!con) return;
  var sb=document.getElementById('sb_mypc');
  if(type==='c'){
    con.innerHTML='<div class="expl-item" ondblclick="appNotepad()"><div class="ei-icon">📄</div><div class="ei-lbl">README.PUK</div></div>'+
      '<div class="expl-item" ondblclick="win95toast(\'Папка Windows — доступ запрещён.\')"><div class="ei-icon">📁</div><div class="ei-lbl">Windows</div></div>'+
      '<div class="expl-item" ondblclick="win95toast(\'420 программ установлено\')"><div class="ei-icon">📁</div><div class="ei-lbl">Program Files</div></div>'+
      '<div class="expl-item" ondblclick="win95toast(\'Временные пуки очищены\')"><div class="ei-icon">📁</div><div class="ei-lbl">TEMP</div></div>'+
      '<div class="expl-item" ondblclick="win95toast(\'пук.exe — исполняемый файл пука\')"><div class="ei-icon">⚙️</div><div class="ei-lbl">пук.exe</div></div>';
    if(sb) sb.textContent='Диск C: — 5 объектов | 420 МБ свободно';
  } else if(type==='d'){
    con.innerHTML='<div style="color:#808080;padding:20px;text-align:center">Диск D: пуст.<br>Как твой аргумент.</div>';
    if(sb) sb.textContent='Диск D: — 0 объектов | 696 МБ свободно';
  } else if(type==='a'){
    con.innerHTML='<div style="color:#808080;padding:20px;text-align:center">⚠ Диск A: не готов.<br>Вставьте дискету с пуками.</div>';
    if(sb) sb.textContent='Диск A: — не готов';
  } else if(type==='prn'){
    con.innerHTML='<div style="color:#808080;padding:20px;text-align:center">🖨️ Принтеров не найдено.<br>Пук-матричный принтер отключён.</div>';
    if(sb) sb.textContent='Принтеры — 0 объектов';
  } else if(type==='ctrl'){
    con.innerHTML='<div class="expl-item" ondblclick="openApp(\'sysinfo\')"><div class="ei-icon">🖥️</div><div class="ei-lbl">Система</div></div>'+
      '<div class="expl-item" ondblclick="win95toast(\'Звук: МАКСИМАЛЬНЫЙ ПУК\')"><div class="ei-icon">🔊</div><div class="ei-lbl">Звук</div></div>'+
      '<div class="expl-item" ondblclick="win95toast(\'Сеть: 56k, пинг 9999\')"><div class="ei-icon">🌐</div><div class="ei-lbl">Сеть</div></div>'+
      '<div class="expl-item" ondblclick="win95toast(\'Нет принтера.\')"><div class="ei-icon">🖨️</div><div class="ei-lbl">Принтеры</div></div>';
    if(sb) sb.textContent='Панель управления — 4 объекта';
  } else {
    con.innerHTML='<div class="expl-item" ondblclick="mcSel(document.querySelector(\'#mypc-tree .expl-ti\'),\'c\')"><div class="ei-icon">💾</div><div class="ei-lbl">Диск C:</div></div>'+
      '<div class="expl-item"><div class="ei-icon">💿</div><div class="ei-lbl">Диск D:</div></div>'+
      '<div class="expl-item"><div class="ei-icon">📀</div><div class="ei-lbl">Диск A:</div></div>'+
      '<div class="expl-item"><div class="ei-icon">🖨️</div><div class="ei-lbl">Принтеры</div></div>'+
      '<div class="expl-item" ondblclick="openApp(\'sysinfo\')"><div class="ei-icon">⚙️</div><div class="ei-lbl">Панель управления</div></div>';
    if(sb) sb.textContent='Объектов: 5';
  }
}

// ==================== NOTEPAD ====================
var _npIdx=0;
function appNotepad(){
  var uid='np'+(++_npIdx);
  var def=_npIdx===1?'ПУКДОС 95 — Блокнот\r\n================\r\nДанный файл создан ООО ПУКПРОМ.\r\nВсе совпадения с реальными пуками случайны.\r\n\r\nТип: C:\\README.PUK':'';
  createWin({id:uid,title:'Безымянный — Блокнот',icon:'📝',w:480,h:300,status:'Стр: 1 | Сим: '+def.length,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">'+
        '<div class="win-dd-item" onclick="npNew(\''+uid+'\')">Создать</div>'+
        '<div class="win-dd-item dis">Открыть...</div>'+
        '<div class="win-dd-item" onclick="npSave(\''+uid+'\')">Сохранить</div>'+
        '<div class="win-dd-item" onclick="npSaveAs(\''+uid+'\')">Сохранить как...</div>'+
        '<div class="win-dd-sep"></div>'+
        '<div class="win-dd-item" onclick="npPrint()">Печать...</div>'+
        '<div class="win-dd-sep"></div>'+
        '<div class="win-dd-item" onclick="closeWin(\''+uid+'\')">Выход</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Правка<div class="win-dd">'+
        '<div class="win-dd-item" onclick="npUndo(\''+uid+'\')">Отменить</div>'+
        '<div class="win-dd-sep"></div>'+
        '<div class="win-dd-item" onclick="npCut(\''+uid+'\')">Вырезать</div>'+
        '<div class="win-dd-item" onclick="npCopy(\''+uid+'\')">Копировать</div>'+
        '<div class="win-dd-item" onclick="npPaste(\''+uid+'\')">Вставить</div>'+
        '<div class="win-dd-item" onclick="npSelectAll(\''+uid+'\')">Выделить всё</div>'+
        '<div class="win-dd-sep"></div>'+
        '<div class="win-dd-item" onclick="npDate(\''+uid+'\')">Время/Дата</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Формат<div class="win-dd">'+
        '<div class="win-dd-item dis">Перенос по словам ✓</div>'+
        '<div class="win-dd-item dis">Шрифт...</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">'+
        '<div class="win-dd-item" onclick="win95toast(\'Блокнот ПУКДОС 95. Пишешь — значит живёшь.\')">О программе</div></div></div>',
    content:'<textarea class="notepad-area" id="npa_'+uid+'" spellcheck="false" oninput="npUpd(\''+uid+'\')">'+def+'</textarea>'
  });
}
function npNew(id){ var t=document.getElementById('npa_'+id); if(t) t.value=''; npUpd(id); }
function npSave(id){ npSaveAs(id); }
function npSaveAs(id){
  var t=document.getElementById('npa_'+id); if(!t) return;
  var b=new Blob([t.value],{type:'text/plain'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='пук.txt'; a.click();
  win95toast('Сохранено: пук.txt');
}
function npPrint(){ win95toast('Принтер не найден. Пук-матричный принтер отключён.'); }
function npUndo(id){ var t=document.getElementById('npa_'+id); if(t){ document.execCommand('undo'); } }
function npCut(id){ var t=document.getElementById('npa_'+id); if(t){ t.focus(); document.execCommand('cut'); } }
function npCopy(id){ var t=document.getElementById('npa_'+id); if(t){ t.focus(); document.execCommand('copy'); } }
function npPaste(id){ var t=document.getElementById('npa_'+id); if(t){ t.focus(); document.execCommand('paste'); } }
function npSelectAll(id){ var t=document.getElementById('npa_'+id); if(t) t.select(); }
function npDate(id){
  var t=document.getElementById('npa_'+id); if(!t) return;
  var p=t.selectionStart, d=new Date().toLocaleString('ru-RU');
  t.value=t.value.slice(0,p)+d+t.value.slice(t.selectionEnd);
  t.selectionStart=t.selectionEnd=p+d.length; npUpd(id);
}
function npUpd(id){
  var t=document.getElementById('npa_'+id); var sb=document.getElementById('sb_'+id);
  if(t&&sb) sb.textContent='Стр: '+t.value.split('\n').length+' | Сим: '+t.value.length;
}

// ==================== CALCULATOR ====================
var cv='0',cop=null,cprev=null,cnew=false;
function appCalc(){
  createWin({id:'calc',title:'Калькулятор',icon:'🧮',w:218,h:285,resize:false,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Вид<div class="win-dd">'+
        '<div class="win-dd-item" onclick="win95toast(\'Обычный режим — уже активен\')">Обычный</div>'+
        '<div class="win-dd-item" onclick="win95toast(\'Инженерный — только для пуко-инженеров\')">Инженерный</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">'+
        '<div class="win-dd-item" onclick="win95toast(\'Инструкция: нажимай кнопки.\')">Справка</div></div></div>',
    content:
      '<div class="calc-wrap">'+
        '<div class="calc-display" id="calc-d">0</div>'+
        '<div class="calc-grid">'+
          '<button class="calc-btn red" onclick="cf(\'C\')">C</button>'+
          '<button class="calc-btn" onclick="cf(\'±\')">±</button>'+
          '<button class="calc-btn" onclick="cf(\'%\')">%</button>'+
          '<button class="calc-btn orange" onclick="cf(\'/\')">÷</button>'+
          '<button class="calc-btn" onclick="cf(\'7\')">7</button>'+
          '<button class="calc-btn" onclick="cf(\'8\')">8</button>'+
          '<button class="calc-btn" onclick="cf(\'9\')">9</button>'+
          '<button class="calc-btn orange" onclick="cf(\'*\')">×</button>'+
          '<button class="calc-btn" onclick="cf(\'4\')">4</button>'+
          '<button class="calc-btn" onclick="cf(\'5\')">5</button>'+
          '<button class="calc-btn" onclick="cf(\'6\')">6</button>'+
          '<button class="calc-btn orange" onclick="cf(\'-\')">−</button>'+
          '<button class="calc-btn" onclick="cf(\'1\')">1</button>'+
          '<button class="calc-btn" onclick="cf(\'2\')">2</button>'+
          '<button class="calc-btn" onclick="cf(\'3\')">3</button>'+
          '<button class="calc-btn orange" onclick="cf(\'+\')">+</button>'+
          '<button class="calc-btn" onclick="cf(\'0\')" style="grid-column:span 2">0</button>'+
          '<button class="calc-btn" onclick="cf(\'.\')">.</button>'+
          '<button class="calc-btn orange" onclick="cf(\'=\')">=</button>'+
        '</div>'+
      '</div>',
    afterOpen: function() {
      var calcKeyHandler = function(e) {
        if (!document.getElementById('win_calc')) { document.removeEventListener('keydown', calcKeyHandler); return; }
        // Only handle if calc window is focused (not inactive)
        var el = document.getElementById('win_calc');
        if (el && el.classList.contains('inactive')) return;
        var k = e.key;
        if (k >= '0' && k <= '9') { cf(k); e.preventDefault(); }
        else if (k === '+' || k === '-' || k === '*' || k === '/') { cf(k); e.preventDefault(); }
        else if (k === 'Enter' || k === '=') { cf('='); e.preventDefault(); }
        else if (k === 'Backspace') {
          if (cv.length > 1 && cv !== '0') { cv = cv.slice(0, -1); }
          else { cv = '0'; }
          var d = document.getElementById('calc-d'); if (d) d.textContent = cv;
          e.preventDefault();
        }
        else if (k === 'Escape' || k === 'Delete') { cf('C'); e.preventDefault(); }
        else if (k === '.') { cf('.'); e.preventDefault(); }
        else if (k === '%') { cf('%'); e.preventDefault(); }
      };
      document.addEventListener('keydown', calcKeyHandler);
    }
  });
}
function cf(b){
  var d=document.getElementById('calc-d'); if(!d) return;
  if(b==='C'){ cv='0';cop=null;cprev=null;cnew=false; }
  else if(b==='±'){ cv=String(parseFloat(cv)*-1); }
  else if(b==='%'){ cv=String(parseFloat(cv)/100); }
  else if(['+','-','*','/'].includes(b)){ cprev=parseFloat(cv);cop=b;cnew=true; }
  else if(b==='='){
    if(cop&&cprev!==null){
      var cur=parseFloat(cv),res;
      if(cop==='+') res=cprev+cur;
      else if(cop==='-') res=cprev-cur;
      else if(cop==='*') res=cprev*cur;
      else res=cur===0?'ДЕЛ НА НОЛЬ':cprev/cur;
      cv=typeof res==='number'?String(parseFloat(res.toFixed(10))):res;
      cop=null;cprev=null;cnew=true;
    }
  } else if(b==='.'){
    if(cnew){cv='0.';cnew=false;}
    else if(!cv.includes('.')) cv+='.';
  } else {
    if(cnew||cv==='0'){cv=b;cnew=false;}
    else if(cv.length<14) cv+=b;
  }
  d.textContent=cv;
}

// ==================== PAINT ====================
var _pCtx=null,_pColor='#000000',_pTool='pencil',_pDraw=false,_pX=0,_pY=0;
function appPaint(){
  createWin({id:'paint',title:'Безымянный — Пейнт',icon:'🎨',w:540,h:440,status:'Инструмент: Карандаш',
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">'+
        '<div class="win-dd-item" onclick="pOpen()">Открыть...</div>'+
        '<div class="win-dd-item" onclick="pSave()">Сохранить как PNG</div>'+
        '<div class="win-dd-sep"></div>'+
        '<div class="win-dd-item" onclick="closeWin(\'paint\')">Выход</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Правка<div class="win-dd">'+
        '<div class="win-dd-item" onclick="pClear()">Очистить</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Рисунок<div class="win-dd">'+
        '<div class="win-dd-item" onclick="win95toast(\'Холст: 500×340 пуков\')">Атрибуты...</div>'+
        '<div class="win-dd-item" onclick="pClear()">Очистить рисунок</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">'+
        '<div class="win-dd-item" onclick="win95toast(\'Пейнт ПУКДОС 95. Рисуй что хочешь.\')">О программе</div></div></div>',
    content:
      '<div class="paint-wrap">'+
        '<div class="paint-toolbar">'+
          '<div class="paint-tool active" id="pt_pencil" title="Карандаш" onclick="pTool(\'pencil\',this)">✏️</div>'+
          '<div class="paint-tool" id="pt_brush"  title="Кисть"    onclick="pTool(\'brush\',this)">🖌️</div>'+
          '<div class="paint-tool" id="pt_eraser" title="Ластик"   onclick="pTool(\'eraser\',this)">⬜</div>'+
          '<div style="width:1px;background:#808080;height:22px;margin:0 2px"></div>'+
          '<div class="paint-tool" title="Очистить" onclick="pClear()">🗑️</div>'+
          '<input type="color" id="pcolor" value="#000000" style="width:26px;height:26px;padding:0;border:0;cursor:default;margin-left:4px" onchange="pPickCol(this.value)" title="Цвет пера">'+
        '</div>'+
        '<div class="paint-cvwrap">'+
          '<canvas class="paint-cv" id="pcv" width="500" height="340"'+
          ' onmousedown="pDown(event)" onmousemove="pMove(event)" onmouseup="pUp()" onmouseleave="pUp()"></canvas>'+
        '</div>'+
        '<div class="paint-colors">'+
          ['#000000','#808080','#c0c0c0','#ffffff','#800000','#ff0000','#ff8000','#ffff00',
           '#008000','#00ff00','#008080','#00ffff','#000080','#0000ff','#800080','#ff00ff'].map(function(c){
            return '<div class="paint-color" style="background:'+c+'" onclick="pPickCol(\''+c+'\')" title="'+c+'"></div>';
          }).join('')+
        '</div>'+
      '</div>',
    afterOpen: function(){ initPaintCv(); }
  });
}
function initPaintCv(){
  var cv=document.getElementById('pcv'); if(!cv) return;
  _pCtx=cv.getContext('2d');
  _pCtx.fillStyle='#fff'; _pCtx.fillRect(0,0,cv.width,cv.height);
}
function pTool(t,el){
  _pTool=t;
  document.querySelectorAll('.paint-tool').forEach(function(e){ e.classList.remove('active'); });
  el.classList.add('active');
  var names={pencil:'Карандаш',brush:'Кисть',eraser:'Ластик'};
  var sb=document.getElementById('sb_paint'); if(sb) sb.textContent='Инструмент: '+(names[t]||t);
}
function pPickCol(c){ _pColor=c; var p=document.getElementById('pcolor'); if(p) p.value=c; }
function pDown(e){
  _pDraw=true;
  var r=e.target.getBoundingClientRect(); _pX=e.clientX-r.left; _pY=e.clientY-r.top;
  pDot(_pX,_pY);
}
function pMove(e){
  if(!_pDraw) return;
  var r=e.target.getBoundingClientRect(); var x=e.clientX-r.left,y=e.clientY-r.top;
  if(!_pCtx) return;
  _pCtx.beginPath(); _pCtx.moveTo(_pX,_pY); _pCtx.lineTo(x,y);
  _pCtx.strokeStyle=_pTool==='eraser'?'#fff':_pColor;
  _pCtx.lineWidth=_pTool==='brush'?8:(_pTool==='eraser'?18:2);
  _pCtx.lineCap='round'; _pCtx.stroke();
  _pX=x; _pY=y;
}
function pUp(){ _pDraw=false; }
function pDot(x,y){
  if(!_pCtx) return;
  _pCtx.beginPath(); _pCtx.arc(x,y,_pTool==='brush'?4:1,0,Math.PI*2);
  _pCtx.fillStyle=_pTool==='eraser'?'#fff':_pColor; _pCtx.fill();
}
function pClear(){
  if(!_pCtx) return;
  _pCtx.fillStyle='#fff'; _pCtx.fillRect(0,0,_pCtx.canvas.width,_pCtx.canvas.height);
}
function pSave(){
  var cv=document.getElementById('pcv'); if(!cv) return;
  var a=document.createElement('a'); a.href=cv.toDataURL('image/png'); a.download='пук-рисунок.png'; a.click();
  win95toast('Сохранено: пук-рисунок.png');
}

function pOpen(){
  var inp = document.createElement('input');
  inp.type = 'file'; inp.accept = 'image/*';
  inp.onchange = function() {
    var file = inp.files[0]; if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var cv = document.getElementById('pcv'); if (!cv || !_pCtx) return;
        _pCtx.fillStyle = '#fff';
        _pCtx.fillRect(0, 0, cv.width, cv.height);
        // Scale to fit canvas preserving aspect ratio
        var scale = Math.min(cv.width / img.width, cv.height / img.height);
        var dw = img.width * scale, dh = img.height * scale;
        var dx = (cv.width - dw) / 2, dy = (cv.height - dh) / 2;
        _pCtx.drawImage(img, dx, dy, dw, dh);
        var wb = document.querySelector('#win_paint .win-titlebar-text');
        if (wb) wb.textContent = file.name + ' — Пейнт';
        win95toast('Открыт файл: ' + file.name);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  inp.click();
}

// ==================== IE ====================
function appIE(){
  createWin({id:'ie',title:'ПукПлорер 1.0 — [puk.srenk.site]',icon:'🌐',w:580,h:380,status:'Готово',
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">'+
        '<div class="win-dd-item" onclick="ieNav(\'puk.srenk.site\')">Открыть...</div>'+
        '<div class="win-dd-item dis">Сохранить как...</div>'+
        '<div class="win-dd-sep"></div>'+
        '<div class="win-dd-item" onclick="closeWin(\'ie\')">Закрыть</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Избранное<div class="win-dd">'+
        '<div class="win-dd-item" onclick="ieNav(\'puk.srenk.site\')">💨 puk.srenk.site</div>'+
        '<div class="win-dd-item" onclick="win95toast(\'Hotmail: почта для пуков\')">📧 Hotmail</div>'+
        '<div class="win-dd-item" onclick="win95toast(\'AltaVista: поиск по пукам\')">🔍 AltaVista</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">'+
        '<div class="win-dd-item" onclick="win95toast(\'ПукПлорер 1.0, совместим с ПУКДОС 95\')">О программе</div></div></div>',
    content:
      '<div class="ie-wrap">'+
        '<div class="ie-toolbar">'+
          '<button class="w-btn" onclick="win95toast(\'Назад: некуда идти\')">◄</button>'+
          '<button class="w-btn" onclick="win95toast(\'Вперёд: тоже некуда\')">►</button>'+
          '<button class="w-btn" onclick="ieNav(document.getElementById(\'ie-addr\').value)">🔄</button>'+
          '<input class="ie-addr" id="ie-addr" value="puk.srenk.site" onkeydown="if(event.key===\'Enter\')ieNav(this.value)">'+
          '<button class="w-btn" onclick="ieNav(document.getElementById(\'ie-addr\').value)">Перейти</button>'+
        '</div>'+
        '<div class="ie-content" id="ie-con">'+
          '<div style="text-align:center;padding:20px">'+
            '<div style="font-size:36px">💨</div>'+
            '<h2 style="margin:8px 0;font-size:16px">ПУК.СРЕНК.САЙТ</h2>'+
            '<p style="color:#808080">Самый серьёзный сайт в интернете</p>'+
            '<hr style="margin:12px 0">'+
            '<p>Добро пожаловать в ПукПлорер 1.0!</p>'+
            '<p style="margin-top:8px;font-size:10px;color:#808080">Для просмотра настоящего сайта откройте<br>'+
            '<a href="https://puk.srenk.site" target="_blank" style="color:#000080">puk.srenk.site</a> в нормальном браузере</p>'+
          '</div>'+
        '</div>'+
      '</div>'
  });
}
function ieNav(url){
  var sb=document.getElementById('sb_ie'); var addr=document.getElementById('ie-addr'); var con=document.getElementById('ie-con');
  if(!url) url='puk.srenk.site';
  // Normalize URL
  var fullUrl=url;
  if(!fullUrl.startsWith('http')) fullUrl='https://'+fullUrl;
  if(addr) addr.value=url;
  if(sb) sb.textContent='Подключение через 56k... 💨';
  if(con){ con.innerHTML='<div style="padding:20px;color:#808080;font-family:monospace">'+
    '⌛ Подключение к '+url+'...<br>💨💨💨<br><br>'+
    '<div id="ie-modem" style="font-size:9px">▓░░░░░░░░░</div>'+
    '</div>';
    // Animate modem
    var prog=1;
    var modemIv=setInterval(function(){
      var el=document.getElementById('ie-modem');
      if(!el){clearInterval(modemIv);return;}
      prog=Math.min(10,prog+1);
      el.textContent='▓'.repeat(prog)+'░'.repeat(10-prog);
    },150);
    var delay=1000+Math.random()*1500;
    setTimeout(function(){
      clearInterval(modemIv);
      if(sb) sb.textContent='Готово';
      // 40% chance to load iframe, 60% chance for funny error
      var roll=Math.random();
      if(roll < 0.4 && url!=='puk.srenk.site'){
        // Try real page in iframe
        con.innerHTML='<iframe src="'+fullUrl+'" style="width:100%;height:100%;border:none" '+
          'sandbox="allow-scripts allow-same-origin allow-forms" '+
          'onerror="this.parentNode.innerHTML=\'<div style=padding:16px>Сайт заблокировал пуки</div>\'" '+
          'onload="if(!this.contentDocument||this.contentDocument.body.innerHTML===\'\')'+
          '{this.parentNode.innerHTML=\'<div style=padding:16px>⛔ Сайт заблокировал ПукПлорер</div>\'}"'+
          '></iframe>';
        if(sb) sb.textContent='Страница загружена (возможно)';
      } else {
        // Funny error
        var errors=[
          {title:'Ошибка соединения',msg:'Сервер вернул слишком много пуков.<br>Уменьшите пропускную способность пуков и попробуйте снова.'},
          {title:'Ошибка 404',msg:'Страница не найдена.<br>Она была стёрта пуком 7.3.'},
          {title:'Ошибка 403',msg:'Доступ запрещён.<br>У вас недостаточно пуков для просмотра этой страницы.'},
          {title:'Ошибка 500',msg:'Внутренняя ошибка сервера.<br>Сервер пукнул на ваш запрос.'},
          {title:'Время ожидания',msg:'Сервер не ответил за 420 секунд.<br>Скорее всего, он пукнул и заснул.'},
          {title:'Нет сети',msg:'ПУККОМ.SYS не может найти сеть.<br>Проверьте пук-кабель.'},
        ];
        var err=errors[Math.floor(Math.random()*errors.length)];
        con.innerHTML='<div style="padding:16px"><div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px">'+
          '<span style="font-size:32px">⚠️</span>'+
          '<div><b style="font-size:13px">ПукПлорер не может отобразить страницу</b><br>'+
          '<span style="color:#808080;font-size:11px">'+err.title+'</span></div></div>'+
          '<div style="background:#ffffcc;border:1px solid #cca;padding:8px;margin-bottom:12px;font-size:11px">'+
          err.msg+'</div>'+
          '<p style="margin-bottom:8px;font-size:11px">Попробуйте:</p>'+
          '<ul style="margin:0 0 12px 20px;font-size:11px;line-height:2">'+
          '<li>Нажать <b>Обновить</b></li>'+
          '<li>Проверить пуко-кабель</li>'+
          '<li>Перезагрузить ПукПлорер</li>'+
          '</ul>'+
          '<button class="w-btn" onclick="window.open(\''+fullUrl+'\',\'_blank\')" style="font-size:10px">Открыть в нормальном браузере</button>'+
          '</div>';
      }
    },delay);
  }
}

// ==================== DOOM ====================
function appDoom(){
  createWin({id:'doom',title:'ПУКДУМ — id Software ПУКПРОМ Edition',icon:'🔫',w:420,h:420,
    content:
      '<div class="doom-wrap" id="doom-wrap">'+
        '<div style="font-size:40px">💨</div>'+
        '<div style="font-size:22px;font-weight:bold;color:#f00;font-family:monospace;text-shadow:0 0 8px #f00">ПУКДУМ</div>'+
        '<div style="color:#888;font-size:10px;margin:2px 0 12px">id Software · ПУКПРОМ Edition · 1993</div>'+
        '<canvas id="dcv" width="320" height="200" tabindex="0" style="border:2px solid #f00;display:block;outline:none"></canvas>'+
        '<div id="dstat" style="color:#888;font-size:10px;margin-top:6px">Нажми СТАРТ чтобы начать</div>'+
        '<div id="doom-hud" style="display:none;background:#111;border:1px solid #600;margin-top:4px;padding:3px 8px;'+
          'font-family:monospace;font-size:11px;color:#0f0;display:none;justify-content:space-between;width:320px">'+
          '<span id="d-hp">❤️ HP: 100</span>'+
          '<span id="d-ammo">💨 AMMO: ∞</span>'+
          '<span id="d-score">💀 SCORE: 0</span>'+
        '</div>'+
        '<div style="margin-top:8px;display:flex;gap:6px">'+
          '<button class="w-btn" id="doom-start-btn" onclick="dStart()">▶ СТАРТ</button>'+
          '<button class="w-btn" onclick="closeWin(\'doom\')">Выход</button>'+
        '</div>'+
      '</div>'
  });
}
var _dRun=false,_dKeys={};
function dStart(){
  var cv=document.getElementById('dcv'); var st=document.getElementById('dstat');
  if(!cv) return;
  _dRun=false; // stop old loop if any
  cv.focus();

  var ctx=cv.getContext('2d'), W=cv.width, H=cv.height;
  var MAP=[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,0,1,0,0,1,0,0,1,1,0,1],
    [1,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];
  var ROWS=MAP.length,COLS=MAP[0].length;
  var px=1.5,py=1.5,pa=0,score=0,hp=100;
  var enemies=[{x:8,y:5,alive:true},{x:4,y:9,alive:true},{x:13,y:3,alive:true},{x:11,y:7,alive:true}];
  var _shooting=false;
  _dRun=true; _dKeys={};

  // Show HUD
  var hud=document.getElementById('doom-hud');
  if(hud) hud.style.display='flex';

  // Key handlers on the CANVAS to avoid page scroll
  function onKD(e){
    var keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' ','w','a','s','d','W','A','S','D'];
    if(keys.includes(e.key)){ e.preventDefault(); e.stopPropagation(); }
    _dKeys[e.key]=true;
  }
  function onKU(e){ delete _dKeys[e.key]; }
  cv.addEventListener('keydown',onKD); cv.addEventListener('keyup',onKU);
  // Also listen on document but only while game running
  function docKD(e){ if(_dRun&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key)) e.preventDefault(); _dKeys[e.key]=true; }
  function docKU(e){ delete _dKeys[e.key]; }
  document.addEventListener('keydown',docKD); document.addEventListener('keyup',docKU);

  if(st) st.textContent='WASD/стрелки — движение, ПРОБЕЛ — выстрел 💨';

  function updateHUD(){
    var h=document.getElementById('d-hp'); if(h) h.textContent='❤️ HP: '+hp;
    var s=document.getElementById('d-score'); if(s) s.textContent='💀 SCORE: '+score;
  }

  // Weapon bob animation
  var _wbob=0,_wbobDir=1,_flash=0;

  function drawWeapon(){
    // Draw a simple pixelart gun at bottom center
    var gx=W/2, gy=H-20+Math.sin(_wbob)*4;
    ctx.save();
    ctx.font='36px serif'; ctx.textAlign='center'; ctx.textBaseline='bottom';
    ctx.fillText('🔫', gx + (_flash>0?Math.random()*6-3:0), gy+(_flash>0?-4:0));
    if(_flash>0){
      ctx.fillStyle='rgba(255,200,0,0.7)';
      ctx.beginPath(); ctx.arc(gx-10,gy-36,10,0,Math.PI*2); ctx.fill();
      _flash--;
    }
    ctx.restore();
    _wbob+=0.15*_wbobDir;
    if(_wbob>1||_wbob<-1) _wbobDir*=-1;
  }

  function frame(){
    if(!_dRun||!document.getElementById('dcv')){
      cv.removeEventListener('keydown',onKD); cv.removeEventListener('keyup',onKU);
      document.removeEventListener('keydown',docKD); document.removeEventListener('keyup',docKU);
      if(hud) hud.style.display='none';
      return;
    }
    var spd=0.05,rot=0.055;
    if(_dKeys['ArrowLeft']||_dKeys['a']||_dKeys['A']) pa-=rot;
    if(_dKeys['ArrowRight']||_dKeys['d']||_dKeys['D']) pa+=rot;
    if(_dKeys['ArrowUp']||_dKeys['w']||_dKeys['W']){
      var nx=px+Math.cos(pa)*spd,ny=py+Math.sin(pa)*spd;
      if(MAP[Math.floor(ny)]&&!MAP[Math.floor(ny)][Math.floor(nx)]) px=nx;
      if(MAP[Math.floor(py)]&&!MAP[Math.floor(py)][Math.floor(nx)]) py=ny;
    }
    if(_dKeys['ArrowDown']||_dKeys['s']||_dKeys['S']){
      var nx2=px-Math.cos(pa)*spd,ny2=py-Math.sin(pa)*spd;
      if(MAP[Math.floor(ny2)]&&!MAP[Math.floor(ny2)][Math.floor(nx2)]) px=nx2;
      if(MAP[Math.floor(py)]&&!MAP[Math.floor(py)][Math.floor(nx2)]) py=ny2;
    }
    if((_dKeys[' ']||_dKeys['Control'])&&!_shooting){
      _shooting=true; _flash=3;
      setTimeout(function(){ _shooting=false; }, 180);
      _dKeys[' ']=false; _dKeys['Control']=false;
      var killed=false;
      enemies.forEach(function(e){
        if(!e.alive) return;
        var dx=e.x-px,dy=e.y-py,dist=Math.sqrt(dx*dx+dy*dy);
        if(dist>10) return;
        var angle=Math.atan2(dy,dx),da=angle-pa;
        while(da>Math.PI) da-=Math.PI*2; while(da<-Math.PI) da+=Math.PI*2;
        if(Math.abs(da)<0.30){ e.alive=false; score++; killed=true; }
      });
      if(killed&&st) st.textContent='💀 ПУК! Счёт: '+score;
      updateHUD();
    }
    // Render ceiling/floor
    ctx.fillStyle='#1a1a1a'; ctx.fillRect(0,0,W,H/2);
    ctx.fillStyle='#333'; ctx.fillRect(0,H/2,W,H/2);
    var FOV=Math.PI/3;
    // Raycaster walls
    for(var i=0;i<W;i++){
      var angle=pa-FOV/2+(i/W)*FOV,dist=0,hit=0;
      for(var j=0;j<64&&!hit;j++){
        dist+=0.05;
        var mx=Math.floor(px+Math.cos(angle)*dist),my=Math.floor(py+Math.sin(angle)*dist);
        if(mx<0||my<0||mx>=COLS||my>=ROWS){dist=64;break;}
        if(MAP[my][mx]) hit=1;
      }
      var corr=dist*Math.cos(angle-pa),h=Math.min(H,H/Math.max(0.1,corr));
      var b=Math.max(0,1-corr/10);
      ctx.fillStyle='rgb('+Math.floor(b*200+20)+','+Math.floor(b*30)+',0)';
      ctx.fillRect(i,(H-h)/2,1,h);
    }
    // Enemies
    var liveEnemies=enemies.filter(function(e){ return e.alive; });
    liveEnemies.forEach(function(e){
      var dx=e.x-px,dy=e.y-py,dist2=Math.sqrt(dx*dx+dy*dy); if(dist2>10) return;
      var angle2=Math.atan2(dy,dx)-pa;
      while(angle2>Math.PI) angle2-=Math.PI*2; while(angle2<-Math.PI) angle2+=Math.PI*2;
      if(Math.abs(angle2)>FOV/2+0.2) return;
      var sx=(angle2/FOV+0.5)*W,h2=Math.min(H*0.8,H/(dist2*0.9));
      ctx.save(); ctx.font=Math.floor(h2)+'px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('💨',sx,H/2); ctx.restore();
      // Crosshair highlight if aimed
      var da=angle2; while(da>Math.PI)da-=Math.PI*2; while(da<-Math.PI)da+=Math.PI*2;
      if(Math.abs(da)<0.15){
        ctx.strokeStyle='rgba(255,0,0,0.6)'; ctx.lineWidth=1;
        ctx.strokeRect(sx-h2/2,(H-h2)/2,h2,h2);
      }
    });
    // Crosshair
    ctx.strokeStyle='rgba(0,255,0,0.8)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(W/2-8,H/2); ctx.lineTo(W/2+8,H/2);
    ctx.moveTo(W/2,H/2-8); ctx.lineTo(W/2,H/2+8); ctx.stroke();
    // Weapon
    drawWeapon();
    if(liveEnemies.length===0){
      ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#ff0'; ctx.font='bold 18px monospace'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('УРОВЕНЬ ПРОЙДЕН! 💨',W/2,H/2);
      if(st) st.textContent='🏆 Все пуки уничтожены! Счёт: '+score;
      _dRun=false;
      cv.removeEventListener('keydown',onKD); cv.removeEventListener('keyup',onKU);
      document.removeEventListener('keydown',docKD); document.removeEventListener('keyup',docKU);
      return;
    }
    requestAnimationFrame(frame);
  }
  frame();
}

// ==================== SYSINFO ====================
function appSysInfo(){
  createWin({id:'sysinfo',title:'Сведения о системе',icon:'ℹ️',w:440,h:320,
    menu:'<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">'+
      '<div class="win-dd-item" onclick="closeWin(\'sysinfo\')">Выход</div></div></div>',
    content:
      '<div class="sysinfo-wrap">'+
        '<div style="text-align:center;margin-bottom:10px">'+
          '<span style="font-size:36px">💨</span>'+
          '<div style="font-weight:bold;font-size:13px">ПУКДОС 95</div>'+
          '<div style="color:#808080;font-size:10px">Версия 4.00.950 · ООО ПУКПРОМ</div>'+
        '</div>'+
        '<hr style="margin:6px 0">'+
        '<div class="si-row"><span class="si-lbl">Процессор:</span><span class="si-val">Pentium Puk™ 420 МГц</span></div>'+
        '<div class="si-row"><span class="si-lbl">ОЗУ:</span><span class="si-val">64 МБ (32 МБ — пуки)</span></div>'+
        '<div class="si-row"><span class="si-lbl">Диск C:</span><span class="si-val">420 МБ свободно из 696 МБ</span></div>'+
        '<div class="si-row"><span class="si-lbl">Видеокарта:</span><span class="si-val">Puk VGA 2 МБ</span></div>'+
        '<div class="si-row"><span class="si-lbl">Звук:</span><span class="si-val">SoundBlaster Puk 16 Pro</span></div>'+
        '<div class="si-row"><span class="si-lbl">Сеть:</span><span class="si-val">56k Пук-модем</span></div>'+
        '<div class="si-row"><span class="si-lbl">Разрешение:</span><span class="si-val">'+screen.width+'×'+screen.height+' ('+screen.colorDepth+'-bit)</span></div>'+
        '<div class="si-row"><span class="si-lbl">ОС реальная:</span><span class="si-val" style="font-size:10px;word-break:break-all">'+navigator.userAgent.substring(0,55)+'...</span></div>'+
        '<hr style="margin:6px 0">'+
        '<div class="si-row"><span class="si-lbl">Лицензиат:</span><span class="si-val">Аноним Пукович</span></div>'+
        '<div class="si-row"><span class="si-lbl">Ключ продукта:</span><span class="si-val">PUK-420-6969-ГАЗЗЗ</span></div>'+
      '</div>'
  });
}

// ==================== TRASH ====================
function appTrash(){
  createWin({id:'trash',title:'Корзина',icon:'🗑️',w:320,h:230,
    menu:'<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">'+
      '<div class="win-dd-item" onclick="win95toast(\'Корзина очищена.\')">Очистить корзину</div>'+
      '<div class="win-dd-sep"></div>'+
      '<div class="win-dd-item" onclick="closeWin(\'trash\')">Закрыть</div></div></div>',
    status:'1 объект | 4 ГБ',
    content:
      '<div style="padding:16px;text-align:center">'+
        '<div style="font-size:48px">🗑️</div>'+
        '<div style="margin-top:8px;font-size:12px">В корзине: 1 объект</div>'+
        '<div style="margin:12px auto;background:#fff;border:1px solid #808080;padding:8px;max-width:200px;'+
          'display:flex;align-items:center;gap:8px;cursor:default" ondblclick="win95toast(\'Нельзя восстановить. Время не возвращается.\')">'+
          '<span style="font-size:24px">💨</span>'+
          '<div style="text-align:left;font-size:11px"><div style="font-weight:bold">твоё_время.exe</div><div style="color:#808080">4 294 967 295 ГБ</div></div>'+
        '</div>'+
        '<div style="margin-top:8px;display:flex;gap:8px;justify-content:center">'+
          '<button class="w-btn" onclick="win95toast(\'Невозможно восстановить.\')">Восстановить</button>'+
          '<button class="w-btn" onclick="win95toast(\'Удалено. Но время всё равно не вернуть.\')">Удалить</button>'+
        '</div>'+
      '</div>'
  });
}

// ==================== SHUTDOWN ====================
function shutdownDlg(){
  closeSM();
  createWin({id:'shutdown',title:'Завершение работы',icon:'🚪',w:340,h:180,resize:false,
    content:
      '<div style="padding:16px;display:flex;gap:12px;align-items:flex-start">'+
        '<span style="font-size:36px">🚪</span>'+
        '<div>'+
          '<div style="font-size:12px;margin-bottom:12px">Что требуется сделать?</div>'+
          '<select id="sd-sel" style="width:100%;padding:2px;font-size:11px">'+
            '<option>Завершить работу</option>'+
            '<option>Перезагрузить компьютер</option>'+
            '<option>Перезагрузить в режиме пука</option>'+
          '</select>'+
          '<div style="margin-top:16px;display:flex;gap:8px">'+
            '<button class="w-btn" onclick="doShutdown()">OK</button>'+
            '<button class="w-btn" onclick="closeWin(\'shutdown\')">Отмена</button>'+
            '<button class="w-btn" onclick="win95toast(\'Справка: отключи компьютер и уйди\')">Справка</button>'+
          '</div>'+
        '</div>'+
      '</div>'
  });
}
function doShutdown(){
  var sel=document.getElementById('sd-sel');
  var val=sel?sel.value:'Завершить работу';
  closeWin('shutdown');
  playWin95Sound('shutdown');

  if(val.includes('Перезагрузить')){
    // Show shutdown animation then reload
    showShutdownAnim(false, function(){ location.reload(); });
  } else {
    // Show full shutdown animation then "safe to turn off" screen
    showShutdownAnim(true, function(){
      var sc=document.getElementById('shutdown-screen');
      if(!sc) return;
      sc.style.display='flex';
      sc.style.alignItems='center';
      sc.style.justifyContent='center';
      sc.style.flexDirection='column';
      sc.innerHTML='<div style="font-size:22px;text-align:center;line-height:2;color:#c0c0c0;font-family:\'Courier New\',monospace">' +
        '<div style="margin-bottom:24px;font-size:13px;color:#808080">ПУКДОС 95</div>' +
        'Теперь газовое питание<br>компьютера можно отключить.<br>' +
        '<div style="font-size:36px;margin-top:20px">💨</div>' +
        '<div style="font-size:11px;color:#606060;margin-top:24px">(Обновите страницу для повторного запуска)</div>' +
        '</div>';
    });
  }
}

function showShutdownAnim(full, onDone) {
  // Close all windows first
  var taskbar=document.getElementById('taskbar');
  var desktop=document.getElementById('desktop');
  var startMenu=document.getElementById('start-menu');
  if(taskbar) taskbar.style.opacity='0';
  if(startMenu) startMenu.style.display='none';

  var lines = full ? [
    { text: 'Сохранение пользовательских настроек пуков...', delay: 0 },
    { text: 'Запись PUK.DAT... 100%', delay: 600 },
    { text: 'Сохранение реестра...', delay: 400 },
    { text: 'HKEY_LOCAL_MACHINE\\PUK\\SYSTEM\\CurrentControlPuk', delay: 200 },
    { text: '  Записано 420 ключей', delay: 400 },
    { text: 'Закрытие файлов...', delay: 500 },
    { text: '  PUKVXD.DLL — выгружен', delay: 200 },
    { text: '  PUKNET.SYS — выгружен', delay: 200 },
    { text: '  PUKCOM32.DLL — выгружен', delay: 200 },
    { text: 'Сброс кэша пуков...', delay: 400 },
    { text: 'Размонтирование дисков...', delay: 500 },
    { text: '  Диск C: — размонтирован', delay: 300 },
    { text: 'Подготовка системы к выключению...', delay: 600 },
    { text: 'Отключение газовых магистралей...', delay: 500 },
    { text: '  Давление: 420 мбар → 0 мбар', delay: 300 },
    { text: 'Система готова к выключению.', delay: 600 },
  ] : [
    { text: 'Сохранение данных...', delay: 0 },
    { text: 'Подготовка к перезагрузке...', delay: 800 },
    { text: 'Перезагрузка ПУКДОС 95...', delay: 600 },
  ];

  var sc = document.getElementById('shutdown-screen');
  var out = document.getElementById('shutdown-out');
  if(!sc||!out) { if(onDone) onDone(); return; }

  // Fade desktop to black
  if(desktop){ desktop.style.transition='opacity 0.8s'; desktop.style.opacity='0'; }

  setTimeout(function(){
    sc.style.display='block';
    out.innerHTML='';
    var total=0;
    lines.forEach(function(l){
      total+=l.delay;
      (function(line,t){
        setTimeout(function(){
          var div=document.createElement('div');
          div.style.color=line.color||'#c0c0c0';
          div.textContent=line.text;
          out.appendChild(div);
          sc.scrollTop=sc.scrollHeight;
        },t);
      })(l,total);
    });
    total+=800;
    setTimeout(function(){
      sc.style.transition='opacity 0.6s';
      sc.style.opacity='0';
      setTimeout(function(){
        sc.style.opacity='1';
        sc.style.transition='';
        if(onDone) onDone();
      },600);
    },total);
  },900);
}

// ==================== RANDOM ERRORS & BSOD ====================
var _bsodMessages = [
  'A fatal exception 0E has occurred at\n0028:F00D1337 in VxD ПУККОМ(01)+00010042.\n\nThe current application will be terminated.\n\n* Press any key to terminate the current application.\n* Press CTRL+ALT+DEL to restart your computer.\n  You will lose any unsaved information in all applications.\n\n💨  💨  💨\n\nPress any key to continue _',
  'A fatal exception 0E has occurred at\n0028:DEAD1337 in VxD ПУКПРОМ(02)+00069420.\n\nGAS_LIMIT_EXCEEDED в PUK32.DLL\n\nThe system has been halted.\n\n💨  💨  💨\n\nPress any key to continue _',
  '*** STOP: 0x0000ПУКА (0x00000001, 0x69696969, 0xGAZZZZZZ)\n\nPUKCOM.SYS — Address F00D1337 base at 0+00000000\n\nДата Дампа памяти: пук.пук.пук\n\n💨  MEMORY_DUMP_COMPLETE  💨\n\nPress any key to continue _',
];

var _errorMessages = [
  ['Ошибка приложения','ПУККОМ.DLL вызвал общую ошибку защиты\nв модуле ПУКПРОМ.EXE на адресе 0042:FA1E2003.',false],
  ['Ошибка сети','ПУКНЕТ.SYS не может найти сервер.\nПроверьте пуко-кабель и повторите попытку.',false],
  ['Недостаточно памяти','Недостаточно пуков для выполнения операции.\nЗакройте программы и освободите газовые резервы.',false],
  ['Ошибка диска','Ошибка чтения с диска C:\\PUKS\\SYSTEM.\nВозможно, диск полностью заполнен пуками.',false],
  ['Ошибка шрифтов','PUK FONT SYSTEM 32 вызвал исключение.\nНекоторые шрифты отображаются неправильно.',false],
  ['Критическая ошибка','ПУКДРАЙВЕР.VXD вызвал критическую ошибку.\nРекомендуется немедленная перезагрузка.', true],
  ['Ошибка реестра','PUK REGISTRY CORRUPTED.\nФайл PUKREG.DAT повреждён пуком.', true],
];

function showBSOD(){
  var msg=_bsodMessages[Math.floor(Math.random()*_bsodMessages.length)];
  var el=document.getElementById('bsod');
  if(!el) return;
  el.innerHTML='<div style="background:#fff;color:#0000aa;display:inline-block;padding:2px 8px;margin-bottom:16px;font-weight:bold">Пукдос 95</div><br><br>'+
    msg.replace(/\n/g,'<br>')+'<br><br><span style="font-size:11px;color:#aaaaff">(Нажмите на экран чтобы продолжить)</span>';
  el.style.display='block';
  // Close all windows
  Object.keys(_wins).forEach(function(id){
    var tb=document.getElementById('tbb_'+id); if(tb) tb.remove();
    var w=document.getElementById('win_'+id); if(w) w.remove();
  });
  _wins={};
  // Scary beep
  try{
    var ac=new(window.AudioContext||window.webkitAudioContext)();
    var o=ac.createOscillator(); var g=ac.createGain();
    o.type='square'; o.frequency.value=800;
    g.gain.setValueAtTime(0.3,ac.currentTime);
    g.gain.setValueAtTime(0,ac.currentTime+1.5);
    o.connect(g); g.connect(ac.destination);
    o.start(); o.stop(ac.currentTime+1.5);
    setTimeout(function(){ ac.close(); },2000);
  }catch(e){}
}

function hideBSOD(){
  var el=document.getElementById('bsod');
  if(el) el.style.display='none';
  // "Reboot"
  win95toast('Перезагрузка после синего экрана...');
  setTimeout(function(){ location.reload(); },1500);
}

function w95error(title, msg, bsod){
  // Show Win95-style error dialog
  var id='err_'+Date.now();
  createWin({id:id, title:title, icon:'⚠️', w:340, h:160, resize:false,
    x:Math.floor(window.innerWidth/2-170), y:Math.floor(window.innerHeight/2-80),
    content:
      '<div style="padding:16px;display:flex;gap:12px;align-items:flex-start">'+
        '<span style="font-size:32px">⚠️</span>'+
        '<div style="flex:1">'+
          '<div style="font-size:11px;margin-bottom:16px;line-height:1.8">'+msg+'</div>'+
          '<div style="display:flex;gap:8px;justify-content:center">'+
            (bsod?'<button class="w-btn" onclick="showBSOD()">Подробности</button>':'')+
            '<button class="w-btn" onclick="closeWin(\''+id+'\')">OK</button>'+
            '<button class="w-btn" onclick="closeWin(\''+id+'\');win95toast(\'Ошибка проигнорирована. Удачи.\')">Игнорировать</button>'+
          '</div>'+
        '</div>'+
      '</div>'
  });
}

function scheduleRandomErrors(){
  var minDelay=90000, maxDelay=240000; // 1.5 to 4 minutes
  function fireNext(){
    var delay=minDelay+Math.random()*(maxDelay-minDelay);
    setTimeout(function(){
      var err=_errorMessages[Math.floor(Math.random()*_errorMessages.length)];
      w95error(err[0], err[1], err[2]);
      fireNext();
    }, delay);
  }
  // First error sooner for demo
  setTimeout(function(){
    w95error('Ошибка системы','ПУККОМ.DLL не загружен.\nНекоторые функции пуков могут быть недоступны.',false);
    fireNext();
  }, 45000+Math.random()*30000);
}


// ==================== MEDIA PLAYER (RICKROLL) ====================
var _rr = { ctx:null, nodes:[], playing:false, timer:null, gain:null, progIv:null };

var _rrMel = [[5538,554.37,692],[6231,622.25,692],[6923,415.3,462],[7385,622.25,692],[8077,698.46,692],[8769,830.61,115],[8885,739.99,115],[9000,698.46,115],[9115,554.37,808],[9231,349.23,577],[9923,622.25,692],[10615,415.3,1615],[11769,349.23,1038],[12462,830.61,115],[12577,739.99,115],[12692,698.46,115],[12808,554.37,115],[12923,349.23,462],[13615,622.25,692],[14308,415.3,115],[14423,369.99,115],[14538,349.23,115],[14769,622.25,692],[15462,698.46,692],[16154,830.61,115],[16269,739.99,115],[16385,698.46,115],[16500,554.37,808],[16615,349.23,462],[17308,622.25,692],[18000,415.3,1962],[18692,349.23,115],[18923,349.23,1269],[19615,1108.73,115],[19731,1108.73,115],[19846,1108.73,115],[19962,1108.73,115],[20192,1108.73,115],[20308,349.23,1615],[24000,349.23,1615],[25846,415.3,346],[26308,415.3,115],[27692,349.23,1615],[31385,830.61,1846],[33462,698.46,231],[33923,622.25,231],[34385,554.37,231],[35077,466.16,1615],[36462,349.23,231],[36923,415.3,1731],[37615,349.23,231],[38769,466.16,1731],[40615,466.16,231],[40961,466.16,115],[41077,349.23,231],[41308,523.25,1038],[41769,830.61,115],[41885,830.61,115],[42461,1108.73,692],[42923,554.37,231],[43154,1244.51,692],[43846,830.61,462],[44308,1244.51,692],[44769,523.25,231],[45000,1396.91,692],[45692,1661.22,115],[45808,1479.98,115],[45923,1396.91,115],[46038,1108.73,808],[46154,349.23,577],[46846,1244.51,692],[47538,830.61,1615],[48000,523.25,346],[48461,554.37,1038],[48692,349.23,808],[49154,830.61,115],[49269,830.61,115],[49385,1661.22,115],[49500,1479.98,115],[49615,1396.91,115],[49731,1108.73,808],[49846,554.37,346],[50308,554.37,231],[50538,1244.51,692],[51231,830.61,462],[51692,1244.51,692],[52154,622.25,231],[52385,1396.91,692],[52731,523.25,115],[52846,466.16,231],[53077,1661.22,115],[53192,1479.98,115],[53308,1396.91,115],[53423,1108.73,808],[53538,349.23,577],[54231,1244.51,692],[54923,830.61,1962],[55385,523.25,346],[55846,415.3,923],[56538,1108.73,115],[56654,1108.73,115],[56769,1108.73,115],[56885,1108.73,115],[57115,1108.73,115],[57231,349.23,1615],[60923,349.23,1615],[62769,415.3,346],[63231,415.3,115],[63923,349.23,231],[64615,349.23,1615],[68308,830.61,1846],[70385,698.46,231],[70846,622.25,231],[71308,554.37,231],[72000,466.16,1615],[73385,349.23,231],[73846,415.3,1731],[74538,349.23,231],[75692,466.16,1731],[77538,466.16,231],[77885,466.16,115],[78000,349.23,231],[78231,523.25,1038],[78692,830.61,115],[78808,830.61,115],[79385,1108.73,692],[79846,554.37,231],[80077,1244.51,692],[80769,830.61,462],[81231,1244.51,692],[81692,523.25,231],[81923,1396.91,692],[82615,1661.22,115],[82731,1479.98,115],[82846,1396.91,115],[82961,1108.73,808],[83077,349.23,577],[83769,1244.51,692],[84461,830.61,1615],[84923,523.25,346],[85385,554.37,1038],[85615,349.23,808],[86077,830.61,115],[86192,830.61,115],[86308,1661.22,115],[86423,1479.98,115],[86538,1396.91,115],[86654,1108.73,808],[86769,554.37,346],[87231,554.37,231],[87461,1244.51,692],[88154,830.61,462],[88615,1244.51,692],[89077,622.25,231],[89308,1396.91,692],[89654,523.25,115],[89769,466.16,231],[90000,1661.22,115],[90115,1479.98,115],[90231,1396.91,115],[90346,1108.73,808],[90461,349.23,577],[91154,1244.51,692],[91846,830.61,1962],[92308,523.25,346],[92769,415.3,923],[93461,1108.73,115],[93577,1108.73,115],[93692,1108.73,115],[93808,1108.73,115],[94038,1108.73,115],[94154,1108.73,692],[94615,554.37,231],[94846,1244.51,692],[95538,830.61,462],[96000,1244.51,692],[96461,523.25,231],[96692,1396.91,692],[97385,1661.22,115],[97500,1479.98,115],[97615,1396.91,115],[97731,1108.73,808],[97846,349.23,577],[98538,1244.51,692],[99231,830.61,1615],[99692,523.25,346],[100154,554.37,1038],[100385,349.23,808],[100846,830.61,115],[100961,830.61,115],[101077,1661.22,115],[101192,1479.98,115],[101308,1396.91,115],[101423,1108.73,808],[101538,554.37,346],[102000,554.37,231],[102231,1244.51,692],[102923,830.61,462],[103385,1244.51,692],[103846,622.25,231],[104077,1396.91,692],[104423,523.25,115],[104538,466.16,231],[104769,1661.22,115],[104885,1479.98,115],[105000,1396.91,115],[105115,1108.73,808],[105231,349.23,577],[105923,1244.51,692],[106615,830.61,1962],[107077,523.25,346],[107538,415.3,923],[108231,1108.73,115],[108346,1108.73,115],[108461,1108.73,115],[108577,1108.73,115],[108808,1108.73,115],[108923,415.3,1500],[109269,349.23,115],[109615,349.23,115],[109846,349.23,231],[110192,349.23,115],[110423,369.99,115],[110538,349.23,115],[110769,554.37,346],[111000,349.23,115],[111115,554.37,346],[111231,349.23,231],[111461,523.25,346],[112615,415.3,1500],[116308,415.3,1500],[120000,415.3,1500],[129231,349.23,577],[138461,932.33,1846],[140308,1244.51,923],[141231,1396.91,923],[142154,932.33,1846],[145846,1108.73,692],[146538,1244.51,692],[147692,1244.51,692],[148384,1396.91,692],[150231,1244.51,692],[153923,1244.51,692],[155077,1244.51,692],[155769,1396.91,692],[157615,1244.51,692],[161308,1244.51,692],[162461,1244.51,692],[163154,1396.91,692],[165000,1244.51,692],[168692,1244.51,692],[169846,1244.51,692],[170538,1396.91,692],[172384,1244.51,692],[176077,1244.51,692],[177231,1244.51,692],[177923,1396.91,692],[179769,1244.51,692],[183461,1244.51,692],[184615,1244.51,692],[185308,1396.91,692],[187154,1244.51,692],[190846,1244.51,692],[191538,1661.22,462],[192000,1661.22,1731]];
var _rrBas = [[5538,233.08,577],[5769,116.54,923],[6231,207.65,1038],[7385,207.65,577],[9231,233.08,577],[9462,116.54,923],[9923,207.65,1038],[11077,207.65,577],[12462,233.08,115],[12923,233.08,462],[13154,116.54,923],[13615,207.65,1038],[14769,207.65,462],[16385,116.54,462],[16615,233.08,462],[16846,116.54,923],[17308,207.65,1038],[18692,116.54,462],[18923,233.08,1269],[20308,185.0,1615],[24000,185.0,1615],[27692,185.0,1615],[31385,185.0,1731],[42461,233.08,577],[44308,174.61,462],[46154,233.08,577],[48000,174.61,462],[49846,233.08,577],[51692,174.61,462],[53538,233.08,577],[55846,233.08,1269],[57231,185.0,1615],[60923,185.0,1615],[64615,185.0,1615],[68308,185.0,1731],[79385,233.08,577],[81231,174.61,577],[83077,233.08,577],[84923,174.61,577],[86769,233.08,577],[88615,174.61,577],[90461,233.08,577],[94154,233.08,577],[96000,207.65,577],[97846,233.08,577],[99692,207.65,577],[101538,233.08,577],[103385,207.65,577],[105231,233.08,577],[108923,233.08,231],[112154,138.59,3692],[112500,155.56,3462],[115846,138.59,3692],[116192,155.56,3462],[119538,138.59,3692],[119884,155.56,3462],[123346,155.56,68654],[145846,233.08,577],[147692,174.61,462],[149538,233.08,577],[151384,174.61,462],[153231,233.08,577],[155077,174.61,462],[156923,233.08,577],[160615,233.08,577],[162461,207.65,577],[164308,233.08,577],[166154,207.65,577],[168000,233.08,577],[169846,207.65,577],[171692,233.08,577],[175384,233.08,577],[177231,207.65,577],[179077,233.08,577],[180923,207.65,577],[182769,233.08,577],[184615,207.65,577],[186461,233.08,577],[190154,1396.91,346],[190846,116.54,1154]];
var _rrMinMs = 5538, _rrLoopMs = 188693;

function rrPlay() {
  if (_rr.playing) return;
  _rr.playing = true;
  _rr.ctx = new (window.AudioContext || window.webkitAudioContext)();
  _rr.gain = _rr.ctx.createGain();
  var vol = document.getElementById('rrVol');
  _rr.gain.gain.value = (vol ? vol.value / 100 : 0.4) * 0.25;
  var filt = _rr.ctx.createBiquadFilter();
  filt.type = 'lowpass'; filt.frequency.value = 1600;
  _rr.gain.connect(filt); filt.connect(_rr.ctx.destination);
  _rr.nodes.push(_rr.gain, filt);
  var overlay = document.getElementById('rrOverlay');
  if (overlay) overlay.style.display = 'none';

  function sched(freq, t0, dur, type, vol) {
    if (!_rr.playing || !_rr.ctx) return;
    var osc = _rr.ctx.createOscillator();
    var g   = _rr.ctx.createGain();
    osc.type = type; osc.frequency.value = freq;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.01);
    g.gain.setValueAtTime(vol, t0 + dur * 0.80);
    g.gain.linearRampToValueAtTime(0, t0 + dur);
    osc.connect(g); g.connect(_rr.gain);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
    _rr.nodes.push(osc);
  }

  var allNotes = _rrMel.map(function(n){ return [n[0],n[1],n[2],'square',0.22]; })
                  .concat(_rrBas.map(function(n){ return [n[0],n[1],n[2],'sawtooth',0.09]; }));
  var loopSec = _rrLoopMs / 1000;
  var LOOKAHEAD = 4.0, TICK_MS = 2000;
  var startT = _rr.ctx.currentTime + 0.05;
  var scheduledUpTo = startT;

  function tick() {
    if (!_rr.playing || !_rr.ctx) return;
    var until = _rr.ctx.currentTime + LOOKAHEAD;
    if (until > scheduledUpTo) {
      var firstIter = Math.max(0, Math.floor((scheduledUpTo - startT) / loopSec));
      for (var i = firstIter; i < firstIter + 3; i++) {
        var base = startT + i * loopSec;
        allNotes.forEach(function(n) {
          var ns = base + (n[0] - _rrMinMs) / 1000;
          if (ns >= scheduledUpTo && ns < until) sched(n[1], ns, n[2]/1000, n[3], n[4]);
        });
      }
      scheduledUpTo = until;
    }
    _rr.timer = setTimeout(tick, TICK_MS);
  }
  tick();

  var prog = document.getElementById('rrProg');
  _rr.progIv = setInterval(function() {
    if (!_rr.playing || !_rr.ctx) { clearInterval(_rr.progIv); return; }
    if (prog) {
      var elapsed = (_rr.ctx.currentTime - startT + _rrMinMs/1000) % loopSec;
      prog.style.width = Math.min(100, (elapsed / loopSec) * 100) + '%';
    }
  }, 200);
}

function rrStop() {
  _rr.playing = false;
  if (_rr.timer) { clearTimeout(_rr.timer); _rr.timer = null; }
  if (_rr.progIv) { clearInterval(_rr.progIv); _rr.progIv = null; }
  _rr.nodes.forEach(function(n){ try{ if(n.stop) n.stop(0); }catch(e){} });
  _rr.nodes = [];
  if (_rr.ctx) { _rr.ctx.close(); _rr.ctx = null; }
  _rr.gain = null;
  var prog = document.getElementById('rrProg');
  if (prog) prog.style.width = '0%';
  var overlay = document.getElementById('rrOverlay');
  if (overlay) overlay.style.display = 'flex';
}

function rrSetVol(v) {
  if (_rr.gain) _rr.gain.gain.value = v / 100 * 0.25;
}

function appMedia() {
  var gifUrl = 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3UxdDh6MGN5OW1zdW1md3BoN2lxdWN3dWYxMXY5YnBudzF3OWIyZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10kABVanhwykJW/giphy.gif';
  createWin({
    id: 'media',
    title: 'Медиаплеер',
    icon: '🎵',
    w: 340, h: 390, resize: false,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">' +
        '<div class="win-dd-item" onclick="closeWin(\'media\')">Выход</div></div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Воспроизведение<div class="win-dd">' +
        '<div class="win-dd-item" onclick="rrPlay()">&#9654; Воспроизвести</div>' +
        '<div class="win-dd-item" onclick="rrStop()">&#9632; Остановить</div></div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="win95toast(\'ПУКПРОМ Медиаплеер v1.0\\nФорматы: .PUK .GAS .RRK\')">О программе</div></div></div>',
    content:
      '<div style="background:#111;height:100%;display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px;box-sizing:border-box">' +
        '<div style="position:relative;border:3px solid #ff0080;box-shadow:0 0 18px #ff0080;flex-shrink:0">' +
          '<img src="' + gifUrl + '" style="width:220px;height:220px;object-fit:cover;display:block;image-rendering:pixelated" alt="Rick Astley">' +
          '<div id="rrOverlay" style="position:absolute;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;cursor:pointer" onclick="rrPlay()">' +
            '<button style="font-family:\'Courier New\',monospace;font-size:13px;background:#ff0080;color:#fff;border:2px solid #fff;padding:10px 18px;cursor:pointer">&#9654; PLAY</button>' +
          '</div>' +
        '</div>' +
        '<div style="width:100%;background:#000;border:1px solid #333;padding:3px 6px;font-size:9px;color:#00ffff;font-family:\'Courier New\',monospace;overflow:hidden;white-space:nowrap" id="rrMarq">Rick Astley -- Never Gonna Give You Up (8-bit Edition)</div>' +
        '<div style="width:100%;height:7px;background:#222;border:1px solid #444;flex-shrink:0">' +
          '<div id="rrProg" style="height:100%;background:linear-gradient(90deg,#ff0080,#00ffff);width:0%;transition:width .1s linear"></div>' +
        '</div>' +
        '<div style="display:flex;gap:6px;align-items:center;width:100%;flex-shrink:0">' +
          '<button onclick="rrPlay()" style="font-family:\'Courier New\',monospace;font-size:9px;padding:4px 10px;background:transparent;border:2px solid #00ff88;color:#00ff88;cursor:pointer">&#9654;</button>' +
          '<button onclick="rrStop()" style="font-family:\'Courier New\',monospace;font-size:9px;padding:4px 10px;background:transparent;border:2px solid #ff0080;color:#ff0080;cursor:pointer">&#9632;</button>' +
          '<span style="font-size:8px;color:#666;font-family:\'Courier New\',monospace">VOL:</span>' +
          '<input type="range" id="rrVol" min="0" max="100" value="40" oninput="rrSetVol(this.value)" style="flex:1;cursor:pointer;accent-color:#ff0080">' +
        '</div>' +
        '<div style="font-size:7px;color:#444;font-family:\'Courier New\',monospace;text-align:center">ПУКПРОМ МЕДИАПЛЕЕР v1.0 -- Rick Astley, 1987</div>' +
      '</div>',
    afterOpen: function() {
      var el = document.getElementById('rrMarq');
      if (!el) return;
      var text = el.textContent + '     ';
      var pos = 0;
      var iv = setInterval(function() {
        if (!document.getElementById('rrMarq')) { clearInterval(iv); return; }
        pos = (pos + 1) % text.length;
        el.textContent = text.slice(pos) + text.slice(0, pos);
      }, 130);
    }
  });
}


// ==================== TASK MANAGER (ДИСПЕТЧЕР ПУКОВ) ====================
var _tmTimer = null;

function appTaskMan() {
  createWin({
    id: 'taskman',
    title: 'Диспетчер пуков',
    icon: '📊',
    w: 420, h: 320,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">' +
        '<div class="win-dd-item" onclick="win95toast(\'Новая задача создана: пук.exe\')">Новая задача...</div>' +
        '<div class="win-dd-sep"></div>' +
        '<div class="win-dd-item" onclick="closeWin(\'taskman\')">Выход</div></div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Вид<div class="win-dd">' +
        '<div class="win-dd-item" onclick="tmRefresh()">Обновить</div>' +
        '<div class="win-dd-item" onclick="win95toast(\'Частота обновления: 2 пука в секунду\')">Частота обновления</div></div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="win95toast(\'Диспетчер пуков v1.0\\nПозволяет управлять пуками в системе\')">О программе</div></div></div>',
    content:
      '<div style="display:flex;flex-direction:column;height:100%;font-size:11px">' +
        // Tabs
        '<div id="tm-tabs" style="display:flex;border-bottom:1px solid #808080;background:#c0c0c0;flex-shrink:0">' +
          '<div class="tm-tab active" onclick="tmTab(\'proc\',this)" style="padding:4px 12px;border-right:1px solid #808080;cursor:default;border-bottom:2px solid #c0c0c0">Приложения</div>' +
          '<div class="tm-tab" onclick="tmTab(\'perf\',this)" style="padding:4px 12px;border-right:1px solid #808080;cursor:default">Быстродействие</div>' +
        '</div>' +
        // Content
        '<div id="tm-body" style="flex:1;overflow:hidden;display:flex;flex-direction:column"></div>' +
        // Bottom bar
        '<div style="border-top:1px solid #808080;padding:4px 8px;background:#c0c0c0;display:flex;gap:8px;flex-shrink:0;align-items:center">' +
          '<span id="tm-proccount" style="flex:1;font-size:10px">Процессов: 0</span>' +
          '<button class="w-btn" onclick="tmKillSelected()" style="width:120px">Снять задачу</button>' +
          '<button class="w-btn" onclick="tmRefresh()" style="width:80px">Обновить</button>' +
        '</div>' +
      '</div>',
    afterOpen: function() {
      tmTab('proc', document.querySelector('#win_taskman .tm-tab'));
      _tmTimer = setInterval(function() {
        if (!document.getElementById('win_taskman')) { clearInterval(_tmTimer); return; }
        tmRefresh();
      }, 2000);
    }
  });
}

var _tmSelId = null;
var _tmCurTab = 'proc';

function tmTab(tab, el) {
  _tmCurTab = tab;
  document.querySelectorAll('#win_taskman .tm-tab').forEach(function(t) {
    t.style.borderBottom = t === el ? '2px solid #c0c0c0' : '';
    t.style.background = t === el ? '#c0c0c0' : '';
    t.style.fontWeight = t === el ? 'bold' : '';
  });
  tmRefresh();
}

function tmRefresh() {
  var body = document.getElementById('tm-body');
  if (!body) return;
  if (_tmCurTab === 'proc') tmRenderProc(body);
  else tmRenderPerf(body);
}

function tmRenderProc(body) {
  // Build fake processes: system ones + open windows
  var sysprocs = [
    { name: 'System Idle Process', pid: '0',   cpu: Math.floor(Math.random()*5),   mem: '16 KB',  status: 'Running' },
    { name: 'пукдос.exe',          pid: '4',   cpu: Math.floor(Math.random()*3),   mem: '420 KB', status: 'Running' },
    { name: 'пукпром.dll',         pid: '8',   cpu: 0,                              mem: '69 KB',  status: 'Running' },
    { name: 'газ-менеджер.exe',    pid: '12',  cpu: Math.floor(Math.random()*8),   mem: '256 KB', status: 'Running' },
    { name: 'svcpuk32.exe',        pid: '24',  cpu: 0,                              mem: '128 KB', status: 'Running' },
    { name: 'explorer.puk',        pid: '100', cpu: Math.floor(Math.random()*4),   mem: '512 KB', status: 'Running' },
  ];
  var winprocs = Object.keys(_wins).map(function(id, i) {
    return { name: (_wins[id].icon||'') + ' ' + _wins[id].title + '.exe', pid: String(200+i*4), cpu: Math.floor(Math.random()*6), mem: Math.floor(Math.random()*1024+128)+' KB', status: 'Running', winId: id };
  });
  var all = sysprocs.concat(winprocs);

  var count = document.getElementById('tm-proccount');
  if (count) count.textContent = 'Процессов: ' + all.length;

  var rows = all.map(function(p) {
    var isSel = _tmSelId === p.pid;
    var bg = isSel ? 'background:#000080;color:#fff;' : '';
    return '<div style="display:flex;padding:2px 4px;cursor:default;' + bg + '" onclick="tmSel(\'' + p.pid + '\')" data-pid="' + p.pid + '">' +
      '<span style="flex:2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + p.name + '</span>' +
      '<span style="width:44px;text-align:right">' + p.pid + '</span>' +
      '<span style="width:44px;text-align:right">' + p.cpu + '%</span>' +
      '<span style="width:70px;text-align:right">' + p.mem + '</span>' +
    '</div>';
  }).join('');

  body.innerHTML =
    '<div style="display:flex;padding:2px 4px;background:#c0c0c0;border-bottom:1px solid #808080;font-weight:bold;flex-shrink:0">' +
      '<span style="flex:2">Имя процесса</span>' +
      '<span style="width:44px;text-align:right">PID</span>' +
      '<span style="width:44px;text-align:right">ЦП</span>' +
      '<span style="width:70px;text-align:right">Память</span>' +
    '</div>' +
    '<div style="flex:1;overflow-y:auto;font-family:\'Courier New\',monospace;font-size:10px">' + rows + '</div>';
}

function tmRenderPerf(body) {
  var cpuLoad = Math.floor(Math.random() * 30 + 5);
  var memUsed = Math.floor(Math.random() * 20 + 40);
  var gasLoad = Math.floor(Math.random() * 60 + 20);

  function bar(pct, color) {
    return '<div style="background:#000;border:1px solid #808080;height:60px;width:100%;position:relative;margin:4px 0">' +
      '<div style="position:absolute;bottom:0;left:0;right:0;height:' + pct + '%;background:' + color + '"></div>' +
      '<span style="position:absolute;top:2px;left:4px;color:#0f0;font-size:9px">' + pct + '%</span>' +
    '</div>';
  }

  body.innerHTML =
    '<div style="padding:8px;overflow-y:auto">' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">' +
        '<div><div style="font-size:9px;font-weight:bold">Загрузка ЦП</div>' + bar(cpuLoad,'#00aa00') + '</div>' +
        '<div><div style="font-size:9px;font-weight:bold">Использ. памяти</div>' + bar(memUsed,'#0000cc') + '</div>' +
        '<div><div style="font-size:9px;font-weight:bold">Газовый резерв</div>' + bar(gasLoad,'#cc6600') + '</div>' +
      '</div>' +
      '<hr style="margin:8px 0">' +
      '<div style="font-size:10px;line-height:1.8">' +
        '<div>Всего памяти: 65 536 KB &nbsp;|&nbsp; Доступно: ' + Math.floor(65536 * (1 - memUsed/100)) + ' KB</div>' +
        '<div>Ядро ПУКДОС: v4.0.950 &nbsp;|&nbsp; Режим пука: ' + _biosSet.pukMode + '</div>' +
        '<div>Turbo: ' + _biosSet.turboMode + ' &nbsp;|&nbsp; Газ: ' + _biosSet.gasCompression + '</div>' +
        '<div>Открытых окон: ' + Object.keys(_wins).length + '</div>' +
      '</div>' +
    '</div>';
}

function tmSel(pid) {
  _tmSelId = pid;
  tmRefresh();
}

function tmKillSelected() {
  if (!_tmSelId) { win95toast('Выберите процесс для снятия.'); return; }
  // Find if it's a window process
  var killed = false;
  Object.keys(_wins).forEach(function(id, i) {
    if (String(200 + i * 4) === _tmSelId) {
      closeWin(id);
      win95toast('Задача снята: ' + _wins[id]?.title || id);
      killed = true;
    }
  });
  if (!killed) {
    if (_tmSelId === '0') { win95toast('Нельзя снять System Idle Process.\nПуки не остановятся.'); }
    else { win95toast('Процесс ' + _tmSelId + ' снят.\nОшибка: пук продолжает пукать.'); }
  }
  _tmSelId = null;
  tmRefresh();
}

// ==================== TASKBAR SETTINGS ====================
var _tbSet = (function(){
  try { return JSON.parse(localStorage.getItem('pukdos_tbset') || 'null') || {}; } catch(e) { return {}; }
})();
_tbSet = Object.assign({ alwaysOnTop:true, autoHide:false, showClock:true, showSound:true, smallButtons:false }, _tbSet);

function applyTbSettings() {
  localStorage.setItem('pukdos_tbset', JSON.stringify(_tbSet));
  var tb = document.getElementById('taskbar');
  if (_tbSet.alwaysOnTop) tb.style.zIndex = '9999'; else tb.style.zIndex = '100';
  if (_tbSet.autoHide) {
    tb.style.bottom = '-26px'; tb.style.transition = 'bottom 0.2s';
    tb.onmouseenter = function(){ tb.style.bottom = '0'; };
    tb.onmouseleave = function(){ tb.style.bottom = '-26px'; };
  } else {
    tb.style.bottom = '0'; tb.style.transition = '';
    tb.onmouseenter = null; tb.onmouseleave = null;
  }
  var clk = document.getElementById('sysclock');
  if (clk) clk.style.display = _tbSet.showClock ? '' : 'none';
  var vol = document.getElementById('vol-btn');
  if (vol) vol.style.display = _tbSet.showSound ? '' : 'none';
  document.querySelectorAll('.tb-win-btn').forEach(function(b) {
    b.style.height = _tbSet.smallButtons ? '18px' : '';
    b.style.fontSize = _tbSet.smallButtons ? '9px' : '';
  });
}
applyTbSettings();

function appTbSettings() {
  if (document.getElementById('win_tbsettings')) { focusWin('tbsettings'); return; }
  function chk(key, label) {
    return '<label style="display:flex;align-items:center;gap:8px;margin:6px 0;cursor:default">' +
      '<input type="checkbox" id="tbchk_'+key+'" style="width:13px;height:13px" ' +
      (_tbSet[key] ? 'checked' : '') + ' onclick="_tbSet.'+key+'=this.checked;applyTbSettings()"> '+label+'</label>';
  }
  createWin({ id:'tbsettings', title:'Настройки панели задач', icon:'📌', w:320, h:270, resize:false,
    x: Math.floor(window.innerWidth/2-160), y: Math.floor((window.innerHeight-28)/2-135),
    content: '<div style="padding:12px 16px;font-size:12px">' +
      '<div style="font-weight:bold;margin-bottom:8px;border-bottom:1px solid #808080;padding-bottom:4px">Параметры</div>' +
      chk('alwaysOnTop','Всегда поверх других окон') +
      chk('autoHide','Автоматически скрывать панель задач') +
      '<div style="font-weight:bold;margin:10px 0 6px;border-bottom:1px solid #808080;padding-bottom:4px">Область уведомлений</div>' +
      chk('showClock','Показывать часы') +
      chk('showSound','Показывать значок громкости') +
      '<div style="font-weight:bold;margin:10px 0 6px;border-bottom:1px solid #808080;padding-bottom:4px">Вид</div>' +
      chk('smallButtons','Мелкие кнопки окон') +
      '<div style="position:absolute;bottom:8px;right:8px;display:flex;gap:4px">' +
        '<button onclick="applyTbSettings();closeWin(\'tbsettings\')" style="min-width:70px">OK</button>' +
        '<button onclick="closeWin(\'tbsettings\')" style="min-width:70px">Отмена</button>' +
      '</div>' +
    '</div>'
  });
}

// ==================== CONTROL PANEL ====================
function appCtrlPanel() {
  if (document.getElementById('win_ctrl')) { focusWin('ctrl'); return; }
  var items = [
    { icon:'🖥️', label:'Экран',         fn:'cpScreen()' },
    { icon:'🔊', label:'Звук',           fn:'cpSound()' },
    { icon:'🖱️', label:'Мышь',          fn:'cpMouse()' },
    { icon:'⌨️', label:'Клавиатура',    fn:'cpKeyboard()' },
    { icon:'🕐', label:'Дата и время',   fn:'cpDateTime()' },
    { icon:'🌐', label:'Сеть',           fn:'cpNetwork()' },
    { icon:'🖨️', label:'Принтеры',      fn:'cpPrinters()' },
    { icon:'⚙️', label:'Система',        fn:'openApp(\'sysinfo\')' },
    { icon:'💾', label:'Хранилище',      fn:'cpStorage()' },
    { icon:'🔧', label:'BIOS',           fn:'cpBios()' },
    { icon:'💨', label:'Газ и Пуки',     fn:'cpGas()' },
    { icon:'🔑', label:'Пароли',         fn:'cpPasswords()' },
  ];
  var icons = items.map(function(it) {
    return '<div style="display:inline-flex;flex-direction:column;align-items:center;width:72px;height:72px;' +
      'justify-content:center;cursor:default;margin:4px;padding:4px;border:1px solid transparent" class="cp-icon" onclick="'+it.fn+'">' +
      '<span style="font-size:26px">'+it.icon+'</span>' +
      '<span style="font-size:10px;text-align:center;margin-top:3px;word-break:break-word">'+it.label+'</span>' +
    '</div>';
  }).join('');

  createWin({ id:'ctrl', title:'Панель управления', icon:'⚙️', w:470, h:340,
    x: Math.floor(window.innerWidth/2-235), y: Math.floor((window.innerHeight-28)/2-170),
    status:'',
    content:
      '<div style="background:#c0c0c0;padding:3px 8px;border-bottom:1px solid #808080;font-size:11px;display:flex;gap:14px">' +
        '<span style="cursor:default" onclick="win95toast(\'Файл\')">Файл</span>' +
        '<span style="cursor:default" onclick="win95toast(\'Правка\')">Правка</span>' +
        '<span style="cursor:default" onclick="win95toast(\'Вид\')">Вид</span>' +
        '<span style="cursor:default" onclick="win95toast(\'Справка ПУКДОС 95\')">Справка</span>' +
      '</div>' +
      '<div style="padding:8px;display:flex;flex-wrap:wrap;overflow-y:auto;height:calc(100% - 26px);align-content:flex-start">' + icons + '</div>'
  });

  setTimeout(function() {
    document.querySelectorAll('.cp-icon').forEach(function(el) {
      el.addEventListener('mouseenter', function(){ this.style.background='#000080'; this.style.color='#fff'; this.style.borderColor='#fff'; });
      el.addEventListener('mouseleave', function(){ this.style.background=''; this.style.color=''; this.style.borderColor='transparent'; });
    });
  }, 100);
}

var _cpColors = [
  { desk:'#008080' }, { desk:'#003060' }, { desk:'#1a1a2e' }, { desk:'#006400' }
];
function cpApplyColor(i) {
  var c = _cpColors[i];
  document.getElementById('desktop').style.background = c.desk;
}
function cpScreen() {
  if (document.getElementById('win_cpscreen')) { focusWin('cpscreen'); return; }
  var desktops = ['Классический ПУКДОС', 'Лесные пуки', 'Звёздный газ', 'Кислотный пук'];
  var colors = ['Серый классик (по умолчанию)','Ночной синий','Тёмный пук','Зелёный газ'];
  createWin({ id:'cpscreen', title:'Экран — Свойства', icon:'🖥️', w:320, h:260, resize:false,
    x: Math.floor(window.innerWidth/2-160), y: Math.floor((window.innerHeight-28)/2-130),
    content: '<div style="padding:12px;font-size:12px">' +
      '<div style="font-weight:bold;margin-bottom:6px">Цветовая схема рабочего стола</div>' +
      colors.map(function(c,i){
        return '<label style="display:flex;align-items:center;gap:6px;cursor:default;margin:3px 0">' +
          '<input type="radio" name="cpclr" value="'+i+'"'+(i===0?' checked':'')+' onclick="cpApplyColor('+i+')"> '+c+'</label>';
      }).join('') +
      '<div style="font-weight:bold;margin:10px 0 6px">Заставка</div>' +
      '<select style="width:100%;font-size:11px" onchange="win95toast(\'Заставка изменена\')">' +
        desktops.map(function(d){return '<option>'+d+'</option>';}).join('') +
      '</select>' +
      '<div style="position:absolute;bottom:8px;right:8px"><button onclick="closeWin(\'cpscreen\')">OK</button></div>' +
    '</div>'
  });
}
function cpSound() {
  if (document.getElementById('win_cpsound')) { focusWin('cpsound'); return; }
  createWin({ id:'cpsound', title:'Звук — Свойства', icon:'🔊', w:300, h:220, resize:false,
    x: Math.floor(window.innerWidth/2-150), y: Math.floor((window.innerHeight-28)/2-110),
    content: '<div style="padding:12px;font-size:12px">' +
      '<div style="font-weight:bold;margin-bottom:10px">Громкость системы</div>' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">' +
        '<span>🔈</span>' +
        '<input type="range" min="0" max="100" value="70" style="flex:1" oninput="setWin95Vol(this.value);document.getElementById(\'cpvpct\').textContent=this.value+\'%\'">' +
        '<span>🔊</span><span id="cpvpct" style="width:32px;text-align:right">70%</span>' +
      '</div>' +
      '<div style="font-weight:bold;margin-bottom:6px">Схема звуков</div>' +
      '<select style="width:100%;font-size:11px"><option>ПУКДОС 95 (по умолчанию)</option><option>Тишина</option><option>Газовый оркестр</option></select>' +
      '<div style="position:absolute;bottom:8px;right:8px"><button onclick="closeWin(\'cpsound\')">OK</button></div>' +
    '</div>'
  });
}
function cpMouse()    { win95toast('🖱️ Настройки мыши\n\nСкорость: ████████░░\nДвойной клик: быстро\nЛевша: нет'); }
function cpKeyboard() { win95toast('⌨️ Настройки клавиатуры\n\nЗадержка: ████░░░░░░\nСкорость повтора: ██████░░░░'); }
function cpNetwork()  { win95toast('🌐 Сеть\n\nАдаптер: PukNet 3000\nIP: 192.168.0.1\nМАС: PUK:00:00:00:FF\nСтатус: Подключено к ГазНету'); }
function cpPrinters() { win95toast('🖨️ Принтеры\n\nПУКПРИНТ-3000 (по умолчанию)\nСтатус: Готов\nОчередь: 0 документов'); }
function cpStorage()  { win95toast('💾 Хранилище\n\nДиск C:\\ — ПУК-диск 95\n  Объём: 640 МБ\n  Свободно: 420 МБ\n\nДиск D:\\ — СолидГаз SSD\n  2048 МБ / 1337 МБ свободно'); }
function cpBios()     { win95toast('⚠️ Для входа в BIOS перезагрузите ПУКДОС 95\nи нажмите DEL при загрузке'); }
function cpGas() {
  var b = _biosSet || {};
  win95toast('💨 Газ и Пуки\n\nPuk Mode: '+(b.pukMode||'MAXIMUM PUK')+'\nGas Compression: '+(b.gasCompression||'AUTO')+'\nFart Coprocessor: '+(b.fartCoprocessor||'ENABLED')+'\nGas Lock: '+(b.gasLock||'OFF')+'\n\nУровень газа: ████████░░ 80%');
}
function cpPasswords() { win95toast('🔑 Пароли\n\nПароль рабочего стола: ••••••••\nПароль хранителя экрана: (не задан)\n\nСовет: используйте сложный пук!'); }

function cpDateTime() {
  if (document.getElementById('win_cpdatetime')) { focusWin('cpdatetime'); return; }
  var now = new Date();
  createWin({ id:'cpdatetime', title:'Дата и время', icon:'🕐', w:280, h:200, resize:false,
    x: Math.floor(window.innerWidth/2-140), y: Math.floor((window.innerHeight-28)/2-100),
    content: '<div style="padding:12px;font-size:12px;text-align:center">' +
      '<div style="font-size:32px;margin-bottom:8px" id="cpdt-clock"></div>' +
      '<div style="margin-bottom:8px">'+now.toLocaleDateString('ru-RU',{weekday:'long',year:'numeric',month:'long',day:'numeric'})+'</div>' +
      '<div style="font-size:10px;color:#666">Часовой пояс: Europe/Pukzburg (UTC+💨)</div>' +
      '<div style="position:absolute;bottom:8px;right:8px"><button onclick="closeWin(\'cpdatetime\')">OK</button></div>' +
    '</div>',
    afterOpen: function() {
      (function tickDT() {
        var el = document.getElementById('cpdt-clock');
        if (!el || !document.getElementById('win_cpdatetime')) return;
        el.textContent = new Date().toLocaleTimeString('ru-RU');
        setTimeout(tickDT, 1000);
      })();
    }
  });
}
