export interface UserLogin {
    email: string;
    role: string;
    logged: boolean;
}

export interface UserRegister {
    name: string;
    email: string;
    logged: boolean;
    role: string;
}