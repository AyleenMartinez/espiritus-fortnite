console.log("MAIN.JS CARGÓ");

import { initApp } from "./controllers/appController.js";

window.addEventListener("DOMContentLoaded", function () {
  console.log("DOM LISTO, INICIANDO APP");
  initApp();
});