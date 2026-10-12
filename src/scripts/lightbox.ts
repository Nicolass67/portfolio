/**
 * Accessible full-size image lightbox (native <dialog>).
 * Triggers: [data-lightbox-open] with data-lightbox-src / alt / caption.
 */

function labels(locale: string) {
  const fr = locale.startsWith("fr");
  return {
    close: fr ? "Fermer" : "Close",
    dialog: fr ? "Aperçu de l’image" : "Image preview",
    failed: fr
      ? "L’image n’a pas pu être chargée."
      : "The image could not be loaded.",
  };
}

function ensureDialog(): HTMLDialogElement {
  let dialog = document.querySelector<HTMLDialogElement>("[data-lightbox]");
  if (dialog) return dialog;

  const locale = document.documentElement.lang || "fr";
  const t = labels(locale);

  dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("data-lightbox", "");
  dialog.setAttribute("aria-label", t.dialog);
  dialog.innerHTML = `
    <div class="lightbox__panel" data-lightbox-panel>
      <button type="button" class="lightbox__close" data-lightbox-close aria-label="${t.close}">
        <span aria-hidden="true">×</span>
      </button>
      <figure class="lightbox__figure">
        <img class="lightbox__image" data-lightbox-image alt="" hidden />
        <div class="lightbox__fallback" data-lightbox-fallback hidden>
          <p class="lightbox__fallback-mark" aria-hidden="true">◇</p>
          <p class="lightbox__fallback-label">${t.failed}</p>
        </div>
        <figcaption class="lightbox__caption" data-lightbox-caption hidden></figcaption>
      </figure>
    </div>
  `;
  document.body.appendChild(dialog);
  return dialog;
}

let lastTrigger: HTMLElement | null = null;

function closeLightbox(dialog: HTMLDialogElement) {
  if (!dialog.open) return;
  dialog.close();
  document.documentElement.classList.remove("is-lightbox-open");
  const trigger = lastTrigger;
  lastTrigger = null;
  if (trigger && typeof trigger.focus === "function") {
    trigger.focus({ preventScroll: true });
  }
}

function openLightbox(
  dialog: HTMLDialogElement,
  src: string,
  alt: string,
  caption: string,
  trigger: HTMLElement,
) {
  const img = dialog.querySelector<HTMLImageElement>("[data-lightbox-image]");
  const fallback = dialog.querySelector<HTMLElement>(
    "[data-lightbox-fallback]",
  );
  const captionEl = dialog.querySelector<HTMLElement>(
    "[data-lightbox-caption]",
  );
  if (!img || !fallback || !captionEl) return;

  lastTrigger = trigger;
  fallback.hidden = true;
  img.hidden = false;
  img.removeAttribute("src");
  img.alt = alt;
  img.onload = () => {
    img.hidden = false;
    fallback.hidden = true;
  };
  img.onerror = () => {
    img.hidden = true;
    fallback.hidden = false;
  };
  img.src = src;

  if (caption.trim()) {
    captionEl.hidden = false;
    captionEl.textContent = caption;
  } else {
    captionEl.hidden = true;
    captionEl.textContent = "";
  }

  document.documentElement.classList.add("is-lightbox-open");
  if (!dialog.open) {
    dialog.showModal();
  }
  dialog.querySelector<HTMLButtonElement>("[data-lightbox-close]")?.focus();
}

export function initLightbox() {
  const dialog = ensureDialog();

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

    const openBtn = target.closest<HTMLElement>("[data-lightbox-open]");
    if (openBtn) {
      // Gallery thumbs change featured media — do not open lightbox.
      if (openBtn.closest("[data-gallery-thumb]")) return;
      const src = openBtn.dataset.lightboxSrc?.trim();
      if (!src) return;
      event.preventDefault();
      openLightbox(
        dialog,
        src,
        openBtn.dataset.lightboxAlt ?? "",
        openBtn.dataset.lightboxCaption ?? "",
        openBtn,
      );
      return;
    }

    // Backdrop click (dialog itself, outside panel).
    if (target === dialog) {
      closeLightbox(dialog);
    }
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeLightbox(dialog);
  });

  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("is-lightbox-open");
  });
}

initLightbox();
