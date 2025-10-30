import type { IOrder } from "../../../../types/IOrders";

const api = "http://localhost:8081/api";

export const obtenerPedido = async (id: string): Promise<IOrder | null> => {
    try {
        const response = await fetch(`${api}/pedidos/${id}`);
        if (!response.ok) {
            throw new Error("Error al obtener el pedido");
        }
        const pedido: IOrder = await response.json();
        console.log(pedido)
        return pedido;
    } catch (error) {
        console.error(error);
        return null;
    }
};
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("id");

const init = async () => {
    if (!orderId) return;

    const pedido = await obtenerPedido(orderId);
    if (!pedido) return;

    const card = document.getElementById("card") as HTMLElement | null;
    if (card) {
        card.innerHTML = `
            <h2>Detalles del Pedido</h2>
            <div class="divisor"></div>
            <p>ID: ${pedido.id}</p>
            <p>Cliente: ${pedido.nombreCompletoUsuario}</p>
            <p>Fecha: ${pedido.fecha}</p>
            <p>Estado: ${pedido.estado}</p>
            <p>Total: $${pedido.total.toFixed(2)}</p>
            <p>Detalles:</p>
            <div class="detalles">
            ${pedido.detalles.map(item => {
                return `<p><strong>Producto ID:</strong> ${item.productoId}</br> <strong>Nombre:</strong> ${item.nombreProducto}</br> <strong>Cantidad:</strong> ${item.cantidad}</br> <strong>Precio Unitario:</strong> $${item.precioUnitario.toFixed(2)}</br> <strong>Subtotal:</strong> $${item.subtotal.toFixed(2)}</p>`;
            }).join('')}
            </div>
        `;
    }
};

init();
