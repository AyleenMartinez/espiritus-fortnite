const STORAGE_KEYS = {
  collected: "spritesCollectedV4",
  mastered: "spritesMasteredV4",
  preferences: "spritesPreferencesV4"
};

export function loadCollection() {
  return {
    collected: readObject(STORAGE_KEYS.collected),
    mastered: readObject(STORAGE_KEYS.mastered),
    preferences: readObject(STORAGE_KEYS.preferences)
  };
}

export function saveCollection(state) {
  localStorage.setItem(STORAGE_KEYS.collected, JSON.stringify(state.collected));
  localStorage.setItem(STORAGE_KEYS.mastered, JSON.stringify(state.mastered));

  localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify({
    showUnreleased: state.showUnreleased
  }));
}

function readObject(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    return {};
  }
}