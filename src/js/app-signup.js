const form = {
    email: '',
    password: '',
    nombre: '',
    apellido: ''
}

const inputEmail = document.querySelector("#email");
const inputContrasena = document.querySelector("#password");
const inputNombre = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const btnSubmit = document.querySelector('#formulario button[type="button"]');

inputEmail.addEventListener("blur", validar);
inputContrasena.addEventListener("blur", validar);
inputNombre.addEventListener("blur", validar);
inputApellido.addEventListener("blur", validar);
btnSubmit.addEventListener('click', registrarUsuario);


function validar(e) {


    if (e.target.value.trim() === "") {
        mostrarAlerta(`El campo es obligatorio`, e.target.parentElement.parentElement);
        form[e.target.name] = '';
        comprobarForm();
        return;
    }

    if (e.target.id === 'email' && !validarEmail(e.target.value)) {
        mostrarAlerta('El email no es valido', e.target.parentElement.parentElement);
        form[e.target.name] = '';
        comprobarForm();
        return;
    }

    limpiarAlerta(e.target.parentElement.parentElement);

    form[e.target.name] = e.target.value.trim().toLowerCase();

    comprobarForm();


}

function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);
    const error = document.createElement("P");

    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");
    referencia.appendChild(error);
}

function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
        alerta.remove();
    }
}

function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return regex.test(email);
}

function registrarUsuario() {
    let _body = {
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        email: inputEmail.value,
        password: inputContrasena.value
    }

    fetch("http://localhost:8500/auth/signup", {
        method: "POST",
        body: JSON.stringify(_body),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
}

function comprobarForm() {
    if (Object.values(form).includes('')) {// devuelve los valores del formulario y con includes valida si estan vacios los campos true = al menos uno vacio / false = si ninguno esta vacio
        btnSubmit.disabled = true;
    } else {
        btnSubmit.disabled = false;
    }
}

