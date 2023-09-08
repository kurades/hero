import { Hero } from "./hero";

export interface User {
    _id?: string,
    email?: string,
    phone?: string,
    name: string,
    heroesList: Hero[],
}