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

document.addEventListener("DOMContentLoaded", () => {
    fetch('backend/api/productos_destacados.php')
        .then(res => res.json())
        .then(data => {
            const contenedor = document.getElementById("carruseles");

            data.forEach(categoriaData => {
                // Crear contenedor de categoría
                const divCategoria = document.createElement("section");
                divCategoria.classList.add("categoria");

                // Título de categoría
                const h2 = document.createElement("h2");
                h2.textContent = categoriaData.categoria;
                divCategoria.appendChild(h2);

                // Contenedor de carrusel con flechas
                const divCarruselContainer = document.createElement("div");
                divCarruselContainer.classList.add("carrusel-container");

                // Botones de flecha
                const btnIzq = document.createElement("button");
                btnIzq.classList.add("flecha", "izq");
                btnIzq.innerHTML = "&#10094;";

                const btnDer = document.createElement("button");
                btnDer.classList.add("flecha", "der");
                btnDer.innerHTML = "&#10095;";

                // Carrusel donde van los productos
                const divCarrusel = document.createElement("div");
                divCarrusel.classList.add("carrusel");

                // Agregar productos
                categoriaData.productos.forEach(prod => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
                        <img src="${prod.imagen || './assets/img/default.png'}" alt="${prod.nombre}">
                        <p>${prod.nombre}</p>
                        <p>$${prod.precio}</p>
                        <button class="agregar-carrito" data-nombre="${prod.nombre}" data-precio="${prod.precio}">Agregar al carrito</button>
                    `;
                    divCarrusel.appendChild(card);
                });

                // Añadir flechas y carrusel al contenedor
                divCarruselContainer.appendChild(btnIzq);
                divCarruselContainer.appendChild(divCarrusel);
                divCarruselContainer.appendChild(btnDer);

                // Añadir contenedor de carrusel a la categoría
                divCategoria.appendChild(divCarruselContainer);

                // Añadir categoría al contenedor principal
                contenedor.appendChild(divCategoria);

                // Eventos de scroll para las flechas
                btnIzq.addEventListener('click', () => {
                    divCarrusel.scrollBy({ left: -200, behavior: 'smooth' });
                });
                btnDer.addEventListener('click', () => {
                    divCarrusel.scrollBy({ left: 200, behavior: 'smooth' });
                });
            });

            // Activar botones "Agregar al carrito"
            activarBotones();
        })
        .catch(err => console.error("Error al cargar productos:", err));
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