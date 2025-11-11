import type { CartProduct } from "../../../types/IProduct";
import { createOrder } from "../../../utils/createOrder";
import { eliminarProductoDelCarrito } from "../../../utils/cart";

const cart = JSON.parse(localStorage.getItem('cart') || '[]');

export const renderCart = () => {
    const cartContainer = document.getElementById('content');
    cartContainer!.innerHTML = '';

    if (!cart.detalles || cart.detalles.length === 0) {
        cartContainer!.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

    cart.detalles.forEach((item: CartProduct) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'cart';
        productDiv.innerHTML = `
            <p data-id="${item.id}" class="eliminar-prod">⨯</p>
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
    } else if (target && target.id === 'checkoutButton') {
        if(!cart || !cart.detalles || cart.detalles.length === 0) {
            handleErrorModal();
            return;
        }
        handleModal();
        await createOrder();
        localStorage.removeItem('cart')
    }
});

const handleModal = () => {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.display = 'none';
            window.location.href = '/src/pages/store/home/home.html';
        }, 3000);
    }
}

const handleErrorModal = () => {
    const modal = document.getElementById('errorModal');
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.display = 'none';
            window.location.href = '/src/pages/store/home/home.html';
        }, 3000);
    }
}

document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('eliminar-prod')) {
        const productId = Number(target.getAttribute('data-id'));
        eliminarProductoDelCarrito(productId);
        location.reload();
    }
});
