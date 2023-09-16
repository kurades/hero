import { NgModule, inject } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HeroService } from './services/hero.service';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './services/message.service';

import { HeroEffect } from './store/Hero/hero.effect';
import { heroReducer } from './store/Hero/hero.reducer';
import { UserEffect } from './store/User/user.effect';
import { UserReducer } from './store/User/user.reducer';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard.service';


export function tokenGetter(){
  let token = inject(CookieService).get('token')
  if(!token) return ''
  return JSON.parse(token)
}

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({ heroes: heroReducer, user: UserReducer }),
    EffectsModule.forRoot([HeroEffect, UserEffect]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })
  ],
  exports: [],
  providers: [AuthService, MessageService, HeroService, CookieService, AuthGuardService],


})
export class CoreModule { }
// components that are used once in an Angular application, such as a navigation bar, loader, footer, etc.