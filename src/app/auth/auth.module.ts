import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShareModule } from '../shared/share.module';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserProfileComponent
  ],
  imports: [
    ShareModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UserProfileComponent
  ]
})
export class AuthModule { }
// auth relative