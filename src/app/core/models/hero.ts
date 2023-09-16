import { Tag } from "./tag";

export interface Hero {
    _id?: string;
    name: string;
    gender: string;
    email: string;
    age: number;
    address: string;
    tags?: Array<Tag>;
}