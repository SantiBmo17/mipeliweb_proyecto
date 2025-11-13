const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

// BUSCADOR - CORREGIDO
const searchIcon = document.getElementById("searchIcon");
const searchContainer = document.getElementById("SearchIcon");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");

if (searchIcon) {
    searchIcon.addEventListener("click", () => {
        searchContainer.classList.toggle("hidden");
        resultsDiv.innerHTML = "";
    });
}

if (searchButton) {
    searchButton.addEventListener("click", buscarPelicula);
}

async function buscarPelicula() {
    const query = document.getElementById("SearchInput").value;
    if (!query) return alert("Escribe algo para buscar");

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/peliculas?titulo=${encodeURIComponent(query)}`);
        const data = await response.json();

        resultsDiv.innerHTML = "";

        if (data.mensaje) {
            resultsDiv.innerHTML = `<p>${data.mensaje}</p>`;
        } else {
            data.forEach(p => {
                const item = document.createElement("div");
                item.innerHTML = `<strong>${p.titulo}</strong> (${p.anio})`;
                resultsDiv.appendChild(item);
            });
        }
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        resultsDiv.innerHTML = `<p>Error al buscar películas</p>`;
    }
}

// ARROW FUNCTION - COMPLETAMENTE CORREGIDA
arrows.forEach((arrow, i) => {
    let clickCounter = 0;
    const maxClicks = 3; // Máximo de clicks antes de resetear

    arrow.addEventListener("click", () => {
        const movieList = movieLists[i];
        
        clickCounter++;
        
        if (clickCounter <= maxClicks) {
            // Mover hacia la izquierda: -300px por click
            movieList.style.transform = `translateX(${-300 * clickCounter}px)`;
        } else {
            // Resetear a la posición inicial
            movieList.style.transform = `translateX(0px)`;
            clickCounter = 0;
        }
    });
});

// TOGGLE - ESTE ESTÁ BIEN
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
    ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
    items.forEach((item) => {
        item.classList.toggle("active");
    });
    ball.classList.toggle("active");
});