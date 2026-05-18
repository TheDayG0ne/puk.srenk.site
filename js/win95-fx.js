// ==================== SECRET ACCESS: KONAMI CODE ====================
(function() {
  var seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  var pos = 0;
  document.addEventListener('keydown', function(e) {
    // Don't intercept when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === seq[pos]) {
      pos++;
      if (pos === seq.length) {
        pos = 0;
        win95balloon('↑↑↓↓←→←→BA — Доступ открыт!', '🔓', 'Konami Code');
        setTimeout(function() { appDevMenu(); }, 600);
      }
    } else {
      pos = (e.key === seq[0]) ? 1 : 0;
    }
  });
  // Also: console hint
  console.log('%c🔧 ПУКДОС 95 Dev Mode', 'color:#000080;font-size:16px;font-weight:bold');
  console.log('%cВведите Konami Code (↑↑↓↓←→←→BA) или кликните 5 раз на "ООО ПУКПРОМ" в Сведениях о системе', 'color:#808080;font-size:12px');
})();

// ==================== CURSOR TRAILS ====================
var _trailHandler = null;
function _applyCursorTrails(enabled) {
  if (_trailHandler) {
    document.removeEventListener('mousemove', _trailHandler);
    _trailHandler = null;
    document.querySelectorAll('.puk-trail').forEach(function(el){ el.remove(); });
  }
  if (!enabled) return;
  // Throttle: lower mouse speed = more frequent trails (denser)
  var speed = (_cpSet && _cpSet.mouse) ? _cpSet.mouse.speed : 5;
  var throttleMs = Math.max(15, 60 - speed * 5); // speed 1→55ms, speed 10→10ms
  var _trailThrottle = 0;
  _trailHandler = function(e) {
    var now = Date.now();
    if (now - _trailThrottle < throttleMs) return;
    _trailThrottle = now;
    var t = document.createElement('span');
    t.className = 'puk-trail';
    t.textContent = '💨';
    t.style.left = (e.clientX - 4) + 'px';
    t.style.top  = (e.clientY - 4) + 'px';
    document.body.appendChild(t);
    setTimeout(function(){ t.remove(); }, 500);
  };
  document.addEventListener('mousemove', _trailHandler);
}
// Re-apply trails on page init if saved
(function(){
  if (typeof _cpSet !== 'undefined' && _cpSet.mouse && _cpSet.mouse.trails) {
    _applyCursorTrails(true);
  }
})();
