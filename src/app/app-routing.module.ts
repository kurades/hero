import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent, canActivate: [() => inject(AuthGuardService).canActivate()] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [() => inject(AuthGuardService).canActivate()] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', },
  { path: 'detail/:id', component: HeroDetailComponent, canActivate: [() => inject(AuthGuardService).canActivate()] },
  { path: 'create', component: HeroCreateComponent, canActivate: [() => inject(AuthGuardService).canActivate()] },
  { path: 'profile', component: UserProfileComponent, canActivate: [() => inject(AuthGuardService).canActivate()] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
