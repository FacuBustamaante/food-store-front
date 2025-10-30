import type { IProduct } from "../../../types/IProduct";
import type { Category } from "../../../types/ICategory";
import { checkUser } from "../../../utils/auth";
import { recuperarNombreUsuario } from "../../../utils/usernameFromLocal";

//Verifica si el usuario está logueado
checkUser();

//Recupera r el nombre de usuario para mostrar en el header
recuperarNombreUsuario();

const API_URL = 'http://localhost:8081/api';
const productsAll: IProduct[] = [];

//Fetch de productos
const getProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await fetch(`${API_URL}/productos`);

        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
};
getProducts().then((products) => {
    productsAll.push(...products);
    console.log("Todos los productos:", productsAll)
    renderProducts(products);
});


//Funcionalidad de botón Logout 
const logoutButton = document.getElementById('logoutButton');
logoutButton?.addEventListener('click', () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
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
            <p class="product-category">${product.nombreCategoria}</p>
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

//Filtrar productos por categoria
categoryContainer?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'LI') {
        const selectedCategory = target.getAttribute('data-category');

        if (selectedCategory === '') {
            productContainer!.innerHTML = '';
            renderProducts(productsAll);
            return;
        }
        else {
            const filteredProducts = productsAll.filter(product => product.nombreCategoria === selectedCategory);
            productContainer!.innerHTML = '';
            renderProducts(filteredProducts);
        }
    }
});

//Filtro de búsqueda por nombre
const searchInput = document.getElementById('searchInput') as HTMLInputElement;
searchInput?.addEventListener('input', () => {
    const palabra = searchInput.value.toLowerCase();
    const filteredProducts = productsAll.filter(product => product.nombre.toLowerCase().includes(palabra));
    productContainer!.innerHTML = '';
    renderProducts(filteredProducts);
});

//Ordenar productos por precio
const sortSelect = document.getElementById('sortSelect') as HTMLSelectElement;
sortSelect?.addEventListener('change', () => {
    const sortBy = sortSelect.value;
    let sortedProducts: IProduct[] = [];

    if (sortBy === 'price-asc') {
        sortedProducts = [...productsAll].sort((a, b) => a.precio - b.precio);
    } else if (sortBy === 'price-desc') {
        sortedProducts = [...productsAll].sort((a, b) => b.precio - a.precio);
    } else {
        sortedProducts = [...productsAll];
    }

    productContainer!.innerHTML = '';
    renderProducts(sortedProducts);
});