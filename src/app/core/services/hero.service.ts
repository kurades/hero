import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
@Injectable()
export class HeroService {
  private heroesUrl = 'api/auth-manager'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private messageService: MessageService, private http: HttpClient) { }
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.heroesUrl}/heroes`)
      .pipe(
        tap(_ => {
          this.log('fetched heroes');
        }),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.error}`)
      return of(result as T)
    }
  }
  private log(message: string) {
    this.messageService.add(`HeroService:${message}`)
  }
  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/heroes/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }
  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.heroesUrl}/heroes/${hero._id}`, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero._id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }
  addHero(newHero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.heroesUrl}/heroes`, newHero, this.httpOptions).pipe(
      tap(_ => this.log(`add hero w/ name=${newHero.name}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(id?: string): Observable<Hero> {
    const url = `${this.heroesUrl}/heroes/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  searchHeroes(term: string, tags: string[]): Observable<Hero[]> {
    let query = ''
    tags.forEach((t)=>{
      query += `tagname[]=${t}`
    })
    query += `&name=${term}`

    return this.http.get<Hero[]>(`${this.heroesUrl}/find-heroes/?${query}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching ${term}`) :
        this.log(`not found hero matching ${term}`)
      ),
      catchError(this.handleError<Hero[]>('searchHero', []))
    )
  }

  getTopHeroes(): Observable<Hero[]> {

    return this.http.get<Hero[]>(`${this.heroesUrl}/heroes?limit=5`).pipe(
      tap(_ => {
        this.log('fetched Top heroes');
      }),
      catchError(this.handleError<Hero[]>('getTopHeroes', []))
    )
  }
}
