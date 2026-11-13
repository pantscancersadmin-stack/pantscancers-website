/* Pants Cancers (pantscancer.co.uk) - Charity No. 1147098
   Built & maintained by Simply Computerz (https://simplycomputerz.co.uk) */

'use strict';

/* ================================================
   1. MOBILE NAVIGATION TOGGLE
   ================================================ */
(function initMobileNav() {
  const btn  = document.getElementById('hamburger-btn');
  const menu = document.getElementById('mobile-menu');

  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    menu.hidden = isOpen;
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      btn.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      btn.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      btn.focus();
    }
  });
})();


/* ================================================
   2. STICKY HEADER SHADOW ON SCROLL
   ================================================ */
(function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 2px 20px hsla(220, 30%, 5%, 0.10)';
    } else {
      header.style.boxShadow = '';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ================================================
   3. DYNAMIC FOOTER YEAR
   ================================================ */
(function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ================================================
   4. DYNAMIC "YEARS RUNNING" STAT
   ================================================ */
(function initYearsRunning() {
  const el = document.getElementById('years-running');
  if (!el) return;
  const founded = 2007;
  const current = new Date().getFullYear();
  el.textContent = (current - founded) + '+';
})();


/* ================================================
   5. INTERSECTION OBSERVER — FADE-IN ANIMATIONS
   ================================================ */
(function initScrollAnimations() {
  // Guard: skip if reduced motion is preferred
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Add fade-in-up to cards and key content blocks
  const targets = document.querySelectorAll(
    '.cancer-card, .cta-card, .stat-item, .about-text, .about-image, .rehab-cta-text, .rehab-cta-image, .events-placeholder'
  );

  targets.forEach(el => el.classList.add('fade-in-up'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  targets.forEach(el => observer.observe(el));
})();


/* ================================================
   6. SMOOTH SCROLL FOR INTERNAL ANCHOR LINKS
   ================================================ */
(function initSmoothScroll() {
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href').slice(1);
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Move focus for accessibility
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
})();


/* ================================================
   7. ACTIVE NAV LINK HIGHLIGHTING
   ================================================ */
(function initActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.primary-nav a, .mobile-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Exact match for root, startsWith for others
    const isActive = href === '/'
      ? currentPath === '/'
      : currentPath.startsWith(href) && href !== '/';

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
})();


/* ================================================
   8. IMAGE LAZY LOADING FALLBACK
   (browsers that don't support loading="lazy")
   ================================================ */
(function initLazyImageFallback() {
  if ('loading' in HTMLImageElement.prototype) return; // native support

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (!lazyImages.length) return;

  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        imgObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imgObserver.observe(img));
})();




/* ================================================
   9. WASHING LINE ANIMATION (CONTAINED IN TOP BAR)
   ================================================ */
(function initWashingLine() {
  const topBar = document.querySelector('.top-bar') || document.querySelector('.site-header');
  if (!topBar) return;

  const washingLineHTML = `
  <div id="washing-line" style="position: absolute; top: 0; left: 0; width: 100%; height: 56px; z-index: 1; pointer-events: none; overflow: visible;">
    <style>
      #washing-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 56px;
        z-index: 1;
        pointer-events: none !important;
        overflow: visible !important;
      }
      #washing-line svg {
        width: 100%;
        height: 100%;
        overflow: visible !important;
        pointer-events: none !important;
      }
      #washing-line svg * {
        pointer-events: none !important;
      }
      #washing-line .swinging-pant {
        pointer-events: auto !important;
        cursor: pointer;
        filter: drop-shadow(0 0 2px rgba(255,255,255,0.95)) drop-shadow(0 0 1px rgba(255,255,255,0.9));
      }
      @keyframes pantSwing {
        0% { transform: rotate(4deg); }
        50% { transform: rotate(-8deg); }
        100% { transform: rotate(4deg); }
      }
      .swinging-pant {
        animation: pantSwing 3.5s ease-in-out infinite;
      }
      @keyframes floatCloud1 {
        0% { transform: translateX(-400px); }
        100% { transform: translateX(2400px); }
      }
      @keyframes floatCloud2 {
        0% { transform: translateX(-800px); }
        100% { transform: translateX(2400px); }
      }
      .cloud-1 { animation: floatCloud1 45s linear infinite; }
      .cloud-2 { animation: floatCloud2 60s linear infinite; }
      
      @keyframes pantFall {
        0%, 80% { transform: translateY(0) rotate(0deg); opacity: 1; }
        87% { transform: translateY(90px) rotate(45deg); opacity: 0; }
        90% { transform: translateY(-30px) rotate(0deg); opacity: 0; }
        100% { transform: translateY(0) rotate(0deg); opacity: 1; }
      }
      .falling-wrapper {
        animation: pantFall 12s cubic-bezier(0.55, 0.085, 0.68, 0.53) infinite;
        transform-origin: center top;
      }
      .falling-wrapper-2 { animation-duration: 19s; animation-delay: 6s; }
      @keyframes gust {
        0%, 100% { transform: skewX(0deg); }
        20% { transform: skewX(-8deg); }
        35% { transform: skewX(4deg); }
        60% { transform: skewX(-12deg); }
        75% { transform: skewX(3deg); }
      }
      @keyframes windSwirl {
        0% { transform: translateX(-200px); opacity: 0; }
        10% { opacity: 0.5; }
        50% { opacity: 0.2; }
        90% { opacity: 0.5; }
        100% { transform: translateX(2200px); opacity: 0; }
      }
      .wind-line { animation: windSwirl 7s linear infinite; fill: none; stroke: rgba(255, 255, 255, 0.45); stroke-width: 1.5; stroke-linecap: round; }
      .wind-line-2 { animation: windSwirl 9s linear infinite 2s; fill: none; stroke: rgba(255, 255, 255, 0.3); stroke-width: 2; stroke-linecap: round; }
      .wind-line-3 { animation: windSwirl 6s linear infinite 4s; fill: none; stroke: rgba(255, 255, 255, 0.35); stroke-width: 1.5; stroke-linecap: round; }

      .wind { animation: gust 8s ease-in-out infinite; transform-origin: 50% 0; }
    
      @keyframes flyAway {
        0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
        30% { transform: translate(calc(var(--fly-x, 0px) * -0.5), 25px) rotate(calc(var(--fly-rot, 0deg) * 0.3)); opacity: 1; }
        60% { transform: translate(calc(var(--fly-x, 0px) * 0.8), 55px) rotate(calc(var(--fly-rot, 0deg) * 0.7)); opacity: 0.7; }
        100% { transform: translate(var(--fly-x, 0px), 110px) rotate(var(--fly-rot, 180deg)); opacity: 0; }
      }
    </style>
    <svg viewBox="0 0 2000 60" preserveAspectRatio="none" style="width: 100%; height: 100%; overflow: visible !important; pointer-events: none;">
      
      <!-- Wind Swooshes -->
      <path class="wind-line" d="M 0 20 Q 50 10 100 20 T 200 20" />
      <path class="wind-line-2" d="M 0 35 Q 80 45 150 30 T 300 35" />
      <path class="wind-line-3" d="M 0 15 Q 60 5 120 18 T 250 15" />

      <!-- Clouds in background -->
      <g class="cloud-1" fill="rgba(255,255,255,0.06)" transform="scale(0.8)">
        <path d="M 50 25 Q 60 10 80 15 Q 100 5 120 18 Q 140 15 140 28 L 50 28 Z" />
      </g>
      <g class="cloud-2" fill="rgba(255,255,255,0.05)" transform="scale(0.7) translate(800, 10)">
        <path d="M 50 25 Q 60 10 80 15 Q 100 5 120 18 Q 140 15 140 28 L 50 28 Z" />
      </g>

      <!-- Rope -->
      <path d="M 0 0 Q 1000 40 2000 0" stroke="rgba(255, 255, 255, 0.55)" stroke-width="2.5" fill="none" />
      
      <defs>
        <!-- Briefs -->
        <g id="pant-briefs">
          <path d="M -5 0 Q 30 10 65 0" fill="none" stroke-width="5" stroke-dasharray="2,3" stroke="rgba(255,255,255,0.4)" />
          <path d="M 0 0 Q 30 10 60 0 L 55 36 Q 45 54 35 40 L 25 40 Q 15 54 5 36 Z" />
          <path d="M 0 0 L 5 36 Q 15 54 25 40" fill="none" stroke-width="3" stroke-dasharray="2,2" stroke="rgba(255,255,255,0.5)" />
          <path d="M 60 0 L 55 36 Q 45 54 35 40" fill="none" stroke-width="3" stroke-dasharray="2,2" stroke="rgba(255,255,255,0.5)" />
          <path d="M 25 40 L 35 40 L 30 48 Z" fill="rgba(0,0,0,0.1)" />
        </g>
        <!-- Boxers -->
        <g id="pant-boxers">
          <rect x="0" y="0" width="56" height="7" fill="rgba(0,0,0,0.15)" />
          <path d="M 0 0 L 56 0 L 56 38 L 33 38 L 28 26 L 23 38 L 0 38 Z" />
        </g>
        <!-- Thong -->
        <g id="pant-thong">
          <path d="M -5 4 Q 30 13 65 4" fill="none" stroke-width="3" stroke-dasharray="1,2" />
          <path d="M -5 4 Q 30 13 65 4" fill="none" stroke-width="2" />
          <path d="M 18 10 Q 30 16 42 10 L 30 38 Z" />
          <path d="M 18 10 L 30 38" fill="none" stroke-width="2.5" stroke-dasharray="1,2" stroke="rgba(255,255,255,0.6)" />
          <path d="M 42 10 L 30 38" fill="none" stroke-width="2.5" stroke-dasharray="1,2" stroke="rgba(255,255,255,0.6)" />
          <path d="M 30 38 L 30 46" fill="none" stroke-width="2" />
          <path d="M 26 11 L 28 13 L 30 11 L 32 13 L 34 11 L 30 14 Z" fill="white" />
        </g>
        <!-- Peg -->
        <g id="peg">
          <rect x="0" y="-6" width="3.5" height="13" fill="#ffd700" rx="1.5" />
          <rect x="-1" y="-2" width="5.5" height="1.5" fill="#333333" />
        </g>
      </defs>

      <g class="wind">
      <!-- Pants scattered across 2000px width -->
      <g class="pant-holder" transform="translate(120, 4)"><g class="swinging-pant" style="transform-origin: 28px 0; animation-delay: 0s;">
        <use href="#pant-briefs" fill="#ffd700" stroke="#ffd700" />
        <use href="#peg" x="10" /><use href="#peg" x="44" />
      </g></g>
      <g class="pant-holder" transform="translate(380, 13)"><g class="swinging-pant" style="transform-origin: 28px 0; animation-delay: 0.7s;">
        <use href="#pant-boxers" fill="#e61c7e" stroke="#e61c7e" />
        <use href="#peg" x="10" /><use href="#peg" x="42" />
      </g></g>
      <g class="pant-holder" transform="translate(640, 17)"><g class="swinging-pant" style="transform-origin: 28px 0; animation-delay: 1.4s;">
        <use href="#pant-thong" fill="#28a745" stroke="#28a745" />
        <use href="#peg" x="10" /><use href="#peg" x="44" />
      </g></g>
      
      <!-- Pants that blow off the line and come back -->
      <g class="pant-holder" transform="translate(900, 20)">
        <g class="falling-wrapper">
          <g class="swinging-pant" style="transform-origin: 28px 0; animation-delay: 0.3s;">
            <use href="#pant-briefs" fill="#00c8ff" stroke="#00c8ff" />
            <use href="#peg" x="10" /><use href="#peg" x="44" />
          </g>
        </g>
      </g>
      <g class="pant-holder" transform="translate(1120, 20)">
        <g class="falling-wrapper falling-wrapper-2">
          <g class="swinging-pant" style="transform-origin: 28px 0; animation-delay: 0.8s;">
            <use href="#pant-thong" fill="#ff7700" stroke="#ff7700" />
            <use href="#peg" x="10" /><use href="#peg" x="44" />
          </g>
        </g>
      </g>
      
      <g class="pant-holder" transform="translate(1360, 18)"><g class="swinging-pant" style="transform-origin: 28px 0; animation-delay: 1.1s;">
        <use href="#pant-boxers" fill="#9b5de5" stroke="#9b5de5" />
        <use href="#peg" x="10" /><use href="#peg" x="42" />
      </g></g>
      <g class="pant-holder" transform="translate(1620, 13)"><g class="swinging-pant" style="transform-origin: 28px 0; animation-delay: 0.5s;">
        <use href="#pant-thong" fill="#f15bb5" stroke="#f15bb5" />
        <use href="#peg" x="10" /><use href="#peg" x="44" />
      </g></g>
      <g class="pant-holder" transform="translate(1880, 4)"><g class="swinging-pant" style="transform-origin: 28px 0; animation-delay: 0.9s;">
        <use href="#pant-briefs" fill="#00f5d4" stroke="#00f5d4" />
        <use href="#peg" x="10" /><use href="#peg" x="44" />
      </g></g>
      </g>

    </svg>
  </div>
  `;
  
  topBar.insertAdjacentHTML('afterbegin', washingLineHTML);
})();

/* ================================================
   10. HERO BACKGROUND CYCLER
   ================================================ */
(function initHeroCycler() {
  const heroImg = document.querySelector('.hero-bg-img');
  if (!heroImg) return;

  const images = window.__heroImages || [
    '/Pictures/events-photo.jpg',
    '/Pictures/Cancer-Rehab-03.jpg',
    '/Pictures/Cancer-Rehab-11.jpg',
    '/Pictures/events-1.jpg',
    '/Pictures/events-2.jpg',
    '/Pictures/Pants-Cancers-03.jpg',
    '/Pictures/Pants-Cancers-05.jpg',
    '/Pictures/Pants-Cancers-11.jpg',
    '/Pictures/Pants-Cancers-44.jpg',
    '/Pictures/Pants-Cancers-55.jpg',
    '/Pictures/DSC_00221-1024x576.jpg',
    '/Pictures/MG_4682-1024x691.jpg',
    '/Pictures/CMK_0642-Edit-3-1024x678.jpg',
    '/Pictures/for-shop-front-1024x522.jpg',
    '/Pictures/PANTScharitycommunitygrant-e1578955253521-1024x606.jpg'
  ];

  // Preload all hero pictures in background for silky-smooth cross-fades
  setTimeout(() => {
    images.forEach(src => {
      const p = new Image();
      p.src = src;
    });
  }, 1000);

  let currentIndex = (typeof window.__initialHeroIndex === 'number') 
    ? window.__initialHeroIndex 
    : Math.floor(Math.random() * images.length);

  // If heroImg src is still unset or default, set it now to the random start
  if (!heroImg.src || (!window.__initialHeroIndex && heroImg.src.endsWith('/events-photo.jpg'))) {
    heroImg.src = images[currentIndex];
  }

  heroImg.style.transition = 'opacity 1.5s ease-in-out';

  // Pool of unplayed indices so every rotation picks a random new photo without repeating
  let unplayed = images.map((_, i) => i).filter(i => i !== currentIndex);

  setInterval(() => {
    heroImg.style.opacity = '0';
    setTimeout(() => {
      if (unplayed.length === 0) {
        unplayed = images.map((_, i) => i).filter(i => i !== currentIndex);
      }
      const randPos = Math.floor(Math.random() * unplayed.length);
      currentIndex = unplayed.splice(randPos, 1)[0];
      heroImg.src = images[currentIndex];
      heroImg.style.opacity = '1';
    }, 1500);
  }, 7000);
})();

/* ================================================
   11. WASHING LINE INTERACTIVITY & DYNAMICS
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Helper: calculate the Y position on the curved washing line (M 0 0 Q 1000 40 2000 0)
  function getRopeY(x) {
    return Math.round((x / 25) * (1 - x / 2000));
  }

  // Helper: generate a vibrant random HSL color
  function getRandomPantColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 85%, 55%)`;
  }

  // Helper: extract numeric X coordinate from transform="translate(X, Y)"
  function getHolderX(holder) {
    const match = (holder.getAttribute('transform') || '').match(/translate\(\s*([\d.-]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  // Helper: find a clear random X along the line avoiding overlap with other pants
  function getNewRandomPosition(currentHolder) {
    const otherHolders = Array.from(document.querySelectorAll('#washing-line .pant-holder'))
      .filter(h => h !== currentHolder);
    const otherXs = otherHolders.map(getHolderX);

    let bestX = Math.floor(80 + Math.random() * 1840);
    const minDistance = 100;
    for (let attempt = 0; attempt < 50; attempt++) {
      const candidateX = Math.floor(80 + Math.random() * 1840);
      const isClear = otherXs.every(x => Math.abs(x - candidateX) >= minDistance);
      if (isClear) {
        bestX = candidateX;
        break;
      }
    }
    return { x: bestX, y: getRopeY(bestX) };
  }

  // Helper: redistribute all pants across the 2000px line with random jitter
  function shuffleAllPantsPositions() {
    const holders = Array.from(document.querySelectorAll('#washing-line .pant-holder'));
    if (!holders.length) return;
    const span = 1750 / holders.length;
    const slots = [];
    for (let i = 0; i < holders.length; i++) {
      const baseX = 100 + i * span;
      const jitter = (Math.random() - 0.5) * (span * 0.7);
      slots.push(Math.round(baseX + jitter));
    }
    // Randomize slot assignment
    slots.sort(() => Math.random() - 0.5);

    holders.forEach((holder, i) => {
      const x = Math.max(70, Math.min(1930, slots[i]));
      const y = getRopeY(x);
      holder.setAttribute('transform', `translate(${x}, ${y})`);
    });
  }

  // Initialize random colors for all pants on load
  const allPantsUse = document.querySelectorAll('#washing-line use[href^="#pant"]');
  allPantsUse.forEach(pant => {
    const color = getRandomPantColor();
    pant.setAttribute('fill', color);
    pant.setAttribute('stroke', color);
  });

  // 1. Click to fly away and return to a random spot on the washing line
  const pants = document.querySelectorAll('#washing-line .swinging-pant');
  pants.forEach(pant => {
    pant.style.cursor = 'pointer';
    pant.style.pointerEvents = 'visiblePainted';

    pant.addEventListener('click', function(e) {
      e.stopPropagation();
      const fx = (Math.random() * 600) - 300;
      const fr = (Math.random() * 720) - 360;
      this.style.setProperty('--fly-x', `${fx}px`);
      this.style.setProperty('--fly-rot', `${fr}deg`);
      this.style.animation = 'flyAway 3s ease-in forwards';

      // Reposition to a random spot and bring it back with a new color after falling
      setTimeout(() => {
        const holder = this.closest('.pant-holder');
        if (holder) {
          const pos = getNewRandomPosition(holder);
          holder.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);
        }

        const useEl = this.querySelector('use[href^="#pant"]');
        if (useEl) {
          const color = getRandomPantColor();
          useEl.setAttribute('fill', color);
          useEl.setAttribute('stroke', color);
        }

        this.style.animation = 'pantSwing 3.5s ease-in-out infinite';
      }, 4200);
    });
  });

  // 2. Continuous falling wrappers: reposition each time they finish their fall
  const fallingWrappers = document.querySelectorAll('.falling-wrapper, .falling-wrapper-2');
  fallingWrappers.forEach(wrapper => {
    wrapper.addEventListener('animationiteration', (e) => {
      if (e.animationName !== 'pantFall') return;
      const holder = wrapper.closest('.pant-holder');
      if (holder) {
        const pos = getNewRandomPosition(holder);
        holder.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);
      }
      const useEl = wrapper.querySelector('use[href^="#pant"]');
      if (useEl) {
        const color = getRandomPantColor();
        useEl.setAttribute('fill', color);
        useEl.setAttribute('stroke', color);
      }
    });
  });

  // 3. Gust of wind (periodic): blows all pants away and returns them shuffled
  function triggerGust() {
    const windLines = document.querySelectorAll('.wind-line, .wind-line-2, .wind-line-3');
    windLines.forEach(line => {
      line.style.animationDuration = '1s';
      line.style.strokeWidth = '6';
    });

    pants.forEach((pant, index) => {
      setTimeout(() => {
        const fx = (Math.random() * 800) - 400;
        const fr = (Math.random() * 1080) - 540;
        pant.style.setProperty('--fly-x', `${fx}px`);
        pant.style.setProperty('--fly-rot', `${fr}deg`);
        pant.style.animation = 'flyAway 3s ease-in forwards';
      }, index * 100);
    });

    // Reset after gust passes: redistribute all pants and refresh colors
    setTimeout(() => {
      windLines.forEach(line => {
        line.style.animationDuration = '';
        line.style.strokeWidth = '';
      });

      shuffleAllPantsPositions();

      pants.forEach(pant => {
        const useEl = pant.querySelector('use[href^="#pant"]');
        if (useEl) {
          const color = getRandomPantColor();
          useEl.setAttribute('fill', color);
          useEl.setAttribute('stroke', color);
        }
        pant.style.animation = 'pantSwing 3.5s ease-in-out infinite';
      });
    }, 4500);
  }

  function scheduleGust() {
    const delay = 35000 + Math.random() * 40000; // Between 35 and 75 seconds
    setTimeout(() => {
      triggerGust();
      scheduleGust();
    }, delay);
  }
  scheduleGust();

  // 4. Subpage hero photo randomizer
  const goodHeroImages = [
    '/Pictures/events-photo.jpg',
    '/Pictures/Cancer-Rehab-03.jpg',
    '/Pictures/Cancer-Rehab-11.jpg',
    '/Pictures/events-1.jpg',
    '/Pictures/events-2.jpg',
    '/Pictures/Pants-Cancers-44.jpg',
    '/Pictures/Pants-Cancers-55.jpg',
    '/Pictures/DSC_00221-1024x576.jpg',
    '/Pictures/MG_4682-1024x691.jpg',
    '/Pictures/CMK_0642-Edit-3-1024x678.jpg',
    '/Pictures/for-shop-front-1024x522.jpg',
    '/Pictures/PANTScharitycommunitygrant-e1578955253521-1024x606.jpg'
  ];
  const headers = document.querySelectorAll('.about-header-section');
  headers.forEach(header => {
    const randomPic = goodHeroImages[Math.floor(Math.random() * goodHeroImages.length)];
    header.style.background = `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${randomPic}) center/cover`;
    header.style.paddingBlock = 'var(--space-24) var(--space-16)';
  });
});

/* ================================================
   NATIVE EBAY & INSTAGRAM FEEDS (NO WIDGETS)
   ================================================ */
const PANTS_FEEDS = {
  // eBay seller configuration: Set your seller username here
  ebaySeller: '', 

  // Meta / Instagram configuration: Set your Meta Graph User Token here
  instagramToken: '',
  instagramHandle: 'pantscancers',

  // Fallback / Preview data for eBay (authentic charity shop stock - 8 symmetrical items)
  fallbackEbayItems: [
    {
      title: "Vintage Mid-Century Cornish Ceramic Studio Vase - Falmouth Hub Collection",
      price: "£18.50",
      image: "/Pictures/fancy-863x1024.jpg",
      link: "https://www.ebay.co.uk/usr/pantscancers"
    },
    {
      title: "Bburago 1:18 Scale Jaguar Mk2 Classic Die-cast Model Car - Mint Condition",
      price: "£28.00",
      image: "/Pictures/Posh-Pants-Charity-Shop-08.jpg",
      link: "https://www.ebay.co.uk/usr/pantscancers"
    },
    {
      title: "Collectable Illustrated Local History & Maritime Books Bundle",
      price: "£14.00",
      image: "/Pictures/ap-1024x709.jpg",
      link: "https://www.ebay.co.uk/usr/pantscancers"
    },
    {
      title: "Handpicked Retro Pre-Loved Vintage Knitwear - Posh Pants Falmouth",
      price: "£22.00",
      image: "/Pictures/CMK_0642-Edit-3-1024x678.jpg",
      link: "https://www.ebay.co.uk/usr/pantscancers"
    },
    {
      title: "Solid Oak Rustic Accent Side Table - Ponsharden Hub Furniture Unit 4",
      price: "£35.00",
      image: "/Pictures/Pants-Unit-4_03.jpg",
      link: "https://www.ebay.co.uk/usr/pantscancers"
    },
    {
      title: "Curated Pre-Loved Boutique Accessories - 6 Webber Street Falmouth",
      price: "£16.50",
      image: "/Pictures/Posh-Pants-Charity-Shop-09.jpg",
      link: "https://www.ebay.co.uk/usr/pantscancers"
    },
    {
      title: "Vintage Solid Pine Country Bookcase - Ponsharden Hub Furniture Unit 4",
      price: "£45.00",
      image: "/Pictures/Pants-Unit-4_04.jpg",
      link: "https://www.ebay.co.uk/usr/pantscancers"
    },
    {
      title: "Classic Pre-Loved Trench Coat - Posh Pants Falmouth Boutique",
      price: "£32.00",
      image: "/Pictures/Posh-Pants-Charity-Shop-02.jpg",
      link: "https://www.ebay.co.uk/usr/pantscancers"
    }
  ],

  // Fallback / Preview data for Instagram (authentic charity shop & community photos)
  fallbackInstaPosts: [
    {
      tag: "🧘 Yoga & Wellbeing",
      likes: 58,
      comments: 8,
      caption: "Gentle Yoga & Mindfulness for Cancer classes running every week! Free and welcoming for anyone affected by cancer in Cornwall. #PantsCancers #YogaForCancer #Falmouth",
      image: "/Pictures/SPRING-SEASON_YOGA_INSTAGRAM-GRID-POST.webp",
      link: "https://www.instagram.com/pantscancers/"
    },
    {
      tag: "👗 Posh Pants Boutique",
      likes: 47,
      comments: 6,
      caption: "Fresh pre-loved arrivals, vintage treasures, and curated designer rails at 6 Webber Street, Falmouth! 100% of proceeds fund our CancerRehab Centre. #PoshPants #ShopSecondhand",
      image: "/Pictures/Posh-Pants-Charity-Shop-01.jpg",
      link: "https://www.instagram.com/pantscancers/"
    },
    {
      tag: "🏬 Ponsharden Hub",
      likes: 72,
      comments: 12,
      caption: "Ponsharden Hub is packed with bargains across all 6 units! Furniture, homeware, and low-cost essentials supporting the local community. Open 7 days a week. #Ponsharden #Falmouth",
      image: "/Pictures/for-shop-front-1024x522.jpg",
      link: "https://www.instagram.com/pantscancers/"
    },
    {
      tag: "💪 CancerRehab Centre",
      likes: 89,
      comments: 15,
      caption: "Steve Winnan guiding our Falmouth cancer survivor rehabilitation group through their tailored exercise routines. Rebuilding confidence and physical vitality! #CancerRehab #SteveWinnan",
      image: "/Pictures/Cancer-Rehab-03.jpg",
      link: "https://www.instagram.com/pantscancers/"
    },
    {
      tag: "🎗️ Awareness In Action",
      likes: 64,
      comments: 9,
      caption: "Founder Jeannette Preston taking our below-the-belt cancer awareness campaign across Cornwall. Promoting early detection and saving lives! #PantsCancers #Cornwall",
      image: "/Pictures/SarahNewtonMPandJeanettePreston_2-1024x683.jpg",
      link: "https://www.instagram.com/pantscancers/"
    },
    {
      tag: "🌱 Community & Support",
      likes: 61,
      comments: 11,
      caption: "Community morning at our Falmouth CancerRehab centre. Movement, recovery, peer connection, and friendly chats. Nobody fights cancer alone. #PeerSupport #CancerSupport",
      image: "/Pictures/Cancer-Rehab-11.jpg",
      link: "https://www.instagram.com/pantscancers/"
    }
  ]
};

function renderEbayFeed() {
  const containers = document.querySelectorAll('#ebay-feed-container, #ebay-feed-container-shops');
  if (!containers.length) return;

  function buildCardsHtml(items) {
    return items.map(item => `
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="ebay-card">
        <div class="ebay-card-img-wrap">
          <span class="ebay-watch-heart" title="Save to Watchlist">&#9825;</span>
          <img src="${item.image || item.imgSrc}" alt="${item.title}" loading="lazy">
        </div>
        <div class="ebay-card-body">
          <span class="ebay-condition-badge">PRE-OWNED &bull; CHARITY</span>
          <div class="ebay-card-title">${item.title}</div>
          <div class="ebay-price-block">
            <span class="ebay-price">${item.price || '£12.50'}</span>
            <span class="ebay-format-sub">Buy It Now</span>
            <span class="ebay-postage-sub">Dispatched from Falmouth, UK</span>
          </div>
        </div>
        <div class="ebay-charity-bar">
          &#127895; 100% benefits Pants Cancer Charity
        </div>
        <span class="ebay-btn">Buy on eBay &rarr;</span>
      </a>
    `).join('');
  }

  function setHtml(html) {
    containers.forEach(c => { c.innerHTML = html; });
  }

  if (PANTS_FEEDS.ebaySeller) {
    const rssUrl = `https://www.ebay.co.uk/sch/${encodeURIComponent(PANTS_FEEDS.ebaySeller)}/m.html?_rss=1`;
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const items = data.items.slice(0, 4).map(item => {
            const imgMatch = item.description ? item.description.match(/src=["']([^"']+)["']/) : null;
            return {
              title: item.title,
              link: item.link,
              imgSrc: imgMatch ? imgMatch[1] : '/Pictures/Pants-Logo-No-Background.png',
              price: '£14.50'
            };
          });
          setHtml(buildCardsHtml(items));
        }
      })
      .catch(() => {});
  }
}

function renderInstagramFeed() {
  const container = document.getElementById('instagram-feed-container');
  if (!container) return;

  const instaIconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;

  if (PANTS_FEEDS.instagramToken) {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${PANTS_FEEDS.instagramToken}&limit=6`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          container.innerHTML = data.data.map((post, i) => {
            const mediaUrl = post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url;
            return `
              <a href="${post.permalink}" target="_blank" rel="noopener noreferrer" class="instagram-card">
                <span class="instagram-corner-badge">${instaIconSvg} @pantscancers</span>
                <span class="instagram-tag-pill">Community Post</span>
                <img src="${mediaUrl}" alt="Instagram post" loading="lazy">
                <div class="instagram-overlay">
                  <div class="instagram-overlay-meta">&#10084;&#65039; Live &bull; &#128172; Instagram</div>
                  <p class="instagram-overlay-text">${post.caption || 'View on Instagram'}</p>
                  <span class="instagram-overlay-action">${instaIconSvg} View on Instagram &rarr;</span>
                </div>
              </a>
            `;
          }).join('');
          return;
        }
        renderInstaFallback();
      })
      .catch(() => renderInstaFallback());
  } else {
    // If rich pre-rendered HTML cards are already present in markup, preserve them
    if (container.children.length > 0) return;
    renderInstaFallback();
  }

  function renderInstaFallback() {
    container.innerHTML = PANTS_FEEDS.fallbackInstaPosts.map(post => `
      <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="instagram-card">
        <span class="instagram-corner-badge">${instaIconSvg} @pantscancers</span>
        <span class="instagram-tag-pill">${post.tag}</span>
        <img src="${post.image}" alt="${post.tag}" loading="lazy">
        <div class="instagram-overlay">
          <div class="instagram-overlay-meta">&#10084;&#65039; ${post.likes} &bull; &#128172; ${post.comments} comments</div>
          <p class="instagram-overlay-text">${post.caption}</p>
          <span class="instagram-overlay-action">${instaIconSvg} View on Instagram &rarr;</span>
        </div>
      </a>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderEbayFeed();
  renderInstagramFeed();
});
