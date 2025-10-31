const cart = JSON.parse(localStorage.getItem('cart') || '[]');

const API = 'http://localhost:8081/api'

export const createOrder = async () => {
    console.log(cart)
    const mappedDetalles = cart.detalles.map((item: any) => ({
        productoId: item.id || item.productoId,
        cantidad: item.cantidad
    }));

    const orderPayload = {
        usuarioId: cart.usuarioId,
        fecha: cart.fecha,
        detalles: mappedDetalles,
    };
    const response = await fetch(`${API}/pedidos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
    });

    if (response.ok) {
        const order = await response.json();
        alert('Compra realizada con éxito:');
        console.log('Pedido creado exitosamente', order)
    } else {
        console.error('Error al crear el pedido');
    }
};