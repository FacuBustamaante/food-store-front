import type { IProduct, CartProduct } from "../types/IProduct";
import type { Cart } from "../types/ICart";

export const addToCart = (product: IProduct) => {

    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;
    const cartData = localStorage.getItem('cart');
    let cart: Cart;

    if (cartData) {
        cart = JSON.parse(cartData);
    } else {
        cart = {
            usuarioId: userId,
            fecha: new Date().toISOString(),
            estado: "PENDIENTE",
            detalles: [] as CartProduct[]
        };
    }
    
    cart.fecha = new Date().toISOString();
    cart.usuarioId = userId;
    
    if (!cart.detalles || !Array.isArray(cart.detalles)) {
        cart.detalles = [];
    }

    const existingProduct: CartProduct | undefined = cart.detalles.find(p => p.id === product.id);
    
    if (existingProduct) {
        existingProduct.cantidad += 1;
    } else {
        cart.detalles.push({ ...product, cantidad: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
};

export const eliminarProductoDelCarrito = (productId: number) => {
    const cartData = localStorage.getItem('cart');
    if (!cartData) return;

    const cart: Cart = JSON.parse(cartData);
    cart.detalles = cart.detalles.filter((item: CartProduct) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
};

