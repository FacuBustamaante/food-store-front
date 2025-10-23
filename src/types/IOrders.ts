import type { IProduct } from "./IProduct";

export interface IOrderItem {
    producto: IProduct;
    cantidad: number;
    subtotal: number;
}

export interface IOrder {
    id: number;
    numeroPedido: string;
    usuarioId: number;
    nombreCompletoUsuario: string;
    fecha: string;
    estado: "PENDIENTE" | "EN_PREPARACION" | "ENTREGADO" | "CANCELADO";
    productos: IOrderItem[];
    total: number;
}