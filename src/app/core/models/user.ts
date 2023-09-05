import { Hero } from "./hero";

export interface User {
    _id? : string,
    name: string,
    heroesList : Hero[],
}