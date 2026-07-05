/**
 * DATA.JS - Base de datos de Espíritus de Fortnite
 * 
 * ESTRUCTURA:
 * - 16 espíritus activos (15 base × 4 variantes + 1 único)
 * - 2 espíritus próximamente
 * - Variantes futuras (Holofoil, Gem) marcadas como "proximamente"
 * 
 * COLECCIONES:
 * - "actual": Espíritus y variantes disponibles ahora (CUENTAN EN PROGRESO)
 * - "proximamente": Espíritus y variantes futuras (NO CUENTAN EN PROGRESO)
 */

const espiritusData = [
  // ========== ESPÍRITUS ACTIVOS (COLECCIÓN ACTUAL) ==========
  
  {
    id: "agua",
    nombreES: "Espíritu de Agua",
    nombreEN: "Water Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 100,
    introducido: "C7S3",
    habilidad: "Otorga escudo a los compañeros de escuadrón cercanos cuando están en el agua.",
    ubicacion: "Cofres comunes o zonas cercanas al agua.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/agua-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/agua-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/agua-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/agua-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/agua-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/agua-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "tierra",
    nombreES: "Espíritu de Tierra",
    nombreEN: "Earth Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 100,
    introducido: "C7S3",
    habilidad: "Mayor probabilidad de encontrar objetos raros adicionales al abrir cofres.",
    ubicacion: "Cofres comunes y zonas con muchos árboles.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/tierra-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/tierra-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/tierra-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/tierra-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/tierra-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/tierra-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "fuego",
    nombreES: "Espíritu de Fuego",
    nombreEN: "Fire Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 100,
    introducido: "C7S3",
    habilidad: "Crea una explosión de fuego al infligir suficiente daño a un enemigo.",
    ubicacion: "Cofres comunes y zonas urbanas.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/fuego-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/fuego-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/fuego-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/fuego-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/fuego-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/fuego-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "pato",
    nombreES: "Espíritu Pato",
    nombreEN: "Duck Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 3000,
    introducido: "C7S3",
    habilidad: "Hacer gestos o tocar música recarga el escudo.",
    ubicacion: "Cofres comunes o zona de cancha/Cluster Coast.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/pato-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/pato-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/pato-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/pato-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/pato-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/pato-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "fantasma",
    nombreES: "Espíritu Fantasma",
    nombreEN: "Ghost Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 3000,
    introducido: "C7S3",
    habilidad: "Otorga invisibilidad durante un breve periodo al recargar.",
    ubicacion: "Deambulando por el mapa de noche.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/fantasma-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/fantasma-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/fantasma-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/fantasma-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/fantasma-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/fantasma-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "demonio",
    nombreES: "Espíritu Demonio",
    nombreEN: "Demon Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 3000,
    introducido: "C7S3",
    habilidad: "Otorga sifón al eliminar a un oponente.",
    ubicacion: "Cofres de espíritu.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/demonio-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/demonio-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/demonio-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/demonio-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/demonio-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/demonio-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "rey",
    nombreES: "Espíritu Rey",
    nombreEN: "King Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 3000,
    introducido: "C7S3",
    habilidad: "Aumenta el daño del pico.",
    ubicacion: "Cofres de espíritu.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/rey-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/rey-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/rey-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/rey-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/rey-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/rey-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "onirico",
    nombreES: "Espíritu Onírico",
    nombreEN: "Dream Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 5000,
    introducido: "C7S3",
    habilidad: "Otorga objeto aleatorio al subir nivel. Al máximo, explota con botín legendario.",
    ubicacion: "Cofres de espíritu.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/onirico-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/onirico-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/onirico-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/onirico-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/onirico-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/onirico-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "punk",
    nombreES: "Espíritu Punk",
    nombreEN: "Punk Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 5000,
    introducido: "C7S3",
    habilidad: "Inactivo hasta nivel 5; mejora munición ilimitada en nivel 5.",
    ubicacion: "Cofres de espíritu.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/punk-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/punk-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/punk-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/punk-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/punk-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/punk-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "punto-cero",
    nombreES: "Espíritu Punto Cero",
    nombreEN: "Zero Point Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 7500,
    introducido: "C7S3",
    habilidad: "Genera una Burbuja Escudo Jr. al usar objeto curativo.",
    ubicacion: "Cofres de espíritu.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/punto-cero-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/punto-cero-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/punto-cero-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/punto-cero-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/punto-cero-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/punto-cero-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "mani-quemado",
    nombreES: "Espíritu Maní Quemado",
    nombreEN: "Burnt Peanut Sprite",
    coleccion: "actual",
    permiteVariantes: false,
    costoInvocacion: 7500,
    introducido: "C7S3",
    habilidad: "Baja probabilidad de obtener botín adicional por eliminaciones.",
    ubicacion: "Cofres de espíritu o método especial según partida.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/mani-quemado-base.png", bonus: "Único, sin variantes especiales" }
    ]
  },

  {
    id: "delantero",
    nombreES: "Espíritu Delantero",
    nombreEN: "Striker Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 3000,
    introducido: "C7S3",
    habilidad: "Obtiene impulso de Overdrive al saltar, trepar o escalar muros.",
    ubicacion: "Metiendo un gol en la cancha de fútbol.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/delantero-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/delantero-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/delantero-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/delantero-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/delantero-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/delantero-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "pez",
    nombreES: "Espíritu Pez",
    nombreEN: "Fishy Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 100,
    introducido: "C7S3",
    habilidad: "Nada más rápido y obtiene aumento de velocidad breve al recibir daño.",
    ubicacion: "Cofres de espíritu o zonas de pesca/agua.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/pez-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/pez-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/pez-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/pez-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/pez-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/pez-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "aura",
    nombreES: "Espíritu Aura",
    nombreEN: "Aura Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 3000,
    introducido: "C7S3",
    habilidad: "Obtiene carga de Shock Rock al infligir daño suficiente a enemigos.",
    ubicacion: "Cofres de espíritu.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/aura-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/aura-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/aura-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/aura-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/aura-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/aura-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "jefe",
    nombreES: "Espíritu Jefe",
    nombreEN: "Boss Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 5000,
    introducido: "C7S3",
    habilidad: "Aumenta la salud y el escudo máximos.",
    ubicacion: "Chance al derrotar a un jefe.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/jefe-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/jefe-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/jefe-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/jefe-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/jefe-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/jefe-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  {
    id: "parca",
    nombreES: "Espíritu Parca",
    nombreEN: "Grim Reaper Sprite",
    coleccion: "actual",
    permiteVariantes: true,
    costoInvocacion: 7500,
    introducido: "C7S3",
    habilidad: "Quien te ataque será escaneado durante un tiempo.",
    ubicacion: "Cofres de espíritu.",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "confirmado-comunidad",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "actual", estado: "activo", imagen: "img/parca-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "actual", estado: "activo", imagen: "img/parca-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "actual", estado: "activo", imagen: "img/parca-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "actual", estado: "activo", imagen: "img/parca-galaxy.png", bonus: "30% más munición al recoger" },
      { id: "holofoil", nombre: "Holofoil", coleccion: "proximamente", estado: "proximamente", imagen: "img/parca-holofoil.png", bonus: "30% para encontrar Sprites raros" },
      { id: "gem", nombre: "Gem", coleccion: "proximamente", estado: "proximamente", imagen: "img/parca-gem.png", bonus: "30% menos daño por caída" }
    ]
  },

  // ========== ESPÍRITUS PRÓXIMAMENTE ==========
  
  {
    id: "aire",
    nombreES: "Espíritu de Aire",
    nombreEN: "Air Sprite",
    coleccion: "proximamente",
    permiteVariantes: true,
    costoInvocacion: 100,
    introducido: "Próxima Temporada",
    habilidad: "Aumenta la velocidad de carrera y la altura del salto.",
    ubicacion: "Por confirmar",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "por-confirmar",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "proximamente", estado: "proximamente", imagen: "img/aire-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "proximamente", estado: "proximamente", imagen: "img/aire-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "proximamente", estado: "proximamente", imagen: "img/aire-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "proximamente", estado: "proximamente", imagen: "img/aire-galaxy.png", bonus: "30% más munición al recoger" }
    ]
  },

  {
    id: "siete",
    nombreES: "Espíritu Siete",
    nombreEN: "Seven Sprite",
    coleccion: "proximamente",
    permiteVariantes: true,
    costoInvocacion: 5000,
    introducido: "Próxima Temporada",
    habilidad: "Los rastros de jugadores enemigos son visibles para tu escuadrón.",
    ubicacion: "Por confirmar",
    fuente: "Wiki/Fandom",
    estadoConfirmacion: "por-confirmar",
    variantes: [
      { id: "base", nombre: "Base", coleccion: "proximamente", estado: "proximamente", imagen: "img/siete-base.png", bonus: "Sin bonus especial" },
      { id: "gold", nombre: "Gold", coleccion: "proximamente", estado: "proximamente", imagen: "img/siete-gold.png", bonus: "3x más XP de Sprite por eliminaciones" },
      { id: "gummy", nombre: "Gummy", coleccion: "proximamente", estado: "proximamente", imagen: "img/siete-gummy.png", bonus: "20% más de Polvo de Sprite" },
      { id: "galaxy", nombre: "Galaxy", coleccion: "proximamente", estado: "proximamente", imagen: "img/siete-galaxy.png", bonus: "30% más munición al recoger" }
    ]
  }
];

/**
 * COMENTARIOS PARA EXTENSIÓN:
 * 
 * Para agregar nuevo espíritu:
 * 1. Crear objeto con estructura:
 *    - id, nombreES, nombreEN
 *    - coleccion: "actual" o "proximamente"
 *    - permiteVariantes: true o false
 *    - costoInvocacion, introducido, habilidad, ubicacion
 *    - fuente: "Oficial Epic" | "Epic Support" | "Wiki/Fandom" | "Filtrado" | "Por confirmar"
 *    - estadoConfirmacion: "confirmado" | "confirmado-comunidad" | "filtrado" | "por-confirmar"
 *    - variantes: array con id, nombre, coleccion, estado, imagen, bonus
 * 
 * 2. Para variantes futuras dentro de espíritu actual:
 *    - Usar coleccion: "proximamente" en la variante
 *    - estado: "proximamente"
 *    - NO contará en progreso principal
 * 
 * 3. Para espíritus nuevos futuros:
 *    - Usar coleccion: "proximamente"
 *    - Todas sus variantes también "proximamente"
 *    - Aparecerán en sección separada bloqueados
 */

