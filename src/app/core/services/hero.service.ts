import { Injectable } from '@angular/core'
import { Hero } from '../models/hero'
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators'
import { Tag } from '../models/tag'
@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes-manager'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor (
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error)
      this.log(`${operation} failed: ${error.error}`)
      return of(result as T)
    }
  }
  private log (message: string) {
    this.messageService.add(`HeroService:${message}`)
  }

  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.heroesUrl}`).pipe(
      tap(_ => {
        this.log('fetched heroes')
      }),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  getHero (id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }
  updateHero (hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(`${this.heroesUrl}/${hero._id}`, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero._id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
  }
  addHero (newHero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(`${this.heroesUrl}`, newHero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`add hero w/ name=${newHero.name}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
  }

  deleteHero (id?: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }
  searchHeroes (term: string, tags: Tag[]): Observable<Hero[]> {
    let query = ''
    tags.forEach(tag => {
      query += `tagname[]=${tag._id}`
    })
    query += `&name=${term}`
    console.log(query)

    return this.http.get<Hero[]>(`${this.heroesUrl}?${query}`).pipe(
      tap(x =>
        x.length
          ? this.log(`found heroes matching ${term}`)
          : this.log(`not found hero matching ${term}`)
      ),
      catchError(this.handleError<Hero[]>('searchHero', []))
    )
  }

  getTags (): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.heroesUrl}/tag`).pipe(
      tap(_ => this.log('get tags success')),
      catchError(this.handleError<Tag[]>('getTags', []))
    )
  }
  addTag (name: string): Observable<Tag> {
    return this.http
      .post<Tag>(`${this.heroesUrl}/tag`, { name }, this.httpOptions)
      .pipe(
        tap(_ => this.log('add tags success')),
        catchError(this.handleError<Tag>('AddTags'))
      )
  }
  editTag (_id: string, name: string): Observable<Tag> {
    return this.http
      .put<Tag>(`${this.heroesUrl}/tag/${_id}`, { name }, this.httpOptions)
      .pipe(
        tap(_ => this.log('edit tags success')),
        catchError(this.handleError<Tag>('editTags'))
      )
  }
  deleteTag (_id: string): Observable<Tag> {
    return this.http.delete<Tag>(`${this.heroesUrl}/tag/${_id}`).pipe(
      tap(_ => this.log('delete tags success')),
      catchError(this.handleError<Tag>('deleteTags'))
    )
  }

  getTopHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.heroesUrl}?limit=5`).pipe(
      tap(_ => {
        this.log('fetched Top heroes')
      }),
      catchError(this.handleError<Hero[]>('getTopHeroes', []))
    )
  }
}
