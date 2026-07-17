export function renderStats(stats) {
  setText("conseguidos-total", stats.collected);
  setText("total-espiritus", stats.available);
  setText("dominados-total", stats.mastered);

  const progressText = stats.available > 0 && stats.collected === stats.available
    ? "Completado"
    : `${stats.percent}%`;

  setText("porcentaje-valor", progressText);
  setText("porcentaje-completado-barra", `${stats.percent}%`);

  const bar = document.getElementById("barra-progreso");

  if (!bar) return;

  bar.style.width = `${stats.percent}%`;
  bar.className = "barra-progreso";

  if (stats.percent < 25) bar.classList.add("rojo");
  else if (stats.percent < 50) bar.classList.add("naranja");
  else if (stats.percent < 75) bar.classList.add("amarillo");
  else bar.classList.add("verde");
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}