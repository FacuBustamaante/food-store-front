import type { ProductoFetchResponse } from "../../../types/IProduct";
import { checkUser } from "../../../utils/auth";

checkUser();

const API_URL = "http://localhost:8081/api";

// Función para obtener los productos desde la API
const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

//Mapear productos en la tabla
getProducts().then(data => {
    const lista = document.getElementById('product-table') as HTMLTableElement;
    data.forEach((producto: ProductoFetchResponse) => {
        console.log(`ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}`);
        const nuevaFila = lista.insertRow();
        nuevaFila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.stock}</td>
            <td class="actions">
                <button id="edit-btn" data-id="${producto.id}" class="btn btn-edit">Editar</button>
                <button id="delete-btn" data-id="${producto.id}" class="btn btn-delete">Eliminar</button>
            </td>
        `;
    });
});

//Evento de editar producto
document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target && target.id === 'edit-btn') {
        const productId = target.getAttribute('data-id');
        if (productId) {
            window.location.href = `/src/pages/admin/products/editProduct.html?id=${productId}`;
        }
    }
});

// Función para eliminar un producto
const eliminarProducto = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log(`Producto con ID ${id} eliminado correctamente.`);

        } else {
            console.error(`Error al eliminar el producto con ID ${id}:`, response.statusText);
        }
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}

// Evento de eliminar producto
document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target && target.id === 'delete-btn') {
        const productId = target.getAttribute('data-id');
        if (productId) {
            const isConfirmed = confirm(
                `¿Estás seguro de que deseas eliminar el producto con ID ${productId}? Esta acción es irreversible.`
            );
            if (isConfirmed) {
                eliminarProducto(parseInt(productId)).then(() => {
                    console.log(`Producto con ID ${productId} eliminado correctamente.`);
                    window.location.reload();
                });
            }else{
                console.log(`Eliminación del producto ID ${productId} cancelada por el usuario.`);
            }
        }
    }
});

//Funcionalidad de botón Logout 
const logoutButton = document.getElementById('logoutButton');
logoutButton?.addEventListener('click', () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    checkUser();
});

