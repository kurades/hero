import { Inject, Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from "src/app/core/services/auth.service";
import * as UserAction from './user.actions'
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs'
import { MessageService } from "src/app/core/services/message.service";
import { CookieService } from "ngx-cookie-service";
import {Router } from "@angular/router";


@Injectable()
export class UserEffect {
    register$ = createEffect(() =>
        this.action$.pipe(
            ofType(UserAction.register),
            exhaustMap(action => {
                console.log(action);
                return this.authService.register(action.name, action.password, action.rePassword).pipe(
                    map((data) => {
                        this.cookieService.set('user', JSON.stringify(data.user))
                        this.cookieService.set('token', JSON.stringify(data.token))
                        this.router.navigateByUrl('/')
                        return UserAction.registerSuccess({ user: data.user, token: data.token })
                    }),
                    catchError((error) => {
                        this.messageService.add(error)
                        return of(UserAction.registerFailure({ error }))
                    })
                )
            }
            )
        )
    )

    login$ = createEffect(() =>
        this.action$.pipe(
            ofType(UserAction.login),
            exhaustMap(action =>
                this.authService.login(action.name, action.password).pipe(
                    map((data) => {
                        
                        this.cookieService.set('user', JSON.stringify(data.user))
                        this.cookieService.set('token', JSON.stringify(data.token))
                        this.router.navigateByUrl('/')
                        return UserAction.loginSuccess({ user: data.user, token: data.token })
                    }),
                    catchError((error) => {
                        this.messageService.add(error)
                        return of(UserAction.loginFailure({ error }))
                    })
                )
            )
        )
    )


    constructor(
        private action$: Actions,
        private authService: AuthService,
        private messageService: MessageService,
        private cookieService: CookieService,
        private router: Router
    ) { }
}

