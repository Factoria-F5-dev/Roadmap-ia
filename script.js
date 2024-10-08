document.addEventListener('DOMContentLoaded', function() {
    const links = {
        zoom: 'https://zoom.us/j/your-zoom-link',
        classroom: 'https://classroom.google.com/your-classroom-link',
        // roadmap: 'roadmap.html',
        discord: 'https://discord.gg/your-discord-invite',
        github: 'https://github.com/your-repository'
    };

    document.querySelectorAll('[data-link]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const link = links[this.dataset.link];
            if (link) {
                window.open(link, '_blank');
            }
        });
    });
});


const data = [
    {
        type: "Proyecto",
        name: "App con Python. Individual. Profe: Jorge.",
    },
    {
        type: "Proyecto",
        name: "Un CRUD. Grupal: Profe: Alex.",
        start: 4,
        end: 7,
    },
    {
        type: "Proyecto",
        name: "Web Scraping. Individual. Profe: Jorge.",
        start: 8,
        end: 9,
    },
    {
        type: "Proyecto",
        name: "Datathon.  Individual. Profe: Alex.",
        start: 10,
        end: 10,
    },
    {
        type: "Proyecto",
        name: "Regresión de regresión (regresión lineal). En grupo. Profe: Jorge.",
        start: 11,
        end: 14,
    },
    {
        type: "Proyecto",
        name: "Problema de clasificación (Regresión logística binaria). Invididual. Profe: Alex.",
        start: 15,
        end: 16,
    },
    {
        type: "Proyecto",
        name: "Problema de clasificación (Regresión logística multiclase) En grupo. Profes: Jorge y Alex.",
        start: 17,
        end: 18,
    },
    {
        type: "Tema",
        name: "Introducción a programación (Terminal, Entornos de desarrollo, Python, Gestor de paquetes, Entorno virtual, SCRUM). Profes: Jorge y Alex.",
        start: 1,
        end: 1,
    },
    {
        type: "Tema",
        name: "Buenas prácticas (Programación funcional, OOP, Git, Docker, Testing). Coders con apoyo de formadores.",
        start: 4,
        end: 4,
    },
    {
        type: "Tema",
        name: "BBDD (SQL, NoSQL, ORM/ODM) y Despliegue en producción (APIs Rest, Render, Azure). Coders con apoyo de formadores.",
        start: 5,
        end: 5,
    },
    {
        type: "Tema",
        name: "Web Scraping (HTML, CSS, JS, Selenium, Scrapy, DOM). Coders con apoyo de formadores.",
        start: 8,
        end: 8,
    },
    {
        type: "Tema",
        name: "Intro a Análisis exploratorio de Datos (EDA), pandas, numpy, scikitlearn, matplotlib. Coders con apoyo de formadores.",
        start: 10,
        end: 10,
    },
    {
        type: "Tema",
        name: "Intro a mates y estadística (Derivadas, límites, métricas, distribuciones). Coders con apoyo de formadores.",
        start: 11,
        end: 11,
    },
    {
        type: "Tema",
        name: "Intro a machine learning (Tipos de modelos) y regresión lineal (Modelos, entrenamiento, evaluación, regresión lineal). Coders con apoyo de formadores.",
        start: 12,
        end: 12,
    },
    {
        type: "Tema",
        name: "Intro a modelo de clasificación binaria (Regresión logística, modelos, entrenamiento, evaluación). Coders con apoyo de formadores.",
        start: 15,
        end: 15,
    },
    {
        type: "Tema",
        name: "Intro a modelo de clasificación multiclase y ajuste de modelo. Coders con apoyo de formadores.",
        start: 17,
        end: 17,
    },
];

function generateGantt() {
    const weeks = document.getElementById("weeks").value;
    const table = document.getElementById("gantt-table");
    table.innerHTML = ""; // Limpiar tabla antes de regenerar

    // Crear encabezado de los meses
    let monthHeaderRow = "<tr><th style='width:150px'></th>"; // Primera celda vacía para la columna de elementos

    for (let i = 1; i <= weeks; i += 4) {
        const month = Math.ceil(i / 4); // Calcular el mes correspondiente
        monthHeaderRow += `<th colspan="4">Mes ${month}</th>`;
    }

    monthHeaderRow += "</tr>";
    table.innerHTML = monthHeaderRow;

    // Crear encabezado de las semanas
    let weekHeaderRow = "<tr><th>Elemento</th>";

    for (let i = 1; i <= weeks; i++) {
        weekHeaderRow += `<th>${i}</th>`;
    }

    weekHeaderRow += "</tr>";
    table.innerHTML += weekHeaderRow;

    let lastEnd = 0; // Variable para rastrear el último "end" de los elementos anteriores

    // Crear filas
    data.forEach((item) => {
        let colorClass = "";

        // Asignar colores según el tipo
        if (item.type === "Proyecto") {
            colorClass = "proyecto";
            item.start = item.start ? item.start : lastEnd + 1;
            item.end = item.end ? item.end : item.start + 2;
        } else if (item.type === "Tema") {
            colorClass = "tema";
            item.start = item.start ? item.start : lastEnd + 1;
            item.end = item.end ? item.end : item.start + 2;
        }

        // Actualizar el último "end" para el siguiente elemento
        lastEnd = item.end;

        // La primera celda de la fila (columna de elementos) tiene el mismo color que el resto de la fila
        let row = `<tr><td class="label ${colorClass}">${item.name}</td>`;
        for (let i = 1; i <= weeks; i++) {
            if (i >= item.start && i <= item.end) {
                row += `<td class="block ${colorClass}" ></td>`;
            } else {
                row += `<td class="empty"></td>`;
            }
        }

        row += "</tr>";
        table.innerHTML += row;
    });
}

// Generar la tabla al cargar la página
window.onload = generateGantt;
