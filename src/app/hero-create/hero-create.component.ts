import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroService } from '../core/services/hero.service';
import { Hero } from '../core/models/hero';
import { TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { HeroState } from '../core/store/Hero/hero.selector';
import { addHero } from '../core/store/Hero/hero.actions';
@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.css']
})
export class HeroCreateComponent implements OnInit {
  heroFormGroup: FormGroup;
  private MINAGE: number = 1;
  inputTag : FormControl;
  constructor(private fb: FormBuilder, private heroService: HeroService, private store: Store<{ heroes: HeroState }>) { }

  get name() {
    return this.heroFormGroup.controls['name'];
  }

  get email() {
    return this.heroFormGroup.controls['email'];
  }

  get age() {
    return this.heroFormGroup.controls['age'];
  }

  get address() {
    return this.heroFormGroup.controls['address'];
  }

  get tags() {
    return this.heroFormGroup.controls['tags'] as FormArray;
  }


  ngOnInit(): void {
    this.inputTag = new FormControl('')
    this.initForm()
    this.heroFormGroup.markAsPristine()
  }

  initForm() {
    this.heroFormGroup = this.fb.group({
      name: ['', { validators: [Validators.required], updateOn: 'blur' }],
      gender: ['Male', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [, [Validators.required, Validators.min(this.MINAGE)]],
      address: ['', Validators.required],
      tags: this.fb.array([])
    })
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

  removeTag(tag: string): void {
    let current = [...this.tags.value]
    let index = current.findIndex((v) => v === tag)
    this.tags.removeAt(index)
    console.log(this.tags.value);
  }

  onSubmit(): void {
    console.log(this.heroFormGroup.value);
    const newHero: Hero = this.heroFormGroup.value as Hero;
    this.store.dispatch(addHero({ hero: newHero }))
  }

}