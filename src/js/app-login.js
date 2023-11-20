document.addEventListener("DOMContentLoaded", function(){

    const form = {
        email: '',
        password:''
    }


    const inputEmail = document.querySelector("#email");
    const inputContraseña = document.querySelector("#password");
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')

    inputEmail.addEventListener('input', validar);
    inputContraseña.addEventListener('input', validar);// input se activa cuando se cambia la propiedad value de un elemento

    function validar(e){
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo es obligatorio`, e.target.parentElement.parentElement);
            form[e.target.name] = '';
            comprobarForm();
            return;
        }

        if(e.target.id === 'email' && ! validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido',  e.target.parentElement.parentElement);
            form[e.target.name] = '';
            comprobarForm();
            return;
        }

        limpiarAlerta(e.target.parentElement.parentElement);

        form[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarForm();
    }


    function mostrarAlerta(mensaje,referencia){
        limpiarAlerta(referencia);

        // console.log('Hubo un error')
        const error = document.createElement('P');

        error.textContent = mensaje;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

        referencia.appendChild(error);

    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email); // test devuelve true o false en caso de que la expresion regular se cumpla o no
        return resultado;
    }

    function comprobarForm(){
        if(Object.values(form).includes('')) {// devuelve los valores del formulario y con includes valida si estan vacios los campos true = al menos uno vacio / false = si ninguno esta vacio
            btnSubmit.disabled = true;
        }else{
            btnSubmit.disabled = false;
        }
    }

})
