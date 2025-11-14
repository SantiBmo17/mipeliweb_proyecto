const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

// BUSCADOR
const searchIcon = document.getElementById("searchIcon");
const searchContainer = document.getElementById("SearchIcon");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");

// Solo ejecutar si los elementos existen
if (searchIcon && searchContainer) {
    searchIcon.addEventListener("click", () => {
        searchContainer.classList.toggle("hidden");
        if (resultsDiv) resultsDiv.innerHTML = "";
    });
}

if (searchButton) {
    searchButton.addEventListener("click", buscarPelicula);
}

async function buscarPelicula() {
    const searchInput = document.getElementById("SearchInput");    
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

// ARROW FUNCTION (tu código existente)
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

// TOGGLE
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
    
    // Botones de películas en las listas y featured
    const verButtons = document.querySelectorAll(".movie-list-item-button, .featured-button");
    
    console.log("Total de botones VER encontrados:", verButtons.length);
    
    verButtons.forEach((button, index) => {
        const peliculaId = button.getAttribute("data-pelicula-id");
        console.log(`Botón ${index + 1}:`, peliculaId ? `ID=${peliculaId}` : "SIN ID");
        
        // Remover cualquier listener anterior
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

// Ejecutar cuando el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("DOM cargado, configurando botones...");
        configurarBotonesVer();
    });
} else {
    // DOM ya está listo
    console.log("DOM ya listo, configurando botones...");
    configurarBotonesVer();
}

// También ejecutar después de un pequeño delay por si acaso
setTimeout(function() {
    console.log("Reconfigurando botones después de delay...");
    configurarBotonesVer();
}, 500);