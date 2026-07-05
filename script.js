// ============ ESTADO GLOBAL ============
let spiritsCollected = {};
let filtroActual = 'coleccion-actual';
let busquedaActual = '';
let ordenActual = 'original';

// Cargar datos guardados al iniciar
function cargarProgreso() {
    const guardado = localStorage.getItem('spiritsProgress');
    if (guardado) {
        try {
            spiritsCollected = JSON.parse(guardado);
        } catch (e) {
            console.error('Error al cargar progreso:', e);
        }
    }
}

function guardarProgreso() {
    localStorage.setItem('spiritsProgress', JSON.stringify(spiritsCollected));
    actualizarPagina();
}

// ============ CÁLCULOS ============
function calcularEstadisticas() {
    let conseguidos = 0;
    let total = 0;
    let variantesConseguidas = { base: 0, gold: 0, gummy: 0, galaxy: 0 };
    let variantesTotales = { base: 0, gold: 0, gummy: 0, galaxy: 0 };

    espiritusData.forEach(espiritu => {
        if (espiritu.coleccion !== 'actual') return;

        espiritu.variantes.forEach(variante => {
            if (variante.coleccion !== 'actual') return;

            const tipoVariante = variante.id;
            total++;
            variantesTotales[tipoVariante]++;

            const claveUnica = espiritu.id + '-' + variante.id;
            if (spiritsCollected[claveUnica]) {
                conseguidos++;
                variantesConseguidas[tipoVariante]++;
            }
        });
    });

    const porcentaje = total === 0 ? 0 : Math.round((conseguidos / total) * 100);

    return {
        conseguidos,
        total,
        porcentaje,
        faltantes: total - conseguidos,
        variantesConseguidas,
        variantesTotales
    };
}

function contarPorFiltro(filtro) {
    let count = 0;

    espiritusData.forEach(espiritu => {
        espiritu.variantes.forEach(variante => {
            // Solo contar variantes que pertenecen a colección actual
            if (variante.coleccion !== 'actual') return;

            if (filtro === 'coleccion-actual') {
                count++;
            } else if (filtro === 'proximamente') {
                return;
            } else {
                const claveUnica = espiritu.id + '-' + variante.id;

                if (filtro === 'conseguidos' && spiritsCollected[claveUnica]) count++;
                else if (filtro === 'faltantes' && !spiritsCollected[claveUnica]) count++;
                else if (filtro === 'base' && variante.id === 'base') count++;
                else if (filtro === 'gold' && variante.id === 'gold') count++;
                else if (filtro === 'gummy' && variante.id === 'gummy') count++;
                else if (filtro === 'galaxy' && variante.id === 'galaxy') count++;
            }
        });
    });

    // Contar próximamente solo si es el filtro
    if (filtro === 'proximamente') {
        espiritusData.forEach(espiritu => {
            espiritu.variantes.forEach(variante => {
                if (variante.coleccion === 'proximamente') count++;
            });
        });
    }

    return count;
}

// ============ ACTUALIZAR ESTADÍSTICAS ============
function actualizarEstadisticas() {
    const stats = calcularEstadisticas();

    document.getElementById('conseguidos-total').textContent = stats.conseguidos;
    document.getElementById('total-espiritus').textContent = stats.total;
    document.getElementById('porcentaje-valor').textContent =
        stats.total > 0 && stats.conseguidos === stats.total
            ? 'Completado'
            : stats.porcentaje + '%';
    document.getElementById('faltantes-total').textContent = stats.faltantes;


    document.getElementById('porcentaje-completado-barra').textContent = stats.porcentaje + '%';

    const barraProgreso = document.getElementById('barra-progreso');
    barraProgreso.style.width = stats.porcentaje + '%';
    barraProgreso.className = 'barra-progreso';
    if (stats.porcentaje < 25) barraProgreso.classList.add('rojo');
    else if (stats.porcentaje < 50) barraProgreso.classList.add('naranja');
    else if (stats.porcentaje < 75) barraProgreso.classList.add('amarillo');
    else barraProgreso.classList.add('verde');
}

// ============ GENERAR FILTROS ============
function generarFiltrosConContadores() {
    const grupoFiltros = document.getElementById('grupo-filtros');
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
        if (filtro.id === filtroActual) boton.classList.add('activo');
        boton.textContent = filtro.emoji + ' ' + filtro.label + ' (' + count + ')';
        boton.addEventListener('click', () => {
            document.querySelectorAll('.boton-filtro').forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');
            filtroActual = filtro.id;
            aplicarFiltro();
        });
        grupoFiltros.appendChild(boton);
    });
}

// ============ GENERAR ORDEN ============
function generarOrdenes() {
    const select = document.getElementById('orden-espiritus');
    select.innerHTML = '';

    const opciones = [
        { value: 'original', label: 'Orden original' },
        { value: 'a-z', label: 'A-Z' },
        { value: 'costo-menor', label: 'Costo menor' },
        { value: 'costo-mayor', label: 'Costo mayor' },
        { value: 'conseguido-primero', label: 'Conseguido primero' },
        { value: 'faltante-primero', label: 'Faltante primero' }
    ];

    opciones.forEach(opcion => {
        const opt = document.createElement('option');
        opt.value = opcion.value;
        opt.textContent = opcion.label;
        select.appendChild(opt);
    });

    select.addEventListener('change', (e) => {
        ordenActual = e.target.value;
        generarTarjetas();
    });
}

// ============ GENERAR TARJETAS ============
function generarTarjetas() {
    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = '';

    let espiritusMostrados = espiritusData.filter(e => e.coleccion === 'actual');

    if (ordenActual === 'a-z') {
        espiritusMostrados.sort((a, b) => a.nombreES.localeCompare(b.nombreES));
    } else if (ordenActual === 'costo-menor') {
        espiritusMostrados.sort((a, b) => a.costoInvocacion - b.costoInvocacion);
    } else if (ordenActual === 'costo-mayor') {
        espiritusMostrados.sort((a, b) => b.costoInvocacion - a.costoInvocacion);
    }

    espiritusMostrados.forEach(espiritu => {
        const bloque = crearBloqueEspiritu(espiritu);
        contenedor.appendChild(bloque);
    });

    const proximamente = espiritusData.filter(e => e.coleccion === 'proximamente');
    if (proximamente.length > 0) {
        const seccionProx = document.createElement('div');
        seccionProx.className = 'seccion-proximamente';
        seccionProx.innerHTML = '<h3>Próximamente / Por Confirmar</h3>';

        proximamente.forEach(espiritu => {
            const bloque = crearBloqueEspiritu(espiritu, true);
            seccionProx.appendChild(bloque);
        });

        contenedor.appendChild(seccionProx);
    }
}

function crearBloqueEspiritu(espiritu, esProximamente = false) {
    const bloque = document.createElement('div');
    bloque.className = 'bloque-espiritu';

    const header = document.createElement('div');
    header.className = 'bloque-header';
    header.innerHTML = '<h3>' + espiritu.nombreES + '</h3><p>' + espiritu.habilidad + '</p>';
    bloque.appendChild(header);

    const contenedorVariantes = document.createElement('div');
    contenedorVariantes.className = 'contenedor-variantes';

    if (!esProximamente) {
        espiritu.variantes.forEach(variante => {
            if (variante.coleccion === 'actual') {
                const tarjeta = crearTarjetaVariante(espiritu, variante);
                contenedorVariantes.appendChild(tarjeta);
            }
        });
    } else {
        espiritu.variantes.forEach(variante => {
            if (variante.coleccion === 'proximamente') {
                const tarjeta = crearTarjetaVarianteBloqueada(espiritu, variante);
                contenedorVariantes.appendChild(tarjeta);
            }
        });
    }

    bloque.appendChild(contenedorVariantes);
    return bloque;
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

function crearTarjetaVariante(espiritu, variante) {
    const tarjeta = document.createElement('div');
    const claveUnica = espiritu.id + '-' + variante.id;
    const esConseguida = spiritsCollected[claveUnica];

    tarjeta.className = 'tarjeta-variante';
    if (esConseguida) tarjeta.classList.add('conseguido');
    tarjeta.id = claveUnica;

    let html = '<div class="imagen-variante">';
    html += '<img src="' + variante.imagen + '" alt="' + variante.nombre + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">';
    html += '<div class="imagen-placeholder placeholder-' + variante.id + '">' + obtenerPlaceholderVariante(variante.id) + '</div>';
    html += '</div>';
    html += '<p class="nombre-variante">' + variante.nombre + '</p>';
    if (variante.bonus) {
        html += '<p class="bonus-variante">' + variante.bonus + '</p>';
    }
    html += '<button class="boton-variante">' + (esConseguida ? '✓ Conseguido' : 'Lo tengo') + '</button>';

    tarjeta.innerHTML = html;
    tarjeta.addEventListener('click', () => toggleEspiritu(claveUnica));

    return tarjeta;
}

function crearTarjetaVarianteBloqueada(espiritu, variante) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-variante bloqueada';

    let html = '<div class="imagen-variante">';
    html += '<div class="imagen-placeholder">🔒</div>';
    html += '</div>';
    html += '<p class="nombre-variante">' + variante.nombre + '</p>';
    html += '<p class="estado-bloqueado">Próximamente</p>';

    tarjeta.innerHTML = html;
    return tarjeta;
}

// ============ TOGGLE ESPÍRITU ============
function toggleEspiritu(claveUnica) {
    spiritsCollected[claveUnica] = !spiritsCollected[claveUnica];
    guardarProgreso();
}

// ============ APLICAR FILTRO ============
function aplicarFiltro() {
    const tarjetas = document.querySelectorAll('.tarjeta-variante');
    let algunaVisible = false;

    tarjetas.forEach(tarjeta => {
        if (debeVerseVisible(tarjeta)) {
            tarjeta.style.display = 'flex';
            algunaVisible = true;
        } else {
            tarjeta.style.display = 'none';
        }
    });

    mostrarMensajeVacio(!algunaVisible);
}

function debeVerseVisible(tarjeta) {
    const esProxima = tarjeta.classList.contains('bloqueada');

    if (filtroActual === 'coleccion-actual' && esProxima) return false;
    if (filtroActual === 'proximamente' && !esProxima) return false;

    if (filtroActual === 'conseguidos' && !tarjeta.classList.contains('conseguido')) return false;
    if (filtroActual === 'faltantes' && tarjeta.classList.contains('conseguido')) return false;

    if (filtroActual === 'base' && !tarjeta.id.endsWith('-base')) return false;
    if (filtroActual === 'gold' && !tarjeta.id.endsWith('-gold')) return false;
    if (filtroActual === 'gummy' && !tarjeta.id.endsWith('-gummy')) return false;
    if (filtroActual === 'galaxy' && !tarjeta.id.endsWith('-galaxy')) return false;

    if (busquedaActual) {
        if (!tarjeta.id.toLowerCase().includes(busquedaActual)) return false;
    }

    return true;
}

function mostrarMensajeVacio(vacio) {
    const contenedor = document.getElementById('contenedor-tarjetas');
    let mensaje = contenedor.querySelector('.sin-resultados');

    if (vacio) {
        if (!mensaje) {
            mensaje = document.createElement('div');
            mensaje.className = 'sin-resultados';
            mensaje.textContent = 'No se encontraron espíritus con este filtro';
            contenedor.appendChild(mensaje);
        }
    } else {
        if (mensaje) mensaje.remove();
    }
}

// ============ ACTUALIZAR PÁGINA ============
function actualizarPagina() {
    actualizarEstadisticas();
    generarFiltrosConContadores();
    generarTarjetas();
    aplicarFiltro();
}

// ============ EVENTOS ============
function configurarEventListeners() {
    document.getElementById('buscador').addEventListener('input', function () {
        busquedaActual = this.value.toLowerCase();
        aplicarFiltro();
    });

    document.getElementById('boton-reiniciar').addEventListener('click', reiniciarColeccion);
}

// ============ EXPORTAR ============
function exportarProgreso() {
    const stats = calcularEstadisticas();
    const fecha = new Date().toLocaleString();
    const datos = {
        fecha: fecha,
        coleccion: 'actual',
        espiritus: spiritsCollected,
        resumen: {
            conseguidos: stats.conseguidos,
            total: stats.total,
            porcentaje: stats.porcentaje,
            faltantes: stats.faltantes
        }
    };

    const json = JSON.stringify(datos, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const fechaArchivo = new Date().toISOString().split('T')[0];
    a.download = 'coleccion-espiritus-' + fechaArchivo + '.json';
    a.click();
    URL.revokeObjectURL(url);
}

// ============ IMPORTAR ============
function importarProgreso(event) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = function (e) {
        try {
            const datos = JSON.parse(e.target.result);
            if (datos.espiritus) {
                spiritsCollected = datos.espiritus;
                guardarProgreso();
                alert('✓ Progreso importado correctamente');
            }
        } catch (error) {
            alert('❌ Error al importar archivo: ' + error.message);
        }
    };
    lector.readAsText(archivo);
}

// ============ REINICIAR ============
function reiniciarColeccion() {
    if (confirm('¿Estás seguro? Se borrará toda la colección.\n\n⚠️ Esta acción no se puede deshacer.')) {
        spiritsCollected = {};
        guardarProgreso();
        alert('✓ Colección reiniciada');
    }
}

// ============ INICIALIZAR ============
window.addEventListener('DOMContentLoaded', function () {
    cargarProgreso();
    configurarEventListeners();
    actualizarPagina();
});
