// Obtener el ID de la película desde la URL
const urlParams = new URLSearchParams(window.location.search);
const peliculaId = urlParams.get('id');

// Función para cargar los detalles de la película
async function cargarDetallesPelicula() {
    console.log('ID de película desde URL:', peliculaId);
    
    if (!peliculaId) {
        mostrarError('No se especificó un ID de película');
        return;
    }

    try {
        const url = `http://127.0.0.1:8000/api/peliculas/${peliculaId}`;
        console.log('Cargando película desde:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const pelicula = await response.json();

        console.log('Película recibida:', pelicula);

        if (pelicula.error) {
            mostrarError(pelicula.error);
            return;
        }

        // Mostrar la información de la película
        mostrarPelicula(pelicula);
    } catch (error) {
        console.error('Error al cargar la película:', error);
        mostrarError(`Error al cargar la información de la película: ${error.message}`);
    }
}

// Función para mostrar la información de la película
function mostrarPelicula(pelicula) {
    // Título
    const tituloElement = document.getElementById('pelicula-titulo');
    if (tituloElement) {
        tituloElement.textContent = pelicula.titulo;
    }

    // Imagen del poster
    const imagen = document.getElementById('pelicula-imagen');
    if (imagen && pelicula.imagen) {
        console.log('Actualizando imagen para:', pelicula.titulo, '| Ruta:', pelicula.imagen);
        imagen.src = pelicula.imagen;
        imagen.alt = `Poster de ${pelicula.titulo}`;
    }

    // Fondo del featured-content con la imagen
    const hero = document.getElementById('pelicula-hero');
    if (hero && pelicula.imagen) {
        hero.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(21,21,21,0.95)), url(${pelicula.imagen})`;
    }

    // Meta información
    const anioElement = document.getElementById('pelicula-anio');
    if (anioElement) anioElement.textContent = pelicula.anio;

    const generoElement = document.getElementById('pelicula-genero');
    if (generoElement) generoElement.textContent = pelicula.genero;

    const duracionElement = document.getElementById('pelicula-duracion');
    if (duracionElement) duracionElement.textContent = pelicula.duracion || 'N/A';

    // Director
    const directorElement = document.getElementById('pelicula-director');
    if (directorElement) {
        directorElement.textContent = pelicula.director || 'No especificado';
    }

    // Sinopsis (Descripción)
    const sinopsisElement = document.getElementById('pelicula-sinopsis');
    if (sinopsisElement) {
        sinopsisElement.textContent = pelicula.sinopsis || 'Sinopsis no disponible';
        console.log('Sinopsis actualizada:', pelicula.sinopsis);
    }

    // Actores
    const actoresLista = document.getElementById('actores-lista');
    if (actoresLista) {
        actoresLista.innerHTML = '';
        
        if (pelicula.actores && pelicula.actores.length > 0) {
            pelicula.actores.forEach(actor => {
                const actorItem = document.createElement('div');
                actorItem.className = 'actor-item';
                actorItem.textContent = actor;
                actoresLista.appendChild(actorItem);
            });
            console.log('Actores cargados:', pelicula.actores.length);
        } else {
            actoresLista.innerHTML = '<p>Información de actores no disponible</p>';
        }
    }

    // Actualizar el título de la página
    document.title = `${pelicula.titulo} - Tu Movie.com`;
    
    console.log('✓ Información de película cargada correctamente:', pelicula.titulo);
}

// Función para mostrar errores
function mostrarError(mensaje) {
    const container = document.querySelector('.container .content-container');
    if (container) {
        container.innerHTML = `
            <div class="error-container">
                <h2>Error</h2>
                <p>${mensaje}</p>
                <button class="featured-button" onclick="window.location.href='index.html'">
                    <i class="fas fa-arrow-left"></i> Volver al inicio
                </button>
            </div>
        `;
    }
}

// Cargar los detalles cuando se carga la página
console.log('Script pelicula.js cargado. ID de película:', peliculaId);

// Ejecutar inmediatamente si el DOM ya está listo, sino esperar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarDetallesPelicula);
} else {
    // DOM ya está listo
    cargarDetallesPelicula();
}
