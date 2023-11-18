const datosForm = document.getElementById("datosForm");
const clientes = [];

datosForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const mail = document.getElementById("mail").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;
  const provincia = document.getElementById("provincia");

  const cliente = {
    nombre: nombre + " " + apellido,
    mail: mail,
    telefono: telefono,
    direccion: direccion + ", " + provincia,
  };

  const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];

  clientesGuardados.push(cliente);

  localStorage.setItem("clientes", JSON.stringify(clientesGuardados));

  console.log(cliente);
  console.log(clientesGuardados);

  datosForm.reset();

  alert(`Datos enviados. \nGracias ${cliente.nombre} ${cliente.apellido}.`);
});
