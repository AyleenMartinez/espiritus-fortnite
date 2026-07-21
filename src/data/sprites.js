import { STATUS } from "./variants.js";

/*
  ============================================================
  DATA DE SPRITES
  ============================================================

  Este archivo es tu panel principal para agregar o modificar monitos.

  Cada sprite tiene:

  id:
  - Nombre interno.
  - Debe ser corto, sin espacios, sin tildes.
  - También se usa para buscar imágenes.
  - Ejemplo:
      "agua"
      "punto-cero"
      "batman"

  nameES:
  - Nombre visible en español.

  nameEN:
  - Nombre visible en inglés.

  rarity:
  - Rareza base.
  - Ejemplo:
      "Raro"
      "Épico"
      "Legendario"
      "Mítico"

  ability:
  - Texto de habilidad.

  location:
  - Lugar donde aparece o referencia de obtención.

  source:
  - Fuente del dato.
  - Puede quedar guardado aunque no se muestre en pantalla.

  variants:
  - Lista de variantes que tiene ese sprite.

  ============================================================
  VARIANTES
  ============================================================

  "base"
  - Variante activa.

  U("gem")
  - Variante existe, pero está unreleased.
  - No aparece normalmente.
  - Solo aparece con "Ver unreleased".

  No poner una variante
  - Significa que ese sprite no tiene esa variante.

  ============================================================
  EJEMPLO
  ============================================================

  variants: [...BASIC, "holofoil", U("gem"), U("cube")]

  Significa:
  - base activa
  - gold activa
  - gummy activa
  - galaxy activa
  - holofoil activa
  - gem unreleased
  - cube unreleased

  Cuando liberen gem:
    U("gem") → "gem"
*/

const U = id => ({
  id,
  status: STATUS.UNRELEASED
});

const BASIC = ["base", "gold", "gummy", "galaxy"];

export const SPRITES = [
  {
    id: "agua",
    nameES: "Agua",
    nameEN: "Water Sprite",
    rarity: "Raro",
    ability: "Rellena escudo mientras estás en el agua para ti y tu escuadrón cercano.",
    location: "Agua / zonas costeras",
    variants: [...BASIC, U("gem"),"holofoil", U("cube"), U("quack")]
  },

  {
    id: "tierra",
    nameES: "Tierra",
    nameEN: "Earth Sprite",
    rarity: "Raro",
    ability: "Puede entregar objetos raros adicionales al abrir cofres.",
    location: "Por confirmar",
    source: "Epic / fortnite.gg",
    variants: [...BASIC, U("gem"), U("holofoil"), U("cube"), U("quack")]
  },

  {
    id: "fuego",
    nameES: "Fuego",
    nameEN: "Fire Sprite",
    rarity: "Raro",
    ability: "Crea una explosión de fuego al hacer suficiente daño a un enemigo.",
    location: "Por confirmar",
    source: "Epic / fortnite.gg",
    variants: [...BASIC, U("gem"), "holofoil", U("cube"), U("quack")]
  },

  {
    id: "pato",
    nameES: "Patito",
    nameEN: "Duck Sprite",
    rarity: "Épico",
    ability: "Hacer emotes o jamming rellena escudo.",
    location: "Bóvedas",
    source: "Epic / fortnite.gg",
    variants: [...BASIC, U("holofoil"), U("cube"), U("quack")]
  },

  {
    id: "fantasma",
    nameES: "Fantasma",
    nameEN: "Ghost Sprite",
    rarity: "Épico",
    ability: "Otorga camuflaje por un tiempo al recargar.",
    location: "Por confirmar",
    source: "Epic / fortnite.gg",
    variants: [...BASIC, U("gem"), "holofoil", U("cube"), U("quack")]
  },

  {
    id: "onirico",
    nameES: "Dormilón",
    nameEN: "Dream Sprite",
    rarity: "Legendario",
    ability: "Entrega un objeto aleatorio en cada nivel y explota con botín legendario al nivel máximo.",
    location: "Por confirmar",
    source: "Epic / fortnite.gg",
    variants: [...BASIC, U("holofoil"), U("cube"), U("quack")]
  },

  {
    id: "demonio",
    nameES: "Demonio",
    nameEN: "Demon Sprite",
    rarity: "Épico",
    ability: "Roba algo de vida y escudo al eliminar enemigos.",
    location: "Por confirmar",
    source: "Epic / fortnite.gg",
    variants: [...BASIC, U("holofoil"), U("cube"), U("quack")]
  },

  {
    id: "punk",
    nameES: "Punk",
    nameEN: "Punk Sprite",
    rarity: "Legendario",
    ability: "Posiblemente nada... o infinitamente algo.",
    location: "Por confirmar",
    source: "Epic / fortnite.gg",
    variants: [...BASIC, U("holofoil"), U("cube"), U("quack")]
  },

  {
    id: "rey",
    nameES: "Monarca",
    nameEN: "King Sprite",
    rarity: "Épico",
    ability: "Aumenta el daño del pico.",
    location: "Por confirmar",
    source: "Epic / fortnite.gg",
    variants: [...BASIC, U("gem"), "holofoil", U("cube"), U("quack")]
  },

  {
    id: "pollo",
    nameES: "Pollo",
    nameEN: "Pollo Sprite",
    rarity: "Mítico",
    ability: "Por confirmar.",
    location: "Por confirmar",
    source: "fortnite.gg",
    variants: ["base"]
  },

  {
    id: "vini-jr",
    nameES: "Vini Jr.",
    nameEN: "Vini Jr. Sprite",
    rarity: "Mítico",
    ability: "Por confirmar.",
    location: "Por confirmar",
    source: "fortnite.gg",
    variants: ["base"]
  },

  {
    id: "mani-quemado",
    nameES: "Burnt Peanut",
    nameEN: "Burnt Peanut Sprite",
    rarity: "Mítico",
    ability: "Por confirmar.",
    location: "Por confirmar",
    source: "fortnite.gg",
    variants: ["base"]
  },

  {
    id: "punto-cero",
    nameES: "Punto Cero",
    nameEN: "Zero Point Sprite",
    rarity: "Mítico",
    ability: "Genera una Shield Bubble Jr. al usar un objeto de curación en ti.",
    location: "Por confirmar",
    source: "Epic / fortnite.gg",
    variants: [...BASIC, U("holofoil"), U("cube"), U("quack")]
  },

  {
    id: "pez",
    nameES: "Palito de Pez",
    nameEN: "Fishy Sprite",
    rarity: "Raro",
    ability: "Por confirmar.",
    location: "Por confirmar",
    source: "fortnite.gg",
    variants: [...BASIC, U("holofoil"), U("cube"), U("quack")]
  },

  {
    id: "delantero",
    nameES: "Goleador",
    nameEN: "Striker Sprite",
    rarity: "Épico",
    ability: "Por confirmar.",
    location: "Por confirmar",
    source: "fortnite.gg",
    variants: [...BASIC, "holofoil", U("cube"), U("quack")]
  },

  {
    id: "aura",
    nameES: "Aura",
    nameEN: "Aura Sprite",
    rarity: "Épico",
    ability: "Por confirmar.",
    location: "Por confirmar",
    source: "fortnite.gg",
    variants: [...BASIC, U("holofoil"), U("cube"), U("quack")]
  },

  {
    id: "jefe",
    nameES: "Jefe",
    nameEN: "Boss Sprite",
    rarity: "Legendario",
    ability: "Por confirmar.",
    location: "Por confirmar",
    source: "fortnite.gg",
    variants: [...BASIC, U("holofoil"), U("cube"), U("quack")]
  },

  {
    id: "parca",
    nameES: "Parca",
    nameEN: "Grim Sprite",
    rarity: "Mítico",
    ability: "Por confirmar.",
    location: "Por confirmar",
    source: "fortnite.gg",
    variants: [...BASIC, U("holofoil"), U("cube"), U("quack")]
  },

  {
    id: "aire",
    nameES: "Aire",
    nameEN: "Air Sprite",
    rarity: "Raro",
    ability: "Por confirmar.",
    location: "Por confirmar",
    source: "fortnite.gg",
    variants: [...BASIC, "holofoil", U("cube"), U("quack")]
  },

  {
    id: "siete",
    nameES: "Siete",
    nameEN: "Seven Sprite",
    rarity: "Legendario",
    ability: "Por confirmar.",
    location: "Por confirmar",
    source: "fortnite.gg",
    variants: [...BASIC, "holofoil", U("cube"), U("quack")]
  },

  {
    id: "batman",
    nameES: "Batman",
    nameEN: "Batman Sprite",
    rarity: "Mítico",
    ability: "Por confirmar.",
    location: "Por confirmar",
    source: "fortnite.gg",
    variants: [...BASIC, "holofoil", U("cube"), U("quack")]
  },

  {
    id: "john-wick",
    nameES: "John Wick",
    nameEN: "John Wick Sprite",
    rarity: "Mítico",
    ability: "Por confirmar.",
    location: "Por confirmar",
    source: "fortnite.gg",
    variants: [{ id: "base", status: STATUS.UNRELEASED }]
  }
];