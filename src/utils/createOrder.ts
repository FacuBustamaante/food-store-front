const cart = JSON.parse(localStorage.getItem('cart') || '[]');

const API = import.meta.env.VITE_API_URL;

export const createOrder = async () => {
    if(!cart || !cart.detalles || cart.detalles.length === 0) {
        console.error('El carrito está vacío o no es válido');
        return;
    }
    const mappedDetalles = cart.detalles.map((item: any) => ({
        productoId: item.id || item.productoId,
        cantidad: item.cantidad
    }));

    const orderPayload = {
        usuarioId: cart.usuarioId,
        fecha: cart.fecha,
        detalles: mappedDetalles,
    };
    console.log(orderPayload)
    const response = await fetch(`${API}/pedidos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
    });

    if (response.ok) {
        const order = await response.json();
        console.log('Pedido creado exitosamente', order)
    } else {
        console.error('Error al crear el pedido');
    }
};