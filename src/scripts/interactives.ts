function setPressed(button: HTMLElement, active: boolean) {
  button.classList.toggle("is-active", active);
  if (button.hasAttribute("aria-pressed")) {
    button.setAttribute("aria-pressed", active ? "true" : "false");
  }
  if (button.hasAttribute("aria-selected")) {
    button.setAttribute("aria-selected", active ? "true" : "false");
  }
  if (button.hasAttribute("aria-expanded")) {
    button.setAttribute("aria-expanded", active ? "true" : "false");
  }
}

function initExpand(root: ParentNode) {
  root
    .querySelectorAll<HTMLElement>("[data-expand-toggle]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const host =
          button.closest("[data-expand]") ??
          button.closest(".demo-decisions__item");
        if (!host) return;
        const panel = host.querySelector<HTMLElement>("[data-expand-panel]");
        if (!panel) return;
        const open = panel.hasAttribute("hidden");
        panel.hidden = !open;
        setPressed(button, open);
        const openLabel = button.querySelector<HTMLElement>(
          "[data-expand-open-label]",
        );
        const closeLabel = button.querySelector<HTMLElement>(
          "[data-expand-close-label]",
        );
        if (openLabel && closeLabel) {
          openLabel.hidden = open;
          closeLabel.hidden = !open;
        }
        const plus = button.querySelector("span[aria-hidden='true']");
        if (plus && plus.textContent && ["+", "−"].includes(plus.textContent)) {
          plus.textContent = open ? "−" : "+";
        }
      });
    });
}

function initStepSequences(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-step-sequence]").forEach((seq) => {
    seq.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest<HTMLButtonElement>("[data-step-select]");
      if (!button?.dataset.stepId) return;
      const id = button.dataset.stepId;
      seq
        .querySelectorAll<HTMLButtonElement>("[data-step-select]")
        .forEach((b) => {
          setPressed(b, b.dataset.stepId === id);
        });
      seq
        .querySelectorAll<HTMLElement>("[data-step-panel]")
        .forEach((panel) => {
          const active = panel.dataset.stepId === id;
          panel.hidden = !active;
          panel.classList.toggle("is-active", active);
        });
    });
  });
}

function initCompare(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-compare]").forEach((compare) => {
    compare.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest<HTMLButtonElement>("[data-compare-side]");
      if (!button?.dataset.compareSide) return;
      const side = button.dataset.compareSide;
      compare
        .querySelectorAll<HTMLButtonElement>("[data-compare-side]")
        .forEach((b) => setPressed(b, b.dataset.compareSide === side));
      compare
        .querySelectorAll<HTMLElement>("[data-compare-panel]")
        .forEach((panel) => {
          const active = panel.dataset.comparePanel === side;
          panel.hidden = !active;
          panel.classList.toggle("is-active", active);
        });
    });
  });
}

function initGallery(root: ParentNode) {
  root
    .querySelectorAll<HTMLElement>("[data-gallery-select]")
    .forEach((gallery) => {
      gallery.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const thumb = target.closest<HTMLButtonElement>("[data-gallery-thumb]");
        if (!thumb) return;
        const main = gallery.querySelector<HTMLImageElement>(
          "[data-gallery-main]",
        );
        const caption = gallery.querySelector<HTMLElement>(
          "[data-gallery-caption]",
        );
        if (main && thumb.dataset.src) {
          main.src = thumb.dataset.src;
          main.alt = thumb.dataset.alt ?? "";
        }
        if (caption) caption.textContent = thumb.dataset.caption ?? "";
        const inspect = gallery.querySelector<HTMLElement>(
          "[data-gallery-inspect]",
        );
        if (inspect && thumb.dataset.src) {
          inspect.dataset.lightboxSrc = thumb.dataset.src;
          inspect.dataset.lightboxAlt = thumb.dataset.alt ?? "";
          inspect.dataset.lightboxCaption = thumb.dataset.caption ?? "";
        }
        gallery
          .querySelectorAll<HTMLButtonElement>("[data-gallery-thumb]")
          .forEach((b) => setPressed(b, b === thumb));
      });
    });
}

function initBeforeAfter(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-before-after]").forEach((ba) => {
    ba.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest<HTMLButtonElement>("[data-ba-side]");
      if (!button?.dataset.baSide) return;
      const side = button.dataset.baSide;
      const image = ba.querySelector<HTMLImageElement>("[data-ba-image]");
      if (image) {
        if (side === "after") {
          image.src = image.dataset.afterSrc ?? image.src;
          image.alt = image.dataset.afterAlt ?? "";
        } else {
          image.src = image.dataset.beforeSrc ?? image.src;
          image.alt = image.dataset.beforeAlt ?? "";
        }
        const expand = ba.querySelector<HTMLElement>("[data-ba-lightbox]");
        if (expand) {
          expand.dataset.lightboxSrc = image.src;
          expand.dataset.lightboxAlt = image.alt;
        }
      }
      ba.querySelectorAll<HTMLButtonElement>("[data-ba-side]").forEach((b) =>
        setPressed(b, b.dataset.baSide === side),
      );
    });
  });
}

function initTimeline(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-timeline]").forEach((timeline) => {
    timeline.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest<HTMLButtonElement>(
        "[data-timeline-select]",
      );
      if (!button?.dataset.timelineId) return;
      const id = button.dataset.timelineId;
      timeline
        .querySelectorAll<HTMLElement>(".demo-timeline__item")
        .forEach((item) => {
          const marker = item.querySelector<HTMLButtonElement>(
            "[data-timeline-select]",
          );
          const body = item.querySelector<HTMLElement>("[data-timeline-body]");
          const active = marker?.dataset.timelineId === id;
          item.classList.toggle("is-active", !!active);
          if (marker) setPressed(marker, !!active);
          if (body) body.hidden = !active;
        });
    });
  });
}

function initAnnotate(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-annotate]").forEach((annotate) => {
    annotate.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest<HTMLButtonElement>(
        "[data-annotate-select]",
      );
      if (!button?.dataset.annotateId) return;
      const id = button.dataset.annotateId;
      annotate
        .querySelectorAll<HTMLButtonElement>("[data-annotate-select]")
        .forEach((b) => setPressed(b, b.dataset.annotateId === id));
      annotate
        .querySelectorAll<HTMLElement>("[data-annotate-body]")
        .forEach((body) => {
          const active = body.dataset.annotateId === id;
          body.hidden = !active;
          body.classList.toggle("is-active", active);
        });
    });
  });
}

function initConcepts(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-concepts]").forEach((concepts) => {
    concepts.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest<HTMLButtonElement>("[data-concept-select]");
      if (!button?.dataset.conceptId) return;
      const id = button.dataset.conceptId;
      concepts
        .querySelectorAll<HTMLButtonElement>("[data-concept-select]")
        .forEach((b) => setPressed(b, b.dataset.conceptId === id));
      concepts
        .querySelectorAll<HTMLElement>("[data-concept-body]")
        .forEach((body) => {
          const active = body.dataset.conceptId === id;
          body.hidden = !active;
          body.classList.toggle("is-active", active);
        });
    });
  });
}

function initGlossary(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-glossary]").forEach((glossary) => {
    glossary.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest<HTMLButtonElement>(
        "[data-glossary-select]",
      );
      if (!button?.dataset.glossaryId) return;
      const id = button.dataset.glossaryId;
      glossary
        .querySelectorAll<HTMLButtonElement>("[data-glossary-select]")
        .forEach((b) => setPressed(b, b.dataset.glossaryId === id));
      glossary
        .querySelectorAll<HTMLElement>("[data-glossary-def]")
        .forEach((def) => {
          def.hidden = def.dataset.glossaryId !== id;
        });
    });
  });
}

function initParams(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-params]").forEach((params) => {
    params.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest<HTMLButtonElement>("[data-param-select]");
      if (!button?.dataset.paramId) return;
      const id = button.dataset.paramId;
      params
        .querySelectorAll<HTMLButtonElement>("[data-param-select]")
        .forEach((b) => setPressed(b, b.dataset.paramId === id));
      params
        .querySelectorAll<HTMLElement>("[data-param-body]")
        .forEach((body) => {
          body.hidden = body.dataset.paramId !== id;
        });
    });
  });
}

function initYoutube(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-youtube-embed]").forEach((host) => {
    const load = host.querySelector<HTMLButtonElement>("[data-youtube-load]");
    const player = host.querySelector<HTMLElement>("[data-youtube-player]");
    const id = host.dataset.youtubeId;
    if (!load || !player || !id) return;
    load.addEventListener("click", () => {
      if (player.querySelector("iframe")) return;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0`;
      iframe.title =
        load.querySelector(".media-frame__youtube-label")?.textContent ??
        "Demo video";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      player.append(iframe);
      player.hidden = false;
      load.hidden = true;
    });
  });
}

function initInteractives(root: ParentNode = document) {
  initExpand(root);
  initStepSequences(root);
  initCompare(root);
  initGallery(root);
  initBeforeAfter(root);
  initTimeline(root);
  initAnnotate(root);
  initConcepts(root);
  initGlossary(root);
  initParams(root);
  initYoutube(root);
}

initInteractives();
