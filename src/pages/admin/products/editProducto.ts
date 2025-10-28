//Función para obtener el ID del producto desde la URL
import type { IProduct, NewProduct, ProductoFetchResponse } from "../../../types/IProduct";

const apiUrl = 'http://localhost:8081/api';

//Obtener id del producto de la URL
const getProductIdFromUrl = (): number | null => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id ? parseInt(id, 10) : null;
};

//Función para cargar los datos del producto en el formulario
const loadProductData = async (id: number): Promise<void> => {
    const response = await fetch(`${apiUrl}/productos/${id}`);
    if (!response.ok) {
        throw new Error('Error al obtener los datos del producto');
    }
    const product: ProductoFetchResponse = await response.json();
    (document.getElementById('nombre') as HTMLInputElement).value = product.nombre;
    (document.getElementById('descripcion') as HTMLInputElement).value = product.descripcion;
    (document.getElementById('precio') as HTMLInputElement).value = String(product.precio);
    (document.getElementById('categoria') as HTMLInputElement).value = String(product.categoriaId);
    (document.getElementById('imgURL') as HTMLInputElement).value = product.imgURL;
    (document.getElementById('stock') as HTMLInputElement).value = String(product.stock);
};

//Cargar datos al iniciar la página
const productId = getProductIdFromUrl();
if (productId !== null) {
    loadProductData(productId).catch(error => {
        alert('Error al cargar los datos del producto');
        console.error(error);
    });
} else {
    alert('ID de producto inválido');
}   

//Función para actualizar el producto
const updateProduct = async (id: number, product: NewProduct): Promise<void> => {
    const response = await fetch(`${apiUrl}/productos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error('Error al actualizar el producto');
    }
};

//Evento de envío del formulario
const editProductForm = document.getElementById('edit-product-form') as HTMLFormElement;
editProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const productId = getProductIdFromUrl();
    if (productId === null) {
        alert('ID de producto inválido');
        return;
    }

    const formData = new FormData(editProductForm);
    const updatedProduct: NewProduct = {
        nombre: formData.get('nombre') as string,
        descripcion: formData.get('descripcion') as string,
        precio: parseFloat(formData.get('precio') as string),
        categoriaId: parseInt(formData.get('categoria') as string, 10),
        imgURL: formData.get('imgURL') as string,
        stock: parseInt(formData.get('stock') as string, 10),
    };

    try {
        await updateProduct(productId, updatedProduct);
        alert('Producto actualizado exitosamente');
        window.location.href = '/src/pages/admin/adminHome/adminHome.html';
    } catch (error) {
        alert('Error al actualizar el producto');
        console.error(error);
    }
});