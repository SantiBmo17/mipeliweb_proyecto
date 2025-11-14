from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from api import peliculas
import os

app = FastAPI()

# Configurar CORS si es necesario
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# IMPORTANTE: Incluir el router de la API PRIMERO para que tenga prioridad
app.include_router(peliculas.router)

# Rutas específicas para HTML
@app.get("/")
def read_root():
    return FileResponse(os.path.join("index.html"))

@app.get("/pelicula.html")
def read_pelicula():
    return FileResponse(os.path.join("pelicula.html"))

# Servir archivos estáticos directamente
@app.get("/Multimedia/{file_path:path}")
def multimedia_files(file_path: str):
    path = os.path.join("Multimedia", file_path)
    if os.path.exists(path) and os.path.isfile(path):
        return FileResponse(path)
    return {"error": "Archivo no encontrado"}

@app.get("/Estilos/{file_path:path}")
def estilos_files(file_path: str):
    path = os.path.join("Estilos", file_path)
    if os.path.exists(path) and os.path.isfile(path):
        return FileResponse(path)
    return {"error": "Archivo no encontrado"}

@app.get("/Scripts/{file_path:path}")
def scripts_files(file_path: str):
    path = os.path.join("Scripts", file_path)
    if os.path.exists(path) and os.path.isfile(path):
        return FileResponse(path)
    return {"error": "Archivo no encontrado"}

# Ruta catch-all al final para otros archivos HTML
# IMPORTANTE: Esta ruta debe estar al final y excluir explícitamente /api
@app.get("/{file_path:path}")
def static_files(file_path: str):
    # Excluir rutas de API y archivos estáticos
    if file_path.startswith("api/"):
        return {"error": "Ruta de API no manejada por catch-all"}
    
    excluded = ("Multimedia/", "Estilos/", "Scripts/")
    if any(file_path.startswith(prefix) for prefix in excluded):
        return {"error": "Archivo no encontrado"}
    
    path = os.path.join(file_path)
    if os.path.exists(path) and os.path.isfile(path):
        return FileResponse(path)
    return {"error": "Archivo no encontrado"}


