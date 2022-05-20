// Formulario de registro
const formRegistro = document.getElementById('register-form');
// Inputs del formulario
const inputsRegistro = document.querySelectorAll('#register-form input');
// Boton de registro
const btnRegitro = document.getElementById('registrarse');

// Expresiones regulares para cada campo del formulario
const expresiones = {
	nombre: /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/,
	apellidos: /^([A-ZÁÉÍÓÚ a-zñáéíóú]{1,})+$/,
	correo: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
	telefono: /^[679]{1}[0-9]{8}/,
	password: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
}

// Campos del formulario
const campos = {
	nombre: false,
	apellidos: false,
	correo: false,
	telefono: false,
	fecha: false,
	password: false
}

// Inputs del formulario por separado
const sesion = {
	nombre: document.getElementById('nombre'),
	apellidos: document.getElementById('apellidos'),
	correo: document.getElementById('correo'),
	telefono: document.getElementById('telefono'),
	fecha: document.getElementById('fecha'),
	password: document.getElementById('password')
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
		case "telefono":
			inputFocus(e, 'telefono');
			validarCampo(expresiones.telefono, e.target, 'telefono');
			break;
		case "fecha":
			inputFocus(e, 'fecha');
			calcularEdad();
			break;
		case "password":
			inputFocus(e, 'password');
			validarCampo(expresiones.password, e.target, 'password');
			break;
		case "password2":
			inputFocus(e, 'password2');
			confirmarPassword();
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

// Comprobar que las dos contraseñas coincidan
// Cambiar estilo del campo dependiendo si es correcto o no
const confirmarPassword = () => {
	// Guardar el valor de cada input en variables
	var password1 = document.getElementById('password').value;
	var password2 = document.getElementById('password2').value;
	// Si las contraseñas no coinciden
	if (password1 != password2) {
		document.getElementById('input-password2').classList.add('input-error');
		document.getElementById('input-password2').classList.remove('input-correcto');
		document.getElementById('error-password2').classList.add('activo');
		campos['password'] = false;
	} else if (password2 === "") {
		document.getElementById('input-password2').classList.remove('input-correcto');
		document.getElementById('input-password2').classList.remove('input-error');
		document.getElementById('error-password2').classList.remove('activo');
		campos['password'] = false;
	// Si las contraseñas coinciden
	} else {
		document.getElementById('input-password2').classList.add('input-correcto');
		document.getElementById('input-password2').classList.remove('input-error');
		document.getElementById('error-password2').classList.remove('activo');
		campos['password'] = true;
	}
}

// Comprobar que el usuario es mayor de edad
// comparando la fecha actual con su fecha de nacimiento
const calcularEdad = () => {
	// Guardar la fecha actual
	const fechaActual = new Date();
	// Separar la fecha actual en año, mes y dia
	const anoActual = parseInt(fechaActual.getFullYear());
	const mesActual = parseInt(fechaActual.getMonth()) + 1;
	const diaActual = parseInt(fechaActual.getDay());
	
	// Guardar la fecha introducida en el formulario
	const fechaNacimiento = document.getElementById('fecha').value;
	// Separar la fecha en año, mes y dia
	const anoNacimiento = parseInt(String(fechaNacimiento).substring(0, 4));
  const mesNacimiento = parseInt(String(fechaNacimiento).substring(5, 7));
  const diaNacimiento = parseInt(String(fechaNacimiento).substring(8, 10));

	// Comprobar que la diferencia del año actual con el introducisa es 18 o mas
	let edad = anoActual - anoNacimiento;
	if (mesActual < mesNacimiento) {
		edad--;
	} else if (mesActual === mesNacimiento) {
		if (diaActual < diaNacimiento) {
			edad--;
		}
	}

	if (edad < 18) {
		document.getElementById('input-fecha').classList.add('input-error');
		document.getElementById('input-fecha').classList.remove('input-correcto');
		document.getElementById('error-fecha').classList.add('activo');
		campos['fecha'] = false;
	} else if (fechaNacimiento === "") {
		document.getElementById('input-fecha').classList.remove('input-error');
		document.getElementById('input-fecha').classList.remove('input-correcto');
		document.getElementById('error-fecha').classList.remove('activo');
		campos['fecha'] = false;
	} else {
		document.getElementById('input-fecha').classList.remove('input-incorrecto');
		document.getElementById('input-fecha').classList.add('input-correcto');
		document.getElementById('error-fecha').classList.remove('activo');
		campos['fecha'] = true;
	}
}

// Llamar a la funcion "validarFormulario"
// y añadir los Event Listeners a cada input
inputsRegistro.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
	input.addEventListener('focus', validarFormulario);
});

// Al poner el raton en el boton del formulario
btnRegitro.addEventListener('mouseover',  () => {
	btnRegitro.classList.add('button-hover');
});

// Al quitar el raton del boton del formulario
btnRegitro.addEventListener('mouseout',  () => {
	btnRegitro.classList.remove('button-hover');
});

// Al hacer click en el boton del formulario
// se comprueba que todos los campos sean correctos
btnRegitro.addEventListener('click', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if (campos.nombre && campos.apellidos && campos.correo && campos.telefono && campos.fecha && campos.password && terminos.checked) {
		
		datosUsuario = {
			'nombre': sesion.nombre.value,
			'apellidos': sesion.apellidos.value,
			'correo': sesion.correo.value,
			'telefono': sesion.telefono.value,
			'fecha': sesion.fecha.value,
			'password': sesion.password.value,
		}

		const usuarioString = JSON.stringify(datosUsuario);
		localStorage.removeItem('Estado');
		localStorage.setItem(localStorage.length + 1, usuarioString);
		const numeroRegistros = localStorage.length;
		localStorage.setItem('Estado', 0);

		formRegistro.reset();
		document.getElementById('error-formulario').classList.remove('activo');
		document.getElementById('exito-formulario').classList.add('activo');

		const numeroRegistrosTexto = document.getElementById('numero-registros');
		numeroRegistrosTexto.innerText = numeroRegistros;

		setTimeout(() => {
			window.location.replace('login.html');
		}, 3500);
	} else {
		document.getElementById('error-formulario').classList.add('activo');
		setTimeout(() => {
			document.getElementById('error-formulario').classList.remove('activo');
		}, 3500);
	}
});
