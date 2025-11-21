from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["Películas"])

class Pelicula(BaseModel):
    id: int
    titulo: str
    anio: int
    genero: str

# Base de datos temporal (lista en memoria)
peliculas = [
    {"id": 1, "titulo": "Django Unchained", "anio": 2012, "genero": "Acción"},
    {"id": 2, "titulo": "1917", "anio": 2019, "genero": "Bélica"}
]

@router.get("/peliculas")
def obtener_peliculas():
    return peliculas

@router.post("/peliculas")
def crear_pelicula(pelicula: Pelicula):
    peliculas.append(pelicula.dict())
    return {"mensaje": "Película creada exitosamente", "pelicula": pelicula}

@router.put("/peliculas/{pelicula_id}")
def actualizar_pelicula(pelicula_id: int, pelicula: Pelicula):
    for i, p in enumerate(peliculas):
        if p["id"] == pelicula_id:
            peliculas[i] = pelicula.dict()
            return {"mensaje": "Película actualizada", "pelicula": pelicula}
    return {"error": "Película no encontrada"}

@router.delete("/peliculas/{pelicula_id}")
def eliminar_pelicula(pelicula_id: int):
    for p in peliculas:
        if p["id"] == pelicula_id:
            peliculas.remove(p)
            return {"mensaje": f"Película con id {pelicula_id} eliminada"}
    return {"error": "Película no encontrada"}

    from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/api", tags=["Películas"])

class Pelicula(BaseModel):
    id: int
    titulo: str
    anio: int
    genero: str
    sinopsis: str = ""
    actores: List[str] = []
    director: str = ""
    duracion: str = ""
    imagen: str = ""

# Base de datos temporal (lista en memoria)
peliculas = [
    {
        "id": 1, 
        "titulo": "Django Unchained", 
        "anio": 2012, 
        "genero": "Acción/Western",
        "sinopsis": "Un esclavo liberado se une a un cazarrecompensas alemán para rescatar a su esposa de un cruel terrateniente del sur de EE. UU. Una historia de venganza, justicia y libertad dirigida por Quentin Tarantino.",
        "actores": ["Jamie Foxx", "Christoph Waltz", "Leonardo DiCaprio", "Kerry Washington", "Samuel L. Jackson", "Walton Goggins", "Dennis Christopher"],
        "director": "Quentin Tarantino",
        "duracion": "165 min",
        "imagen": "/Multimedia/img/f-t-1.png"
    },
    {
        "id": 2, 
        "titulo": "1917", 
        "anio": 2019, 
        "genero": "Bélica/Drama",
        "sinopsis": "Dos soldados británicos cruzan territorio enemigo para entregar un mensaje que podría salvar cientos de vidas durante la Primera Guerra Mundial. Una experiencia cinematográfica única filmada como si fuera una sola toma continua.",
        "actores": ["George MacKay", "Dean-Charles Chapman", "Mark Strong", "Andrew Scott", "Colin Firth", "Benedict Cumberbatch", "Richard Madden"],
        "director": "Sam Mendes",
        "duracion": "119 min",
        "imagen": "/Multimedia/img/4.jpg"
    },
    {
        "id": 3,
        "titulo": "Her",
        "anio": 2013,
        "genero": "Ciencia Ficción/Romance",
        "sinopsis": "Un hombre solitario desarrolla una relación inusual con un sistema operativo con inteligencia artificial diseñado para satisfacer todas sus necesidades. Una reflexión sobre el amor, la soledad y la tecnología en el mundo moderno.",
        "actores": ["Joaquin Phoenix", "Scarlett Johansson", "Amy Adams", "Rooney Mara", "Olivia Wilde", "Chris Pratt", "Matt Letscher"],
        "director": "Spike Jonze",
        "duracion": "126 min",
        "imagen": "/Multimedia/img/1.jpeg"
    },
    {
        "id": 4,
        "titulo": "Star Wars",
        "anio": 1977,
        "genero": "Ciencia Ficción/Aventura",
        "sinopsis": "Un joven granjero descubre su destino como Jedi y se une a la rebelión para derrotar al Imperio Galáctico. La épica saga espacial que cambió el cine para siempre.",
        "actores": ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "Alec Guinness", "Peter Cushing", "Anthony Daniels", "Kenny Baker"],
        "director": "George Lucas",
        "duracion": "121 min",
        "imagen": "/Multimedia/img/2.jpeg"
    },
    {
        "id": 5,
        "titulo": "Storm",
        "anio": 2017,
        "genero": "Drama/Thriller",
        "sinopsis": "Una intensa historia de supervivencia donde una tormenta imparable pone a prueba los límites humanos. Los protagonistas deben luchar contra las fuerzas de la naturaleza y sus propios demonios internos.",
        "actores": ["Tom Hardy", "Emily Blunt", "Michael Shannon", "John Krasinski", "Noah Jupe", "Cillian Murphy", "Millicent Simmonds"],
        "director": "Denis Villeneuve",
        "duracion": "110 min",
        "imagen": "/Multimedia/img/3.jpg"
    },
    {
        "id": 6,
        "titulo": "Avengers",
        "anio": 2012,
        "genero": "Acción/Ciencia Ficción",
        "sinopsis": "Los héroes más poderosos de la Tierra se unen para detener una invasión alienígena liderada por Loki. El primer encuentro épico de los Vengadores que cambió el Universo Cinematográfico de Marvel.",
        "actores": ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson", "Jeremy Renner", "Tom Hiddleston", "Samuel L. Jackson"],
        "director": "Joss Whedon",
        "duracion": "143 min",
        "imagen": "/Multimedia/img/5.jpg"
    }
]

@router.get("/peliculas")
def obtener_peliculas(titulo: str = None):
    if titulo:
        resultados = [p for p in peliculas if titulo.lower() in p["titulo"].lower()]
        return resultados if resultados else {"mensaje": "No se encontraron películas"}
    return peliculas

@router.get("/peliculas/{pelicula_id}")
def obtener_pelicula_por_id(pelicula_id: int):
    for pelicula in peliculas:
        if pelicula["id"] == pelicula_id:
            return pelicula
    return {"error": "Película no encontrada"}

@router.post("/peliculas")
def crear_pelicula(pelicula: Pelicula):
    peliculas.append(pelicula.dict())
    return {"mensaje": "Película creada exitosamente", "pelicula": pelicula}

@router.put("/peliculas/{pelicula_id}")
def actualizar_pelicula(pelicula_id: int, pelicula: Pelicula):
    for i, p in enumerate(peliculas):
        if p["id"] == pelicula_id:
            peliculas[i] = pelicula.dict()
            return {"mensaje": "Película actualizada", "pelicula": pelicula}
    return {"error": "Película no encontrada"}

@router.delete("/peliculas/{pelicula_id}")
def eliminar_pelicula(pelicula_id: int):
    for p in peliculas:
        if p["id"] == pelicula_id:
            peliculas.remove(p)
            return {"mensaje": f"Película con id {pelicula_id} eliminada"}
    return {"error": "Película no encontrada"}

    from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/api", tags=["Películas"])

class Pelicula(BaseModel):
    id: int
    titulo: str
    anio: int
    genero: str
    sinopsis: str = ""
    actores: List[str] = []
    director: str = ""
    duracion: str = ""
    imagen: str = ""

# Base de datos temporal (lista en memoria)
peliculas = [
    {
        "id": 1, 
        "titulo": "Django Unchained", 
        "anio": 2012, 
        "genero": "Acción/Western",
        "sinopsis": "Un esclavo liberado se une a un cazarrecompensas alemán para rescatar a su esposa de un cruel terrateniente del sur de EE. UU. Una historia de venganza, justicia y libertad dirigida por Quentin Tarantino.",
        "actores": ["Jamie Foxx", "Christoph Waltz", "Leonardo DiCaprio", "Kerry Washington", "Samuel L. Jackson", "Walton Goggins", "Dennis Christopher"],
        "director": "Quentin Tarantino",
        "duracion": "165 min",
        "imagen": "/Multimedia/img/f-t-1.png"
    },
    {
        "id": 2, 
        "titulo": "1917", 
        "anio": 2019, 
        "genero": "Bélica/Drama",
        "sinopsis": "Dos soldados británicos cruzan territorio enemigo para entregar un mensaje que podría salvar cientos de vidas durante la Primera Guerra Mundial. Una experiencia cinematográfica única filmada como si fuera una sola toma continua.",
        "actores": ["George MacKay", "Dean-Charles Chapman", "Mark Strong", "Andrew Scott", "Colin Firth", "Benedict Cumberbatch", "Richard Madden"],
        "director": "Sam Mendes",
        "duracion": "119 min",
        "imagen": "/Multimedia/img/4.jpg"
    },
    {
        "id": 3,
        "titulo": "Her",
        "anio": 2013,
        "genero": "Ciencia Ficción/Romance",
        "sinopsis": "Un hombre solitario desarrolla una relación inusual con un sistema operativo con inteligencia artificial diseñado para satisfacer todas sus necesidades. Una reflexión sobre el amor, la soledad y la tecnología en el mundo moderno.",
        "actores": ["Joaquin Phoenix", "Scarlett Johansson", "Amy Adams", "Rooney Mara", "Olivia Wilde", "Chris Pratt", "Matt Letscher"],
        "director": "Spike Jonze",
        "duracion": "126 min",
        "imagen": "/Multimedia/img/1.jpeg"
    },
    {
        "id": 4,
        "titulo": "Star Wars",
        "anio": 1977,
        "genero": "Ciencia Ficción/Aventura",
        "sinopsis": "Un joven granjero descubre su destino como Jedi y se une a la rebelión para derrotar al Imperio Galáctico. La épica saga espacial que cambió el cine para siempre.",
        "actores": ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "Alec Guinness", "Peter Cushing", "Anthony Daniels", "Kenny Baker"],
        "director": "George Lucas",
        "duracion": "121 min",
        "imagen": "/Multimedia/img/2.jpeg"
    },
    {
        "id": 5,
        "titulo": "Storm",
        "anio": 2017,
        "genero": "Drama/Thriller",
        "sinopsis": "Una intensa historia de supervivencia donde una tormenta imparable pone a prueba los límites humanos. Los protagonistas deben luchar contra las fuerzas de la naturaleza y sus propios demonios internos.",
        "actores": ["Tom Hardy", "Emily Blunt", "Michael Shannon", "John Krasinski", "Noah Jupe", "Cillian Murphy", "Millicent Simmonds"],
        "director": "Denis Villeneuve",
        "duracion": "110 min",
        "imagen": "/Multimedia/img/3.jpg"
    },
    {
        "id": 6,
        "titulo": "Avengers",
        "anio": 2012,
        "genero": "Acción/Ciencia Ficción",
        "sinopsis": "Los héroes más poderosos de la Tierra se unen para detener una invasión alienígena liderada por Loki. El primer encuentro épico de los Vengadores que cambió el Universo Cinematográfico de Marvel.",
        "actores": ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson", "Jeremy Renner", "Tom Hiddleston", "Samuel L. Jackson"],
        "director": "Joss Whedon",
        "duracion": "143 min",
        "imagen": "/Multimedia/img/5.jpg"
    }
]

@router.get("/peliculas")
def obtener_peliculas(titulo: str = None):
    if titulo:
        resultados = [p for p in peliculas if titulo.lower() in p["titulo"].lower()]
        return resultados if resultados else {"mensaje": "No se encontraron películas"}
    return peliculas

@router.get("/peliculas/{pelicula_id}")
def obtener_pelicula_por_id(pelicula_id: int):
    for pelicula in peliculas:
        if pelicula["id"] == pelicula_id:
            return pelicula
    return {"error": "Película no encontrada"}

@router.post("/peliculas")
def crear_pelicula(pelicula: Pelicula):
    peliculas.append(pelicula.dict())
    return {"mensaje": "Película creada exitosamente", "pelicula": pelicula}

@router.put("/peliculas/{pelicula_id}")
def actualizar_pelicula(pelicula_id: int, pelicula: Pelicula):
    for i, p in enumerate(peliculas):
        if p["id"] == pelicula_id:
            peliculas[i] = pelicula.dict()
            return {"mensaje": "Película actualizada", "pelicula": pelicula}
    return {"error": "Película no encontrada"}

@router.delete("/peliculas/{pelicula_id}")
def eliminar_pelicula(pelicula_id: int):
    for p in peliculas:
        if p["id"] == pelicula_id:
            peliculas.remove(p)
            return {"mensaje": f"Película con id {pelicula_id} eliminada"}
    return {"error": "Película no encontrada"}

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/api", tags=["Películas"])

class Pelicula(BaseModel):
    id: int
    titulo: str
    anio: int
    genero: str
    sinopsis: str = ""
    actores: List[str] = []
    director: str = ""
    duracion: str = ""
    imagen: str = ""

# Base de datos temporal (lista en memoria)
peliculas = [
    {
        "id": 1, 
        "titulo": "Django Unchained", 
        "anio": 2012, 
        "genero": "Acción/Western",
        "sinopsis": "Un esclavo liberado se une a un cazarrecompensas alemán para rescatar a su esposa de un cruel terrateniente del sur de EE. UU. Una historia de venganza, justicia y libertad dirigida por Quentin Tarantino.",
        "actores": ["Jamie Foxx", "Christoph Waltz", "Leonardo DiCaprio", "Kerry Washington", "Samuel L. Jackson", "Walton Goggins", "Dennis Christopher"],
        "director": "Quentin Tarantino",
        "duracion": "165 min",
        "imagen": "/Multimedia/img/f-t-1.png"
    },
    {
        "id": 2, 
        "titulo": "1917", 
        "anio": 2019, 
        "genero": "Bélica/Drama",
        "sinopsis": "Dos soldados británicos cruzan territorio enemigo para entregar un mensaje que podría salvar cientos de vidas durante la Primera Guerra Mundial. Una experiencia cinematográfica única filmada como si fuera una sola toma continua.",
        "actores": ["George MacKay", "Dean-Charles Chapman", "Mark Strong", "Andrew Scott", "Colin Firth", "Benedict Cumberbatch", "Richard Madden"],
        "director": "Sam Mendes",
        "duracion": "119 min",
        "imagen": "/Multimedia/img/4.jpg"
    },
    {
        "id": 3,
        "titulo": "Her",
        "anio": 2013,
        "genero": "Ciencia Ficción/Romance",
        "sinopsis": "Un hombre solitario desarrolla una relación inusual con un sistema operativo con inteligencia artificial diseñado para satisfacer todas sus necesidades. Una reflexión sobre el amor, la soledad y la tecnología en el mundo moderno.",
        "actores": ["Joaquin Phoenix", "Scarlett Johansson", "Amy Adams", "Rooney Mara", "Olivia Wilde", "Chris Pratt", "Matt Letscher"],
        "director": "Spike Jonze",
        "duracion": "126 min",
        "imagen": "/Multimedia/img/1.jpeg"
    },
    {
        "id": 4,
        "titulo": "Star Wars",
        "anio": 1977,
        "genero": "Ciencia Ficción/Aventura",
        "sinopsis": "Un joven granjero descubre su destino como Jedi y se une a la rebelión para derrotar al Imperio Galáctico. La épica saga espacial que cambió el cine para siempre.",
        "actores": ["Mark Hamill", "Harrison Ford", "Carrie Fisher", "Alec Guinness", "Peter Cushing", "Anthony Daniels", "Kenny Baker"],
        "director": "George Lucas",
        "duracion": "121 min",
        "imagen": "/Multimedia/img/2.jpeg"
    },
    {
        "id": 5,
        "titulo": "Storm",
        "anio": 2017,
        "genero": "Drama/Thriller",
        "sinopsis": "Una intensa historia de supervivencia donde una tormenta imparable pone a prueba los límites humanos. Los protagonistas deben luchar contra las fuerzas de la naturaleza y sus propios demonios internos.",
        "actores": ["Tom Hardy", "Emily Blunt", "Michael Shannon", "John Krasinski", "Noah Jupe", "Cillian Murphy", "Millicent Simmonds"],
        "director": "Denis Villeneuve",
        "duracion": "110 min",
        "imagen": "/Multimedia/img/3.jpg"
    },
    {
        "id": 6,
        "titulo": "Avengers",
        "anio": 2012,
        "genero": "Acción/Ciencia Ficción",
        "sinopsis": "Los héroes más poderosos de la Tierra se unen para detener una invasión alienígena liderada por Loki. El primer encuentro épico de los Vengadores que cambió el Universo Cinematográfico de Marvel.",
        "actores": ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson", "Jeremy Renner", "Tom Hiddleston", "Samuel L. Jackson"],
        "director": "Joss Whedon",
        "duracion": "143 min",
        "imagen": "/Multimedia/img/5.jpg"
    }
]

@router.get("/peliculas")
def obtener_peliculas(titulo: str = None):
    if titulo:
        resultados = [p for p in peliculas if titulo.lower() in p["titulo"].lower()]
        return resultados if resultados else {"mensaje": "No se encontraron películas"}
    return peliculas

@router.get("/peliculas/{pelicula_id}")
def obtener_pelicula_por_id(pelicula_id: int):
    for pelicula in peliculas:
        if pelicula["id"] == pelicula_id:
            return pelicula
    return {"error": "Película no encontrada"}

@router.post("/peliculas")
def crear_pelicula(pelicula: Pelicula):
    peliculas.append(pelicula.dict())
    return {"mensaje": "Película creada exitosamente", "pelicula": pelicula}

@router.put("/peliculas/{pelicula_id}")
def actualizar_pelicula(pelicula_id: int, pelicula: Pelicula):
    for i, p in enumerate(peliculas):
        if p["id"] == pelicula_id:
            peliculas[i] = pelicula.dict()
            return {"mensaje": "Película actualizada", "pelicula": pelicula}
    return {"error": "Película no encontrada"}

@router.delete("/peliculas/{pelicula_id}")
def eliminar_pelicula(pelicula_id: int):
    for p in peliculas:
        if p["id"] == pelicula_id:
            peliculas.remove(p)
            return {"mensaje": f"Película con id {pelicula_id} eliminada"}
    return {"error": "Película no encontrada"}

