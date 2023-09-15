import { Component, OnInit } from '@angular/core';
import { Hero } from '../../core/models/hero';
import { HeroService } from '../../core/services/hero.service';
import { Store } from '@ngrx/store';
import { HeroState, selectHeros } from '../../core/store/Hero/hero.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes$ = this.store.select(selectHeros);
  heroes: Hero[];
  subcription: Subscription;
  constructor (
    private heroService: HeroService,
    private store: Store<{ heroes: HeroState }>
  ) {}

  ngOnInit (): void {
    this.getTopHeroes();
  }

  log (val: any): void {
    console.log(val);
  }

  getTopHeroes (): void {
    this.subcription = this.heroes$.subscribe(heroes => {
      this.heroes = heroes.slice(0, 5);
    });
  }

  ngOnDestroy (): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subcription.unsubscribe();
  }
}
