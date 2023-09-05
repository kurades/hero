import { Component, OnInit } from '@angular/core';
import { Hero } from '../core/models/hero';
import { HeroService } from '../core/services/hero.service';
import { Store } from '@ngrx/store';
import { HeroState, selectHeros } from '../core/store/Hero/hero.selector';
import { getTopHeroes } from '../core/store/Hero/hero.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[];
  heroes$ = this.store.select(selectHeros);

  constructor(private heroService: HeroService, private store: Store<{ heroes: HeroState }>) { }

  ngOnInit(): void {
    this.store.dispatch(getTopHeroes())
    this.getHeroes();
  }

  log(val: any): void {
    console.log(val);
  }

  getHeroes(): void {
    this.heroes$.subscribe((h) => {
      this.heroes = h.slice(0, 5)
    })
  }
}