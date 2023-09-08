import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../core/models/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../core/services/hero.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, pipe, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { HeroState, selectHeroState, selectHeros } from '../core/store/Hero/hero.selector';
import { editHero, getHero } from '../core/store/Hero/hero.actions';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  heroes: Observable<Hero[]>;
  hero: Hero;
  heroForm: FormGroup;
  inputTag = new FormControl('');
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private fb: FormBuilder,
    private store: Store<{ heroes: HeroState }>
  ) { }

  ngOnInit(): void {
    this.getHero();
    this.initForm();
  }

  initForm(): void {
    if (this.hero) {
      this.heroForm = this.fb.group({
        _id: [this.hero._id],
        name: [this.hero.name],
        age: [this.hero.age],
        gender: [this.hero.gender],
        email: [this.hero.email],
        address: [this.hero.address],
        tags: this.fb.array(this.hero.tags as Array<string>)
      })
    }
  }
  get name() {
    return this.heroForm.get('name');
  }
  get age() {
    return this.heroForm.get('age');
  }
  get gender() {
    return this.heroForm.get('gender');
  }
  get email() {
    return this.heroForm.get('email');
  }
  get address() {
    return this.heroForm.get('address');
  }
  get tags() {
    return this.heroForm.get('tags') as FormArray;
  }

  getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(pipe(
      (h) => { this.hero = h },
      () => { this.initForm() },
    ));
  }

  addTag() {
    const tag = this.inputTag.value
    const tags: Array<string> = this.tags.value
    const exist = tags.find((t) => t === tag)
    if (!exist && tag) {
      this.tags.push(this.fb.control(tag));
      console.log(this.tags.value);
    }
    this.inputTag.setValue('');
  }

  save(): void {
    let updatedHero: Hero = this.heroForm.value
    this.store.dispatch(editHero({ hero: updatedHero }))
  }

  removeTag(tag: string): void {
    let current = [...this.tags.value]
    let index = current.findIndex((v) => v === tag)
    this.tags.removeAt(index)
    console.log(this.tags.value);
  }

  reset(): void {
    this.initForm();
  }

}
