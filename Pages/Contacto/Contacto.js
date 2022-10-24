
const formularioNombre = document.querySelector('#formularioNombre');
const formularioTelefono = document.querySelector('#formularioTelefono');
const formularioEmail = document.querySelector('#formularioEmail');
const formularioComentarios = document.querySelector('#formularioComentarios');

const enviarFormularioActivo = {
    nombre: '',
    telefono: '',
    email: '',
    comentarios: '',
}


formularioNombre.addEventListener('input', validar);
formularioTelefono.addEventListener('input', validar);
formularioEmail.addEventListener('input', validar);
formularioComentarios.addEventListener('input', validar);
const form = document.querySelector('#contact-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let values = []
    for (let i = 0; i < form.elements.length; i++) {
        if(form.elements[i].value){
            values.push(form.elements[i].value)
        }
    }
    console.log(values)
})

function validar(e) {
    if (e.target.value.trim() === '') {    
        mostrarAlertaFormulario(`El campo ${e.target.name} es obligatorio`, e.target.parentElement) //--> atributo name del input html
        enviarFormularioActivo[e.target.name] = '';
        return;
    }

    if (e.target.name === 'email' && !validarSoloEmail(e.target.value)) {
        mostrarAlertaFormulario('El email no es vàlido', e.target.parentElement);
        enviarFormularioActivo[e.target.name] = '';
        return;
    };

    limpiarAlerta(e.target.parentElement);

   
    enviarFormularioActivo[e.target.name] = e.target.value.trim().toLowerCase();
}

function mostrarAlertaFormulario(mensaje, referencia) {
    limpiarAlerta(referencia);

    const alerta = document.createElement('DIV');
    alerta.classList.add('btn', 'btn-warning', 'text-black', 'd-flex', 'justify-content-center', 'mt-3');
    alerta.textContent = mensaje;

    referencia.appendChild(alerta); 

    setTimeout(() => {
        alerta.remove()
    }, 3000);
}

function limpiarAlerta(referencia) {
    const alertaDuplicada = referencia.querySelector('.btn-warning'); 
    if (alertaDuplicada) {
        alertaDuplicada.remove();
    }
}


function validarSoloEmail(email) {
    const regex = /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(\.\w{2,10})+$/
    const resultado = regex.test(email)
    return resultado;
}
