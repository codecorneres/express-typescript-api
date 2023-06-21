export type Role = {
    id: number;
    name: string;
}

export type User = {
    id: number;
    email: string;
    name: string;
    password: string;
    role_id: number;
    role: Role;
}