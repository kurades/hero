import { createAction, props } from "@ngrx/store";
import { Hero } from "src/app/core/models/hero";


export const addHero = createAction(
    '[Hero page] Add Hero',
    props<{ hero: Hero }>()
)

export const addHeroSuccess = createAction(
    '[Hero page] Add Hero Success',
    props<{ hero: Hero }>()
)
export const addHeroFailure = createAction(
    '[Hero page] Add Hero Failure',
    props<{ error: string }>()
)

export const getHeroes = createAction(
    '[Hero page] Get Heroes',
)

export const getHeroesSuccess = createAction(
    '[Hero page] Get Heroes Success',
    props<{ heroes: Hero[] }>()
)

export const getHeroesFailure = createAction(
    '[Hero page] Get Hero Failure',
    props<{ error: string }>()
)

export const getTopHeroes = createAction(
    '[Hero page] Get Top Heroes',
)

export const getTopHeroesSuccess = createAction(
    '[Hero page] Get Top Heroes Success',
    props<{heroes: Hero[]}>
)

export const getTopHeroesFailure = createAction(
    '[Hero page] Get Top Heroes Failure',
    props<{error: string}>
)

export const findHero = createAction(
    'Hero page Find Hero',
    props<{ term: string }>()
)

export const findHeroSuccess = createAction(
    '[Hero page] Find Hero Success',
    props<{ hero: Hero[] }>()
)

export const findHeroFailure = createAction(
    '[Hero page] Find Hero Failure',
    props<{ error: string }>()
)

export const deleteHero = createAction(
    '[Hero page] Delete  Hero',
    props<{ id: string }>()
)

export const deleteHeroSuccess = createAction(
    '[Hero page] Delete  Hero Success',
    props<{ hero: Hero }>()
)

export const deleteHeroFailure = createAction(
    '[Hero page] Delete  Hero failure',
    props<{ error: string }>()
)