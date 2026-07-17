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
  resetState
} from "../state/collectionState.js";

import { renderStats } from "../views/statsView.js";

import {
  bindControls,
  renderFilters,
  renderSpriteJumpMenu,
  renderToggleUnreleased
} from "../views/controlsView.js";

import { renderSprites } from "../views/spritesView.js";

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
    isCollected: key => Boolean(collectionState.collected[key]),
    isMastered: key => Boolean(collectionState.mastered[key]),

    onToggleCollected(key) {
      toggleCollected(key);
      render();
    },

    onToggleMastered(key) {
      toggleMastered(key);
      render();
    }
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