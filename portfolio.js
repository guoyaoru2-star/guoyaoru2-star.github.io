const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const portfolioGrid = document.querySelector("[data-portfolio-grid]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxMeta = document.querySelector("[data-lightbox-meta]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const closeLightbox = document.querySelector("[data-lightbox-close]");
const previousWork = document.querySelector("[data-lightbox-prev]");
const nextWork = document.querySelector("[data-lightbox-next]");

let portfolioItems = [];
let visibleItems = [];
let activeIndex = 0;

function openWork(item) {
  if (!lightbox || !lightboxImage || !item) return;
  const image = item.querySelector("img");
  const meta = item.querySelector("i");
  const title = item.querySelector("b");
  activeIndex = visibleItems.indexOf(item);
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxMeta.textContent = meta.textContent;
  lightboxTitle.textContent = title.textContent;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeWork() {
  lightbox?.classList.remove("is-open");
  lightbox?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

function moveWork(direction) {
  if (!visibleItems.length) return;
  activeIndex = (activeIndex + direction + visibleItems.length) % visibleItems.length;
  openWork(visibleItems[activeIndex]);
}

function renderPortfolio(works) {
  if (!portfolioGrid) return;
  portfolioGrid.innerHTML = works
    .map((work, index) => {
      const wideClass = index % 7 === 0 || index % 11 === 0 ? " wide" : "";
      const loading = index < 4 ? "eager" : "lazy";
      return `
        <button class="portfolio-item${wideClass}" type="button" data-category="${work.category}" data-work="${work.id}">
          <img src="${work.file}" alt="${work.title}" loading="${loading}" width="${work.width}" height="${work.height}" />
          <span><i>${work.categoryLabel} / ${String(work.categoryIndex).padStart(2, "0")}</i><b>${work.title}</b></span>
        </button>`;
    })
    .join("");

  portfolioItems = Array.from(portfolioGrid.querySelectorAll("[data-work]"));
  visibleItems = [...portfolioItems];
  portfolioItems.forEach((item) => item.addEventListener("click", () => openWork(item)));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    portfolioItems.forEach((item) => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
    visibleItems = portfolioItems.filter((item) => !item.hidden);
  });
});

closeLightbox?.addEventListener("click", closeWork);
previousWork?.addEventListener("click", () => moveWork(-1));
nextWork?.addEventListener("click", () => moveWork(1));
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeWork();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("is-open")) return;
  if (event.key === "Escape") closeWork();
  if (event.key === "ArrowLeft") moveWork(-1);
  if (event.key === "ArrowRight") moveWork(1);
});

fetch("portfolio-data.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(renderPortfolio)
  .catch(() => {
    if (portfolioGrid) {
      portfolioGrid.innerHTML = '<p class="portfolio-loading">视觉信号加载失败，请刷新页面重试。</p>';
    }
  });
