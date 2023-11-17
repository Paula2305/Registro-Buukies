document.addEventListener("DOMContentLoaded", function () {

    const form = {
        email:'',
        password: '',
        nombre: '',
        apellido: ''
    }

    const inputEmail = document.querySelector("#email");
    const inputContraseña = document.querySelector("#password");
    const inputNombre = document.querySelector("#nombre");
    const inputApellido = document.querySelector("#apellido");
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');

    inputEmail.addEventListener("blur", validar);
    inputContraseña.addEventListener("blur", validar);
    inputNombre.addEventListener("blur", validar);
    inputApellido.addEventListener("blur", validar);

    function validar(e) {
        if (e.target.value.trim() === "") {
        mostrarAlerta(`El campo es obligatorio`, e.target.parentElement.parentElement);
        form[e.target.name] = '';
        comprobarForm();
        return;
        }

        if(e.target.id === 'email' && ! validarEmail(e.target.value)){
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

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email); 
        return resultado;
    }

    function comprobarForm(){
        console.log(form);
        if(Object.values(form).includes('')) {// devuelve los valores del formulario y con includes valida si estan vacios los campos true = al menos uno vacio / false = si ninguno esta vacio
            btnSubmit.disabled = true;
        }else{
            btnSubmit.disabled = false;
        }
    }


});
