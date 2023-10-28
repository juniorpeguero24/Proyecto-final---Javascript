// Declaración de variables y constantes
const productos = [
  { id: 1, nombre: "Remera", precio: 10000 },
  { id: 2, nombre: "Pantalon", precio: 15000 },
  { id: 3, nombre: "Zapatilla", precio: 20000 },
  { id: 4, nombre: "Buzo", precio: 25000 },
];

let carrito = [];
let totalCompra = 0;

// Función para mostrar productos disponibles
function mostrarProductos() {
  alert("Productos disponibles:");
  productos.forEach((producto) =>
    alert(
      "ID: " +
        producto.id +
        " Nombre: " +
        producto.nombre +
        " Precio: $" +
        producto.precio
    )
  );
}

// Función para agregar productos al carrito
function agregarAlCarrito() {
  let productoId = parseInt(
    prompt("Ingresa el ID del producto que deseas agregar al carrito:")
  );
  const productoSeleccionado = productos.find(
    (producto) => producto.id === productoId
  );

  if (productoSeleccionado) {
    const cantidad = parseInt(
      prompt(
        "¿Cuánt@s " +
          productoSeleccionado.nombre +
          " deseas agregar al carrito?"
      )
    );

    if (cantidad > 0) {
      carrito.push({ ...productoSeleccionado, cantidad });
      totalCompra += productoSeleccionado.precio * cantidad;
      alert(
        "Se agregaron " +
          cantidad +
          " " +
          productoSeleccionado.nombre +
          " al carrito."
      );
    } else {
      alert("Cantidad no válida. Introduce un número mayor que cero.");
    }
  } else {
    alert("Producto no encontrado. Introduce un ID válido.");
    mostrarProductos();
  }
}

// Función para mostrar el carrito de compras y el total
function verCarrito() {
  alert("Carrito de compras:");
  carrito.forEach((producto) => {
    alert(
      producto.nombre +
        " x" +
        producto.cantidad +
        " - $" +
        producto.precio +
        "*" +
        producto.cantidad
    );
  });
  alert("Total: $" + totalCompra);
}

// Función principal
function comprarProductos() {
  mostrarProductos();
  while (true) {
    let opcion = prompt(
      "¿Qué deseas hacer? (1: Agregar al carrito, 2: Ver carrito, 3: Finalizar compra, 4: Salir)"
    );

    switch (opcion) {
      case "1":
        agregarAlCarrito();
        break;
      case "2":
        verCarrito();
        break;
      case "3":
        alert("Compra realizada. Total: $" + totalCompra);
        return;
      case "4":
        alert("Gracias por visitar nuestra tienda.");
        return;
      default:
        alert("Opción no válida. Por favor, selecciona una opción válida.");
    }
  }
}

// Iniciar el proceso de compra
comprarProductos();
