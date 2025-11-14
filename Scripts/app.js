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