// Formulario de registro
const formInicioSesion = document.getElementById('login-form');
// Inputs del formulario
const inputsInicioSesion = document.querySelectorAll('#login-form input');
// Boton de registro
const btnInicioSesion = document.getElementById('iniciar-sesion');

// Expresiones regulares de cada campo del formulario
const expresiones = {
	correo: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
	password: /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ](?=.*[!,@,#,$,%,^,&,*,?,_,~,-]){8,}/,
}

// Campos del formulario
const campos = {
	correo: false,
	password: false
}

const sesion = {
	correo: document.getElementById('correo'),
	password: document.getElementById('password'),
}

// Llamar a la funcion "validarCampo" pasando los parametros de cada input
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "correo":
			inputFocus(e, 'correo');
			validarCampo(expresiones.correo, e.target, 'correo');
			break;
		case "password":
			inputFocus(e, 'password');
			validarCampo(expresiones.password, e.target, 'password');
			break;
	}
}

// Cambiar estilo del input dependiendo de si se le hace foco o si lo pierde
const inputFocus = (evento, campo) => {
	if (evento.type === 'focus') {
		document.getElementById(`input-${campo}`).classList.add('input-focus');
	} else if (evento.type === 'blur') {
		document.getElementById(`input-${campo}`).classList.remove('input-focus');
	}
}

// Cambiar estilo de cada campo dependiendo de si es correcto o no
const validarCampo = (expresion, input, campo) => {
	// Si el campo es correcto
	if (expresion.test(input.value)) {
		document.getElementById(`input-${campo}`).classList.remove('input-error');
		document.getElementById(`error-${campo}`).classList.remove('activo');
		campos[campo] = true;
		// Si el campo está vacio
	} else if (input.value === "") {
		document.getElementById(`input-${campo}`).classList.remove('input-error');
		document.getElementById(`error-${campo}`).classList.remove('activo');
		campos[campo] = false;
		// Si el campo es incorrecto
	} else {
		document.getElementById(`input-${campo}`).classList.add('input-error');
		document.getElementById(`error-${campo}`).classList.add('activo');
		campos[campo] = false;
	}
}

// Llamar a la funcion "validarFormulario"
// y añadir los Event Listeners a cada input
inputsInicioSesion.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
	input.addEventListener('focus', validarFormulario);
});

// Al poner el raton en el boton del formulario
btnInicioSesion.addEventListener('mouseover', () => {
	btnInicioSesion.classList.add('button-hover');
});

// Al quitar el raton del boton del formulario
btnInicioSesion.addEventListener('mouseout', () => {
	btnInicioSesion.classList.remove('button-hover');
});

// Al hacer click en el boton del formulario
// se comprueba que todos los campos sean correctos
btnInicioSesion.addEventListener('click', (e) => {
	e.preventDefault();

	// Guardo los valores de los inputs del formulario en variables
	const correo = sesion.correo.value;
	const password = sesion.password.value;

	let correols2;
	let passwordls2;

	const limite = localStorage.length;
	const estado = localStorage.getItem('estado');
	
	if (campos.correo && campos.password) {
		for (let i = 0; i < limite; i++) {
			const item = localStorage.getItem(i);
			if (item !== estado) {
				const datosUsuario = JSON.parse(item);

				const correols1 = datosUsuario.correo
				const passwordls1 = datosUsuario.password

				if (correols1 === correo && passwordls1 === password) {
					correols2 = datosUsuario.correo;
					passwordls2 = datosUsuario.password;
				}
			}
		}
	}
	
	if (correols2 === correo && passwordls2 === password && campos.correo && campos.password) {
		document.getElementById('error-formulario').classList.remove('activo');
		formInicioSesion.reset();
		localStorage.removeItem('Estado');
		localStorage.setItem('Estado', 1);
		setTimeout(() => {
			window.location.replace('index.html');
		}, 1000);
	} else {
		document.getElementById('error-formulario').classList.add('activo');
		setTimeout(() => {
			document.getElementById('error-formulario').classList.remove('activo');
		}, 3000);
	}

});
