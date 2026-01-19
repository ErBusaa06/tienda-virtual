// Variables.
let cart = [];      // Array que guarda los productos en el carrito.
let total = 0;      // Total acumulado del carrito.

// Elementos del DOM.
const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar");

//Catálogo de productos.
const productos = [
  { nombre: "Camiseta Fútbol Hombre", precio: 25 },
  { nombre: "Camiseta Fútbol Mujer", precio: 25 },
  { nombre: "Balón Fútbol", precio: 35 },
  { nombre: "Botas Fútbol", precio: 60 },
  { nombre: "Balón Baloncesto", precio: 40 },
  { nombre: "Zapatillas Baloncesto", precio: 75 },
  { nombre: "Raqueta Tenis", precio: 90 },
  { nombre: "Pelotas Tenis x3", precio: 12 },
  { nombre: "Pala Padel", precio: 85 },
  { nombre: "Pelotas Padel x3", precio: 9 },
  { nombre: "Casco Ciclismo", precio: 50 },
  { nombre: "Maillot Ciclismo Hombre", precio: 40 },
  { nombre: "Bañador Natación Hombre", precio: 25 },
  { nombre: "Bañador Natación Mujer", precio: 30 },
  { nombre: "Zapatillas Atletismo", precio: 65 }
];

//Funciones.

// Mostrar productos en la página.
function mostrarProductos() {
  listaProductos.innerHTML = ""; //Limpiar el contenedor.

  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = "<h3>" + producto.nombre + "</h3>" +
                    "<p>" + producto.precio + " €</p>" +
                    "<button>Agregar</button>";

    // Evento para agregar el producto al carrito.
    div.getElementsByTagName("button")[0].onclick = function(nombre, precio) {
      return function() {
        addToCart(nombre, precio);
      };
    }(producto.nombre, producto.precio);

    listaProductos.appendChild(div);
  }
}

// Agregar el producto al carrito.
function addToCart(nombre, precio) {
  if (total + precio > 100) {  // Limitar el total a 100 €.
    alert("¡No puedes agregar productos si el total supera $100!");
    return;
  }

  cart.push({ nombre: nombre, precio: precio }); // Agregar al array.
  total += precio;                               // Sumar al total.
  actualizarCarrito();                           // Actualizar el carrito.
}

// Actualizar carrito y total en pantalla.
function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const li = document.createElement("li");
    li.textContent = item.nombre + " - " + item.precio + " €";

    // Evento para quitar producto al hacer clic.
    li.onclick = (function(index) {
      return function() {
        total -= cart[index].precio;  // Restar precio del total.
        cart.splice(index, 1);        // Eliminar producto del array.
        actualizarCarrito();          // Actualizar la lista y el total.
      };
    })(i);

    listaCarrito.appendChild(li);
  }

  totalElemento.textContent = "Total: " + total + " €";
}

// Vaciar el carrito.
function clearCart() {
  if (cart.length === 0) {
    alert("El carrito ya está vacío.");
    return;
  }

  cart = [];
  total = 0;
  actualizarCarrito();
}

//Eventos.
btnVaciar.onclick = clearCart;

//Inicializar.
mostrarProductos();
