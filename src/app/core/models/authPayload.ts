import { User } from "./user";

export interface authPayload {
    user: User;
    token: string;
}