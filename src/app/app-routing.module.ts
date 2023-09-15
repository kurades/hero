import { NgModule, inject } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuardService } from './core/services/auth-guard.service'
import { TagManagerComponent } from './tag-manager/tag-manager.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'heroes/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'heroes',
    loadChildren: () => import('./hero/hero.module').then(m => m.HeroModule)
  },
  {
    path: 'tag',
    component: TagManagerComponent,
    canActivate: [() => inject(AuthGuardService).canActivate()]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
