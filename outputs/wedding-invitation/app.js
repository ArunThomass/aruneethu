(() => {
  "use strict";

  const config = window.WEDDING_CONFIG;
  if (!config) return;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const getValue = (path) => path.split(".").reduce((value, key) => value?.[key], config);

  function setBoundContent() {
    $$('[data-bind]').forEach((element) => {
      const value = getValue(element.dataset.bind);
      if (value !== undefined) element.textContent = value;
    });

    $$('[data-bind-href]').forEach((element) => {
      const value = getValue(element.dataset.bindHref);
      if (value) element.href = value;
    });

    document.title = config.siteTitle;
    $("meta[name='description']")?.setAttribute("content", config.siteDescription);
    $("meta[property='og:title']")?.setAttribute("content", config.siteTitle);
    $("meta[property='og:description']")?.setAttribute("content", config.siteDescription);
    $("meta[property='og:url']")?.setAttribute("content", config.siteUrl);
    $("meta[name='twitter:title']")?.setAttribute("content", config.siteTitle);
    $("meta[name='twitter:description']")?.setAttribute("content", config.siteDescription);
    $("link[rel='canonical']")?.setAttribute("href", config.siteUrl);

    const openGraphImage = new URL(config.ogImage, config.siteUrl).href;
    $("meta[property='og:image']")?.setAttribute("content", openGraphImage);
    $("meta[name='twitter:image']")?.setAttribute("content", openGraphImage);

    Object.entries(config.theme).forEach(([name, value]) => {
      document.documentElement.style.setProperty(`--${name}`, value);
    });
  }

  function makeCoverPetals() {
    const container = $("#cover-petals");
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let index = 0; index < 16; index += 1) {
      const petal = document.createElement("span");
      petal.className = "cover__petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.setProperty("--fall-duration", `${11 + Math.random() * 10}s`);
      petal.style.setProperty("--fall-delay", `${-Math.random() * 18}s`);
      petal.style.setProperty("--fall-drift", `${-7 + Math.random() * 14}vw`);
      petal.style.background = index % 3 === 0 ? "#d9ca9e" : index % 2 ? "#a891bd" : "#f1dfd5";
      container.append(petal);
    }
  }

  function populateGallery() {
    const gallery = $("#gallery");
    if (!gallery) return;

    config.assets.gallery.forEach((photo, index) => {
      const figure = document.createElement("figure");
      figure.className = "gallery__item reveal-on-scroll";
      const image = document.createElement("img");
      image.src = photo.src;
      image.alt = photo.alt;
      image.loading = "lazy";
      image.decoding = "async";
      image.style.objectPosition = photo.position || "50% 50%";
      figure.append(image);
      gallery.append(figure);
      if (index === 0) image.fetchPriority = "low";
    });
  }

  function setupRevealObserver() {
    const elements = $$(".reveal-on-scroll");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
  }

  function setupCountdown() {
    const targetTime = new Date(config.wedding.eventStart).getTime();
    const targets = {
      days: $('[data-countdown="days"]'),
      hours: $('[data-countdown="hours"]'),
      minutes: $('[data-countdown="minutes"]'),
      seconds: $('[data-countdown="seconds"]'),
    };
    const ended = $("#countdown-ended");

    const update = () => {
      const remaining = Math.max(0, targetTime - Date.now());
      const values = {
        days: Math.floor(remaining / 86_400_000),
        hours: Math.floor((remaining % 86_400_000) / 3_600_000),
        minutes: Math.floor((remaining % 3_600_000) / 60_000),
        seconds: Math.floor((remaining % 60_000) / 1_000),
      };

      Object.entries(values).forEach(([unit, value]) => {
        if (targets[unit]) targets[unit].textContent = String(value).padStart(unit === "days" ? 3 : 2, "0");
      });
      if (remaining === 0 && ended) ended.hidden = false;
    };

    update();
    window.setInterval(update, 1000);
  }

  function setupMusic() {
    const audio = $("#background-music");
    const toggle = $("#music-toggle");
    const status = $("#music-status");
    if (!audio || !toggle) return;

    audio.src = config.assets.music;
    const syncState = () => {
      const playing = !audio.paused;
      toggle.classList.toggle("is-playing", playing);
      toggle.setAttribute("aria-pressed", String(playing));
      toggle.setAttribute("aria-label", playing ? config.copy.musicOnLabel : config.copy.musicOffLabel);
      if (status) status.textContent = playing ? config.copy.musicOnLabel : config.copy.musicOffLabel;
    };
    const tryToPlay = async () => {
      try { await audio.play(); } catch { /* Audio remains optional if a browser refuses playback. */ }
      syncState();
    };

    toggle.addEventListener("click", () => {
      if (audio.paused) tryToPlay();
      else {
        audio.pause();
        syncState();
      }
    });
    audio.addEventListener("play", syncState);
    audio.addEventListener("pause", syncState);
    return { tryToPlay, toggle };
  }

  function createPetalBurst() {
    const burst = $("#petal-burst");
    if (!burst || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    burst.replaceChildren();
    const colours = ["#b59bc8", "#f2d9ce", "#d9bc73", "#f4efd9"];
    for (let index = 0; index < 24; index += 1) {
      const petal = document.createElement("span");
      const angle = (Math.PI * 2 * index) / 24 + (Math.random() - .5) * .35;
      const distance = 95 + Math.random() * 145;
      petal.className = "burst-petal";
      petal.style.setProperty("--burst-x", `${Math.cos(angle) * distance}px`);
      petal.style.setProperty("--burst-y", `${Math.sin(angle) * distance}px`);
      petal.style.setProperty("--burst-rotation", `${-180 + Math.random() * 520}deg`);
      petal.style.setProperty("--petal-color", colours[index % colours.length]);
      petal.style.animationDelay = `${Math.random() * .18}s`;
      burst.append(petal);
    }
  }

  function setupScratchCard() {
    const card = $("#scratch-card");
    const canvas = $("#scratch-canvas");
    const revealButton = $("#reveal-date");
    if (!card || !canvas || !revealButton) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    let hasRevealed = false;
    let drawing = false;

    const drawScratchLayer = () => {
      if (hasRevealed) return;
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      context.globalCompositeOperation = "source-over";
      const background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      background.addColorStop(0, "#71846d");
      background.addColorStop(.5, "#405846");
      background.addColorStop(1, "#263a2b");
      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.globalAlpha = .16;
      context.strokeStyle = "#e9d8a6";
      context.lineWidth = Math.max(1, 1.2 * ratio);
      for (let position = -canvas.height; position < canvas.width; position += 42 * ratio) {
        context.beginPath();
        context.moveTo(position, 0);
        context.lineTo(position + canvas.height, canvas.height);
        context.stroke();
      }
      context.globalAlpha = 1;
    };

    const reveal = () => {
      if (hasRevealed) return;
      hasRevealed = true;
      card.classList.add("is-revealed");
      canvas.setAttribute("aria-hidden", "true");
      revealButton.disabled = true;
      createPetalBurst();
    };

    const eraseAt = (event) => {
      if (hasRevealed) return;
      const rect = canvas.getBoundingClientRect();
      const ratio = canvas.width / rect.width;
      const x = (event.clientX - rect.left) * ratio;
      const y = (event.clientY - rect.top) * ratio;
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x, y, 32 * ratio, 0, Math.PI * 2);
      context.fill();
    };

    const scratchPercent = () => {
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      let sampled = 0;
      const stride = 32;
      for (let index = 3; index < pixels.length; index += stride) {
        sampled += 1;
        if (pixels[index] < 100) transparent += 1;
      }
      return transparent / sampled;
    };

    canvas.addEventListener("pointerdown", (event) => {
      if (hasRevealed) return;
      drawing = true;
      canvas.setPointerCapture?.(event.pointerId);
      eraseAt(event);
    });
    canvas.addEventListener("pointermove", (event) => {
      if (drawing) eraseAt(event);
    });
    canvas.addEventListener("pointerup", () => {
      drawing = false;
      if (scratchPercent() > .38) reveal();
    });
    canvas.addEventListener("pointercancel", () => { drawing = false; });
    revealButton.addEventListener("click", reveal);
    drawScratchLayer();
    window.addEventListener("resize", drawScratchLayer, { passive: true });
  }

  function setupOpening(music) {
    const cover = $("#cover");
    const openButton = $("#open-invitation");
    const musicToggle = music?.toggle;
    if (!cover || !openButton) return;

    openButton.addEventListener("click", () => {
      // A browser can restore a previous scroll position on refresh. The invitation
      // always opens at its beginning, so the cover never reveals a mid-page state.
      window.scrollTo(0, 0);
      document.body.classList.remove("invitation-sealed");
      document.body.classList.add("invitation-opened");
      cover.setAttribute("aria-hidden", "true");
      if (musicToggle) musicToggle.hidden = false;
      music?.tryToPlay();
    }, { once: true });
  }

  document.documentElement.classList.add("js");
  setBoundContent();
  populateGallery();
  makeCoverPetals();
  setupRevealObserver();
  setupCountdown();
  setupScratchCard();
  setupOpening(setupMusic());
})();
