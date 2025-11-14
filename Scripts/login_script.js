// Cambiar entre login y registro
const container = document.getElementById("container");
const btnShowRegister = document.getElementById("btn-show-register");
const btnShowLogin = document.getElementById("btn-show-login");

btnShowRegister.addEventListener("click", () => {
    container.classList.add("show-register");
});

btnShowLogin.addEventListener("click", () => {
    container.classList.remove("show-register");
});


// -----------------------------
// LOGIN
// -----------------------------
async function loginUser() {
    const email = document.getElementById("email_login").value.trim();
    const password = document.getElementById("pass_login").value.trim();

    if (!email || !password) {
        alert("Por favor ingrese el correo y la contraseña.");
        return;
    }

    const datos = { email, password };

    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    const result = await response.json();

    if (result.status === "ok") {
        alert("Bienvenido " + result.email);
        localStorage.setItem("usuario", JSON.stringify(result));
        window.location.href = "/index.html";
    } else {
        alert(result.msg || "Credenciales incorrectas");
    }
}



// -----------------------------
// REGISTRO
// -----------------------------
async function registrarUser() {
    const nombre = document.getElementById("nombre_reg").value.trim();
    const email = document.getElementById("email_reg").value.trim();
    const password = document.getElementById("pass_reg").value.trim();

    if (!nombre || !email || !password) {
        alert("Por favor complete todos los campos");
        return;
    }

    const datos = { nombre, email, password };

    const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    const result = await response.json();

    if (result.status === "ok") {
        alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
        container.classList.remove("show-register");
    } else {
        alert(result.msg || "Error al registrar usuario");
    }
}
