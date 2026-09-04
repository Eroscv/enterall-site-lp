// Product page (PDP) gallery thumbnails — click swaps the main image; placeholder
// thumbs (angles we don't have real photos for yet) swap in a labeled gradient block.
(function(){
  const main = document.getElementById('pdpGalleryMain');
  const thumbs = document.querySelectorAll('.pdp-thumb');
  if (!main || !thumbs.length) return;
  const realImgSrc = main.querySelector('img') ? main.querySelector('img').src : '';
  const realImgAlt = main.querySelector('img') ? main.querySelector('img').alt : '';
  thumbs.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbs.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      if (btn.dataset.placeholder) {
        main.classList.add('is-placeholder');
        main.innerHTML = `<span>${btn.dataset.placeholder}<br><em style="font-style:normal;opacity:.7;">(foto a confirmar)</em></span>`;
      } else {
        main.classList.remove('is-placeholder');
        main.innerHTML = `<img src="${btn.dataset.img || realImgSrc}" alt="${btn.dataset.label || realImgAlt}">`;
      }
    });
  });
})();

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) {
      nav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// Product catalog — bento grid (Kate Farms bestsellers style): 3 product tiles + 1 fixed lifestyle photo.
// Arrows rotate which 3 products are shown; the photo tile never changes.
const bestsellersGrid = document.getElementById('bestsellersGrid');
if (bestsellersGrid) {
  const products = [
    { name: 'Bluebox Soy 1.2', bg: '#e8f2df', spec: '1,2 kcal/mL · Baunilha', img: 'assets/images/products/product-1.png', url: 'bluebox-soy-1-2.html' },
    { name: 'Bluebox Fiber 1.2', bg: '#e0eef4', spec: '1,2 kcal/mL · Com fibras', img: 'assets/images/products/product-2.png', url: 'bluebox-fiber-1-2.html' },
    { name: 'Bluebox Max 1.2', bg: '#ece3f0', spec: '1,2 kcal/mL · Alta densidade', img: 'assets/images/products/product-3.png', url: 'bluebox-max-1-2.html' },
    { name: 'Bluebox Max 1.5', bg: '#ece3f0', spec: '1,5 kcal/mL · Alta densidade', img: 'assets/images/products/product-4.png', url: 'bluebox-max-1-5-1l.html' },
    { name: 'Intake Basic 1.0', bg: '#c8e0c8', spec: '1,0 kcal/mL · Baunilha', img: 'assets/images/products/product-5.png', url: 'intake-basic-1-0.html' },
    { name: 'Intake Basic 1.5', bg: '#b8d8e3', spec: '1,5 kcal/mL · Baunilha', img: 'assets/images/products/product-6.png', url: 'intake-basic-1-5.html' },
    { name: 'Bluebox Soy 1.5', bg: '#d3c1e7', spec: '1,5 kcal/mL · Baunilha', img: 'assets/images/products/product-7.png', url: 'bluebox-soy-1-5.html' }
  ];
  let startIndex = 0;

  function renderGrid() {
    const shown = [
      products[startIndex % products.length],
      products[(startIndex + 1) % products.length],
      products[(startIndex + 2) % products.length],
      products[(startIndex + 3) % products.length]
    ];
    const cardsHtml = shown.map(p => `
      <div class="bestseller-card" style="background:${p.bg}">
        <div class="bestseller-media" style="background:${p.bg}">
          <img src="${p.img}" alt="${p.name}">
        </div>
        <div class="bestseller-info">
          <h4>${p.url ? `<a href="${p.url}">${p.name}</a>` : p.name}</h4>
          <span class="bestseller-spec">${p.spec}</span>
          <a href="#contato" class="btn-outline-sm">Solicitar amostra</a>
        </div>
      </div>
    `).join('');
    bestsellersGrid.innerHTML = cardsHtml;

    const els = Array.from(bestsellersGrid.querySelectorAll('.bestseller-card, .bestseller-photo'));
    requestAnimationFrame(() => {
      els.forEach((el, i) => setTimeout(() => el.classList.add('is-visible'), i * 60));
    });
  }
  renderGrid();

  const prevBtn = document.getElementById('bestsellersPrev');
  const nextBtn = document.getElementById('bestsellersNext');

  function bsGridStep() {
    const first = bestsellersGrid.firstElementChild;
    if (!first) return bestsellersGrid.clientWidth;
    const style = getComputedStyle(bestsellersGrid);
    return first.getBoundingClientRect().width + parseFloat(style.gap || 18);
  }
  function bsAtEnd() {
    return bestsellersGrid.scrollLeft >= bestsellersGrid.scrollWidth - bestsellersGrid.clientWidth - 4;
  }

  if (nextBtn) nextBtn.addEventListener('click', () => {
    if (window.innerWidth <= 860 && !bsAtEnd()) {
      bestsellersGrid.scrollBy({ left: bsGridStep(), behavior: 'smooth' });
      return;
    }
    startIndex = (startIndex + 1) % products.length;
    renderGrid();
  });
  if (prevBtn) prevBtn.addEventListener('click', () => {
    if (window.innerWidth <= 860 && bestsellersGrid.scrollLeft > 4) {
      bestsellersGrid.scrollBy({ left: -bsGridStep(), behavior: 'smooth' });
      return;
    }
    startIndex = (startIndex - 1 + products.length) % products.length;
    renderGrid();
  });

  if (window.innerWidth <= 860 && nextBtn) {
    let bsTimer = null, bsResume = null;
    function bsPlay(){ bsStop(); bsTimer = setInterval(() => nextBtn.click(), 4600); }
    function bsStop(){ if (bsTimer) clearInterval(bsTimer); bsTimer = null; }
    function bsPause(){ bsStop(); if (bsResume) clearTimeout(bsResume); bsResume = setTimeout(bsPlay, 7400); }
    bestsellersGrid.addEventListener('pointerdown', bsPause, { passive:true });
    prevBtn.addEventListener('click', bsPause);
    nextBtn.addEventListener('click', bsPause);
    bsPlay();
  }
}


// Mobile-only autoplay carousel helper — used by the benefits and products
// carousels so both share the same navigation/timing language. Advances by
// one card, loops back to start at the end, pauses on manual interaction and
// resumes shortly after.
const isMobileViewport = () => window.innerWidth <= 860;

// Corner photos in the "gota" section (ph-tl/tr/bl/br) are meant to bleed
// past the centered .drop-zstack column, but the bleed amount was a fixed
// px value tuned for one width — it clipped against the real viewport edge
// across most desktop sizes. Compute the safe bleed live from the actual
// measured layout instead of guessing a fixed number.
(function(){
  const zstack = document.getElementById('dropZstack');
  if (!zstack) return;
  const specs = [
    { id: 'phTL', side: 'left',  base: 420, width: 350 },
    { id: 'phBL', side: 'left',  base: 440, width: 380 },
    { id: 'phTR', side: 'right', base: 440, width: 390 },
    { id: 'phBR', side: 'right', base: 440, width: 380 },
  ];
  const margin = 40; // breathing room from the real viewport edge (covers the rotated bounding-box growth)
  const gap = 24; // breathing room between the photo's inner edge and the text column
  const minScale = 0.2; // purely defensive floor; the formula below never needs it in practice
  function positionDropPhotos() {
    if (window.innerWidth <= 1300) return; // hidden at this size anyway
    const r = zstack.getBoundingClientRect();
    specs.forEach(({ id, side, base, width }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const edgeDistance = side === 'left' ? r.left : (window.innerWidth - r.right);
      // Solve offset + scale together (both measured around the photo's own
      // center, since that's how the CSS transform scales it) so the photo is
      // simultaneously as large as possible, never clips past the real
      // viewport edge, and never overlaps the text column — at any width.
      const scale = Math.max(minScale, Math.min(1, (edgeDistance - margin - gap) / width));
      const lowerBound = margin - edgeDistance - (width * (1 - scale)) / 2; // clip-safe bound
      const upperBound = -gap - (width * (1 + scale)) / 2; // overlap-safe bound
      const offset = Math.max(lowerBound, Math.min(-base, upperBound));
      el.style.setProperty('--drop-scale', scale.toFixed(3));
      if (side === 'left') {
        el.style.left = offset + 'px';
        el.style.right = 'auto';
      } else {
        el.style.right = offset + 'px';
        el.style.left = 'auto';
      }
    });
  }
  positionDropPhotos();
  window.addEventListener('resize', positionDropPhotos);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', positionDropPhotos);
  }
})();

// Gota photos marquee (mobile only) — clones the existing corner-photo <img>s
// (no duplicate base64 in the HTML) into a continuously scrolling, looping strip.
(function(){
  const track = document.getElementById('gotaMarqueeTrack');
  if (!track) return;
  const sourceImgs = Array.from(document.querySelectorAll('.drop-placeholder img'));
  if (!sourceImgs.length) return;
  const set = sourceImgs.concat(sourceImgs); // duplicate once for a seamless loop
  set.forEach(img => {
    const clone = img.cloneNode(true);
    clone.removeAttribute('id');
    track.appendChild(clone);
  });
})();
function setupAutoplayCarousel(track, { prevBtn, nextBtn, interval = 4200, onEnd } = {}) {
  if (!track) return null;
  function step() {
    const card = track.firstElementChild;
    if (!card) return track.clientWidth;
    const style = getComputedStyle(track);
    return card.getBoundingClientRect().width + parseFloat(style.gap || 14);
  }
  function atEnd() {
    return track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
  }
  function atStart() {
    return track.scrollLeft <= 4;
  }
  function scrollByStep(dir) {
    if (dir > 0 && atEnd()) {
      if (onEnd) { onEnd(); return; }
      track.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    if (dir < 0 && atStart()) {
      track.scrollTo({ left: track.scrollWidth - track.clientWidth, behavior: 'smooth' });
      return;
    }
    track.scrollBy({ left: dir * step(), behavior: 'smooth' });
  }
  let timer = null, resumeTimeout = null;
  function play() { stop(); timer = setInterval(() => scrollByStep(1), interval); }
  function stop() { if (timer) clearInterval(timer); timer = null; }
  function pause() {
    stop();
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(play, interval * 1.6);
  }
  prevBtn && prevBtn.addEventListener('click', () => { scrollByStep(-1); pause(); });
  nextBtn && nextBtn.addEventListener('click', () => { scrollByStep(1); pause(); });
  track.addEventListener('pointerdown', pause, { passive: true });
  track.addEventListener('wheel', pause, { passive: true });
  play();
  return { play, stop, pause, scrollByStep };
}

if (window.innerWidth <= 1300) {
  const benefitCarousel2 = document.getElementById('benefitCarousel2');
  if (benefitCarousel2) {
    setupAutoplayCarousel(benefitCarousel2, {
      prevBtn: document.getElementById('benefitPrev2'),
      nextBtn: document.getElementById('benefitNext2')
    });
  }
  const benefitCarouselDiff = document.getElementById('benefitCarouselDiff');
  if (benefitCarouselDiff) {
    setupAutoplayCarousel(benefitCarouselDiff, {
      prevBtn: document.getElementById('benefitPrevDiff'),
      nextBtn: document.getElementById('benefitNextDiff')
    });
  }
}

// Values carousel — infinite arc/coverflow carousel (Voldog-style drag + arrows,
// content repeats infinitely, center card is "main" and the others rotate away like a fan)
const valuesCarousel = document.getElementById('valuesCarousel');
const valuesPrev = document.getElementById('valuesPrev');
const valuesNext = document.getElementById('valuesNext');

if (valuesCarousel) {
  const cardData = [
    { tag: 'Cuidado clínico real', icon: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>', text: 'Desenvolvido com nutricionistas e revisado por profissionais de saúde.' },
    { tag: 'Acessível por natureza', icon: '<path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.3"/>', text: 'Qualidade nutricional superior, sem o preço dos grandes players.' },
    { tag: 'Feito no Brasil', icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', text: 'Desenvolvido no Parque Tecnológico da Unicamp, para a realidade brasileira.' },
    { tag: 'Pronto para o dia a dia', icon: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>', text: 'Uso hospitalar e home care, com suporte para pacientes e cuidadores.' },
    { tag: 'Suporte para a família', icon: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>', text: 'Equipe disponível para tirar dúvidas em cada etapa da jornada de cuidado.' },
    { tag: 'Transparência total', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>', text: 'Composição clara, sem letras miúdas — você sabe exatamente o que está oferecendo.' }
  ];
  const REPEATS = 6;
  let html = '';
  for (let r = 0; r < REPEATS; r++) {
    cardData.forEach(d => {
      html += `<div class="value-card"><div class="value-tag">${d.tag}</div><div class="value-body"><div class="value-icon"><svg viewBox="0 0 24 24">${d.icon}</svg></div><p>${d.text}</p></div></div>`;
    });
  }
  valuesCarousel.innerHTML = html;

  const setCount = cardData.length;
  const totalCount = setCount * REPEATS;

  function cardStep() {
    const card = valuesCarousel.querySelector('.value-card');
    if (!card) return 360;
    const style = getComputedStyle(valuesCarousel);
    return card.offsetWidth + parseFloat(style.gap || 46);
  }

  // Start roughly in the middle repeat so there's room to scroll both directions before wrapping
  function centerStart() {
    const step = cardStep();
    valuesCarousel.scrollLeft = step * setCount * Math.floor(REPEATS / 2);
  }
  centerStart();

  function wrapScroll() {
    const step = cardStep();
    const setWidth = step * setCount;
    const min = setWidth * 1;
    const max = setWidth * (REPEATS - 2);
    if (valuesCarousel.scrollLeft < min) {
      valuesCarousel.scrollLeft += setWidth * Math.floor(REPEATS / 2);
    } else if (valuesCarousel.scrollLeft > max) {
      valuesCarousel.scrollLeft -= setWidth * Math.floor(REPEATS / 2);
    }
  }

  valuesPrev?.addEventListener('click', () => {
    valuesCarousel.scrollBy({ left: -cardStep(), behavior: 'smooth' });
  });
  valuesNext?.addEventListener('click', () => {
    valuesCarousel.scrollBy({ left: cardStep(), behavior: 'smooth' });
  });

  let isDown = false, startX = 0, startScroll = 0, dragged = false;
  valuesCarousel.addEventListener('pointerdown', (e) => {
    isDown = true; dragged = false;
    startX = e.clientX;
    startScroll = valuesCarousel.scrollLeft;
    valuesCarousel.classList.add('is-dragging');
  });
  window.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) dragged = true;
    valuesCarousel.scrollLeft = startScroll - dx;
  });
  window.addEventListener('pointerup', () => {
    isDown = false;
    valuesCarousel.classList.remove('is-dragging');
    wrapScroll();
  });
  valuesCarousel.addEventListener('click', (e) => {
    if (dragged) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  // Arc / coverflow transform: the card nearest the carousel's center sits flat and full-size;
  // cards further away rotate outward and shrink slightly, like a fan.
  function updateArc() {
    const rect = valuesCarousel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const cards = valuesCarousel.querySelectorAll('.value-card');
    cards.forEach(card => {
      const cr = card.getBoundingClientRect();
      const cardCenter = cr.left + cr.width / 2;
      const dist = (cardCenter - centerX) / rect.width;
      const clamped = Math.max(-1.4, Math.min(1.4, dist * 2.2));
      const rotate = clamped * 13;
      const scale = 1 - Math.min(Math.abs(clamped), 1) * 0.16;
      const lift = Math.min(Math.abs(clamped), 1) * 26;
      card.style.transform = `translateY(${lift}px) rotate(${rotate}deg) scale(${scale})`;
      card.style.zIndex = String(200 - Math.round(Math.abs(clamped) * 100));
    });
  }
  let arcTicking = false;
  valuesCarousel.addEventListener('scroll', () => {
    wrapScroll();
    if (!arcTicking) {
      arcTicking = true;
      requestAnimationFrame(() => { updateArc(); arcTicking = false; });
    }
  }, { passive: true });
  window.addEventListener('resize', () => { centerStart(); updateArc(); });
  updateArc();
}

const valueCardEls = valuesCarousel ? Array.from(valuesCarousel.querySelectorAll('.value-card')) : [];
const valueIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      valueIo.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
valueCardEls.forEach(el => valueIo.observe(el));

// Testimonials carousel — Kate Farms-style: one big fixed media block on the left,
// plain text cards (stars, quote, name, pill) scroll behind it in a carousel
const testiCarousel = document.getElementById('testiCarousel');
if (testiCarousel) {
  const testiData = [
    { initial: 'M', name: 'Mariana', pill: 'Cuidadora familiar', quote: '"Depois que trocamos a fórmula, o dia a dia com a sonda do meu pai ficou mais tranquilo — e mais leve pra mim também."' },
    { initial: 'R', name: 'Rafael', pill: 'Nutricionista clínico', quote: '"Como nutricionista, sinto segurança em indicar uma fórmula pensada para reduzir entupimento e facilitar a rotina da equipe."' },
    { initial: 'L', name: 'Laura', pill: 'Paciente em home care', quote: '"O sabor baunilha faz diferença nos dias em que ainda consigo comer por via oral. Parece feito para gente de verdade."' },
    { initial: 'C', name: 'Carlos', pill: 'Enfermeiro hospitalar', quote: '"A viscosidade certa faz toda diferença na rotina do setor — menos tempo lidando com sonda entupida, mais tempo com o paciente."' },
    { initial: 'B', name: 'Beatriz', pill: 'Cuidadora em home care', quote: '"Consigo preparar a alimentação da minha mãe em minutos, sem complicação. Isso mudou nossa rotina completamente."' }
  ];

  const starSvg = '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

  const TESTI_REPEATS = 5;
  let testiHtml = '';
  for (let r = 0; r < TESTI_REPEATS; r++) {
    testiData.forEach(t => {
      testiHtml += `
      <div class="testi-card">
        <div class="testi-stars">${starSvg.repeat(5)}</div>
        <p class="testi-quote">${t.quote}</p>
        <div class="testi-person">
          <div class="testi-avatar">${t.initial}</div>
          <div class="name">${t.name}</div>
        </div>
        <span class="testi-pill">${t.pill}</span>
      </div>`;
    });
  }
  testiCarousel.innerHTML = testiHtml;

  const testiSetCount = testiData.length;

  function testiCardStep() {
    const card = testiCarousel.querySelector('.testi-card');
    if (!card) return 320;
    const style = getComputedStyle(testiCarousel);
    return card.offsetWidth + parseFloat(style.gap || 20);
  }

  function testiCenterStart() {
    const step = testiCardStep();
    testiCarousel.scrollLeft = step * testiSetCount * Math.floor(TESTI_REPEATS / 2);
  }
  testiCenterStart();

  const testiPrev = document.getElementById('testiPrev');
  const testiNext = document.getElementById('testiNext');
  if (testiPrev) testiPrev.onclick = function(){
    testiCarousel.scrollBy({ left: -testiCardStep(), behavior: 'smooth' });
  };
  if (testiNext) testiNext.onclick = function(){
    testiCarousel.scrollBy({ left: testiCardStep(), behavior: 'smooth' });
  };

  function testiWrapScroll() {
    const step = testiCardStep();
    const setWidth = step * testiSetCount;
    const min = setWidth * 1;
    const max = setWidth * (TESTI_REPEATS - 2);
    if (testiCarousel.scrollLeft < min) {
      testiCarousel.scrollLeft += setWidth * Math.floor(TESTI_REPEATS / 2);
    } else if (testiCarousel.scrollLeft > max) {
      testiCarousel.scrollLeft -= setWidth * Math.floor(TESTI_REPEATS / 2);
    }
  }

  let isDown = false, startX = 0, startScroll = 0, dragged = false;
  testiCarousel.addEventListener('pointerdown', (e) => {
    isDown = true; dragged = false;
    startX = e.clientX;
    startScroll = testiCarousel.scrollLeft;
    testiCarousel.classList.add('is-dragging');
  });
  window.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) dragged = true;
    testiCarousel.scrollLeft = startScroll - dx;
  });
  window.addEventListener('pointerup', () => {
    isDown = false;
    testiCarousel.classList.remove('is-dragging');
    testiWrapScroll();
  });
  testiCarousel.addEventListener('click', (e) => {
    if (dragged) { e.preventDefault(); e.stopPropagation(); }
  }, true);
  testiCarousel.addEventListener('scroll', testiWrapScroll, { passive: true });
  window.addEventListener('resize', testiCenterStart);

  const testiCardEls = Array.from(testiCarousel.querySelectorAll('.testi-card'));
  const testiIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        testiIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  testiCardEls.forEach(el => testiIo.observe(el));
}

// Product page reviews carousel (bluebox-max-1-5-1l.html) — same card markup as the
// main testimonials carousel, but a single static pass (no infinite-loop wrap needed
// for a single product's review list) with drag-to-scroll.
const productReviewsCarousel = document.getElementById('productReviewsCarousel');
if (productReviewsCarousel) {
  const productReviews = [
    { initial: 'A', name: 'Ana Paula', pill: 'Cuidadora familiar', quote: '"A troca de fórmula facilitou muito a rotina — a sonda não entope mais como antes."' },
    { initial: 'F', name: 'Fernando', pill: 'Nutricionista clínico', quote: '"Indico essa fórmula para pacientes que precisam de mais aporte nutricional, com boa tolerância."' },
    { initial: 'S', name: 'Sandra', pill: 'Enfermeira hospitalar', quote: '"A fluidez na hora de passar pela sonda economiza tempo da equipe em cada plantão."' }
  ];
  const prStarSvg = '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  productReviewsCarousel.innerHTML = productReviews.map(t => `
    <div class="testi-card">
      <div class="testi-stars">${prStarSvg.repeat(5)}</div>
      <p class="testi-quote">${t.quote}</p>
      <div class="testi-person">
        <div class="testi-avatar">${t.initial}</div>
        <div class="name">${t.name}</div>
      </div>
      <span class="testi-pill">${t.pill}</span>
    </div>`).join('');

  let prIsDown = false, prStartX = 0, prStartScroll = 0, prDragged = false;
  productReviewsCarousel.addEventListener('pointerdown', (e) => {
    prIsDown = true; prDragged = false;
    prStartX = e.clientX;
    prStartScroll = productReviewsCarousel.scrollLeft;
    productReviewsCarousel.classList.add('is-dragging');
  });
  window.addEventListener('pointermove', (e) => {
    if (!prIsDown) return;
    const dx = e.clientX - prStartX;
    if (Math.abs(dx) > 4) prDragged = true;
    productReviewsCarousel.scrollLeft = prStartScroll - dx;
  });
  window.addEventListener('pointerup', () => {
    prIsDown = false;
    productReviewsCarousel.classList.remove('is-dragging');
  });
  productReviewsCarousel.addEventListener('click', (e) => {
    if (prDragged) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  const prCardEls = Array.from(productReviewsCarousel.querySelectorAll('.testi-card'));
  const prIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        prIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  prCardEls.forEach(el => prIo.observe(el));
}

// Gooey two-blob liquid cursor, shared as ONE instance across the values-strip + testimonials
// sections combined (fixed to the viewport, fades in only while hovering that combined zone —
// no per-section duplication, so there's no seam at the boundary between the two sections)
function lerp(a, b, n) { return (1 - n) * a + n * b; }

const valuesSection = document.querySelector('.values-strip');
const testiSectionEl = document.querySelector('.testi-section');
const footerZoneEl = document.querySelector('.cta-footer-wrap');

if (valuesSection && testiSectionEl) {
  const field = document.createElement('div');
  field.className = 'cursor-blob-field';
  const blob1 = document.createElement('div');
  blob1.className = 'cursor-blob b1';
  const blob2 = document.createElement('div');
  blob2.className = 'cursor-blob b2';
  field.appendChild(blob1);
  field.appendChild(blob2);
  document.body.appendChild(field);

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let leadX = mouseX, leadY = mouseY, trailX = mouseX, trailY = mouseY;

  function zoneBounds() {
    const top = valuesSection.getBoundingClientRect().top + window.scrollY;
    const bottomEl = footerZoneEl || testiSectionEl;
    const bottom = bottomEl.getBoundingClientRect().bottom + window.scrollY;
    return { top, bottom };
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const pageY = e.clientY + window.scrollY;
    const { top, bottom } = zoneBounds();
    const inZone = pageY >= top && pageY <= bottom;
    field.classList.toggle('is-active', inZone);
    document.body.classList.toggle('blob-zone-active', inZone);

    const testiTop = testiSectionEl.getBoundingClientRect().top + window.scrollY;
    const testiBottom = testiSectionEl.getBoundingClientRect().bottom + window.scrollY;
    const inTesti = pageY >= testiTop && pageY <= testiBottom;
    field.classList.toggle('in-testi', inTesti);
  });

  function animateBlob() {
    leadX = lerp(leadX, mouseX, 0.2);
    leadY = lerp(leadY, mouseY, 0.2);
    trailX = lerp(trailX, leadX, 0.12);
    trailY = lerp(trailY, leadY, 0.12);

    blob1.style.transform = `translate(${leadX}px, ${leadY}px)`;
    blob2.style.transform = `translate(${trailX}px, ${trailY}px)`;

    requestAnimationFrame(animateBlob);
  }
  animateBlob();
}

// Falling drop through the "Uma gota de cuidado" Z-reading section
const dropZstack = document.getElementById('dropZstack');
const fallingDropZ = document.getElementById('fallingDropZ');
const zLines = dropZstack ? Array.from(dropZstack.querySelectorAll('.z-line')) : [];
const dropPlaceholders = [
  { el: document.getElementById('phTL'), at: 0.18 },
  { el: document.getElementById('phTR'), at: 0.38 },
  { el: document.getElementById('phBL'), at: 0.58 },
  { el: document.getElementById('phBR'), at: 0.76 },
];

if (dropZstack && fallingDropZ) {
  let dropZProgress = 0;
  let dropZTarget = 0;

  function updateDropZTarget() {
    const rect = dropZstack.getBoundingClientRect();
    const viewH = window.innerHeight;
    const total = rect.height + viewH * 0.35;
    const traveled = viewH - rect.top;
    dropZTarget = Math.min(1, Math.max(0, traveled / total));
  }

  window.addEventListener('scroll', updateDropZTarget, { passive: true });
  window.addEventListener('resize', updateDropZTarget);
  updateDropZTarget();

  function animateDropZ() {
    dropZProgress += (dropZTarget - dropZProgress) * 0.1;
    const stackHeight = dropZstack.offsetHeight;
    const startOffset = 260;
    const dropY = dropZProgress * (stackHeight + startOffset) - startOffset;
    fallingDropZ.style.transform = `translate(-50%, ${dropY}px) rotate(${Math.sin(dropZProgress * 10) * 5}deg)`;

    const fadeStart = 0.82;
    const dropOpacity = dropZProgress <= fadeStart ? 1 : Math.max(0, 1 - (dropZProgress - fadeStart) / (1 - fadeStart));
    fallingDropZ.style.opacity = String(dropOpacity);

    zLines.forEach(line => {
      const lineTop = line.offsetTop;
      const lineCenter = lineTop + line.offsetHeight / 2;
      if (dropY + 20 > lineCenter - 60) {
        line.classList.add('is-visible');
      }
    });

    dropPlaceholders.forEach(p => {
      if (p.el && dropZProgress > p.at) {
        p.el.classList.add('is-visible');
      }
    });

    requestAnimationFrame(animateDropZ);
  }
  animateDropZ();
}

// Custom dot cursor (desktop only) — magnetic dot + lagging ring, like an interactive footer cursor
if (window.matchMedia('(pointer: fine)').matches) {
  document.documentElement.classList.add('has-custom-cursor');
  document.body.classList.add('has-custom-cursor');
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  const cursorRing = document.createElement('div');
  cursorRing.className = 'cursor-ring';
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorRing);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let dx = mx, dy = my, rx = mx, ry = my;
  const heroZoneEl = document.querySelector('.hero');
  const heroAccentZones = [
    { selector: '.hero .btn-primary', accent: 'blue' },
    { selector: '.hero .btn-ghost, .hero .play-dot', accent: 'lime' },
    { selector: '.hero h1, .hero-eyebrow, .hero-sub', accent: 'lime' }
  ];
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (heroZoneEl) {
      const r = heroZoneEl.getBoundingClientRect();
      const inHero = e.clientY >= r.top && e.clientY <= r.bottom && e.clientX >= r.left && e.clientX <= r.right;
      document.body.classList.toggle('hero-cursor-zone', inHero);
      if (inHero) {
        const under = document.elementFromPoint(e.clientX, e.clientY);
        let accent = 'default';
        if (under) {
          for (const zone of heroAccentZones) {
            if (under.closest(zone.selector)) { accent = zone.accent; break; }
          }
        }
        document.body.setAttribute('data-hero-cursor', accent);
      }
    }
  });
  window.addEventListener('mousedown', () => cursorRing.classList.add('cursor-click'));
  window.addEventListener('mouseup', () => cursorRing.classList.remove('cursor-click'));

  function cursorLoop() {
    dx += (mx - dx) * 0.35;
    dy += (my - dy) * 0.35;
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorDot.style.transform = `translate(${dx}px, ${dy}px)`;
    cursorRing.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(cursorLoop);
  }
  cursorLoop();

  const hoverTargets = document.querySelectorAll('a, button, .benefit-card, .testi-card, .value-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
  });
}

// Editorial intro bento carousel arrows + dots (mobile)
const introBento = document.getElementById('introBento');
const introPrev = document.getElementById('introPrev');
const introNext = document.getElementById('introNext');
const introDots = document.querySelectorAll('#introDots .intro-dot');
if (introBento) {
  function introStep() {
    const first = introBento.firstElementChild;
    if (!first) return introBento.clientWidth;
    const style = getComputedStyle(introBento);
    return first.getBoundingClientRect().width + parseFloat(style.gap || 16);
  }
  function introActiveIndex() {
    const step = introStep();
    return Math.round(introBento.scrollLeft / step);
  }
  function introUpdateHeight() {
    // Only one card is visible at a time on mobile (flex:0 0 100%), but since
    // they sit in a single flex row they'd otherwise all be measured against
    // the tallest card, leaving a big blank gap under shorter ones. Match the
    // carousel's own height to whichever card is currently in view instead.
    if (window.innerWidth > 700) { introBento.style.height = ''; return; }
    const idx = introActiveIndex();
    const active = introBento.children[idx];
    if (active) introBento.style.height = active.offsetHeight + 'px';
  }
  function introUpdateDots() {
    if (introDots.length) {
      const idx = introActiveIndex();
      introDots.forEach((dot, i) => dot.classList.toggle('is-active', i === idx));
    }
    introUpdateHeight();
  }
  function introIsAtEnd() {
    const maxScroll = introBento.scrollWidth - introBento.clientWidth;
    return introBento.scrollLeft >= maxScroll - 24;
  }
  introPrev?.addEventListener('click', () => {
    if (introBento.scrollLeft <= 4) {
      introBento.scrollTo({ left: introBento.scrollWidth, behavior: 'smooth' });
    } else {
      introBento.scrollLeft = Math.max(0, introBento.scrollLeft - introStep());
    }
  });
  introNext?.addEventListener('click', () => {
    if (introIsAtEnd()) {
      introBento.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      introBento.scrollLeft = Math.min(introBento.scrollWidth, introBento.scrollLeft + introStep());
    }
  });
  introBento.addEventListener('scroll', introUpdateDots, { passive: true });
  introUpdateDots();
  window.addEventListener('load', introUpdateHeight);
  introBento.querySelectorAll('img').forEach(img => {
    if (!img.complete) img.addEventListener('load', introUpdateHeight);
  });

  // Reveal all cards together once the carousel enters view. Per-card
  // IntersectionObserver is unreliable here because cards 2-5 sit far to the
  // right inside the horizontal-scroll container and never geometrically
  // intersect the viewport until swiped to, so we observe the container once.
  const introCards = introBento.querySelectorAll('.intro-card.reveal');
  if (introCards.length && 'IntersectionObserver' in window) {
    const introBentoIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          introCards.forEach(card => card.classList.add('is-visible'));
          introBentoIo.disconnect();
        }
      });
    }, { threshold: 0.15 });
    introBentoIo.observe(introBento);
  }

  // Autoplay (mobile only): advance one card at a time, loop back at the end.
  // Runs continuously — never pauses, not even on manual interaction.
  let introTimer = null;
  function introAtEnd() {
    return introBento.scrollLeft >= introBento.scrollWidth - introBento.clientWidth - 24;
  }
  function introAutoplayTick() {
    if (window.innerWidth > 700) return;
    if (introAtEnd()) {
      introBento.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      introBento.scrollLeft += introStep();
    }
  }
  function introPlayAutoplay() {
    if (introTimer) clearInterval(introTimer);
    introTimer = null;
    if (window.innerWidth > 700) return;
    introTimer = setInterval(introAutoplayTick, 4200);
  }
  window.addEventListener('resize', () => { introPlayAutoplay(); introUpdateHeight(); });
  introPlayAutoplay();
}


// Line hub family cards carousel (bluebox-max.html, mobile) — same pattern as introBento
const lhubCardsTrack = document.getElementById('lhubCardsTrack');
const lhubCardsPrev = document.getElementById('lhubCardsPrev');
const lhubCardsNext = document.getElementById('lhubCardsNext');
const lhubCardsDots = document.querySelectorAll('#lhubCardsDots .lhub-cards-dot');
function lhubCardsStep() {
  if (!lhubCardsTrack) return 0;
  const first = lhubCardsTrack.firstElementChild;
  if (!first) return lhubCardsTrack.clientWidth;
  const style = getComputedStyle(lhubCardsTrack);
  return first.getBoundingClientRect().width + parseFloat(style.gap || 14);
}
if (lhubCardsTrack) {
  function lhubCardsUpdateDots() {
    const maxScroll = lhubCardsTrack.scrollWidth - lhubCardsTrack.clientWidth;
    if (lhubCardsDots.length) {
      const step = lhubCardsStep();
      const idx = Math.round(lhubCardsTrack.scrollLeft / step);
      lhubCardsDots.forEach((dot, i) => dot.classList.toggle('is-active', i === idx));
    }
    if (lhubCardsPrev) lhubCardsPrev.disabled = lhubCardsTrack.scrollLeft <= 4;
    if (lhubCardsNext) lhubCardsNext.disabled = lhubCardsTrack.scrollLeft >= maxScroll - 4;
  }
  lhubCardsPrev?.addEventListener('click', () => {
    lhubCardsTrack.scrollLeft = Math.max(0, lhubCardsTrack.scrollLeft - lhubCardsStep());
  });
  lhubCardsNext?.addEventListener('click', () => {
    lhubCardsTrack.scrollLeft = Math.min(lhubCardsTrack.scrollWidth, lhubCardsTrack.scrollLeft + lhubCardsStep());
  });
  lhubCardsTrack.addEventListener('scroll', lhubCardsUpdateDots, { passive: true });
  lhubCardsUpdateDots();
}

// Line hub family selector (bluebox-max.html) — click scrolls to / highlights the matching card
const lhubSelector = document.getElementById('lhubSelector');
if (lhubSelector && lhubCardsTrack) {
  const lhubSelectorItems = Array.from(lhubSelector.querySelectorAll('.lhub-selector-item'));
  const lhubCardEls = Array.from(lhubCardsTrack.querySelectorAll('.lhub-card'));

  function lhubSetActiveSelector(index) {
    lhubSelectorItems.forEach((item, i) => item.classList.toggle('is-active', i === index));
  }

  lhubSelectorItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      lhubSetActiveSelector(i);
      const card = lhubCardEls[i];
      if (!card) return;
      if (window.innerWidth <= 960) {
        lhubCardsTrack.scrollLeft = i * lhubCardsStep();
      } else {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // Only auto-sync the active tab from scroll position on mobile, where cards
  // appear one at a time in the carousel — on desktop all 3 sit side by side
  // in a grid, so "which one is in view" isn't a meaningful signal there.
  if ('IntersectionObserver' in window && lhubCardEls.length && window.innerWidth <= 960) {
    const lhubCardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = lhubCardEls.indexOf(entry.target);
          if (idx > -1) lhubSetActiveSelector(idx);
        }
      });
    }, { threshold: 0.5 });
    lhubCardEls.forEach(card => lhubCardObserver.observe(card));
  }
}

