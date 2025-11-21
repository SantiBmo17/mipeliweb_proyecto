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

// Obtener el ID de la película desde la URL


console.log('pelicula.html cargado, ID de la película:', peliculaId);

// Cargar detalles al iniciar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarDetallesPelicula);
} else {
    cargarDetallesPelicula();
}

async function cargarDetallesPelicula() {
    if (!peliculaId) {
        mostrarError('No se especificó un ID de película en la URL');
        return;
    }

    const url = `http://127.0.0.1:8000/api/peliculas/${peliculaId}`;
    console.log('Consultando API:', url);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const pelicula = await response.json();
        console.log('Película recibida desde API:', pelicula);

        if (pelicula.error) {
            mostrarError(pelicula.error);
            return;
        }

        mostrarPelicula(pelicula);
    } catch (error) {
        console.error('Error al cargar la película:', error);
        mostrarError(`Error al cargar la película: ${error.message}`);
    }
}

function mostrarPelicula(pelicula) {
    console.log('Mostrando película:', pelicula);

    // ====== ELEMENTOS PRINCIPALES (coinciden con TU HTML) ======
    const tituloElement = document.getElementById('peliculaTitulo');
    if (tituloElement) tituloElement.textContent = pelicula.titulo || 'Sin título';

    const anioElement = document.getElementById('peliculaAnio');
    if (anioElement) anioElement.textContent = pelicula.anio || 'N/A';

    const generoElement = document.getElementById('peliculaGenero');
    if (generoElement) generoElement.textContent = pelicula.genero || 'N/A';

    const duracionElement = document.getElementById('peliculaDuracion');
    if (duracionElement) duracionElement.textContent = pelicula.duracion || 'N/A';

    const directorElement = document.getElementById('peliculaDirector');
    if (directorElement) directorElement.textContent = pelicula.director || 'No especificado';

    const descElement = document.getElementById('peliculaDescripcion');
    if (descElement) descElement.textContent =
        pelicula.sinopsis || pelicula.descripcion || 'Sinopsis no disponible';

    // ====== IMAGEN DEL POSTER ======
    const imagen = document.getElementById('peliculaImagen');
    if (imagen && pelicula.imagen) {
        // Arreglar posible ruta con "/" al inicio
        let ruta = pelicula.imagen.replace(/^\/+/, '');
        console.log('Ruta de imagen final usada:', ruta);
        imagen.src = ruta;
        imagen.alt = `Poster de ${pelicula.titulo || ''}`;
    } else {
        console.warn('No se pudo asignar la imagen. Valor pelicula.imagen:', pelicula.imagen);
    }

    // ====== DETALLES INFERIORES ======
    const detalleTitulo = document.getElementById('detalleTitulo');
    if (detalleTitulo) detalleTitulo.textContent = pelicula.titulo || '';

    const detalleAnio = document.getElementById('detalleAnio');
    if (detalleAnio) detalleAnio.textContent = pelicula.anio || '';

    const detalleGenero = document.getElementById('detalleGenero');
    if (detalleGenero) detalleGenero.textContent = pelicula.genero || '';

    const detalleDirector = document.getElementById('detalleDirector');
    if (detalleDirector) detalleDirector.textContent = pelicula.director || '';

    // Título de la pestaña
    document.title = `${pelicula.titulo || 'Película'} - TuMovie.com`;

    console.log('✓ Información de película pintada en la página.');
}

function mostrarError(mensaje) {
    alert(mensaje); // sencillo por ahora
}


console.log('pelicula.html cargado, ID de la película:', peliculaId);

// Cargar detalles al iniciar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarDetallesPelicula);
} else {
    cargarDetallesPelicula();
}

async function cargarDetallesPelicula() {
    if (!peliculaId) {
        mostrarError('No se especificó un ID de película en la URL');
        return;
    }

    const url = `http://127.0.0.1:8000/api/peliculas/${peliculaId}`;
    console.log('Consultando API:', url);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const pelicula = await response.json();
        console.log('Película recibida desde API:', pelicula);

        if (pelicula.error) {
            mostrarError(pelicula.error);
            return;
        }

        mostrarPelicula(pelicula);
    } catch (error) {
        console.error('Error al cargar la película:', error);
        mostrarError(`Error al cargar la película: ${error.message}`);
    }
}

function mostrarPelicula(pelicula) {
    console.log('Mostrando película:', pelicula);

    // ====== ELEMENTOS PRINCIPALES (coinciden con TU HTML) ======
    const tituloElement = document.getElementById('peliculaTitulo');
    if (tituloElement) tituloElement.textContent = pelicula.titulo || 'Sin título';

    const anioElement = document.getElementById('peliculaAnio');
    if (anioElement) anioElement.textContent = pelicula.anio || 'N/A';

    const generoElement = document.getElementById('peliculaGenero');
    if (generoElement) generoElement.textContent = pelicula.genero || 'N/A';

    const duracionElement = document.getElementById('peliculaDuracion');
    if (duracionElement) duracionElement.textContent = pelicula.duracion || 'N/A';

    const directorElement = document.getElementById('peliculaDirector');
    if (directorElement) directorElement.textContent = pelicula.director || 'No especificado';

    const descElement = document.getElementById('peliculaDescripcion');
    if (descElement) descElement.textContent =
        pelicula.sinopsis || pelicula.descripcion || 'Sinopsis no disponible';

    // ====== IMAGEN DEL POSTER ======
    const imagen = document.getElementById('peliculaImagen');
    if (imagen && pelicula.imagen) {
        // Arreglar posible ruta con "/" al inicio
        let ruta = pelicula.imagen.replace(/^\/+/, '');
        console.log('Ruta de imagen final usada:', ruta);
        imagen.src = ruta;
        imagen.alt = `Poster de ${pelicula.titulo || ''}`;
    } else {
        console.warn('No se pudo asignar la imagen. Valor pelicula.imagen:', pelicula.imagen);
    }

    // ====== DETALLES INFERIORES ======
    const detalleTitulo = document.getElementById('detalleTitulo');
    if (detalleTitulo) detalleTitulo.textContent = pelicula.titulo || '';

    const detalleAnio = document.getElementById('detalleAnio');
    if (detalleAnio) detalleAnio.textContent = pelicula.anio || '';

    const detalleGenero = document.getElementById('detalleGenero');
    if (detalleGenero) detalleGenero.textContent = pelicula.genero || '';

    const detalleDirector = document.getElementById('detalleDirector');
    if (detalleDirector) detalleDirector.textContent = pelicula.director || '';

    // Título de la pestaña
    document.title = `${pelicula.titulo || 'Película'} - TuMovie.com`;

    console.log('✓ Información de película pintada en la página.');
}

function mostrarError(mensaje) {
    alert(mensaje); // sencillo por ahora
}
