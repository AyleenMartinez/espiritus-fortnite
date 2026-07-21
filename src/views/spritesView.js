import { STATUS, VARIANT_FILTERS } from "../data/variants.js";
import { normalizeClass } from "../utils/textUtils.js";

export function renderSprites(catalog, state, handlers) {
  const container = document.getElementById("contenedor-tarjetas");

  if (!container) return;

  container.innerHTML = "";

  const usarListaCompacta =
    state.filter === "conseguidos" ||
    state.filter === "dominados";

  if (usarListaCompacta) {
    if (state.obtainedView === "grid") {
      renderCompactGrid(catalog, state, handlers, container);
    } else {
      renderCompactList(catalog, state, handlers, container);
    }

    return;
  }

  renderSpriteBlocks(catalog, state, handlers, container);
}

function renderSpriteBlocks(catalog, state, handlers, container) {
  let hasResults = false;

  catalog.forEach(sprite => {
    const visibleVariants = sprite.variants.filter(variant => {
      return shouldShowVariant(variant, state);
    });

    if (visibleVariants.length === 0) return;

    hasResults = true;

    const block = createSpriteBlock(sprite, visibleVariants, handlers);
    container.appendChild(block);
  });

  if (!hasResults) {
    renderEmptyMessage(container);
  }
}

function renderCompactList(catalog, state, handlers, container) {
  const entries = getObtainedEntries(catalog, state);

  if (entries.length === 0) {
    renderEmptyMessage(container);
    return;
  }

  const section = document.createElement("section");
  section.className = "lista-compacta-obtenidos";

  const title = state.filter === "dominados"
    ? "👑 Sprites dominados"
    : "✓ Sprites conseguidos";

  section.appendChild(
    createObtainedHeader(title, entries.length, "list", handlers)
  );

  const list = document.createElement("div");
  list.className = "lista-compacta-items";

  entries.forEach(({ variant }) => {
    list.appendChild(createCompactRow(variant, handlers));
  });

  section.appendChild(list);
  container.appendChild(section);
}

function renderCompactGrid(catalog, state, handlers, container) {
  const entries = getObtainedEntries(catalog, state);

  if (entries.length === 0) {
    renderEmptyMessage(container);
    return;
  }

  const section = document.createElement("section");
  section.className = "lista-compacta-obtenidos";

  const title = state.filter === "dominados"
    ? "👑 Sprites dominados"
    : "✓ Sprites conseguidos";

  section.appendChild(
    createObtainedHeader(title, entries.length, "grid", handlers)
  );

  const grid = document.createElement("div");
  grid.className = "cuadricula-obtenidos";

  entries.forEach(({ variant }) => {
    grid.appendChild(createCompactGridCard(variant, handlers));
  });

  section.appendChild(grid);
  container.appendChild(section);
}

function getObtainedEntries(catalog, state) {
  const entries = [];

  catalog.forEach(sprite => {
    sprite.variants.forEach(variant => {
      if (shouldShowVariant(variant, state)) {
        entries.push({
          sprite,
          variant
        });
      }
    });
  });

  return entries;
}

function createObtainedHeader(title, total, currentView, handlers) {
  const header = document.createElement("header");
  header.className = "lista-compacta-header";

  header.innerHTML = `
    <div>
      <h2>${title}</h2>
      <span>${total} resultados</span>
    </div>

    <div class="selector-vista-obtenidos">
      <button
        class="boton-vista-obtenidos ${currentView === "list" ? "activo" : ""}"
        type="button"
        data-view="list"
      >
        Lista
      </button>

      <button
        class="boton-vista-obtenidos ${currentView === "grid" ? "activo" : ""}"
        type="button"
        data-view="grid"
      >
        Cuadrícula
      </button>
    </div>
  `;

  header.querySelectorAll(".boton-vista-obtenidos").forEach(button => {
    button.addEventListener("click", () => {
      handlers.onSetObtainedView(button.dataset.view);
    });
  });

  return header;
}

function createCompactGridCard(variant, handlers) {
  const mastered = Boolean(handlers.isMastered(variant.key));

  const card = document.createElement("article");
  card.className = "tarjeta-cuadricula-obtenido";

  if (mastered) {
    card.classList.add("dominado");
  }

  card.innerHTML = `
    ${mastered ? `<span class="corona-cuadricula">👑</span>` : ""}

    <div class="imagen-cuadricula-obtenido">
      <img
        src="${variant.image}"
        alt="${variant.title}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      >
      <div class="imagen-placeholder placeholder-${variant.id}">
        ${variant.icon || "?"}
      </div>
    </div>

    <h3>${variant.title}</h3>
  `;

  return card;
}

function createSpriteBlock(sprite, variants, handlers) {
  const block = document.createElement("section");
  block.className = "bloque-sprite";
  block.id = `sprite-${sprite.id}`;

  const activeCount = sprite.variants.filter(v => v.status === STATUS.ACTIVE).length;
  const unreleasedCount = sprite.variants.filter(v => v.status === STATUS.UNRELEASED).length;

  block.innerHTML = `
    <header class="bloque-header">
      <div class="bloque-titulo-linea">
        <div>
          <h3>${sprite.nameES}</h3>
          <p class="nombre-ingles">${sprite.nameEN || ""}</p>
        </div>

        <div class="resumen-bloque">
          <span>${activeCount} disponibles</span>
          ${unreleasedCount > 0 ? `<span>${unreleasedCount} unreleased</span>` : ""}
        </div>
      </div>

      <p class="habilidad-sprite">${sprite.ability || ""}</p>

      <div class="meta-sprite">
        <span>🏷️ ${sprite.rarity || "Por confirmar"}</span>
        <span>📍 ${sprite.location || "Por confirmar"}</span>
        <span>🔎 ${sprite.source || "Referencia"}</span>
      </div>
    </header>

    <div class="contenedor-variantes"></div>
  `;

  const grid = block.querySelector(".contenedor-variantes");

  variants.forEach(variant => {
    grid.appendChild(createVariantCard(variant, handlers));
  });

  return block;
}

function createVariantCard(variant, handlers) {
  const collected = Boolean(handlers.isCollected(variant.key));
  const mastered = Boolean(handlers.isMastered(variant.key));
  const unreleased = variant.status === STATUS.UNRELEASED;

  const card = document.createElement("article");
  card.className = "tarjeta-variante";
  card.id = variant.key;
  card.dataset.variant = variant.id;
  card.dataset.status = variant.status;

  if (collected) card.classList.add("conseguido");
  if (mastered) card.classList.add("dominado");
  if (unreleased) card.classList.add("unreleased");

  card.innerHTML = `
    ${mastered ? `<div class="insignia-dominado">👑</div>` : ""}

    <div class="imagen-variante">
      <img
        src="${variant.image}"
        alt="${variant.title}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      >
      <div class="imagen-placeholder placeholder-${variant.id}">
        ${variant.icon || "?"}
      </div>
    </div>

    <h4 class="titulo-card">${variant.title}</h4>

    <div class="badges-card">
      <span class="etiqueta-rareza rareza-${normalizeClass(variant.rarity)}">
        ${variant.rarity}
      </span>
      ${unreleased ? `<span class="etiqueta-unreleased">Unreleased</span>` : ""}
    </div>

    <p class="bonus-variante">${variant.bonus || ""}</p>

    <div class="acciones-variante">
      ${unreleased
      ? `<button class="boton-unreleased" type="button" disabled>Unreleased</button>`
      : `
            <button class="boton-variante boton-tengo" type="button">
              ${collected ? "✓ Conseguido" : "Lo tengo"}
            </button>

            <button class="boton-dominado ${mastered ? "activo" : ""}" type="button">
              ${mastered ? "👑 Dominado" : "Dominado"}
            </button>
          `
    }
    </div>
  `;

  if (!unreleased) {
    card.querySelector(".boton-tengo").addEventListener("click", () => {
      handlers.onToggleCollected(variant.key);
    });

    card.querySelector(".boton-dominado").addEventListener("click", () => {
      handlers.onToggleMastered(variant.key);
    });
  }

  return card;
}

function createCompactRow(variant, handlers) {
  const collected = Boolean(handlers.isCollected(variant.key));
  const mastered = Boolean(handlers.isMastered(variant.key));

  const row = document.createElement("article");
  row.className = "fila-compacta-obtenido";

  if (mastered) row.classList.add("dominado");
  else row.classList.add("conseguido");

  row.innerHTML = `
    <div class="mini-imagen-variante">
      <img
        src="${variant.image}"
        alt="${variant.title}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      >
      <div class="imagen-placeholder placeholder-${variant.id}">
        ${variant.icon || "?"}
      </div>
    </div>

    <div class="mini-info-variante">
      <h3>${variant.title}</h3>
      <p>${variant.spriteNameEN || ""}</p>

      <div class="mini-badges">
        <span class="etiqueta-rareza rareza-${normalizeClass(variant.rarity)}">
          ${variant.rarity}
        </span>
        <span class="mini-variante">${variant.name}</span>
      </div>
    </div>

    <div class="mini-acciones-variante">
      <button class="boton-mini-tengo" type="button">
        ${collected ? "✓" : "+"}
      </button>

      <button class="boton-mini-dominado ${mastered ? "activo" : ""}" type="button">
        👑
      </button>
    </div>
  `;

  row.querySelector(".boton-mini-tengo").addEventListener("click", () => {
    handlers.onToggleCollected(variant.key);
  });

  row.querySelector(".boton-mini-dominado").addEventListener("click", () => {
    handlers.onToggleMastered(variant.key);
  });

  return row;
}

function shouldShowVariant(variant, state) {
  const isUnreleased = variant.status === STATUS.UNRELEASED;
  const isActive = variant.status === STATUS.ACTIVE;

  if (isUnreleased && !state.showUnreleased) return false;

  if (state.filter === "disponibles" && !isActive) return false;
  if (state.filter === "unreleased" && !isUnreleased) return false;
  if (state.filter === "conseguidos" && !state.collected[variant.key]) return false;
  if (state.filter === "faltantes" && (!isActive || state.collected[variant.key])) return false;
  if (state.filter === "dominados" && !state.mastered[variant.key]) return false;

  if (VARIANT_FILTERS.includes(state.filter) && variant.id !== state.filter) {
    return false;
  }

  if (state.search && !variant.searchText.includes(state.search)) {
    return false;
  }

  return true;
}

function renderEmptyMessage(container) {
  const empty = document.createElement("div");
  empty.className = "sin-resultados";
  empty.textContent = "No se encontraron sprites con este filtro";
  container.appendChild(empty);
}