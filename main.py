from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from api.peliculas import router as peliculas_router

import os

app = FastAPI()

#Cuando alguien entre a.... Sirve los archivos desde esas carpetas
app.mount("/Multimedia", StaticFiles(directory="Multimedia"), name="Multimedia")
app.mount("/Estilos", StaticFiles(directory="Estilos"), name="Estilos")
app.mount("/Scripts", StaticFiles(directory="Scripts"), name="Scripts")

@app.get("/")
def read_root():
    return FileResponse(os.path.join("index.html"))

app.include_router(peliculas_router)

@app.get("/{file_path:path}")
def static_files(file_path: str):
    path = os.path.join(file_path)
    if os.path.exists(path):
        return FileResponse(path)
    return {"error": "Archivo no encontrado"}


