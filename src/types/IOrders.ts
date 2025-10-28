import type { IProduct } from "./IProduct";

export interface IOrderItem {
    productoId: number;
    nombreProducto: string;
    cantidad: number;
    subtotal: number;
    precioUnitario: number;
}

export interface IOrder {
    id: number;
    numeroPedido: string;
    usuarioId: number;
    nombreCompletoUsuario: string;
    fecha: string;
    estado: "PENDIENTE" | "EN_PREPARACION" | "ENTREGADO" | "CANCELADO";
    detalles: IOrderItem[];
    total: number;
}