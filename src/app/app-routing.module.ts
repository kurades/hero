import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './hero/heroes/heroes.component';
import { DashboardComponent } from './hero/dashboard/dashboard.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { HeroCreateComponent } from './hero/hero-create/hero-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { TagManagerComponent } from './tag-manager/tag-manager.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'heroes/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'heroes',
    loadChildren: () => import('./hero/hero.module').then((m) => m.HeroModule),
  },
  {
    path: 'tag',
    component: TagManagerComponent,
    canActivate: [() => inject(AuthGuardService).canActivate()]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
