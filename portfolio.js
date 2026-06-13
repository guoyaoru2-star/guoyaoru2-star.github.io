const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const portfolioItems = Array.from(document.querySelectorAll("[data-work]"));
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxMeta = document.querySelector("[data-lightbox-meta]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const closeLightbox = document.querySelector("[data-lightbox-close]");
const previousWork = document.querySelector("[data-lightbox-prev]");
const nextWork = document.querySelector("[data-lightbox-next]");

let visibleItems = [...portfolioItems];
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
}

function closeWork() {
  lightbox?.classList.remove("is-open");
  lightbox?.setAttribute("aria-hidden", "true");
}

function moveWork(direction) {
  if (!visibleItems.length) return;
  activeIndex = (activeIndex + direction + visibleItems.length) % visibleItems.length;
  openWork(visibleItems[activeIndex]);
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

portfolioItems.forEach((item) => item.addEventListener("click", () => openWork(item)));
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
