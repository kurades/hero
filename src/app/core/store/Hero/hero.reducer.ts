import { createReducer, on } from '@ngrx/store'
import { addHero, addHeroFailure, addHeroSuccess, deleteHeroSuccess, editHeroFailure, editHeroSuccess, findHero, findHeroSuccess, getHeroesFailure, getHeroesSuccess, getTopHeroesSuccess } from './hero.actions'
import { HeroState } from './hero.selector'





export const initialState: HeroState = {
    heroes: [],
    error: '',
    status: 'idle',
}

export const heroReducer = createReducer(
    initialState,
    on(addHeroSuccess, (state, { hero }) => ({
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
    on(deleteHeroSuccess, (state, { hero }) => {
        console.log(hero);
        
        return ({
            ...state,
            heroes: state.heroes.filter(h => h._id !== hero._id),
            status: 'success' as 'success'
        })
    }),
    on(editHeroSuccess, (state, { hero }) => {
        const heroIndex = state.heroes.findIndex((h) => h._id === hero._id)
        const newHeroes = [
            ...state.heroes
        ]
        newHeroes[heroIndex] = hero
        return ({
            ...state,
            heroes: newHeroes,
            status: 'success' as 'success'
        })
    }),
    on(editHeroFailure, (state, { error }) => {
        return ({
            ...state,
            error,
        })
    })
)