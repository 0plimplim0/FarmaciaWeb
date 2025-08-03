const btnHamburguesa = document.querySelector('.hamburguesa');
const navLinks = document.querySelector('.nav_links');

btnHamburguesa.addEventListener('click', () => {
  navLinks.classList.toggle('mostrar');
});

let productos = [];

fetch('./productos.json')
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarProductos(productos);
});

const contenedor = document.getElementById('contenedor-productos');
const buscador = document.getElementById('buscador');

document.querySelectorAll('input[name="categoria"]').forEach(cb => {
  cb.addEventListener('change', filtrarYMostrar);
});
buscador.addEventListener('input', filtrarYMostrar);

function filtrarYMostrar() {
  const seleccionadas = [...document.querySelectorAll('input[name="categoria"]:checked')].map(cb => cb.value);
  const texto = buscador.value.toLowerCase();
  const filtrados = productos.filter(p => {
    const coincideCategoria = seleccionadas.length === 0 || seleccionadas.includes(p.categoria);
    const coincideBusqueda = p.nombre.toLowerCase().includes(texto);
    return coincideCategoria && coincideBusqueda;
  });
  mostrarProductos(filtrados);
}

function mostrarProductos(lista) {
  contenedor.innerHTML = '';
  lista.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <p>${p.nombre}</p>
      <p>$${p.precio}</p>
      <button class="agregar-carrito" data-nombre="${p.nombre}" data-precio="${p.precio}">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
  activarBotones();
}

function activarBotones() {
  document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', () => {
      const nombre = btn.dataset.nombre;
      const precio = parseInt(btn.dataset.precio);
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const existente = carrito.find(p => p.nombre === nombre);
      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({ nombre, precio, cantidad: 1 });
      }
      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarNotificacion(`\"${nombre}\" se agregó al carrito`);
    });
  });
}

function mostrarNotificacion(texto) {
  const noti = document.getElementById('notificacion');
  noti.textContent = texto;
  noti.classList.add('mostrar');
  setTimeout(() => {
    noti.classList.remove('mostrar');
    setTimeout(() => noti.style.display = 'none', 300);
  }, 2000);
  noti.style.display = 'block';
}

mostrarProductos(productos);