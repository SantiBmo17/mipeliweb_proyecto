from fastapi import APIRouter
import os
import json

router = APIRouter(prefix="/api")

# Obtener ruta del archivo usuarios.json
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FILE_PATH = os.path.join(BASE_DIR, "..", "usuarios.json")


# ------------------------------
# Función para cargar usuarios
# ------------------------------
def cargar_usuarios():
    if not os.path.exists(FILE_PATH):
        with open(FILE_PATH, "w") as f:
            json.dump([], f)

    with open(FILE_PATH, "r") as f:
        try:
            return json.load(f)
        except:
            return []


# ------------------------------
# Función para guardar usuarios
# ------------------------------
def guardar_usuarios(data):
    with open(FILE_PATH, "w") as f:
        json.dump(data, f, indent=4)


# ------------------------------
# LOGIN
# ------------------------------
@router.post("/login")
def login(data: dict):
    email = data.get("email")
    password = data.get("password")

    usuarios = cargar_usuarios()

    for u in usuarios:
        if u["email"] == email and u["password"] == password:
            return {
                "status": "ok",
                "email": u["email"],
                "nombre": u["nombre"]
            }

    return {"status": "error", "msg": "Credenciales incorrectas"}


# ------------------------------
# REGISTRO
# ------------------------------
@router.post("/register")
def register(data: dict):
    nombre = data.get("nombre")
    email = data.get("email")
    password = data.get("password")

    usuarios = cargar_usuarios()

    # Validar si ya existe el correo
    for u in usuarios:
        if u["email"] == email:
            return {"status": "error", "msg": "El usuario ya existe"}

    nuevo_usuario = {
        "nombre": nombre,
        "email": email,
        "password": password,
    }

    usuarios.append(nuevo_usuario)
    guardar_usuarios(usuarios)

    return {"status": "ok", "msg": "Usuario registrado correctamente"}

