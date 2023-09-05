import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../core/models/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../core/services/hero.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { pipe } from 'rxjs';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  hero: Hero;
  heroForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getHero();
    this.initForm();
  }

  initForm(): void {
    if (this.hero) {
      this.heroForm = this.fb.group({
        name: [this.hero.name],
        age: [this.hero.age],
        gender: [this.hero.gender],
        email: [this.hero.email],
        address: [this.hero.address],
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

  getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(pipe(
      (h) => { this.hero = h },
      () => { this.initForm() },
    ));
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

}
