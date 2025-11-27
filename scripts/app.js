// scripts/app.js

const cardContainer = document.querySelector(".card-grid");
const searchInput = document.querySelector(".search-input-wrapper input");
const categoryButtons = document.querySelectorAll(".category-pill");
const resultCountEl = document.querySelector(".result-count");

let currentCategory = "全部";

function renderCards() {
  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = resources.filter((r) => {
    const inCategory =
      currentCategory === "全部" || r.category === currentCategory;

    const searchTarget =
      (r.title || "") +
      " " +
      (r.description || "") +
      " " +
      (r.tags || []).join(" ");

    const inKeyword =
      keyword === "" || searchTarget.toLowerCase().includes(keyword);

    return inCategory && inKeyword;
  });

  resultCountEl.textContent = filtered.length;

  if (filtered.length === 0) {
    cardContainer.innerHTML = `
      <div style="grid-column: 1 / -1; font-size: 14px; color: #6b7280; padding: 16px;">
        沒有找到符合條件的資源 👀
      </div>
    `;
    return;
  }

  const html = filtered
    .map((r) => {
      const tagsHtml = r.tags
        .map(
          (t, idx) =>
            `<span class="chip ${idx === 0 ? "highlight" : ""}">${t}</span>`
        )
        .join("");

      return `
        <article class="card">
          <span class="card-tag-top">${r.category}</span>
          <h3 class="card-title">${r.title}</h3>
          <p class="card-desc">${r.description}</p>

          <div class="card-labels">
            ${tagsHtml}
          </div>

          <div class="card-footer">
            <div class="card-source">
              <span>${r.source}</span>
            </div>

            <a class="card-link-btn" href="${r.url}" target="_blank">
              查看詳情 <span>↗</span>
            </a>
          </div>
        </article>
      `;
    })
    .join("");

  cardContainer.innerHTML = html;
}

searchInput.addEventListener("input", renderCards);

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    currentCategory = btn.textContent.trim();
    renderCards();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
});
