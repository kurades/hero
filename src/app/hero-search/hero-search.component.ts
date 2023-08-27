import { Component, OnInit } from '@angular/core';
import { Observable, Subject, pipe } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerm = new Subject<string>();
  constructor(private heroService: HeroService) { }
  search(term: string): void {
    this.searchTerm.next(term);
  }
  ngOnInit(): void {
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(300),
      // ignore if term not change
      distinctUntilChanged(),
      // switch to new observable and cancel prev one if has new term
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    )
  }
}
