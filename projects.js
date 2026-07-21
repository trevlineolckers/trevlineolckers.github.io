(() => {
  const panels = document.querySelectorAll(".panel");
  const lightbox = document.getElementById("lightbox");

  if (!panels.length || !lightbox) return;

  const imgEl = document.getElementById("lightboxImg");
  const titleEl = document.getElementById("lbTitle");
  const dateEl = document.getElementById("lbDate");
  const textEl = document.getElementById("lbText");
  const countEl = document.getElementById("lbCount");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let images = [];
  let currentIndex = 0;

  const render = () => {
    const item = images[currentIndex];
    if (!item) return;

    imgEl.src = item.src;
    imgEl.alt = item.title || "";

    titleEl.textContent = item.title || "";
    dateEl.textContent = item.date || "";
    textEl.textContent = item.text || "";
    countEl.textContent = `${currentIndex + 1} / ${images.length}`;
  };

  const open = (newImages) => {
    images = Array.isArray(newImages) ? newImages : [];
    currentIndex = 0;

    lightbox.setAttribute("aria-hidden", "false");
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";

    render();
  };

  const close = () => {
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    imgEl.removeAttribute("src");
  };

  const prev = () => {
    if (!images.length) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    render();
  };

  const next = () => {
    if (!images.length) return;
    currentIndex = (currentIndex + 1) % images.length;
    render();
  };

  panels.forEach((panel) => {
    panel.addEventListener("click", () => {
      const raw = panel.getAttribute("data-images");
      if (!raw) return;

      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (e) {
        console.error("data-images JSON is invalid:", e);
        return;
      }

      open(parsed);
    });
  });

  lightbox.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.matches("[data-close]")) close();
  });

  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);

  document.addEventListener("keydown", (e) => {
    const isOpen = lightbox.getAttribute("aria-hidden") === "false";
    if (!isOpen) return;

    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();