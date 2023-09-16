import { createAction, props } from "@ngrx/store";
import { Hero } from "src/app/core/models/hero";
import { Tag } from "../../models/tag";


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
    '[Hero page] Get Heroes Failure',
    props<{ error: string }>()
)

export const getHero = createAction(
    '[Hero page] Get Hero',
    props<{ id: string }>()
)

export const getHeroSuccess = createAction(
    '[Hero page] Get Hero Success',
    props<{ hero: Hero }>()
)

export const getHeroFailure = createAction(
    '[Hero page] Get Hero Failure',
    props<{ error: string }>()
)

export const getTopHeroes = createAction(
    '[Hero page] Get Top Heroes',
)

export const getTopHeroesSuccess = createAction(
    '[Hero page] Get Top Heroes Success',
    props<{ heroes: Hero[] }>
)

export const getTopHeroesFailure = createAction(
    '[Hero page] Get Top Heroes Failure',
    props<{ error: string }>
)

export const findHero = createAction(
    'Hero page Find Hero',
    props<{ term: string, tags: Tag[] }>()
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
    '[Hero page] Delete Hero failure',
    props<{ error: string }>()
)

export const editHero = createAction(
    '[Hero page] Edit Hero',
    props<{ hero: Hero }>()
)

export const editHeroSuccess = createAction(
    '[Hero page] Edit Hero Success',
    props<{ hero: Hero }>()
)

export const editHeroFailure = createAction(
    '[Hero page] Edit Hero Failure',
    props<{ error: string }>()
)
export const getTags = createAction(
    '[Tag] get tags',
)

export const getTagsSuccess = createAction(
    '[Tag] get tags Success',
    props<{ tags: Tag[] }>()
)

export const getTagsFailure = createAction(
    '[Tag] get tags Failure',
    props<{ error: string }>()
)

export const addTag = createAction(
    '[Tag] add tag',
    props<{ name: string }>()
)

export const addTagSuccess = createAction(
    '[Tag] add tag Success',
    props<{ tag: Tag }>()
)

export const addTagFailure = createAction(
    '[Tag] add tag Failure',
    props<{ error: string }>()
)

export const editTag = createAction(
    '[Tag] edit tag',
    props<{ _id: string, name: string }>()
)

export const editTagSuccess = createAction(
    '[Tag] edit tag Success',
    props<{ tag: Tag }>()
)

export const editTagFailure = createAction(
    '[Tag] edit tag Failure',
    props<{ error: string }>()
)

export const deleteTag = createAction(
    '[Tag] delete tag',
    props<{ _id: string }>()
)

export const deleteTagSuccess = createAction(
    '[Tag] delete tag Success',
    props<{ tag: Tag }>()
)

export const deleteTagFailure = createAction(
    '[Tag] delete tag Failure',
    props<{ error: string }>()
)