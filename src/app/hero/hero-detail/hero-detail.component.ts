import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Hero } from '../../core/models/hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../core/services/hero.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  Observable,
  OperatorFunction,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  pipe
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTags } from '../../core/store/Hero/hero.selector';
import { editHero, getTags } from '../../core/store/Hero/hero.actions';
import { Tag } from 'src/app/core/models/tag';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AppState } from 'src/app/core/store/app.state';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  hero: Hero;
  heroForm: FormGroup;
  tagError: string;
  tagList: Tag[];
  inputTagFocus$ = new Subject<string>();
  inputTagClick$ = new Subject<string>();
  subscription: Subscription;
  tagSubscription: Subscription;
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  constructor (
    private route: ActivatedRoute,
    private heroService: HeroService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit (): void {
    this.getTags();
    this.getHero();
  }
  getTags (): void {
    this.store.dispatch(getTags());
    this.tagSubscription = this.store.select(selectTags).subscribe(tags => {
      this.tagList = tags;
    });
  }
  initForm (): void {
    if (this.hero) {
      this.heroForm = this.fb.group({
        _id: [this.hero._id],
        name: [this.hero.name],
        age: [this.hero.age],
        gender: [this.hero.gender],
        email: [this.hero.email],
        address: [this.hero.address],
        tags: this.fb.array(this.hero.tags as Array<Tag>)
      });
    }
  }
  get name () {
    return this.heroForm.get('name');
  }
  get age () {
    return this.heroForm.get('age');
  }
  get gender () {
    return this.heroForm.get('gender');
  }
  get email () {
    return this.heroForm.get('email');
  }
  get address () {
    return this.heroForm.get('address');
  }
  get tags () {
    return this.heroForm.get('tags') as FormArray;
  }

  getHero (): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
      this.initForm();
    });
  }

  save (): void {
    let updatedHero: Hero = this.heroForm.value;
    this.store.dispatch(editHero({ hero: updatedHero }));
  }

  search: OperatorFunction<string, readonly Tag[]> = (
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
        (term === '' ? this.tagList : this.searchResult(term)).slice(0, 10)
      )
    );
  };

  searchResult (term: string): Tag[] {
    return this.tagList.filter(tag =>
      tag.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  formatter = (result: Tag) => result.name;

  addTag (event: HTMLInputElement) {
    const value = this.tagList.find((tag: Tag) => tag.name === event.value);
    if (value) {
      const valid = this.checkTagValid(value.name);
      const exist = this.tags.value.find(
        (tag: Tag) => tag.name === event.value
      );
      if (!exist && valid) {
        this.tagError = '';
        this.tags.push(this.fb.control(value));
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

  removeTag (tag: Tag): void {
    let current = this.tags.value;
    let tagIndex = current.findIndex((t: Tag) => t.name === tag.name);
    this.tags.removeAt(tagIndex);
  }

  reset (): void {
    this.initForm();
  }

  ngOnDestroy (): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
    this.tagSubscription.unsubscribe();
  }
}
