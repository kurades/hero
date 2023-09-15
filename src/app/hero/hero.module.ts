import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { ShareModule } from '../shared/share.module';
import { TagComponent } from './tag/tag.component';
import { HeroesRoutingModule } from './hero-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroCreateComponent,
    HeroDetailComponent,
    HeroesComponent,
    TagComponent
  ],
  imports: [ShareModule, HeroesRoutingModule],
  exports: [
    DashboardComponent,
    HeroCreateComponent,
    HeroDetailComponent,
    HeroesComponent,
    TagComponent
  ]
})
export class HeroModule {}
