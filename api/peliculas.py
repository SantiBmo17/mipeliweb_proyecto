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
