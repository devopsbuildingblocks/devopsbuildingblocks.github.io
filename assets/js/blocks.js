/* Sidebar section links — prevent <details> toggle when navigating */
(function () {
  function initSectionLinks() {
    document.querySelectorAll('.docs-tree-section-link').forEach(function (link) {
      link.addEventListener('click', function (e) { e.stopPropagation(); });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectionLinks);
  } else {
    initSectionLinks();
  }
})();

/* Copy buttons for code blocks */
(function () {
  function initCopyButtons() {
    document.querySelectorAll('.highlight').forEach(function (block) {
      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.textContent = 'copy';

      btn.addEventListener('click', function () {
        var code = block.querySelector('code');
        if (!code) return;
        var text = code.innerText;
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = 'copied!';
          btn.classList.add('copy-btn--done');
          setTimeout(function () {
            btn.textContent = 'copy';
            btn.classList.remove('copy-btn--done');
          }, 2000);
        }).catch(function () {
          /* fallback for older browsers */
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.cssText = 'position:fixed;opacity:0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          btn.textContent = 'copied!';
          btn.classList.add('copy-btn--done');
          setTimeout(function () {
            btn.textContent = 'copy';
            btn.classList.remove('copy-btn--done');
          }, 2000);
        });
      });

      block.appendChild(btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  } else {
    initCopyButtons();
  }
})();

/* Theme toggle */
(function () {
  var MOON = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  var SUN  = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';

  function applyIcon(btn, theme) {
    btn.innerHTML = theme === 'dark' ? SUN : MOON;
  }

  function init() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyIcon(btn, current);
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      applyIcon(btn, next);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* Floating block background animation */
(function () {
  var COLORS = ['#E03B2A', '#2B5AB7', '#F5C518'];

  function spawnBlocks(container, count, opts) {
    for (var i = 0; i < count; i++) {
      var el       = document.createElement('span');
      el.className = 'float-block';

      var size     = opts.minSize + Math.random() * (opts.maxSize - opts.minSize);
      var color    = COLORS[i % 3];
      var startX   = Math.random() * 96;
      var duration = opts.minDur + Math.random() * (opts.maxDur - opts.minDur);
      var delay    = -(Math.random() * duration);
      var drift    = (Math.random() - 0.5) * opts.drift;
      var rotStart = Math.random() * 360;
      var rotEnd   = rotStart + (Math.random() < 0.5 ? 1 : -1) * (15 + Math.random() * 55);
      var opacity  = opts.minOp + Math.random() * (opts.maxOp - opts.minOp);

      el.style.cssText = [
        '--w:'    + size      + 'px',
        '--c:'    + color,
        '--x:'    + startX    + '%',
        '--dur:'  + duration  + 's',
        '--del:'  + delay     + 's',
        '--dx:'   + drift     + 'px',
        '--rs:'   + rotStart  + 'deg',
        '--re:'   + rotEnd    + 'deg',
        '--op:'   + opacity,
      ].join(';');

      container.appendChild(el);
    }
  }

  // Site-wide background
  var siteBg = document.querySelector('.site-bg-blocks');
  if (siteBg) {
    spawnBlocks(siteBg, 35, {
      minSize: 10, maxSize: 40,
      minDur:  20, maxDur:  45,
      drift:   80,
      minOp:   0.18, maxOp: 0.35,
    });
  }

  // Hero — larger, faster, more dramatic
  var heroBg = document.querySelector('.hero-blocks');
  if (heroBg) {
    spawnBlocks(heroBg, 24, {
      minSize: 18, maxSize: 64,
      minDur:  12, maxDur:  22,
      drift:   130,
      minOp:   0.20, maxOp: 0.38,
    });
  }
})();
