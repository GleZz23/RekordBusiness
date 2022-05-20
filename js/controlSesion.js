window.addEventListener('load', () => {
  if (localStorage.length > 0) {
    const estado = localStorage.getItem('Estado');

    if (estado === '1') {
      document.getElementById('online').classList.add('activo');
      document.getElementById('offline').classList.remove('activo');

      const btnCerrarSesion = document.getElementById('btnCerrarSesion');
      const btnCerrarSesionIcon = document.getElementById('btnCerrarSesionIcon');
      const btnVerCuentas = document.getElementById('btnVerCuentas');
      const btnVerCuentasIcon = document.getElementById('btnVerCuentasIcon');
      const btnEliminarCuenta = document.getElementById('btnEliminarCuenta');
      const btnEliminarCuentaIcon = document.getElementById('btnEliminarCuentaIcon');
1
      btnCerrarSesion.addEventListener('click', cerrarSesion);
      btnCerrarSesionIcon.addEventListener('click', cerrarSesion);
      btnVerCuentas.addEventListener('click', verCuentas);
      btnVerCuentasIcon.addEventListener('click', verCuentas);
      btnEliminarCuenta.addEventListener('click', eliminarCuenta);
      btnEliminarCuentaIcon.addEventListener('click', eliminarCuenta);
    } else {
      document.getElementById('offline').classList.add('activo');
      document.getElementById('online').classList.remove('activo');
    }
  } else {
    document.getElementById('offline').classList.add('activo');
    document.getElementById('online').classList.remove('activo');
  }
});

const cerrarSesion = () => {
  localStorage.removeItem('Estado');
	localStorage.setItem('Estado', 0);
  document.getElementById('offline').classList.add('activo');
  document.getElementById('online').classList.remove('activo');
}

const verCuentas = () => {
  const ventanaNueva = window.open("", "Lista de registros");
  const parrafo = ventanaNueva.document.createElement("p");
  parrafo.innerText = 'Usuarios registrados:';
  ventanaNueva.document.body.appendChild(parrafo);
  for (i = 1; i <= localStorage.length; i++) {
    let persoString = localStorage.getItem(i);
    const objPersona = JSON.parse(persoString);
    const parrafo = ventanaNueva.document.createElement("p");
    if (i < localStorage.length) {
      parrafo.innerText = '{"Nombre":"'  + objPersona.nombre + '", "Apellidos":"'  + objPersona.apellidos + '", "Email":"'  + objPersona.correo + '", "Teléfono":"'  + objPersona.telefono + '", "Fecha de nacimiento":"'  + objPersona.fecha + '", "Contraseña":"'  + objPersona.password + '"}';
    } else {
      parrafo.innerText = '{"Nombre":"'  + objPersona.nombre + '", "Apellidos":"'  + objPersona.apellidos + '", "Email":"'  + objPersona.correo + '", "Teléfono":"'  + objPersona.telefono + '", "Fecha de nacimiento":"'  + objPersona.fecha + '", "Contraseña":"'  + objPersona.password + '"}';
    }
    ventanaNueva.document.body.appendChild(parrafo);
  }
  const parrafo2 = ventanaNueva.document.createElement("p");
  parrafo2.innerText = ']}' ;
  ventanaNueva.document.body.appendChild(parrafo2);
}

const eliminarCuenta = () => {
  localStorage.clear();
  location.reload();
}