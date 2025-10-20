from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

#app.mount("/Multimedia", StaticFiles(directory="Multimedia"), name="Multimedia")

multimedia_path = "Multimedia"

if os.path.exists(multimedia_path):
    app.mount("/Multimedia", StaticFiles(directory=multimedia_path), name="Multimedia")
else:
    print("⚠️ Carpeta 'Multimedia' no encontrada")

@app.get("/")
def read_root():
    return FileResponse(os.path.join("index.html"))

@app.get("/{file_path:path}")
def static_files(file_path: str):
    path = os.path.join(file_path)
    if os.path.exists(path):
        return FileResponse(path)
    return {"error": "Archivo no encontrado"}
