from fastapi import APIRouter
from pydantic import BaseModel
import json
import os

router = APIRouter(prefix="/api", tags=["Usuarios"])

class Usuario(BaseModel):
    nombre: str
    email: str
    password: str

ruta_archivo = "usuarios.json"

def cargar_usuarios():
    if not os.path.isfile(ruta_archivo):
        return []
    with open(ruta_archivo, "r") as f:
        return json.load(f)

def guardar_usuarios(usuarios):
    with open(ruta_archivo, "w") as f:
        json.dump(usuarios, f, indent=4)

@router.post("/register")
def registrar_usuario(user: Usuario):
    usuarios = cargar_usuarios()

    for u in usuarios:
        if u["email"] == user.email:
            return {"status": "error", "msg": "El correo ya está registrado."}

    usuarios.append(user.dict())
    guardar_usuarios(usuarios)

    return {"status": "ok", "msg": "Usuario registrado correctamente"}
