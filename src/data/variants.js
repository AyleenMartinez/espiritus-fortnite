export const STATUS = {
  ACTIVE: "active",
  UNRELEASED: "unreleased"
};

export const VARIANTS = {
  base: {
    id: "base",
    name: "Base",
    bonus: "Sin bonus especial",
    icon: "🟣"
  },

  gold: {
    id: "gold",
    name: "Gold",
    bonus: "3x más XP de Sprite por eliminaciones",
    icon: "⭐"
  },

  gummy: {
    id: "gummy",
    name: "Gummy",
    bonus: "20% más de Polvo de Sprite",
    icon: "🍬"
  },

  galaxy: {
    id: "galaxy",
    name: "Galaxy",
    bonus: "30% más munición al recoger",
    icon: "✨"
  },

  gem: {
    id: "gem",
    name: "Gem",
    bonus: "Variante Gem",
    icon: "💎"
  },

  holofoil: {
    id: "holofoil",
    name: "Holofoil",
    bonus: "Variante Holofoil",
    icon: "🌈"
  },

  cube: {
    id: "cube",
    name: "Cube",
    bonus: "Variante Cube",
    icon: "◼"
  },

  quack: {
    id: "quack",
    name: "Quack",
    bonus: "Variante Quack",
    icon: "🦆"
  }
};

export const VARIANT_ORDER = [
  "base",
  "gold",
  "gummy",
  "galaxy",
  "gem",
  "holofoil",
  "cube",
  "quack"
];

export const VARIANT_FILTERS = [
  "base",
  "gold",
  "gummy",
  "galaxy",
  "gem",
  "holofoil",
  "cube",
  "quack"
];