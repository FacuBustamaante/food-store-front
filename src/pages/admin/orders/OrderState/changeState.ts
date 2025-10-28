const API_URL = "http://localhost:8081/api";

//Obtener id del producto de la URL
const obtenerId = (): number | null => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id ? parseInt(id, 10) : null;
};

const orderId = obtenerId();
console.log(orderId)

//Función para actualizar el producto
const cambiarEstado = async (id: number, estado: string): Promise<void> => {
    const response = await fetch(`${API_URL}/pedidos/${id}/estado?estado=${estado}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Error al actualizar el estado del pedido');
    }
};

document.getElementById('change-state-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (orderId === null) {
        alert('ID de pedido inválido');
        return;
    }

    const estadoSelect = document.getElementById('state') as HTMLSelectElement;
    const nuevoEstado = estadoSelect.value;

    try {
        await cambiarEstado(orderId, nuevoEstado);
        alert('Estado del pedido actualizado con éxito');
        window.location.href = '/src/pages/admin/orders/orders.html';
    } catch (error) {
        alert('Error al actualizar el estado del pedido');
        console.error(error);
    }
});