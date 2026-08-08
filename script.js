// Global UI enhancements for the site
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    // Typewriter heading: type real characters so the caret always sits
    // exactly at the end of the text, regardless of font metrics.
    const heading = document.querySelector('.typing-text');
    const typedTextEl = heading ? heading.querySelector('.typed-text') : null;
    const caretEl = heading ? heading.querySelector('.caret') : null;
    const fullText = "Hi, I'm Samuel!";
    const typeSpeed = 90; // ms per character
    const blinkAfterTyping = 2000; // keep blinking this long after typing ends
    const fadeDelay = 50; // small delay before starting the opacity transition

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
              // separate frame so the opacity transition actually animates
              setTimeout(() => caretEl.classList.add('hidden'), fadeDelay);
            }, blinkAfterTyping);
          }
        })();
      }
    }

    // Image swap: flash to second image briefly every few seconds
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
      // start first cycle after cycleDelay so initial load isn't abrupt
      timeoutId = setTimeout(doFlash, cycleDelay);

      // cleanup on pagehide (navigation away)
      window.addEventListener('pagehide', () => clearTimeout(timeoutId));
    }

    // Respect reduced motion by disabling heavy CSS animations if requested
    if (prefersReduced) {
      document.documentElement.classList.add('reduced-motion');
    }
  });
})();