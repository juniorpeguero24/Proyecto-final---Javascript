let carrito = [];

const finalizar = document.getElementById("finalizar");

// Función para agregar un producto al carrito asincronica
function agregarAlCarrito(nombre, precio, cantidad, img) {
  let producto = {
    nombre: nombre,
    precio: precio,
    cantidad: cantidad,
    img: img,
  };

  try {
    if (cantidad > 0) {
      carrito.push(producto);

      console.log(carrito);

      localStorage.setItem("carrito", JSON.stringify(carrito));

      Swal.fire({
        position: "top-end",
        icon: "success",
        imageUrl: `media/${producto.img}`,
        imageHeight: 100,
        imageAlt: `imagen de ${producto.nombre}`,
        title: `Producto agregado al carrito:
         ${producto.cantidad} - ${producto.nombre} - $${
          producto.cantidad * producto.precio
        } `,
        showConfirmButton: false,
        toast: true,
        timerProgressBar: true,
        timer: 3 * 1000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Recuerde que la cantidad a ingresar tiene que ser mayor o igual a 1",
      });
    }
  } catch (error) {
    console.error("Se ha producido un error:", error);
  } finally {
    actualizarCarrito();
  }
}

// Elimina producto del carrito
function eliminarProducto(index, nombre, cantidad) {
  Swal.fire({
    position: "top-end",
    title: "Producto eliminado",
    text: `Se ha eliminado ${cantidad} - ${nombre} del carrito.`,
    icon: "error",
    toast: true,
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 3 * 1000,
  }).then(() => {
    carrito.splice(index, 1);
    actualizarCarrito();
  });
}

// Función para actualizar la interfaz del carrito y mostrar el total de la compra asincronica
const actualizarCarrito = () => {
  let carritoContainer = document.getElementById("carrito-container");
  carritoContainer.innerHTML = "<h2><strong>Carrito</strong></h2>";
  let productoEnCarrito;

  let totalCompra = 0;
  let subtotalProducto;

  try {
    carrito.forEach(function (producto, index) {
      productoEnCarrito = document.createElement("div");
      productoEnCarrito.innerHTML = `<p><strong>${producto.nombre}</strong> - $${producto.precio} - Cantidad: ${producto.cantidad} <button class="eliminar" onclick="eliminarProducto(${index},'${producto.nombre}', ${producto.cantidad})">(X)</button></p>`;
      carritoContainer.appendChild(productoEnCarrito);

      subtotalProducto = producto.precio * producto.cantidad;
      totalCompra += subtotalProducto;
    });
  } catch (error) {
    console.error("Se ha producido un error:", error);
  } finally {
    carritoContainer.innerHTML += `<p>Total de la compra: $${totalCompra}</p>`;

    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
};

function finalizarCompra() {
  if (carrito.length >= 1) {
    Swal.fire({
      title: "Desea finalizar la compra?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((btnResult) => {
      if (btnResult.isConfirmed) {
        Swal.fire({
          title: "Finalizando la compra",
          text: "Sera redireccionado, se le pediran los datos para completar la compra.",
          icon: "info",
          timerProgressBar: true,
          timer: 5 * 1000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "html/formulario.html";
          carrito = [];
          actualizarCarrito();
        });
      } else {
        Swal.fire({
          title: "Compra cancelada",
          icon: "error",
          text: "Su compra fue cancelada",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 5 * 1000,
        });
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Para finalizar la compra debe tener al menos un producto en el carrito.",
      timerProgressBar: true,
      timer: 3 * 1000,
    });
  }
}

// Funcion que renderiza y muestra los productos en la web asincronica
const iniciaProductos = async () => {
  Swal.fire({
    title: "Tienda Mayorista de ropa",
    text: "Bienvenido a nuestra tienda con los mejores precio del pais.",
    icon: "info",
    showConfirmButton: false,
    timer: 8 * 1000,
    timerProgressBar: true,
  });

  let url = "js/productos.json";
  let productosContainer = document.getElementById("productos-container");

  try {
    let peticion = await fetch(url);
    let productos = await peticion.json();

    productos.forEach((producto) => {
      let productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `<img src="media/${producto.img}" alt="${producto.nombre}" />
                                 <h2><strong>${producto.nombre}</strong></h2>
                                 <p class="precio">Precio: $${producto.precio}</p>
                                 <label for="quantity-${producto.nombre}">Cantidad:</label>
                                 <input type="number" id="quantity-${producto.nombre}" name="quantity" min="1" value="1">
                                 
    `;
      let agregarAlCarritoBtn = document.createElement("button");
      agregarAlCarritoBtn.textContent = "Añadir al carrito";
      agregarAlCarritoBtn.addEventListener("click", () => {
        agregarAlCarrito(
          producto.nombre,
          producto.precio,
          document.getElementById(`quantity-${producto.nombre}`).value,
          producto.img
        );
      });

      productCard.appendChild(agregarAlCarritoBtn);

      productosContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error("Se ha producido un error:", error);
  }
};

iniciaProductos();

finalizar.addEventListener("click", () => {
  finalizarCompra();
});
