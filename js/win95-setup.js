// ==================== SETUP WIZARD ====================
var _swStep = 0;
var _swData = {};

function startSetupWizard() {
  _swStep = 0;
  _swData = { login: '', fullName: '', password: '', password2: '', hint: '', theme: 'classic' };
  _showSwStep();
}

function _showSwStep() {
  var id = 'setup-wizard';
  // Remove old wizard if exists
  var old = document.getElementById('win_' + id);
  if (old) old.remove();
  delete _wins[id];

  var steps = [
    _swStep0, _swStep1, _swStep2, _swStep3, _swStep4
  ];
  var titles = ['Добро пожаловать!', 'Имя пользователя', 'Пароль', 'Оформление', 'Завершение'];
  var icons  = ['🎉', '👤', '🔒', '🎨', '✅'];

  var stepHtml = steps[_swStep]();
  var navHtml =
    '<div style="display:flex;justify-content:space-between;padding:8px 12px;border-top:1px solid #808080;margin-top:8px">' +
      (_swStep > 0 ? '<button class="w-btn" onclick="_swPrev()">← Назад</button>' : '<span></span>') +
      '<div style="font-size:10px;color:#808080;align-self:center">Шаг ' + (_swStep+1) + ' из 5</div>' +
      (_swStep < 4
        ? '<button class="w-btn" onclick="_swNext()" style="font-weight:bold">Далее →</button>'
        : '<button class="w-btn" onclick="_swFinish()" style="font-weight:bold;background:#000080;color:#fff">Готово ✓</button>') +
    '</div>';

  createWin({
    id: id, title: icons[_swStep] + ' ' + titles[_swStep] + ' — Мастер настройки ПУКДОС 95',
    icon: icons[_swStep], w: 420, h: 340, resize: false,
    noClose: true,
    content: stepHtml + navHtml
  });
}

function _swStep0() {
  return '<div style="padding:16px;font-size:12px;line-height:1.8">' +
    '<div style="font-size:36px;text-align:center;margin-bottom:12px">💨 🎉 💨</div>' +
    '<h3 style="text-align:center;margin:0 0 12px;color:#000080">Добро пожаловать в ПУКДОС 95!</h3>' +
    '<p>Это первый запуск системы. Мастер настройки поможет вам:</p>' +
    '<ul style="margin-left:16px">' +
      '<li>Создать учётную запись пользователя</li>' +
      '<li>Задать пароль (необязательно)</li>' +
      '<li>Выбрать оформление рабочего стола</li>' +
    '</ul>' +
    '<p style="color:#808080;font-size:10px;margin-top:12px">Для продолжения нажмите <b>Далее</b>.</p>' +
  '</div>';
}

function _swStep1() {
  return '<div style="padding:16px;font-size:12px">' +
    '<div style="font-size:28px;text-align:center;margin-bottom:12px">👤</div>' +
    '<table style="width:100%;border-collapse:collapse">' +
      '<tr><td style="padding:4px 0;width:130px">Имя пользователя:</td>' +
        '<td><input id="sw-login" type="text" value="'+(_swData.login||'')+ '" placeholder="Логин" style="width:200px;padding:3px;border:2px inset #c0c0c0;font-size:12px"></td></tr>' +
      '<tr><td style="padding:4px 0">Полное имя:</td>' +
        '<td><input id="sw-fullname" type="text" value="'+(_swData.fullName||'')+'" placeholder="Имя Фамилия" style="width:200px;padding:3px;border:2px inset #c0c0c0;font-size:12px"></td></tr>' +
    '</table>' +
    '<p style="color:#808080;font-size:10px;margin-top:12px">Имя пользователя будет отображаться на экране входа.</p>' +
  '</div>';
}

function _swStep2() {
  return '<div style="padding:16px;font-size:12px">' +
    '<div style="font-size:28px;text-align:center;margin-bottom:12px">🔒</div>' +
    '<p style="margin-bottom:12px">Задайте пароль для входа в систему (можно оставить пустым):</p>' +
    '<table style="width:100%;border-collapse:collapse">' +
      '<tr><td style="padding:4px 0;width:130px">Пароль:</td>' +
        '<td><input id="sw-pass" type="password" placeholder="Оставьте пустым = без пароля" style="width:200px;padding:3px;border:2px inset #c0c0c0;font-size:12px"></td></tr>' +
      '<tr><td style="padding:4px 0">Подтверждение:</td>' +
        '<td><input id="sw-pass2" type="password" placeholder="Повторите пароль" style="width:200px;padding:3px;border:2px inset #c0c0c0;font-size:12px"></td></tr>' +
      '<tr><td style="padding:4px 0">Подсказка:</td>' +
        '<td><input id="sw-hint" type="text" value="'+(_swData.hint||'')+'" placeholder="Подсказка для восстановления" style="width:200px;padding:3px;border:2px inset #c0c0c0;font-size:12px"></td></tr>' +
    '</table>' +
    '<div id="sw-pass-err" style="color:red;font-size:10px;margin-top:6px"></div>' +
  '</div>';
}

function _swStep3() {
  var themes = [
    { id:'classic', label:'Классическая ПУКДОС 95', bg:'#008080' },
    { id:'dark',    label:'Тёмная тема',             bg:'#1a1a2e' },
    { id:'win98',   label:'Жёлтая',                  bg:'#c8a200' },
    { id:'pink',    label:'Розовая',                 bg:'#cc007a' }
  ];
  return '<div style="padding:16px;font-size:12px">' +
    '<div style="font-size:28px;text-align:center;margin-bottom:12px">🎨</div>' +
    '<p style="margin-bottom:10px">Выберите тему рабочего стола:</p>' +
    '<div style="display:flex;flex-wrap:wrap;gap:8px">' +
      themes.map(function(t) {
        return '<div onclick="_swSelectTheme(\''+t.id+'\')" id="swt_'+t.id+'" style="cursor:pointer;width:85px;height:60px;background:'+t.bg+';display:flex;align-items:flex-end;justify-content:center;padding-bottom:4px;border:2px solid '+(_swData.theme===t.id?'#ff0':'#808080')+';">' +
          '<span style="font-size:9px;color:#fff;background:rgba(0,0,0,0.5);padding:1px 3px">'+t.label+'</span>' +
        '</div>';
      }).join('') +
    '</div>' +
  '</div>';
}

function _swSelectTheme(t) {
  _swData.theme = t;
  var themes = ['classic','dark','win98','pink'];
  themes.forEach(function(id) {
    var el = document.getElementById('swt_' + id);
    if (el) el.style.borderColor = (id === t) ? '#ff0' : '#808080';
  });
}

function _swStep4() {
  return '<div style="padding:16px;font-size:12px;line-height:1.8">' +
    '<div style="font-size:36px;text-align:center;margin-bottom:12px">✅</div>' +
    '<h3 style="text-align:center;margin:0 0 12px;color:#008000">Настройка завершена!</h3>' +
    '<p>Параметры системы сохранены:</p>' +
    '<ul style="margin-left:16px">' +
      '<li>Пользователь: <b>' + (_swData.fullName || _swData.login || 'Пользователь') + '</b></li>' +
      '<li>Логин: <b>' + (_swData.login || 'Пользователь') + '</b></li>' +
      '<li>Пароль: <b>' + (_swData.password ? '••••••••' : 'не задан') + '</b></li>' +
      '<li>Тема: <b>' + (_swData.theme || 'classic') + '</b></li>' +
    '</ul>' +
    '<p style="color:#808080;font-size:10px;margin-top:12px">Нажмите <b>Готово</b> для сохранения настроек.</p>' +
  '</div>';
}

function _swPrev() {
  _swStep--;
  _showSwStep();
}

function _swNext() {
  // Validate current step
  if (_swStep === 1) {
    var login = document.getElementById('sw-login');
    var fn = document.getElementById('sw-fullname');
    _swData.login = (login ? login.value.trim() : '') || 'Пользователь';
    _swData.fullName = fn ? fn.value.trim() : '';
  } else if (_swStep === 2) {
    var p1 = document.getElementById('sw-pass');
    var p2 = document.getElementById('sw-pass2');
    var hint = document.getElementById('sw-hint');
    var pw = p1 ? p1.value : '';
    var pw2 = p2 ? p2.value : '';
    var errEl = document.getElementById('sw-pass-err');
    if (pw && pw !== pw2) {
      if (errEl) errEl.textContent = '⚠ Пароли не совпадают!';
      return;
    }
    _swData.password = pw;
    _swData.hint = hint ? hint.value : '';
  }
  _swStep++;
  _showSwStep();
}

function _swFinish() {
  // Save user data
  _cpSet.user.login    = _swData.login    || 'Пользователь';
  _cpSet.user.fullName = _swData.fullName || _swData.login || 'Пользователь';
  _cpSet.user.password = _swData.password || '';
  _cpSet.user.hint     = _swData.hint     || '';
  _saveCpSet();

  // Apply theme
  var themeMap = {
    classic: { bg: '#008080', winColor: '#000080' },
    dark:    { bg: '#1a1a2e', winColor: '#4a0080' },
    win98:   { bg: '#c8a200', winColor: '#804000' },
    pink:    { bg: '#cc007a', winColor: '#800040' }
  };
  var th = themeMap[_swData.theme] || themeMap.classic;
  var dt = JSON.parse(localStorage.getItem('pukdos_desktop') || '{}');
  dt.bg = th.bg; dt.winColor = th.winColor;
  localStorage.setItem('pukdos_desktop', JSON.stringify(dt));
  applyDesktopTheme();

  // Mark first run done
  localStorage.setItem('pukdos_first_run', '1');

  closeWin('setup-wizard');
  win95balloon('🎉 Настройка завершена! Добро пожаловать, ' + _cpSet.user.fullName + '!', '✅', 'Мастер настройки');
}



// ==================== WINDOW MANAGER GLOBALS ====================
var _wins = {};
var _z = 1000;

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

