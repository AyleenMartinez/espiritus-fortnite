// ============================================================
// SCRIPT.JS - Checklist Sprites Fortnite
// Compatible con variantes activas y unreleased.
// ============================================================

let spritesCollected = {};
let spritesMastered = {};
let filtroActual = "todos";
let busquedaActual = "";
let mostrarUnreleased = false;

const STORAGE_COLLECTED = "spritesCollectedV3";
const STORAGE_MASTERED = "spritesMasteredV3";

function cargarProgreso() {
  try {
    spritesCollected = JSON.parse(localStorage.getItem(STORAGE_COLLECTED)) || {};
  } catch {
    spritesCollected = {};
  }

  try {
    spritesMastered = JSON.parse(localStorage.getItem(STORAGE_MASTERED)) || {};
  } catch {
    spritesMastered = {};
  }
}

function guardarProgreso() {
  localStorage.setItem(STORAGE_COLLECTED, JSON.stringify(spritesCollected));
  localStorage.setItem(STORAGE_MASTERED, JSON.stringify(spritesMastered));
  actualizarPagina();
}

function esDisponible(variante) {
  return variante.estado === "activo";
}

function esUnreleased(variante) {
  return variante.estado === "unreleased";
}

function claveSprite(sprite, variante) {
  return `${sprite.id}-${variante.id}`;
}

function normalizarTexto(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function normalizarClase(texto) {
  return normalizarTexto(texto).replace(/\s+/g, "-");
}

function obtenerTituloTarjeta(sprite, variante) {
  if (variante.id === "base") {
    return sprite.nombreES;
  }

  return `${variante.nombre} ${sprite.nombreES}`;
}

function obtenerRarezaVariante(sprite, variante) {
  return variante.rareza || sprite.rarezaBase || "Por confirmar";
}

function obtenerPlaceholderVariante(varianteId) {
  const placeholders = {
    base: "●",
    gold: "★",
    gummy: "🍬",
    galaxy: "✦",
    gem: "💎",
    holofoil: "🌈",
    cube: "◼",
    quack: "🦆"
  };

  return placeholders[varianteId] || "?";
}

function obtenerTextoBuscable(sprite, variante) {
  return normalizarTexto([
    sprite.id,
    sprite.nombreES,
    sprite.nombreEN,
    sprite.rarezaBase,
    sprite.habilidad,
    sprite.ubicacion,
    variante.id,
    variante.nombre,
    variante.bonus,
    variante.estado,
    obtenerTituloTarjeta(sprite, variante)
  ].join(" "));
}

function calcularEstadisticas() {
  let totalDisponibles = 0;
  let conseguidos = 0;
  let dominados = 0;
  let unreleased = 0;

  spritesData.forEach(sprite => {
    sprite.variantes.forEach(variante => {
      const clave = claveSprite(sprite, variante);

      if (esUnreleased(variante)) {
        unreleased++;
        return;
      }

      if (esDisponible(variante)) {
        totalDisponibles++;

        if (spritesCollected[clave]) conseguidos++;
        if (spritesMastered[clave]) dominados++;
      }
    });
  });

  const porcentaje = totalDisponibles === 0
    ? 0
    : Math.round((conseguidos / totalDisponibles) * 100);

  return {
    totalDisponibles,
    conseguidos,
    faltantes: totalDisponibles - conseguidos,
    dominados,
    unreleased,
    porcentaje
  };
}

function actualizarEstadisticas() {
  const stats = calcularEstadisticas();

  document.getElementById("conseguidos-total").textContent = stats.conseguidos;
  document.getElementById("total-espiritus").textContent = stats.totalDisponibles;
  document.getElementById("dominados-total").textContent = stats.dominados;

  document.getElementById("porcentaje-valor").textContent =
    stats.totalDisponibles > 0 && stats.conseguidos === stats.totalDisponibles
      ? "Completado"
      : `${stats.porcentaje}%`;

  document.getElementById("porcentaje-completado-barra").textContent = `${stats.porcentaje}%`;

  const barra = document.getElementById("barra-progreso");
  barra.style.width = `${stats.porcentaje}%`;
  barra.className = "barra-progreso";

  if (stats.porcentaje < 25) barra.classList.add("rojo");
  else if (stats.porcentaje < 50) barra.classList.add("naranja");
  else if (stats.porcentaje < 75) barra.classList.add("amarillo");
  else barra.classList.add("verde");
}

function contarPorFiltro(filtro) {
  let count = 0;

  spritesData.forEach(sprite => {
    sprite.variantes.forEach(variante => {
      const clave = claveSprite(sprite, variante);
      const unreleased = esUnreleased(variante);
      const disponible = esDisponible(variante);

      if (!mostrarUnreleased && unreleased) return;

      if (filtro === "todos") count++;
      else if (filtro === "disponibles" && disponible) count++;
      else if (filtro === "unreleased" && unreleased) count++;
      else if (filtro === "conseguidos" && spritesCollected[clave]) count++;
      else if (filtro === "faltantes" && disponible && !spritesCollected[clave]) count++;
      else if (filtro === "dominados" && spritesMastered[clave]) count++;
      else if (filtro === variante.id) count++;
    });
  });

  return count;
}

function generarFiltrosConContadores() {
  const select = document.getElementById("select-filtros");
  if (!select) return;

  if (!mostrarUnreleased && filtroActual === "unreleased") {
    filtroActual = "todos";
  }

  const filtros = [
    { id: "todos", emoji: "📦", label: "Todos" },
    { id: "disponibles", emoji: "✅", label: "Disponibles" },
    { id: "conseguidos", emoji: "✓", label: "Conseguidos" },
    { id: "faltantes", emoji: "✗", label: "Faltantes" },
    { id: "dominados", emoji: "👑", label: "Dominados" },
    { id: "base", emoji: "🟣", label: "Base" },
    { id: "gold", emoji: "⭐", label: "Gold" },
    { id: "gummy", emoji: "🍬", label: "Gummy" },
    { id: "galaxy", emoji: "✨", label: "Galaxy" },
    { id: "gem", emoji: "💎", label: "Gem" },
    { id: "holofoil", emoji: "🌈", label: "Holofoil" },
    { id: "cube", emoji: "◼", label: "Cube" },
    { id: "quack", emoji: "🦆", label: "Quack" }
  ];

  if (mostrarUnreleased) {
    filtros.splice(5, 0, { id: "unreleased", emoji: "🔒", label: "Unreleased" });
  }

  select.innerHTML = "";

  filtros.forEach(filtro => {
    const opcion = document.createElement("option");
    opcion.value = filtro.id;
    opcion.textContent = `${filtro.emoji} ${filtro.label} (${contarPorFiltro(filtro.id)})`;

    if (filtro.id === filtroActual) {
      opcion.selected = true;
    }

    select.appendChild(opcion);
  });

  select.onchange = function () {
    filtroActual = this.value;
    aplicarFiltro();
  };
}

function generarTarjetas() {
  const contenedor = document.getElementById("contenedor-tarjetas");
  contenedor.innerHTML = "";

  spritesData.forEach(sprite => {
    contenedor.appendChild(crearBloqueSprite(sprite));
  });
}

function crearBloqueSprite(sprite) {
  const bloque = document.createElement("section");
  bloque.className = "bloque-sprite";
  bloque.id = `sprite-${sprite.id}`;
  bloque.dataset.search = normalizarTexto(`${sprite.nombreES} ${sprite.nombreEN}`);

  const variantesDisponibles = sprite.variantes.filter(esDisponible).length;
  const variantesUnreleased = sprite.variantes.filter(esUnreleased).length;

  const header = document.createElement("header");
  header.className = "bloque-header";

  header.innerHTML = `
    <div class="bloque-titulo-linea">
      <div>
        <h3>${sprite.nombreES}</h3>
        <p class="nombre-ingles">${sprite.nombreEN || ""}</p>
      </div>

      <div class="resumen-bloque">
        <span>${variantesDisponibles} disponibles</span>
        ${variantesUnreleased > 0 ? `<span>${variantesUnreleased} unreleased</span>` : ""}
      </div>
    </div>

    <p class="habilidad-sprite">${sprite.habilidad || ""}</p>

    <div class="meta-sprite">
      <span>🏷️ ${sprite.rarezaBase || "Por confirmar"}</span>
      <span>📍 ${sprite.ubicacion || "Por confirmar"}</span>
      <span>🔎 ${sprite.fuente || "Referencia"}</span>
    </div>
  `;

  const grilla = document.createElement("div");
  grilla.className = "contenedor-variantes";

  sprite.variantes.forEach(variante => {
    grilla.appendChild(crearTarjetaVariante(sprite, variante));
  });

  bloque.appendChild(header);
  bloque.appendChild(grilla);

  return bloque;
}

function crearTarjetaVariante(sprite, variante) {
  const tarjeta = document.createElement("article");
  const clave = claveSprite(sprite, variante);
  const conseguida = Boolean(spritesCollected[clave]);
  const dominada = Boolean(spritesMastered[clave]);
  const disponible = esDisponible(variante);
  const unreleased = esUnreleased(variante);
  const rareza = obtenerRarezaVariante(sprite, variante);

  tarjeta.className = "tarjeta-variante";
  tarjeta.id = clave;
  tarjeta.dataset.search = obtenerTextoBuscable(sprite, variante);
  tarjeta.dataset.variante = variante.id;
  tarjeta.dataset.estado = variante.estado;

  if (conseguida) tarjeta.classList.add("conseguido");
  if (dominada) tarjeta.classList.add("dominado");
  if (unreleased) tarjeta.classList.add("unreleased");

  tarjeta.innerHTML = `
    ${dominada ? `<div class="insignia-dominado">👑</div>` : ""}

    <div class="imagen-variante">
      <img
        src="${variante.imagen}"
        alt="${obtenerTituloTarjeta(sprite, variante)}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      >
      <div class="imagen-placeholder placeholder-${variante.id}">
        ${obtenerPlaceholderVariante(variante.id)}
      </div>
    </div>

    <h4 class="titulo-card">${obtenerTituloTarjeta(sprite, variante)}</h4>

    <div class="badges-card">
      <span class="etiqueta-rareza rareza-${normalizarClase(rareza)}">${rareza}</span>
      ${unreleased ? `<span class="etiqueta-unreleased">Unreleased</span>` : ""}
    </div>

    <p class="bonus-variante">${variante.bonus || "Sin bonus especial"}</p>

    <div class="acciones-variante">
      ${
        unreleased
          ? `<button class="boton-unreleased" type="button" disabled>Unreleased</button>`
          : `
            <button class="boton-variante boton-tengo" type="button">
              ${conseguida ? "✓ Conseguido" : "Lo tengo"}
            </button>

            <button class="boton-dominado ${dominada ? "activo" : ""}" type="button">
              ${dominada ? "👑 Dominado" : "Dominado"}
            </button>
          `
      }
    </div>
  `;

  if (disponible) {
    const botonTengo = tarjeta.querySelector(".boton-tengo");
    const botonDominado = tarjeta.querySelector(".boton-dominado");

    botonTengo.addEventListener("click", event => {
      event.stopPropagation();
      toggleSprite(clave);
    });

    botonDominado.addEventListener("click", event => {
      event.stopPropagation();
      toggleDominado(clave);
    });
  }

  return tarjeta;
}

function toggleSprite(clave) {
  spritesCollected[clave] = !spritesCollected[clave];

  if (!spritesCollected[clave]) {
    spritesMastered[clave] = false;
  }

  guardarProgreso();
}

function toggleDominado(clave) {
  spritesMastered[clave] = !spritesMastered[clave];

  if (spritesMastered[clave]) {
    spritesCollected[clave] = true;
  }

  guardarProgreso();
}

function aplicarFiltro() {
  const bloques = document.querySelectorAll(".bloque-sprite");
  let hayResultados = false;

  bloques.forEach(bloque => {
    const tarjetas = bloque.querySelectorAll(".tarjeta-variante");
    let bloqueTieneVisible = false;

    tarjetas.forEach(tarjeta => {
      const visible = debeVerse(tarjeta);
      tarjeta.style.display = visible ? "flex" : "none";

      if (visible) bloqueTieneVisible = true;
    });

    bloque.style.display = bloqueTieneVisible ? "block" : "none";

    if (bloqueTieneVisible) hayResultados = true;
  });

  mostrarMensajeVacio(!hayResultados);
}

function debeVerse(tarjeta) {
  const clave = tarjeta.id;
  const estado = tarjeta.dataset.estado;
  const variante = tarjeta.dataset.variante;

  const esUnreleasedCard = estado === "unreleased";
  const esDisponibleCard = estado === "activo";

  // Por defecto, los unreleased NO se muestran
  if (esUnreleasedCard && !mostrarUnreleased) return false;

  if (filtroActual === "disponibles" && !esDisponibleCard) return false;
  if (filtroActual === "unreleased" && !esUnreleasedCard) return false;
  if (filtroActual === "conseguidos" && !spritesCollected[clave]) return false;
  if (filtroActual === "faltantes" && (!esDisponibleCard || spritesCollected[clave])) return false;
  if (filtroActual === "dominados" && !spritesMastered[clave]) return false;

  const filtrosVariantes = ["base", "gold", "gummy", "galaxy", "gem", "holofoil", "cube", "quack"];

  if (filtrosVariantes.includes(filtroActual) && variante !== filtroActual) return false;

  if (busquedaActual && !tarjeta.dataset.search.includes(busquedaActual)) return false;

  return true;
}

function mostrarMensajeVacio(vacio) {
  const contenedor = document.getElementById("contenedor-tarjetas");
  let mensaje = contenedor.querySelector(".sin-resultados");

  if (vacio && !mensaje) {
    mensaje = document.createElement("div");
    mensaje.className = "sin-resultados";
    mensaje.textContent = "No se encontraron sprites con este filtro";
    contenedor.appendChild(mensaje);
  }

  if (!vacio && mensaje) {
    mensaje.remove();
  }
}

function reiniciarColeccion() {
  const confirmar = confirm("¿Seguro? Se borrarán conseguidos y dominados.");

  if (!confirmar) return;

  spritesCollected = {};
  spritesMastered = {};
  guardarProgreso();
}

function actualizarPagina() {
  actualizarEstadisticas();
  generarFiltrosConContadores();
  generarTarjetas();
  generarMenuSprites();
  aplicarFiltro();
}

function generarMenuSprites() {
  const selectSprites = document.getElementById("select-sprites");
  if (!selectSprites) return;

  selectSprites.innerHTML = `<option value="">Elegir sprite...</option>`;

  const spritesOrdenados = [...spritesData].sort((a, b) =>
    a.nombreES.localeCompare(b.nombreES, "es")
  );

  spritesOrdenados.forEach(sprite => {
    const disponibles = sprite.variantes.filter(esDisponible).length;
    const unreleased = sprite.variantes.filter(esUnreleased).length;
    const soloUnreleased = disponibles === 0 && unreleased > 0;

    const opcion = document.createElement("option");
    opcion.value = sprite.id;
    opcion.textContent = soloUnreleased
      ? `🔒 ${sprite.nombreES}`
      : sprite.nombreES;

    selectSprites.appendChild(opcion);
  });
}

function actualizarBotonUnreleased() {
  const botonToggleUnreleased = document.getElementById("boton-toggle-unreleased");

  if (!botonToggleUnreleased) return;

  botonToggleUnreleased.classList.toggle("activo", mostrarUnreleased);
  botonToggleUnreleased.textContent = mostrarUnreleased
    ? "🙈 Ocultar unreleased"
    : "👁️ Ver unreleased";
}

function irASprite(spriteId) {
  if (!spriteId) return;

  const sprite = spritesData.find(item => item.id === spriteId);
  if (!sprite) return;

  const buscador = document.getElementById("buscador");

  // Limpia búsqueda para que el bloque no quede escondido
  busquedaActual = "";
  if (buscador) buscador.value = "";

  // Vuelve a mostrar todos
  filtroActual = "todos";

  // Si el sprite solo existe como unreleased, activa unreleased automáticamente
  const disponibles = sprite.variantes.filter(esDisponible).length;
  const unreleased = sprite.variantes.filter(esUnreleased).length;

  if (disponibles === 0 && unreleased > 0) {
    mostrarUnreleased = true;
    actualizarBotonUnreleased();
  }

  generarFiltrosConContadores();
  aplicarFiltro();

  const bloque = document.getElementById(`sprite-${spriteId}`);

  if (bloque) {
    bloque.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    bloque.classList.add("resaltado-scroll");

    setTimeout(() => {
      bloque.classList.remove("resaltado-scroll");
    }, 1400);
  }
}

function configurarEventListeners() {
  const buscador = document.getElementById("buscador");
  const botonReiniciar = document.getElementById("boton-reiniciar");
  const botonSubir = document.getElementById("boton-subir");
  const botonToggleUnreleased = document.getElementById("boton-toggle-unreleased");
  const selectSprites = document.getElementById("select-sprites");

  if (buscador) {
    buscador.addEventListener("input", function () {
      busquedaActual = normalizarTexto(this.value);
      aplicarFiltro();
    });
  }

  if (selectSprites) {
  selectSprites.addEventListener("change", function () {
    irASprite(this.value);
  });
}

  if (botonReiniciar) {
    botonReiniciar.addEventListener("click", reiniciarColeccion);
  }

  if (botonToggleUnreleased) {
  botonToggleUnreleased.addEventListener("click", function () {
    mostrarUnreleased = !mostrarUnreleased;

    if (!mostrarUnreleased && filtroActual === "unreleased") {
      filtroActual = "todos";
    }

    botonToggleUnreleased.classList.toggle("activo", mostrarUnreleased);
    botonToggleUnreleased.textContent = mostrarUnreleased
      ? "🙈 Ocultar unreleased"
      : "👁️ Ver unreleased";

    generarFiltrosConContadores();
    aplicarFiltro();
  });
}

  if (botonSubir) {
    window.addEventListener("scroll", function () {
      botonSubir.classList.toggle("visible", window.scrollY > 400);
    });

    botonSubir.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

window.addEventListener("DOMContentLoaded", function () {
  cargarProgreso();
  configurarEventListeners();
  actualizarPagina();
});