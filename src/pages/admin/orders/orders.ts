import type { IOrder } from "../../../types/IOrders";

const API_URL = "http://localhost:8081/api";
const ordersList = document.getElementById("ordersList") as HTMLElement;

const fetchPedidos = async (): Promise<IOrder[]> => {
    try {
        const response = await fetch(`${API_URL}/pedidos`);
        if (!response.ok) throw new Error("Error en la respuesta de la API");
        const pedidos: IOrder[] = await response.json();
        return pedidos;
    } catch (error) {
        console.error("Error cargando pedidos", error);
        return [];
    }
};
fetchPedidos().then((pedidos) => {
    renderPedidos(pedidos);
});

// Renderizar lista
function renderPedidos(lista: IOrder[]) {
    ordersList.innerHTML = "";

    lista.forEach((pedido) => {
        const card = document.createElement("div");
        card.classList.add("order-card");
        card.innerHTML = `
            <h3>Pedido #${pedido.id}</h3>
            <div class="divisor"></div>
            <p><strong>Id Cliente:</strong> ${pedido.usuarioId}</p>
            <p><strong>Cliente:</strong> ${pedido.nombreCompletoUsuario}</p>
            <div class="divisor"></div>
            <p><strong>Fecha y hora:</strong> ${new Date(pedido.fecha).toLocaleString()}</p>
            <p><strong>Estado:</strong> ${pedido.estado}</p>
            <p><strong>Total:</strong> $${pedido.total.toFixed(2)}</p>
            <div class="divisor"></div>
            <button id="detalle-btn" class="btn" data-id="${pedido.id}">Ver Detalle</button>
            <button id="estado-btn" class="btn" data-id="${pedido.id}">Cambiar Estado</button>
        `;
        ordersList.appendChild(card);
    });
}

document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target && target.id === "estado-btn") {
        const orderId = target.getAttribute("data-id");
        if (orderId) {
            console.log(orderId)
            window.location.href = `/src/pages/admin/orders/OrderState/changeState.html?id=${orderId}`;
        }
    }
});
