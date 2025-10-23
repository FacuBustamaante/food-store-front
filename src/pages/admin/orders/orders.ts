import type { IOrder } from "../../../types/IOrders";
import { apiGet, apiPut } from "../../../utils/api"; // suponiendo que tienes helpers api.ts

const ordersList = document.getElementById("ordersList") as HTMLElement;
const estadoFilter = document.getElementById("estadoFilter") as HTMLSelectElement;
const modal = document.getElementById("orderModal") as HTMLElement;
const closeModalBtn = document.getElementById("closeModal") as HTMLElement;
const orderDetail = document.getElementById("orderDetail") as HTMLElement;

let pedidos: IOrder[] = [];

// Inicialización
window.addEventListener("DOMContentLoaded", async () => {
    await cargarPedidos();
    estadoFilter.addEventListener("change", filtrarPedidos);
    closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
});

// Traer pedidos de la API
/*async function cargarPedidos() {
    try {
        pedidos = await apiGet<IOrder[]>("/api/pedidos");
        pedidos.sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime());
        renderPedidos(pedidos);
    } catch (error) {
        console.error("Error cargando pedidos", error);
    }
}*/
/*---------FACU ACA T DEJO DATOS SIMULADOS PARA Q LOS PROBES-------*/
async function cargarPedidos() {
    pedidos = [
        {
            id: 1,
            numeroPedido: "PED-001",
            cliente: {
                id: 1,
                nombre: "Juan",
                apellido: "Pérez",
                telefono: "123456789",
                direccion: "Av. Siempre Viva 742",
            },
            fechaHora: new Date().toISOString(),
            estado: "PENDIENTE",
            productos: [
                {
                    producto: {
                        id: 10,
                        nombre: "Hamburguesa",
                        descripcion: "Clásica con queso y lechuga",
                        precio: 2500,
                        categoria: "Comidas",
                        imgURL: "https://via.placeholder.com/120x80?text=Hamburguesa"
                    },
                    cantidad: 2,
                    subtotal: 5000,
                },
                {
                    producto: {
                        id: 11,
                        nombre: "Papas Fritas",
                        descripcion: "Porción mediana",
                        precio: 1500,
                        categoria: "Comidas",
                        imgURL: "https://via.placeholder.com/120x80?text=Papas+Fritas"
                    },
                    cantidad: 1,
                    subtotal: 1500,
                },
            ],
            total: 6500,
            metodoPago: "Efectivo",
            notas: "Sin cebolla, por favor.",
        },
        {
            id: 2,
            numeroPedido: "PED-002",
            cliente: {
                id: 2,
                nombre: "Lucía",
                apellido: "Gómez",
                telefono: "987654321",
                direccion: "Calle Falsa 123",
            },
            fechaHora: new Date(Date.now() - 3600000).toISOString(),
            estado: "EN_PREPARACION",
            productos: [
                {
                    producto: {
                        id: 12,
                        nombre: "Pizza Muzzarella",
                        descripcion: "Grande con extra queso",
                        precio: 4000,
                        categoria: "Comidas",
                        imgURL: "https://via.placeholder.com/120x80?text=Pizza"
                    },
                    cantidad: 1,
                    subtotal: 4000,
                },
            ],
            total: 4000,
            metodoPago: "Tarjeta",
            notas: "",
        },
        {
            id: 3,
            numeroPedido: "PED-003",
            cliente: {
                id: 3,
                nombre: "Carlos",
                apellido: "López",
                telefono: "555444333",
                direccion: "Ruta 9 Km 15",
            },
            fechaHora: new Date(Date.now() - 7200000).toISOString(),
            estado: "ENTREGADO",
            productos: [
                {
                    producto: {
                        id: 15,
                        nombre: "Empanadas",
                        descripcion: "Media docena de carne cortada a cuchillo",
                        precio: 1000,
                        categoria: "Comidas",
                        imgURL: "https://via.placeholder.com/120x80?text=Empanadas"
                    },
                    cantidad: 6,
                    subtotal: 6000,
                },
            ],
            total: 6000,
            metodoPago: "MercadoPago",
            notas: "De carne, por favor.",
        },
    ];

    pedidos.sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime());
    renderPedidos(pedidos);
}


// Renderizar lista
function renderPedidos(lista: IOrder[]) {
    ordersList.innerHTML = "";

    lista.forEach((p) => {
        const card = document.createElement("div");
        card.classList.add("order-card");
        card.innerHTML = `
      <h3>Pedido #${p.numeroPedido}</h3>
      <p><strong>Cliente:</strong> ${p.cliente.nombre} ${p.cliente.apellido}</p>
      <p><strong>Fecha:</strong> ${new Date(p.fechaHora).toLocaleString()}</p>
      <p><strong>Estado:</strong> <span class="badge ${p.estado.toLowerCase()}">${p.estado}</span></p>
      <p><strong>Productos:</strong> ${p.productos.length}</p>
      <p><strong>Total:</strong> $${p.total.toFixed(2)}</p>
    `;
        card.addEventListener("click", () => abrirDetalle(p.id));
        ordersList.appendChild(card);
    });
}

// Filtro
function filtrarPedidos() {
    const estado = estadoFilter.value;
    if (estado === "ALL") renderPedidos(pedidos);
    else renderPedidos(pedidos.filter((p) => p.estado === estado));
}

// Abrir modal con detalle
async function abrirDetalle(id: number) {
    try {
        const pedido = await apiGet<IOrder>(`/api/pedidos/${id}`);
        renderDetalle(pedido);
        modal.classList.remove("hidden");
    } catch (err) {
        console.error("Error cargando detalle", err);
    }
}

// Renderizar detalle en modal
function renderDetalle(p: IOrder) {
    orderDetail.innerHTML = `
    <h2>Pedido #${p.numeroPedido}</h2>
    <p><strong>Cliente:</strong> ${p.cliente.nombre} ${p.cliente.apellido}</p>
    <p><strong>Teléfono:</strong> ${p.cliente.telefono}</p>
    <p><strong>Dirección:</strong> ${p.cliente.direccion}</p>
    <p><strong>Método de pago:</strong> ${p.metodoPago}</p>
    <p><strong>Notas:</strong> ${p.notas ?? "Sin notas"}</p>
    <h3>Productos</h3>
    <ul>
      ${p.productos.map(i => `
        <li>${i.producto.nombre} x${i.cantidad} - $${i.subtotal.toFixed(2)}</li>
      `).join("")}
    </ul>
    <p><strong>Total:</strong> $${p.total.toFixed(2)}</p>
    <h3>Cambiar estado</h3>
    <select id="estadoSelect">
      <option value="PENDIENTE" ${p.estado === "PENDIENTE" ? "selected" : ""}>Pendiente</option>
      <option value="EN_PREPARACION" ${p.estado === "EN_PREPARACION" ? "selected" : ""}>En preparación</option>
      <option value="ENTREGADO" ${p.estado === "ENTREGADO" ? "selected" : ""}>Entregado</option>
      <option value="CANCELADO" ${p.estado === "CANCELADO" ? "selected" : ""}>Cancelado</option>
    </select>
    <button id="updateEstadoBtn">Actualizar Estado</button>
  `;

    const updateBtn = document.getElementById("updateEstadoBtn")!;
    updateBtn.addEventListener("click", () => actualizarEstado(p.id));
}

// Actualizar estado
async function actualizarEstado(id: number) {
    const nuevoEstado = (document.getElementById("estadoSelect") as HTMLSelectElement).value;
    try {
        await apiPut(`/api/pedidos/${id}/estado`, { estado: nuevoEstado });
        alert("Estado actualizado correctamente");
        modal.classList.add("hidden");
        await cargarPedidos();
    } catch (err) {
        console.error("Error actualizando estado", err);
        alert("No se pudo actualizar el estado");
    }
}








