const carritoKey = 'carrito';
const contenedor = document.getElementById('contenedor-carrito');

function cargarCarrito() {
    const datos = JSON.parse(localStorage.getItem(carritoKey)) || [];
    contenedor.innerHTML = '';
    datos.forEach(p => agregarProductoAlDOM(p));
    actualizarTotal();
}

function guardarCarrito() {
    const productos = [];
    document.querySelectorAll('.producto').forEach(p => {
    const nombre = p.querySelector('.producto-info p strong').textContent;
    const precio = parseInt(p.getAttribute('data-precio'));
    const cantidad = parseInt(p.querySelector('.cantidad').textContent);
    productos.push({ nombre, precio, cantidad });
    });
    localStorage.setItem(carritoKey, JSON.stringify(productos));
}

function agregarProductoAlDOM({ nombre, precio, cantidad }) {
    const div = document.createElement('div');
    div.className = 'producto';
    div.setAttribute('data-precio', precio);
    div.innerHTML = `
    <img src="./img/medicina.png" alt="Producto">
    <div class="producto-info">
        <p><strong>${nombre}</strong></p>
        <p>$${precio}</p>
    </div>
    <div class="acciones">
        <button onclick="cambiarCantidad(this, -1)">-</button>
        <span class="cantidad">${cantidad}</span>
        <button onclick="cambiarCantidad(this, 1)">+</button>
        <button onclick="eliminarProducto(this)">Eliminar</button>
    </div>
    `;
    contenedor.appendChild(div);
}

function cambiarCantidad(btn, cambio) {
    const cantidadSpan = btn.parentElement.querySelector('.cantidad');
    let cantidad = parseInt(cantidadSpan.textContent);
    cantidad = Math.max(1, cantidad + cambio);
    cantidadSpan.textContent = cantidad;
    actualizarTotal();
    guardarCarrito();
}

function eliminarProducto(btn) {
    const producto = btn.closest('.producto');
    producto.remove();
    actualizarTotal();
    guardarCarrito();
}

function actualizarTotal() {
  const productos = document.querySelectorAll('.producto');
  let total = 0;
  productos.forEach(p => {
    const precio = parseInt(p.getAttribute('data-precio'));
    const cantidad = parseInt(p.querySelector('.cantidad').textContent);
    total += precio * cantidad;
  });
  document.querySelector('.total').textContent = `Total estimado: $${total}`;
  
  // Mostrar u ocultar mensaje vacío
  const mensaje = document.getElementById('mensaje-vacio');
  mensaje.style.display = productos.length === 0 ? 'block' : 'none';
}

document.getElementById('btnCotizar').addEventListener('click', function (e) {
    e.preventDefault();

    const productos = document.querySelectorAll('.producto');
    if (productos.length === 0) return alert("Tu carrito está vacío.");

    let mensaje = "Hola, quiero cotizar los productos de mi carrito:%0A";
    let total = 0;

    productos.forEach(p => {
    const nombre = p.querySelector('.producto-info p strong').textContent;
    const precio = parseInt(p.getAttribute('data-precio'));
    const cantidad = parseInt(p.querySelector('.cantidad').textContent);
    total += precio * cantidad;
    mensaje += `- ${cantidad}x ${nombre} ($${precio})%0A`;
    });

    mensaje += `%0ATotal estimado: $${total}`;
    const numero = "5211122334455";
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, '_blank');
});

// Cargar productos al abrir la página
window.addEventListener('DOMContentLoaded', cargarCarrito);