import { createReducer, on } from '@ngrx/store'
import { addHero, addHeroFailure, deleteHeroSuccess, findHero, findHeroSuccess, getHeroesFailure, getHeroesSuccess, getTopHeroesSuccess } from './hero.actions'
import { HeroState } from './hero.selector'





export const initialState: HeroState = {
    heroes: [],
    error: '',
    status: 'pending',
}

export const heroReducer = createReducer(
    initialState,
    on(addHero, (state, { hero }) => ({
        ...state,
        heroes: [...state.heroes, hero]
    })),
    on(addHeroFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(getHeroesSuccess, (state, { heroes }) => ({
        ...state,
        heroes: heroes,
        status: 'success' as 'success',
    })),
    on(getHeroesFailure, (state, { error }) => ({
        ...state,
        error,
    })),
    on(findHeroSuccess, (state, { hero }) => ({
        ...state,
        heroes: hero,
        status: 'success' as 'success'
    })),
    on(deleteHeroSuccess, (state, { hero }) => ({
        ...state,
        heroes: state.heroes.filter(h => h._id !== hero._id),
        status: 'success' as 'success'
    })),
)