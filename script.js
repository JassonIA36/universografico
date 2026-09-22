
/* Star field */
(function () {
  var field = document.getElementById('starField');
  if (!field) return;
  var count = window.innerWidth < 600 ? 34 : 60;
  var html = '';
  for (var i = 0; i < count; i++) {
    var size = (Math.random() * 1.8 + 1).toFixed(1);
    var top = (Math.random() * 100).toFixed(2);
    var left = (Math.random() * 100).toFixed(2);
    var dur = (Math.random() * 3 + 2).toFixed(2);
    var delay = (Math.random() * 4).toFixed(2);
    html += '<span style="width:' + size + 'px;height:' + size + 'px;top:' + top + '%;left:' + left + '%;animation-duration:' + dur + 's;animation-delay:' + delay + 's;"></span>';
  }
  field.innerHTML = html;
})();

/* Scroll reveal */
(function () {
  var targets = document.querySelectorAll('.reveal, .reveal-group');
  var steps = document.querySelectorAll('.step');
  var all = Array.prototype.slice.call(targets).concat(Array.prototype.slice.call(steps));
  if (!('IntersectionObserver' in window)) {
    all.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  all.forEach(function (el) { io.observe(el); });
})();

/* Cursor-follow glow orb (desktop only) */
(function () {
  var orb = document.getElementById('cursorOrb');
  if (!orb || window.matchMedia('(pointer: coarse)').matches) return;
  var raf = null, tx = 0, ty = 0;
  window.addEventListener('mousemove', function (e) {
    tx = e.clientX; ty = e.clientY;
    orb.style.opacity = '1';
    if (!raf) raf = requestAnimationFrame(function () {
      orb.style.transform = 'translate(' + tx + 'px,' + ty + 'px) translate(-50%,-50%)';
      raf = null;
    });
  });
  window.addEventListener('mouseleave', function () { orb.style.opacity = '0'; });
})();

/* Rotating tag in CTA band */
(function () {
  var el = document.getElementById('tagCycle');
  if (!el) return;
  var items = ['🎨 Logo', '🖥️ Landing page', '📱 App', '🧭 Identidad de marca', '✨ Rediseño'];
  var i = 0;
  setInterval(function () {
    i = (i + 1) % items.length;
    el.style.opacity = '0';
    setTimeout(function () { el.textContent = items[i]; el.style.opacity = '1'; }, 250);
  }, 2200);
  el.style.transition = 'opacity .25s ease';
})();
