// Formulario de registro
const formContacto = document.getElementById('contact-form');
// Inputs del formulario
const inputsContacto = document.querySelectorAll('#contact-form input');
// Textarea del formulario
const textarea = document.querySelector('#input-mensaje textarea');
// Boton de registro
const btnContacto = document.getElementById('enviar');

// Expresiones regulares de cada campo del formulario
const expresiones = {
	nombre: /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/,
	apellidos: /^([A-ZÁÉÍÓÚ a-zñáéíóú]{1,})+$/,
	correo: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  mensaje: /^([A-Za-z0-9 \r\n@£$¥èéùìòÇØøÅå\u0394_\u03A6\u0393\u0027\u0022\u039B\u03A9\u03A0\u03A8\u03A3\u0398\u039EÆæßÉ!\#$%&amp;()*+,\./\-:;&lt;=&gt;?¡ÄÖÑÜ§¿äöñüà^{}\\\[~\]|\u20AC]{1,500})+$/
	
}

// Campos del formulario
const campos = {
	nombre: false,
	apellidos: false,
	correo: false,
  opciones: false,
  mensaje: false,
}

const sesion = {
	nombre: document.getElementById('nombre'),
	apellidos: document.getElementById('apellidos'),
	correo: document.getElementById('correo')
}

// Llamar a la funcion "validarCampo" pasando los parametros de cada input
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			inputFocus(e, 'nombre');
			validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
		case "apellidos":
			inputFocus(e, 'apellidos');
			validarCampo(expresiones.apellidos, e.target, 'apellidos');
			break;
		case "correo":
			inputFocus(e, 'correo');
			validarCampo(expresiones.correo, e.target, 'correo');
			break;
	}
}

// Cambiar estilo del input dependiendo de si se le hace foco o si lo pierde
const inputFocus = (evento, campo) => {
	if (evento.type === 'focus') {
		document.getElementById(`input-${campo}`).classList.add('input-focus');
	} else if (evento.type === 'blur') {
		document.getElementById(`input-${campo}`).classList.remove('focus');
	}
}

// Cambiar estilo de cada campo dependiendo de si es correcto o no
const validarCampo = (expresion, input, campo) => {
	// Si el campo es correcto
	if (expresion.test(input.value)) {
		document.getElementById(`input-${campo}`).classList.add('input-correcto');
		document.getElementById(`input-${campo}`).classList.remove('input-error');
		document.getElementById(`error-${campo}`).classList.remove('activo');
		campos[campo] = true;
	// Si el campo está vacio
	} else if (input.value === "") {
		document.getElementById(`input-${campo}`).classList.remove('input-correcto');
		document.getElementById(`input-${campo}`).classList.remove('input-error');
		document.getElementById(`error-${campo}`).classList.remove('activo');
		campos[campo] = false;
	// Si el campo es incorrecto
	} else {
		document.getElementById(`input-${campo}`).classList.add('input-error');
		document.getElementById(`input-${campo}`).classList.remove('input-correcto');
		document.getElementById(`error-${campo}`).classList.add('activo');
		campos[campo] = false;
	}
}

const validarMensaje = () => {
  const mensaje = textarea.value;
  const expresion = expresiones.mensaje;

  if (expresion.test(mensaje)) {
    document.getElementById('input-mensaje').classList.add('input-correcto');
		document.getElementById('input-mensaje').classList.remove('input-error');
		document.getElementById('error-mensaje').classList.remove('activo');
    campos['mensaje'] = true;
  } else if (textarea.value === "") {
    document.getElementById('input-mensaje').classList.remove('input-correcto');
		document.getElementById('input-mensaje').classList.remove('input-error');
		document.getElementById('error-mensaje').classList.remove('activo');
    campos['mensaje'] = false;
  } else {
    document.getElementById('input-mensaje').classList.remove('input-correcto');
		document.getElementById('input-mensaje').classList.add('input-error');
		document.getElementById('error-mensaje').classList.add('activo');
    campos['mensaje'] = false;
  }
}

// Llamar a la funcion "validarFormulario"
// y añadir los Event Listeners a cada input
inputsContacto.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
	input.addEventListener('focus', validarFormulario);
});
// Añadir los Event Listener al textarea
textarea.addEventListener('blur', validarMensaje);
textarea.addEventListener('keyup', validarMensaje);

// Al poner el raton en el boton del formulario
btnContacto.addEventListener('mouseover', () => {
	btnContacto.classList.add('button-hover');
});

// Al quitar el raton del boton del formulario
btnContacto.addEventListener('mouseout', () => {
	btnContacto.classList.remove('button-hover');
});

// Al hacer click en el boton del formulario
// se comprueba que todos los campos sean correctos
btnContacto.addEventListener('click', (e) => {
	if (campos.nombre && campos.apellidos && campos.correo && campos.mensaje) {
		formContacto.reset();

		document.getElementById('error-formulario').classList.remove('activo');
		document.getElementById('error-usuario').classList.remove('activo');
		document.getElementById('exito-formulario').classList.add('activo');
		setTimeout(() => {
			document.getElementById('exito-formulario').classList.remove('activo');
			location.reload();
		}, 3500);

	} else {
		document.getElementById('error-formulario').classList.add('activo');
		setTimeout(() => {
			document.getElementById('error-formulario').classList.remove('activo');
		}, 3500);
	}
});