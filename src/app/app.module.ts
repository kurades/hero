import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { CoreModule } from './core/core.module';
import { ShareModule } from './shared/share.module';
import { HeroModule } from './hero/hero.module';
import { AuthModule } from './auth/auth.module';
@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
  ],
  imports: [
    CoreModule,
    ShareModule,
    HeroModule,
    AuthModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
