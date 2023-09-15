import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { CookieService } from 'ngx-cookie-service'
import { UserState, selectUser } from './core/store/User/user.selector'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of hero'
  user$ = this.store.select(selectUser)

  constructor (
    private cookieService: CookieService,
    private store: Store<{ user: UserState }>
  ) {}

  logout () {
    this.cookieService.set('user', '')
    this.cookieService.set('token', '')
    window.location.reload()
  }
}
