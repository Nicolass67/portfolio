/**
 * Accessible full-size image lightbox (native <dialog>).
 * Triggers: [data-lightbox-open] with data-lightbox-src / alt / caption.
 * Multi-image groups: siblings in [data-lightbox-group], .media-frame__gallery,
 * or [data-gallery-select] thumbs — prev/next with directional crossfade.
 */

type LightboxItem = {
  src: string;
  alt: string;
  caption: string;
};

type Labels = ReturnType<typeof labels>;

function labels(locale: string) {
  const fr = locale.startsWith("fr");
  return {
    close: fr ? "Fermer" : "Close",
    dialog: fr ? "Aperçu de l’image" : "Image preview",
    failed: fr
      ? "L’image n’a pas pu être chargée."
      : "The image could not be loaded.",
    prev: fr ? "Image précédente" : "Previous image",
    next: fr ? "Image suivante" : "Next image",
    counter: (current: number, total: number) =>
      fr ? `${current} / ${total}` : `${current} / ${total}`,
  };
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clearSelection() {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    selection.removeAllRanges();
  }
}

function ensureDialog(t: Labels): HTMLDialogElement {
  let dialog = document.querySelector<HTMLDialogElement>("[data-lightbox]");
  if (dialog) return dialog;

  dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("data-lightbox", "");
  dialog.setAttribute("aria-label", t.dialog);
  dialog.innerHTML = `
    <div class="lightbox__panel" data-lightbox-panel>
      <button type="button" class="lightbox__close" data-lightbox-close aria-label="${t.close}">
        <span aria-hidden="true">×</span>
      </button>
      <button type="button" class="lightbox__nav lightbox__nav--prev" data-lightbox-prev aria-label="${t.prev}" hidden>
        <span class="lightbox__nav-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 5.5 8 12l6.5 6.5"/>
          </svg>
        </span>
      </button>
      <button type="button" class="lightbox__nav lightbox__nav--next" data-lightbox-next aria-label="${t.next}" hidden>
        <span class="lightbox__nav-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9.5 5.5 16 12l-6.5 6.5"/>
          </svg>
        </span>
      </button>
      <figure class="lightbox__figure">
        <div class="lightbox__stage" data-lightbox-stage>
          <img class="lightbox__image is-active" data-lightbox-image data-layer="a" alt="" draggable="false" hidden />
          <img class="lightbox__image" data-lightbox-image data-layer="b" alt="" draggable="false" hidden />
          <div class="lightbox__fallback" data-lightbox-fallback hidden>
            <p class="lightbox__fallback-mark" aria-hidden="true">◇</p>
            <p class="lightbox__fallback-label">${t.failed}</p>
          </div>
        </div>
        <figcaption class="lightbox__caption" data-lightbox-caption hidden></figcaption>
        <p class="lightbox__counter" data-lightbox-counter aria-live="polite" hidden></p>
      </figure>
    </div>
  `;
  document.body.appendChild(dialog);
  return dialog;
}

let lastTrigger: HTMLElement | null = null;
let items: LightboxItem[] = [];
let currentIndex = 0;
let activeLayer: "a" | "b" = "a";
let isAnimating = false;
let touchStartX: number | null = null;
let touchStartY: number | null = null;

function getLayers(dialog: HTMLDialogElement) {
  const a = dialog.querySelector<HTMLImageElement>(
    '[data-lightbox-image][data-layer="a"]',
  );
  const b = dialog.querySelector<HTMLImageElement>(
    '[data-lightbox-image][data-layer="b"]',
  );
  const fallback = dialog.querySelector<HTMLElement>(
    "[data-lightbox-fallback]",
  );
  const captionEl = dialog.querySelector<HTMLElement>(
    "[data-lightbox-caption]",
  );
  const counterEl = dialog.querySelector<HTMLElement>(
    "[data-lightbox-counter]",
  );
  const prevBtn = dialog.querySelector<HTMLButtonElement>(
    "[data-lightbox-prev]",
  );
  const nextBtn = dialog.querySelector<HTMLButtonElement>(
    "[data-lightbox-next]",
  );
  const stage = dialog.querySelector<HTMLElement>("[data-lightbox-stage]");
  return { a, b, fallback, captionEl, counterEl, prevBtn, nextBtn, stage };
}

function activeImage(dialog: HTMLDialogElement): HTMLImageElement | null {
  const { a, b } = getLayers(dialog);
  if (!a || !b) return null;
  return activeLayer === "a" ? a : b;
}

function inactiveImage(dialog: HTMLDialogElement): HTMLImageElement | null {
  const { a, b } = getLayers(dialog);
  if (!a || !b) return null;
  return activeLayer === "a" ? b : a;
}

function collectGroup(trigger: HTMLElement): {
  items: LightboxItem[];
  index: number;
} {
  const single: LightboxItem = {
    src: trigger.dataset.lightboxSrc?.trim() ?? "",
    alt: trigger.dataset.lightboxAlt ?? "",
    caption: trigger.dataset.lightboxCaption ?? "",
  };
  if (!single.src) return { items: [], index: 0 };

  const gallerySelect = trigger.closest<HTMLElement>("[data-gallery-select]");
  if (gallerySelect) {
    const thumbs = [
      ...gallerySelect.querySelectorAll<HTMLElement>("[data-gallery-thumb]"),
    ];
    if (thumbs.length > 1) {
      const group = thumbs
        .map((thumb) => ({
          src: thumb.dataset.src?.trim() ?? "",
          alt: thumb.dataset.alt ?? "",
          caption: thumb.dataset.caption ?? "",
        }))
        .filter((item) => item.src.length > 0);
      if (group.length > 1) {
        let index = group.findIndex((item) => item.src === single.src);
        if (index < 0) index = 0;
        return { items: group, index };
      }
    }
  }

  const groupRoot = trigger.closest<HTMLElement>(
    "[data-lightbox-group], .media-frame__gallery",
  );
  if (groupRoot) {
    const buttons = [
      ...groupRoot.querySelectorAll<HTMLElement>("[data-lightbox-open]"),
    ].filter((btn) => !btn.closest("[data-gallery-thumb]"));
    const group = buttons
      .map((btn) => ({
        src: btn.dataset.lightboxSrc?.trim() ?? "",
        alt: btn.dataset.lightboxAlt ?? "",
        caption: btn.dataset.lightboxCaption ?? "",
      }))
      .filter((item) => item.src.length > 0);
    if (group.length > 1) {
      let index = group.findIndex((item) => item.src === single.src);
      if (index < 0) {
        index = buttons.indexOf(trigger);
        if (index < 0) index = 0;
      }
      return { items: group, index };
    }
  }

  return { items: [single], index: 0 };
}

function preload(src: string) {
  if (!src) return;
  const img = new Image();
  img.decoding = "async";
  img.src = src;
}

function preloadNeighbors() {
  if (items.length < 2) return;
  const prev = items[(currentIndex - 1 + items.length) % items.length];
  const next = items[(currentIndex + 1) % items.length];
  preload(prev.src);
  preload(next.src);
}

function updateChrome(dialog: HTMLDialogElement, t: Labels) {
  const { captionEl, counterEl, prevBtn, nextBtn } = getLayers(dialog);
  if (!captionEl || !counterEl || !prevBtn || !nextBtn) return;

  const item = items[currentIndex];
  if (!item) return;

  if (item.caption.trim()) {
    captionEl.hidden = false;
    captionEl.textContent = item.caption;
  } else {
    captionEl.hidden = true;
    captionEl.textContent = "";
  }

  const multi = items.length > 1;
  prevBtn.hidden = !multi;
  nextBtn.hidden = !multi;
  dialog.classList.toggle("lightbox--multi", multi);

  if (multi) {
    counterEl.hidden = false;
    counterEl.textContent = t.counter(currentIndex + 1, items.length);
  } else {
    counterEl.hidden = true;
    counterEl.textContent = "";
  }
}

function bindImageHandlers(img: HTMLImageElement, fallback: HTMLElement) {
  img.onload = () => {
    img.hidden = false;
    fallback.hidden = true;
  };
  img.onerror = () => {
    img.hidden = true;
    fallback.hidden = false;
  };
}

function showItemInstant(dialog: HTMLDialogElement, item: LightboxItem) {
  const { a, b, fallback } = getLayers(dialog);
  if (!a || !b || !fallback) return;

  const active = activeLayer === "a" ? a : b;
  const inactive = activeLayer === "a" ? b : a;

  inactive.hidden = true;
  inactive.classList.remove(
    "is-active",
    "is-enter-from-left",
    "is-enter-from-right",
    "is-exit-to-left",
    "is-exit-to-right",
  );
  inactive.removeAttribute("src");

  fallback.hidden = true;
  active.hidden = false;
  active.classList.add("is-active");
  active.classList.remove(
    "is-enter-from-left",
    "is-enter-from-right",
    "is-exit-to-left",
    "is-exit-to-right",
  );
  bindImageHandlers(active, fallback);
  active.alt = item.alt;
  if (active.getAttribute("src") !== item.src) {
    active.src = item.src;
  } else {
    active.hidden = false;
    fallback.hidden = true;
  }
}

function waitForImage(img: HTMLImageElement, src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (
      img.getAttribute("src") === src &&
      img.complete &&
      img.naturalWidth > 0
    ) {
      resolve(true);
      return;
    }
    const onLoad = () => {
      cleanup();
      resolve(true);
    };
    const onError = () => {
      cleanup();
      resolve(false);
    };
    const cleanup = () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    img.src = src;
  });
}

function waitTransition(el: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      el.removeEventListener("transitionend", onEnd);
      resolve();
    };
    const onEnd = (event: TransitionEvent) => {
      if (event.target !== el) return;
      if (
        event.propertyName !== "opacity" &&
        event.propertyName !== "transform"
      ) {
        return;
      }
      finish();
    };
    el.addEventListener("transitionend", onEnd);
    window.setTimeout(finish, 420);
  });
}

async function navigate(
  dialog: HTMLDialogElement,
  direction: -1 | 1,
  t: Labels,
) {
  if (items.length < 2 || isAnimating) return;

  const nextIndex = (currentIndex + direction + items.length) % items.length;
  const item = items[nextIndex];
  if (!item) return;

  const { fallback, stage } = getLayers(dialog);
  const outgoing = activeImage(dialog);
  const incoming = inactiveImage(dialog);
  if (!fallback || !outgoing || !incoming || !stage) return;

  if (prefersReducedMotion()) {
    currentIndex = nextIndex;
    showItemInstant(dialog, item);
    updateChrome(dialog, t);
    preloadNeighbors();
    return;
  }

  isAnimating = true;
  stage.classList.add("is-animating");
  dialog.classList.add("is-navigating");

  const exitClass = direction > 0 ? "is-exit-to-left" : "is-exit-to-right";
  const enterClass =
    direction > 0 ? "is-enter-from-right" : "is-enter-from-left";

  incoming.alt = item.alt;
  incoming.hidden = false;
  incoming.classList.remove(
    "is-active",
    "is-exit-to-left",
    "is-exit-to-right",
    "is-enter-from-left",
    "is-enter-from-right",
  );
  // Force start pose before animating in.
  incoming.classList.add(enterClass);
  void incoming.offsetWidth;

  const loaded = await waitForImage(incoming, item.src);

  outgoing.classList.add(exitClass);
  outgoing.classList.remove("is-active");

  if (loaded) {
    fallback.hidden = true;
    incoming.hidden = false;
    incoming.classList.add("is-active");
    incoming.classList.remove(enterClass);
  } else {
    incoming.classList.remove(enterClass, "is-active");
    incoming.hidden = true;
    fallback.hidden = false;
  }

  await Promise.all([
    waitTransition(outgoing),
    loaded ? waitTransition(incoming) : Promise.resolve(),
  ]);

  outgoing.hidden = true;
  outgoing.classList.remove(exitClass);
  outgoing.removeAttribute("src");
  outgoing.alt = "";

  activeLayer = incoming.dataset.layer === "b" ? "b" : "a";
  currentIndex = nextIndex;
  updateChrome(dialog, t);
  preloadNeighbors();

  stage.classList.remove("is-animating");
  dialog.classList.remove("is-navigating");
  isAnimating = false;
}

function closeLightbox(dialog: HTMLDialogElement) {
  if (!dialog.open) return;
  dialog.close();
  document.documentElement.classList.remove("is-lightbox-open");
  items = [];
  currentIndex = 0;
  isAnimating = false;
  const trigger = lastTrigger;
  lastTrigger = null;
  if (trigger && typeof trigger.focus === "function") {
    trigger.focus({ preventScroll: true });
  }
}

function openLightbox(
  dialog: HTMLDialogElement,
  trigger: HTMLElement,
  t: Labels,
) {
  const group = collectGroup(trigger);
  if (group.items.length === 0) return;

  items = group.items;
  currentIndex = group.index;
  activeLayer = "a";
  lastTrigger = trigger;

  const { a, b, fallback } = getLayers(dialog);
  if (!a || !b || !fallback) return;

  b.hidden = true;
  b.classList.remove("is-active");
  b.removeAttribute("src");
  a.classList.add("is-active");

  showItemInstant(dialog, items[currentIndex]!);
  updateChrome(dialog, t);
  preloadNeighbors();

  document.documentElement.classList.add("is-lightbox-open");
  if (!dialog.open) {
    dialog.showModal();
  }
  dialog.querySelector<HTMLButtonElement>("[data-lightbox-close]")?.focus();
}

export function initLightbox() {
  const locale = document.documentElement.lang || "fr";
  const t = labels(locale);
  const dialog = ensureDialog(t);
  const { prevBtn, nextBtn, stage } = getLayers(dialog);

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    // Video / YouTube controls must never open the image lightbox.
    if (
      target.closest(
        "[data-youtube-load], [data-youtube-embed], .media-frame--video-slot, video, iframe",
      )
    ) {
      return;
    }

    const closeBtn = target.closest<HTMLElement>("[data-lightbox-close]");
    if (closeBtn) {
      event.preventDefault();
      closeLightbox(dialog);
      return;
    }

    const prev = target.closest<HTMLElement>("[data-lightbox-prev]");
    if (prev) {
      event.preventDefault();
      clearSelection();
      void navigate(dialog, -1, t);
      return;
    }

    const next = target.closest<HTMLElement>("[data-lightbox-next]");
    if (next) {
      event.preventDefault();
      clearSelection();
      void navigate(dialog, 1, t);
      return;
    }

    const openBtn = target.closest<HTMLElement>("[data-lightbox-open]");
    if (openBtn) {
      // Gallery thumbs change featured media — do not open lightbox.
      if (openBtn.closest("[data-gallery-thumb]")) return;
      const src = openBtn.dataset.lightboxSrc?.trim();
      if (!src) return;
      event.preventDefault();
      openLightbox(dialog, openBtn, t);
      return;
    }

    // Backdrop click (dialog itself, outside panel).
    if (target === dialog) {
      closeLightbox(dialog);
    }
  });

  dialog.addEventListener("selectstart", (event) => {
    event.preventDefault();
  });

  dialog.addEventListener("dragstart", (event) => {
    if (event.target instanceof HTMLImageElement) {
      event.preventDefault();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (!dialog.open || items.length < 2) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      clearSelection();
      void navigate(dialog, -1, t);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      clearSelection();
      void navigate(dialog, 1, t);
    }
  });

  if (stage) {
    stage.addEventListener(
      "touchstart",
      (event) => {
        if (!dialog.open || items.length < 2 || event.touches.length !== 1) {
          return;
        }
        const touch = event.touches[0];
        if (!touch) return;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      },
      { passive: true },
    );

    stage.addEventListener(
      "touchend",
      (event) => {
        if (
          touchStartX === null ||
          touchStartY === null ||
          !dialog.open ||
          items.length < 2
        ) {
          touchStartX = null;
          touchStartY = null;
          return;
        }
        const touch = event.changedTouches[0];
        if (!touch) {
          touchStartX = null;
          touchStartY = null;
          return;
        }
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
        touchStartX = null;
        touchStartY = null;
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
        void navigate(dialog, dx < 0 ? 1 : -1, t);
      },
      { passive: true },
    );
  }

  prevBtn?.addEventListener("pointerenter", () => preloadNeighbors());
  nextBtn?.addEventListener("pointerenter", () => preloadNeighbors());

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeLightbox(dialog);
  });

  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("is-lightbox-open");
    items = [];
    currentIndex = 0;
    isAnimating = false;
  });
}

initLightbox();
