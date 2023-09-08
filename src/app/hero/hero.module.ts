import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ShareModule } from '../shared/share.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HeroCreateComponent,
    HeroDetailComponent,
    HeroesComponent
  ],
  imports: [
    ShareModule
  ],
  exports: [
    DashboardComponent,
    HeroCreateComponent,
    HeroDetailComponent,
    HeroesComponent
  ]
})
export class HeroModule { }
