import type { CartProduct } from "./IProduct";

export interface Cart {
    fecha: string;
    estado: "PENDIENTE",
    usuarioId: number;
    detalles: CartProduct[];
}