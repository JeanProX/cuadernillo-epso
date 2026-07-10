"use strict";

const CLAVE = "cuadernilloEPSO_v4";
let actual = 0;

const actividades = [
  {
    titulo: "¿Dónde me sitúo?",
    instruccion: "Reflexiona sobre tu situación actual y la forma en que te percibes.",
    imagen: "img/page-03.png",
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
    imagen: "img/page-04.png",
    campos: [
      { id: "fortalezas", etiqueta: "Fortalezas", tipo: "textarea" },
      { id: "oportunidades", etiqueta: "Oportunidades", tipo: "textarea" },
      { id: "debilidades", etiqueta: "Debilidades", tipo: "textarea" },
      { id: "amenazas", etiqueta: "Amenazas", tipo: "textarea" }
    ]
  },
  {
    titulo: "Peso saludable",
    instruccion: "Registra tus datos y los de un familiar. El IMC se calcula automáticamente.",
    imagen: "img/page-05.png",
    campos: [
      { id: "peso", etiqueta: "Mi peso (kg)", tipo: "number", step: "0.1" },
      { id: "estatura", etiqueta: "Mi estatura (m)", tipo: "number", step: "0.01" },
      { id: "imc", etiqueta: "Mi IMC", tipo: "resultado" },
      { id: "pesoFamiliar", etiqueta: "Peso de un familiar (kg)", tipo: "number", step: "0.1" },
      { id: "estaturaFamiliar", etiqueta: "Estatura del familiar (m)", tipo: "number", step: "0.01" },
      { id: "imcFamiliar", etiqueta: "IMC del familiar", tipo: "resultado" },
      { id: "factoresPeso", etiqueta: "Aspectos emocionales o circunstanciales relacionados con el peso", tipo: "textarea", ancho: true }
    ]
  },
  {
    titulo: "Hexágonos de los excesos",
    instruccion: "Escribe hasta siete excesos e indica el área a la que pertenecen.",
    imagen: "img/page-06.png",
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
  $("imagenActividad").src = act.imagen;
  $("imagenActividad").alt = act.titulo;
  $("btnAnterior").textContent = actual === 0 ? "← Inicio" : "← Anterior";
  $("btnSiguiente").textContent = actual === actividades.length - 1
    ? "Finalizar ✓"
    : "Guardar y continuar →";

  renderCampos(act);

  const datos = leerDatos();
  datos.ultimaActividad = actual;
  guardarDatos(datos);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderCampos(act) {
  const datos = leerDatos();

  $("formularioActividad").innerHTML = act.campos.map((campo) => {
    const clase = campo.ancho ? "grupo-campo ancho" : "grupo-campo";

    if (campo.tipo === "resultado") {
      return `
        <div class="${clase}">
          <label>${campo.etiqueta}</label>
          <div id="${campo.id}" class="resultado-imc">Sin calcular</div>
        </div>`;
    }

    const valor = datos[campo.id] ?? "";
    const ayuda = campo.ayuda ? `<small class="ayuda">${campo.ayuda}</small>` : "";

    if (campo.tipo === "textarea") {
      return `
        <div class="${clase}">
          <label for="${campo.id}">${campo.etiqueta}</label>
          <textarea id="${campo.id}" data-campo="1" placeholder="Escribe tu reflexión...">${esc(valor)}</textarea>
          ${ayuda}
        </div>`;
    }

    return `
      <div class="${clase}">
        <label for="${campo.id}">${campo.etiqueta}</label>
        <input id="${campo.id}" data-campo="1" type="${campo.tipo}" value="${esc(valor)}" ${campo.step ? `step="${campo.step}"` : ""}>
        ${ayuda}
      </div>`;
  }).join("");

  document.querySelectorAll("[data-campo='1']").forEach((elemento) => {
    elemento.addEventListener("input", () => {
      guardarActividad(false);
      if (actual === 2) calcularIMC();
    });
  });

  if (actual === 2) calcularIMC();
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

function calcularIMC() {
  const datos = leerDatos();
  const peso = Number($("peso")?.value);
  const estatura = Number($("estatura")?.value);
  const pesoFamiliar = Number($("pesoFamiliar")?.value);
  const estaturaFamiliar = Number($("estaturaFamiliar")?.value);

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

function siguiente() {
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

function abrirImagen() {
  $("imagenVisor").src = actividades[actual].imagen;
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
  window._toast = setTimeout(() => $("notificacion").classList.remove("visible"), 1600);
}

function abrirResumenLectura() {
  const datos = leerDatos();

  $("datosResumen").innerHTML = `
    <strong>Participante:</strong> ${esc(datos.nombre || "Sin nombre")}<br>
    <strong>Fecha:</strong> ${esc(datos.fecha || "Sin fecha")}`;

  $("contenidoResumenLectura").innerHTML = actividades.map((actividad, indice) => {
    const preguntas = actividad.campos.map((campo) => {
      let respuesta = datos[campo.id];
      if (campo.tipo === "resultado") respuesta = datos[campo.id];

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
  $("btnAmpliar").addEventListener("click", abrirImagen);
  $("imagenActividad").addEventListener("click", abrirImagen);
  $("btnCerrarVisor").addEventListener("click", cerrarImagen);
  $("visorImagen").addEventListener("click", (evento) => {
    if (evento.target === $("visorImagen")) cerrarImagen();
  });

  $("btnReflexiones").addEventListener("click", abrirResumenLectura);
  $("btnCerrarResumen").addEventListener("click", cerrarResumenLectura);
  $("btnVolverResumen").addEventListener("click", cerrarResumenLectura);
  $("btnImprimirResumen").addEventListener("click", () => window.print());


  $("btnEditar").addEventListener("click", () => mostrarActividad(actividades.length - 1));
  $("btnReiniciar").addEventListener("click", reiniciar);
});
