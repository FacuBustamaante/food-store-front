import type { IProduct } from "../../../types/IProduct";
import type { Category } from "../../../types/ICategory";
import { checkUser } from "../../../utils/auth";

checkUser();
const API_URL = 'http://localhost:8081/api';

//Fetch de productos
const getProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await fetch(`${API_URL}/productos`);

        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
};
getProducts().then((products) => {
    renderProducts(products);
});

//Obtener nombre de usuario
const recuperarNombreUsuario = () => {
    const userDataJSON = localStorage.getItem('userData');

    if (!userDataJSON) {
        console.warn("No se encontraron datos de 'userData' en localStorage.");
        return null; 
    }

    try {
        const userData = JSON.parse(userDataJSON);

        if (userData && userData.nombre) {
            return userData.nombre;
        } else {
            console.warn("La propiedad 'nombre' no existe en los datos de usuario.");
            return null;
        }

    } catch (error) {
        console.error("Error al parsear los datos de sesión de localStorage:", error);
        return null;
    }
}

//Mostrar nombre de usuario en header
const span = document.getElementById('userName');
const nombreUsuario = recuperarNombreUsuario();

if(span && nombreUsuario) {
    span.textContent = nombreUsuario;
}

//Funcionalidad de botón Logout 
const logoutButton = document.getElementById('logoutButton');
logoutButton?.addEventListener('click', () => {
    localStorage.removeItem('user');
    checkUser();
});

//Mapeo de productos
const productContainer = document.getElementById('productContainer');
const renderProducts = (products: IProduct[]) => {
    if (!productContainer) return;

    products.forEach((product: IProduct) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.imgURL}" alt="${product.nombre}" class="product-image" />
            <h3 class="product-name">${product.nombre}</h3>
            <p class="product-description">${product.descripcion}</p>
            <p class="product-price">$${product.precio.toFixed(2)}</p>
            <button class="card-btn">Agregar al carrito</button>
        `;

        productContainer.appendChild(productCard);
    });
}

//Fetch de categorias
const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await fetch(`${API_URL}/categorias`);

        if (!response.ok) {
            throw new Error('Error al obtener las categorías');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        return [];
    }
};
getCategories().then((categories) => {
    renderCategories(categories);
});

//Mapeo de categorias
const categoryContainer = document.getElementById('categoryList');
const renderCategories = (categories: Category[]) => {
    if (!categoryContainer) return;

    categories.forEach((category: Category) => {
        const categoryCard = document.createElement('li');

        categoryCard.innerHTML = `
            <li data-category="${category.nombre}">${category.nombre}</li>
        `;

        categoryContainer.appendChild(categoryCard);
    });
};
