import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Observable, catchError, of, tap, throwError } from 'rxjs'
import { MessageService } from './message.service'
import { User } from '../models/user'
import { authPayload } from '../models/authPayload'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'api/auth-manager'
  constructor (
    private messageService: MessageService,
    private http: HttpClient,
    private cookieService: CookieService,
    private jwtHelper: JwtHelperService
  ) {}

  public isAuthenticated (): boolean {
    const token = this.cookieService.get('token')
    if (!token) return false
    return !this.jwtHelper.isTokenExpired(token)
  }

  log (message: string) {
    this.messageService.add(`AuthService:${message}`)
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }
  login (name: string, password: string): Observable<authPayload> {
    return this.http
      .post<authPayload>(`${this.authUrl}/login`, { name, password })
      .pipe(
        tap(_ => {
          this.log('login success')
        }),
        catchError(this.handleError<authPayload>('login'))
      )
  }
  register (
    name: string,
    password: string,
    rePassword: string
  ): Observable<authPayload> {
    if (password !== rePassword) {
      throwError(() => {
        const error = new Error('Password not match')
        return error
      })
    }
    return this.http.post<authPayload>(
      `${this.authUrl}/register`,
      { name, password },
      this.httpOptions
    )
  }

  updateProfile (user: User): Observable<User> {
    return this.http.put<User>(`${this.authUrl}`, user, this.httpOptions).pipe(
      tap(_ => {
        this.log('update profile user')
      }),
      catchError(this.handleError<User>('update profile'))
    )
  }

  loadAuthFromCookie () {
    let rawUser = this.cookieService.get('user')
    let user = null
    let token = null
    if (rawUser) {
      user = JSON.parse(rawUser)
      token = JSON.parse(this.cookieService.get('token'))
    }
    return { user, token }
  }
}
