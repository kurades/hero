import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { HeroService } from "src/app/core/services/hero.service";
import { addHero, addHeroSuccess, getHeroes, getHero, getHeroesSuccess, getHeroesFailure, findHero, findHeroSuccess, findHeroFailure, addHeroFailure, deleteHero, deleteHeroSuccess, deleteHeroFailure, getHeroSuccess, getHeroFailure, editHero, editHeroFailure, editHeroSuccess, getTags, getTagsSuccess, getTagsFailure, addTag, addTagSuccess, editTag, editTagSuccess, editTagFailure, deleteTag, deleteTagSuccess, deleteTagFailure } from "./hero.actions";
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs'
import { MessageService } from "src/app/core/services/message.service";


@Injectable()
export class HeroEffect {
    addHero$ = createEffect(() =>
        this.action$.pipe(
            ofType(addHero),
            exhaustMap(action =>
                this.heroService.addHero(action.hero).pipe(
                    map((hero) => addHeroSuccess({ hero: hero })),
                    catchError((error) => {
                        this.messageService.add(error)
                        return of(addHeroFailure({ error }))
                    })
                )
            )
        )
    )

    getHeroes$ = createEffect(() =>
        this.action$.pipe(
            ofType(getHeroes),
            exhaustMap(() =>
                this.heroService.getHeroes().pipe(
                    map((heroes) => getHeroesSuccess({ heroes })),
                    catchError((error) => {
                        this.messageService.add(error)
                        return of(getHeroesFailure({ error }))
                    })
                )
            )
        )
    )

    getTags$ = createEffect(() =>
        this.action$.pipe(
            ofType(getTags),
            exhaustMap(() =>
                this.heroService.getTags().pipe(
                    map((tags) => getTagsSuccess({ tags })),
                    catchError((error) => {
                        this.messageService.add(error)
                        return of(getTagsFailure({ error }))
                    })
                )
            )
        )
    )

    getHero$ = createEffect(() =>
        this.action$.pipe(
            ofType(getHero),
            exhaustMap((action) =>
                this.heroService.getHero(action.id).pipe(
                    map((hero) => getHeroSuccess({ hero })),
                    catchError((error) => {
                        this.messageService.add(error)
                        return of(getHeroFailure({ error }))
                    })
                )
            )
        )
    )

    editHero$ = createEffect(() =>
        this.action$.pipe(
            ofType(editHero),
            exhaustMap((action) => {
                console.log(action.hero);

                return this.heroService.updateHero(action.hero).pipe(
                    map((hero) => editHeroSuccess({ hero })),
                    catchError((error) => {
                        this.messageService.add(error)
                        return of(editHeroFailure({ error }))
                    })
                )
            }
            )
        )
    )

    findHero$ = createEffect(() =>
        this.action$.pipe(
            ofType(findHero),
            switchMap(action =>
                this.heroService.searchHeroes(action.term, action.tags).pipe(
                    map((hero) => findHeroSuccess({ hero })),
                    catchError((error) => {
                        this.messageService.add(error)
                        return of(findHeroFailure({ error }))
                    })
                )
            )
        )
    )

    deleteHero$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteHero),
            exhaustMap(action =>
                this.heroService.deleteHero(action.id).pipe(
                    tap((hero) => {
                        console.log(hero)
                    }),
                    map((hero) => deleteHeroSuccess({ hero })),
                    catchError((error) => {
                        this.messageService.add(error)
                        return of(deleteHeroFailure({ error }))
                    })
                )
            )
        )
    )

    addTag$ = createEffect(() =>
        this.action$.pipe(
            ofType(addTag),
            exhaustMap((action) =>
                this.heroService.addTag(action.name).pipe(
                    tap((tag) => { console.log(tag) }),
                    map((tag) => addTagSuccess({ tag })),
                    catchError((error) => {
                        this.messageService.add(error)
                        return of(getTagsFailure({ error }))
                    })
                )
            )
        )
    )
    editTag$ = createEffect(() =>
        this.action$.pipe(
            ofType(editTag),
            exhaustMap((action) =>
                this.heroService.editTag(action._id, action.name).pipe(
                    tap((tag) => { console.log(tag) }),
                    map((tag) => editTagSuccess({ tag })),
                    catchError((error) => {
                        this.messageService.add(error)
                        return of(editTagFailure({ error }))
                    })
                )
            )
        )
    )
    deleteTag$ = createEffect(() =>
    this.action$.pipe(
        ofType(deleteTag),
        exhaustMap((action) =>
            this.heroService.deleteTag(action._id).pipe(
                tap((tag) => { console.log(tag) }),
                map((tag) => deleteTagSuccess({ tag })),
                catchError((error) => {
                    this.messageService.add(error)
                    return of(deleteTagFailure({ error }))
                })
            )
        )
    )
)
    


    constructor(
        private action$: Actions,
        private heroService: HeroService,
        private messageService: MessageService,
    ) { }
}

