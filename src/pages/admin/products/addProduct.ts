import type { NewProduct } from "../../../types/IProduct";

const apiUrl = 'http://localhost:8081/api';

const addProductForm = document.getElementById('add-product-form') as HTMLFormElement;

addProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(addProductForm);
    const newProduct: NewProduct = {
        nombre: formData.get('nombre') as string,
        descripcion: formData.get('descripcion') as string,
        precio: parseFloat(formData.get('precio') as string),
        categoriaId: parseInt(formData.get('categoria') as string, 10),
        imgURL: formData.get('imgURL') as string,
        stock: parseInt(formData.get('stock') as string, 10),
    };

    try {
        console.log(newProduct)
        await addProduct(newProduct);
        alert('Producto agregado exitosamente');
        addProductForm.reset();
    } catch (error) {
        alert('Error al agregar el producto');
        console.error(error);
    }
});

export const addProduct = async (product: NewProduct): Promise<void> => {
    const response = await fetch(`${apiUrl}/productos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error('Error al agregar el producto');
    }
};