export interface IProduct {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    nombreCategoria: string;
    imgURL: string;
}

export interface ProductoFetchResponse {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoriaId: string;
    stock: number;
    imgURL: string;
}

export interface NewProduct {
    nombre: string;
    descripcion: string;
    precio: number;
    categoriaId: number;
    imgURL: string;
    stock: number;
}

export interface CartProduct {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
}

export interface backendProduct{
    productoId: number;
    cantidad: number;
}