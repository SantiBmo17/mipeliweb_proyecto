from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from api import peliculas
from api import usuarios
import os

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers (ANTES de rutas HTML)
app.include_router(peliculas.router)
app.include_router(usuarios.router)

# Rutas HTML principales
@app.get("/")
def read_root():
    return FileResponse("index.html")

@app.get("/pelicula.html")
def read_pelicula():
    return FileResponse("pelicula.html")

# Servir estáticos
@app.get("/Multimedia/{file_path:path}")
def multimedia_files(file_path: str):
    path = os.path.join("Multimedia", file_path)
    return FileResponse(path) if os.path.isfile(path) else {"error": "Archivo no encontrado"}

@app.get("/Estilos/{file_path:path}")
def estilos_files(file_path: str):
    path = os.path.join("Estilos", file_path)
    return FileResponse(path) if os.path.isfile(path) else {"error": "Archivo no encontrado"}

@app.get("/Scripts/{file_path:path}")
def scripts_files(file_path: str):
    path = os.path.join("Scripts", file_path)
    return FileResponse(path) if os.path.isfile(path) else {"error": "Archivo no encontrado"}

# CATCH-ALL (AL FINAL)
@app.get("/{file_path:path}")
def static_files(file_path: str):
    # Evitar interceptar rutas API
    if file_path.startswith("api"):
        return {"error": "Ruta reservada para API"}

    excluded = ("Multimedia/", "Estilos/", "Scripts/")
    if any(file_path.startswith(prefix) for prefix in excluded):
        return {"error": "Archivo no encontrado"}

    if os.path.isfile(file_path):
        return FileResponse(file_path)

    return {"error": "Archivo no encontrado"}
