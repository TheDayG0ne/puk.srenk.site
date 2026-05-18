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
    if (!data['C:']) {
      data = {
        'C:': {
          type: 'dir',
          children: {
            'Мои документы': { type: 'dir', children: {} },
            'Рабочий стол':  { type: 'dir', children: {} },
            'Корзина':       { type: 'dir', children: {} },
            'Программы':     { type: 'dir', children: {} },
            'Windows':       { type: 'dir', children: {
              'System': { type: 'dir', children: {} }
            }}
          }
        }
      };
      _save(data);
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
  document.body.appendChild(el);
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

