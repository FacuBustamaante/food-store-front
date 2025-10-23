import type { ProductoFetchResponse } from "../../../types/IProduct";
import { checkUser } from "../../../utils/auth";

const API_URL = "http://localhost:8081/api";

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

const lista = document.getElementById('product-table') as HTMLTableElement;

getProducts().then(data => {
    data.forEach((producto: ProductoFetchResponse) => {
        console.log(`ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}`);
        const nuevaFila = lista.insertRow();
        nuevaFila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.stock}</td>
            <td class="actions">
                <button class="btn btn-edit">Editar</button>
                <button class="btn btn-delete">Eliminar</button>
            </td>
        `;
    });
});

//Funcionalidad de botón Logout 
const logoutButton = document.getElementById('logoutButton');
logoutButton?.addEventListener('click', () => {
    localStorage.removeItem('user');
    checkUser();
});