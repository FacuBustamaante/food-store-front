import type { IProduct } from "./IProduct";

export interface ICliente {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
}

export interface IOrderItem {
  producto: IProduct;
  cantidad: number;
  subtotal: number;
}

export interface IOrder {
  id: number;
  numeroPedido: string;
  cliente: ICliente;
  fechaHora: string;
  estado: "PENDIENTE" | "EN_PREPARACION" | "ENTREGADO" | "CANCELADO";
  productos: IOrderItem[];
  total: number;
  metodoPago: string;
  notas?: string;
}