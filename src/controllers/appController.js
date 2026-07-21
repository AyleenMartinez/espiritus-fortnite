import { getCatalog } from "../models/catalogModel.js";
import { STATUS, VARIANT_FILTERS, VARIANTS } from "../data/variants.js";
import { normalizeText } from "../utils/textUtils.js";

import {
  collectionState,
  initState,
  setSearch,
  setFilter,
  toggleShowUnreleased,
  toggleCollected,
  toggleMastered,
  resetState,
  setObtainedView,
  alternarVariantesConseguidas,
  alternarVariantesDominadas
} from "../state/collectionState.js";

import { renderStats } from "../views/statsView.js";

import {
  bindControls,
  renderFilters,
  renderSpriteJumpMenu,
  renderToggleUnreleased
} from "../views/controlsView.js";

import { renderSprites } from "../views/spritesView.js";

/*
  ============================================================
  APP CONTROLLER
  ============================================================

  Este archivo es el cerebro de la app.

  Hace 4 cosas principales:

  1) Inicia la app:
     initApp()

  2) Vuelve a pintar la pantalla:
     render()

  3) Calcula estadísticas:
     calculateStats()

  4) Conecta acciones de la vista con cambios de estado:
     - buscar
     - filtrar
     - marcar conseguido
     - marcar dominado
     - cambiar vista lista/cuadrícula
     - marcar todo un sprite como conseguido/dominado

  ============================================================
  PALABRAS IMPORTANTES
  ============================================================

  catalog / catalogo:
  - Lista completa de sprites ya preparados para pintar.

  collectionState / estado:
  - Guarda lo que el usuario hizo:
      conseguidos
      dominados
      filtro actual
      búsqueda
      vista actual

  render():
  - Vuelve a dibujar la app completa.
  - Se llama cada vez que algo cambia.

  handlers / acciones:
  - Son funciones que se le pasan a la vista.
  - La vista no cambia datos directamente.
  - La vista avisa al controller:
      "apretaron este botón"
  - El controller cambia el estado y vuelve a renderizar.

  ============================================================
  FLUJO SIMPLE
  ============================================================

  Usuario hace clic
    ↓
  spritesView.js avisa
    ↓
  appController.js recibe la acción
    ↓
  collectionState.js cambia el estado
    ↓
  localStorage guarda
    ↓
  render() repinta todo
*/

let catalog = [];

export function initApp() {
  catalog = getCatalog();
  initState();

  bindControls({
    onSearch(value) {
      setSearch(normalizeText(value));
      render();
    },

    onFilter(value) {
      setFilter(value);
      render();
    },

    onJump(spriteId) {
      jumpToSprite(spriteId);
    },

    onToggleUnreleased() {
      toggleShowUnreleased();
      render();
    },

    onReset() {
      const confirmed = confirm("¿Seguro? Se borrarán conseguidos y dominados.");

      if (!confirmed) return;

      resetState();
      render();
    }
  });

  render();
}

function render() {
  renderStats(calculateStats());
  renderFilters(buildFilters(), collectionState.filter);
  renderSpriteJumpMenu(catalog, collectionState);
  renderToggleUnreleased(collectionState.showUnreleased);

  renderSprites(catalog, collectionState, {
    isCollected: claveVariante => Boolean(collectionState.collected[claveVariante]),
    isMastered: claveVariante => Boolean(collectionState.mastered[claveVariante]),

    onToggleCollected(claveVariante) {
      toggleCollected(claveVariante);
      render();
    },

    onToggleMastered(claveVariante) {
      toggleMastered(claveVariante);
      render();
    },

    onSetObtainedView(vista) {
      setObtainedView(vista);
      render();
    },

    onAlternarSpriteConseguido(idDelSprite) {
      const clavesDeVariantes = obtenerClavesDeVariantesActivasDelSprite(idDelSprite);

      alternarVariantesConseguidas(clavesDeVariantes);
      render();
    },

    onAlternarSpriteDominado(idDelSprite) {
      const clavesDeVariantes = obtenerClavesDeVariantesActivasDelSprite(idDelSprite);

      alternarVariantesDominadas(clavesDeVariantes);
      render();
    }
  });
}

function obtenerClavesDeVariantesActivasDelSprite(idDelSprite) {
  const spriteEncontrado = catalog.find(sprite => {
    return sprite.id === idDelSprite;
  });

  if (!spriteEncontrado) return [];

  return spriteEncontrado.variants
    .filter(variante => {
      return variante.status === STATUS.ACTIVE;
    })
    .map(variante => {
      return variante.key;
    });
}

function calculateStats() {
  const allVariants = catalog.flatMap(sprite => sprite.variants);

  const availableVariants = allVariants.filter(variant => {
    return variant.status === STATUS.ACTIVE;
  });

  const collected = availableVariants.filter(variant => {
    return collectionState.collected[variant.key];
  }).length;

  const mastered = availableVariants.filter(variant => {
    return collectionState.mastered[variant.key];
  }).length;

  const available = availableVariants.length;

  const percent = available === 0
    ? 0
    : Math.round((collected / available) * 100);

  return {
    available,
    collected,
    mastered,
    percent
  };
}

function buildFilters() {
  const baseFilters = [
    { id: "todos", icon: "📦", label: "Todos" },
    { id: "disponibles", icon: "✅", label: "Disponibles" },
    { id: "conseguidos", icon: "✓", label: "Conseguidos" },
    { id: "faltantes", icon: "✗", label: "Faltantes" },
    { id: "dominados", icon: "👑", label: "Dominados" }
  ];

  if (collectionState.showUnreleased) {
    baseFilters.push({ id: "unreleased", icon: "🔒", label: "Unreleased" });
  }

  const variantFilters = VARIANT_FILTERS.map(variantId => ({
    id: variantId,
    icon: VARIANTS[variantId].icon,
    label: VARIANTS[variantId].name
  }));

  return [...baseFilters, ...variantFilters].map(filter => ({
    ...filter,
    count: countByFilter(filter.id)
  }));
}

function countByFilter(filterId) {
  let count = 0;

  catalog.forEach(sprite => {
    sprite.variants.forEach(variant => {
      const isUnreleased = variant.status === STATUS.UNRELEASED;
      const isActive = variant.status === STATUS.ACTIVE;

      if (isUnreleased && !collectionState.showUnreleased) return;

      if (filterId === "todos") count++;
      else if (filterId === "disponibles" && isActive) count++;
      else if (filterId === "unreleased" && isUnreleased) count++;
      else if (filterId === "conseguidos" && collectionState.collected[variant.key]) count++;
      else if (filterId === "faltantes" && isActive && !collectionState.collected[variant.key]) count++;
      else if (filterId === "dominados" && collectionState.mastered[variant.key]) count++;
      else if (filterId === variant.id) count++;
    });
  });

  return count;
}

function jumpToSprite(spriteId) {
  if (!spriteId) return;

  setSearch("");
  setFilter("todos");

  const searchInput = document.getElementById("buscador");

  if (searchInput) {
    searchInput.value = "";
  }

  render();

  requestAnimationFrame(() => {
    const block = document.getElementById(`sprite-${spriteId}`);

    if (!block) return;

    block.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    block.classList.add("resaltado-scroll");

    setTimeout(() => {
      block.classList.remove("resaltado-scroll");
    }, 1400);
  });
}