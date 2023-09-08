import { Component, OnInit } from '@angular/core';
import { Hero } from '../core/models/hero';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, of, tap } from 'rxjs';
import { FormArray, FormControl } from '@angular/forms';
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
  tagsTerm: string[] = [];
  searchTerm = new Subject<string>();
  heros$ = this.store.select(selectHeros);
  user$ = this.store.select(selectUser);
  constructor(private store: Store<{ heroes: HeroState, user: UserState }>) {
  }
  ngOnInit(): void {
    this.getHeroes();
    // this.handleSearch();

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
        this.store.dispatch(findHero({ term, tags: this.tagsTerm }))
      })
  }

  delete(hero: Hero): void {
    this.store.dispatch(deleteHero({ id: hero._id as string }))
  }

  addTag(event: Event): void {
    const el = event.target as HTMLInputElement
    if (el.value) {
      let exist = this.tagsTerm.find((t) => t === el.value)
      if (!exist)
        this.tagsTerm.push(el.value)
      el.value = '';
    }
  }

  removeTagTerm(tag: string): void {
    this.tagsTerm = this.tagsTerm.filter((t) => t !== tag)
  }

  search(event: Event): void {
    const el = event.target as HTMLInputElement
    this.store.dispatch(findHero({ term: el.value, tags: this.tagsTerm }))
    // this.searchTerm.next(el.value);
  }
}
