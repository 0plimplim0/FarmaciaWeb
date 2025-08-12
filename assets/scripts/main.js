// Menú hamburguesa :3
const btnHamburguesa = document.querySelector('.hamburguesa');
const navLinks = document.querySelector('.nav_links');

btnHamburguesa.addEventListener('click', () => {
    navLinks.classList.toggle('mostrar');
});

function mostrarNotificacion(texto) {
    const noti = document.getElementById('notificacion');
    noti.textContent = texto;
    noti.style.display = 'block';
    setTimeout(() => {
        noti.classList.add('mostrar');
    }, 10);

    setTimeout(() => {
        noti.classList.remove('mostrar');
        setTimeout(() => {
            noti.style.display = 'none';
        }, 300);
    }, 2000);
}
