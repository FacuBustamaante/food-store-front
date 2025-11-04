import type { IOrder } from '../../../types/IOrders';

const API = import.meta.env.VITE_API_URL;

// Fetch de órdenes del usuario
const getOrders = async (): Promise<IOrder[]> => {
    const userData = localStorage.getItem('userData');
    if (!userData) return [];

    const id = JSON.parse(userData).id;
    console.log(id)

    try {
        const response = await fetch(`${API}/pedidos/usuario/${id}`);

        if (!response.ok) {
            throw new Error('Error al obtener las órdenes');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
        return [];
    }
};

const ordersContainer = document.getElementById('ordersSection');

getOrders().then((orders) => {
    if (!ordersContainer) return;

    orders.forEach((order: IOrder) => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';

        orderCard.innerHTML = `
            <div>
                <h3 class="order-id">Orden #${order.id}</h3>
                <div class="divisor"></div>
                <p class="order-date"><strong>Fecha:</strong> ${new Date(order.fecha).toLocaleDateString()}</p>
                <p class="order-total"><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                <p class="order-status"><strong>Estado:</strong> ${order.estado}</p>
            </div>
            <div class="divisor"></div>
            <div>
                <p class="order-details">Detalles:</p>
                <div class="detalles">
                    ${order.detalles.map(item => {
                    return `<p class="detalle-item"><strong>Producto ID:</strong> ${item.productoId}</br> <strong>Nombre:</strong> ${item.nombreProducto}</br> <strong>Cantidad:</strong> ${item.cantidad}</br> <strong>Precio Unitario:</strong> $${item.precioUnitario.toFixed(2)}</br> <strong>Subtotal:</strong> $${item.subtotal.toFixed(2)}</p><br/>`;
                    }).join('')}
                </div>
            </div>
        `;

        ordersContainer.appendChild(orderCard);
    });
});