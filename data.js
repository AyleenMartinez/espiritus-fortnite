// ============================================================
// DATA.JS - Datos de Espíritus Fortnite
// Colección actual: 15 espíritus x 4 variantes + Maní único = 61
// ============================================================

const variantesComunes = [
  {
    id: "base",
    nombre: "Base",
    coleccion: "actual",
    estado: "activo",
    bonus: "Sin bonus especial"
  },
  {
    id: "gold",
    nombre: "Gold",
    coleccion: "actual",
    estado: "activo",
    bonus: "3x más XP de Sprite por eliminaciones"
  },
  {
    id: "gummy",
    nombre: "Gummy",
    coleccion: "actual",
    estado: "activo",
    bonus: "20% más de Polvo de Sprite"
  },
  {
    id: "galaxy",
    nombre: "Galaxy",
    coleccion: "actual",
    estado: "activo",
    bonus: "30% más munición al recoger"
  }
];

function crearVariantes(idEspiritu) {
  return variantesComunes.map(variante => ({
    ...variante,
    imagen: `img/${idEspiritu}-${variante.id}.png`
  }));
}

const espiritusData = [
  {
    id: "agua",
    nombreES: "Espíritu de Agua",
    nombreEN: "Water Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Raro",
    costoInvocacion: 100,
    introducido: "C7S3",
    habilidad: "Rellena tu escudo y el de tus aliados si estás en el agua.",
    ubicacion: "Cerca de ríos y playas",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: crearVariantes("agua")
  },

  {
    id: "tierra",
    nombreES: "Espíritu de Tierra",
    nombreEN: "Earth Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Raro",
    costoInvocacion: 100,
    introducido: "C7S3",
    habilidad: "Aumenta la probabilidad de encontrar objetos raros al abrir cofres.",
    ubicacion: "Zonas boscosas y forestales",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: crearVariantes("tierra")
  },

  {
    id: "fuego",
    nombreES: "Espíritu de Fuego",
    nombreEN: "Fire Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Raro",
    costoInvocacion: 100,
    introducido: "C7S3",
    habilidad: "Invoca fuego cuando haces suficiente daño a un enemigo.",
    ubicacion: "Zonas urbanas",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: crearVariantes("fuego")
  },

  {
    id: "pato",
    nombreES: "Espíritu Patito",
    nombreEN: "Duck Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Épico",
    costoInvocacion: 3000,
    introducido: "C7S3",
    habilidad: "Rellena tus escudos cuando haces un emote, bailas o tocas música.",
    ubicacion: "Bóvedas",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: crearVariantes("pato")
  },

  {
    id: "fantasma",
    nombreES: "Espíritu Fantasma",
    nombreEN: "Ghost Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Épico",
    costoInvocacion: 3000,
    introducido: "C7S3",
    habilidad: "Al recargar, te vuelves invisible durante un breve tiempo.",
    ubicacion: "Durante la noche",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: crearVariantes("fantasma")
  },

  {
    id: "demonio",
    nombreES: "Espíritu Demoniaco",
    nombreEN: "Demon Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Épico",
    costoInvocacion: 3000,
    introducido: "C7S3",
    habilidad: "Al eliminar a un enemigo, robas vida y escudo.",
    ubicacion: "Cofres de espíritus",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: crearVariantes("demonio")
  },

  {
    id: "rey",
    nombreES: "Espíritu Monarca",
    nombreEN: "King Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Épico",
    costoInvocacion: 3000,
    introducido: "C7S3",
    habilidad: "Aumenta el daño de tu pico.",
    ubicacion: "Cofres de espíritus",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: crearVariantes("rey")
  },

  {
    id: "punk",
    nombreES: "Espíritu Punk",
    nombreEN: "Punk Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Legendario",
    costoInvocacion: 5000,
    introducido: "C7S3",
    habilidad: "Al dominarlo, puede darte munición infinita.",
    ubicacion: "Cofres de espíritus",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: crearVariantes("punk")
  },

  {
    id: "onirico",
    nombreES: "Espíritu Dormilón",
    nombreEN: "Dream Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Legendario",
    costoInvocacion: 5000,
    introducido: "C7S3",
    habilidad: "Cada vez que sube de nivel te da un objeto aleatorio. Al llegar al nivel 5, explota y entrega botín legendario.",
    ubicacion: "Cajas de almacenamiento",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: crearVariantes("onirico")
  },

  {
    id: "punto-cero",
    nombreES: "Espíritu del Punto Cero",
    nombreEN: "Zero Point Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Mítico",
    costoInvocacion: 7500,
    introducido: "C7S3",
    habilidad: "Cuando usas un objeto de curación, aparece una burbuja de escudo a tu alrededor.",
    ubicacion: "Cofres de espíritus",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: crearVariantes("punto-cero")
  },

  {
    id: "delantero",
    nombreES: "Espíritu Goleador",
    nombreEN: "Striker Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Épico",
    costoInvocacion: 3000,
    introducido: "C7S3",
    habilidad: "Obtienes impulso de Overdrive al saltar, trepar o escalar muros.",
    ubicacion: "Metiendo un gol en la cancha de fútbol",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "por-confirmar",
    variantes: crearVariantes("delantero")
  },

  {
    id: "pez",
    nombreES: "Espíritu Palito de Pez",
    nombreEN: "Fishy Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Raro",
    costoInvocacion: 100,
    introducido: "C7S3",
    habilidad: "Nadas más rápido y obtienes un breve aumento de velocidad al recibir daño.",
    ubicacion: "Cofres de espíritu o zonas de pesca/agua",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "por-confirmar",
    variantes: crearVariantes("pez")
  },

  {
    id: "aura",
    nombreES: "Espíritu Aura",
    nombreEN: "Aura Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Épico",
    costoInvocacion: 3000,
    introducido: "C7S3",
    habilidad: "Obtienes una carga de Shock Rock al hacer suficiente daño a enemigos.",
    ubicacion: "Cofres de espíritus",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "por-confirmar",
    variantes: crearVariantes("aura")
  },

  {
    id: "jefe",
    nombreES: "Espíritu Jefe",
    nombreEN: "Boss Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Legendario",
    costoInvocacion: 5000,
    introducido: "C7S3",
    habilidad: "Aumenta tu salud y escudo máximos.",
    ubicacion: "Puede aparecer al derrotar a un jefe",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "por-confirmar",
    variantes: crearVariantes("jefe")
  },

  {
    id: "parca",
    nombreES: "Espíritu Parca",
    nombreEN: "Grim Reaper Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    rarezaBase: "Legendario",
    costoInvocacion: 7500,
    introducido: "C7S3",
    habilidad: "Marca durante un tiempo a los jugadores que te atacan.",
    ubicacion: "Cofres de espíritus",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "por-confirmar",
    variantes: crearVariantes("parca")
  },

  {
    id: "mani-quemado",
    nombreES: "Espíritu Burnt Peanut",
    nombreEN: "Burnt Peanut Sprite",
    coleccion: "actual",
    permiteVariantes: false,
    rarezaBase: "Mítico",
    costoInvocacion: 7500,
    introducido: "C7S3",
    habilidad: "Te da una pequeña probabilidad de conseguir objetos raros al eliminar jugadores.",
    ubicacion: "Cofres de reliquia",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      {
        id: "base",
        nombre: "Base",
        coleccion: "actual",
        estado: "activo",
        imagen: "img/mani-quemado-base.png",
        bonus: "Único, sin variantes especiales"
      }
    ]
  },

  // ============================================================
  // PRÓXIMAMENTE / POR CONFIRMAR
  // No cuenta en el progreso principal.
  // ============================================================

  {
    id: "aire",
    nombreES: "Espíritu de Aire",
    nombreEN: "Air Sprite",
    coleccion: "proximamente",
    permiteVariantes: true,
    rarezaBase: "Por confirmar",
    costoInvocacion: 100,
    introducido: "C7S3",
    habilidad: "Aumenta la velocidad de carrera y la altura del salto.",
    ubicacion: "Por confirmar",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "por-confirmar",
    variantes: [
      {
        id: "base",
        nombre: "Base",
        coleccion: "proximamente",
        estado: "proximamente",
        imagen: "img/aire-base.png",
        bonus: "Por confirmar"
      }
    ]
  },

  {
    id: "siete",
    nombreES: "Espíritu Siete",
    nombreEN: "Seven Sprite",
    coleccion: "proximamente",
    permiteVariantes: true,
    rarezaBase: "Por confirmar",
    costoInvocacion: 5000,
    introducido: "C7S3",
    habilidad: "Los rastros de jugadores enemigos son visibles para tu escuadrón.",
    ubicacion: "Por confirmar",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "por-confirmar",
    variantes: [
      {
        id: "base",
        nombre: "Base",
        coleccion: "proximamente",
        estado: "proximamente",
        imagen: "img/siete-base.png",
        bonus: "Por confirmar"
      }
    ]
  }
];