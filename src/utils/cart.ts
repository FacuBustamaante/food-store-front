import type { ICart, ICartItem } from "../types/ICart";

const KEY = "cart";
const ENVIO_FIJO = 500;

function load(): ICart {
  const raw = localStorage.getItem(KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as ICart;
    } catch {}
  }
  return { items: [], envio: ENVIO_FIJO, subtotal: 0, total: ENVIO_FIJO };
}

function save(cart: ICart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

function recalcular(cart: ICart) {
  cart.subtotal = cart.items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
  cart.total = cart.subtotal + cart.envio;
}

export function getCart(): ICart {
  return load();
}

export function clearCart() {
  const cart: ICart = { items: [], envio: ENVIO_FIJO, subtotal: 0, total: ENVIO_FIJO };
  save(cart);
}

export function addToCart(item: Omit<ICartItem, "cantidad">, qty = 1) {
  const cart = load();
  const idx = cart.items.findIndex((i) => i.productoId === item.productoId);
  if (idx >= 0) {
    const nextQty = cart.items[idx].cantidad + qty;
    cart.items[idx].cantidad = item.stock ? Math.min(nextQty, item.stock) : nextQty;
  } else {
    const cantidad = item.stock ? Math.min(qty, item.stock) : qty;
    cart.items.push({ ...item, cantidad });
  }
  recalcular(cart);
  save(cart);
}

export function updateQty(productoId: number, qty: number) {
  const cart = load();
  const it = cart.items.find((i) => i.productoId === productoId);
  if (!it) return;
  it.cantidad = Math.max(1, qty);
  recalcular(cart);
  save(cart);
}

export function removeFromCart(productoId: number) {
  const cart = load();
  cart.items = cart.items.filter((i) => i.productoId !== productoId);
  recalcular(cart);
  save(cart);
}
