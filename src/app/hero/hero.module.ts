import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ShareModule } from '../shared/share.module';
import { TagComponent } from './tag/tag.component';
import { CopyDirective } from '../shared/directive/copy.directive';
import { HeroesRoutingModule } from './hero-routing.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DashboardComponent,
    HeroCreateComponent,
    HeroDetailComponent,
    HeroesComponent,
    TagComponent,

  ],
  imports: [
    ShareModule,
    HeroesRoutingModule
  ],
  exports: [
    DashboardComponent,
    HeroCreateComponent,
    HeroDetailComponent,
    HeroesComponent,
    TagComponent
  ]
})
export class HeroModule { }
