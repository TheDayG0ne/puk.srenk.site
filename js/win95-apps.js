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
    case 'mydocs':     appMyDocs(); break;
    case 'minesweeper':appMinesweeper(); break;
    case 'solitaire':  appSolitaire(); break;
    case 'chat':       appChat(); break;
    case 'pukmail':    appPukMail(); break;
    case 'texteditor': appNotepad(); break;
    case 'pukpro':     appPukPro(); break;
    case 'gazsim':     appGazSim(); break;
    case 'ency':       appEncy(); break;
    case 'pukword':    appPukWord(); break;
    case 'pukexcel':   appPukExcel(); break;
    case 'pukprez':    appPukPrez(); break;
  }
}

// ==================== ABOUT DIALOG ====================
function aboutWin(id, appname, version, icon, desc, copyright) {
  var wid = 'about_' + id;
  if (document.getElementById('win_' + wid)) { focusWin(wid); return; }
  copyright = copyright || 'PukProm Inc. &copy; 1993-' + new Date().getFullYear();
  createWin({ id: wid, title: 'О программе — ' + appname, icon: 'ℹ️', w: 360, h: 220, resize: false,
    x: Math.floor(window.innerWidth/2 - 180), y: Math.floor((window.innerHeight-28)/2 - 110),
    content: '<div style="padding:16px;display:flex;flex-direction:column;height:100%;box-sizing:border-box">' +
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">' +
        '<span style="font-size:40px">' + (icon||'🖥️') + '</span>' +
        '<div>' +
          '<div style="font-size:14px;font-weight:bold">' + appname + '</div>' +
          '<div style="font-size:11px;color:#444;margin-top:2px">Версия ' + (version||'1.0') + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="border-top:1px solid #808080;border-left:0;padding-top:8px;flex:1;font-size:11px;line-height:1.6">' +
        (desc ? '<div style="margin-bottom:6px">' + desc + '</div>' : '') +
        '<div style="color:#444">' + copyright + '</div>' +
      '</div>' +
      '<div style="text-align:center;margin-top:8px">' +
        '<button onclick="closeWin(\'' + wid + '\')" style="min-width:80px">OK</button>' +
      '</div>' +
    '</div>'
  });
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
// ==================== MY COMPUTER ====================
function appMyPC(){
  appExplorer('C:/');
}
function mcSel(el,type){
  if(!el) return;
  el.closest('.expl-tree').querySelectorAll('.expl-ti').forEach(function(t){ t.classList.remove('sel'); });
  el.classList.add('sel');
  var con=document.getElementById('mypc-con'); if(!con) return;
  var sb=document.getElementById('sb_mypc');
  if(type==='c'){
    var items = _vfs.listDir('C:/') || [];
    var html = items.map(function(f){
      var icon = f.type==='dir' ? '📁' : '📄';
      var dbl = f.type==='dir'
        ? 'win95toast(\'Открыто: '+f.name+'\')'
        : 'appNotepad(\''+f.name+'\',_vfs.readFile(\'C:/'+f.name+'\'),\'C:/'+f.name+'\')';
      return '<div class="expl-item" ondblclick="'+dbl+'"><div class="ei-icon">'+icon+'</div><div class="ei-lbl">'+f.name+'</div></div>';
    }).join('');
    if(!html) html='<div style="color:#808080;padding:20px;text-align:center">Диск C: пуст.</div>';
    con.innerHTML=html;
    if(sb) sb.textContent='Диск C: — Файлов: '+items.length+' | 420 МБ свободно';
  } else if(type==='d'){
    con.innerHTML='<div style="color:#808080;padding:20px;text-align:center">Диск D: пуст.<br>Как твой аргумент.</div>';
    if(sb) sb.textContent='Диск D: — 0 объектов | 696 МБ свободно';
  } else if(type==='a'){
    var hasFloppy = (typeof _biosSet !== 'undefined' && _biosSet.bootDevice1 === 'floppy');
    var floppyLabel = window._selectedDisk || 'нет дискеты';
    if(hasFloppy){
      con.innerHTML='<div style="color:#004080;padding:20px;text-align:center">💿 Дискета ['+floppyLabel+'] вставлена.</div>';
      if(sb) sb.textContent='Диск A: — дискета вставлена';
    } else {
      con.innerHTML='<div style="color:#808080;padding:20px;text-align:center">⚠ Диск A: не готов.<br>Вставьте дискету с пуками.</div>';
      if(sb) sb.textContent='Диск A: — не готов';
    }
  } else {
    var rootItems = _vfs.listDir('C:/') || [];
    con.innerHTML=
      '<div class="expl-item" ondblclick="mcSel(document.querySelector(\'#mypc-tree .expl-ti\'),\'c\')"><div class="ei-icon">💾</div><div class="ei-lbl">Диск C:<br>('+rootItems.length+' файлов)</div></div>'+
      '<div class="expl-item"><div class="ei-icon">💿</div><div class="ei-lbl">Диск D:</div></div>'+
      '<div class="expl-item"><div class="ei-icon">📀</div><div class="ei-lbl">Диск A:</div></div>';
    if(sb) sb.textContent='Объектов: 3';
  }
}

// ==================== EXPLORER ====================
function appExplorer(startPath) {
  var eid = 'explorer';
  if (_wins[eid]) {
    focusWin(eid);
    if (_wins[eid].min) restoreWin(eid);
    if (startPath) _exNav(startPath);
    return;
  }
  var _exPath = startPath || 'C:/';
  var _exHistory = [_exPath];
  var _exHistIdx = 0;

  function _exCrumb() {
    var parts = _exPath.replace(/\/+$/,'').split('/').filter(Boolean);
    var crumbs = [];
    var built = '';
    parts.forEach(function(p) {
      built += (built ? '/' : '') + p;
      var bp = built + '/';
      crumbs.push('<span style="cursor:pointer;color:#000080;text-decoration:underline" onclick="_exNav(\'' + bp.replace(/'/g,'\\\'') + '\')">' + p + '</span>');
    });
    return crumbs.join(' <span style="color:#808080">›</span> ');
  }

  var _exSel = null; // currently selected item name

  function _exGetIcon(name, type) {
    if (type === 'dir') return '📁';
    var ext = name.split('.').pop().toLowerCase();
    var imgExts = ['png','jpg','jpeg','gif','bmp','webp','ico','svg'];
    var docExts = ['doc','docx','rtf'];
    var xlsExts = ['xls','xlsx','csv'];
    var pptExts = ['ppt','pptx'];
    if (imgExts.indexOf(ext) !== -1) return '🖼️';
    if (docExts.indexOf(ext) !== -1) return '📄';
    if (xlsExts.indexOf(ext) !== -1) return '📊';
    if (pptExts.indexOf(ext) !== -1) return '📑';
    if (ext === 'txt') return '📝';
    if (ext === 'exe') return '⚙️';
    return '📄';
  }

  function _exRender() {
    var bar = document.getElementById('ex-path-bar');
    if (bar) bar.innerHTML = '📁 ' + _exCrumb();
    var items = _vfs.listDir(_exPath) || [];
    var sb = document.getElementById('sb_' + eid);
    if (sb) sb.textContent = _exPath + ' — ' + items.length + ' объектов';
    var html = items.length === 0
      ? '<div style="color:#808080;padding:20px;text-align:center">Папка пуста</div>'
      : '<div style="padding:4px;display:flex;flex-wrap:wrap;gap:2px;align-content:flex-start">' +
          items.map(function(f) {
            var icon = _exGetIcon(f.name, f.type);
            var safeName = f.name.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
            var isSel = _exSel === f.name;
            return '<div class="expl-item' + (isSel ? ' sel' : '') + '" ' +
              'onclick="event.stopPropagation();_exSelect(\'' + safeName + '\')" ' +
              'ondblclick="_exOpen(\'' + safeName + '\')" ' +
              'oncontextmenu="event.preventDefault();event.stopPropagation();_exSelect(\'' + safeName + '\');_exCtx(event,\'' + safeName + '\',\'' + f.type + '\')">' +
              '<div class="ei-icon">' + icon + '</div>' +
              '<div class="ei-lbl">' + f.name + '</div>' +
            '</div>';
          }).join('') +
        '</div>';
    var con = document.getElementById('ex-con');
    if (con) con.innerHTML = html;
  }

  window._exSelect = function(name) {
    _exSel = name;
    // Update visual selection without full re-render
    var con = document.getElementById('ex-con');
    if (!con) return;
    con.querySelectorAll('.expl-item').forEach(function(el) {
      var lbl = el.querySelector('.ei-lbl');
      if (lbl && lbl.textContent === name) el.classList.add('sel');
      else el.classList.remove('sel');
    });
    var sb = document.getElementById('sb_' + eid);
    if (sb) { var items = _vfs.listDir(_exPath)||[]; sb.textContent = 'Выделено: ' + name + ' — ' + items.length + ' объектов'; }
  };

  window._exNav = function(path) {
    _exPath = path; _exSel = null;
    window._exPath = _exPath;
    if (_exHistIdx < _exHistory.length - 1) _exHistory = _exHistory.slice(0, _exHistIdx + 1);
    _exHistory.push(path);
    _exHistIdx = _exHistory.length - 1;
    _exRender();
  };
  window._exBack = function() {
    if (_exHistIdx > 0) { _exHistIdx--; _exPath = _exHistory[_exHistIdx]; _exSel = null; window._exPath = _exPath; _exRender(); }
  };
  window._exForward = function() {
    if (_exHistIdx < _exHistory.length - 1) { _exHistIdx++; _exPath = _exHistory[_exHistIdx]; _exSel = null; window._exPath = _exPath; _exRender(); }
  };
  window._exCopy = function() {
    if (!_exSel) return;
    var fp = _exPath + _exSel;
    var c = _vfs.readFile(fp);
    if (c !== null) { window._exClipboard = { name: _exSel, path: fp, content: c, op: 'copy' }; win95balloon('Скопировано: ' + _exSel, '📋'); }
  };
  window._exCut = function() {
    if (!_exSel) return;
    var fp = _exPath + _exSel;
    var c = _vfs.readFile(fp);
    if (c !== null) { window._exClipboard = { name: _exSel, path: fp, content: c, op: 'cut' }; win95balloon('Вырезано: ' + _exSel, '✂️'); }
  };
  window._exPaste = function() {
    if (!window._exClipboard) return;
    _vfs.writeFile(_exPath + window._exClipboard.name, window._exClipboard.content);
    if (window._exClipboard.op === 'cut') _vfs.deleteFile(window._exClipboard.path);
    window._exClipboard = null;
    _exRender();
  };
  window._exOpen = function(name) {
    var fullPath = _exPath + name;
    var items = _vfs.listDir(_exPath) || [];
    var entry = items.filter(function(f){ return f.name === name; })[0];
    if (entry && entry.type === 'dir') {
      _exNav(_exPath + name + '/');
    } else {
      var ext = name.split('.').pop().toLowerCase();
      var imgExts = ['png','jpg','jpeg','gif','bmp','webp','ico','svg'];
      if (imgExts.indexOf(ext) !== -1) {
        // Open image in Paint via VFS
        var data = _vfs.readFile(fullPath);
        if (data) {
          if (!_wins['paint']) appPaint();
          setTimeout(function() {
            var img = new Image();
            img.onload = function() {
              var cv = document.getElementById('pcv');
              if (!cv || !_pCtx) return;
              _pCtx.fillStyle = '#fff';
              _pCtx.fillRect(0, 0, cv.width, cv.height);
              var scale = Math.min(cv.width / img.width, cv.height / img.height);
              _pCtx.drawImage(img, (cv.width - img.width*scale)/2, (cv.height - img.height*scale)/2, img.width*scale, img.height*scale);
              var wb = document.querySelector('#win_paint .win-titlebar-text');
              if (wb) wb.textContent = name + ' — Пейнт';
              _paintDirty = false;
            };
            img.src = data;
          }, _wins['paint'] ? 0 : 400);
        } else win95msgbox('Невозможно открыть изображение: ' + name, 'Ошибка', '⚠️');
      } else {
        // Open in Notepad
        var content = _vfs.readFile(fullPath);
        if (content !== null) appNotepad(name, content, fullPath);
        else win95msgbox('Невозможно открыть файл: ' + name, 'Ошибка', '⚠️');
      }
    }
  };

  function _exRename(name, type) {
    var fullPath = _exPath + name;
    win95input('Переименовать', 'Новое имя:', name, function(newName) {
      if (!newName || newName === name) return;
      var newPath = _exPath + newName;
      if (type === 'file') {
        var c = _vfs.readFile(fullPath);
        _vfs.writeFile(newPath, c || '');
        _vfs.deleteFile(fullPath);
      } else {
        // Rename folder: copy all contents
        var children = _vfs.listDir(fullPath + '/') || [];
        _vfs.createDir(newPath);
        children.forEach(function(ch) {
          var src = fullPath + '/' + ch.name;
          var dst = newPath + '/' + ch.name;
          if (ch.type === 'file') { _vfs.writeFile(dst, _vfs.readFile(src) || ''); _vfs.deleteFile(src); }
        });
        _vfs.deleteDir(fullPath);
      }
      _exSel = newName;
      _exRender();
    });
  }

  function _exDelete(name, type) {
    var fullPath = _exPath + name;
    win95confirm('Удалить ' + (type === 'dir' ? 'папку' : 'файл') + ' "' + name + '"?', function() {
      if (type === 'dir') {
        var children = _vfs.listDir(fullPath + '/') || [];
        children.forEach(function(ch) { if (ch.type === 'file') _vfs.deleteFile(fullPath + '/' + ch.name); });
        _vfs.deleteDir(fullPath);
      } else {
        _vfs.moveToTrash(fullPath);
      }
      if (_exSel === name) _exSel = null;
      win95balloon('Удалено: ' + name, '🗑️');
      if (window._updateTrashIcon) _updateTrashIcon();
      _exRender();
    }, null);
  }

  window._exCtx = function(e, name, type) {
    var fullPath = _exPath + name;
    var items = [];
    items.push({ title: name });
    items.push({ label: type === 'dir' ? '📂 Открыть' : '📄 Открыть', fn: function() { _exOpen(name); } });
    if (type === 'file') {
      var ext = name.split('.').pop().toLowerCase();
      var docExts = ['doc','docx','rtf'];
      var xlsExts = ['xls','xlsx','csv'];
      var pptExts = ['ppt','pptx'];
      var imgExts = ['png','jpg','jpeg','gif','bmp','webp'];
      if (docExts.indexOf(ext) !== -1) items.push({ label: '📄 Открыть в ПукВорд', fn: function() { var c=_vfs.readFile(fullPath); if(c!==null){appPukWord();setTimeout(function(){var ed=document.getElementById('pw-editor');if(ed)ed.innerHTML=c;},300);} } });
      else if (xlsExts.indexOf(ext) !== -1) items.push({ label: '📊 Открыть в ПукЭксель', fn: function() { appPukExcel(); } });
      else if (pptExts.indexOf(ext) !== -1) items.push({ label: '📑 Открыть в ПукПрез', fn: function() { appPukPrez(); } });
      else if (imgExts.indexOf(ext) !== -1) items.push({ label: '🎨 Открыть в Пейнт', fn: function() { _exOpen(name); } });
      else items.push({ label: '📝 Открыть в Блокноте', fn: function() { var c=_vfs.readFile(fullPath); if(c!==null) appNotepad(name,c,fullPath); } });
    }
    items.push('-');
    items.push({ label: '✏️ Переименовать', fn: function() { _exRename(name, type); } });
    items.push({ label: '🗑️ Удалить', fn: function() { _exDelete(name, type); } });
    items.push('-');
    items.push({ label: 'ℹ️ Свойства', fn: function() {
      var size = type === 'file' ? (_vfs.readFile(fullPath)||'').length + ' байт' : ((_vfs.listDir(fullPath+'/')||[]).length) + ' объектов';
      win95msgbox('<b>' + name + '</b><br>Тип: ' + (type === 'dir' ? 'Папка' : 'Файл') + '<br>Путь: ' + fullPath + '<br>Размер: ' + size, 'Свойства', 'ℹ️');
    }});
    showCtxPopup(e.clientX, e.clientY, items);
  };
  window._exNewFile = function() {
    win95input('Новый файл', 'Имя файла:', 'новый файл.txt', function(name) {
      if (!name) return;
      _vfs.writeFile(_exPath + name, '');
      _exSel = name;
      _exRender();
    });
  };
  window._exNewFolder = function() {
    win95input('Новая папка', 'Имя папки:', 'Новая папка', function(name) {
      if (!name) return;
      _vfs.createDir(_exPath + name);
      _exSel = name;
      _exRender();
    });
  };
  window._exRenderGlobal = _exRender;
  window._myDocsRefresh = function() {
    if (window._exRenderGlobal) _exRenderGlobal();
  };

  createWin({ id: eid, title: 'Проводник', icon: '📁', w: 560, h: 380,
    status: _exPath + ' — 0 объектов',
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">' +
        '<div class="win-dd-item" onclick="_exNewFile()">📄 Новый файл</div>' +
        '<div class="win-dd-item" onclick="_exNewFolder()">📁 Новая папка</div>' +
        '<div class="win-dd-sep"></div>' +
        '<div class="win-dd-item" onclick="closeWin(\'explorer\')">Закрыть</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Правка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="_exCopy()">📋 Копировать</div>' +
        '<div class="win-dd-item" onclick="_exCut()">✂️ Вырезать</div>' +
        '<div class="win-dd-item" onclick="_exPaste()">📌 Вставить</div>' +
      '</div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Вид<div class="win-dd">' +
        '<div class="win-dd-item" onclick="_exRender()">🔄 Обновить</div>' +
      '</div></div>',
    content:
      '<div style="display:flex;flex-direction:column;height:100%">' +
        '<div style="display:flex;align-items:center;gap:4px;padding:3px 4px;border-bottom:2px solid #808080;background:#c0c0c0">' +
          '<button class="w-btn" style="min-width:28px;font-size:10px" onclick="_exBack()">◄</button>' +
          '<button class="w-btn" style="min-width:28px;font-size:10px" onclick="_exForward()">►</button>' +
          '<div id="ex-path-bar" style="flex:1;border:2px inset #808080;background:#fff;padding:2px 6px;font-size:11px;font-family:inherit;min-height:18px"></div>' +
        '</div>' +
        '<div id="ex-con" style="flex:1;overflow:auto;background:#fff;padding:2px"></div>' +
      '</div>',
    afterOpen: function() {
      window._exPath = _exPath; // expose for menu actions
      _exRender();
      var con = document.getElementById('ex-con');
      if (con) {
        // Click on empty area — deselect
        con.addEventListener('click', function(e) {
          if (e.target === con || e.target.closest && !e.target.closest('.expl-item')) {
            _exSel = null;
            con.querySelectorAll('.expl-item.sel').forEach(function(el){ el.classList.remove('sel'); });
          }
        });
        con.addEventListener('contextmenu', function(e) {
          // Only show folder ctx if not on an item (items handle their own)
          var item = e.target.closest && e.target.closest('.expl-item');
          if (!item) {
            e.preventDefault();
            showCtxPopup(e.clientX, e.clientY, [
              { title: 'Проводник' },
              { label: '📄 Новый файл', fn: function() { _exNewFile(); } },
              { label: '📁 Новая папка', fn: function() { _exNewFolder(); } },
              '-',
              { label: '🔄 Обновить', fn: function() { _exRender(); } },
            ]);
          }
        });
      }
    }
  });
}

// ==================== NOTEPAD (legacy, используется новый appNotepad с VFS поддержкой) ====================
var _npIdx=0;
function appNotepadLegacy(){
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
        '<div class="win-dd-item" onclick="aboutWin(\'notepad\',\'Блокнот\',\'1.0\',\'📝\',\'Простой текстовый редактор ПУКДОС 95.<br>Пишешь — значит живёшь.\')">О программе</div></div></div>',
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
var _pCtx=null,_pColor='#000000',_pTool='pencil',_pDraw=false,_pX=0,_pY=0,_paintDirty=false;
function appPaint(){
  createWin({id:'paint',title:'Безымянный — Пейнт',icon:'🎨',w:540,h:440,status:'Инструмент: Карандаш',
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">'+
        '<div class="win-dd-item" onclick="pOpen()">📂 Открыть с ПК...</div>'+
        '<div class="win-dd-item" onclick="pOpenVFS()">📁 Открыть из VFS...</div>'+
        '<div class="win-dd-sep"></div>'+
        '<div class="win-dd-item" onclick="pSave()">💾 Сохранить как PNG</div>'+
        '<div class="win-dd-item" onclick="pSaveVFS()">💾 Сохранить в VFS...</div>'+
        '<div class="win-dd-sep"></div>'+
        '<div class="win-dd-item" onclick="_paintClose()">Выход</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Правка<div class="win-dd">'+
        '<div class="win-dd-item" onclick="pClear()">Очистить</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Рисунок<div class="win-dd">'+
        '<div class="win-dd-item" onclick="win95toast(\'Холст: 500×340 пуков\')">Атрибуты...</div>'+
        '<div class="win-dd-item" onclick="pClear()">Очистить рисунок</div></div></div>'+
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">'+
        '<div class="win-dd-item" onclick="aboutWin(\'paint\',\'Пейнт\',\'1.0\',\'🎨\',\'Графический редактор ПУКДОС 95.<br>Рисуй что хочешь.\')">О программе</div></div></div>',
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
  setTimeout(function() {
    var closeBtn = document.querySelector('#win_paint .win-titlebar-btn[onclick*="closeWin"]');
    if (closeBtn) closeBtn.setAttribute('onclick', '_paintClose()');
  }, 50);
  window._paintClose = function() {
    if (_paintDirty) {
      win95confirm('В рисунке есть несохранённые изменения. Сохранить перед закрытием?',
        function() { pSave(); closeWin('paint'); },
        function() { closeWin('paint'); }
      );
    } else {
      closeWin('paint');
    }
  };
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
  _paintDirty=true;
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
  _paintDirty=false;
}
function pSave(){
  var cv=document.getElementById('pcv'); if(!cv) return;
  var a=document.createElement('a'); a.href=cv.toDataURL('image/png'); a.download='пук-рисунок.png'; a.click();
  _paintDirty=false;
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

function pSaveVFS(){
  var cv=document.getElementById('pcv'); if(!cv) return;
  var dataUrl=cv.toDataURL('image/png');
  win95input('Сохранить в VFS','Имя файла:','рисунок.png',function(name){
    if(!name) return;
    _vfs.writeFile('C:/Мои документы/'+name,dataUrl);
    _paintDirty=false;
    var wb=document.querySelector('#win_paint .win-titlebar-text');
    if(wb) wb.textContent=name+' — Пейнт';
    win95balloon('Сохранено в VFS: '+name,'💾');
    if(window._myDocsRefresh) _myDocsRefresh();
  });
}

function pOpenVFS(){
  win95filePicker('C:/Мои документы',function(path,name){
    var data=_vfs.readFile(path);
    if(!data){win95msgbox('Файл не найден или пуст.','Ошибка','⚠️');return;}
    var img=new Image();
    img.onload=function(){
      var cv=document.getElementById('pcv'); if(!cv||!_pCtx) return;
      _pCtx.fillStyle='#fff';_pCtx.fillRect(0,0,cv.width,cv.height);
      var scale=Math.min(cv.width/img.width,cv.height/img.height);
      var dw=img.width*scale,dh=img.height*scale;
      var dx=(cv.width-dw)/2,dy=(cv.height-dh)/2;
      _pCtx.drawImage(img,dx,dy,dw,dh);
      _paintDirty=false;
      var wb=document.querySelector('#win_paint .win-titlebar-text');
      if(wb) wb.textContent=name+' — Пейнт';
      win95toast('Открыт из VFS: '+name);
    };
    img.onerror=function(){win95msgbox('Не удалось открыть изображение из VFS.','Ошибка','⚠️');};
    img.src=data;
  });
}
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
        '<div class="win-dd-item" onclick="aboutWin(\'ie\',\'ПукПлорер\',\'1.0\',\'🌐\',\'Интернет-обозреватель ПУКДОС 95.<br>Совместим с ГазНетом и ПукВебом.\')">О программе</div></div></div>',
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
  if (document.getElementById('win_sysinfo')) { focusWin('sysinfo'); return; }
  var yr = new Date().getFullYear();
  var tabs = ['Общие','Оборудование','Производительность'];
  var tabHtml = _tabBar('sysinfo', tabs, 0);

  var page0 =
    '<div data-tab-page="0" style="display:flex;gap:12px;padding:8px;font-size:11px">' +
      '<div style="text-align:center;min-width:80px">' +
        '<div style="font-size:40px">💨</div>' +
        '<div style="font-weight:bold;margin-top:4px">ПУКДОС 95</div>' +
        '<div style="color:#808080;font-size:10px">v4.00.950</div>' +
        '<div id="si-secret-click" style="font-size:9px;color:#c0c0c0;cursor:default;margin-top:8px" title="??" onclick="siSecretClick()">ООО ПУКПРОМ</div>' +
      '</div>' +
      '<div style="flex:1">' +
        '<div style="background:#fff;border:2px inset #808080;padding:8px;margin-bottom:8px;line-height:1.8;font-size:11px">' +
          '<b>ПУКДОС 95</b> © ООО ПУКПРОМ, 1993–'+yr+'<br>' +
          'Данное ПО лицензировано для:<br>' +
          '<b>Аноним Пукович</b><br>' +
          'Ключ: <b>PUK-420-6969-ГАЗЗЗ</b>' +
        '</div>' +
        '<div style="line-height:1.8">' +
          '💻 Процессор: <b>Pentium Puk™ @ 420 МГц</b><br>' +
          '💾 ОЗУ: <b>64 МБ</b> (32 МБ — пуки)<br>' +
          '🖥️ Экран: <b>'+screen.width+'×'+screen.height+'</b>' +
        '</div>' +
      '</div>' +
    '</div>';

  var page1 =
    '<div data-tab-page="1" style="display:none;padding:8px;font-size:11px">' +
      '<div style="font-weight:bold;margin-bottom:6px;border-bottom:1px solid #808080;padding-bottom:2px">Устройства</div>' +
      '<div style="line-height:2">' +
        '🖥️ Монитор: PukSync 14" VGA, '+screen.width+'×'+screen.height+'<br>' +
        '🎮 Видео: Puk VGA 2 МБ ('+screen.colorDepth+'-bit)<br>' +
        '🔊 Звук: SoundBlaster Puk 16 Pro<br>' +
        '🖱️ Мышь: PukMouse Serial COM1' + (_cpSet.mouse.leftHanded ? ' (левша)' : '') + '<br>' +
        '⌨️ Клавиатура: 101-кнопочная, раскладка '+_cpSet.keyboard.lang+'<br>' +
        '💾 Диск C: PukDisk 696 МБ IDE<br>' +
        '📀 Дисковод A: 1.44 МБ 3.5"<br>' +
        '🌐 Сеть: 56k Puk-Modem COM2 | IP: '+(_cpSet.network.dhcp ? 'DHCP' : _cpSet.network.ip)+'<br>' +
        '🖨️ Принтер: не установлен' +
      '</div>' +
    '</div>';

  var page2 =
    '<div data-tab-page="2" style="display:none;padding:8px;font-size:11px">' +
      '<div style="font-weight:bold;margin-bottom:4px;border-bottom:1px solid #808080;padding-bottom:2px">Загрузка ЦП: <span id="si-cpu">—</span>%</div>' +
      '<div style="background:#000;border:1px solid #808080;height:44px;margin-bottom:8px">' +
        '<canvas id="si-cpu-graph" width="400" height="44" style="display:block;width:100%;height:44px"></canvas>' +
      '</div>' +
      '<div style="line-height:1.8">' +
        '📊 Физ. память: 65 536 КБ<br>' +
        '📊 Доступно: <span id="si-mem-free">—</span> КБ<br>' +
        '📊 Системных ресурсов: <span id="si-res">—</span>%<br>' +
        '📊 Своп-файл: C:\\ПУКДОС\\WIN386.SWP<br>' +
        '📊 Turbo Mode: <b>'+(_biosSet.turboMode||'MAXIMUM PUK')+'</b>' +
      '</div>' +
    '</div>';

  createWin({id:'sysinfo', title:'Сведения о системе', icon:'ℹ️', w:460, h:340,
    menu:'<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">' +
      '<div class="win-dd-item" onclick="closeWin(\'sysinfo\')">Закрыть</div></div></div>',
    status:'ПУКДОС 95 | Ядро: PUK32.DLL v4.00.950',
    content: '<div style="padding:4px">' + tabHtml + page0 + page1 + page2 + '</div>',
    afterOpen: function() {
      var hist = [];
      (function siTick() {
        if (!document.getElementById('win_sysinfo')) return;
        var cpu = Math.floor(Math.random()*30+3);
        var mem = Math.floor(Math.random()*8000+54000);
        var res = Math.floor(Math.random()*12+82);
        var ce=document.getElementById('si-cpu'); if(ce) ce.textContent=cpu;
        var me=document.getElementById('si-mem-free'); if(me) me.textContent=mem;
        var re=document.getElementById('si-res'); if(re) re.textContent=res;
        var cv=document.getElementById('si-cpu-graph');
        if (cv) {
          var ctx=cv.getContext('2d');
          hist.push(cpu); if(hist.length>80) hist.shift();
          ctx.fillStyle='#000'; ctx.fillRect(0,0,cv.width,cv.height);
          ctx.strokeStyle='#00ff00'; ctx.lineWidth=1; ctx.beginPath();
          hist.forEach(function(v,i){ var x=i*5,y=cv.height-Math.floor(v/100*cv.height); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
          ctx.stroke();
        }
        setTimeout(siTick, 1000);
      })();
    }
  });
}
// Secret click counter on "ООО ПУКПРОМ" text in sysinfo → opens dev menu
var _siSecretClicks = 0, _siSecretTimer = null;
function siSecretClick() {
  _siSecretClicks++;
  clearTimeout(_siSecretTimer);
  _siSecretTimer = setTimeout(function(){ _siSecretClicks=0; }, 2000);
  if (_siSecretClicks >= 5) {
    _siSecretClicks = 0;
    win95balloon('Доступ разрешён...', '🔓', 'Секретный режим');
    setTimeout(function(){ appDevMenu(); }, 800);
  }
}

// ==================== TRASH ====================
function appTrash(){
  var id = 'trash';
  if (_wins[id]) { focusWin(id); if (_wins[id].min) restoreWin(id); return; }

  function _trashItems() { return _vfs.listDir('C:/Корзина/') || []; }

  function _trashRender() {
    var items = _trashItems();
    var sb = document.getElementById('sb_' + id);
    if (sb) sb.textContent = 'Объектов в корзине: ' + items.length;
    var con = document.getElementById('trash-con');
    if (!con) return;
    var titleEl = document.getElementById('trash-title');
    if (titleEl) titleEl.textContent = items.length === 0 ? 'Корзина пуста' : 'Объектов: ' + items.length;
    if (items.length === 0) {
      con.innerHTML = '<div style="color:#808080;padding:20px;text-align:center;font-size:11px">Корзина пуста</div>';
      return;
    }
    con.innerHTML = '<div style="padding:4px;display:flex;flex-wrap:wrap;gap:2px;align-content:flex-start">' +
      items.map(function(f) {
        var ext = f.name.split('.').pop().toLowerCase();
        var icon = ext === 'txt' ? '📝' : (ext === 'doc'||ext==='docx') ? '📄' : (ext==='png'||ext==='jpg'||ext==='bmp') ? '🖼️' : '📄';
        var safe = f.name.replace(/'/g,"\\'");
        return '<div class="expl-item" id="tri_'+safe+'" ' +
          'onclick="event.stopPropagation();_trashSel(\'' + safe + '\')" ' +
          'oncontextmenu="event.preventDefault();event.stopPropagation();_trashSel(\'' + safe + '\');_trashCtx(event,\'' + safe + '\')">' +
          '<div class="ei-icon">' + icon + '</div>' +
          '<div class="ei-lbl">' + f.name + '</div>' +
        '</div>';
      }).join('') +
    '</div>';
  }

  window._trashSel = function(name) {
    var con = document.getElementById('trash-con');
    if (!con) return;
    con.querySelectorAll('.expl-item').forEach(function(el) {
      el.classList.toggle('sel', el.querySelector('.ei-lbl') && el.querySelector('.ei-lbl').textContent === name);
    });
  };
  window._trashCtx = function(e, name) {
    showCtxPopup(e.clientX, e.clientY, [
      { title: name },
      { label: '♻️ Восстановить', fn: function() {
        if (_vfs.restoreFromTrash(name)) {
          win95balloon('Восстановлено в «Мои документы»: ' + name, '♻️');
          if (window._updateTrashIcon) _updateTrashIcon();
          _trashRender();
        } else win95msgbox('Не удалось восстановить файл.', 'Ошибка', '⚠️');
      }},
      '-',
      { label: '🗑️ Удалить навсегда', fn: function() {
        win95confirm('Удалить "' + name + '" навсегда?', function() {
          _vfs.deleteFile('C:/Корзина/' + name);
          win95balloon('Удалено навсегда: ' + name, '🗑️');
          if (window._updateTrashIcon) _updateTrashIcon();
          _trashRender();
        }, null);
      }},
    ]);
  };
  window._trashEmpty = function() {
    var items = _trashItems();
    if (items.length === 0) { win95balloon('Корзина уже пуста', '🗑️'); return; }
    win95confirm('Безвозвратно удалить все объекты из Корзины (' + items.length + ' шт.)?', function() {
      _vfs.emptyTrash();
      win95balloon('Корзина очищена', '🗑️');
      if (window._updateTrashIcon) _updateTrashIcon();
      _trashRender();
    }, null);
  };
  window._trashRestoreAll = function() {
    var items = _trashItems();
    if (items.length === 0) { win95balloon('Корзина пуста', '🗑️'); return; }
    items.forEach(function(f) { _vfs.restoreFromTrash(f.name); });
    win95balloon('Восстановлено объектов: ' + items.length, '♻️');
    if (window._updateTrashIcon) _updateTrashIcon();
    _trashRender();
  };

  createWin({ id: id, title: 'Корзина', icon: '🗑️', w: 400, h: 280,
    status: 'Объектов в корзине: 0',
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">' +
        '<div class="win-dd-item" onclick="_trashEmpty()">🧹 Очистить корзину</div>' +
        '<div class="win-dd-item" onclick="_trashRestoreAll()">♻️ Восстановить все</div>' +
        '<div class="win-dd-sep"></div>' +
        '<div class="win-dd-item" onclick="closeWin(\'trash\')">Закрыть</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Вид<div class="win-dd">' +
        '<div class="win-dd-item" onclick="_trashRender()">🔄 Обновить</div>' +
      '</div></div>',
    content:
      '<div style="display:flex;flex-direction:column;height:100%">' +
        '<div style="background:#c0c0c0;border-bottom:2px solid #808080;padding:4px 8px;display:flex;align-items:center;gap:8px">' +
          '<span style="font-size:20px">🗑️</span>' +
          '<span id="trash-title" style="font-size:11px;font-weight:bold">Корзина</span>' +
          '<div style="flex:1"></div>' +
          '<button class="w-btn" style="font-size:10px" onclick="_trashEmpty()">Очистить</button>' +
          '<button class="w-btn" style="font-size:10px" onclick="_trashRestoreAll()">Восстановить все</button>' +
        '</div>' +
        '<div id="trash-con" style="flex:1;overflow:auto;background:#fff;padding:2px"></div>' +
      '</div>',
    afterOpen: function() {
      _trashRender();
      var con = document.getElementById('trash-con');
      if (con) con.addEventListener('click', function(e) {
        if (e.target === con) con.querySelectorAll('.expl-item.sel').forEach(function(el){ el.classList.remove('sel'); });
      });
    }
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
  if(el) {
    el.style.transition='opacity 0.3s';
    el.style.opacity='0';
    setTimeout(function(){
      el.style.display='none';
      el.style.opacity='1';
      el.style.transition='';
      // Show emergency reboot screen on black background
      var sc=document.getElementById('shutdown-screen');
      if(!sc) { location.reload(); return; }
      sc.style.display='block';
      sc.style.background='#000';
      sc.style.color='#c0c0c0';
      sc.style.padding='40px 60px';
      var out=document.getElementById('shutdown-out');
      var lines=[
        {t:'*** SYSTEM HALT ***', c:'#fff', d:0},
        {t:'', c:'#c0c0c0', d:200},
        {t:'Обнаружена критическая ошибка. Перезапуск системы...', c:'#c0c0c0', d:400},
        {t:'', c:'#c0c0c0', d:600},
        {t:'Сохранение аварийного дампа пуков...', c:'#808080', d:900},
        {t:'Дамп памяти: PUKMEM.DMP  [████████████ 100%]', c:'#808080', d:1600},
        {t:'', c:'#c0c0c0', d:1900},
        {t:'Перезапуск в 3 секунды...', c:'#ff0', d:2100},
      ];
      if(out) {
        out.innerHTML='';
        lines.forEach(function(l){
          setTimeout(function(){
            var d=document.createElement('div');
            d.style.color=l.c;
            d.style.fontFamily='"Courier New",monospace';
            d.style.fontSize='13px';
            d.style.lineHeight='1.8';
            d.textContent=l.t;
            out.appendChild(d);
          }, l.d);
        });
      }
      setTimeout(function(){ location.reload(); }, 4800);
    }, 300);
  }
}

function w95error(title, msg, bsod){
  playWin95Sound('error');
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
        '<div class="win-dd-item" onclick="aboutWin(\'media\',\'Медиаплеер\',\'1.0\',\'🎵\',\'ПУКПРОМ Медиаплеер v1.0<br>Поддерживаемые форматы: .PUK .GAS .RRK\')">О программе</div></div></div>',
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
        '<div class="win-dd-item" onclick="aboutWin(\'taskman\',\'Диспетчер пуков\',\'1.0\',\'📊\',\'Позволяет управлять пуками и процессами в системе.\')">О программе</div></div></div>',
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
    if (_tmSelId === '0') { win95msgbox('Нельзя снять System Idle Process.\nПуки не остановятся.', 'Диспетчер пуков', '⛔'); }
    else { win95msgbox('Процесс ' + _tmSelId + ' снят.\nОшибка: пук продолжает пукать.', 'Диспетчер пуков', '📊'); }
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
  var clk = document.getElementById('clock');
  if (clk) clk.style.display = _tbSet.showClock ? '' : 'none';
  var vol = document.getElementById('vol-icon');
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

// Desktop theme storage
var _desktopTheme = (function(){
  try { return JSON.parse(localStorage.getItem('pukdos_desktop') || 'null') || {}; } catch(e){ return {}; }
})();
_desktopTheme = Object.assign({ colorIdx: 0, wallpaper: 'none', winColor: '#000080', titleFont: 'bold', icons: 'large' }, _desktopTheme);

function saveDesktopTheme() {
  try { localStorage.setItem('pukdos_desktop', JSON.stringify(_desktopTheme)); } catch(e) {}
}

function applyDesktopTheme() {
  var c = _cpColors[_desktopTheme.colorIdx] || _cpColors[0];
  var desk = document.getElementById('desktop');
  if (!desk) return;
  desk.style.background = c.desk;
  if (_desktopTheme.wallpaper && _desktopTheme.wallpaper !== 'none') {
    desk.style.backgroundImage = 'url(' + _desktopTheme.wallpaper + ')';
    desk.style.backgroundSize = 'cover';
    desk.style.backgroundPosition = 'center';
  } else {
    desk.style.backgroundImage = '';
  }
  // Apply win titlebar color
  document.querySelectorAll('.win-titlebar').forEach(function(t) { t.style.background = _desktopTheme.winColor || '#000080'; });
  // Icon size
  var sz = _desktopTheme.icons === 'small' ? '20px' : '32px';
  document.querySelectorAll('.icon-img').forEach(function(i){ i.style.fontSize = sz; });
}

function cpApplyColor(i) {
  _desktopTheme.colorIdx = i;
  saveDesktopTheme();
  applyDesktopTheme();
}
function cpScreen() {
  if (document.getElementById('win_cpscreen')) { focusWin('cpscreen'); return; }
  var colors = ['Зелёный (по умолчанию)','Ночной синий','Тёмный пук','Зелёный газ'];
  var winColors = [
    { name:'Синий (по умолчанию)', val:'#000080' },
    { name:'Бордовый', val:'#800000' },
    { name:'Тёмно-зелёный', val:'#006400' },
    { name:'Фиолетовый', val:'#4b0082' },
    { name:'Чёрный', val:'#1a1a1a' },
  ];
  var themes = [
    { name:'ПУКДОС 95 (по умолчанию)', apply: function(){ _desktopTheme.colorIdx=0; _desktopTheme.winColor='#000080'; saveDesktopTheme(); applyDesktopTheme(); } },
    { name:'Ночь в PukZone', apply: function(){ _desktopTheme.colorIdx=1; _desktopTheme.winColor='#1a0050'; saveDesktopTheme(); applyDesktopTheme(); } },
    { name:'Зелёный газ', apply: function(){ _desktopTheme.colorIdx=3; _desktopTheme.winColor='#006400'; saveDesktopTheme(); applyDesktopTheme(); } },
    { name:'Тёмный пук', apply: function(){ _desktopTheme.colorIdx=2; _desktopTheme.winColor='#1a1a1a'; saveDesktopTheme(); applyDesktopTheme(); } },
  ];
  var themesList = themes.map(function(t,i){
    return '<label style="display:flex;align-items:center;gap:6px;cursor:default;margin:3px 0">' +
      '<input type="radio" name="cptheme" value="'+i+'"' + (i===0?' checked':'') + ' onclick="_cpThemes['+i+'].apply()"> ' + t.name + '</label>';
  }).join('');
  window._cpThemes = themes;

  var colorsList = colors.map(function(c,i){
    var sq = '<span style="display:inline-block;width:14px;height:14px;background:'+_cpColors[i].desk+';border:1px solid #000;margin-right:4px;vertical-align:middle"></span>';
    return '<label style="display:flex;align-items:center;gap:4px;cursor:default;margin:2px 0">' +
      '<input type="radio" name="cpclr" value="'+i+'"'+(_desktopTheme.colorIdx===i?' checked':'')+' onclick="cpApplyColor('+i+')"> ' + sq + c + '</label>';
  }).join('');

  var winColorsList = winColors.map(function(c,i){
    var sq = '<span style="display:inline-block;width:14px;height:14px;background:'+c.val+';border:1px solid #000;margin-right:4px;vertical-align:middle"></span>';
    return '<option value="'+c.val+'" '+(_desktopTheme.winColor===c.val?'selected':'')+'>'+sq+c.name+'</option>';
  }).join('');

  createWin({ id:'cpscreen', title:'Экран — Свойства', icon:'🖥️', w:380, h:380, resize:false,
    x: Math.floor(window.innerWidth/2-190), y: Math.floor((window.innerHeight-28)/2-190),
    content: '<div style="padding:12px;font-size:12px;overflow-y:auto;height:100%;box-sizing:border-box">' +
      '<div style="font-weight:bold;margin-bottom:6px;border-bottom:1px solid #808080;padding-bottom:3px">Темы</div>' +
      themesList +
      '<div style="font-weight:bold;margin:10px 0 6px;border-bottom:1px solid #808080;padding-bottom:3px">Цвет фона рабочего стола</div>' +
      colorsList +
      '<div style="font-weight:bold;margin:10px 0 6px;border-bottom:1px solid #808080;padding-bottom:3px">Цвет заголовков окон</div>' +
      '<select style="width:100%;font-size:11px" onchange="_desktopTheme.winColor=this.value;saveDesktopTheme();applyDesktopTheme()">' + winColorsList + '</select>' +
      '<div style="font-weight:bold;margin:10px 0 6px;border-bottom:1px solid #808080;padding-bottom:3px">Обои (URL или оставьте пустым)</div>' +
      '<input type="text" id="cp-wallpaper" placeholder="https://..." value="'+(_desktopTheme.wallpaper==='none'?'':(_desktopTheme.wallpaper||''))+'" style="width:100%;box-sizing:border-box;border:2px inset #808080;padding:2px 4px;font-size:11px;font-family:inherit">' +
      '<button onclick="var v=document.getElementById(\'cp-wallpaper\').value;_desktopTheme.wallpaper=v||\'none\';saveDesktopTheme();applyDesktopTheme();win95toast(\'Обои применены\')" style="margin-top:4px;width:100%">Применить обои</button>' +
      '<div style="position:absolute;bottom:8px;right:8px;display:flex;gap:4px">' +
        '<button onclick="closeWin(\'cpscreen\')">OK</button>' +
        '<button onclick="closeWin(\'cpscreen\')">Отмена</button>' +
      '</div>' +
    '</div>'
  });
}
function cpSound() {
  if (document.getElementById('win_cpsound')) { focusWin('cpsound'); return; }
  var s = _cpSet.sound || { volume: 70, scheme: 0 };
  var schemeNames = ['ПУКДОС 95 (по умолчанию)', 'Тишина (отключить звуки)', 'Газовый оркестр (бонус-звуки)'];
  var schemesHtml = schemeNames.map(function(n,i){
    return '<label style="display:block;margin:3px 0"><input type="radio" name="snd-scheme" value="'+i+'"'+(s.scheme===i?' checked':'')+' onchange="_cpSet.sound.scheme='+i+';_saveCpSet()"> '+n+'</label>';
  }).join('');
  createWin({ id:'cpsound', title:'Звук — Свойства', icon:'🔊', w:300, h:260, resize:false,
    x: Math.floor(window.innerWidth/2-150), y: Math.floor((window.innerHeight-28)/2-130),
    content: '<div style="padding:12px;font-size:12px">' +
      '<div style="font-weight:bold;margin-bottom:10px">Громкость системы</div>' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">' +
        '<span>🔈</span>' +
        '<input type="range" min="0" max="100" value="'+s.volume+'" style="flex:1" oninput="setWin95Vol(this.value);document.getElementById(\'cpvpct\').textContent=this.value+\'%\'">' +
        '<span>🔊</span><span id="cpvpct" style="width:32px;text-align:right">'+s.volume+'%</span>' +
      '</div>' +
      '<div style="font-weight:bold;margin-bottom:6px">Схема звуков</div>' +
      schemesHtml +
      '<div style="position:absolute;bottom:8px;right:8px;display:flex;gap:4px">' +
        '<button class="w-btn" onclick="_saveCpSet();win95balloon(\'Настройки звука сохранены\',\'🔊\');closeWin(\'cpsound\')">OK</button>' +
        '<button class="w-btn" onclick="closeWin(\'cpsound\')">Отмена</button>' +
      '</div>' +
    '</div>'
  });
}
function cpMouse() {
  var id = 'cpmouse';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  var m = _cpSet.mouse;
  var tabHtml = _tabBar(id, ['Кнопки','Указатель','Движение'], 0);
  var p0 =
    '<div data-tab-page="0" style="padding:10px;font-size:12px">' +
      '<div style="margin-bottom:10px">' +
        '<b>Основная кнопка:</b><br>' +
        '<label style="display:block;margin-top:6px"><input type="radio" name="mouse-hand" value="0" '+(m.leftHanded?'':'checked')+' onchange="_cpSet.mouse.leftHanded=false"> Правая (правша)</label>' +
        '<label style="display:block;margin-top:3px"><input type="radio" name="mouse-hand" value="1" '+(m.leftHanded?'checked':'')+' onchange="_cpSet.mouse.leftHanded=true"> Левая (левша)</label>' +
      '</div>' +
      '<div>' +
        '<b>Скорость двойного щелчка:</b><br>' +
        '<div style="display:flex;align-items:center;gap:8px;margin-top:6px">' +
          '<span style="font-size:10px">Медленно</span>' +
          '<input type="range" min="1" max="10" value="'+m.dblClick+'" style="flex:1" oninput="_cpSet.mouse.dblClick=parseInt(this.value)">' +
          '<span style="font-size:10px">Быстро</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  var p1 =
    '<div data-tab-page="1" style="display:none;padding:10px;font-size:12px">' +
      '<b>Схема указателя:</b>' +
      '<select style="display:block;width:100%;margin-top:6px;font-size:11px">' +
        '<option>ПУКДОС 95 (по умолчанию)</option>' +
        '<option>Газовый указатель</option>' +
        '<option>Пуковая стрелка Pro</option>' +
      '</select>' +
      '<br><label><input type="checkbox" '+(m.trails?'checked':'')+' onchange="_cpSet.mouse.trails=this.checked;_applyCursorTrails(this.checked)"> Видимые следы указателя</label>' +
    '</div>';
  var p2 =
    '<div data-tab-page="2" style="display:none;padding:10px;font-size:12px">' +
      '<b>Скорость указателя:</b>' +
      '<div style="display:flex;align-items:center;gap:8px;margin-top:6px">' +
        '<span style="font-size:10px">Медленно</span>' +
        '<input type="range" min="1" max="10" value="'+m.speed+'" style="flex:1" oninput="_cpSet.mouse.speed=parseInt(this.value)">' +
        '<span style="font-size:10px">Быстро</span>' +
      '</div>' +
    '</div>';
  createWin({ id:id, title:'Мышь — Свойства', icon:'🖱️', w:320, h:260, resize:false,
    content: '<div style="padding:4px">' + tabHtml + p0 + p1 + p2 +
      '<div style="display:flex;justify-content:flex-end;gap:4px;padding:8px">' +
        '<button class="w-btn" onclick="_saveCpSet();if(_cpSet.mouse.trails)_applyCursorTrails(true);win95balloon(\'Настройки мыши сохранены\',\'🖱️\');closeWin(\''+id+'\')">OK</button>' +
        '<button class="w-btn" onclick="_saveCpSet();if(_cpSet.mouse.trails)_applyCursorTrails(true);win95balloon(\'Применено\',\'🖱️\')">Применить</button>' +
        '<button class="w-btn" onclick="closeWin(\''+id+'\')">Отмена</button>' +
      '</div></div>'
  });
}

function cpKeyboard() {
  var id = 'cpkeyboard';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  var k = _cpSet.keyboard;
  var tabHtml = _tabBar(id, ['Скорость','Язык'], 0);
  var p0 =
    '<div data-tab-page="0" style="padding:10px;font-size:12px">' +
      '<b>Задержка перед повтором:</b>' +
      '<div style="display:flex;align-items:center;gap:8px;margin:6px 0 12px">' +
        '<span style="font-size:10px">Длинная</span>' +
        '<input type="range" min="1" max="10" value="'+k.delay+'" style="flex:1" oninput="_cpSet.keyboard.delay=parseInt(this.value)">' +
        '<span style="font-size:10px">Короткая</span>' +
      '</div>' +
      '<b>Скорость повтора:</b>' +
      '<div style="display:flex;align-items:center;gap:8px;margin-top:6px">' +
        '<span style="font-size:10px">Медленно</span>' +
        '<input type="range" min="1" max="10" value="'+k.repeat+'" style="flex:1" oninput="_cpSet.keyboard.repeat=parseInt(this.value)">' +
        '<span style="font-size:10px">Быстро</span>' +
      '</div>' +
      '<div style="margin-top:10px"><b>Проверка:</b> <input type="text" placeholder="Держите клавишу..." style="width:100%;box-sizing:border-box;border:2px inset #808080;padding:2px 4px;font-size:11px;font-family:inherit"></div>' +
    '</div>';
  var p1 =
    '<div data-tab-page="1" style="display:none;padding:10px;font-size:12px">' +
      '<b>Раскладка:</b>' +
      '<div style="margin-top:8px">' +
        '<label><input type="radio" name="kbd-lang" value="RU" '+(k.lang==='RU'?'checked':'')+' onchange="_cpSet.keyboard.lang=\'RU\'"> Русский (Пуковица)</label><br>' +
        '<label style="margin-top:4px;display:block"><input type="radio" name="kbd-lang" value="EN" '+(k.lang==='EN'?'checked':'')+' onchange="_cpSet.keyboard.lang=\'EN\'"> English (United Puk Kingdom)</label>' +
      '</div>' +
    '</div>';
  createWin({ id:id, title:'Клавиатура — Свойства', icon:'⌨️', w:310, h:240, resize:false,
    content: '<div style="padding:4px">' + tabHtml + p0 + p1 +
      '<div style="display:flex;justify-content:flex-end;gap:4px;padding:8px">' +
        '<button class="w-btn" onclick="_saveCpSet();win95balloon(\'Настройки клавиатуры сохранены\',\'⌨️\');closeWin(\''+id+'\')">OK</button>' +
        '<button class="w-btn" onclick="_saveCpSet();win95balloon(\'Применено\',\'⌨️\')">Применить</button>' +
        '<button class="w-btn" onclick="closeWin(\''+id+'\')">Отмена</button>' +
      '</div></div>'
  });
}

function cpNetwork() {
  var id = 'cpnetwork';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  var n = _cpSet.network;
  var tabHtml = _tabBar(id, ['Адаптер','TCP/IP','Dial-Up'], 0);
  var isDisabled = n.dhcp ? 'disabled' : '';
  var p0 =
    '<div data-tab-page="0" style="padding:10px;font-size:12px">' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">' +
        '<span style="font-size:28px">🌐</span>' +
        '<div><b>56k Puk-Modem</b><br><span style="color:#808080;font-size:10px">PukCom v.90 — COM2</span></div>' +
      '</div>' +
      '<div style="border:2px inset #808080;padding:6px;font-size:11px;line-height:1.8">' +
        'Статус: <span style="color:green">▶ Подключено к ГазНету</span><br>' +
        'Скорость: 56 000 бод/с (max: 56 600)<br>' +
        'Время подключения: 4:20:00<br>' +
        'Принято: 69 420 КБ / Отправлено: 4 КБ' +
      '</div>' +
      '<div style="margin-top:8px;display:flex;gap:4px">' +
        '<button class="w-btn" onclick="win95balloon(\'Подключение установлено!\',\'🌐\')">Подключить</button>' +
        '<button class="w-btn" onclick="win95balloon(\'Отключено от ГазНета\',\'🌐\')">Отключить</button>' +
      '</div>' +
    '</div>';
  var p1 =
    '<div data-tab-page="1" style="display:none;padding:10px;font-size:12px">' +
      '<label><input type="checkbox" id="net-dhcp" '+(n.dhcp?'checked':'')+' onchange="_cpSet.network.dhcp=this.checked;var dis=this.checked?\'disabled\':\'\';[\'net-ip\',\'net-mask\',\'net-gw\',\'net-dns\'].forEach(function(x){var e=document.getElementById(x);if(e)e.disabled=dis?true:false;})"> Получить IP автоматически (DHCP)</label>' +
      '<table style="margin-top:8px;font-size:11px;width:100%">' +
        '<tr><td style="padding:2px 4px">IP-адрес:</td><td><input id="net-ip" type="text" value="'+n.ip+'" '+(n.dhcp?'disabled':'')+' style="width:130px;border:2px inset #808080;padding:1px 3px;font-size:11px;font-family:inherit" oninput="_cpSet.network.ip=this.value"></td></tr>' +
        '<tr><td style="padding:2px 4px">Маска:</td><td><input id="net-mask" type="text" value="'+n.mask+'" '+(n.dhcp?'disabled':'')+' style="width:130px;border:2px inset #808080;padding:1px 3px;font-size:11px;font-family:inherit" oninput="_cpSet.network.mask=this.value"></td></tr>' +
        '<tr><td style="padding:2px 4px">Шлюз:</td><td><input id="net-gw" type="text" value="'+n.gw+'" '+(n.dhcp?'disabled':'')+' style="width:130px;border:2px inset #808080;padding:1px 3px;font-size:11px;font-family:inherit" oninput="_cpSet.network.gw=this.value"></td></tr>' +
        '<tr><td style="padding:2px 4px">DNS:</td><td><input id="net-dns" type="text" value="'+n.dns+'" '+(n.dhcp?'disabled':'')+' style="width:130px;border:2px inset #808080;padding:1px 3px;font-size:11px;font-family:inherit" oninput="_cpSet.network.dns=this.value"></td></tr>' +
      '</table>' +
    '</div>';
  var p2 =
    '<div data-tab-page="2" style="display:none;padding:10px;font-size:12px">' +
      '<b>Подключение к ГазНету:</b>' +
      '<div style="border:2px inset #808080;padding:6px;margin-top:6px;font-size:11px">' +
        'Телефон: <b>0-800-ГАЗНЕТ</b><br>' +
        'Логин: <b>puk@gaznit.ru</b><br>' +
        'Пароль: ••••••••<br>' +
        'Протокол: PPP + Газ v2.0' +
      '</div>' +
      '<div id="net-ping-result" style="margin-top:6px;font-size:11px;color:#000080"></div>' +
      '<button class="w-btn" style="margin-top:6px" onclick="(function(){var r=document.getElementById(\'net-ping-result\');r.textContent=\'Пинг pukprom.puk...\';setTimeout(function(){r.textContent=\'Reply from 192.168.0.1: bytes=32 time=420ms TTL=64\';},1200);})()">Проверить соединение</button>' +
    '</div>';
  createWin({ id:id, title:'Сеть — Свойства', icon:'🌐', w:360, h:300, resize:false,
    content: '<div style="padding:4px">' + tabHtml + p0 + p1 + p2 +
      '<div style="display:flex;justify-content:flex-end;gap:4px;padding:8px">' +
        '<button class="w-btn" onclick="_saveCpSet();win95balloon(\'Настройки сети сохранены\',\'🌐\');closeWin(\''+id+'\')">OK</button>' +
        '<button class="w-btn" onclick="_saveCpSet();win95balloon(\'Применено\',\'🌐\')">Применить</button>' +
        '<button class="w-btn" onclick="closeWin(\''+id+'\')">Отмена</button>' +
      '</div></div>'
  });
}

function cpPrinters() {
  var id = 'cpprinters';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  createWin({ id:id, title:'Принтеры', icon:'🖨️', w:360, h:280, resize:false,
    status:'1 принтер установлен',
    content:
      '<div style="padding:8px;font-size:12px">' +
        '<div style="margin-bottom:8px;font-size:11px;color:#444">Установленные принтеры:</div>' +
        '<div id="printer-list">' +
          '<div style="display:flex;align-items:center;gap:8px;padding:6px;border:1px solid #808080;background:#fff;cursor:default;margin-bottom:4px" id="printer-puk3000" onclick="this.style.background=\'#000080\';this.style.color=\'#fff\'">' +
            '<span style="font-size:22px">🖨️</span>' +
            '<div><div style="font-weight:bold;font-size:11px">ПУКПРИНТ-3000</div><div style="font-size:10px;color:#666">Локальный принтер — LPT1 — Puk Matrix 9-pin</div></div>' +
            '<span style="margin-left:auto;font-size:10px;color:green">✔ По умолчанию</span>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top:4px;font-size:11px;color:#808080">Статус: Готов | Очередь: 0 документов</div>' +
        '<div style="display:flex;gap:4px;margin-top:10px">' +
          '<button class="w-btn" onclick="win95balloon(\'Мастер установки принтера запущен...\',\'🖨️\')">Добавить принтер</button>' +
          '<button class="w-btn" onclick="win95msgbox(\'Нельзя удалить принтер по умолчанию.\',\'Принтеры\',\'⛔\')">Удалить</button>' +
          '<button class="w-btn" onclick="win95balloon(\'Тестовая страница отправлена\',\'🖨️\')">Тест печати</button>' +
        '</div>' +
      '</div>'
  });
}

function cpStorage() {
  var id = 'cpstorage';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  function diskBar(used, total) {
    var pct = Math.round(used/total*100);
    var color = pct > 80 ? '#cc0000' : pct > 60 ? '#cc8800' : '#000080';
    return '<div style="background:#fff;border:2px inset #808080;height:14px;margin:2px 0 6px;position:relative">' +
      '<div style="height:100%;width:'+pct+'%;background:'+color+'"></div>' +
      '<span style="position:absolute;inset:0;font-size:9px;text-align:center;line-height:14px">'+used+' МБ / '+total+' МБ ('+pct+'%)</span>' +
    '</div>';
  }
  createWin({ id:id, title:'Хранилище — Свойства', icon:'💾', w:380, h:320, resize:false,
    content:
      '<div style="padding:10px;font-size:12px">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">' +
          '<span style="font-size:28px">💾</span>' +
          '<div><b>PukDisk 695 МБ IDE</b><br><span style="font-size:10px;color:#808080">UDMA 33 — Шина 0, Мастер</span></div>' +
        '</div>' +
        '<b>Диск C: (ПУКДОС 95)</b>' + diskBar(276, 695) +
        '<b>Диск D: (СолидГаз SSD)</b>' + diskBar(1024, 2048) +
        '<b>Диск A: (Дискета)</b>' + diskBar(0, 1) +
        '<div style="border-top:1px solid #808080;margin:8px 0;padding-top:8px;font-size:11px;color:#444">' +
          'Диск C: тип ФС — FAT32 | Кластер: 4096 байт<br>' +
          'Файлов: 14 206 | Папок: 421' +
        '</div>' +
        '<div style="display:flex;gap:4px">' +
          '<button class="w-btn" onclick="(function(){var b=document.getElementById(\'defrag-btn\');b.disabled=true;b.textContent=\'Дефрагментация...\';win95balloon(\'Дефрагментация запущена... 0%\',\'💾\');setTimeout(function(){win95balloon(\'Дефрагментация завершена! +420 кластеров\',\'💾\');b.disabled=false;b.textContent=\'Дефрагментация\';},4000);})()"><span id="defrag-btn">Дефрагментация</span></button>' +
          '<button class="w-btn" onclick="win95msgbox(\'Проверка диска C:\\\\\nФайлов: 14206\nПапок: 421\nОшибок: 69\nИсправлено пуком: 69\',\'Проверка диска\',\'💾\')">Проверить диск</button>' +
          '<button class="w-btn" onclick="win95msgbox(\'Форматирование диска C:\\\\\nСтоп! Это потеря всех данных.\nОтменено системой безопасности ПУК.\',\'Форматирование\',\'⚠️\')">Форматировать</button>' +
        '</div>' +
      '</div>'
  });
}

function cpBios() {
  var id = 'cpbios';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  var b = _biosSet;
  createWin({ id:id, title:'BIOS — Настройки', icon:'⚙️', w:360, h:320, resize:false,
    content:
      '<div style="padding:10px;font-size:12px">' +
        '<div style="background:#00007b;color:#aaa;font-family:\'Courier New\',monospace;font-size:11px;padding:8px;margin-bottom:8px">' +
          '<b style="color:#fff">ПУКПРОМ BIOS v4.20.69</b><br>' +
          '<span style="color:#0ff">Текущие параметры (только чтение):</span>' +
        '</div>' +
        '<table style="width:100%;font-size:11px;border-collapse:collapse">' +
          '<tr style="background:#e0e0e0"><td style="padding:3px 8px;font-weight:bold">Параметр</td><td style="padding:3px 8px;font-weight:bold">Значение</td></tr>' +
          '<tr><td style="padding:3px 8px;border-bottom:1px solid #c0c0c0">Puk Mode</td><td style="padding:3px 8px;border-bottom:1px solid #c0c0c0;color:#000080"><b>'+(b.pukMode||'ENABLED')+'</b></td></tr>' +
          '<tr style="background:#f0f0f0"><td style="padding:3px 8px;border-bottom:1px solid #c0c0c0">Turbo Mode</td><td style="padding:3px 8px;border-bottom:1px solid #c0c0c0;color:#000080"><b>'+(b.turboMode||'MAXIMUM PUK')+'</b></td></tr>' +
          '<tr><td style="padding:3px 8px;border-bottom:1px solid #c0c0c0">Gas Compression</td><td style="padding:3px 8px;border-bottom:1px solid #c0c0c0;color:#000080"><b>'+(b.gasCompression||'Auto')+'</b></td></tr>' +
          '<tr style="background:#f0f0f0"><td style="padding:3px 8px;border-bottom:1px solid #c0c0c0">CPU Cache</td><td style="padding:3px 8px;border-bottom:1px solid #c0c0c0;color:#000080"><b>'+(b.cpuCache||'Enabled')+'</b></td></tr>' +
          '<tr><td style="padding:3px 8px;border-bottom:1px solid #c0c0c0">Fart Coprocessor</td><td style="padding:3px 8px;border-bottom:1px solid #c0c0c0;color:#000080"><b>'+(b.fartCoprocessor||'Enabled')+'</b></td></tr>' +
          '<tr style="background:#f0f0f0"><td style="padding:3px 8px;border-bottom:1px solid #c0c0c0">Quick POST</td><td style="padding:3px 8px;border-bottom:1px solid #c0c0c0;color:#000080"><b>'+(b.quickPost?'Enabled':'Disabled')+'</b></td></tr>' +
          '<tr><td style="padding:3px 8px">Gas Lock</td><td style="padding:3px 8px;color:#000080"><b>'+(b.gasLock||'Off')+'</b></td></tr>' +
        '</table>' +
        '<div style="margin-top:10px;padding:6px;background:#ffffc0;border:1px solid #808080;font-size:11px">' +
          '⚠️ Для изменения настроек BIOS необходима перезагрузка.' +
        '</div>' +
        '<div style="display:flex;gap:4px;margin-top:8px">' +
          '<button class="w-btn" onclick="biosSaveRestart(function(){})">Войти в BIOS Setup (перезагрузка)</button>' +
          '<button class="w-btn" onclick="closeWin(\''+id+'\')">Закрыть</button>' +
        '</div>' +
      '</div>'
  });
}

function cpGas() {
  var id = 'cpgas';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  var b = _biosSet;
  var pukModes = ['ENABLED','DISABLED'];
  var compModes = ['Auto','Manual','Off'];
  var turboModes = ['MAXIMUM PUK','NORMAL','ECO'];
  function mkSelect(arrId, vals, cur, onChange) {
    return '<select id="'+arrId+'" style="font-size:11px;padding:1px 3px;border:2px inset #808080;font-family:inherit" onchange="'+onChange+'">' +
      vals.map(function(v){ return '<option '+(v===cur?'selected':'')+'>'+v+'</option>'; }).join('') + '</select>';
  }
  var gasLevel = Math.floor(Math.random()*30+60);
  createWin({ id:id, title:'Газ и Пуки — Свойства', icon:'💨', w:360, h:320, resize:false,
    content:
      '<div style="padding:10px;font-size:12px">' +
        '<div style="font-weight:bold;margin-bottom:8px;color:#000080">⚙️ Параметры газовой системы</div>' +
        '<table style="width:100%;font-size:11px;border-collapse:collapse">' +
          '<tr><td style="padding:4px 6px;width:50%">Puk Mode:</td><td>' + mkSelect('gas-pukmode', pukModes, b.pukMode||'ENABLED', '_biosSet.pukMode=this.value') + '</td></tr>' +
          '<tr style="background:#f0f0f0"><td style="padding:4px 6px">Gas Compression:</td><td>' + mkSelect('gas-comp', compModes, b.gasCompression||'Auto', '_biosSet.gasCompression=this.value') + '</td></tr>' +
          '<tr><td style="padding:4px 6px">Turbo Mode:</td><td>' + mkSelect('gas-turbo', turboModes, b.turboMode||'MAXIMUM PUK', '_biosSet.turboMode=this.value') + '</td></tr>' +
          '<tr style="background:#f0f0f0"><td style="padding:4px 6px">Fart Coprocessor:</td><td>' +
            '<label><input type="checkbox" id="gas-fart" '+(b.fartCoprocessor==='Enabled'?'checked':'')+' onchange="_biosSet.fartCoprocessor=this.checked?\'Enabled\':\'Disabled\'"> Включён</label>' +
          '</td></tr>' +
          '<tr><td style="padding:4px 6px">Gas Lock:</td><td>' +
            '<label><input type="checkbox" id="gas-lock" '+(b.gasLock==='On'?'checked':'')+' onchange="_biosSet.gasLock=this.checked?\'On\':\'Off\'"> Блокировать пуки</label>' +
          '</td></tr>' +
        '</table>' +
        '<div style="margin:10px 0 4px;font-size:11px;font-weight:bold">Уровень газа: '+gasLevel+'%</div>' +
        '<div style="background:#fff;border:2px inset #808080;height:16px;position:relative">' +
          '<div style="height:100%;width:'+gasLevel+'%;background:'+(gasLevel>70?'#008000':'#cc8800')+'"></div>' +
          '<span style="position:absolute;inset:0;font-size:9px;text-align:center;line-height:16px">'+gasLevel+'%</span>' +
        '</div>' +
        '<div style="display:flex;gap:4px;margin-top:10px">' +
          '<button class="w-btn" onclick="try{localStorage.setItem(\'pukdos_bios\',JSON.stringify(_biosSet));}catch(e){}win95balloon(\'Настройки газа сохранены. Перезагрузка не требуется.\',\'💨\');closeWin(\''+id+'\')">OK</button>' +
          '<button class="w-btn" onclick="closeWin(\''+id+'\')">Отмена</button>' +
        '</div>' +
      '</div>'
  });
}

function cpPasswords() {
  var id = 'cppasswords';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  var pw = _cpSet.passwords;
  var u  = _cpSet.user;
  var tabHtml = _tabBar(id, ['Учётная запись','Смена пароля','Параметры'], 0);
  var p0 =
    '<div data-tab-page="0" style="padding:10px;font-size:12px">' +
      '<div style="margin-bottom:8px;font-size:11px">Настройка учётной записи пользователя ПУКДОС 95</div>' +
      '<table style="font-size:11px;width:100%">' +
        '<tr><td style="padding:3px 4px;width:130px">Логин:</td><td><input type="text" id="acc-login" value="'+u.login+'" style="width:100%;box-sizing:border-box;border:2px inset #808080;padding:2px 4px;font-size:11px;font-family:inherit"></td></tr>' +
        '<tr><td style="padding:3px 4px">Полное имя:</td><td><input type="text" id="acc-fullname" value="'+u.fullName+'" style="width:100%;box-sizing:border-box;border:2px inset #808080;padding:2px 4px;font-size:11px;font-family:inherit"></td></tr>' +
        '<tr><td style="padding:3px 4px">Подсказка:</td><td><input type="text" id="acc-hint" value="'+u.hint+'" style="width:100%;box-sizing:border-box;border:2px inset #808080;padding:2px 4px;font-size:11px;font-family:inherit"></td></tr>' +
      '</table>' +
      '<button class="w-btn" style="margin-top:8px" onclick="(function(){' +
        'var l=document.getElementById(\'acc-login\').value.trim()||\'Пользователь\';' +
        'var fn=document.getElementById(\'acc-fullname\').value.trim();' +
        'var ht=document.getElementById(\'acc-hint\').value;' +
        '_cpSet.user.login=l;_cpSet.user.fullName=fn||l;_cpSet.user.hint=ht;' +
        '_saveCpSet();win95balloon(\'Учётная запись обновлена!\',\'👤\');' +
      '})()">Применить</button>' +
    '</div>';
  var p1 =
    '<div data-tab-page="1" style="display:none;padding:10px;font-size:12px">' +
      '<div style="margin-bottom:8px;font-size:11px">Изменение пароля для входа в систему</div>' +
      '<table style="font-size:11px;width:100%">' +
        '<tr><td style="padding:3px 4px;width:130px">Текущий пароль:</td><td><input type="password" id="pw-old" style="width:100%;box-sizing:border-box;border:2px inset #808080;padding:2px 4px;font-size:11px;font-family:inherit"></td></tr>' +
        '<tr><td style="padding:3px 4px">Новый пароль:</td><td><input type="password" id="pw-new" style="width:100%;box-sizing:border-box;border:2px inset #808080;padding:2px 4px;font-size:11px;font-family:inherit"></td></tr>' +
        '<tr><td style="padding:3px 4px">Подтверждение:</td><td><input type="password" id="pw-confirm" style="width:100%;box-sizing:border-box;border:2px inset #808080;padding:2px 4px;font-size:11px;font-family:inherit"></td></tr>' +
      '</table>' +
      '<div id="pw-err" style="color:red;font-size:10px;margin-top:4px"></div>' +
      '<button class="w-btn" style="margin-top:8px" onclick="(function(){' +
        'var errEl=document.getElementById(\'pw-err\');errEl.textContent=\'\';' +
        'var o=document.getElementById(\'pw-old\').value;' +
        'var n=document.getElementById(\'pw-new\').value;' +
        'var c=document.getElementById(\'pw-confirm\').value;' +
        'var cur=_cpSet.user.password||\'\';' +
        'if(o!==cur){errEl.textContent=\'Неверный текущий пароль.\';playWin95Sound(\'error\');return;}' +
        'if(n!==c){errEl.textContent=\'Пароли не совпадают.\';playWin95Sound(\'error\');return;}' +
        '_cpSet.user.password=n;_saveCpSet();' +
        'win95balloon(\'Пароль изменён!\',\'🔑\');' +
      '})()">Изменить пароль</button>' +
      (u.hint ? '<div style="color:#808080;font-size:10px;margin-top:6px">Подсказка: ' + u.hint + '</div>' : '') +
    '</div>';
  var p2 =
    '<div data-tab-page="2" style="display:none;padding:10px;font-size:12px">' +
      '<label style="display:block;margin-bottom:6px"><input type="checkbox" '+(u.password?'checked':'')+' onchange="_cpSet.user.password=this.checked?\'пук\':\'\'"> Требовать пароль при входе</label>' +
      '<label style="display:block;margin-bottom:6px"><input type="checkbox"> Пароль хранителя экрана</label>' +
      '<label style="display:block"><input type="checkbox"> Удалённый доступ к ПУК</label>' +
    '</div>';
  createWin({ id:id, title:'Пароли — Свойства', icon:'🔑', w:340, h:300, resize:false,
    content: '<div style="padding:4px">' + tabHtml + p0 + p1 + p2 +
      '<div style="display:flex;justify-content:flex-end;gap:4px;padding:8px">' +
        '<button class="w-btn" onclick="_saveCpSet();closeWin(\''+id+'\')">OK</button>' +
        '<button class="w-btn" onclick="closeWin(\''+id+'\')">Отмена</button>' +
      '</div></div>'
  });
}

function cpDateTime() {
  var id = 'cpdatetime';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  var now = new Date();
  var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  var tabHtml = _tabBar(id, ['Дата и время','Часовой пояс'], 0);
  var calDays = (function(){
    var d = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    var first = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    var html = '<table style="font-size:10px;border-collapse:collapse;margin:4px auto"><tr>';
    ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].forEach(function(h){ html+='<th style="padding:1px 4px;color:#000080">'+h+'</th>'; });
    html+='</tr><tr>';
    var start = (first===0?6:first-1);
    for(var i=0;i<start;i++) html+='<td></td>';
    for(var n=1;n<=d;n++){
      var cur=(n===now.getDate());
      html+='<td style="padding:1px 4px;text-align:center;cursor:default;'+(cur?'background:#000080;color:#fff;font-weight:bold;':'')+'" onclick="document.getElementById(\'cpdt-day\').textContent='+n+'">'+n+'</td>';
      if((start+n)%7===0) html+='</tr><tr>';
    }
    return html+'</tr></table>';
  })();
  var p0 =
    '<div data-tab-page="0" style="padding:8px;font-size:12px">' +
      '<div style="display:flex;gap:10px">' +
        '<div>' +
          '<div style="display:flex;align-items:center;gap:4px;margin-bottom:4px">' +
            '<select style="font-size:11px;border:2px inset #808080;font-family:inherit">' + months.map(function(m,i){ return '<option '+(i===now.getMonth()?'selected':'')+'>'+m+'</option>'; }).join('') + '</select>' +
            '<input type="number" value="'+now.getFullYear()+'" style="width:56px;font-size:11px;border:2px inset #808080;padding:1px 3px;font-family:inherit">' +
          '</div>' +
          calDays +
        '</div>' +
        '<div style="text-align:center;min-width:100px">' +
          '<div style="font-size:28px;font-family:\'Courier New\',monospace;border:2px inset #808080;padding:4px 8px;background:#fff;margin-bottom:8px" id="cpdt-clock">00:00:00</div>' +
          '<input type="text" id="cpdt-timeinput" style="width:80px;font-size:11px;border:2px inset #808080;padding:1px 3px;text-align:center;font-family:inherit" value="'+now.toLocaleTimeString('ru-RU')+'">' +
        '</div>' +
      '</div>' +
    '</div>';
  var p1 =
    '<div data-tab-page="1" style="display:none;padding:10px;font-size:12px">' +
      '<b>Текущий часовой пояс:</b><br>' +
      '<select style="width:100%;margin-top:6px;font-size:11px;border:2px inset #808080;font-family:inherit">' +
        '<option selected>(UTC+💨) Europe/Pukzburg</option>' +
        '<option>(UTC+3) Москва</option>' +
        '<option>(UTC+0) Гринвич</option>' +
        '<option>(UTC-5) Нью-Пукйорк</option>' +
        '<option>(UTC+9) Токио (Пукйо)</option>' +
      '</select>' +
      '<label style="display:block;margin-top:10px"><input type="checkbox" checked> Автоматически переходить на летнее время</label>' +
    '</div>';
  createWin({ id:id, title:'Дата и время', icon:'🕐', w:340, h:280, resize:false,
    content: '<div style="padding:4px">' + tabHtml + p0 + p1 +
      '<div style="display:flex;justify-content:flex-end;gap:4px;padding:8px">' +
        '<button class="w-btn" onclick="(function(){var ti=document.getElementById(\'cpdt-timeinput\');if(ti&&ti.value){var parts=ti.value.split(/[:\s]/);if(parts.length>=2){var target=new Date();target.setHours(parseInt(parts[0])||0,parseInt(parts[1])||0,parseInt(parts[2])||0,0);_timeOffset=target-Date.now();_cpSet.timeOffset=_timeOffset;_saveCpSet();};}win95balloon(\'Дата и время установлены\',\'🕐\');closeWin(\''+id+'\');})()">OK</button>' +
        '<button class="w-btn" onclick="(function(){var ti=document.getElementById(\'cpdt-timeinput\');if(ti&&ti.value){var parts=ti.value.split(/[:\s]/);if(parts.length>=2){var target=new Date();target.setHours(parseInt(parts[0])||0,parseInt(parts[1])||0,parseInt(parts[2])||0,0);_timeOffset=target-Date.now();_cpSet.timeOffset=_timeOffset;_saveCpSet();};}win95balloon(\'Применено\',\'🕐\');})()">Применить</button>' +
        '<button class="w-btn" onclick="closeWin(\''+id+'\')">Отмена</button>' +
      '</div></div>',
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

// ==================== ПУКОЛАЙЗЕР PRO ====================
function appPukPro() {
  var id = 'pukpro';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  createWin({ id:id, title:'Пуколайзер PRO 2003', icon:'💨', w:400, h:300,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">' +
        '<div class="win-dd-item" onclick="closeWin(\'pukpro\')">Выход</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="win95msgbox(\'Пуколайзер PRO 2003\nВерсия 3.0.1337\n\nООО ПУКПРОМ Engineering\nОптимизирует пуки до 420%!\',\'О программе\',\'💨\')">О программе</div>' +
      '</div></div>',
    content:
      '<div style="padding:16px;font-size:12px">' +
        '<div style="background:#000080;color:#fff;padding:6px 12px;margin-bottom:12px;font-size:14px;font-weight:bold">💨 Пуколайзер PRO 2003</div>' +
        '<div style="border:2px inset #808080;padding:8px;background:#c0c0c0;margin-bottom:10px">' +
          '<div style="margin-bottom:6px"><b>Уровень пуков:</b></div>' +
          '<input type="range" min="0" max="100" value="69" style="width:100%">' +
          '<div style="display:flex;justify-content:space-between;font-size:10px"><span>0%</span><span>69%</span><span>100%</span></div>' +
        '</div>' +
        '<div style="border:2px inset #808080;padding:8px;background:#c0c0c0;margin-bottom:10px">' +
          '<b>Режим оптимизации:</b><br>' +
          '<label><input type="radio" name="pkmode" checked> Стандартный пук</label><br>' +
          '<label><input type="radio" name="pkmode"> Турбо-пук</label><br>' +
          '<label><input type="radio" name="pkmode"> Максимальный газ</label>' +
        '</div>' +
        '<div style="display:flex;gap:8px;justify-content:center">' +
          '<button class="w-btn" onclick="win95balloon(\'Оптимизация пуков запущена! +420% газа\',\'💨\',\'Пуколайзер PRO\')">💨 Оптимизировать</button>' +
          '<button class="w-btn" onclick="win95balloon(\'Сканирование завершено: 69 пуков\',\'🔍\',\'Пуколайзер PRO\')">🔍 Сканировать</button>' +
        '</div>' +
      '</div>'
  });
}

// ==================== ГАЗОВЫЕ СИМУЛЯТОРЫ ====================
function appGazSim() {
  var id = 'gazsim';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  createWin({ id:id, title:'Газовые Симуляторы Deluxe', icon:'💨', w:420, h:320,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Симулятор<div class="win-dd">' +
        '<div class="win-dd-item" onclick="closeWin(\'gazsim\')">Выход</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="win95msgbox(\'Газовые Симуляторы Deluxe\nВерсия 2.0\n\nООО ПУКПРОМ Labs\nПрофессиональная симуляция газов\',\'О программе\',\'💨\')">О программе</div>' +
      '</div></div>',
    content:
      '<div style="padding:12px;font-size:12px">' +
        '<div style="background:#006400;color:#fff;padding:6px 12px;margin-bottom:12px;font-size:13px;font-weight:bold">🧪 Газовые Симуляторы Deluxe</div>' +
        '<div style="border:2px inset #808080;padding:8px;background:#c0c0c0;margin-bottom:8px">' +
          '<b>Выберите симуляцию:</b><br>' +
          '<select style="width:100%;margin-top:4px;border:2px inset #808080;font-family:inherit;font-size:11px">' +
            '<option>Пуковое поле (2D)</option>' +
            '<option>Газовый вихрь</option>' +
            '<option>Ядерный пук</option>' +
            '<option>Квантовый газ</option>' +
          '</select>' +
        '</div>' +
        '<div style="border:2px inset #808080;height:80px;background:#000;display:flex;align-items:center;justify-content:center;color:#0f0;font-family:monospace;font-size:11px;margin-bottom:8px" id="gazsim-view">Нажмите Запуск для начала симуляции</div>' +
        '<div style="display:flex;gap:8px;justify-content:center">' +
          '<button class="w-btn" onclick="(function(){var v=document.getElementById(\'gazsim-view\');if(v){v.innerHTML=\'<span style=color:#0f0>💨 💨 💨 Симуляция активна... 69 частиц 💨 💨 💨</span>\';}win95balloon(\'Симуляция запущена!\',\'💨\',\'Газовые Симуляторы\');})()">▶ Запуск</button>' +
          '<button class="w-btn" onclick="var v=document.getElementById(\'gazsim-view\');if(v)v.innerHTML=\'Симуляция остановлена\'">⏹ Стоп</button>' +
        '</div>' +
      '</div>'
  });
}

// ==================== ЭНЦИКЛОПЕДИЯ ПУКОВ ====================
function appEncy() {
  var id = 'ency';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  var entries = [
    { term: 'Пук', def: 'Газовый выброс, производимый организмом. Основа деятельности ООО ПУКПРОМ.' },
    { term: 'Газ', def: 'Вещество, составляющее основу пуков. Хранится в газовых резервуарах.' },
    { term: 'ПУКПРОМ', def: 'ООО ПУКПРОМ — ведущий производитель пуковых технологий с 1993 года.' },
    { term: 'ПУКДОС', def: 'Операционная система семейства ПУКПРОМ, основанная на технологии газового управления.' },
    { term: 'Рикролл', def: 'Музыкальная пасхалка. При обнаружении воспроизводит Never Gonna Give You Up.' },
    { term: 'BSOD', def: 'Blue Screen of Death — критическая ошибка, выводящая синий экран с пуковым дампом памяти.' },
  ];
  createWin({ id:id, title:'Энциклопедия Пуков', icon:'📚', w:440, h:340,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">' +
        '<div class="win-dd-item" onclick="closeWin(\'ency\')">Выход</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="win95msgbox(\'Большая Энциклопедия Пуков\nИздание 3-е, расширенное\n\nООО ПУКПРОМ Publishing, 2000\n2000+ статей о пуках\',\'О программе\',\'📚\')">О программе</div>' +
      '</div></div>',
    content:
      '<div style="display:flex;height:100%">' +
        '<div style="width:140px;border-right:2px solid #808080;padding:4px;overflow-y:auto;font-size:11px">' +
          entries.map(function(e,i){ return '<div style="padding:3px 6px;cursor:pointer;border:1px solid transparent" onmouseover="this.style.background=\'#000080\';this.style.color=\'#fff\'" onmouseout="this.style.background=\'\';this.style.color=\'\'" onclick="var d=document.getElementById(\'ency-def\');if(d){d.innerHTML=\'<b>'+e.term+'</b><hr>'+e.def+'\';}">'+e.term+'</div>'; }).join('') +
        '</div>' +
        '<div id="ency-def" style="flex:1;padding:12px;font-size:12px;line-height:1.6;overflow-y:auto">' +
          '<span style="color:#808080">← Выберите статью</span>' +
        '</div>' +
      '</div>'
  });
}

// ==================== ПУК ОФИС ====================

// --- ПукВорд ---
function appPukWord() {
  var id = 'pukword';
  if (_wins[id]) { focusWin(id); if (_wins[id].min) restoreWin(id); return; }
  var _pwPath = null, _pwName = 'Документ1.doc', _pwDirty = false;

  function _pwSave(path) {
    var ed = document.getElementById('pw-editor');
    if (!ed) return;
    _vfs.writeFile(path, ed.innerHTML);
    _pwPath = path; _pwName = path.split('/').pop(); _pwDirty = false;
    var tb = document.querySelector('#win_pukword .win-titlebar-text');
    if (tb) tb.textContent = _pwName + ' — ПукВорд';
    win95balloon('Сохранено: ' + _pwName, '📄');
    if (window._myDocsRefresh) _myDocsRefresh();
  }
  window._pwSave = function() {
    if (_pwPath) _pwSave(_pwPath);
    else win95input('Сохранить как', 'Имя файла:', _pwName, function(n) { if (n) _pwSave('C:/Мои документы/' + n); });
  };
  window._pwSaveAs = function() {
    win95input('Сохранить как', 'Имя файла:', _pwName, function(n) { if (n) _pwSave('C:/Мои документы/' + n); });
  };
  window._pwOpen = function() {
    win95filePicker('C:/Мои документы', function(path, name) {
      var c = _vfs.readFile(path);
      if (c === null) { win95msgbox('Файл не найден.', 'Ошибка', '⚠️'); return; }
      var ed = document.getElementById('pw-editor');
      if (ed) { ed.innerHTML = c; }
      _pwPath = path; _pwName = name; _pwDirty = false;
      var tb = document.querySelector('#win_pukword .win-titlebar-text');
      if (tb) tb.textContent = name + ' — ПукВорд';
    });
  };
  window._pwClose = function() {
    if (_pwDirty) win95confirm('Сохранить изменения в "' + _pwName + '"?', function() { window._pwSave(); closeWin(id); }, function() { closeWin(id); });
    else closeWin(id);
  };
  window._pwFmt = function(cmd, val) {
    document.getElementById('pw-editor') && document.getElementById('pw-editor').focus();
    document.execCommand(cmd, false, val || null);
  };

  createWin({ id:id, title:'ПукВорд — ' + _pwName, icon:'📄', w:620, h:480,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">' +
        '<div class="win-dd-item" onclick="_pwOpen()">📂 Открыть...</div>' +
        '<div class="win-dd-item" onclick="_pwSave()">💾 Сохранить</div>' +
        '<div class="win-dd-item" onclick="_pwSaveAs()">💾 Сохранить как...</div>' +
        '<div class="win-dd-sep"></div>' +
        '<div class="win-dd-item" onclick="_pwClose()">Выход</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Правка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="_pwFmt(\'undo\')">↩ Отменить</div>' +
        '<div class="win-dd-item" onclick="_pwFmt(\'redo\')">↪ Повторить</div>' +
        '<div class="win-dd-sep"></div>' +
        '<div class="win-dd-item" onclick="_pwFmt(\'selectAll\')">Выделить всё</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Вставить<div class="win-dd">' +
        '<div class="win-dd-item" onclick="_pwFmt(\'insertHorizontalRule\')">Горизонтальная линия</div>' +
        '<div class="win-dd-item" onclick="(function(){var u=prompt(\'URL изображения:\');if(u)_pwFmt(\'insertImage\',u);})()">Изображение по URL</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="aboutWin(\'pukword\',\'ПукВорд\',\'1.0\',\'📄\',\'Текстовый процессор ПУКДОС 95.<br>ПукОфис 95 Standard Edition.\')">О программе</div>' +
      '</div></div>',
    content:
      // Formatting toolbar
      '<div style="background:#c0c0c0;border-bottom:2px solid #808080;padding:2px 4px;display:flex;gap:2px;align-items:center;flex-wrap:wrap">' +
        '<select onchange="_pwFmt(\'fontName\',this.value);this.blur()" style="font-size:10px;border:2px inset #808080;height:20px;font-family:inherit">' +
          ['Times New Roman','Arial','Courier New','Comic Sans MS','Verdana','Tahoma'].map(function(f){ return '<option>'+f+'</option>'; }).join('') +
        '</select>' +
        '<select onchange="_pwFmt(\'fontSize\',this.value);this.blur()" style="font-size:10px;border:2px inset #808080;height:20px;width:40px;font-family:inherit">' +
          [1,2,3,4,5,6,7].map(function(s){ return '<option value="'+s+'"'+(s===3?' selected':'')+'>'+[8,10,12,14,18,24,36][s-1]+'</option>'; }).join('') +
        '</select>' +
        '<div style="width:1px;background:#808080;height:18px;margin:0 1px"></div>' +
        '<button class="w-btn" style="font-weight:bold;min-width:22px;height:20px;padding:0 4px" onclick="_pwFmt(\'bold\')" title="Жирный"><b>Ж</b></button>' +
        '<button class="w-btn" style="font-style:italic;min-width:22px;height:20px;padding:0 4px" onclick="_pwFmt(\'italic\')" title="Курсив"><i>К</i></button>' +
        '<button class="w-btn" style="text-decoration:underline;min-width:22px;height:20px;padding:0 4px" onclick="_pwFmt(\'underline\')" title="Подчёркнутый"><u>Ч</u></button>' +
        '<div style="width:1px;background:#808080;height:18px;margin:0 1px"></div>' +
        '<button class="w-btn" style="min-width:22px;height:20px;padding:0 3px" onclick="_pwFmt(\'justifyLeft\')" title="По левому краю">◧</button>' +
        '<button class="w-btn" style="min-width:22px;height:20px;padding:0 3px" onclick="_pwFmt(\'justifyCenter\')" title="По центру">◫</button>' +
        '<button class="w-btn" style="min-width:22px;height:20px;padding:0 3px" onclick="_pwFmt(\'justifyRight\')" title="По правому краю">◨</button>' +
        '<div style="width:1px;background:#808080;height:18px;margin:0 1px"></div>' +
        '<button class="w-btn" style="min-width:22px;height:20px;padding:0 3px" onclick="_pwFmt(\'insertUnorderedList\')" title="Маркированный список">•≡</button>' +
        '<button class="w-btn" style="min-width:22px;height:20px;padding:0 3px" onclick="_pwFmt(\'insertOrderedList\')" title="Нумерованный список">1≡</button>' +
        '<div style="width:1px;background:#808080;height:18px;margin:0 1px"></div>' +
        '<input type="color" value="#000000" onchange="_pwFmt(\'foreColor\',this.value)" title="Цвет текста" style="width:22px;height:20px;padding:0;border:2px inset #808080;cursor:pointer">' +
        '<input type="color" value="#ffffff" onchange="_pwFmt(\'hiliteColor\',this.value)" title="Цвет выделения" style="width:22px;height:20px;padding:0;border:2px inset #808080;cursor:pointer">' +
      '</div>' +
      // Ruler
      '<div style="background:#c0c0c0;border-bottom:1px solid #808080;height:14px;display:flex;align-items:center;padding:0 8px;font-size:9px;color:#444;font-family:\'Courier New\',monospace;letter-spacing:3px;overflow:hidden">' +
        '|.....|.....|.....|.....|.....|.....|.....|.....|.....|.....|.....|.....|.....|.....' +
      '</div>' +
      // Page editor
      '<div style="flex:1;overflow:auto;background:#808080;padding:12px">' +
        '<div id="pw-editor" contenteditable="true" spellcheck="false" ' +
          'style="background:#fff;min-height:400px;padding:40px 50px;font-family:Times New Roman,serif;font-size:14px;line-height:1.6;outline:none;box-shadow:2px 2px 8px rgba(0,0,0,0.4);margin:0 auto;max-width:560px">' +
          '<p>Введите текст документа...</p>' +
        '</div>' +
      '</div>',
    afterOpen: function() {
      var ed = document.getElementById('pw-editor');
      if (ed) ed.addEventListener('input', function() { _pwDirty = true; });
      setTimeout(function() {
        var cb = document.querySelector('#win_pukword .win-titlebar-btn[onclick*="closeWin"]');
        if (cb) cb.setAttribute('onclick', '_pwClose()');
      }, 50);
    }
  });
}

// --- ПукЭксель ---
function appPukExcel() {
  var id = 'pukexcel';
  if (_wins[id]) { focusWin(id); if (_wins[id].min) restoreWin(id); return; }
  var ROWS = 20, COLS = 8;
  var _pxData = {}, _pxPath = null, _pxName = 'Книга1.xls', _pxDirty = false;
  var _colLabels = 'ABCDEFGH'.split('');

  function _pxGet(r, c) { return _pxData[r+','+c] || ''; }
  function _pxSet(r, c, v) { _pxData[r+','+c] = v; _pxDirty = true; }

  function _pxEval(val) {
    if (!val || val[0] !== '=') return val;
    try {
      var expr = val.slice(1).toUpperCase();
      // Parse range like A1:B3
      var rangeMatch = expr.match(/^(SUM|AVG|MAX|MIN|COUNT)\(([A-H])(\d+):([A-H])(\d+)\)$/);
      if (rangeMatch) {
        var fn = rangeMatch[1], c1 = _colLabels.indexOf(rangeMatch[2]), r1 = parseInt(rangeMatch[3])-1,
            c2 = _colLabels.indexOf(rangeMatch[4]), r2 = parseInt(rangeMatch[5])-1;
        var vals = [];
        for (var r = r1; r <= r2; r++) for (var c = c1; c <= c2; c++) {
          var v = parseFloat(_pxGet(r, c)); if (!isNaN(v)) vals.push(v);
        }
        if (fn === 'SUM') return vals.reduce(function(a,b){return a+b;},0).toString();
        if (fn === 'AVG') return vals.length ? (vals.reduce(function(a,b){return a+b;},0)/vals.length).toFixed(2) : '0';
        if (fn === 'MAX') return vals.length ? Math.max.apply(null,vals).toString() : '0';
        if (fn === 'MIN') return vals.length ? Math.min.apply(null,vals).toString() : '0';
        if (fn === 'COUNT') return vals.length.toString();
      }
      // Simple cell ref like A1
      var cellRef = expr.match(/^([A-H])(\d+)$/);
      if (cellRef) return _pxGet(parseInt(cellRef[2])-1, _colLabels.indexOf(cellRef[1]));
    } catch(ex) { return '#ERR'; }
    return '#?';
  }

  function _pxRender() {
    var tbl = document.getElementById('px-table');
    if (!tbl) return;
    var h = '<table style="border-collapse:collapse;font-size:11px;font-family:Arial,sans-serif">' +
      '<tr><th style="background:#c0c0c0;border:1px solid #808080;width:30px;min-width:30px"></th>' +
      _colLabels.map(function(l){ return '<th style="background:#c0c0c0;border:1px solid #808080;width:72px;min-width:72px;padding:1px 4px">' + l + '</th>'; }).join('') + '</tr>';
    for (var r = 0; r < ROWS; r++) {
      h += '<tr><td style="background:#c0c0c0;border:1px solid #808080;text-align:center;color:#444;padding:0 3px">' + (r+1) + '</td>';
      for (var c = 0; c < COLS; c++) {
        var raw = _pxGet(r, c), display = _pxEval(raw);
        var isFormula = raw && raw[0] === '=';
        h += '<td style="border:1px solid #c0c0c0;padding:0;background:#fff">' +
          '<input type="text" value="' + display.replace(/"/g,'&quot;') + '" ' +
            'data-r="'+r+'" data-c="'+c+'" data-raw="' + raw.replace(/"/g,'&quot;') + '" ' +
            'style="width:70px;border:none;outline:none;padding:1px 3px;font-family:Arial,sans-serif;font-size:11px;background:' + (isFormula?'#fffff0':'#fff') + ';font-style:' + (isFormula?'italic':'normal') + '"' +
            ' onfocus="this.value=this.dataset.raw"' +
            ' onblur="_pxCell(this)" onkeydown="if(event.key===\'Enter\'){event.preventDefault();_pxCell(this);var nr=this.closest(\'tr\').nextElementSibling;if(nr)nr.querySelector(\'input\')&&nr.querySelector(\'input\').focus();}if(event.key===\'Tab\'){event.preventDefault();_pxCell(this);var nc=this.closest(\'td\').nextElementSibling;if(nc)nc.querySelector(\'input\')&&nc.querySelector(\'input\').focus();}">' +
          '</td>';
      }
      h += '</tr>';
    }
    h += '</table>';
    tbl.innerHTML = h;
  }

  window._pxCell = function(inp) {
    var r = parseInt(inp.dataset.r), c = parseInt(inp.dataset.c);
    _pxSet(r, c, inp.value);
    inp.dataset.raw = inp.value;
    inp.value = _pxEval(inp.value);
    inp.style.background = (inp.dataset.raw && inp.dataset.raw[0]==='=') ? '#fffff0' : '#fff';
    inp.style.fontStyle = (inp.dataset.raw && inp.dataset.raw[0]==='=') ? 'italic' : 'normal';
    // Update formula-dependent cells
    _pxRender();
  };
  window._pxSave = function() {
    if (_pxPath) _pxDoSave(_pxPath);
    else win95input('Сохранить как', 'Имя файла:', _pxName, function(n){ if(n) _pxDoSave('C:/Мои документы/'+n); });
  };
  function _pxDoSave(path) {
    _vfs.writeFile(path, JSON.stringify(_pxData));
    _pxPath = path; _pxName = path.split('/').pop(); _pxDirty = false;
    var tb = document.querySelector('#win_pukexcel .win-titlebar-text');
    if (tb) tb.textContent = _pxName + ' — ПукЭксель';
    win95balloon('Сохранено: ' + _pxName, '📊');
    if (window._myDocsRefresh) _myDocsRefresh();
  }
  window._pxOpen = function() {
    win95filePicker('C:/Мои документы', function(path, name) {
      var c = _vfs.readFile(path);
      if (!c) { win95msgbox('Файл не найден.', 'Ошибка', '⚠️'); return; }
      try { _pxData = JSON.parse(c); } catch(e) { win95msgbox('Повреждённый файл.', 'Ошибка', '⚠️'); return; }
      _pxPath = path; _pxName = name; _pxDirty = false;
      var tb = document.querySelector('#win_pukexcel .win-titlebar-text');
      if (tb) tb.textContent = name + ' — ПукЭксель';
      _pxRender();
    });
  };
  window._pxClose = function() {
    if (_pxDirty) win95confirm('Сохранить изменения в "' + _pxName + '"?', function() { window._pxSave(); closeWin(id); }, function() { closeWin(id); });
    else closeWin(id);
  };

  createWin({ id:id, title:'ПукЭксель — ' + _pxName, icon:'📊', w:620, h:420,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">' +
        '<div class="win-dd-item" onclick="_pxOpen()">📂 Открыть...</div>' +
        '<div class="win-dd-item" onclick="_pxSave()">💾 Сохранить</div>' +
        '<div class="win-dd-sep"></div>' +
        '<div class="win-dd-item" onclick="_pxClose()">Выход</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Вставить<div class="win-dd">' +
        '<div class="win-dd-item" onclick="(function(){var r=document.querySelector(\'#px-table input:focus\');if(r){r.value=\'=SUM(A1:A5)\';_pxCell(r);}})()">Функция SUM...</div>' +
        '<div class="win-dd-item" onclick="(function(){var r=document.querySelector(\'#px-table input:focus\');if(r){r.value=\'=AVG(A1:A5)\';_pxCell(r);}})()">Функция AVG...</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="win95msgbox(\'Поддерживаемые формулы:\\n=SUM(A1:B5)\\n=AVG(A1:B5)\\n=MAX(A1:B5)\\n=MIN(A1:B5)\\n=COUNT(A1:B5)\\n=A1 (ссылка на ячейку)\',\'Формулы\',\'📊\')">Справка по формулам</div>' +
        '<div class="win-dd-item" onclick="aboutWin(\'pukexcel\',\'ПукЭксель\',\'1.0\',\'📊\',\'Табличный процессор ПУКДОС 95.<br>ПукОфис 95 Standard Edition.\')">О программе</div>' +
      '</div></div>',
    content:
      '<div style="background:#c0c0c0;border-bottom:2px solid #808080;padding:2px 6px;font-size:11px;display:flex;align-items:center;gap:6px">' +
        '<span style="font-weight:bold;color:#000080">fx</span>' +
        '<input type="text" id="px-formula-bar" placeholder="Введите значение или формулу (=SUM(A1:B3))" ' +
          'style="flex:1;border:2px inset #808080;padding:2px 5px;font-family:\'Courier New\',monospace;font-size:11px;outline:none">' +
      '</div>' +
      '<div id="px-table" style="flex:1;overflow:auto;background:#fff"></div>',
    afterOpen: function() {
      _pxRender();
      setTimeout(function() {
        var cb = document.querySelector('#win_pukexcel .win-titlebar-btn[onclick*="closeWin"]');
        if (cb) cb.setAttribute('onclick', '_pxClose()');
      }, 50);
    }
  });
}

// --- ПукПрез ---
function appPukPrez() {
  var id = 'pukprez';
  if (_wins[id]) { focusWin(id); if (_wins[id].min) restoreWin(id); return; }
  var _ppSlides = [{ title: 'Слайд 1', body: 'Нажмите для редактирования содержимого слайда.', bg: '#ffffff', color: '#000000' }];
  var _ppCur = 0, _ppPath = null, _ppName = 'Презентация1.ppt', _ppDirty = false;

  function _ppRender() {
    var panel = document.getElementById('pp-slides-panel');
    var editor = document.getElementById('pp-editor');
    if (!panel || !editor) return;
    panel.innerHTML = _ppSlides.map(function(s, i) {
      var isActive = i === _ppCur;
      return '<div onclick="_ppSelect('+i+')" style="cursor:pointer;border:2px solid '+(isActive?'#000080':'#808080')+';background:'+s.bg+';color:'+s.color+';padding:4px;margin-bottom:4px;min-height:48px;font-size:9px;overflow:hidden">' +
        '<div style="font-weight:bold;font-size:10px;margin-bottom:2px">' + s.title + '</div>' +
        '<div style="font-size:8px;color:#666">' + s.body.substring(0,40) + (s.body.length>40?'...':'') + '</div>' +
      '</div>';
    }).join('');
    var s = _ppSlides[_ppCur];
    editor.innerHTML =
      '<div id="pp-slide" style="background:'+s.bg+';color:'+s.color+';padding:30px 40px;flex:1;min-height:280px;display:flex;flex-direction:column;justify-content:center;border:2px inset #808080">' +
        '<input type="text" id="pp-title-input" value="'+s.title.replace(/"/g,'&quot;')+'" ' +
          'style="font-size:22px;font-weight:bold;font-family:Arial,sans-serif;border:none;border-bottom:2px dashed #ccc;outline:none;background:transparent;color:'+s.color+';width:100%;margin-bottom:16px" ' +
          'oninput="_ppUpdateTitle(this.value)">' +
        '<textarea id="pp-body-input" style="font-size:14px;font-family:Arial,sans-serif;border:1px dashed #ccc;outline:none;background:transparent;color:'+s.color+';width:100%;min-height:140px;resize:none;line-height:1.6" ' +
          'oninput="_ppUpdateBody(this.value)">' + s.body + '</textarea>' +
        '<div style="position:absolute;bottom:8px;right:12px;font-size:10px;color:#aaa">' + (_ppCur+1) + ' / ' + _ppSlides.length + '</div>' +
      '</div>';
    var sb = document.getElementById('sb_pukprez');
    if (sb) sb.textContent = 'Слайд ' + (_ppCur+1) + ' из ' + _ppSlides.length;
  }

  window._ppSelect = function(i) { _ppCur = i; _ppRender(); };
  window._ppUpdateTitle = function(v) { _ppSlides[_ppCur].title = v; _ppDirty = true; };
  window._ppUpdateBody = function(v) { _ppSlides[_ppCur].body = v; _ppDirty = true; };
  window._ppAddSlide = function() {
    _ppSlides.push({ title: 'Слайд ' + (_ppSlides.length+1), body: 'Новый слайд.', bg: '#ffffff', color: '#000000' });
    _ppCur = _ppSlides.length - 1; _ppDirty = true; _ppRender();
  };
  window._ppDelSlide = function() {
    if (_ppSlides.length <= 1) { win95balloon('Нельзя удалить единственный слайд', '⚠️'); return; }
    _ppSlides.splice(_ppCur, 1);
    _ppCur = Math.max(0, _ppCur - 1); _ppDirty = true; _ppRender();
  };
  window._ppBg = function() {
    win95input('Фон слайда', 'Цвет фона (hex, напр. #ffcc00):', _ppSlides[_ppCur].bg, function(v) {
      if (v) { _ppSlides[_ppCur].bg = v; _ppDirty = true; _ppRender(); }
    });
  };
  window._ppSave = function() {
    if (_ppPath) _ppDoSave(_ppPath);
    else win95input('Сохранить как', 'Имя файла:', _ppName, function(n){ if(n) _ppDoSave('C:/Мои документы/'+n); });
  };
  function _ppDoSave(path) {
    _vfs.writeFile(path, JSON.stringify(_ppSlides));
    _ppPath = path; _ppName = path.split('/').pop(); _ppDirty = false;
    var tb = document.querySelector('#win_pukprez .win-titlebar-text');
    if (tb) tb.textContent = _ppName + ' — ПукПрез';
    win95balloon('Сохранено: ' + _ppName, '📑');
    if (window._myDocsRefresh) _myDocsRefresh();
  }
  window._ppOpen = function() {
    win95filePicker('C:/Мои документы', function(path, name) {
      var c = _vfs.readFile(path);
      if (!c) { win95msgbox('Файл не найден.', 'Ошибка', '⚠️'); return; }
      try { _ppSlides = JSON.parse(c); } catch(e) { win95msgbox('Повреждённый файл.', 'Ошибка', '⚠️'); return; }
      _ppCur = 0; _ppPath = path; _ppName = name; _ppDirty = false;
      var tb = document.querySelector('#win_pukprez .win-titlebar-text');
      if (tb) tb.textContent = name + ' — ПукПрез';
      _ppRender();
    });
  };
  window._ppClose = function() {
    if (_ppDirty) win95confirm('Сохранить изменения в "' + _ppName + '"?', function() { window._ppSave(); closeWin(id); }, function() { closeWin(id); });
    else closeWin(id);
  };

  createWin({ id:id, title:'ПукПрез — ' + _ppName, icon:'📑', w:700, h:460, status:'Слайд 1 из 1',
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">' +
        '<div class="win-dd-item" onclick="_ppOpen()">📂 Открыть...</div>' +
        '<div class="win-dd-item" onclick="_ppSave()">💾 Сохранить</div>' +
        '<div class="win-dd-sep"></div>' +
        '<div class="win-dd-item" onclick="_ppClose()">Выход</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Слайд<div class="win-dd">' +
        '<div class="win-dd-item" onclick="_ppAddSlide()">➕ Добавить слайд</div>' +
        '<div class="win-dd-item" onclick="_ppDelSlide()">🗑️ Удалить слайд</div>' +
        '<div class="win-dd-sep"></div>' +
        '<div class="win-dd-item" onclick="_ppBg()">🎨 Фон слайда...</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="aboutWin(\'pukprez\',\'ПукПрез\',\'1.0\',\'📑\',\'Редактор презентаций ПУКДОС 95.<br>ПукОфис 95 Standard Edition.\')">О программе</div>' +
      '</div></div>',
    content:
      '<div style="display:flex;height:100%;gap:0">' +
        '<div style="width:130px;min-width:130px;border-right:2px solid #808080;background:#c0c0c0;padding:4px;overflow-y:auto" id="pp-slides-panel"></div>' +
        '<div style="flex:1;display:flex;flex-direction:column;overflow:auto;position:relative" id="pp-editor"></div>' +
      '</div>',
    afterOpen: function() {
      _ppRender();
      setTimeout(function() {
        var cb = document.querySelector('#win_pukprez .win-titlebar-btn[onclick*="closeWin"]');
        if (cb) cb.setAttribute('onclick', '_ppClose()');
      }, 50);
    }
  });
}

// ==================== DEVELOPER MENU ====================
function appDevMenu() {
  var id = 'devmenu';
  if (document.getElementById('win_'+id)) { focusWin(id); return; }
  var tabHtml = _tabBar(id, ['Система','Ошибки','localStorage','Инструменты'], 0);

  var lsKeys = (function(){
    var keys = [];
    try { for(var i=0;i<localStorage.length;i++) keys.push(localStorage.key(i)); } catch(e) {}
    return keys;
  })();

  var p0 =
    '<div data-tab-page="0" style="padding:8px;font-size:11px">' +
      '<div style="font-weight:bold;margin-bottom:6px;color:#800000">⚠️ Системные инструменты разработчика</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">' +
        '<button class="w-btn" onclick="showBSOD()">💀 Синий экран</button>' +
        '<button class="w-btn" onclick="(function(){var e=_errorMessages[Math.floor(Math.random()*_errorMessages.length)];w95error(e[0],e[1],e[2]);})()">⚡ Случайная ошибка</button>' +
        '<button class="w-btn" onclick="doShutdown()">🔌 Выключение</button>' +
        '<button class="w-btn" onclick="location.reload()">🔄 Перезагрузка</button>' +
        '<button class="w-btn" onclick="win95balloon(\'Тестовый balloon!\',\'🎉\',\'DEV\')">🎈 Test Balloon</button>' +
        '<button class="w-btn" onclick="win95msgbox(\'Тестовое сообщение\\nЛиния 2\\nЛиния 3\',\'Test MsgBox\',\'🧪\')">📋 Test MsgBox</button>' +
        '<button class="w-btn" onclick="playWin95Sound(\'startup\')">🔊 Startup Sound</button>' +
        '<button class="w-btn" onclick="playWin95Sound(\'error\')">🔊 Error Sound</button>' +
      '</div>' +
      '<div style="margin-top:8px">' +
        '<b>Открыть приложение:</b>' +
        '<div style="display:flex;gap:4px;margin-top:4px">' +
          '<select id="dev-app-sel" style="flex:1;font-size:11px;border:2px inset #808080;font-family:inherit">' +
            ['welcome','mypc','notepad','calc','paint','ie','doom','sysinfo','trash','media','taskman','ctrl','tbsettings'].map(function(a){
              return '<option value="'+a+'">'+a+'</option>';
            }).join('') +
          '</select>' +
          '<button class="w-btn" onclick="openApp(document.getElementById(\'dev-app-sel\').value)">Открыть</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  var p1 =
    '<div data-tab-page="1" style="display:none;padding:8px;font-size:11px">' +
      '<b>Генераторы ошибок:</b>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:6px">' +
        '<button class="w-btn" onclick="(function(){var e=_errorMessages[Math.floor(Math.random()*_errorMessages.length)];w95error(e[0],e[1],e[2]);})()">Случайная ошибка</button>' +
        '<button class="w-btn" onclick="for(var i=0;i<3;i++)(function(n){setTimeout(function(){var e=_errorMessages[n%_errorMessages.length];w95error(e[0],e[1],e[2]);},n*600);})(i)">3 ошибки подряд</button>' +
        '<button class="w-btn" onclick="(function(){var msgs=[\'💾 Диск A: не готов\',\'🌐 Сеть недоступна\',\'💨 Газ кончился\'];win95balloon(msgs[Math.floor(Math.random()*msgs.length)],\'⚠️\',\'Предупреждение\');})()">Balloon warning</button>' +
        '<button class="w-btn" onclick="showBSOD()">BSOD</button>' +
      '</div>' +
      '<div style="margin-top:8px"><b>Сообщения BSOD:</b>' +
        '<select id="dev-bsod-sel" style="display:block;width:100%;margin-top:4px;font-size:10px;border:2px inset #808080;font-family:\'Courier New\',monospace">' +
          _bsodMessages.map(function(m,i){ return '<option value="'+i+'">BSOD #'+(i+1)+'</option>'; }).join('') +
        '</select>' +
        '<button class="w-btn" style="margin-top:4px" onclick="(function(){var i=parseInt(document.getElementById(\'dev-bsod-sel\').value);var el=document.getElementById(\'bsod\');if(el){el.innerHTML=\'<div style=background:#fff;color:#0000aa;display:inline-block;padding:2px 8px;margin-bottom:16px;font-weight:bold>Пукдос 95</div><br><br>\'+_bsodMessages[i].replace(/\\n/g,\'<br>\')+\'<br><br><span style=font-size:11px;color:#aaaaff>(Нажмите на экран чтобы продолжить)</span>\';el.style.display=\'block\';}})()">Показать выбранный BSOD</button>' +
      '</div>' +
    '</div>';

  var lsRows = lsKeys.length > 0
    ? lsKeys.map(function(k) {
        var val = ''; try { val = (localStorage.getItem(k)||'').substring(0,60); } catch(e){}
        return '<tr><td style="padding:2px 4px;border:1px solid #c0c0c0;font-weight:bold;max-width:100px;overflow:hidden;word-break:break-all">'+k+'</td>' +
          '<td style="padding:2px 4px;border:1px solid #c0c0c0;font-size:10px;font-family:\'Courier New\',monospace;word-break:break-all">'+val+'…</td>' +
          '<td style="padding:2px 4px;border:1px solid #c0c0c0"><button class="w-btn" style="font-size:9px;padding:1px 3px" onclick="try{localStorage.removeItem(\''+k+'\');}catch(e){}win95balloon(\'Удалено: '+k+'\',\'🗑️\');closeWin(\'devmenu\');appDevMenu()">✕</button></td></tr>';
      }).join('')
    : '<tr><td colspan="3" style="padding:6px;text-align:center;color:#808080">localStorage пуст</td></tr>';

  var p2 =
    '<div data-tab-page="2" style="display:none;padding:6px;font-size:11px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">' +
        '<b>Ключи localStorage ('+lsKeys.length+'):</b>' +
        '<button class="w-btn" style="font-size:10px;color:#cc0000" onclick="if(confirm(\'Удалить ВСЁ из localStorage?\'))try{localStorage.clear();}catch(e){}win95balloon(\'localStorage очищен\',\'🗑️\');closeWin(\'devmenu\');appDevMenu()">Очистить всё</button>' +
      '</div>' +
      '<div style="overflow-y:auto;max-height:160px;border:2px inset #808080">' +
        '<table style="width:100%;border-collapse:collapse;font-size:10px">' +
          '<tr style="background:#c0c0c0"><th style="padding:2px 4px;text-align:left;border:1px solid #808080">Ключ</th><th style="padding:2px 4px;text-align:left;border:1px solid #808080">Значение</th><th style="padding:2px 4px;border:1px solid #808080"></th></tr>' +
          lsRows +
        '</table>' +
      '</div>' +
    '</div>';

  var p3 =
    '<div data-tab-page="3" style="display:none;padding:8px;font-size:11px">' +
      '<b>Открытые окна:</b>' +
      '<div id="dev-wins-list" style="border:2px inset #808080;padding:4px;min-height:40px;max-height:80px;overflow-y:auto;margin:4px 0;font-size:10px">' +
        Object.keys(_wins).map(function(k){ return '• '+k+' ('+(_wins[k].title||'')+')<br>'; }).join('') || '<span style="color:#808080">Нет открытых окон</span>' +
      '</div>' +
      '<div style="display:flex;gap:4px;flex-wrap:wrap">' +
        '<button class="w-btn" onclick="Object.keys(_wins).forEach(function(id){if(id!==\'devmenu\')closeWin(id)})">Закрыть все окна</button>' +
        '<button class="w-btn" onclick="var ids=Object.keys(_wins);ids.forEach(function(id){var e=document.getElementById(\'win_\'+id);if(e){e.style.left=(Math.random()*(window.innerWidth-200))+ \'px\';e.style.top=(Math.random()*(window.innerHeight-200))+\'px\';}});win95balloon(\'Окна перемешаны!\',\'🎲\')">Перемешать окна</button>' +
        '<button class="w-btn" onclick="for(var i=0;i<5;i++)(function(n){setTimeout(function(){openApp([\'notepad\',\'calc\',\'paint\',\'ie\',\'trash\'][n]);},n*200);})(i)">Спавн 5 окон</button>' +
      '</div>' +
      '<div style="margin-top:8px"><b>JS консоль:</b>' +
        '<div style="display:flex;gap:4px;margin-top:4px">' +
          '<input type="text" id="dev-eval" placeholder="eval()..." style="flex:1;font-size:11px;border:2px inset #808080;padding:2px 4px;font-family:\'Courier New\',monospace">' +
          '<button class="w-btn" onclick="(function(){try{var r=eval(document.getElementById(\'dev-eval\').value);win95balloon(String(r),\'✅\',\'Результат\');}catch(ex){win95balloon(String(ex),\'❌\',\'Ошибка\');}})()">▶</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  createWin({ id:id, title:'Меню разработчика — ПУКДОС 95', icon:'🔧', w:460, h:340,
    content: '<div style="padding:4px">' +
      '<div style="background:#800000;color:#fff;padding:4px 8px;font-size:11px;margin-bottom:4px">⚠️ РЕЖИМ РАЗРАБОТЧИКА — только для ООО ПУКПРОМ Engineering</div>' +
      tabHtml + p0 + p1 + p2 + p3 +
    '</div>'
  });
}

// ==================== МОИ ДОКУМЕНТЫ ====================
function appMyDocs() {
  appExplorer('C:/Мои документы/');
}

// Расширяем Блокнот поддержкой VFS
function appNotepad(filename, content, vfsPath) {
  var id = 'notepad' + (vfsPath ? '_' + vfsPath.replace(/[^a-zA-Zа-яА-Я0-9]/g,'_') : '');
  if (filename && _wins[id]) { focusWin(id); if (_wins[id].min) restoreWin(id); return; }
  if (!filename) { id = 'notepad'; }
  if (_wins[id]) { focusWin(id); if (_wins[id].min) restoreWin(id); return; }

  var text = content || '';
  var currentPath = vfsPath || null;
  var currentName = filename || 'Безымянный';
  var _npDirty = false;

  function _save(path) {
    var ta = document.getElementById('np_ta_' + id);
    if (!ta) return;
    _vfs.writeFile(path, ta.value);
    currentPath = path;
    currentName = path.split('/').pop();
    _npDirty = false;
    var tb = document.querySelector('#win_' + id + ' .win-titlebar-text');
    if (tb) tb.textContent = currentName + ' — Блокнот';
    win95balloon('Файл сохранён: ' + currentName, '📝');
    if (window._myDocsRefresh) _myDocsRefresh();
  }

  window['_npSave_' + id] = function() {
    if (currentPath) { _save(currentPath); }
    else { _npSaveAs_fn(); }
  };
  window['_npSaveAs_' + id] = function() { _npSaveAs_fn(); };

  function _npSaveAs_fn() {
    win95input('Сохранить как', 'Имя файла:', currentName || 'документ.txt', function(name) {
      if (!name) return;
      _save('C:/Мои документы/' + name);
    });
  }

  window['_npOpen_' + id] = function() {
    win95filePicker('C:/Мои документы', function(path, name) {
      var c = _vfs.readFile(path);
      if (c === null) { win95msgbox('Файл не найден.', 'Ошибка', '⚠️'); return; }
      var ta = document.getElementById('np_ta_' + id);
      if (ta) ta.value = c;
      currentPath = path;
      currentName = name;
      _npDirty = false;
      var tb = document.querySelector('#win_' + id + ' .win-titlebar-text');
      if (tb) tb.textContent = name + ' — Блокнот';
    });
  };

  createWin({ id:id, title:'Блокнот — ' + currentName, icon:'📝', w:500, h:380,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">' +
        '<div class="win-dd-item" onclick="_npOpen_' + id + '()">📂 Открыть...</div>' +
        '<div class="win-dd-item" onclick="_npSave_' + id + '()">💾 Сохранить</div>' +
        '<div class="win-dd-item" onclick="_npSaveAs_' + id + '()">💾 Сохранить как...</div>' +
        '<div class="win-dd-sep"></div>' +
        '<div class="win-dd-item" onclick="_npClose_' + id + '()">Выход</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Правка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="document.getElementById(\'np_ta_' + id + '\').select()">Выделить всё</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="aboutWin(\'notepad\',\'Блокнот\',\'1.0\',\'📝\',\'Простой текстовый редактор ПУКДОС 95\')">О программе</div>' +
      '</div></div>',
    content:
      '<textarea id="np_ta_' + id + '" spellcheck="false" style="width:100%;flex:1;box-sizing:border-box;resize:none;border:none;outline:none;padding:4px;font-family:\'Courier New\',monospace;font-size:13px;background:#fff;min-height:280px">' +
        text.replace(/</g,'&lt;').replace(/>/g,'&gt;') +
      '</textarea>',
    afterOpen: function() {
      var ta = document.getElementById('np_ta_' + id);
      if (ta) ta.addEventListener('input', function() { _npDirty = true; });
      setTimeout(function() {
        var closeBtn = document.querySelector('#win_' + id + ' .win-titlebar-btn[onclick*="closeWin"]');
        if (closeBtn) closeBtn.setAttribute('onclick', '_npClose_' + id + '()');
      }, 10);
    }
  });

  window['_npClose_' + id] = function() {
    if (_npDirty) {
      win95confirm('Сохранить изменения в "' + currentName + '"?',
        function() { window['_npSave_' + id](); closeWin(id); },
        function() { closeWin(id); }
      );
    } else {
      closeWin(id);
    }
  };
}

// ==================== САПЁР ====================
function appMinesweeper() {
  var id = 'minesweeper';
  if (_wins[id]) { focusWin(id); if (_wins[id].min) restoreWin(id); return; }

  var ROWS = 9, COLS = 9, MINES = 10;
  var board, revealed, flagged, gameOver, mineCount;

  function _init() {
    board = []; revealed = []; flagged = [];
    gameOver = false; mineCount = MINES;
    for (var r = 0; r < ROWS; r++) {
      board[r] = []; revealed[r] = []; flagged[r] = [];
      for (var c = 0; c < COLS; c++) {
        board[r][c] = 0; revealed[r][c] = false; flagged[r][c] = false;
      }
    }
    // Place mines
    var placed = 0;
    while (placed < MINES) {
      var r = Math.floor(Math.random() * ROWS);
      var c = Math.floor(Math.random() * COLS);
      if (board[r][c] !== -1) { board[r][c] = -1; placed++; }
    }
    // Count adjacents
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        if (board[r][c] === -1) continue;
        var cnt = 0;
        for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) {
          var nr = r+dr, nc = c+dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc] === -1) cnt++;
        }
        board[r][c] = cnt;
      }
    }
  }

  function _render() {
    var html = '<table style="border-collapse:collapse;margin:0 auto">';
    for (var r = 0; r < ROWS; r++) {
      html += '<tr>';
      for (var c = 0; c < COLS; c++) {
        var cell = '';
        var style = 'width:24px;height:24px;text-align:center;vertical-align:middle;font-size:13px;cursor:pointer;border:2px outset #c0c0c0;background:#c0c0c0;user-select:none;';
        if (revealed[r][c]) {
          style = 'width:24px;height:24px;text-align:center;vertical-align:middle;font-size:12px;border:1px solid #808080;background:#c0c0c0;';
          if (board[r][c] === -1) { cell = '💥'; style += 'background:red;'; }
          else if (board[r][c] > 0) {
            var colors = ['','#0000f0','#007800','#f00000','#000080','#800000','#008080','#000','#808080'];
            cell = '<span style="color:'+colors[board[r][c]]+'">'+board[r][c]+'</span>';
          }
        } else if (flagged[r][c]) {
          cell = '🚩';
        }
        var evts = gameOver ? '' : ('onclick="_msClick('+r+','+c+')" oncontextmenu="_msFlag(event,'+r+','+c+')"');
        html += '<td style="'+style+'" ' + evts + '>' + cell + '</td>';
      }
      html += '</tr>';
    }
    html += '</table>';
    return html;
  }

  window._msClick = function(r, c) {
    if (gameOver || revealed[r][c] || flagged[r][c]) return;
    _reveal(r, c);
    _updateMs();
  };
  window._msFlag = function(e, r, c) {
    e.preventDefault();
    if (gameOver || revealed[r][c]) return;
    flagged[r][c] = !flagged[r][c];
    mineCount += flagged[r][c] ? -1 : 1;
    _updateMs();
  };
  function _reveal(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (revealed[r][c] || flagged[r][c]) return;
    revealed[r][c] = true;
    if (board[r][c] === -1) { gameOver = true; _revealAll(); return; }
    if (board[r][c] === 0) {
      for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) _reveal(r+dr, c+dc);
    }
    // Check win
    var unrev = 0;
    for (var rr = 0; rr < ROWS; rr++) for (var cc = 0; cc < COLS; cc++) if (!revealed[rr][cc]) unrev++;
    if (unrev === MINES) { gameOver = true; win95balloon('🎉 Ты выиграл в Сапёра!', '🏆', 'Сапёр'); }
  }
  function _revealAll() {
    for (var r = 0; r < ROWS; r++) for (var c = 0; c < COLS; c++) if (board[r][c] === -1) revealed[r][c] = true;
    win95msgbox('💥 БУМ! Ты подорвался на пуковой мине!', 'Игра окончена', '💥');
  }
  function _updateMs() {
    var cl = document.getElementById('cl_minesweeper');
    if (!cl) return;
    var body = cl.querySelector('#ms-body');
    if (body) body.innerHTML = _render();
    var cnt = cl.querySelector('#ms-count');
    if (cnt) cnt.textContent = '💣 ' + mineCount;
  }

  _init();
  createWin({ id:id, title:'Сапёр', icon:'💣', w:260, h:320, resize:false,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Игра<div class="win-dd">' +
        '<div class="win-dd-item" onclick="if(window._msReset)_msReset()">Новая игра</div>' +
        '<div class="win-dd-sep"></div>' +
        '<div class="win-dd-item" onclick="closeWin(\'minesweeper\')">Выход</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="aboutWin(\'minesweeper\',\'Сапёр\',\'1.0\',\'💣\',\'Классическая игра в сапёра.<br>ПК-версия с пуковыми минами.\')">О программе</div>' +
      '</div></div>',
    content:
      '<div style="padding:4px;background:#c0c0c0">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;padding:2px 4px;border:2px inset #c0c0c0">' +
          '<span id="ms-count" style="font-family:monospace;font-size:14px;font-weight:bold;color:red">💣 ' + mineCount + '</span>' +
          '<button class="w-btn" onclick="if(window._msReset)_msReset()" style="font-size:16px;padding:2px 8px">😊</button>' +
          '<span style="font-size:14px;color:red">⏱</span>' +
        '</div>' +
        '<div id="ms-body">' + _render() + '</div>' +
      '</div>'
  });

  window._msReset = function() {
    _init();
    _updateMs();
    var cnt = document.querySelector('#cl_minesweeper #ms-count');
    if (cnt) cnt.textContent = '💣 ' + mineCount;
  };
}

// ==================== ПАСЬЯНС (заглушка с пасхалкой) ====================
function appSolitaire() {
  var id = 'solitaire';
  if (_wins[id]) { focusWin(id); if (_wins[id].min) restoreWin(id); return; }

  var _solClicks = 0;
  window._solClick = function() {
    _solClicks++;
    if (_solClicks >= 7) {
      _solClicks = 0;
      win95msgbox('🃏 Поздравляем! Ты нашёл пасхалку в Пасьянсе!\n\nЗа это тебе полагается виртуальный пук. 💨', 'Пасхалка обнаружена!', '🎉');
      playWin95Sound('startup');
    }
  };

  createWin({ id:id, title:'Пасьянс', icon:'🃏', w:580, h:420,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Игра<div class="win-dd">' +
        '<div class="win-dd-item" onclick="closeWin(\'solitaire\')">Выход</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="aboutWin(\'solitaire\',\'Пасьянс\',\'1.0\',\'🃏\',\'Пасьянс Пуковер.<br>Найди пасхалку!\')">О программе</div>' +
      '</div></div>',
    content:
      '<div style="background:#007800;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:350px">' +
        '<div style="color:#fff;font-size:14px;margin-bottom:16px">Кликни на карту 7 раз...</div>' +
        '<div onclick="_solClick()" style="font-size:96px;cursor:pointer;user-select:none;filter:drop-shadow(2px 2px 4px rgba(0,0,0,0.5))" title="Нажми меня">🂠</div>' +
        '<div style="color:#90ee90;font-size:11px;margin-top:12px">Версия: Пасьянс Пуковер 1.0</div>' +
      '</div>'
  });
}

// ==================== ПУК-ЧАТ ====================
function appChat() {
  var id = 'chat';
  if (_wins[id]) { focusWin(id); if (_wins[id].min) restoreWin(id); return; }

  var _chatMsgs = [
    { from: 'PukBot', text: 'Привет! Я PukBot 2000. Задай мне вопрос о пуках! 💨' }
  ];
  var _botReplies = [
    'Интересный вопрос! 💨', 'Пук-пук! 💨💨', 'По данным ПУКПРОМ — это нормально.',
    'Я думаю, тебе нужно больше пуков.', 'Error 404: ответ не найден 💨',
    'Это засекреченная информация ПУКПРОМ.', 'Мой искусственный интеллект говорит: ПУК.',
    'Согласно ГОСТ Р 42069-1995, это запрещено.', '...', 'Запрос принят. Газовый ответ формируется...',
    'Технически это возможно, но зачем? 🤔'
  ];

  function _renderChat() {
    return _chatMsgs.map(function(m) {
      var isMine = m.from === 'Я';
      return '<div style="margin:4px 8px;text-align:' + (isMine ? 'right' : 'left') + '">' +
        '<span style="background:' + (isMine ? '#000080' : '#c0c0c0') + ';color:' + (isMine ? '#fff' : '#000') + ';padding:3px 8px;display:inline-block;font-size:11px;max-width:70%;word-break:break-word">' +
          (isMine ? '' : '<b>' + m.from + ':</b> ') + m.text +
        '</span>' +
      '</div>';
    }).join('');
  }

  window._chatSend = function() {
    var inp = document.getElementById('chat-inp');
    if (!inp || !inp.value.trim()) return;
    _chatMsgs.push({ from: 'Я', text: inp.value.trim() });
    inp.value = '';
    var box = document.getElementById('chat-box');
    if (box) { box.innerHTML = _renderChat(); box.scrollTop = box.scrollHeight; }
    setTimeout(function() {
      _chatMsgs.push({ from: 'PukBot', text: _botReplies[Math.floor(Math.random() * _botReplies.length)] });
      var box2 = document.getElementById('chat-box');
      if (box2) { box2.innerHTML = _renderChat(); box2.scrollTop = box2.scrollHeight; }
    }, 600 + Math.random() * 800);
  };

  createWin({ id:id, title:'Пук-Чат 2000', icon:'💬', w:360, h:340,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd">' +
        '<div class="win-dd-item" onclick="closeWin(\'chat\')">Выход</div>' +
      '</div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd">' +
        '<div class="win-dd-item" onclick="aboutWin(\'chat\',\'Пук-Чат 2000\',\'1.0\',\'💬\',\'Мессенджер ПУКДОС 95.<br>PukBot всегда онлайн!\')">О программе</div>' +
      '</div></div>',
    content:
      '<div style="display:flex;flex-direction:column;height:100%">' +
        '<div id="chat-box" style="flex:1;background:#fff;overflow-y:auto;padding:4px;min-height:220px;border:2px inset #c0c0c0">' +
          _renderChat() +
        '</div>' +
        '<div style="display:flex;gap:4px;padding:4px;border-top:1px solid #808080">' +
          '<input id="chat-inp" type="text" placeholder="Написать сообщение..." style="flex:1;border:2px inset #c0c0c0;padding:3px;font-size:11px" onkeydown="if(event.key===\'Enter\')_chatSend()">' +
          '<button class="w-btn" onclick="_chatSend()">📨</button>' +
        '</div>' +
      '</div>'
  });
}

// ==================== ПУК-ПОЧТА ====================
function appPukMail() {
  var id = 'pukmail';
  if (_wins[id]) { focusWin(id); if (_wins[id].min) restoreWin(id); return; }

  var _inbox = [
    { from: 'support@pukprom.ru', subj: 'Ваш газовый баланс', date: '18.05.1999', body: 'Уважаемый пользователь!\n\nВаш газовый баланс составляет 420 пуков.\nСрок действия: бессрочно.\n\nС уважением,\nПУКПРОМ' },
    { from: 'noreply@pukprom.ru', subj: 'Обновление ПУКДОС 95 SP2', date: '01.01.2000', body: 'Доброго дня!\n\nДоступно обновление ПУКДОС 95 SP2.\nСкачать: ftp://pukprom.ru/updates/sp2\n\nПомните: пук — это не баг, это фича.' },
    { from: 'spam@газпром.ru', subj: 'СРОЧНО: Выиграйте 1000 пуков!', date: '14.02.1999', body: 'Поздравляем! Вы выиграли 1000 бесплатных пуков!\n\nДля получения пришлите нам свой паспорт,\nадрес прописки и запасы газа.\n\n*СПАМ*' },
  ];
  var _sel = 0;

  function _listHtml() {
    return _inbox.map(function(m, i) {
      return '<div onclick="_pmSel('+i+')" style="padding:3px 6px;cursor:pointer;border-bottom:1px solid #d0d0d0;font-size:11px;background:'+(i===_sel?'#000080':'')+ ';color:'+(i===_sel?'#fff':'')+'">' +
        '<b>' + m.from + '</b><br>' +
        '<span>' + m.subj + '</span> <span style="float:right;color:'+(i===_sel?'#ccc':'#808080')+'">' + m.date + '</span>' +
      '</div>';
    }).join('');
  }

  function _bodyHtml() {
    var m = _inbox[_sel];
    return '<div style="padding:8px;font-size:11px;white-space:pre-wrap;font-family:monospace">' +
      '<b>От:</b> ' + m.from + '\n<b>Тема:</b> ' + m.subj + '\n<b>Дата:</b> ' + m.date + '\n\n' + m.body +
    '</div>';
  }

  window._pmSel = function(i) {
    _sel = i;
    var list = document.getElementById('pm-list');
    var body = document.getElementById('pm-body');
    if (list) list.innerHTML = _listHtml();
    if (body) body.innerHTML = _bodyHtml();
  };

  createWin({ id:id, title:'Пук-Почта', icon:'📧', w:540, h:380,
    menu:
      '<div class="win-mi" onclick="toggleMI(this)">Файл<div class="win-dd"><div class="win-dd-item" onclick="closeWin(\'pukmail\')">Выход</div></div></div>' +
      '<div class="win-mi" onclick="toggleMI(this)">Справка<div class="win-dd"><div class="win-dd-item" onclick="aboutWin(\'pukmail\',\'Пук-Почта\',\'1.0\',\'📧\',\'Почтовый клиент ПУКДОС 95\')">О программе</div></div></div>',
    content:
      '<div style="display:flex;flex:1;overflow:hidden">' +
        '<div id="pm-list" style="width:220px;overflow-y:auto;border-right:2px solid #808080;background:#fff">' +
          _listHtml() +
        '</div>' +
        '<div id="pm-body" style="flex:1;overflow-y:auto;background:#fff">' +
          _bodyHtml() +
        '</div>' +
      '</div>'
  });
}

// ==================== DESKTOP ICON CONTEXT MENU ====================
function deskIconCtxMenu(e, appName, label) {
  var games = ['doom', 'minesweeper', 'solitaire'];
  var items;
  if (appName === 'trash') {
    var trashCount = (_vfs.listDir('C:/Корзина/') || []).length;
    items = [
      { title: 'Корзина' + (trashCount > 0 ? ' (' + trashCount + ')' : ' (пусто)') },
      { label: '🗑️ Открыть корзину', fn: function() { openApp('trash'); } },
      { label: '🧹 Очистить корзину', fn: function() {
        if (trashCount === 0) { win95balloon('Корзина уже пуста', '🗑️'); return; }
        if (window._trashEmpty) _trashEmpty();
        else { _vfs.emptyTrash(); win95balloon('Корзина очищена', '🗑️'); }
        // Refresh desktop icon
        var ti = document.querySelector('.desktop-icon[data-app="trash"] .icon-img');
        if (ti) ti.textContent = '🗑️';
      }},
      '-',
      { label: 'ℹ️ Свойства', fn: function() { win95msgbox('Корзина\nОбъектов: ' + trashCount + '\nПуть: C:/Корзина/', 'Свойства корзины', '🗑️'); } }
    ];
  } else if (games.indexOf(appName) !== -1) {
    items = [
      { title: label },
      { label: '▶️ Играть', fn: function() { openApp(appName); } }
    ];
    if (appName === 'minesweeper') {
      items.push({ label: '🔄 Новая игра', fn: function() { openApp('minesweeper'); setTimeout(function(){ if(window._msReset) _msReset(); }, 100); } });
    }
    items.push('-');
    items.push({ label: 'ℹ️ Свойства', fn: function() { win95balloon(label, 'ℹ️'); } });
  } else {
    items = [
      { title: label },
      { label: '📂 Открыть', fn: function() { openApp(appName); } },
      '-',
      { label: '🔗 Создать ярлык', fn: function() { win95balloon('Создание ярлыков недоступно', 'ℹ️'); } },
      { label: '🗑️ Удалить', fn: function() { win95balloon('Системный значок — удаление невозможно', 'ℹ️'); } },
      '-',
      { label: 'ℹ️ Свойства', fn: function() { win95balloon(label, 'ℹ️'); } }
    ];
  }
  showCtxPopup(e.clientX, e.clientY, items);
}

// ==================== START MENU ITEM CONTEXT MENU ====================
function smItemCtx(e, appName, label) {
  e.preventDefault();
  e.stopPropagation();
  showCtxPopup(e.clientX, e.clientY, [
    { title: label },
    { label: '📂 Открыть', fn: function() { openApp(appName); closeSM(); } },
    '-',
    { label: 'ℹ️ Свойства', fn: function() { win95balloon(label, 'ℹ️'); } }
  ]);
}

// ==================== DESKTOP ICON INIT ====================
function initDesktopIcons() {
  var defaults = {
    mypc:        { x: 16,  y: 16 },
    notepad:     { x: 16,  y: 110 },
    paint:       { x: 16,  y: 200 },
    ie:          { x: 16,  y: 290 },
    doom:        { x: 16,  y: 380 },
    trash:       { x: 16,  y: 470 },
    calc:        { x: 16,  y: 560 },
    media:       { x: 16,  y: 650 },
    ctrl:        { x: 110, y: 16 },
    mydocs:      { x: 110, y: 110 },
    minesweeper: { x: 110, y: 200 },
    solitaire:   { x: 110, y: 290 },
    chat:        { x: 110, y: 380 },
    pukmail:     { x: 110, y: 470 },
    pukword:     { x: 204, y: 16 },
    pukexcel:    { x: 204, y: 110 },
    pukprez:     { x: 204, y: 200 }
  };

  var savedPos = {};
  try { savedPos = JSON.parse(localStorage.getItem('pukdos_desktop_icons') || '{}'); } catch(e) {}

  // Update trash desktop icon to reflect VFS contents
  function _updateTrashIcon() {
    var ti = document.querySelector('.desktop-icon[data-app="trash"] .icon-img');
    if (!ti) return;
    var items = _vfs.listDir('C:/Корзина/') || [];
    ti.textContent = items.length > 0 ? '🗑️' : '🗑️'; // same emoji but could swap
    // Update label to show count
    var tl = document.querySelector('.desktop-icon[data-app="trash"] .icon-label');
    if (tl) tl.textContent = items.length > 0 ? 'Корзина (' + items.length + ')' : 'Корзина';
  }
  window._updateTrashIcon = _updateTrashIcon;
  _updateTrashIcon();

  // dragging state: primary icon + offsets for all co-dragged icons
  var dragActive = false;
  var dragStartX = 0, dragStartY = 0;
  var dragGroup = []; // [{ el, startLeft, startTop }]
  var dragMoved = false;

  var icons = document.querySelectorAll('.desktop-icon[data-app]');
  icons.forEach(function(icon) {
    var app = icon.getAttribute('data-app');
    var pos = savedPos[app] || defaults[app] || { x: 16, y: 16 };
    icon.style.left = pos.x + 'px';
    icon.style.top = pos.y + 'px';

    icon.addEventListener('dblclick', function(e) {
      e.stopPropagation();
      openApp(app);
    });

    icon.addEventListener('click', function(e) {
      e.stopPropagation();
      // If Ctrl held, toggle selection without clearing others
      if (e.ctrlKey) {
        icon.classList.toggle('selected');
      } else if (!dragMoved) {
        // Only deselect-and-select if we didn't just finish a drag
        document.querySelectorAll('.desktop-icon.selected').forEach(function(el) { el.classList.remove('selected'); });
        icon.classList.add('selected');
      }
    });

    icon.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      e.stopPropagation();
      // Select this icon if not already in selection
      if (!icon.classList.contains('selected')) {
        document.querySelectorAll('.desktop-icon.selected').forEach(function(el) { el.classList.remove('selected'); });
        icon.classList.add('selected');
      }
      deskIconCtxMenu(e, app, icon.getAttribute('data-label') || app);
    });

    icon.addEventListener('mousedown', function(e) {
      if (e.button !== 0) return;
      // If icon isn't selected yet, select it immediately (deselecting others)
      if (!icon.classList.contains('selected') && !e.ctrlKey) {
        document.querySelectorAll('.desktop-icon.selected').forEach(function(el) { el.classList.remove('selected'); });
        icon.classList.add('selected');
      }
      // Build drag group from all currently selected icons
      dragGroup = [];
      document.querySelectorAll('.desktop-icon.selected').forEach(function(el) {
        dragGroup.push({
          el: el,
          startLeft: parseInt(el.style.left) || 0,
          startTop:  parseInt(el.style.top)  || 0
        });
        el.style.zIndex = 1000;
      });
      dragActive = true;
      dragMoved = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      e.preventDefault();
      e.stopPropagation();
    });
  });

  document.addEventListener('mousemove', function(e) {
    if (!dragActive || dragGroup.length === 0) return;
    var dx = e.clientX - dragStartX;
    var dy = e.clientY - dragStartY;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) dragMoved = true;
    if (!dragMoved) return;
    var desktopEl = document.getElementById('desktop');
    var dr = desktopEl ? desktopEl.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
    dragGroup.forEach(function(item) {
      var nx = Math.max(0, Math.min(item.startLeft + dx, dr.width - item.el.offsetWidth));
      var ny = Math.max(0, Math.min(item.startTop  + dy, dr.height - item.el.offsetHeight - 32));
      item.el.style.left = nx + 'px';
      item.el.style.top  = ny + 'px';
    });
  });

  document.addEventListener('mouseup', function() {
    if (!dragActive) return;
    dragActive = false;
    if (!dragMoved) { dragGroup = []; return; }
    // Save all moved icons to localStorage
    var allPos = {};
    try { allPos = JSON.parse(localStorage.getItem('pukdos_desktop_icons') || '{}'); } catch(ex) {}
    dragGroup.forEach(function(item) {
      item.el.style.zIndex = '';
      var a = item.el.getAttribute('data-app');
      if (a) allPos[a] = { x: parseInt(item.el.style.left), y: parseInt(item.el.style.top) };
    });
    localStorage.setItem('pukdos_desktop_icons', JSON.stringify(allPos));
    dragGroup = [];
  });

  var desktop = document.getElementById('desktop');
  if (desktop) {
    desktop.addEventListener('click', function(e) {
      if (e.target === desktop) {
        document.querySelectorAll('.desktop-icon.selected').forEach(function(el) { el.classList.remove('selected'); });
      }
    });
  }

  // Rubber-band selection on desktop
  (function() {
    if (!desktop) return;
    var rb = null, sx = 0, sy = 0, rbDragging = false;

    desktop.addEventListener('mousedown', function(e) {
      if (e.target !== desktop) return;
      if (e.button !== 0) return;
      rbDragging = true;
      sx = e.clientX; sy = e.clientY;
      rb = document.createElement('div');
      rb.style.cssText = 'position:fixed;border:1px dotted #fff;background:rgba(0,0,128,0.2);pointer-events:none;z-index:9000;';
      rb.style.left = sx + 'px'; rb.style.top = sy + 'px';
      rb.style.width = '0'; rb.style.height = '0';
      document.body.appendChild(rb);
      e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
      if (!rbDragging || !rb) return;
      var x = Math.min(e.clientX, sx), y = Math.min(e.clientY, sy);
      var w = Math.abs(e.clientX - sx), h = Math.abs(e.clientY - sy);
      rb.style.left = x + 'px'; rb.style.top = y + 'px';
      rb.style.width = w + 'px'; rb.style.height = h + 'px';
      var rbRect = { left: x, right: x+w, top: y, bottom: y+h };
      document.querySelectorAll('.desktop-icon').forEach(function(icon) {
        var r = icon.getBoundingClientRect();
        var inside = r.left < rbRect.right && r.right > rbRect.left && r.top < rbRect.bottom && r.bottom > rbRect.top;
        icon.classList.toggle('selected', inside);
      });
    });

    document.addEventListener('mouseup', function() {
      if (!rbDragging) return;
      rbDragging = false;
      if (rb) { rb.remove(); rb = null; }
    });
  })();
}