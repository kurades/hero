import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Hero } from "src/app/core/models/hero";
import { Tag } from "../../models/tag";

export interface HeroState {
    heroes: Hero[],
    error: string,
    tags: Tag[],
    status: 'idle' | 'pending' | 'success' | 'error',
}


export const selectHeroState = createFeatureSelector<HeroState>('heroes');

// export const selectHeros = (state: AppState) => state.heroes;

export const selectHeros = createSelector(
    selectHeroState,
    (state: HeroState) => state.heroes
)

export const selectTags = createSelector(
    selectHeroState,
    (state: HeroState) => state.tags
)