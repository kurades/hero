import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { HeroState } from '../store/Hero/hero.selector';
import { loginSuccess } from '../store/User/user.actions';
@Injectable()
export class AuthGuardService {
  constructor (
    public auth: AuthService,
    public router: Router,
    public store: Store<{ hero: HeroState }>
  ) {}

  canActivate (): boolean {
    let payload = this.auth.loadAuthFromCookie();
    if (payload) this.store.dispatch(loginSuccess(payload));
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
