import { HeroState } from "./Hero/hero.selector";
import { UserState } from "./User/user.selector";


export interface AppState {
    heroes: HeroState,
    user: UserState,
}