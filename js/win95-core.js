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
var _ctxCbs = {};
var _ctxCbIdx = 0;

function showCtxPopup(x, y, items) {
  _ctxCbs = {};
  var m = document.getElementById('ctx-popup');
  var html = items.map(function(item) {
    if (item === '-') return '<div class="ctx95-sep"></div>';
    if (item.title) return '<div class="ctx-title">' + item.title + '</div>';
    var cls = 'ctx95-item' + (item.disabled ? ' dis' : '');
    var onclick = '';
    if (!item.disabled && item.fn) {
      var cbid = 'c' + (++_ctxCbIdx);
      _ctxCbs[cbid] = item.fn;
      onclick = 'onclick="_ctxRun(\'' + cbid + '\')"';
    }
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
function _ctxRun(cbid) {
  hideCtxPopup();
  var fn = _ctxCbs[cbid];
  if (fn) fn();
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
var _timeOffset = 0; // ms offset set by cpDateTime

function startClock(){
  function tick(){
    var d=new Date(Date.now() + _timeOffset);
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
  var now=new Date(Date.now() + _timeOffset);
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
var _win95Vol = (typeof _cpSet !== 'undefined' && _cpSet.sound) ? _cpSet.sound.volume / 100 : 0.7;
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
  if (_cpSet && _cpSet.sound) { _cpSet.sound.volume = parseInt(val); _saveCpSet(); }
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

// ==================== VIRTUAL FILE SYSTEM (VFS) ====================
var _vfs = (function() {
  var VFS_KEY = 'pukdos_vfs';

  function _load() {
    try { return JSON.parse(localStorage.getItem(VFS_KEY) || '{}'); } catch(e) { return {}; }
  }
  function _save(data) {
    try { localStorage.setItem(VFS_KEY, JSON.stringify(data)); } catch(e) {}
  }

  // Init default structure
  function _init() {
    var data = _load();
    // Migrate: rename 'Windows' → 'PUKDOS95' in existing saves
    if (data['C:'] && data['C:'].children && data['C:'].children['Windows'] && !data['C:'].children['PUKDOS95']) {
      data['C:'].children['PUKDOS95'] = data['C:'].children['Windows'];
      delete data['C:'].children['Windows'];
      _save(data);
    }
    if (!data['C:']) {
      var sysFiles = {};
      ['PUKDOS.SYS','COMMAND.PUK','IO.SYS','CONFIG.PUK','AUTOEXEC.PUK','WIN.PUK','WINPUK.INI','SYSTEM.DAT','USER.DAT','DESKTOP.INI'].forEach(function(f){
        sysFiles[f] = { type:'file', content:'; Системный файл ПУКДОС 95\r\n; ' + f + '\r\n; ООО ПУКПРОМ, 1995–' + new Date().getFullYear() + '\r\n', modified: new Date().toISOString() };
      });
      var systemDir = {};
      ['GDI.PUK','USER.PUK','KERNEL32.PUK','SHELL32.PUK','COMCTL32.PUK','PUKCOM.DLL','PUKMM.DLL','PUKNET.DLL','PUKPNP.DLL','MSVCRT.PUK'].forEach(function(f){
        systemDir[f] = { type:'file', content:'; Системная библиотека ПУКДОС\r\n; ' + f, modified: new Date().toISOString() };
      });
      var driverDir = {};
      ['PUKDISP.DRV','PUKSND.DRV','PUKMOUSE.DRV','PUKNET.DRV','PUKPRINT.DRV'].forEach(function(f){
        driverDir[f] = { type:'file', content:'; Драйвер устройства ПУКДОС\r\n; ' + f, modified: new Date().toISOString() };
      });
      var fontsDir = {};
      ['ARIAL.PUF','TIMES.PUF','COURIER.PUF','COMIC.PUF','PUKFONT.PUF'].forEach(function(f){
        fontsDir[f] = { type:'file', content:'; Шрифт ПУКДОС 95\r\n; ' + f, modified: new Date().toISOString() };
      });

      // Программы folders
      var progFiles = {};
      var appDefs = {
        'Блокнот':        ['NOTEPAD.EXE','NOTEPAD.HLP','README.PUK'],
        'Пейнт':          ['PUKPAINT.EXE','PUKPAINT.HLP','BRUSHES.DAT'],
        'Калькулятор':    ['CALC.EXE','CALC.HLP'],
        'Медиаплеер':     ['PUKMEDIA.EXE','CODECS.DAT','PUKMEDIA.HLP'],
        'ПукПлорер':      ['IEPUK.EXE','IEPUK.HLP','COOKIES.DAT','FAVORITES.DAT'],
        'ПУКДУМ':         ['DOOM.EXE','DOOM1.WAD','DOOMDATA.PUK','DOOM.HLP'],
        'Сапёр':          ['WINMINE.EXE','WINMINE.HLP'],
        'Пасьянс':        ['SOL.EXE','SOL.HLP','CARDS.DLL'],
        'Пук-Чат 2000':   ['PUKCHAT.EXE','PUKCHAT.HLP','CONTACTS.DAT'],
        'Пук-Почта':      ['PUKMAIL.EXE','PUKMAIL.HLP','INBOX.DAT'],
        'ПукОфис 95':     ['PUKWORD.EXE','PUKXCEL.EXE','PUKPREZ.EXE','OFFICE95.HLP','LICENSE.TXT'],
        'Пук-Про':        ['PUKPRO.EXE','PUKPRO.HLP'],
        'ПукЭнциклопедия':['PUKENCY.EXE','PUKENCY.DAT','PUKENCY.HLP'],
        'Газосим 3000':   ['GAZSIM.EXE','GAZSIM.DAT','GAZSIM.HLP'],
        'ПукПром':        ['PUKPROM.EXE','PUKPROM.HLP','ABOUTUS.TXT']
      };
      Object.keys(appDefs).forEach(function(appName) {
        var children = {};
        appDefs[appName].forEach(function(f){
          children[f] = { type:'file', content:'; ' + appName + ' — ' + f + '\r\n; Установлено: ' + new Date().toLocaleDateString('ru-RU'), modified: new Date().toISOString() };
        });
        progFiles[appName] = { type:'dir', children: children };
      });

      data = {
        'C:': {
          type: 'dir',
          children: {
            'Мои документы': { type: 'dir', children: {} },
            'Рабочий стол':  { type: 'dir', children: {} },
            'Корзина':       { type: 'dir', children: {} },
            'Программы':     { type: 'dir', children: progFiles },
            'PUKDOS95': { type: 'dir', children: Object.assign({}, sysFiles, {
              'System':  { type: 'dir', children: systemDir },
              'Drivers': { type: 'dir', children: driverDir },
              'Fonts':   { type: 'dir', children: fontsDir },
              'Temp':    { type: 'dir', children: {} },
              'Logs':    { type: 'dir', children: {
                'BOOT.LOG':   { type:'file', content:'[ПукДОС 95 Boot Log]\r\nЗагрузка: ' + new Date().toLocaleString('ru-RU') + '\r\nВсе пуки в норме.\r\n', modified: new Date().toISOString() },
                'SYSTEM.LOG': { type:'file', content:'[ПукДОС 95 System Log]\r\nСистема запущена успешно.\r\n', modified: new Date().toISOString() }
              }}
            })}
          }
        }
      };
      _save(data);
    } else {
      // Ensure PUKDOS95 exists in old saves
      if (!data['C:'].children['PUKDOS95']) {
        data['C:'].children['PUKDOS95'] = { type: 'dir', children: {
          'System':  { type: 'dir', children: {} },
          'Drivers': { type: 'dir', children: {} },
          'Fonts':   { type: 'dir', children: {} },
          'Temp':    { type: 'dir', children: {} }
        }};
        _save(data);
      }
      // Ensure Программы has app subfolders
      if (!data['C:'].children['Программы']) {
        data['C:'].children['Программы'] = { type: 'dir', children: {} };
        _save(data);
      }
    }
    return data;
  }

  // Resolve path like "C:/Мои документы/file.txt" → node + parent
  function _resolve(path) {
    var parts = path.replace(/\\/g, '/').split('/').filter(Boolean);
    var data = _load();
    var node = data;
    var parent = null;
    var lastName = '';
    for (var i = 0; i < parts.length; i++) {
      parent = node;
      lastName = parts[i];
      if (i === 0) {
        node = data[parts[i]];
      } else {
        node = node && node.children && node.children[parts[i]];
      }
    }
    return { node: node, parent: parent, name: lastName, data: data };
  }

  var api = {
    init: _init,

    listDir: function(path) {
      var r = _resolve(path);
      if (!r.node || r.node.type !== 'dir') return null;
      return Object.keys(r.node.children || {}).map(function(name) {
        return { name: name, type: r.node.children[name].type, size: r.node.children[name].content ? r.node.children[name].content.length : 0 };
      });
    },

    createDir: function(path) {
      var parts = path.replace(/\\/g, '/').split('/').filter(Boolean);
      var data = _load();
      var node = data;
      for (var i = 0; i < parts.length; i++) {
        var k = parts[i];
        if (i === 0) {
          if (!data[k]) data[k] = { type: 'dir', children: {} };
          node = data[k];
        } else {
          if (!node.children) node.children = {};
          if (!node.children[k]) node.children[k] = { type: 'dir', children: {} };
          node = node.children[k];
        }
      }
      _save(data);
    },

    writeFile: function(path, content) {
      var parts = path.replace(/\\/g, '/').split('/').filter(Boolean);
      var data = _load();
      var node = data;
      for (var i = 0; i < parts.length - 1; i++) {
        var k = parts[i];
        if (i === 0) {
          if (!data[k]) data[k] = { type: 'dir', children: {} };
          node = data[k];
        } else {
          if (!node.children) node.children = {};
          if (!node.children[k]) node.children[k] = { type: 'dir', children: {} };
          node = node.children[k];
        }
      }
      if (!node.children) node.children = {};
      var fname = parts[parts.length - 1];
      node.children[fname] = { type: 'file', content: content, modified: new Date().toISOString() };
      _save(data);
    },

    readFile: function(path) {
      var r = _resolve(path);
      if (!r.node || r.node.type !== 'file') return null;
      return r.node.content || '';
    },

    deleteFile: function(path) {
      var parts = path.replace(/\\/g, '/').split('/').filter(Boolean);
      var data = _load();
      var node = data;
      for (var i = 0; i < parts.length - 1; i++) {
        var k = parts[i];
        node = (i === 0) ? data[k] : (node.children && node.children[k]);
        if (!node) return false;
      }
      var fname = parts[parts.length - 1];
      var parent = (parts.length === 1) ? data : (node.children || {});
      if (!parent[fname]) return false;
      delete parent[fname];
      _save(data);
      return true;
    },

    moveToTrash: function(path) {
      var content = api.readFile(path);
      var name = path.split('/').pop() || path.split('\\').pop();
      if (content !== null) {
        api.writeFile('C:/Корзина/' + name, content);
      }
      api.deleteFile(path);
    },

    emptyTrash: function() {
      var items = api.listDir('C:/Корзина/') || [];
      items.forEach(function(item) {
        api.deleteFile('C:/Корзина/' + item.name);
      });
    },

    restoreFromTrash: function(name) {
      var src = 'C:/Корзина/' + name;
      var content = api.readFile(src);
      if (content !== null) {
        api.writeFile('C:/Мои документы/' + name, content);
        api.deleteFile(src);
        return true;
      }
      return false;
    },

    deleteDir: function(path) {
      // Recursively delete directory
      var items = api.listDir(path + '/') || api.listDir(path) || [];
      items.forEach(function(item) {
        var childPath = path.replace(/\/?$/, '/') + item.name;
        if (item.type === 'dir') api.deleteDir(childPath);
        else api.deleteFile(childPath);
      });
      // Now remove the dir node itself
      var parts = path.replace(/\/+$/, '').replace(/\\/g, '/').split('/').filter(Boolean);
      var data = _load();
      var node = data;
      for (var i = 0; i < parts.length - 1; i++) {
        var k = parts[i];
        node = (i === 0) ? data[k] : (node && node.children && node.children[k]);
        if (!node) return false;
      }
      var dname = parts[parts.length - 1];
      var parent = (parts.length === 1) ? data : (node && node.children || {});
      if (parent[dname]) { delete parent[dname]; _save(data); }
      return true;
    },

    exists: function(path) {
      return !!_resolve(path).node;
    },

    getRoots: function() {
      var data = _load();
      return Object.keys(data);
    }
  };

  _init();
  return api;
})();

// ==================== WIN95 SOUNDS ====================
function playWin95Sound(type) {
  // Respect sound scheme: 1 = Тишина (mute all), 2 = Газовый оркестр (normal + extra)
  if (_cpSet && _cpSet.sound && _cpSet.sound.scheme === 1) return;
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
    } else if(type==='error'){
      // Classic Win95 ding-dong error chord
      note(494,0.0, 0.12,0.5,'square');
      note(370,0.0, 0.12,0.3,'square');
      note(294,0.12,0.25,0.5,'square');
      note(220,0.12,0.25,0.3,'square');
      puk(0.0, 160, 0.15);
      setTimeout(function(){ ac.close(); },600);
    } else if(type==='balloon'){
      // Soft notification ding
      note(880,0.0, 0.08,0.25,'sine');
      note(1108,0.08,0.15,0.2,'sine');
      setTimeout(function(){ ac.close(); },400);
    } else if(type==='question'){
      // Question beep
      note(660,0.0, 0.1, 0.3,'square');
      note(880,0.1, 0.2, 0.4,'square');
      setTimeout(function(){ ac.close(); },500);
    }
  } catch(e){}
}

// ==================== TOAST ====================
// ==================== NOTIFICATIONS ====================

// Balloon notification from systray (for short feedback messages)
function win95balloon(msg, icon, title) {
  var old = document.getElementById('w95-balloon');
  if (old) { old.style.opacity = '0'; setTimeout(function() { if (old.parentNode) old.remove(); }, 200); }

  // Show systray notification icon
  var stIcon = document.getElementById('systray-balloon-icon');
  if (stIcon) { stIcon.textContent = icon || '💬'; stIcon.style.display = 'inline'; }

  var el = document.createElement('div');
  el.id = 'w95-balloon';
  el.className = 'w95balloon';
  el.innerHTML =
    '<div class="w95balloon-hdr">' +
      '<span>' + (icon ? icon + ' ' : '💨 ') + (title || 'ПУКДОС 95') + '</span>' +
      '<span class="w95balloon-close" title="Закрыть">✕</span>' +
    '</div>' +
    '<div class="w95balloon-body">' + msg + '</div>';
  // Remove fixed CSS positioning - we'll set it dynamically
  el.style.position = 'fixed';
  document.body.appendChild(el);

  // Position above systray after layout
  requestAnimationFrame(function() {
    // Try to anchor to systray clock or notification icon
    var anchor = document.getElementById('systray-balloon-icon') || document.getElementById('systray-time');
    if (anchor) {
      var rect = anchor.getBoundingClientRect();
      var bw = el.offsetWidth || 200;
      var bh = el.offsetHeight || 60;
      var left = Math.max(4, rect.right - bw);
      var top = rect.top - bh - 6;
      el.style.right = '';
      el.style.bottom = '';
      el.style.left = left + 'px';
      el.style.top = top + 'px';
    }
  });

  playWin95Sound('balloon');

  function dismissBalloon() {
    clearTimeout(timer);
    el.style.opacity = '0';
    setTimeout(function() { if (el.parentNode) el.remove(); }, 300);
    if (stIcon) { stIcon.style.display = 'none'; stIcon.textContent = ''; }
  }

  var timer = setTimeout(dismissBalloon, 5000);
  el.querySelector('.w95balloon-close').addEventListener('click', dismissBalloon);
}

// Message box dialog window (for multiline or important messages)
function win95msgbox(msg, title, icon) {
  var id = 'msgbox' + Date.now();
  var safeMsg = (msg || '').replace(/\n/g, '<br>');
  createWin({
    id: id,
    title: title || 'ПУКДОС 95',
    icon: icon || 'ℹ️',
    content:
      '<div style="display:flex;gap:14px;padding:16px 16px 8px;align-items:flex-start;">' +
        '<div style="font-size:32px;flex-shrink:0;line-height:1;">' + (icon || 'ℹ️') + '</div>' +
        '<div style="font-size:12px;line-height:1.6;word-break:break-word;">' + safeMsg + '</div>' +
      '</div>' +
      '<div style="display:flex;justify-content:center;padding:8px 16px 14px;">' +
        '<button class="w-btn" style="min-width:80px;" onclick="closeWin(\'' + id + '\')">OK</button>' +
      '</div>',
    w: 320, h: 170, resize: false
  });
}

// Smart router: short → balloon, multiline/long → msgbox dialog
function win95toast(msg, icon, title) {
  if (!msg) return;
  if (msg.includes('\n') || msg.length > 80) {
    win95msgbox(msg, title, icon);
  } else {
    win95balloon(msg, icon, title);
  }
}

// Internal input dialog (replaces browser prompt())
function win95input(title, label, defaultValue, onOk) {
  var id = 'w95input_' + Date.now();
  var safeDefault = (defaultValue || '').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  createWin({
    id: id, title: title, icon: '✏️', w: 320, h: 140, resize: false,
    content:
      '<div style="padding:12px 16px">' +
        '<div style="font-size:12px;margin-bottom:8px">' + (label || 'Введите значение:') + '</div>' +
        '<input type="text" id="w95input_field_' + id + '" value="' + safeDefault + '" ' +
          'style="width:100%;box-sizing:border-box;border:2px inset #808080;padding:3px 5px;font-family:inherit;font-size:12px;outline:none" ' +
          'onkeydown="if(event.key===\'Enter\')document.getElementById(\'w95input_ok_' + id + '\').click()">' +
        '<div style="display:flex;gap:8px;justify-content:center;margin-top:12px">' +
          '<button class="w-btn" id="w95input_ok_' + id + '" style="min-width:70px" ' +
            'onclick="(function(){var v=document.getElementById(\'w95input_field_' + id + '\').value;closeWin(\'' + id + '\');if(window[\'_w95input_cb_' + id + '\'])window[\'_w95input_cb_' + id + '\'](v);})()">OK</button>' +
          '<button class="w-btn" style="min-width:70px" onclick="closeWin(\'' + id + '\')">Отмена</button>' +
        '</div>' +
      '</div>',
    afterOpen: function() {
      var inp = document.getElementById('w95input_field_' + id);
      if (inp) { inp.focus(); inp.select(); }
    }
  });
  window['_w95input_cb_' + id] = onOk;
}

// Internal confirm dialog
function win95confirm(msg, onYes, onNo) {
  var id = 'w95confirm_' + Date.now();
  createWin({
    id: id, title: 'Подтверждение', icon: '❓', w: 320, h: 150, resize: false,
    content:
      '<div style="padding:16px;display:flex;gap:12px;align-items:flex-start">' +
        '<div style="font-size:32px;flex-shrink:0">❓</div>' +
        '<div style="font-size:12px;line-height:1.6">' + msg + '</div>' +
      '</div>' +
      '<div style="display:flex;gap:8px;justify-content:center;padding:0 16px 14px">' +
        '<button class="w-btn" style="min-width:70px" onclick="closeWin(\'' + id + '\');if(window[\'_w95conf_y_' + id + '\'])window[\'_w95conf_y_' + id + '\']()">Да</button>' +
        '<button class="w-btn" style="min-width:70px" onclick="closeWin(\'' + id + '\');if(window[\'_w95conf_n_' + id + '\'])window[\'_w95conf_n_' + id + '\']()">Нет</button>' +
        '<button class="w-btn" style="min-width:70px" onclick="closeWin(\'' + id + '\')">Отмена</button>' +
      '</div>'
  });
  window['_w95conf_y_' + id] = onYes;
  window['_w95conf_n_' + id] = onNo;
}

// File picker dialog - shows files in a VFS path and calls callback(fullPath, name)
function win95filePicker(startPath, onSelect) {
  var id = 'w95filepicker_' + Date.now();
  var currentPickPath = startPath || 'C:/Мои документы';

  function renderPickList() {
    var list = document.getElementById('w95fp_list_' + id);
    if (!list) return;
    var items = (_vfs.listDir(currentPickPath) || []).filter(function(f){ return f.type === 'file'; });
    list.innerHTML = items.length === 0
      ? '<div style="color:#808080;padding:8px;text-align:center">Нет файлов</div>'
      : items.map(function(f) {
          var safeName = f.name.replace(/'/g, '&#39;');
          return '<div class="win-dd-item" style="padding:4px 8px;font-size:11px;cursor:pointer" ' +
            'onclick="document.getElementById(\'w95fp_name_' + id + '\').value=\'' + safeName + '\'" ' +
            'ondblclick="document.getElementById(\'w95fp_ok_' + id + '\').click()">' +
            '📄 ' + f.name + '</div>';
        }).join('');
  }

  createWin({
    id: id, title: 'Открыть файл', icon: '📂', w: 340, h: 260, resize: false,
    content:
      '<div style="padding:8px;display:flex;flex-direction:column;height:100%">' +
        '<div style="font-size:11px;margin-bottom:4px;color:#808080">Папка: ' + currentPickPath + '</div>' +
        '<div id="w95fp_list_' + id + '" style="flex:1;overflow-y:auto;border:2px inset #808080;background:#fff;margin-bottom:8px"></div>' +
        '<div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">' +
          '<span style="font-size:11px;white-space:nowrap">Имя файла:</span>' +
          '<input type="text" id="w95fp_name_' + id + '" style="flex:1;border:2px inset #808080;padding:2px 5px;font-family:inherit;font-size:11px;outline:none" ' +
            'onkeydown="if(event.key===\'Enter\')document.getElementById(\'w95fp_ok_' + id + '\').click()">' +
        '</div>' +
        '<div style="display:flex;gap:8px;justify-content:center">' +
          '<button class="w-btn" id="w95fp_ok_' + id + '" style="min-width:70px" ' +
            'onclick="(function(){var n=document.getElementById(\'w95fp_name_' + id + '\').value.trim();if(!n)return;var p=\'' + currentPickPath + '/\'+n;closeWin(\'' + id + '\');if(window[\'_w95fp_cb_' + id + '\'])window[\'_w95fp_cb_' + id + '\'](p,n);})()">Открыть</button>' +
          '<button class="w-btn" style="min-width:70px" onclick="closeWin(\'' + id + '\')">Отмена</button>' +
        '</div>' +
      '</div>',
    afterOpen: function() { renderPickList(); }
  });
  window['_w95fp_cb_' + id] = onSelect;
}

