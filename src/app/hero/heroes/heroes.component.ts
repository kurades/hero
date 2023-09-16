import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Hero } from '../../core/models/hero';
import {
  Observable,
  OperatorFunction,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge
} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  deleteHero,
  findHero,
  getHeroes,
  getTags
} from '../../core/store/Hero/hero.actions';
import { selectHeros, selectTags } from '../../core/store/Hero/hero.selector';
import { AppState } from 'src/app/core/store/app.state';
import { Tag } from 'src/app/core/models/tag';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {
  tagsTerm: Tag[] = [];
  heros$ = this.store.select(selectHeros);
  inputTagFocus$ = new Subject<string>();
  inputTagClick$ = new Subject<string>();
  subscription: Subscription;
  tags: Tag[];
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  tagError: string;
  constructor (private store: Store<AppState>) {}

  ngOnInit (): void {
    this.getHeroes();
    this.getTags();
  }

  getHeroes (): void {
    this.store.dispatch(getHeroes());
  }
  getTags (): void {
    this.store.dispatch(getTags());
    this.subscription = this.store.select(selectTags).subscribe(tags => {
      this.tags = tags;
    });
  }
  delete (hero: Hero): void {
    this.store.dispatch(deleteHero({ id: hero._id as string }));
  }

  addTag (event: HTMLInputElement) {
    const value = this.tags.find((tag: Tag) => tag.name === event.value);
    if (value) {
      const valid = this.checkTagValid(value.name);
      const exist = this.tagsTerm.find((tag: Tag) => tag.name === event.value);
      if (!exist && valid) {
        this.tagError = '';
        this.tagsTerm = [...this.tagsTerm, value];
        console.log(this.tagsTerm);
        event.value = '';
      } else {
        this.tagError = 'Please type in a valid tag';
      }
    }
  }

  checkTagValid (tag: string | null): boolean {
    if (!tag) return false;
    const regexp = new RegExp(/^[a-zA-Z0-9 ]*$/);
    const valid = regexp.test(tag);
    return valid;
  }

  searchTagTerm: OperatorFunction<string, readonly Tag[]> = (
    text$: Observable<string>
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.inputTagClick$.pipe(
      filter(() => !this.instance?.isPopupOpen())
    );
    const inputFocus$ = this.inputTagFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === '' ? this.tags : this.filteredTags(term)).slice(0, 10)
      )
    );
  };

  filteredTags (term: string): Tag[] {
    return this.tags.filter(tag =>
      tag.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  formatter = (result: Tag) => result.name;

  removeTagTerm (tag: Tag): void {
    this.tagsTerm = this.tagsTerm.filter(t => t !== tag);
  }

  search (event: Event): void {
    const el = event.target as HTMLInputElement;
    this.store.dispatch(findHero({ term: el.value, tags: this.tagsTerm }));
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }
}
