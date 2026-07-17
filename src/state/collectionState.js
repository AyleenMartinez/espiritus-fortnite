import { loadCollection, saveCollection } from "../services/storageService.js";

export const collectionState = {
  collected: {},
  mastered: {},
  filter: "todos",
  search: "",
  showUnreleased: false
};

export function initState() {
  const saved = loadCollection();

  collectionState.collected = saved.collected;
  collectionState.mastered = saved.mastered;
  collectionState.showUnreleased = Boolean(saved.preferences.showUnreleased);
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

export function toggleShowUnreleased() {
  collectionState.showUnreleased = !collectionState.showUnreleased;

  if (!collectionState.showUnreleased && collectionState.filter === "unreleased") {
    collectionState.filter = "todos";
  }

  saveState();
}

export function toggleCollected(key) {
  collectionState.collected[key] = !collectionState.collected[key];

  if (!collectionState.collected[key]) {
    collectionState.mastered[key] = false;
  }

  saveState();
}

export function toggleMastered(key) {
  collectionState.mastered[key] = !collectionState.mastered[key];

  if (collectionState.mastered[key]) {
    collectionState.collected[key] = true;
  }

  saveState();
}

export function resetState() {
  collectionState.collected = {};
  collectionState.mastered = {};
  saveState();
}