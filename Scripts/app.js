// ==============================================
// DECLARACIONES GLOBALES
// ==============================================
const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

// Buscar elementos clave del DOM para evitar null errors
// Nota: Las declaraciones deben coincidir con los IDs en el HTML.
const btnLogout = document.getElementById("btnLogout");
const searchIcon = document.getElementById("searchIcon"); // Asumido para el toggle del buscador
const searchContainer = document.getElementById("searchContainer"); // Asumido para el div contenedor del input/boton
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");

// ==============================================
// INICIALIZACIÓN (DOMContentLoaded)
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. CERRAR SESIÓN (LOGOUT) ---
    // El botón se declara de nuevo aquí para asegurar su existencia si el script no está al final del body
    // Nota: El botón ya fue declarado globalmente, pero esta es una capa extra de seguridad.
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            alert("Sesión cerrada");
            window.location.href = "/login.html";
        });
    }


    // --- 2. BUSCADOR ---
    
    // Configuración para mostrar/ocultar el buscador (Icono de Lupa)
    if (searchIcon && searchContainer) {
        searchIcon.addEventListener("click", () => {
            searchContainer.classList.toggle("hidden");
            // Limpiar resultados al ocultar
            if (resultsDiv) resultsDiv.innerHTML = ""; 
        });
    }

    // Configuración del botón de búsqueda
    if (searchButton) {
        // Aseguramos que la función se ejecuta al hacer clic
        searchButton.addEventListener("click", buscarPelicula);
    }
    
    // --- 3. CONFIGURAR BOTONES VER ---
    configurarBotonesVer();

    // Reconfiguración después de un pequeño delay
    setTimeout(function() {
        console.log("Reconfigurando botones VER después de delay...");
        configurarBotonesVer();
    }, 500);
});

// ==============================================
// FUNCIONES
// ==============================================

async function buscarPelicula() {
    // Corregido: Obtenemos el input DENTRO de la función para asegurar que el DOM esté listo
    const searchInput = document.getElementById("searchInput"); 
    
    // Añadimos una verificación de nulidad para evitar el TypeError
    if (!searchInput) {
        console.error("Error: El campo de búsqueda con ID 'searchInput' no fue encontrado.");
        alert("Error interno: El campo de búsqueda no está disponible.");
        return;
    }
    
    const query = searchInput.value.trim();

    if (!query) {
        alert("Escribe algo para buscar");
        return;
    }

    try {
        console.log("Buscando:", query);
        const response = await fetch(`http://127.0.0.1:8000/api/peliculas?titulo=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Datos recibidos:", data);

        if (resultsDiv) {
            resultsDiv.innerHTML = "";

            if (data.mensaje) {
                resultsDiv.innerHTML = `<p>${data.mensaje}</p>`;
            } else {
                data.forEach(p => {
                    const item = document.createElement("div");
                    item.classList.add("result-item");
                    item.innerHTML = `
                      <div>
                        <strong>${p.titulo}</strong> (${p.anio})
                        <br>
                        <small>${p.genero}</small>
                      </div>
                      <button onclick="verDetalles(${p.id})" class="ver-detalle-btn">Ver Detalles</button>
                    `;
                    resultsDiv.appendChild(item);
                });
            }
        }

    } catch (error) {
        console.error("Error en la búsqueda:", error);
        if (resultsDiv) {
            resultsDiv.innerHTML = `<p>Error al conectar con el servidor</p>`;
        }
    }
}


// Función para ver detalles 
function verDetalles(peliculaId) {
    console.log("Abriendo detalles para pelicula ID:", peliculaId)
    window.open(`pelicula.html?id=${peliculaId}`, '_blank');
}

// ARROW FUNCTION (función de desplazamiento)
arrows.forEach((arrow, i) => {
    let clickCounter = 0;
    const maxClicks = 3;

    arrow.addEventListener("click", () => {
        const movieList = movieLists[i];
        
        clickCounter++;
        
        if (clickCounter <= maxClicks) {
            movieList.style.transform = `translateX(${-300 * clickCounter}px)`;
        } else {
            movieList.style.transform = `translateX(0px)`;
            clickCounter = 0;
        }
    });
});

// TOGGLE (Tema oscuro/claro)
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
    ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

if (ball) {
    ball.addEventListener("click", () => {
        items.forEach((item) => {
            item.classList.toggle("active");
        });
        ball.classList.toggle("active");
    });
}

// BOTONES VER - Redirigir a página de detalles
function configurarBotonesVer() {
    console.log("Configurando botones VER...");
    
    const verButtons = document.querySelectorAll(".movie-list-item-button, .featured-button");
    
    console.log("Total de botones VER encontrados:", verButtons.length);
    
    verButtons.forEach((button, index) => {
        const peliculaId = button.getAttribute("data-pelicula-id");
        console.log(`Botón ${index + 1}:`, peliculaId ? `ID=${peliculaId}` : "SIN data-pelicula-id");
        
        // Clonación para remover listeners antiguos
        const nuevoButton = button.cloneNode(true);
        button.parentNode.replaceChild(nuevoButton, button);
        
        // Agregar nuevo listener
        nuevoButton.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const id = this.getAttribute("data-pelicula-id");
            console.log("CLICK en botón VER - ID:", id);
            
            if (id) {
                const url = `pelicula.html?id=${id}`;
                console.log("Redirigiendo a:", url);
                window.location.href = url;
            } else {
                console.warn("Este botón no tiene data-pelicula-id");
                alert("Esta película no tiene información disponible");
            }
        });
    });
    
    console.log("Botones VER configurados");
}