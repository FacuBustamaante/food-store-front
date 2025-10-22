export interface IProduct {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    imgURL: string;
}

export interface ProductoFetchResponse {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    stock: number;
    imagenUrl: string;
}