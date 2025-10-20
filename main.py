from fastapi import FastAPI
from fastapi.responses import FileResponse
import os

app = FastAPI()

@app.get("/")
def read_root():
    return FileResponse(os.path.join("index.html"))

@app.get("/{file_path:path}")
def static_files(file_path: str):
    path = os.path.join(file_path)
    if os.path.exists(path):
        return FileResponse(path)
    return {"error": "Archivo no encontrado"}
