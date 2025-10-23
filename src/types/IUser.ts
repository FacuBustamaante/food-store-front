export interface UserRegister {
    nombre: string;
    apellido: string;
    mail: string;
    celular: number;
    role: "USUARIO" | "ADMIN";
    contrasena: string;
}

export interface sessionUser{
    mail: string;
    nombre: string;
    role: "USUARIO" | "ADMIN";
}
