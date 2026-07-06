// ============================================================
// SCRIPT.JS - Checklist de Espíritus Fortnite
// Vista compacta tipo colección, con filtros y progreso local.
// ============================================================

let spiritsCollected = {};
let filtroActual = 'coleccion-actual';
let busquedaActual = '';

// ============ LOCALSTORAGE ============
function cargarProgreso() {
    const guardado = localStorage.getItem('spiritsProgress');

    if (!guardado) return;

    try {
        spiritsCollected = JSON.parse(guardado);
    } catch (error) {
        console.error('Error al cargar progreso:', error);
        spiritsCollected = {};
    }
}

function guardarProgreso() {
    localStorage.setItem('spiritsProgress', JSON.stringify(spiritsCollected));
    actualizarPagina();
}

// ============ HELPERS ============
function esVarianteActual(variante) {
    return variante.coleccion === 'actual' && variante.estado === 'activo';
}

function claveEspiritu(espiritu, variante) {
    return `${espiritu.id}-${variante.id}`;
}

function normalizarTexto(texto) {
    return String(texto || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

function normalizarClase(texto) {
    return normalizarTexto(texto).replace(/\s+/g, '-');
}

function obtenerNombreCorto(espiritu) {
    return espiritu.nombreES
        .replace('Espíritu del ', '')
        .replace('Espíritu de ', '')
        .replace('Espíritu ', '')
        .trim();
}

function obtenerTituloTarjeta(espiritu, variante) {
    const nombreCorto = obtenerNombreCorto(espiritu);

    if (variante.id === 'base') return nombreCorto;
    return `${variante.nombre} ${nombreCorto}`;
}

function obtenerPlaceholderVariante(varianteId) {
    const placeholders = {
        base: '●',
        gold: '★',
        gummy: '🍬',
        galaxy: '✦'
    };

    return placeholders[varianteId] || '?';
}

function obtenerRarezaBase(espiritu) {
    if (espiritu.rarezaBase) return espiritu.rarezaBase;

    const rarezas = {
        agua: 'Raro',
        tierra: 'Raro',
        fuego: 'Raro',
        pato: 'Épico',
        fantasma: 'Épico',
        demonio: 'Épico',
        rey: 'Épico',
        punk: 'Legendario',
        onirico: 'Legendario',
        'punto-cero': 'Mítico',
        'mani-quemado': 'Mítico'
    };

    return rarezas[espiritu.id] || 'Por confirmar';
}

function obtenerRarezaVariante(espiritu, variante) {
    if (variante.rareza) return variante.rareza;
    if (variante.id !== 'base') return 'Especial';
    return obtenerRarezaBase(espiritu);
}

function obtenerTextoBuscable(espiritu, variante) {
    return normalizarTexto([
        espiritu.id,
        espiritu.nombreES,
        espiritu.nombreEN,
        espiritu.habilidad,
        espiritu.ubicacion,
        espiritu.costoInvocacion,
        variante.id,
        variante.nombre,
        variante.bonus,
        obtenerTituloTarjeta(espiritu, variante),
        obtenerRarezaVariante(espiritu, variante)
    ].join(' '));
}

// ============ ESTADÍSTICAS ============
function calcularEstadisticas() {
    let conseguidos = 0;
    let total = 0;

    const variantesConseguidas = {
        base: 0,
        gold: 0,
        gummy: 0,
        galaxy: 0
    };

    espiritusData.forEach(espiritu => {
        if (espiritu.coleccion !== 'actual') return;

        espiritu.variantes.forEach(variante => {
            if (!esVarianteActual(variante)) return;

            total++;

            const clave = claveEspiritu(espiritu, variante);
            if (spiritsCollected[clave]) {
                conseguidos++;
                if (variantesConseguidas[variante.id] !== undefined) {
                    variantesConseguidas[variante.id]++;
                }
            }
        });
    });

    const porcentaje = total === 0 ? 0 : Math.round((conseguidos / total) * 100);

    return {
        conseguidos,
        total,
        faltantes: total - conseguidos,
        porcentaje,
        variantesConseguidas
    };
}

function contarPorFiltro(filtro) {
    let count = 0;

    espiritusData.forEach(espiritu => {
        espiritu.variantes.forEach(variante => {
            const clave = claveEspiritu(espiritu, variante);
            const esProximamente = variante.coleccion === 'proximamente' || espiritu.coleccion === 'proximamente';
            const esActual = espiritu.coleccion === 'actual' && esVarianteActual(variante);

            if (filtro === 'proximamente') {
                if (esProximamente) count++;
                return;
            }

            if (!esActual) return;

            if (filtro === 'coleccion-actual') count++;
            else if (filtro === 'conseguidos' && spiritsCollected[clave]) count++;
            else if (filtro === 'faltantes' && !spiritsCollected[clave]) count++;
            else if (filtro === variante.id) count++;
        });
    });

    return count;
}

function actualizarEstadisticas() {
    const stats = calcularEstadisticas();

    document.getElementById('conseguidos-total').textContent = stats.conseguidos;
    document.getElementById('total-espiritus').textContent = stats.total;
    document.getElementById('faltantes-total').textContent = stats.faltantes;

    document.getElementById('porcentaje-valor').textContent =
        stats.total > 0 && stats.conseguidos === stats.total
            ? 'Completado'
            : `${stats.porcentaje}%`;

    document.getElementById('porcentaje-completado-barra').textContent = `${stats.porcentaje}%`;

    const barra = document.getElementById('barra-progreso');
    barra.style.width = `${stats.porcentaje}%`;
    barra.className = 'barra-progreso';

    if (stats.porcentaje < 25) barra.classList.add('rojo');
    else if (stats.porcentaje < 50) barra.classList.add('naranja');
    else if (stats.porcentaje < 75) barra.classList.add('amarillo');
    else barra.classList.add('verde');
}

// ============ FILTROS ============
function generarFiltrosConContadores() {
  const grupoFiltros = document.getElementById('grupo-filtros');
  const filtroActualTexto = document.getElementById('filtro-actual-texto');
  const botonMenuFiltros = document.getElementById('boton-menu-filtros');

  if (!grupoFiltros) return;

  grupoFiltros.innerHTML = '';

  const filtros = [
    { id: 'coleccion-actual', emoji: '📊', label: 'Colección Actual' },
    { id: 'conseguidos', emoji: '✓', label: 'Conseguidos' },
    { id: 'faltantes', emoji: '✗', label: 'Faltantes' },
    { id: 'base', emoji: '🟣', label: 'Base' },
    { id: 'gold', emoji: '⭐', label: 'Gold' },
    { id: 'gummy', emoji: '🍬', label: 'Gummy' },
    { id: 'galaxy', emoji: '✨', label: 'Galaxy' },
    { id: 'proximamente', emoji: '🔒', label: 'Próximamente' }
  ];

  filtros.forEach(filtro => {
    const count = contarPorFiltro(filtro.id);

    const boton = document.createElement('button');
    boton.className = 'boton-filtro';
    boton.type = 'button';
    boton.textContent = `${filtro.emoji} ${filtro.label} (${count})`;

    if (filtro.id === filtroActual) {
      boton.classList.add('activo');

      if (filtroActualTexto) {
        filtroActualTexto.textContent = `${filtro.label} (${count})`;
      }
    }

    boton.addEventListener('click', () => {
      filtroActual = filtro.id;

      if (filtroActualTexto) {
        filtroActualTexto.textContent = `${filtro.label} (${contarPorFiltro(filtro.id)})`;
      }

      generarFiltrosConContadores();
      aplicarFiltro();

      // En celular, cerrar menú después de elegir filtro
      grupoFiltros.classList.remove('abierto');

      if (botonMenuFiltros) {
        botonMenuFiltros.classList.remove('activo');
      }
    });

    grupoFiltros.appendChild(boton);
  });
}

// ============ RENDER ============
function generarTarjetas() {
    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = '';

    const actuales = espiritusData.filter(espiritu => espiritu.coleccion === 'actual');

    actuales.forEach(espiritu => {
        contenedor.appendChild(crearBloqueEspiritu(espiritu));
    });

    const proximamente = espiritusData.filter(espiritu => espiritu.coleccion === 'proximamente');

    if (proximamente.length > 0) {
        const seccionProx = document.createElement('section');
        seccionProx.className = 'seccion-proximamente';
        seccionProx.innerHTML = '<h2 class="titulo-proximamente">🔒 Próximamente / Por confirmar</h2>';

        proximamente.forEach(espiritu => {
            seccionProx.appendChild(crearBloqueEspiritu(espiritu, true));
        });

        contenedor.appendChild(seccionProx);
    }
}

function crearBloqueEspiritu(espiritu, esProximamente = false) {
    const bloque = document.createElement('section');
    bloque.className = 'bloque-espiritu';
    bloque.dataset.nombre = normalizarTexto(`${espiritu.nombreES} ${espiritu.nombreEN}`);

    if (espiritu.permiteVariantes === false) {
        bloque.classList.add('bloque-especial-unico');
    }

    if (esProximamente || espiritu.coleccion === 'proximamente') {
        bloque.classList.add('bloqueado');
    }

    const rareza = obtenerRarezaBase(espiritu);

    const header = document.createElement('header');
    header.className = 'bloque-header';
    header.innerHTML = `
  <div class="bloque-titulo-linea">
    <div>
      <h3>${espiritu.nombreES}</h3>
      <p class="nombre-ingles">${espiritu.nombreEN || ''}</p>
    </div>
  </div>
  <p class="habilidad-espiritu">${espiritu.habilidad || ''}</p>
  <div class="meta-espiritu">
    <span>📍 ${espiritu.ubicacion || 'Ubicación por confirmar'}</span>
    ${espiritu.costoInvocacion ? `<span>💠 ${espiritu.costoInvocacion} polvo</span>` : ''}
  </div>
`;

    const contenedorVariantes = document.createElement('div');
    contenedorVariantes.className = 'contenedor-variantes';

    espiritu.variantes.forEach(variante => {
        const esBloqueada = esProximamente || espiritu.coleccion === 'proximamente' || variante.coleccion === 'proximamente';
        const tarjeta = esBloqueada
            ? crearTarjetaVarianteBloqueada(espiritu, variante)
            : crearTarjetaVariante(espiritu, variante);

        contenedorVariantes.appendChild(tarjeta);
    });

    bloque.appendChild(header);
    bloque.appendChild(contenedorVariantes);

    return bloque;
}

function crearTarjetaVariante(espiritu, variante) {
    const tarjeta = document.createElement('article');
    const clave = claveEspiritu(espiritu, variante);
    const esConseguida = Boolean(spiritsCollected[clave]);
    const rareza = obtenerRarezaVariante(espiritu, variante);

    tarjeta.className = 'tarjeta-variante';
    tarjeta.id = clave;
    tarjeta.dataset.search = obtenerTextoBuscable(espiritu, variante);
    tarjeta.dataset.variante = variante.id;

    if (esConseguida) tarjeta.classList.add('conseguido');

    tarjeta.innerHTML = `
    <div class="imagen-variante">
      <img src="${variante.imagen}" alt="${obtenerTituloTarjeta(espiritu, variante)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="imagen-placeholder placeholder-${variante.id}">${obtenerPlaceholderVariante(variante.id)}</div>
    </div>

    <h4 class="titulo-card">${obtenerTituloTarjeta(espiritu, variante)}</h4>

    <div class="badges-card">
      <span class="etiqueta-rareza rareza-${normalizarClase(rareza)}">${rareza}</span>
    </div>

    <p class="bonus-variante">${variante.bonus || 'Sin bonus especial'}</p>

    <button class="boton-variante" type="button">
      ${esConseguida ? '✓ Conseguido' : 'Lo tengo'}
    </button>
  `;

    tarjeta.addEventListener('click', () => toggleEspiritu(clave));

    return tarjeta;
}

function crearTarjetaVarianteBloqueada(espiritu, variante) {
    const tarjeta = document.createElement('article');
    const rareza = obtenerRarezaVariante(espiritu, variante);

    tarjeta.className = 'tarjeta-variante bloqueada';
    tarjeta.id = claveEspiritu(espiritu, variante);
    tarjeta.dataset.search = obtenerTextoBuscable(espiritu, variante);
    tarjeta.dataset.variante = variante.id;

    tarjeta.innerHTML = `
    <div class="imagen-variante">
      <img src="${variante.imagen || ''}" alt="${obtenerTituloTarjeta(espiritu, variante)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="imagen-placeholder placeholder-${variante.id}">🔒</div>
    </div>

    <h4 class="titulo-card">${obtenerTituloTarjeta(espiritu, variante)}</h4>

    <div class="badges-card">
      <span class="etiqueta-rareza rareza-${normalizarClase(rareza)}">${rareza}</span>
    </div>

    <p class="bonus-variante">${variante.bonus || 'Por confirmar'}</p>
    <span class="estado-bloqueado">Próximamente</span>
  `;

    return tarjeta;
}

// ============ INTERACCIÓN ============
function toggleEspiritu(clave) {
    spiritsCollected[clave] = !spiritsCollected[clave];
    guardarProgreso();
}

function aplicarFiltro() {
    const bloques = document.querySelectorAll('.bloque-espiritu');
    let hayResultados = false;

    bloques.forEach(bloque => {
        const tarjetas = bloque.querySelectorAll('.tarjeta-variante');
        let bloqueTieneVisible = false;

        tarjetas.forEach(tarjeta => {
            const visible = debeVerseVisible(tarjeta);
            tarjeta.style.display = visible ? 'flex' : 'none';
            if (visible) bloqueTieneVisible = true;
        });

        bloque.style.display = bloqueTieneVisible ? 'block' : 'none';
        if (bloqueTieneVisible) hayResultados = true;
    });

    mostrarMensajeVacio(!hayResultados);
}

function debeVerseVisible(tarjeta) {
    const esBloqueada = tarjeta.classList.contains('bloqueada');

    if (filtroActual === 'coleccion-actual' && esBloqueada) return false;
    if (filtroActual === 'proximamente' && !esBloqueada) return false;
    if (filtroActual === 'conseguidos' && !tarjeta.classList.contains('conseguido')) return false;
    if (filtroActual === 'faltantes' && (tarjeta.classList.contains('conseguido') || esBloqueada)) return false;

    if (['base', 'gold', 'gummy', 'galaxy'].includes(filtroActual)) {
        if (tarjeta.dataset.variante !== filtroActual) return false;
        if (esBloqueada) return false;
    }

    if (busquedaActual && !tarjeta.dataset.search.includes(busquedaActual)) return false;

    return true;
}

function mostrarMensajeVacio(vacio) {
    const contenedor = document.getElementById('contenedor-tarjetas');
    let mensaje = contenedor.querySelector('.sin-resultados');

    if (vacio && !mensaje) {
        mensaje = document.createElement('div');
        mensaje.className = 'sin-resultados';
        mensaje.textContent = 'No se encontraron espíritus con este filtro';
        contenedor.appendChild(mensaje);
    }

    if (!vacio && mensaje) {
        mensaje.remove();
    }
}

function reiniciarColeccion() {
    const confirmar = confirm('¿Estás seguro? Se borrará toda la colección.\n\nEsta acción no se puede deshacer.');

    if (!confirmar) return;

    spiritsCollected = {};
    guardarProgreso();
    alert('✓ Colección reiniciada');
}

// ============ ACTUALIZAR PÁGINA ============
function actualizarPagina() {
    actualizarEstadisticas();
    generarFiltrosConContadores();
    generarTarjetas();
    aplicarFiltro();
}

function configurarEventListeners() {
  const buscador = document.getElementById('buscador');
  const botonReiniciar = document.getElementById('boton-reiniciar');
  const botonMenuFiltros = document.getElementById('boton-menu-filtros');
  const grupoFiltros = document.getElementById('grupo-filtros');
  const botonSubir = document.getElementById('boton-subir');

  if (buscador) {
    buscador.addEventListener('input', function () {
      busquedaActual = normalizarTexto(this.value);
      aplicarFiltro();
    });
  }

  if (botonReiniciar) {
    botonReiniciar.addEventListener('click', reiniciarColeccion);
  }

  if (botonMenuFiltros && grupoFiltros) {
    botonMenuFiltros.addEventListener('click', function () {
      grupoFiltros.classList.toggle('abierto');
      botonMenuFiltros.classList.toggle('activo');
    });
  }

  if (botonSubir) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        botonSubir.classList.add('visible');
      } else {
        botonSubir.classList.remove('visible');
      }
    });

    botonSubir.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

window.addEventListener('DOMContentLoaded', function () {
    cargarProgreso();
    configurarEventListeners();
    actualizarPagina();
});