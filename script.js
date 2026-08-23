(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {

    const heading = document.querySelector('.typing-text');
    const typedTextEl = heading ? heading.querySelector('.typed-text') : null;
    const caretEl = heading ? heading.querySelector('.caret') : null;
    const fullText = "Hi, I'm Samuel!";
    const typeSpeed = 90; 
    const blinkAfterTyping = 2000; 
    const fadeDelay = 50; // delay before starting the opacity transition

    if (typedTextEl && caretEl) {
      if (prefersReduced) {
        typedTextEl.textContent = fullText;
        caretEl.classList.add('done', 'hidden');
      } else {
        let i = 0;
        (function typeStep() {
          if (i < fullText.length) {
            typedTextEl.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeStep, typeSpeed);
          } else {
            setTimeout(() => {
              caretEl.classList.add('done');
              setTimeout(() => caretEl.classList.add('hidden'), fadeDelay);
            }, blinkAfterTyping);
          }
        })();
      }
    }

    const heroPhoto = document.getElementById('hero-photo');
    const firstImage = heroPhoto ? heroPhoto.getAttribute('src') : 'stickfigure.jpg';
    const secondImage = 'stickfigure2.jpg';
    const cycleDelay = 1000; // wait between cycles
    const flashDuration = 250; // how long the alternate image shows

    if (heroPhoto && !prefersReduced) {
      let timeoutId;
      function doFlash() {
        heroPhoto.src = secondImage;
        setTimeout(() => {
          heroPhoto.src = firstImage;
          timeoutId = setTimeout(doFlash, cycleDelay);
        }, flashDuration);
      }

      timeoutId = setTimeout(doFlash, cycleDelay);

      window.addEventListener('pagehide', () => clearTimeout(timeoutId));
    }

    if (prefersReduced) {
      document.documentElement.classList.add('reduced-motion');
    }
  });
})();