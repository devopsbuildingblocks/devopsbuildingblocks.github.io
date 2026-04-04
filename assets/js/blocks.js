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

  // Site-wide background — small, slow, very subtle
  var siteBg = document.querySelector('.site-bg-blocks');
  if (siteBg) {
    spawnBlocks(siteBg, 20, {
      minSize: 8,  maxSize: 28,
      minDur:  28, maxDur:  50,
      drift:   60,
      minOp:   0.06, maxOp: 0.12,
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
