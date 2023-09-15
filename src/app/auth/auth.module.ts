import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShareModule } from '../shared/share.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserProfileComponent],
  imports: [ShareModule, AuthRoutingModule],
  exports: [LoginComponent, RegisterComponent, UserProfileComponent]
})
export class AuthModule {}
// auth relative
