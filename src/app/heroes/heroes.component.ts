import { Component, OnInit } from '@angular/core';
import { Hero } from '../core/models/hero';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, of, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { deleteHero, findHero, getHeroes } from '../core/store/Hero/hero.actions';
import { HeroState, selectHeros } from '../core/store/Hero/hero.selector';
import { UserState, selectUser } from '../core/store/User/user.selector';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

export class HeroesComponent implements OnInit {
  searchTerm = new Subject<string>()
  heros$ = this.store.select(selectHeros)
  user$ = this.store.select(selectUser)
  constructor(private store: Store<{ heroes: HeroState, user: UserState }>) {
  }
  ngOnInit(): void {
    this.getHeroes();
    this.handleSearch();
  }
  getHeroes(): void {
    this.store.dispatch(getHeroes())
  };

  handleSearch(): void {
    this.searchTerm
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe((term) => {
        this.store.dispatch(findHero({ term }))
      })
  }

  delete(hero: Hero): void {
    // this.heroService.deleteHero(hero._id).subscribe(() => {
    //   this.heroes$ = this.heroes$.pipe(
    //     map(heroes => heroes.filter(h => h._id !== hero._id))
    //   )
    // });
    this.store.dispatch(deleteHero({ id: hero._id as string }))
  }

  search(term: string): void {
    this.searchTerm.next(term);
  }
}
