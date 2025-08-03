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
            mostrarNotificacion(`"${nombre}" se agregó al carrito`);
        });
    });
}

function insertarEnCarrusel(productos, selector) {
    const carrusel = document.querySelector(selector);
    carrusel.innerHTML = "";

    productos.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <p>${p.nombre}</p>
            <p>$${p.precio}</p>
            <button class="agregar-carrito" data-nombre="${p.nombre}" data-precio="${p.precio}">Agregar al carrito</button>
        `;
        carrusel.appendChild(div);
    });

    activarBotones();
}

fetch('./productos.json')
    .then(res => res.json())
    .then(productos => {
        const masComprados = productos.filter(p => p.destacados?.includes("mas_comprados"));
        const suplementos = productos.filter(p => p.destacados?.includes("suplementos"));
        const cuidado = productos.filter(p => p.destacados?.includes("cuidado_personal"));

        insertarEnCarrusel(masComprados, ".mas_comprados");
        insertarEnCarrusel(suplementos, ".suplementos");
        insertarEnCarrusel(cuidado, ".cuidado_personal");
});

// Carruseles
document.querySelectorAll('.carrusel-container').forEach(container => {
    const carrusel = container.querySelector('.carrusel');
    const btnIzq = container.querySelector('.flecha.izq');
    const btnDer = container.querySelector('.flecha.der');

    btnIzq?.addEventListener('click', () => {
        carrusel.scrollBy({ left: -200, behavior: 'smooth' });
    });

    btnDer?.addEventListener('click', () => {
        carrusel.scrollBy({ left: 200, behavior: 'smooth' });
    });
});

// Menú hamburguesa
const btnHamburguesa = document.querySelector('.hamburguesa');
const navLinks = document.querySelector('.nav_links');

btnHamburguesa.addEventListener('click', () => {
    navLinks.classList.toggle('mostrar');
});

const botonesAgregar = document.querySelectorAll('.agregar-carrito');
botonesAgregar.forEach(btn => {
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

        //MOSTRAR NOTIFICACIÓN
        mostrarNotificacion(`"${nombre}" se agregó al carrito`);
    });
});

//FUNCIÓN GLOBAL DE NOTIFICACIÓN
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