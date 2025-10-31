import type { CartProduct } from "../../../types/IProduct";
import { createOrder } from "../../../utils/createOrder";

const API = 'http://localhost:8081/api';
const cart = JSON.parse(localStorage.getItem('cart') || '[]');

export const renderCart = () => {
    const cartContainer = document.getElementById('content');
    cartContainer!.innerHTML = '';

    if (cart.length === 0) {
        cartContainer!.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

    cart.detalles.forEach((item: CartProduct) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'cart';
        productDiv.innerHTML = `
            <h2 style="margin: 1rem 0 1rem;">${item.nombre}</h2>
            <p><strong>Cantidad:</strong> ${item.cantidad}</p>
            <p><strong>Precio:</strong> $${item.precio}</p>
            <p><strong>Subtotal:</strong> $${item.precio * item.cantidad}</p>
        `;
        cartContainer!.appendChild(productDiv);
    });
    const total = cart.detalles.reduce((acc: number, item: CartProduct) => acc + item.precio * item.cantidad, 0);
    const spanTotal = document.getElementById('spanTotal');
    spanTotal!.innerText = `$${total}`;
};

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

document.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;

    if (target && target.id === 'continue-shopping') {
        window.location.href = '/src/pages/store/home/home.html';
    }else if (target && target.id === 'checkoutButton') {
        await createOrder();
        localStorage.removeItem('cart')
        window.location.href = '/src/pages/store/home/home.html';
    }
});