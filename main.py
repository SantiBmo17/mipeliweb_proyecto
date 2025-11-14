from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from api import peliculas, login, usuarios   # ← AGREGADO
import os

app = FastAPI(title="TuMovie API", version="1.0")

# ---------------------------
#  SERVIR ARCHIVOS ESTÁTICOS
# ---------------------------
app.mount("/Multimedia", StaticFiles(directory="Multimedia"), name="Multimedia")
app.mount("/Estilos", StaticFiles(directory="Estilos"), name="Estilos")
app.mount("/Scripts", StaticFiles(directory="Scripts"), name="Scripts")

# ---------------------------
#     RUTA PRINCIPAL
# ---------------------------
@app.get("/")
def read_root():
    return FileResponse("index.html")

# ---------------------------
#     RUTAS API
# ---------------------------
app.include_router(peliculas.router)
app.include_router(login.router)
app.include_router(usuarios.router)   # ← AGREGADO

# ---------------------------
#  SERVIR ARCHIVOS HTML
# ---------------------------
@app.get("/{filename}.html")
def serve_html(filename: str):
    base_path = os.path.dirname(os.path.abspath(__file__))  # ruta absoluta del proyecto
    file_path = os.path.join(base_path, f"{filename}.html")

    if os.path.isfile(file_path):
        return FileResponse(file_path)
    
    return {"error": f"Archivo no encontrado: {file_path}"}
