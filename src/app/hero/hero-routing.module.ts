import { NgModule, inject } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [() => inject(AuthGuardService).canActivate()]
    },
    {
        path: 'detail/:id',
        component: HeroDetailComponent,
        canActivate: [() => inject(AuthGuardService).canActivate()]
    },
    {
        path: 'create',
        component: HeroCreateComponent,
        canActivate: [() => inject(AuthGuardService).canActivate()]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeroesRoutingModule { }