/*
  ============================================================
  DATA DE VARIANTES
  ============================================================

  Este archivo define los tipos de variantes que existen en la app.

  STATUS:
  - Define si una variante está disponible o no.

  STATUS.ACTIVE:
  - Variante disponible.
  - Se muestra normalmente.
  - Cuenta en el progreso.
  - Se puede marcar como conseguida/dominada.

  STATUS.UNRELEASED:
  - Variante no liberada.
  - No aparece normalmente.
  - No cuenta en el progreso.
  - No se puede marcar como conseguida/dominada.
  - Solo aparece si activas "Ver unreleased".

  VARIANTS:
  - Define cada tipo de variante.
  - Ejemplo:
      base
      gold
      gummy
      galaxy
      gem
      holofoil

  Cada variante tiene:

  id:
  - Nombre interno.
  - Ejemplo:
      "gold"

  name:
  - Nombre visible.
  - Ejemplo:
      "Gold"

  bonus:
  - Texto descriptivo.

  icon:
  - Ícono usado como placeholder si falta imagen.

  VARIANT_ORDER:
  - Orden en que aparecen las variantes dentro de cada sprite.

  VARIANT_FILTERS:
  - Variantes que aparecen como filtros.
*/

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