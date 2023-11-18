let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio, cantidad) {
  let producto = { nombre: nombre, precio: precio, cantidad: cantidad };

  carrito.push(producto);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert(`Producto agregado al carrito:
         ${producto.cantidad} - ${producto.nombre} - $${
    producto.cantidad * producto.precio
  } `);

  actualizarCarrito();
}

// Elimina producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Función para actualizar la interfaz del carrito y mostrar el total de la compra
function actualizarCarrito() {
  let carritoContainer = document.getElementById("carrito-container");
  carritoContainer.innerHTML = "<h2><strong>Carrito</strong></h2>";

  let totalCompra = 0;

  carrito.forEach(function (producto, index) {
    let productoEnCarrito = document.createElement("div");
    productoEnCarrito.innerHTML = `<p><strong>${producto.nombre}</strong> - $${producto.precio} - Cantidad: ${producto.cantidad} <button class="eliminar" onclick="eliminarProducto(${index})">(X)</button></p>`;
    carritoContainer.appendChild(productoEnCarrito);

    let subtotalProducto = producto.precio * producto.cantidad;
    totalCompra += subtotalProducto;
  });

  carritoContainer.innerHTML += `<p>Total de la compra: $${totalCompra}</p>`;

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function finalizarCompra() {
  alert("Finalizando la compra!");
  window.location.href = "../html/formulario.html";
  carrito = [];
  actualizarCarrito();
}

// Funcion que renderiza y muestra los productos en la web
function iniciaProductos() {
  const productos = [
    { id: 1, nombre: "Remera", precio: 10000, img: "remera.webp" },
    { id: 2, nombre: "Pantalon", precio: 15000, img: "jean.png" },
    { id: 3, nombre: "Zapatilla", precio: 20000, img: "zapatilla.png" },
    { id: 4, nombre: "Buzo", precio: 25000, img: "buzo.png" },
  ];

  let productosContainer = document.getElementById("productos-container");

  productos.forEach((producto) => {
    let productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `<img src="../media/${producto.img}" alt="${producto.nombre} />
    <div><h2><strong>${producto.nombre}</strong></h2>
                            <p class="precio">$${producto.precio}</p>
                            <label for="quantity-${producto.nombre}">Cantidad:</label>
                            <input type="number" id="quantity-${producto.nombre}" name="quantity" min="1" value="1">
                            <button onclick="agregarAlCarrito(\'${producto.nombre}\', ${producto.precio}, document.getElementById(\'quantity-${producto.nombre}\').value)">Agregar al carrito</button></div>                        
    `;

    productosContainer.appendChild(productCard);
  });
}

iniciaProductos();
