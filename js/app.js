"use strict";

const CLAVE = "cuadernilloEPSO_v4";
let actual = 0;

const actividades = [
  {
    titulo: "¿Dónde me sitúo?",
    instruccion: "Reflexiona sobre tu situación actual y la forma en que te percibes.",
    imagen: "img/autoconocimientos.png",
    campos: [
      { id: "queTengo", etiqueta: "¿Qué tengo?", tipo: "textarea" },
      { id: "queBusco", etiqueta: "¿Qué busco?", tipo: "textarea" },
      { id: "queMeDescribe", etiqueta: "¿Qué me describe?", tipo: "textarea" },
      { id: "comoMePercibo", etiqueta: "¿Cómo me percibo?", tipo: "textarea" }
    ]
  },
  {
    titulo: "FODA de la salud",
    instruccion: "Identifica factores relacionados con tu salud física, mental y social.",
    imagen: "img/FODA.png",
    campos: [
      { id: "fortalezas", etiqueta: "Fortalezas", tipo: "textarea" },
      { id: "oportunidades", etiqueta: "Oportunidades", tipo: "textarea" },
      { id: "debilidades", etiqueta: "Debilidades", tipo: "textarea" },
      { id: "amenazas", etiqueta: "Amenazas", tipo: "textarea" }
    ]
  },
  {
    titulo: "Peso saludable",
    instruccion: "Observa el video y registra los datos solicitados. El IMC se calcula automáticamente.",
    imagen: "img/page-05.png",
    videoInicio: "https://www.youtube.com/embed/Y1Nyuq-PXZ8?cc_load_policy=1&cc_lang_pref=es&hl=es&rel=0",
    videoLocal: "video/janine-terapia.mp4",
    tituloVideoLocal: "Observa el video (Janine enfrenta sus miedos en terapia), y escribe los aspectos de su vida a nivel emocional y/o circunstancial, que asocies con un impacto en el peso, tanto positivos como negativos.",
    campos: [
      { id: "peso", etiqueta: "Mi peso (kg)", tipo: "decimal", step: "0.1" },
      { id: "estatura", etiqueta: "Mi estatura (m)", tipo: "decimal", step: "0.01" },
      { id: "imc", etiqueta: "Mi IMC", tipo: "resultado" },
      { id: "pesoFamiliar", etiqueta: "Peso de un familiar (kg)", tipo: "decimal", step: "0.1" },
      { id: "estaturaFamiliar", etiqueta: "Estatura del familiar (m)", tipo: "decimal", step: "0.01" },
      { id: "imcFamiliar", etiqueta: "IMC del familiar", tipo: "resultado" },
      { id: "aspectosPositivosPeso", etiqueta: "Aspectos positivos", tipo: "textarea", icono: "✓", tarjeta: "positiva" },
      { id: "aspectosNegativosPeso", etiqueta: "Aspectos negativos", tipo: "textarea", icono: "✕", tarjeta: "negativa" }
    ]
  },
  {
    titulo: "Hexágonos de los excesos",
    instruccion: "Escribe hasta siete excesos e indica el área a la que pertenecen.",
    imagen: "img/page-06.png",
    videoFinal: "https://www.youtube.com/embed/se1Z04rgZqM?rel=0",
    campos: Array.from({ length: 7 }, (_, i) => ({
      id: `exceso${i + 1}`,
      etiqueta: `Exceso ${i + 1}`,
      tipo: "text",
      ayuda: "Ejemplo: alimentación, emocional, laboral o social"
    }))
  },
  {
    titulo: "Jarra y plato: hoy y mañana",
    instruccion: "Describe cómo comes y bebes hoy, y qué modificaciones te gustaría realizar mañana.",
    imagen: "img/page-07.png",
    pdfFinal: "pdf/Infografia.pdf",
    campos: [
      { id: "aguaHoy", etiqueta: "Jarra de hoy: cantidad de agua", tipo: "textarea" },
      { id: "platoHoy", etiqueta: "Plato de hoy: alimentos y distribución", tipo: "textarea" },
      { id: "aguaManana", etiqueta: "Jarra de mañana: cambios deseados", tipo: "textarea" },
      { id: "platoManana", etiqueta: "Plato de mañana: cambios deseados", tipo: "textarea" }
    ]
  },
  {
    titulo: "Ruta del supermercado",
    instruccion: "Registra lo que compras habitualmente y posibles sustituciones.",
    imagen: "img/page-08.png",
    imagenFinal: "img/Supermercado.png",
    campos: [
      { id: "listaSuper", etiqueta: "Mi lista del súper", tipo: "textarea" },
      { id: "mejorOpcion", etiqueta: "¿Es la mejor opción o es necesario?", tipo: "textarea" },
      { id: "cambiarPor", etiqueta: "Podría cambiarlo por...", tipo: "textarea", ancho: true }
    ]
  },
  {
    titulo: "Ideología alimenticia: P-N-I",
    instruccion: "Escribe lo positivo, negativo e interesante de los factores relacionados con tu salud.",
    imagen: "img/page-09.png",
    enunciadoInicio: "Para poder realizar la siguiente actividad observa el video: ¿Qué es alimentación consciente?",
    videoInicio: "https://www.youtube.com/embed/lwzmoH5FP1Y?rel=0",
    campos: [
      { id: "positivo", etiqueta: "Positivo (P)", tipo: "textarea" },
      { id: "negativo", etiqueta: "Negativo (N)", tipo: "textarea" },
      { id: "interesante", etiqueta: "Interesante (I)", tipo: "textarea", ancho: true }
    ]
  },
  {
    titulo: "Mi horario para pausar",
    instruccion: "Registra horarios posibles para hacer pausas activas.",
    imagen: "img/page-10.png",
    imagenInicio: "img/Piramide.png",
    enunciadoFinal: "Vamos a practicar, recuerda realizar pausas activas",
    videoFinal: "https://www.youtube.com/embed/Yb26XfpB6Nk?rel=0&list=RDYb26XfpB6Nk",
    campos: [
      { id: "pausaCasa", etiqueta: "Horario en casa", tipo: "time" },
      { id: "pausaTrabajo", etiqueta: "Horario en el trabajo", tipo: "time" },
      { id: "pausaOtro", etiqueta: "Horario en otro sitio", tipo: "time" },
      { id: "actividadPausa", etiqueta: "¿Qué actividad realizarías?", tipo: "textarea", ancho: true }
    ]
  },
  {
    titulo: "Decálogo del promotor",
    instruccion: "Enlista acciones y roles personales, familiares y laborales.",
    imagen: "img/page-11.png",
    imagenInicio: "img/Acciones.jpg",
    campos: [
      { id: "personales", etiqueta: "Personales", tipo: "textarea" },
      { id: "familiares", etiqueta: "Familiares", tipo: "textarea" },
      { id: "laborales", etiqueta: "Laborales", tipo: "textarea", ancho: true }
    ]
  },
  {
    titulo: "Recuerda: objetivos y compromisos",
    instruccion: "Escribe frases motivadoras, aprendizajes y compromisos personales.",
    imagen: "img/page-12.png",
    imagenFinal: "img/Compromiso.jpg",
    campos: [
      { id: "fraseMotivadora", etiqueta: "Frase motivadora", tipo: "textarea" },
      { id: "aprendizaje", etiqueta: "¿Qué aprendí?", tipo: "textarea" },
      { id: "objetivo", etiqueta: "Mi objetivo", tipo: "textarea" },
      { id: "compromiso", etiqueta: "Mi compromiso", tipo: "textarea" }
    ]
  }
];

const $ = (id) => document.getElementById(id);

function leerDatos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || {};
  } catch {
    return {};
  }
}

function guardarDatos(datos) {
  localStorage.setItem(CLAVE, JSON.stringify(datos));
}

function iniciar(continuar = false) {
  const nombre = $("nombreParticipante").value.trim();

  if (!nombre) {
    alert("Escribe tu nombre para comenzar.");
    $("nombreParticipante").focus();
    return;
  }

  const datos = leerDatos();
  datos.nombre = nombre;
  datos.fecha = $("fechaActividad").value;
  guardarDatos(datos);

  $("pantallaInicio").classList.add("oculto");
  actual = continuar && Number.isInteger(datos.ultimaActividad)
    ? Math.min(datos.ultimaActividad, actividades.length - 1)
    : 0;

  mostrarActividad(actual);
}

function mostrarActividad(indice) {
  actual = Math.max(0, Math.min(indice, actividades.length - 1));
  const act = actividades[actual];

  $("pantallaInicio").classList.add("oculto");
  $("pantallaActividad").classList.remove("oculto");
  $("pantallaFinal").classList.add("oculto");
  $("indicadorPagina").textContent = `Actividad ${actual + 1}`;
  $("textoActividad").textContent = `Actividad ${actual + 1} de ${actividades.length}`;

  const porcentaje = Math.round(((actual + 1) / actividades.length) * 100);
  $("textoPorcentaje").textContent = `${porcentaje}%`;
  $("barraProgreso").style.width = `${porcentaje}%`;
  $("numeroActividad").textContent = actual + 1;
  $("tituloActividad").textContent = act.titulo;
  $("instruccionActividad").textContent = act.instruccion;
  $("btnAnterior").textContent = actual === 0 ? "← Inicio" : "← Anterior";
  $("btnSiguiente").textContent = actual === actividades.length - 1
    ? "Finalizar ✓"
    : "Guardar y continuar →";

  if (actual === 2) {
    $("imagenActividad").classList.add("oculto");
    $("btnAmpliar").classList.add("oculto");
  } else {
    $("imagenActividad").classList.remove("oculto");
    $("btnAmpliar").classList.remove("oculto");
    $("imagenActividad").src = act.imagen;
    $("imagenActividad").alt = act.titulo;
  }

  renderCampos(act);

  const datos = leerDatos();
  datos.ultimaActividad = actual;
  guardarDatos(datos);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderCampos(act) {
  const datos = leerDatos();

  if (actual === 2) {
    $("formularioActividad").innerHTML = renderActividadPeso(act, datos);
  } else {
    $("formularioActividad").innerHTML = [
      renderContenidoInicial(act),
      renderCamposNormales(act, datos),
      renderContenidoFinal(act)
    ].join("");
  }

  document.querySelectorAll("[data-campo='1']").forEach((elemento) => {
    elemento.addEventListener("input", () => {
      elemento.classList.remove("campo-requerido");
      guardarActividad(false);
      if (actual === 2) calcularIMC();
    });
  });

  if (actual === 2) calcularIMC();
}

function renderContenidoInicial(act) {
  const bloques = [];

  if (act.imagenInicio) {
    bloques.push(renderImagenComplementaria(act.imagenInicio, "Imagen de apoyo"));
  }

  if (act.enunciadoInicio) {
    bloques.push(`<h3 class="enunciado-multimedia">${esc(act.enunciadoInicio)}</h3>`);
  }

  if (act.videoInicio) {
    bloques.push(renderVideoYoutube(act.videoInicio, `Video de ${act.titulo}`));
  }

  return bloques.join("");
}

function renderContenidoFinal(act) {
  const bloques = [];

  if (act.enunciadoFinal) {
    bloques.push(`<h3 class="enunciado-multimedia">${esc(act.enunciadoFinal)}</h3>`);
  }

  if (act.videoFinal) {
    bloques.push(renderVideoYoutube(act.videoFinal, `Video de apoyo de ${act.titulo}`));
  }

  if (act.pdfFinal) {
    bloques.push(`
      <section class="bloque-multimedia ancho">
        <h3 class="subtitulo-multimedia">Infografía</h3>
        <div class="visor-pdf-actividad">
          <iframe src="${act.pdfFinal}#view=FitH" title="Infografía de apoyo"></iframe>
        </div>
        <a class="enlace-archivo" href="${act.pdfFinal}" target="_blank" rel="noopener">
          Abrir infografía en otra pestaña
        </a>
      </section>`);
  }

  if (act.imagenFinal) {
    bloques.push(renderImagenComplementaria(act.imagenFinal, "Imagen complementaria"));
  }

  return bloques.join("");
}

function renderCamposNormales(act, datos) {
  return act.campos.map((campo) => renderCampo(campo, datos)).join("");
}

function renderCampo(campo, datos) {
  const clase = campo.ancho ? "grupo-campo ancho" : "grupo-campo";

  if (campo.tipo === "resultado") {
    return `
      <div class="${clase}">
        <label>${esc(campo.etiqueta)}</label>
        <div id="${campo.id}" class="resultado-imc">Sin calcular</div>
      </div>`;
  }

  const valor = datos[campo.id] ?? "";
  const ayuda = campo.ayuda ? `<small class="ayuda">${esc(campo.ayuda)}</small>` : "";

  if (campo.tipo === "textarea") {
    return `
      <div class="${clase}">
        <label for="${campo.id}">${esc(campo.etiqueta)}</label>
        <textarea id="${campo.id}" data-campo="1" placeholder="Escribe tu reflexión...">${esc(valor)}</textarea>
        ${ayuda}
      </div>`;
  }

  const tipo = campo.tipo === "decimal" ? "text" : campo.tipo;
  const inputmode = campo.tipo === "decimal" ? 'inputmode="decimal"' : "";

  return `
    <div class="${clase}">
      <label for="${campo.id}">${esc(campo.etiqueta)}</label>
      <input id="${campo.id}" data-campo="1" type="${tipo}" ${inputmode} value="${esc(valor)}" ${campo.step ? `step="${campo.step}"` : ""}>
      ${ayuda}
    </div>`;
}

function renderActividadPeso(act, datos) {
  const camposCalculo = act.campos.slice(0, 6).map((campo) => renderCampo(campo, datos)).join("");
  const positivos = act.campos[6];
  const negativos = act.campos[7];

  return `
    ${renderVideoYoutube(act.videoInicio, "Video introductorio de peso saludable")}

    <section class="bloque-multimedia ancho">
      <h3 class="subtitulo-multimedia">Cálculo del IMC</h3>
      <div class="calculadora-imc-grid">${camposCalculo}</div>
      <small class="ayuda">Puedes escribir los decimales con punto o coma.</small>
    </section>

    ${renderImagenComplementaria(act.imagen, act.titulo, true)}

    <section class="bloque-multimedia ancho">
      <h3 class="enunciado-multimedia">${esc(act.tituloVideoLocal)}</h3>
      <div class="video-local-contenedor">
        <video controls playsinline preload="metadata">
          <source src="${act.videoLocal}" type="video/mp4">
          Tu navegador no puede reproducir este video.
        </video>
      </div>
    </section>

    <section class="reflexiones-peso ancho">
      ${renderTarjetaReflexion(positivos, datos)}
      ${renderTarjetaReflexion(negativos, datos)}
    </section>`;
}

function renderTarjetaReflexion(campo, datos) {
  return `
    <div class="tarjeta-reflexion ${campo.tarjeta}">
      <div class="icono-reflexion" aria-hidden="true">${campo.icono}</div>
      <label for="${campo.id}">${esc(campo.etiqueta)}</label>
      <textarea id="${campo.id}" data-campo="1" placeholder="Escribe aquí...">${esc(datos[campo.id] ?? "")}</textarea>
    </div>`;
}

function renderVideoYoutube(url, titulo) {
  return `
    <section class="bloque-multimedia ancho">
      <div class="video-responsivo">
        <iframe
          src="${url}"
          title="${esc(titulo)}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>
      </div>
    </section>`;
}

function renderImagenComplementaria(ruta, alt, ampliable = false) {
  return `
    <section class="bloque-multimedia ancho">
      <img
        src="${ruta}"
        alt="${esc(alt)}"
        class="imagen-complementaria"
        ${ampliable ? 'data-imagen-ampliable="1"' : ""}>
      ${ampliable ? '<button type="button" class="boton-ver-imagen boton-complementario" data-boton-ampliar="1">🔍 Ampliar imagen</button>' : ""}
    </section>`;
}

function guardarActividad(notificar = true) {
  const datos = leerDatos();

  actividades[actual].campos.forEach((campo) => {
    if (campo.tipo === "resultado") return;
    const elemento = $(campo.id);
    if (elemento) datos[campo.id] = elemento.value;
  });

  datos.ultimaActividad = actual;
  guardarDatos(datos);

  if (notificar) mostrarNotificacion("Respuestas guardadas");
}

function convertirNumero(valor) {
  const numero = Number(String(valor ?? "").trim().replace(",", "."));
  return Number.isFinite(numero) ? numero : 0;
}

function calcularIMC() {
  const datos = leerDatos();
  const peso = convertirNumero($("peso")?.value);
  const estatura = convertirNumero($("estatura")?.value);
  const pesoFamiliar = convertirNumero($("pesoFamiliar")?.value);
  const estaturaFamiliar = convertirNumero($("estaturaFamiliar")?.value);

  datos.imc = peso > 0 && estatura > 0
    ? (peso / (estatura * estatura)).toFixed(2)
    : "";

  datos.imcFamiliar = pesoFamiliar > 0 && estaturaFamiliar > 0
    ? (pesoFamiliar / (estaturaFamiliar * estaturaFamiliar)).toFixed(2)
    : "";

  guardarDatos(datos);

  if ($("imc")) $("imc").textContent = datos.imc || "Sin calcular";
  if ($("imcFamiliar")) $("imcFamiliar").textContent = datos.imcFamiliar || "Sin calcular";
}

function anterior() {
  guardarActividad(false);

  if (actual === 0) {
    $("pantallaActividad").classList.add("oculto");
    $("pantallaInicio").classList.remove("oculto");
    $("indicadorPagina").textContent = "Inicio";
  } else {
    mostrarActividad(actual - 1);
  }
}

function actividadTieneRespuesta() {
  const camposRespondibles = actividades[actual].campos.filter(
    (campo) => campo.tipo !== "resultado"
  );

  return camposRespondibles.some((campo) => {
    const elemento = $(campo.id);
    return elemento && String(elemento.value ?? "").trim() !== "";
  });
}

function marcarActividadSinRespuesta() {
  const formulario = $("formularioActividad");
  formulario.classList.remove("formulario-incompleto");
  void formulario.offsetWidth;
  formulario.classList.add("formulario-incompleto");

  formulario.querySelectorAll("input, textarea, select").forEach((campo) => {
    campo.classList.add("campo-requerido");
  });

  const primerCampo = formulario.querySelector("input, textarea, select");
  if (primerCampo) {
    primerCampo.focus({ preventScroll: true });
    primerCampo.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  mostrarNotificacion("Escribe al menos una respuesta para continuar");
}

function limpiarAvisoDeValidacion() {
  $("formularioActividad")
    ?.querySelectorAll(".campo-requerido")
    .forEach((campo) => campo.classList.remove("campo-requerido"));
}

function siguiente() {
  if (!actividadTieneRespuesta()) {
    marcarActividadSinRespuesta();
    return;
  }

  limpiarAvisoDeValidacion();
  guardarActividad(true);

  if (actual < actividades.length - 1) {
    setTimeout(() => mostrarActividad(actual + 1), 250);
  } else {
    setTimeout(finalizar, 250);
  }
}

function finalizar() {
  $("pantallaActividad").classList.add("oculto");
  $("pantallaFinal").classList.remove("oculto");
  $("indicadorPagina").textContent = "Finalizado";

  const datos = leerDatos();
  $("resumenFinal").innerHTML = `
    <strong>Participante:</strong> ${esc(datos.nombre || "")}<br>
    <strong>Fecha:</strong> ${esc(datos.fecha || "")}<br>
    <strong>Actividades:</strong> ${actividades.length} de ${actividades.length}`;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function abrirImagen(ruta = actividades[actual].imagen) {
  $("imagenVisor").src = ruta;
  $("visorImagen").classList.remove("oculto");
  document.body.style.overflow = "hidden";
}

function cerrarImagen() {
  $("visorImagen").classList.add("oculto");
  document.body.style.overflow = "";
}

function mostrarNotificacion(texto) {
  $("textoNotificacion").textContent = texto;
  $("notificacion").classList.add("visible");
  clearTimeout(window._toast);
  window._toast = setTimeout(() => $("notificacion").classList.remove("visible"), 1800);
}

function abrirResumenLectura() {
  const datos = leerDatos();

  $("datosResumen").innerHTML = `
    <strong>Participante:</strong> ${esc(datos.nombre || "Sin nombre")}<br>
    <strong>Fecha:</strong> ${esc(datos.fecha || "Sin fecha")}`;

  $("contenidoResumenLectura").innerHTML = actividades.map((actividad, indice) => {
    const preguntas = actividad.campos.map((campo) => {
      const respuesta = datos[campo.id];
      const tieneRespuesta = String(respuesta ?? "").trim().length > 0;

      return `
        <div class="pregunta-resumen">
          <h3>${esc(campo.etiqueta)}</h3>
          <p class="${tieneRespuesta ? "" : "respuesta-vacia"}">
            ${tieneRespuesta ? esc(respuesta) : "Sin respuesta"}
          </p>
        </div>`;
    }).join("");

    return `
      <section class="actividad-resumen">
        <h2>Actividad ${indice + 1} — ${esc(actividad.titulo)}</h2>
        ${preguntas}
      </section>`;
  }).join("");

  $("modalResumen").classList.remove("oculto");
  document.body.style.overflow = "hidden";
}

function cerrarResumenLectura() {
  $("modalResumen").classList.add("oculto");
  document.body.style.overflow = "";
}

function reiniciar() {
  if (!confirm("¿Deseas borrar todas las respuestas?")) return;
  localStorage.removeItem(CLAVE);
  location.reload();
}

function esc(valor) {
  return String(valor ?? "").replace(/[&<>'"]/g, (caracter) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[caracter]));
}

document.addEventListener("DOMContentLoaded", () => {
  const datos = leerDatos();

  $("fechaActividad").value = datos.fecha || new Date().toISOString().slice(0, 10);
  $("nombreParticipante").value = datos.nombre || "";

  if (datos.nombre) $("btnContinuar").classList.remove("oculto");

  $("btnComenzar").addEventListener("click", () => iniciar(false));
  $("btnContinuar").addEventListener("click", () => iniciar(true));
  $("btnAnterior").addEventListener("click", anterior);
  $("btnSiguiente").addEventListener("click", siguiente);
  $("btnAmpliar").addEventListener("click", () => abrirImagen());
  $("imagenActividad").addEventListener("click", () => abrirImagen());
  $("btnCerrarVisor").addEventListener("click", cerrarImagen);
  $("visorImagen").addEventListener("click", (evento) => {
    if (evento.target === $("visorImagen")) cerrarImagen();
  });

  $("formularioActividad").addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-boton-ampliar='1']");
    const imagen = evento.target.closest("[data-imagen-ampliable='1']");
    if (boton || imagen) abrirImagen(actividades[actual].imagen);
  });

  $("btnReflexiones").addEventListener("click", abrirResumenLectura);
  $("btnCerrarResumen").addEventListener("click", cerrarResumenLectura);
  $("btnVolverResumen").addEventListener("click", cerrarResumenLectura);
  $("btnImprimirResumen").addEventListener("click", () => window.print());
  $("btnEditar").addEventListener("click", () => mostrarActividad(actividades.length - 1));
  $("btnReiniciar").addEventListener("click", reiniciar);
});
