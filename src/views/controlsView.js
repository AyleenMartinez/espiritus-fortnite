export function renderFilters(filters, currentFilter) {
  const select = document.getElementById("select-filtros");

  if (!select) return;

  select.innerHTML = "";

  filters.forEach(filter => {
    const option = document.createElement("option");
    option.value = filter.id;
    option.textContent = `${filter.icon} ${filter.label} (${filter.count})`;

    if (filter.id === currentFilter) {
      option.selected = true;
    }

    select.appendChild(option);
  });
}

export function renderSpriteJumpMenu(catalog, state) {
  const select = document.getElementById("select-sprites");

  if (!select) return;

  const previousValue = select.value;

  select.innerHTML = `<option value="">Elegir sprite...</option>`;

  [...catalog]
    .filter(sprite => {
      if (state.showUnreleased) return true;

      return sprite.variants.some(variant => variant.status === "active");
    })
    .sort((a, b) => a.nameES.localeCompare(b.nameES, "es"))
    .forEach(sprite => {
      const option = document.createElement("option");
      option.value = sprite.id;
      option.textContent = sprite.nameES;
      select.appendChild(option);
    });

  select.value = previousValue;
}

export function renderToggleUnreleased(showUnreleased) {
  const button = document.getElementById("boton-toggle-unreleased");

  if (!button) return;

  button.classList.toggle("activo", showUnreleased);
  button.textContent = showUnreleased
    ? "🙈 Ocultar unreleased"
    : "👁️ Ver unreleased";
}

export function bindControls(handlers) {
  const search = document.getElementById("buscador");
  const filter = document.getElementById("select-filtros");
  const jump = document.getElementById("select-sprites");
  const toggleUnreleased = document.getElementById("boton-toggle-unreleased");
  const reset = document.getElementById("boton-reiniciar");
  const scrollTop = document.getElementById("boton-subir");

  if (search) {
    search.addEventListener("input", event => {
      handlers.onSearch(event.target.value);
    });
  }

  if (filter) {
    filter.addEventListener("change", event => {
      handlers.onFilter(event.target.value);
    });
  }

  if (jump) {
    jump.addEventListener("change", event => {
      handlers.onJump(event.target.value);
    });
  }

  if (toggleUnreleased) {
    toggleUnreleased.addEventListener("click", handlers.onToggleUnreleased);
  }

  if (reset) {
    reset.addEventListener("click", handlers.onReset);
  }

  if (scrollTop) {
    window.addEventListener("scroll", () => {
      scrollTop.classList.toggle("visible", window.scrollY > 400);
    });

    scrollTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}