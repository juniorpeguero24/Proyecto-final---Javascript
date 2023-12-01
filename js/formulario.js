document.addEventListener("DOMContentLoaded", function () {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  console.log(carrito);
  mostrarCarritoEnFormulario(carrito);
});

function mostrarCarritoEnFormulario(carrito) {
  const carritoFormularioContainer = document.getElementById(
    "carrito-formulario-container"
  );
  carritoFormularioContainer.innerHTML = "<h2>Carrito</h2>";
  let totalCompra = 0;
  try {
    carrito.forEach(function (producto) {
      const subtotalProducto = producto.precio * producto.cantidad;
      totalCompra += subtotalProducto;

      const productoEnCarrito = document.createElement("div");
      productoEnCarrito.innerHTML = `<p><strong>${producto.nombre}</strong> - Cantidad: ${producto.cantidad} - $${producto.precio} </p>`;
      carritoFormularioContainer.appendChild(productoEnCarrito);
    });
  } catch (error) {
    console.error("Ha ocurrido un error:", error);
  } finally {
    carritoFormularioContainer.innerHTML += `<p>Total de la compra: $${totalCompra}</p>`;
  }
}

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

  Swal.fire({
    title: "Datos enviados!",
    text: `Gracias por tu compra ${nombre} ${apellido} \nNos estaremos comunicando mediante tu mail: ${mail}`,
    icon: "question",
    timer: 8 * 1000,
    timerProgressBar: true,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = "../index.html";
  });
});
