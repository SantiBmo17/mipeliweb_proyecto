// Obtener el ID de la película de la URL
const urlParams = new URLSearchParams(window.location.search);
const peliculaId = urlParams.get('id');

// Cargar datos de la película
async function cargarPelicula() {
    if (!peliculaId) {
        document.body.innerHTML = '<div class="error">Película no encontrada</div>';
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/peliculas/${peliculaId}`);
        const pelicula = await response.json();

        // Actualizar la página con los datos
        document.getElementById('peliculaTitulo').textContent = pelicula.titulo;
        document.getElementById('peliculaImagen').src = pelicula.imagen;
        document.getElementById('peliculaAnio').textContent = pelicula.anio;
        document.getElementById('peliculaGenero').textContent = pelicula.genero;
        document.getElementById('peliculaDuracion').textContent = pelicula.duracion;
        document.getElementById('peliculaDescripcion').textContent = pelicula.descripcion;
        document.getElementById('peliculaDirector').textContent = pelicula.director;

        // Detalles
        document.getElementById('detalleTitulo').textContent = pelicula.titulo;
        document.getElementById('detalleAnio').textContent = pelicula.anio;
        document.getElementById('detalleGenero').textContent = pelicula.genero;
        document.getElementById('detalleDirector').textContent = pelicula.director;
        document.getElementById('detalleDuracion').textContent = pelicula.duracion;

        // Actualizar título de la página
        document.title = `${pelicula.titulo} - TuMovie.com`;

    } catch (error) {
        console.error('Error al cargar la película:', error);
        document.body.innerHTML = '<div class="error">Error al cargar la película</div>';
    }
}

function reproducirPelicula() {
    alert('Función de reproducción en desarrollo...');
}

function agregarFavoritos() {
    alert('Película agregada a favoritos');
}

// Cargar la película cuando se abra la página
document.addEventListener('DOMContentLoaded', cargarPelicula);