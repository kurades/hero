import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../../core/models/hero';
import { Store } from '@ngrx/store';
import { selectTags } from '../../core/store/Hero/hero.selector';
import { addHero, getTags } from '../../core/store/Hero/hero.actions';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
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
import { Tag } from 'src/app/core/models/tag';
import { AppState } from 'src/app/core/store/app.state';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.css']
})
export class HeroCreateComponent implements OnInit, OnDestroy {
  heroFormGroup: FormGroup;
  tagError: string;
  tagList: Tag[];
  inputTagFocus$ = new Subject<string>();
  inputTagClick$ = new Subject<string>();
  subscription: Subscription;
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  private MIN_AGE: number = 1;

  constructor (private fb: FormBuilder, private store: Store<AppState>) {}

  get name () {
    return this.heroFormGroup.controls['name'];
  }

  get email () {
    return this.heroFormGroup.controls['email'];
  }

  get age () {
    return this.heroFormGroup.controls['age'];
  }

  get address () {
    return this.heroFormGroup.controls['address'];
  }

  get tags () {
    return this.heroFormGroup.controls['tags'] as FormArray;
  }

  ngOnInit (): void {
    this.getTags();
    this.initForm();
  }

  getTags (): void {
    this.store.dispatch(getTags());
    this.subscription = this.store.select(selectTags).subscribe(tags => {
      this.tagList = tags;
    });
  }

  initForm () {
    this.heroFormGroup = this.fb.group({
      name: ['', { validators: [Validators.required], updateOn: 'blur' }],
      gender: ['Male', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [0, [Validators.required, Validators.min(this.MIN_AGE)]],
      address: ['', Validators.required],
      tags: this.fb.array([])
    });
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
        (term === '' ? this.tagList : this.filteredTags(term)).slice(0, 10)
      )
    );
  };

  filteredTags (term: string): Tag[] {
    return this.tagList.filter(tag =>
      tag.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  addTag (event: HTMLInputElement) {
    const value = this.tagList.find(tag => tag.name === event.value);
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

  formatter = (result: Tag) => result.name;

  removeTag (tag: Tag): void {
    let current = [...this.tags.value];
    let tagIndex = current.findIndex(v => v === tag);
    this.tags.removeAt(tagIndex);
    console.log(this.tags.value);
  }

  onSubmit (): void {
    console.log(this.heroFormGroup.value);
    const newHero = this.heroFormGroup.value as Hero;
    this.store.dispatch(addHero({ hero: newHero }));
  }

  ngOnDestroy (): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
