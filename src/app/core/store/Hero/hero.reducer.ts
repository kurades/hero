import { createReducer, on } from '@ngrx/store'
import { addHero, addHeroFailure, addHeroSuccess, addTagFailure, addTagSuccess, deleteHeroSuccess, deleteTagFailure, deleteTagSuccess, editHeroFailure, editHeroSuccess, editTagFailure, editTagSuccess, findHero, findHeroSuccess, getHeroesFailure, getHeroesSuccess, getTagsFailure, getTagsSuccess, getTopHeroesSuccess } from './hero.actions'
import { HeroState } from './hero.selector'





export const initialState: HeroState = {
    heroes: [],
    error: '',
    tags: [],
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
    }),
    on(getTagsSuccess, (state, { tags }) => {
        return ({
            ...state,
            tags,
            status: 'success' as 'success'
        })
    }),
    on(getTagsFailure, (state, { error }) => {
        return ({
            ...state,
            error,
        })
    }),
    on(addTagSuccess, (state, { tag }) => {
        console.log([...state.tags,tag]);
        
        return ({
            ...state,
            tags : [...state.tags,tag],
            status: 'success' as 'success'
        })
    }),
    on(addTagFailure, (state, { error }) => {
        return ({
            ...state,
            error,
        })
    }),
    on(editTagSuccess, (state, { tag }) => {
        const tagIndex = state.tags.findIndex((t) => t._id === tag._id)
        console.log(tagIndex);
        
        const newTags = [
            ...state.tags
        ]
        newTags[tagIndex] = tag
        return ({
            ...state,
            tags : newTags,
            status: 'success' as 'success'
        })
    }),
    on(editTagFailure, (state, { error }) => {
        return ({
            ...state,
            error,
        })
    }),
    on(deleteTagSuccess, (state, { tag }) => {
        const newTags = state.tags.filter((t) => t._id !== tag._id)

        return ({
            ...state,
            tags : newTags,
            status: 'success' as 'success'
        })
    }),
    on(deleteTagFailure, (state, { error }) => {
        return ({
            ...state,
            error,
        })
    }),
)