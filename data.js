// ============================================================
// DATA.JS - Sprites Fortnite
// Base principal: fortnite.gg/sprites
// Los "unreleased" se muestran, pero no cuentan en progreso.
// ============================================================

const ESTADO_ACTIVO = "activo";
const ESTADO_UNRELEASED = "unreleased";

const VARIANTES = {
  base: {
    id: "base",
    nombre: "Base",
    bonus: "Sin bonus especial"
  },
  gold: {
    id: "gold",
    nombre: "Gold",
    bonus: "3x más XP de Sprite por eliminaciones"
  },
  gummy: {
    id: "gummy",
    nombre: "Gummy",
    bonus: "20% más de Polvo de Sprite"
  },
  galaxy: {
    id: "galaxy",
    nombre: "Galaxy",
    bonus: "30% más munición al recoger"
  },
  gem: {
    id: "gem",
    nombre: "Gem",
    bonus: "Variante Gem"
  },
  holofoil: {
    id: "holofoil",
    nombre: "Holofoil",
    bonus: "Variante Holofoil"
  },
  cube: {
    id: "cube",
    nombre: "Cube",
    bonus: "Variante Cube"
  },
  quack: {
    id: "quack",
    nombre: "Quack",
    bonus: "Variante Quack"
  }
};

function crearVariante(idSprite, config) {
  const idVariante = typeof config === "string" ? config : config.id;
  const opciones = typeof config === "string" ? {} : config;
  const base = VARIANTES[idVariante];

  if (!base) {
    throw new Error(`Variante no definida: ${idVariante}`);
  }

  const estado = opciones.estado || ESTADO_ACTIVO;

  return {
    id: idVariante,
    nombre: opciones.nombre || base.nombre,
    rareza: opciones.rareza || (idVariante === "base" ? null : "Especial"),
    bonus: opciones.bonus || base.bonus,
    estado,
    coleccion: estado === ESTADO_UNRELEASED ? "unreleased" : "actual",
    imagen: opciones.imagen || `img/${idSprite}-${idVariante}.png`
  };
}

function crearVariantes(idSprite, variantes) {
  return variantes.map(variante => crearVariante(idSprite, variante));
}

function variantesCompletas(config = {}) {
  const {
    gem = ESTADO_UNRELEASED,
    holofoil = ESTADO_UNRELEASED,
    cube = ESTADO_UNRELEASED,
    quack = ESTADO_UNRELEASED
  } = config;

  return [
    "base",
    "gold",
    "gummy",
    "galaxy",
    { id: "gem", estado: gem },
    { id: "holofoil", estado: holofoil },
    { id: "cube", estado: cube },
    { id: "quack", estado: quack }
  ];
}

function varianteUnica(idSprite, config = {}) {
  return [
    crearVariante(idSprite, {
      id: "base",
      nombre: "Base",
      estado: config.estado || ESTADO_ACTIVO,
      rareza: config.rareza || null,
      bonus: config.bonus || "Único, sin variantes especiales",
      imagen: config.imagen || `img/${idSprite}-base.png`
    })
  ];
}

const spritesData = [
  {
    id: "batman",
    nombreES: "Batman",
    nombreEN: "Batman Sprite",
    rarezaBase: "Mítico",
    habilidad: "Por confirmar.",
    ubicacion: "Por confirmar",
    fuente: "fortnite.gg/sprites",
    variantes: crearVariantes("batman", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_ACTIVO,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "agua",
    nombreES: "Agua",
    nombreEN: "Water Sprite",
    rarezaBase: "Raro",
    habilidad: "Rellena escudo mientras estás en el agua para ti y tu escuadrón cercano.",
    ubicacion: "Agua / zonas costeras",
    fuente: "Epic / fortnite.gg",
    variantes: crearVariantes("agua", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_ACTIVO,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "tierra",
    nombreES: "Tierra",
    nombreEN: "Earth Sprite",
    rarezaBase: "Raro",
    habilidad: "Puede entregar objetos raros adicionales al abrir cofres.",
    ubicacion: "Por confirmar",
    fuente: "Epic / fortnite.gg",
    variantes: crearVariantes("tierra", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_UNRELEASED,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "fuego",
    nombreES: "Fuego",
    nombreEN: "Fire Sprite",
    rarezaBase: "Raro",
    habilidad: "Crea una explosión de fuego al hacer suficiente daño a un enemigo.",
    ubicacion: "Por confirmar",
    fuente: "Epic / fortnite.gg",
    variantes: crearVariantes("fuego", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_ACTIVO,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "pato",
    nombreES: "Patito",
    nombreEN: "Duck Sprite",
    rarezaBase: "Épico",
    habilidad: "Hacer emotes o jamming rellena escudo.",
    ubicacion: "Bóvedas",
    fuente: "Epic / fortnite.gg",
    variantes: crearVariantes("pato", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_UNRELEASED,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "fantasma",
    nombreES: "Fantasma",
    nombreEN: "Ghost Sprite",
    rarezaBase: "Épico",
    habilidad: "Otorga camuflaje por un tiempo al recargar.",
    ubicacion: "Por confirmar",
    fuente: "Epic / fortnite.gg",
    variantes: crearVariantes("fantasma", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_ACTIVO,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "onirico",
    nombreES: "Dormilón",
    nombreEN: "Dream Sprite",
    rarezaBase: "Legendario",
    habilidad: "Entrega un objeto aleatorio en cada nivel y explota con botín legendario al nivel máximo.",
    ubicacion: "Por confirmar",
    fuente: "Epic / fortnite.gg",
    variantes: crearVariantes("onirico", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_UNRELEASED,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "demonio",
    nombreES: "Demonio",
    nombreEN: "Demon Sprite",
    rarezaBase: "Épico",
    habilidad: "Roba algo de vida y escudo al eliminar enemigos.",
    ubicacion: "Por confirmar",
    fuente: "Epic / fortnite.gg",
    variantes: crearVariantes("demonio", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_UNRELEASED,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "punk",
    nombreES: "Punk",
    nombreEN: "Punk Sprite",
    rarezaBase: "Legendario",
    habilidad: "Posiblemente nada... o infinitamente algo.",
    ubicacion: "Por confirmar",
    fuente: "Epic / fortnite.gg",
    variantes: crearVariantes("punk", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_UNRELEASED,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "rey",
    nombreES: "Monarca",
    nombreEN: "King Sprite",
    rarezaBase: "Épico",
    habilidad: "Aumenta el daño del pico.",
    ubicacion: "Por confirmar",
    fuente: "Epic / fortnite.gg",
    variantes: crearVariantes("rey", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_ACTIVO,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "pollo",
    nombreES: "Pollo",
    nombreEN: "Pollo Sprite",
    rarezaBase: "Mítico",
    habilidad: "Por confirmar.",
    ubicacion: "Por confirmar",
    fuente: "fortnite.gg/sprites",
    variantes: varianteUnica("pollo", {
      estado: ESTADO_UNRELEASED,
      rareza: "Mítico",
      bonus: "Unreleased"
    })
  },

  {
    id: "vini-jr",
    nombreES: "Vini Jr.",
    nombreEN: "Vini Jr. Sprite",
    rarezaBase: "Mítico",
    habilidad: "Por confirmar.",
    ubicacion: "Por confirmar",
    fuente: "fortnite.gg/sprites",
    variantes: varianteUnica("vini-jr", {
      rareza: "Mítico",
      bonus: "Único, sin variantes especiales"
    })
  },

  {
    id: "mani-quemado",
    nombreES: "Burnt Peanut",
    nombreEN: "Burnt Peanut Sprite",
    rarezaBase: "Mítico",
    habilidad: "Por confirmar.",
    ubicacion: "Por confirmar",
    fuente: "fortnite.gg/sprites",
    variantes: varianteUnica("mani-quemado", {
      rareza: "Mítico",
      bonus: "Único, sin variantes especiales"
    })
  },

  {
    id: "punto-cero",
    nombreES: "Punto Cero",
    nombreEN: "Zero Point Sprite",
    rarezaBase: "Mítico",
    habilidad: "Genera una Shield Bubble Jr. al usar un objeto de curación en ti.",
    ubicacion: "Por confirmar",
    fuente: "Epic / fortnite.gg",
    variantes: crearVariantes("punto-cero", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_UNRELEASED,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "pez",
    nombreES: "Palito de Pez",
    nombreEN: "Fishy Sprite",
    rarezaBase: "Raro",
    habilidad: "Por confirmar.",
    ubicacion: "Por confirmar",
    fuente: "fortnite.gg/sprites",
    variantes: crearVariantes("pez", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_UNRELEASED,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "delantero",
    nombreES: "Goleador",
    nombreEN: "Striker Sprite",
    rarezaBase: "Épico",
    habilidad: "Por confirmar.",
    ubicacion: "Por confirmar",
    fuente: "fortnite.gg/sprites",
    variantes: crearVariantes("delantero", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_ACTIVO,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "aura",
    nombreES: "Aura",
    nombreEN: "Aura Sprite",
    rarezaBase: "Épico",
    habilidad: "Por confirmar.",
    ubicacion: "Por confirmar",
    fuente: "fortnite.gg/sprites",
    variantes: crearVariantes("aura", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_UNRELEASED,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "jefe",
    nombreES: "Jefe",
    nombreEN: "Boss Sprite",
    rarezaBase: "Legendario",
    habilidad: "Por confirmar.",
    ubicacion: "Por confirmar",
    fuente: "fortnite.gg/sprites",
    variantes: crearVariantes("jefe", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_UNRELEASED,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "parca",
    nombreES: "Parca",
    nombreEN: "Grim Sprite",
    rarezaBase: "Mítico",
    habilidad: "Por confirmar.",
    ubicacion: "Por confirmar",
    fuente: "fortnite.gg/sprites",
    variantes: crearVariantes("parca", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_UNRELEASED,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "aire",
    nombreES: "Aire",
    nombreEN: "Air Sprite",
    rarezaBase: "Raro",
    habilidad: "Por confirmar.",
    ubicacion: "Por confirmar",
    fuente: "fortnite.gg/sprites",
    variantes: crearVariantes("aire", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_ACTIVO,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "siete",
    nombreES: "Siete",
    nombreEN: "Seven Sprite",
    rarezaBase: "Legendario",
    habilidad: "Por confirmar.",
    ubicacion: "Por confirmar",
    fuente: "fortnite.gg/sprites",
    variantes: crearVariantes("siete", variantesCompletas({
      gem: ESTADO_UNRELEASED,
      holofoil: ESTADO_ACTIVO,
      cube: ESTADO_UNRELEASED,
      quack: ESTADO_UNRELEASED
    }))
  },

  {
    id: "john-wick",
    nombreES: "John Wick",
    nombreEN: "John Wick Sprite",
    rarezaBase: "Mítico",
    habilidad: "Por confirmar.",
    ubicacion: "Por confirmar",
    fuente: "fortnite.gg/sprites",
    variantes: varianteUnica("john-wick", {
      estado: ESTADO_UNRELEASED,
      rareza: "Mítico",
      bonus: "Unreleased"
    })
  }
];