import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../../core/models/hero';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge, of, tap } from 'rxjs';
import { FormArray, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { deleteHero, findHero, getHeroes, getTags } from '../../core/store/Hero/hero.actions';
import { HeroState, selectHeros, selectTags } from '../../core/store/Hero/hero.selector';
import { UserState, selectUser } from '../../core/store/User/user.selector';
import { AppState } from 'src/app/core/store/app.state';
import { Tag } from 'src/app/core/models/tag';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

export class HeroesComponent implements OnInit {
  tagsTerm: Tag[] = [];
  searchTerm = new Subject<string>();
  heros$ = this.store.select(selectHeros);
  user$ = this.store.select(selectUser);
  inputTagFocus$ = new Subject<string>();
  inputTagClick$ = new Subject<string>();
  tagList: Tag[];
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  tagError: string;
  constructor(private store: Store<AppState>) {
  }
  ngOnInit(): void {
    this.getHeroes();
    this.getTags();
  }
  getHeroes(): void {
    this.store.dispatch(getHeroes())
  };
  getTags(): void {
    this.store.dispatch(getTags());
    this.store.select(selectTags).subscribe((tags) => {
      this.tagList = tags
    });
  }

  delete(hero: Hero): void {
    this.store.dispatch(deleteHero({ id: hero._id as string }))
  }

  addTag(event: HTMLInputElement) {
    // const inputTag = this.inputTag.value
    // console.log(inputTag);
    const value = this.tagList.find((tag: Tag) => tag.name === event.value)
    if (value) {
      const valid = this.checkTagValid(value.name);
      const exist = this.tagsTerm.find((tag: Tag) => tag.name === event.value)
      if (!exist && valid) {
        console.log(this.tagsTerm);

        this.tagError = '';
        this.tagsTerm = [...this.tagsTerm, value]
        console.log(this.tagsTerm);
        event.value = '';
      } else {
        this.tagError = 'Please type in a valid tag'
      }
    }
  }

  checkTagValid(tag: string | null): boolean {
    if (!tag) return false;
    const regexp = new RegExp(/^[a-zA-Z0-9 ]*$/);
    const valid = regexp.test(tag)
    return valid;
  }

  searchTagTerm: OperatorFunction<string, readonly Tag[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.inputTagClick$.pipe(filter(() => !this.instance?.isPopupOpen()));
    const inputFocus$ = this.inputTagFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === '' ? this.tagList : this.searchResult(term)).slice(0, 10),
      ),
    );
  };

  searchResult(term: string): Tag[] {
    return this.tagList.filter((tag) => tag.name.toLowerCase().includes(term.toLowerCase()))
  }


  selectedItem(item: NgbTypeaheadSelectItemEvent): void {
    console.log(item);
    // this.tags.push(this.fb.control(item.item));
    // this.inputTag.setValue(item.item)
  }

  formatter = (result: Tag) => result.name;

  removeTagTerm(tag: Tag): void {
    this.tagsTerm = this.tagsTerm.filter((t) => t !== tag)
  }

  search(event: Event): void {
    const el = event.target as HTMLInputElement
    // const tags = this.tagsTerm.map((tag) => tag.name)
    this.store.dispatch(findHero({ term: el.value, tags: this.tagsTerm }))
    // this.searchTerm.next(el.value);
  }
}
