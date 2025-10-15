import type { IProduct } from "../../../types/IProduct";
localStorage.getItem('userData') ? null : window.location.href = '/src/pages/auth/login/login.html';

// Array simulado de productos
const products = [
    { id: 1, name: 'Camiseta Básica', category: 'camisetas', price: 15.99 },
    { id: 2, name: 'Pantalón Jeans', category: 'pantalones', price: 35.50 },
    { id: 3, name: 'Chaqueta de Cuero', category: 'chaquetas', price: 89.99 },
    { id: 4, name: 'Camiseta Estampada', category: 'camisetas', price: 19.99 },
    { id: 5, name: 'Pantalón de Chándal', category: 'pantalones', price: 25.00 },
    { id: 6, name: 'Chaqueta Deportiva', category: 'chaquetas', price: 75.00 },
    { id: 7, name: 'Zapatillas Blancas', category: 'zapatos', price: 50.00 } // Nota: Esta categoría no está en el HTML, pero se puede filtrar por si se añade el elemento.
];

const logoutButton = document.getElementById('logoutButton');

logoutButton?.addEventListener('click', () => {
    localStorage.removeItem('userData');
    localStorage.getItem('userData') ? null : window.location.href = '/src/pages/auth/login/login.html';
});


// 1. Obtener los elementos del DOM
const searchInput = document.getElementById('searchInput');
const productContainer = document.getElementById('productContainer');
const categoryList = document.getElementById('categoryList');
const sortSelect = document.getElementById('sortSelect');

// 2. Función para renderizar los productos
function renderProducts(filteredProducts: IProduct[]) {
    productContainer ? productContainer.innerHTML = '' : null; // Limpiar el contenedor actual
    if (filteredProducts.length === 0) {
        productContainer ? productContainer.innerHTML = '<p>No se encontraron productos.</p>' : null;
        return;
    }
    filteredProducts.forEach((product: IProduct) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card');
        productDiv.innerHTML = `
            <img class="product-image" src="https://www.tasteofhome.com/wp-content/uploads/2025/02/Stamp-of-Approval-Spaghetti-Sauce_EXPS_TOHD25_39564_ChristineMa_2.jpg" alt="${product.name}" />
            <h4>${product.name}</h4>
            <p>Categoría: ${product.category}</p>
            <p>Precio: $${product.price.toFixed(2)}</p>
        `;
        productContainer.appendChild(productDiv);
    });
}

// 3. Función principal para manejar la búsqueda, filtro y ordenamiento
function updateProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = categoryList.querySelector('.active').dataset.category;
    const sortValue = sortSelect.value;

    // a. Filtrar por búsqueda y categoría
    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    // b. Ordenar los productos filtrados
    if (sortValue === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    // c. Renderizar la nueva lista
    renderProducts(filtered);
}

// 4. Agregar "oyentes" de eventos
searchInput.addEventListener('keyup', updateProducts); // `keyup` para búsqueda en tiempo real
sortSelect.addEventListener('change', updateProducts); // `change` para el menú desplegable

categoryList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        // Remover la clase 'active' del elemento anterior
        categoryList.querySelector('.active').classList.remove('active');
        // Agregar la clase 'active' al elemento clickeado
        event.target.classList.add('active');
        updateProducts();
    }
});

// 5. Renderizar los productos por primera vez al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateProducts();
});

