import { loadCollection, saveCollection } from "../services/storageService.js";

export const collectionState = {
  collected: {},
  mastered: {},
  filter: "todos",
  search: "",
  showUnreleased: false,
  obtainedView: "list"
};

/*
  TORPEDO RÁPIDO DE IDs / CLAVES

  sprite.id:
  - Identifica el monito base.
  - Ejemplo: "agua", "batman", "punto-cero"

  variant.id:
  - Identifica el tipo de variante.
  - Ejemplo: "base", "gold", "gummy", "galaxy", "holofoil", "gem"

  variant.key:
  - Identifica UNA card exacta.
  - Se arma juntando sprite.id + variant.id.
  - Ejemplo:
      sprite.id = "agua"
      variant.id = "gold"
      variant.key = "agua-gold"

  ¿Por qué usamos variant.key para guardar progreso?
  Porque "gold" solo no basta.
  Hay muchos gold:
    - agua-gold
    - tierra-gold
    - batman-gold

  Entonces:
  - collectionState.collected["agua-gold"] = true
    significa que tengo Gold Agua.

  - collectionState.mastered["agua-gold"] = true
    significa que Gold Agua está dominado.

  Resumen:
    sprite.id   = monito
    variant.id  = tipo de variante
    variant.key = card exacta
*/

export function initState() {
  const saved = loadCollection();

  collectionState.collected = saved.collected || {};
  collectionState.mastered = saved.mastered || {};
  collectionState.showUnreleased = Boolean(saved.preferences?.showUnreleased);
  collectionState.obtainedView = saved.preferences?.obtainedView || "list";
}

export function saveState() {
  saveCollection(collectionState);
}

export function setSearch(value) {
  collectionState.search = value;
}

export function setFilter(value) {
  collectionState.filter = value;
}

export function setObtainedView(view) {
  if (view !== "list" && view !== "grid") return;

  collectionState.obtainedView = view;
  saveState();
}

export function toggleShowUnreleased() {
  collectionState.showUnreleased = !collectionState.showUnreleased;

  if (!collectionState.showUnreleased && collectionState.filter === "unreleased") {
    collectionState.filter = "todos";
  }

  saveState();
}

export function toggleCollected(claveVariante) {
  collectionState.collected[claveVariante] = !collectionState.collected[claveVariante];

  if (!collectionState.collected[claveVariante]) {
    collectionState.mastered[claveVariante] = false;
  }

  saveState();
}

export function toggleMastered(claveVariante) {
  collectionState.mastered[claveVariante] = !collectionState.mastered[claveVariante];

  if (collectionState.mastered[claveVariante]) {
    collectionState.collected[claveVariante] = true;
  }

  saveState();
}

export function alternarVariantesConseguidas(clavesDeVariantes) {
  if (!Array.isArray(clavesDeVariantes) || clavesDeVariantes.length === 0) return;

  const estanTodasConseguidas = clavesDeVariantes.every(claveVariante => {
    return collectionState.collected[claveVariante];
  });

  clavesDeVariantes.forEach(claveVariante => {
    collectionState.collected[claveVariante] = !estanTodasConseguidas;

    if (estanTodasConseguidas) {
      collectionState.mastered[claveVariante] = false;
    }
  });

  saveState();
}

export function alternarVariantesDominadas(clavesDeVariantes) {
  if (!Array.isArray(clavesDeVariantes) || clavesDeVariantes.length === 0) return;

  const estanTodasDominadas = clavesDeVariantes.every(claveVariante => {
    return collectionState.mastered[claveVariante];
  });

  clavesDeVariantes.forEach(claveVariante => {
    collectionState.mastered[claveVariante] = !estanTodasDominadas;

    if (!estanTodasDominadas) {
      collectionState.collected[claveVariante] = true;
    }
  });

  saveState();
}

export function resetState() {
  collectionState.collected = {};
  collectionState.mastered = {};
  saveState();
}