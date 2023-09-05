import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  ngOnInit(): void {
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
    })
  }


  onSubmit(): void {
    console.log(this.heroFormGroup.value);
    const newHero: Hero = this.heroFormGroup.value as Hero;
    this.store.dispatch(addHero({ hero: newHero }))
  }

}