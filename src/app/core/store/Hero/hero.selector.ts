import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Hero } from "src/app/core/models/hero";

export interface HeroState {
    heroes: Hero[],
    error: string,
    status: 'pending' | 'success',
}


export const selectHeroState = createFeatureSelector<HeroState>('heroes');

// export const selectHeros = (state: AppState) => state.heroes;

export const selectHeros = createSelector(
    selectHeroState,
    (state: HeroState) => state.heroes
)