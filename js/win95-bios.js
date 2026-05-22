
// ==================== BIOS ====================
(function() {
  var biosEl = document.getElementById('bios');
  var biosOut = document.getElementById('bios-out');
  if (!biosEl || !biosOut) { startBootScreen(); return; }

  // Theme support — other OS pages load their own theme before this script
  var _biosTheme = window.W95_THEME || {};
  var _biosName      = _biosTheme.biosName      || 'ПУКПРОМ BIOS v4.20.69';
  var _biosLogo      = _biosTheme.biosLogo      || 'PUKPROM SYSTEMS INC.';
  var _biosTagline   = _biosTheme.biosTagline   || '"Технологии газового превосходства с 1993 года"';
  var _biosProcessor = _biosTheme.biosProcessor || 'Pentium Puk(tm) @ 420 MHz';
  var _biosHDD       = _biosTheme.biosHDD       || 'ПУКПРОМ HDD 420MB';
  var _biosCDROM     = _biosTheme.biosCDROM     || 'CD-ROM ПУКПРОМ x24';
  var _osName        = _biosTheme.bootTitle     || 'ПУКДОС 95';
  var _manufacturer  = _biosTheme.manufacturer  || 'PukProm Inc.';

  var ASCII_LOGO = [
    ' ______  __  __ __  __ ____  ____  ____  __  __',
    ' |  _ \\ | | | || |/ /|  _ \\|  _ \\/ __ \\|  \\/  |',
    ' | |_) || | | ||   / | |_) | |_) | |  | | |\\/| |',
    ' |  __/ | |_| ||   \\ |  __/|  _ <| |__| | |  | |',
    ' |_|     \\___/ |_|\\_\\|_|   |_| \\_\\\\____/|_|  |_|',
    '',
    '     ' + _biosLogo,
    '   ' + _biosTagline,
  ];

  var BIOS_LINES = [
    { text: '', delay: 0 },
    { text: _biosName + ', Copyright (C) 1993-' + new Date().getFullYear() + ' ' + _manufacturer, delay: 60, color: '#fff' },
    { text: _biosLogo, delay: 30, color: '#fff' },
    { text: '', delay: 30 },
    { text: 'CPU: ' + _biosProcessor, delay: 80 },
    { text: 'Coprocessor: Enabled', delay: 60 },
    { text: 'CPU CACHE: Enabled', delay: 50 },
    { text: '', delay: 30 },
    { text: 'Memory Test: ', delay: 100, noNewline: true },
    { text: '65536K OK', delay: 800, append: true, color: '#0f0' },
    { text: '', delay: 20 },
    { text: 'Extended Memory: 65536K', delay: 60 },
    { text: 'Reserved Memory: 384K', delay: 60 },
    { text: '', delay: 40 },
    { text: 'BIOS-e820: Int 15h AX=E820h map has 6 entries', delay: 70 },
    { text: 'Detecting Primary Master ... ' + _biosHDD, delay: 200 },
    { text: 'Detecting Primary Slave  ... None', delay: 150 },
    { text: 'Detecting Secondary      ... ' + _biosCDROM, delay: 150 },
    { text: '', delay: 40 },
    { text: 'PCI device listing...', delay: 80 },
    { text: '  Bus 0, device 0: VGA compatible controller', delay: 50 },
    { text: '  Bus 0, device 1: Audio controller', delay: 50 },
    { text: '  Bus 0, device 2: Modem', delay: 50 },
    { text: '', delay: 40 },
    { text: 'Checking NVRAM...', delay: 120 },
    { text: 'NVRAM OK', delay: 80 },
    { text: '', delay: 50 },
    { text: 'Press DEL to enter SETUP, F8 for Boot Menu', delay: 0, color: '#ff0' },
    { text: '', delay: 30 },
    { text: 'Starting ' + _osName + '...', delay: 1200, color: '#0ff' },
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
      if (_biosSet && _biosSet.supervisorPass && _biosSet.supervisorPassEnabled) {
        showBiosEntryPasswordPrompt(function(entered) {
          if (entered !== _biosSet.supervisorPass) {
            biosSetupActive = false;
            var denied = document.createElement('div');
            denied.style.color = '#f00';
            denied.textContent = 'Access Denied.';
            biosOut.appendChild(denied);
            scheduleBiosEnd();
            return;
          }
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
        });
        return;
      }
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
    } else if (e.key === 'F8' && !biosSetupActive && !biosFinished) {
      e.preventDefault();
      document.removeEventListener('keydown', biosKeyHandler);
      showBootMenu();
    }
  }

  function showBiosEntryPasswordPrompt(callback) {
    // Build a BIOS-style pseudo-graphic password box over the POST screen
    var passDiv = document.createElement('div');
    passDiv.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:9999998;font-family:"Courier New",monospace;font-size:13px;color:#aaa;';
    passDiv.innerHTML =
      '<div style="background:#00007b;color:#aaa;">' +
        '<div>┌──────────────────────────────────────────┐</div>' +
        '<div>│  <span style="background:#aaa;color:#00007b;padding:0 4px;font-weight:bold">BIOS Security</span>                            │</div>' +
        '<div>├──────────────────────────────────────────┤</div>' +
        '<div>│                                          │</div>' +
        '<div>│  Supervisor Password is required.        │</div>' +
        '<div>│                                          │</div>' +
        '<div style="display:flex;align-items:center">│  Password: <input type="password" id="bios-entry-pass" style="width:220px;background:#000080;border:none;border-bottom:1px solid #0ff;color:#0ff;font-family:\'Courier New\',monospace;font-size:13px;padding:1px 4px;outline:none;">  │</div>' +
        '<div>│                                          │</div>' +
        '<div>│  Press ENTER to confirm, ESC to cancel   │</div>' +
        '<div>│                                          │</div>' +
        '<div>└──────────────────────────────────────────┘</div>' +
      '</div>';
    document.body.appendChild(passDiv);
    var inp = passDiv.querySelector('#bios-entry-pass');
    if (inp) inp.focus();
    inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var entered = inp.value;
        passDiv.remove();
        callback(entered);
        e.preventDefault();
        e.stopPropagation();
      } else if (e.key === 'Escape') {
        passDiv.remove();
        callback('');
        e.preventDefault();
        e.stopPropagation();
      }
      e.stopPropagation();
    });
  }

  // ---- F8 Boot Menu ----
  var bootMenuActive = false;

  function showBootMenu() {
    if (bootMenuActive) return;
    bootMenuActive = true;
    clearTimeout(biosAutoTimer);

    var osList = [
      { name: 'ПУКДОС 95',  icon: '💨', url: (function() {
          // Determine relative path back to root
          var p = window.location.pathname;
          if (p.indexOf('/newin/') !== -1 || p.indexOf('/win98/') !== -1 || p.indexOf('/win31/') !== -1) return '../win95.html';
          return 'win95.html';
        })() },
      { name: 'NeWIN 95',   icon: '🪟', url: (function() {
          var p = window.location.pathname;
          if (p.indexOf('/newin/') !== -1) return '.';
          return 'newin/';
        })() },
      { name: 'Windows 98', icon: '🪟', url: (function() {
          var p = window.location.pathname;
          if (p.indexOf('/win98/') !== -1) return '.';
          return 'win98/';
        })() },
      { name: 'Windows 3.1', icon: '🪟', url: (function() {
          var p = window.location.pathname;
          if (p.indexOf('/win31/') !== -1) return '.';
          return 'win31/';
        })() },
    ];

    var selIdx = 0;

    var overlay = document.createElement('div');
    overlay.id = 'bios-boot-menu';
    overlay.style.cssText = [
      'position:fixed;inset:0;background:rgba(0,0,0,0.85)',
      'display:flex;align-items:center;justify-content:center',
      'z-index:9999999;font-family:"Courier New",monospace;font-size:13px;color:#aaa'
    ].join(';');

    var box = document.createElement('div');
    box.style.cssText = 'background:#00007b;color:#aaa;min-width:380px;padding:0;border:1px solid #aaa';

    function renderMenu() {
      box.innerHTML =
        '<div style="background:#aaa;color:#00007b;font-weight:bold;padding:2px 8px;text-align:center">Boot Manager</div>' +
        '<div style="padding:12px 16px;">' +
          '<div style="margin-bottom:8px;color:#fff">Select operating system to start:</div>' +
          osList.map(function(os, i) {
            var sel = i === selIdx;
            return '<div style="padding:3px 8px;cursor:pointer;' +
              (sel ? 'background:#aaa;color:#00007b;font-weight:bold' : '') + '">' +
              os.icon + '  ' + os.name +
              '</div>';
          }).join('') +
          '<div style="margin-top:10px;color:#aaa;font-size:11px">↑↓ — выбор   Enter — загрузить   ESC — отмена</div>' +
        '</div>';

      // Re-attach click handlers
      var items = box.querySelectorAll('div[style*="cursor:pointer"]');
      items.forEach(function(el, i) {
        el.addEventListener('click', function() {
          selIdx = i;
          renderMenu();
          setTimeout(function() { launchSelected(); }, 200);
        });
      });
    }

    function launchSelected() {
      window.location.href = osList[selIdx].url;
    }

    renderMenu();
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    function menuKeyHandler(e) {
      if (e.key === 'ArrowUp') {
        selIdx = (selIdx - 1 + osList.length) % osList.length;
        renderMenu();
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        selIdx = (selIdx + 1) % osList.length;
        renderMenu();
        e.preventDefault();
      } else if (e.key === 'Enter') {
        document.removeEventListener('keydown', menuKeyHandler);
        launchSelected();
        e.preventDefault();
      } else if (e.key === 'Escape') {
        document.removeEventListener('keydown', menuKeyHandler);
        overlay.remove();
        bootMenuActive = false;
        scheduleBiosEnd();
        e.preventDefault();
      }
    }
    document.addEventListener('keydown', menuKeyHandler);
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
      { label: 'Supervisor Pass', value: '', action: 'supervisor_pass', editable: true },
      { label: 'Supervisor Enabled', value: 'Disabled', editable: true, options: ['Disabled','Enabled'] },
      { label: 'User Password', value: '', action: 'user_pass', editable: true },
      { label: 'User Pass Enabled', value: 'Disabled', editable: true, options: ['Disabled','Enabled'] },
      { label: 'Gas Lock', value: 'Off', editable: true, options: ['On','Off'] },
    ],
    Exit: [
      { label: 'Save & Exit Setup',      value: '', action: 'save', editable: true },
      { label: 'Exit Without Saving',    value: '', action: 'nosave', editable: true },
      { label: 'Load Optimal Puk Defaults', value: '', action: 'defaults', editable: true },
    ],
  };

  // Load saved BIOS settings into pages
  try {
    var bs = _biosSet;
    function _bset(page, lbl, val) { var it=pages[page].find(function(i){return i.label===lbl;}); if(it) it.value=val; }
    _bset('Main',     'Puk Mode',         bs.pukMode          || 'ENABLED');
    _bset('Advanced', 'CPU Cache',        bs.cpuCache         || 'Enabled');
    _bset('Advanced', 'Fart Coprocessor', bs.fartCoprocessor  || 'Enabled');
    _bset('Advanced', 'Gas Compression',  bs.gasCompression   || 'Auto');
    _bset('Advanced', 'Turbo Mode',       bs.turboMode        || 'MAXIMUM PUK');
    _bset('Boot',     'Quick POST',       bs.quickPost ? 'Enabled' : 'Disabled');
    _bset('Boot',     '1st Boot Device',  bs.bootDevice1      || 'Floppy (💾)');
    _bset('Security', 'Gas Lock',         bs.gasLock          || 'Off');
    _bset('Security', 'Supervisor Enabled', bs.supervisorPassEnabled ? 'Enabled' : 'Disabled');
    _bset('Security', 'User Pass Enabled',  bs.userPassEnabled ? 'Enabled' : 'Disabled');
    var spItem = pages['Security'].find(function(i){ return i.label === 'Supervisor Pass'; });
    if (spItem) spItem.value = bs.supervisorPass ? '****' : '(не задан)';
    var upItem = pages['Security'].find(function(i){ return i.label === 'User Password'; });
    if (upItem) upItem.value = bs.userPass ? '****' : '(не задан)';
  } catch(e) {}

  var rowIdx = 0;

  function showBiosPasswordInput(title, currentValue, callback) {
    var sub = document.createElement('div');
    sub.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:2;';
    // Pseudo-graphic BIOS-style box using box-drawing chars
    var label = title + (currentValue ? ' [задан]' : ' [не задан]');
    sub.innerHTML =
      '<div style="background:#00007b;color:#aaa;font-family:\'Courier New\',monospace;font-size:13px;min-width:360px;border:none;">' +
        // top border
        '<div style="color:#aaa">┌──────────────────────────────────────────┐</div>' +
        '<div style="color:#aaa">│  <span style="background:#aaa;color:#00007b;padding:0 4px;font-weight:bold">' + label + '</span>               │</div>' +
        '<div style="color:#aaa">├──────────────────────────────────────────┤</div>' +
        '<div style="color:#aaa">│                                          │</div>' +
        '<div style="color:#aaa">│  Enter Password:                         │</div>' +
        '<div style="color:#aaa;display:flex;align-items:center">│  <input type="password" id="bios-pass-sub-input" ' +
          'style="width:280px;background:#000080;border:none;border-bottom:1px solid #0ff;color:#0ff;font-family:\'Courier New\',monospace;font-size:13px;padding:1px 4px;outline:none;" ' +
          'placeholder="">                    │</div>' +
        '<div style="color:#aaa">│                                          │</div>' +
        '<div style="color:#aaa">│  (Leave empty to remove password)        │</div>' +
        '<div style="color:#aaa">│                                          │</div>' +
        '<div style="color:#aaa;display:flex;gap:0">│    <span id="bios-pass-sub-ok" style="background:#aaa;color:#00007b;padding:0 8px;cursor:pointer;font-weight:bold;border:1px solid #fff"> OK </span>   <span id="bios-pass-sub-cancel" style="background:#00007b;color:#aaa;padding:0 8px;cursor:pointer;border:1px solid #aaa"> Cancel </span>                      │</div>' +
        '<div style="color:#aaa">└──────────────────────────────────────────┘</div>' +
      '</div>';
    overlay.appendChild(sub);
    var inp = sub.querySelector('#bios-pass-sub-input');
    if (inp) inp.focus();

    function done(val) {
      sub.remove();
      document.addEventListener('keydown', onKey);
      callback(val);
    }
    document.removeEventListener('keydown', onKey);
    sub.querySelector('#bios-pass-sub-ok').addEventListener('click', function() {
      done(inp ? inp.value : null);
    });
    sub.querySelector('#bios-pass-sub-cancel').addEventListener('click', function() {
      done(null);
    });
    sub.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { done(inp ? inp.value : null); e.preventDefault(); }
      else if (e.key === 'Escape') { done(null); e.preventDefault(); }
      e.stopPropagation();
    });
  }

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
      if (item.action === 'supervisor_pass') {
        showBiosPasswordInput('Supervisor Password', _biosSet.supervisorPass, function(val) {
          if (val !== null) {
            _biosSet.supervisorPass = val;
            page[rowIdx].value = val ? '****' : '(не задан)';
            render();
          }
        });
        return;
      }
      if (item.action === 'user_pass') {
        showBiosPasswordInput('User Password', _biosSet.userPass, function(val) {
          if (val !== null) {
            _biosSet.userPass = val;
            page[rowIdx].value = val ? '****' : '(не задан)';
            render();
          }
        });
        return;
      }
      if (item.action === 'save') {
        applyBiosSettings(pages);
        biosSaveRestart(cleanup);
      } else if (item.action === 'nosave' || item.action === 'defaults') {
        if (item.action === 'defaults') resetBiosDefaults(pages);
        cleanup();
      } else if (item.options) {
        var idx = item.options.indexOf(item.value);
        item.value = item.options[(idx + 1) % item.options.length];
        render();
      }
    }
    else if (e.key === 'F10') { applyBiosSettings(pages); biosSaveRestart(cleanup); }
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

function biosSaveRestart(cleanupFn) {
  cleanupFn();
  var rs = document.createElement('div');
  rs.style.cssText = 'position:fixed;inset:0;background:#000;color:#c0c0c0;font-family:"Courier New",monospace;font-size:14px;z-index:99999999;display:flex;flex-direction:column;align-items:center;justify-content:center;';
  rs.innerHTML = '<div style="font-size:32px;margin-bottom:16px">⚙️</div>' +
    '<div style="color:#fff;font-size:16px;margin-bottom:8px">Сохранение настроек BIOS...</div>' +
    '<div style="color:#aaa;font-size:12px;margin-bottom:24px">ПУКПРОМ BIOS v4.20.69</div>' +
    '<div style="color:#ff0">Система перезагружается...</div>' +
    '<div style="color:#888;font-size:11px;margin-top:12px">Please wait...</div>';
  document.body.appendChild(rs);
  setTimeout(function() { location.reload(); }, 2500);
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
  gasLock: 'Off',
  supervisorPass: '',
  supervisorPassEnabled: false,
  userPass: '',
  userPassEnabled: false
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
    _biosSet.supervisorPassEnabled = pages.Security.find(function(i){ return i.label==='Supervisor Enabled'; }).value === 'Enabled';
    _biosSet.userPassEnabled  = pages.Security.find(function(i){ return i.label==='User Pass Enabled'; }).value === 'Enabled';
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

