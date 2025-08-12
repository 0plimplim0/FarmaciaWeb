let categorias = [];
let productos = [];

const contenedor = document.getElementById('contenedor-productos');
const filtrosContainer = document.getElementById('filtros');

fetch('./backend/api/productos_todos.php')
  .then(res => {
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return res.json();
  })
  .then(data => {
    categorias = data.map(cat => cat.categoria);
    productos = data.flatMap(cat =>
      cat.productos.map(p => ({ ...p, categoria: cat.categoria }))
    );

    generarFiltros(categorias);
    mostrarProductos(productos);
  })
  .catch(err => {
    console.error("Error al cargar productos:", err);
    contenedor.innerHTML = `<p style="color:red;">Error al cargar productos.</p>`;
  });

function generarFiltros(categorias) {
  filtrosContainer.innerHTML = '';

  const inputBusqueda = document.createElement('input');
  inputBusqueda.type = 'text';
  inputBusqueda.id = 'buscador';
  inputBusqueda.placeholder = 'Buscar producto...';
  inputBusqueda.style.width = '100%';
  inputBusqueda.style.marginBottom = '20px';
  filtrosContainer.appendChild(inputBusqueda);

  const tituloFiltros = document.createElement('h3');
  tituloFiltros.textContent = 'Filtrar por';
  filtrosContainer.appendChild(tituloFiltros);

  const tituloCat = document.createElement('strong');
  tituloCat.textContent = 'Categoría';
  filtrosContainer.appendChild(tituloCat);

  categorias.forEach(cat => {
    const label = document.createElement('label');
    label.style.display = 'block';
    label.innerHTML = `
      <input type="checkbox" name="categoria" value="${cat}" /> ${capitalize(cat)}
    `;
    filtrosContainer.appendChild(label);
  });

  document.querySelectorAll('input[name="categoria"]').forEach(cb => {
    cb.addEventListener('change', filtrarYMostrar);
  });

  inputBusqueda.addEventListener('input', filtrarYMostrar);
}

function filtrarYMostrar() {
  const buscador = document.getElementById('buscador');
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

  if (lista.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron productos.</p>';
    return;
  }

  lista.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${p.imagen || './assets/img/default.png'}" alt="${p.nombre}">
      <p>${p.nombre}</p>
      <p>$${p.precio}</p>
      <button class="agregar-carrito" data-nombre="${p.nombre}" data-precio="${p.precio}">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

contenedor.addEventListener('click', (e) => {
  if (e.target.classList.contains('agregar-carrito')) {
    const btn = e.target;
    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio);

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existente = carrito.find(p => p.nombre === nombre);

    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarNotificacion(`"${nombre}" se agregó al carrito`);
  }
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}